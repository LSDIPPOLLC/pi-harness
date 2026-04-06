---
name: pi-gates
description: Design quality gates, validation hooks, and feedback loops for pi. Use when adding automated checks, catching drift, or preventing regressions. Triggers on: "add quality checks", "catch drift", "pre-commit validation", or any request about continuous quality improvement.
---

# Pi Gates

Design quality gates and feedback loops that catch problems early. Gates prevent issues from compounding across sessions.

## Types of Quality Gates

### Post-Edit Gates

Run after every file edit. Catch typos, format issues, invalid syntax.

```bash
#!/usr/bin/env bash
set -euo pipefail

FILE="$1"
EXT="${FILE##*.}"

case "$EXT" in
  json)
    python3 -m json.tool "$FILE" > /dev/null || { echo "Invalid JSON: $FILE"; exit 1; }
    ;;
  ts|tsx|js|jsx)
    npx prettier --write "$FILE" 2>/dev/null
    ;;
  py)
    ruff format "$FILE" 2>/dev/null
    ;;
esac
```

### Pre-Commit Gates

Run before every commit. Must be fast (<10 seconds).

```bash
#!/usr/bin/env bash
set -euo pipefail

STAGED=$(git diff --cached --name-only --diff-filter=ACM)

JS_FILES=$(echo "$STAGED" | grep -E '\.(js|ts|tsx)$' || true)
PY_FILES=$(echo "$STAGED" | grep -E '\.py$' || true)

if [ -n "$JS_FILES" ]; then
  echo "$JS_FILES" | xargs eslint --fix 2>/dev/null || true
fi

if [ -n "$PY_FILES" ]; then
  echo "$PY_FILES" | xargs ruff check --fix 2>/dev/null || true
fi

# Block secrets
if echo "$STAGED" | xargs grep -lE '(AKIA|sk-|ghp_)' 2>/dev/null; then
  echo "ERROR: Potential secret detected"
  exit 1
fi
```

### Pre-Push Gates

Run before pushing. Can be slower (up to 2 minutes).

```bash
#!/usr/bin/env bash
set -euo pipefail

npm test || { echo "Tests failed. Push blocked."; exit 1; }
npm run build || { echo "Build failed. Push blocked."; exit 1; }
```

### Conversation-End Gates

Run at end of pi session. Catch harness-level drift.

```bash
#!/usr/bin/env bash
set -euo pipefail

# Check for orphaned memory references
if [ -d ".pi/memory" ]; then
  for memfile in .pi/memory/*.md; do
    grep -oE 'src/[^ ]+\.(ts|js|py)' "$memfile" 2>/dev/null | while read -r ref; do
      if [ ! -f "$ref" ]; then
        echo "STALE: $memfile references $ref which no longer exists"
      fi
    done
  done
fi

# Check that hooks are still valid
if [ -d "hooks" ]; then
  for hook in hooks/*; do
    if [ ! -x "$hook" ]; then
      echo "WARNING: Hook $hook is not executable"
    fi
  done
fi
```

## Feedback Loop Design

### The Improvement Cycle

```
Failure detected
    │
    v
Diagnose root cause
    │
    v
Update harness (add rule, fix config)
    │
    v
Verify fix (re-run gate)
    │
    v
Log improvement
```

### Feedback Log Format

```markdown
## Feedback Log

### 2026-03-15: YAML validation added
- **Trigger:** Invalid YAML broke deployment
- **Root cause:** No post-edit validation
- **Fix:** Added YAML parse check to post-edit hook
- **Prevention:** All YAML edits validated on write
```

## Integration Sequence

1. **Post-edit gates** — format and parse checks (< 1 second)
2. **Pre-commit gates** — lint changed files (< 10 seconds)
3. **Pre-push gates** — full test suite (< 2 minutes)
4. **Conversation-end gates** — harness health check

## Anti-patterns

### Too Strict
- Developers bypass hooks with `--no-verify`
- Fix: Scope to developer's changes, set achievable thresholds

### Too Loose
- Issues make it to production despite gates
- Fix: Audit quarterly, add gates for production failures

### Too Slow
- Developers context-switch while waiting
- Fix: Move expensive checks later, parallelize, cache

### No Feedback
- Gates fail with cryptic messages
- Fix: Every failure includes what, why, and how to fix
