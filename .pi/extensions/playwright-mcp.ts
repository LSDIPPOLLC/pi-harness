import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";
import { spawn } from "node:child_process";
import { EventEmitter } from "node:events";

/**
 * Pi extension that exposes Playwright MCP tools.
 * 
 * This extension starts the @playwright/mcp server as a subprocess and
 * registers all available browser automation tools with pi.
 * 
 * Requirements:
 * - Node.js 18+
 * - @playwright/mcp accessible via npx
 * - Playwright browsers installed (npx playwright install)
 * 
 * Usage:
 *   npx playwright install  # Install browsers if needed
 *   pi  # Extension auto-loads in .pi/extensions/
 */
export default async function playwrightMCP(pi: ExtensionAPI) {
  let processRef: { proc: ReturnType<typeof spawn>; emitter: EventEmitter } | null = null;
  let requestId = 0;
  const pendingRequests = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();
  let toolsList: Array<{ name: string; description?: string; inputSchema: unknown }> = [];
  let initialized = false;

  // Tool name mapping to handle pi's naming restrictions
  const sanitizeToolName = (name: string): string => {
    // Replace non-alphanumeric with underscores, ensure starts with letter
    let sanitized = name.replace(/[^a-zA-Z0-9_]/g, "_");
    if (!/^[a-zA-Z]/.test(sanitized)) {
      sanitized = "pw_" + sanitized;
    }
    return sanitized;
  };

  const sendRequest = async (method: string, params: unknown = {}): Promise<unknown> => {
    if (!processRef) throw new Error("MCP process not running");
    
    return new Promise((resolve, reject) => {
      const id = ++requestId;
      pendingRequests.set(id, { resolve, reject });
      
      const message = JSON.stringify({ jsonrpc: "2.0", id, method, params });
      processRef!.proc.stdin?.write(message + "\n");
      
      // Timeout after 30 seconds
      setTimeout(() => {
        if (pendingRequests.has(id)) {
          pendingRequests.delete(id);
          reject(new Error(`Request ${id} timed out`));
        }
      }, 30000);
    });
  };

  const initialize = async () => {
    try {
      // Initialize the MCP connection
      const result = await sendRequest("initialize", {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        clientInfo: { name: "pi-playwright-extension", version: "1.0.0" },
      }) as { capabilities?: { tools?: {} } };
      
      // Send initialized notification
      processRef!.proc.stdin?.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");
      
      // List available tools
      const toolsResult = await sendRequest("tools/list") as { tools?: typeof toolsList };
      toolsList = toolsResult?.tools || [];
      
      initialized = true;
      console.log(`[playwright-mcp] Connected, found ${toolsList.length} tools`);
      
      return true;
    } catch (error) {
      console.error("[playwright-mcp] Init failed:", error);
      return false;
    }
  };

  const convertMCPToTypeBox = (schema: unknown) => {
    if (!schema || typeof schema !== "object") {
      return Type.Object({});
    }

    const schemaObj = schema as Record<string, unknown>;
    if (schemaObj.type !== "object") {
      return Type.Object({});
    }

    const properties = schemaObj.properties as Record<string, unknown> || {};
    const required = (schemaObj.required as string[]) || [];
    const typeBoxProperties: Record<string, unknown> = {};

    for (const [key, prop] of Object.entries(properties)) {
      typeBoxProperties[key] = convertPropertyToTypeBox(prop);
    }

    return Type.Object(typeBoxProperties, {
      required: required.length > 0 ? required : undefined,
    });
  };

  const convertPropertyToTypeBox = (prop: unknown): unknown => {
    if (!prop || typeof prop !== "object") {
      return Type.String();
    }

    const propObj = prop as Record<string, unknown>;

    switch (propObj.type) {
      case "string":
        return Type.String({ description: propObj.description as string });
      case "number":
        return Type.Number({ description: propObj.description as string });
      case "boolean":
        return Type.Boolean({ description: propObj.description as string });
      case "array":
        return Type.Array(Type.String());
      case "object":
        return convertMCPToTypeBox(propObj);
      default:
        if (propObj.enum) {
          return Type.String({ enum: propObj.enum as string[] });
        }
        return Type.String();
    }
  };

  // Start the playwright-mcp process
  try {
    const proc = spawn("npx", ["@playwright/mcp@latest"], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    const emitter = new EventEmitter();
    let buffer = "";

    proc.stdout?.on("data", (data: Buffer) => {
      buffer += data.toString();
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      
      for (const line of lines) {
        if (!line.trim()) continue;
        
        try {
          const msg = JSON.parse(line);
          
          if ("id" in msg && typeof msg.id === "number") {
            const pending = pendingRequests.get(msg.id);
            if (pending) {
              pendingRequests.delete(msg.id);
              if (msg.error) {
                pending.reject(new Error(msg.error.message || "MCP error"));
              } else {
                pending.resolve(msg.result);
              }
            }
          } else if (msg.method === "notifications/message" || msg.method === "tool_called") {
            // Tool use notifications
          }
        } catch (e) {
          // Ignore parse errors for non-JSON messages
        }
      }
    });

    proc.stderr?.on("data", (data: Buffer) => {
      const text = data.toString().trim();
      if (text && !text.includes("Downloading")) {
        console.error("[playwright-mcp]", text);
      }
    });

    proc.on("error", (error) => {
      console.error("[playwright-mcp] Process error:", error.message);
      emitter.emit("error", error);
    });

    proc.on("exit", (code) => {
      if (code !== 0 && code !== null) {
        console.error(`[playwright-mcp] Process exited with code ${code}`);
      }
      emitter.emit("exit", code);
    });

    processRef = { proc, emitter };

    // Wait for initialization
    const success = await initialize();
    
    if (!success) {
      throw new Error("Failed to initialize MCP connection");
    }

    // Register each tool with pi
    for (const tool of toolsList) {
      const sanitizedName = sanitizeToolName(tool.name);
      const inputSchema = convertMCPToTypeBox(tool.inputSchema);

      pi.registerTool({
        name: `playwright_${sanitizedName}`,
        label: `Playwright: ${tool.name}`,
        description: tool.description || `Browser automation via Playwright MCP`,
        parameters: inputSchema as ReturnType<typeof Type.Object>,
        
        async execute(toolCallId, params, signal, onUpdate, ctx) {
          try {
            const result = await sendRequest("tools/call", {
              name: tool.name,
              arguments: params as Record<string, unknown>,
            }) as { content?: Array<{ type: string; text?: string }> };

            if (result?.content) {
              return {
                content: result.content.map(c => ({
                  type: "text" as const,
                  text: c.text || JSON.stringify(c),
                })),
                details: { toolName: tool.name },
              };
            }

            return {
              content: [{ type: "text" as const, text: "Tool executed successfully" }],
              details: { toolName: tool.name },
            };
          } catch (error) {
            return {
              content: [{
                type: "text" as const,
                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
              }],
              isError: true,
              details: { toolName: tool.name },
            };
          }
        },
      });
    }

    console.log(`[playwright-mcp] Registered ${toolsList.length} browser automation tools`);

  } catch (error) {
    console.error("[playwright-mcp] Failed to start:", error);
    
    // Register error tool as fallback
    pi.registerTool({
      name: "playwright_status",
      label: "Playwright MCP Status",
      description: "Check Playwright MCP connection status",
      parameters: Type.Object({}),
      async execute() {
        return {
          content: [{
            type: "text" as const,
            text: `Playwright MCP failed to initialize: ${error instanceof Error ? error.message : String(error)}. Make sure @playwright/mcp is available.`,
          }],
          isError: true,
        };
      },
    });
  }

  // Cleanup on shutdown
  pi.on("session_shutdown", async () => {
    if (processRef) {
      try {
        processRef.proc.kill();
      } catch (e) {
        // Ignore
      }
    }
  });
}
