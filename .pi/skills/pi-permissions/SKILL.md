---
name: pi-permissions
description: "Configure pi permission boundaries. Use when setting up permissions, restricting dangerous operations, or automating safe commands."
---

# Pi Permissions

Configure what pi can do without asking.

## Blast Radius Principle

| Scope | Reversibility | Default |
|-------|---------------|---------|
| Local | Easy | Auto-allow |
| Local | Hard | Confirm |
| Shared | Any | Always prompt |
| External | Any | Always prompt |

## Permission Patterns

### Auto-Allow (Safe)
- `Read` — reading files
- `Edit` — modifying files
- `Bash(npm test *)` — running tests
- `Bash(git status *)` — git queries

### Require Confirmation
- `Bash(rm *)` — deletions
- `Bash(git push *)` — pushes
- `Bash(drop *)` — database ops

### Always Prompt
- `Bash(sudo *)` — sudo
- External API calls
- Shared resource modifications

## Configuration

```json
{
  "permissions": {
    "allow": ["Read", "Edit", "Bash(npm test *)"]
  }
}
```
