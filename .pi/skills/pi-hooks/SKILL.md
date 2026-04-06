---
name: pi-hooks
description: "Design, implement, and manage pi hooks. Use when adding automation, triggers, or custom behaviors on tool use or session events."
---

# Pi Hooks

Implement automated behaviors via hooks. Hooks fire at key points in pi's execution.

## Hook Types

### PreToolUse
Before a tool executes. Use for:
- Blocking dangerous operations
- Modifying tool input
- Requiring confirmation

### PostToolUse
After a tool executes. Use for:
- Format-on-save
- Running linters
- Secret scanning

### Stop
Conversation ends. Use for:
- Health checks
- Drift detection
- Cleanup tasks

## Exit Codes

| Code | Meaning | Effect |
|------|---------|--------|
| 0 | Success | Normal operation |
| 2 | Block | Operation blocked |

## Environment Variables

- `CLAUDE_TOOL_INPUT` — Tool input JSON
- `CLAUDE_TOOL_OUTPUT` — Tool output JSON
- `CLAUDE_PROJECT_DIR` — Project root
