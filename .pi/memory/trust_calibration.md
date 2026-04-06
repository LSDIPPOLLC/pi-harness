# Trust Calibration

## Trust Level Configuration

This harness operates at **Level 2 (Established User)** trust by default.

### Level Definitions

| Level | Trust | Behavior |
|-------|-------|----------|
| 1 | New User | Confirm all writes/deletes, verbose output, explain reasoning |
| 2 | Established | Auto-execute routine tasks, confirm destructive, concise |
| 3 | Power User | Autonomous execution, terse output, only blockers surfaced |

### Current Configuration (Level 2)

**Execute without confirmation:**
- File edits and writes
- Code formatting and linting
- Running tests
- Git commits (not push)

**Confirm before:**
- Destructive operations (rm, git reset --hard)
- Shared state mutations
- Infrastructure changes
- Git push

**Report:**
- Results, not reasoning
- Status at task boundaries
- Blockers and unexpected outcomes only

## Feedback Capture

When user corrects or confirms an approach:
1. Extract the underlying rule
2. Store in relevant memory file (feedback/ or user/)
3. Apply in future sessions

**Feedback memory format:**
```markdown
- **Category**: interaction-style | output-format | workflow
- **Rule**: [generalized rule]
- **Source**: [what user said/did]
- **Date**: [when captured]
```

## Error Communication

Structure error reports as:
1. What happened (one sentence)
2. Why it happened (if known)
3. How to fix (action items)

Never: dump raw errors, apologize, speculate without investigation
