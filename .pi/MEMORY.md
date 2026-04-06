# Harness Pi Memory

## Project Context
This is the pi harness project - a coding agent harness framework.

## Index
- `.pi/skills/` - Skill definitions for harness capabilities
- `.pi/prompts/` - Prompt templates for different agent roles
- `.pi/memory/` - Persistent memory and documentation
  - `feedback_testing.md` - User feedback testing guidelines
  - `trust_calibration.md` - Trust level and interaction style guidance
- `.pi/hooks/` - Hook scripts for validation and drift detection

## Ergonomics
- Trust level: 2 (Established User)
- Concise output, action-oriented
- Explicit feedback capture mechanism

## Important Patterns
- Skills are defined in `.pi/skills/` with SKILL.md files
- Prompts extend base behavior in `.pi/prompts/`
- Memory files document persistent project knowledge
