---
name: pi-hooks
description: "Design, implement, and manage pi hooks. Use when adding automation, triggers, or custom behaviors on tool use or session events."
---

# Pi Hooks

**Note:** Hooks with environment variables are Claude Code conventions. Pi extensions use a different event-based system. This skill documents both approaches.

## Claude Code-Style Hooks (Shell Scripts)

These run as external processes and receive data via environment variables.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `CLAUDE_TOOL_INPUT` | JSON input to the tool |
| `CLAUDE_TOOL_OUTPUT` | JSON output from tool |
| `CLAUDE_PROJECT_DIR` | Project root directory |

### Hook Types

| Type | When | Use Case |
|------|-------|----------|
| PostToolUse | After tool executes | Format, lint, validate |
| PreToolUse | Before tool executes | Block dangerous ops |
| Stop | Session ends | Health checks, cleanup |

### Exit Codes

| Code | Meaning | Effect |
|------|---------|--------|
| 0 | Success | Continue normally |
| 2 | Block | Block the operation |

### Configuration

In `.pi/settings.json`:

```json
{
  "hooks": [
    {
      "type": "PostToolUse",
      "matcher": "Edit|Write",
      "command": "bash hooks/pi-validate.sh"
    }
  ]
}
```

## Pi Extensions (Event-Based)

Pi's native hook system uses TypeScript extensions that subscribe to events.

### Available Events

| Event | When | Use |
|-------|------|-----|
| `session_start` | Session begins | Initialize state |
| `session_shutdown` | Session ends | Cleanup |
| `tool_call` | Before tool runs | Block/modify |
| `tool_result` | After tool runs | Transform result |
| `before_agent_start` | Before LLM call | Inject context |
| `agent_end` | After agent turn | Log/notify |

### Example Extension

```typescript
pi.on("tool_call", async (event, ctx) => {
  if (event.toolName === "bash" && event.input.command?.includes("rm -rf")) {
    const ok = await ctx.ui.confirm("Dangerous!", "Allow?");
    if (!ok) return { block: true, reason: "Blocked" };
  }
});
```

Extensions live in `.pi/extensions/` and auto-load.
