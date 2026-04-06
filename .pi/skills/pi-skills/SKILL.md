---
name: pi-skills
description: "Analyze project workflows and decompose them into a skill system. Use when identifying patterns, creating new skills, or improving skill organization."
---

# Pi Skills

Analyze workflows and decompose into skill system.

## Workflow Analysis

Identify recurring patterns:
1. Watch for repeated instructions
2. Note complex multi-step processes
3. Catalog tool sequences

## Skill Decomposition

### Atomic Skills
Single-purpose, reusable:
- `pi-format` — format code
- `pi-test` — run tests
- `pi-lint` — run linters

### Composed Skills
Chain of atomic skills:
```
pi-deploy = pi-build + pi-test + pi-push
```

## Skill Structure

```
skills/
└── my-skill/
    └── SKILL.md    # Skill definition
```

### SKILL.md Format

```markdown
---
name: my-skill
description: "What this skill does"
---

# My Skill

Instructions for the skill...
```
