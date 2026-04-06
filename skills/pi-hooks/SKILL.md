---
name: pi-hooks
description: Design, implement, and manage pi hooks. Use when adding auto-formatting, auto-linting, safety gates, or automated behaviors. Triggers on: "add a hook", "auto-format", "auto-lint", "validate before commit", or any request about automating behaviors.
---

# Pi Hooks

Hooks are automated behaviors that fire before/after tool use. They're the mechanism for quality gates, formatting, and safety rails.

## Hook Types

| Type | When it fires | Use for |
|------|--------------|---------|
| **PreToolUse** | Before a tool executes | Block dangerous operations |
| **PostToolUse** | After a tool executes | Format files, run linters |
| **Stop** | At conversation end | Health checks, drift detection |

## Common Hook Patterns

### 1. Auto-format on Save

```bash
#!/usr/bin/env bash
# hooks/auto-format.sh — PostToolUse on Edit|Write
set -euo pipefail

FILE_PATH=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // empty' 2>/dev/null)
[[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]] && exit 0

case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md)
    npx prettier --write "$FILE_PATH" 2>/dev/null || true
    ;;
  *.py)
    ruff format "$FILE_PATH" 2>/dev/null || true
    ;;
esac

exit 0
```

### 2. Lint on Edit

```bash
#!/usr/bin/env bash
# hooks/auto-lint.sh — PostToolUse on Edit
set -euo pipefail

FILE_PATH=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // empty' 2>/dev/null)
[[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]] && exit 0

case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx)
    npx eslint --format compact "$FILE_PATH" 2>/dev/null || true
    ;;
  *.py)
    ruff check "$FILE_PATH" 2>/dev/null || true
    ;;
esac

exit 0
```

### 3. Secret Scanner

```bash
#!/usr/bin/env bash
# hooks/secret-scanner.sh — PreToolUse on Write|Edit
set -euo pipefail

CONTENT=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.content // .new_string // empty' 2>/dev/null)
[[ -z "$CONTENT" ]] && exit 0

if echo "$CONTENT" | grep -qiE '(AKIA[A-Z0-9]{16}|sk-[a-zA-Z0-9]{48}|ghp_[a-zA-Z0-9]{36})'; then
    echo "BLOCKED: Content appears to contain a secret. Remove before writing."
    exit 2
fi

exit 0
```

### 4. Conversation-end Health Check

```bash
#!/usr/bin/env bash
# hooks/stop-check.sh — Stop hook
set -euo pipefail

if git diff --name-only 2>/dev/null | grep -qE '(prompts/|memory/)'; then
    echo "NOTE: You have uncommitted changes to harness files."
fi

exit 0
```

## Adding a Hook

1. **Identify the trigger**: What tool action fires the hook?
2. **Choose the type**: PreToolUse (block) or PostToolUse (react)?
3. **Write the script**: Use patterns above as templates
4. **Make executable**: `chmod +x hooks/your-hook.sh`
5. **Add to .pi/settings.json**: Add the hook entry
6. **Test**: Run script manually with sample input

## Debugging Hooks

1. Check it's executable: `ls -la hooks/your-hook.sh`
2. Check settings.json: Valid JSON? Matcher correct?
3. Test directly:
   ```bash
   CLAUDE_TOOL_INPUT='{"file_path":"/tmp/test.ts"}' bash hooks/your-hook.sh
   ```
4. Check for jq: `sudo apt-get install jq`

## Anti-patterns

- **Slow hooks**: >2 seconds kills flow. Keep fast or make async
- **Noisy hooks**: Only report actionable issues
- **Blocking on warnings**: Use exit 2 sparingly
- **No error handling**: Default to exit 0 (allow)
