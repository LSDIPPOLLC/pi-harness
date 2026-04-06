# Testing Conventions

## Harness Validation
- Run `hooks/pi-validate.sh` after editing harness files
- Checks: prompt size, JSON syntax, script executability
- Run `hooks/pi-drift.sh` at conversation end

## Manual Testing
- Test prompts with `/project`, `/test` invocations
- Verify skills load with `/skill:pi-audit`
- Check memory persists across sessions

## Interaction Style Testing
When testing agent interactions, follow these conventions:

### Prompt Testing
- Test each skill in isolation first, then combinations
- Verify the skill loads with `/skill:<skill-name>`
- Check that prompts don't exceed 4000 tokens
- Verify tool descriptions are clear and actionable

### Memory Testing
- Start a new conversation and verify `.pi/memory/` persists
- Test that feedback changes are recognized across sessions
- Verify `MEMORY.md` updates are picked up by the agent

### Tool Permission Testing
- Verify new tools (Read/Edit/Write) work with current permissions
- Test that guards catch dangerous operations correctly
- Check that hooks execute at the right times (PostToolUse, Stop)

### Hook Testing
```bash
# Validate harness files
bash hooks/pi-validate.sh

# Check for drift
bash hooks/pi-drift.sh

# Manual permission test
pi "Read test.txt"  # Should work
pi "Bash(rm -rf /)" # Should trigger guard
```

## CI Integration
- Run validation hooks in pre-commit hooks
- Include drift checks in CI pipeline
- Test skills against reference prompts
