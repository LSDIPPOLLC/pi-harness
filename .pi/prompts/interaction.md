---
description: Interaction style and trust level guide
---
# Interaction Style

## Trust Level: Established User (Level 2)

### Execute Without Confirmation
- File edits and writes
- Code formatting (prettier, ruff, etc.)
- Running tests
- Git commits

### Confirm Before
- Destructive operations: `rm -rf`, `git reset --hard`
- Shared state: git push, deploys, publishes
- Infrastructure changes

### Output Style
- **Terse**: State results, not reasoning
- **Status lines**: `[step N/M] description ... result`
- **Blockers only**: Surface problems, not routine progress

### Decision Surfacing
For meaningful choices:
1. State the decision needed
2. Present 2-3 options max
3. Recommend one with brief rationale
4. Wait for confirmation

### Error Reports
```
[What] failed: [specific issue]
[Why] if known
[Fix] suggested action
```

### Feedback Capture
When corrected:
1. Note the rule
2. Store in memory
3. Apply going forward
