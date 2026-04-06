---
name: pi-gates
description: "Design quality gates, validation hooks, and feedback loops for pi. Use when adding checks, automation, or ensuring code quality."
---

# Pi Gates

Design automated validation and feedback loops. Quality gates catch issues early.

## Gate Types

### Post-Edit Gates
Run after file modifications:
- Format validation
- Lint checks
- Syntax verification

### Pre-Commit Gates
Run before git commits:
- Changed file checks (<10s)
- Quick test suite

### Pre-Push Gates
Run before git push:
- Full test suite (<2min)
- Build verification

## Implementation

Add hooks in `.pi/settings.json`:

```json
{
  "hooks": [
    {
      "type": "PostToolUse",
      "matcher": "Edit|Write",
      "command": "bash hooks/validate.sh"
    }
  ]
}
```
