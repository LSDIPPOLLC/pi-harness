---
name: pi-permissions
description: Configure pi permission boundaries. Use when setting up permissions, getting too many prompts, or designing permission strategy. Triggers on: "fix permissions", "too many prompts", "allow npm", "permission denied", or any concern about prompts frequency.
---

# Pi Permissions

Configure what pi can do autonomously vs. requiring confirmation. The goal is flow — minimize interruptions for safe operations while maintaining guardrails.

## Permission Philosophy

### The Blast Radius Principle

| Blast radius | Examples | Permission |
|-------------|----------|-----------|
| **Local, reversible** | Read files, run tests, format | Auto-allow |
| **Local, hard to reverse** | Delete files, reset git | Prompt |
| **Shared state** | Git push, deploy, publish | Always prompt |
| **External systems** | API calls, emails | Always prompt |

### Pattern Specificity

```
✗ Bash(*)                    # Too broad — allows everything
✓ Bash(npm test *)           # Specific commands only
✓ Bash(npm run *)            # Package scripts
✓ Bash(npx *)                # NPX executables
```

## Step 1: Detect Project Tooling

```bash
# Package manager
ls package.json Cargo.toml pyproject.toml go.mod Gemfile 2>/dev/null

# Key commands from package.json
cat package.json | jq -r '.scripts | keys[]' 2>/dev/null
```

## Step 2: Design Permission Set

### Node.js/TypeScript

```json
{
  "permissions": {
    "allow": [
      "Bash(npm test *)",
      "Bash(npm run *)",
      "Bash(npx *)",
      "Bash(node *)",
      "Bash(tsc *)"
    ]
  }
}
```

### Python

```json
{
  "permissions": {
    "allow": [
      "Bash(python *)",
      "Bash(python3 *)",
      "Bash(pytest *)",
      "Bash(ruff *)",
      "Bash(uv *)"
    ]
  }
}
```

### Universal Safe Commands

```json
{
  "permissions": {
    "allow": [
      "Bash(git status *)",
      "Bash(git log *)",
      "Bash(git diff *)",
      "Bash(ls *)",
      "Bash(cat *)",
      "Bash(find *)",
      "Bash(grep *)"
    ]
  }
}
```

## Commands That Should ALWAYS Prompt

Never auto-allow:
- `git push` — affects remote
- `git reset --hard` — destroys local changes
- `rm -rf` — irreversible deletion
- `docker push` / `npm publish` — publishes artifacts
- `curl | bash` — arbitrary code execution

## Step 3: Configure MCP Permissions

```json
{
  "permissions": {
    "allow": [
      "mcp__*server__read_*",
      "mcp__*server__list_*"
    ]
  }
}
```

Auto-allow reads, prompt for writes.

## Step 4: Write and Verify

1. Merge with existing settings (don't overwrite other config)
2. Validate JSON syntax
3. Show user what's being added and why
4. Test by running a common command

## Maintenance

Permissions should evolve:
- New tool added? Add its permission pattern
- Switched package managers? Update patterns
- Too many prompts? Audit and refine
