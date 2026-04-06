# Pi Harness Documentation

A configuration framework for the pi coding agent. Pi-native adaptation of the Claude Code Harness concept.

## Overview

Pi Harness transforms pi into an intelligent, context-aware collaborator by providing:

- **Structured configuration system** (7 pillars)
- **Composable skills** for common workflows
- **Prompts** for project context
- **Memory** for cross-session persistence
- **Hooks** for automated quality gates

## Key Difference from Claude Code Harness

| Claude Code | Pi |
|------------|-----|
| CLAUDE.md auto-loads | Prompts loaded via `/prompt-name` |
| Auto-loaded instructions | Explicit prompt invocation |
| settings.json permissions | Same |

**Pi does NOT auto-load CLAUDE.md.** Instead, project context lives in:
- `.pi/prompts/*.md` — loaded when invoked
- `.pi/memory/*.md` — persistent cross-session knowledge
- Skills — loaded on-demand via `/skill:name`

## The 7 Pillars

| Pillar | Score Range | Description |
|--------|-------------|-------------|
| Skill Composition | 0-3 | What prompts and skills the project has |
| Context Engineering | 0-3 | Project prompts and memory organization |
| Orchestration | 0-3 | How work is distributed |
| Persistence | 0-3 | Cross-session memory |
| Quality Gates | 0-3 | Automated validation |
| Permissions | 0-3 | Autonomous vs. confirmed actions |
| Ergonomics | 0-3 | Interaction style |

**Total possible: 21/21**

## Quick Start

### 1. Bootstrap a project

```bash
pi "set up pi for this project"
# Routes to pi-engineer → pi-init
```

### 2. Audit existing setup

```bash
pi "audit my harness"
# Routes to pi-audit
```

### 3. Improve iteratively

```bash
pi "improve my harness"
# Routes to pi-loop
```

## Prompts

Prompts live in `.pi/prompts/` and are loaded via `/prompt-name`.

### Creating Prompts

`.pi/prompts/project.md`:
```markdown
---
description: Project overview and key commands
---
# My Project

Essential commands:
- Build: `npm run build`
- Test: `npm test`

Code style: Prettier, TypeScript strict
```

### Using Prompts

```bash
/project           # Load project overview
/test              # Run tests
/build             # Build project
```

## Memory

Memory lives in `.pi/memory/` for cross-session persistence.

### Memory Types

| Type | Example |
|------|---------|
| user | User role, preferences |
| feedback | Corrections, confirmed approaches |
| project | Active work, decisions |
| reference | External systems, URLs |

### Creating Memories

`.pi/memory/MEMORY.md`:
```markdown
# Memory Index

## User
- [User Role](user_role.md)

## Feedback
- [Testing](feedback_testing.md)
```

## Skills Reference

### Master Skills

| Skill | When to use |
|-------|-------------|
| `pi-engineer` | Any harness configuration request |
| `pi-init` | New project bootstrap |
| `pi-scaffold` | Generate prompts and memory |
| `pi-audit` | Evaluate existing harness |
| `pi-loop` | Continuous improvement |

### Atomic Skills

| Skill | Pillar |
|-------|--------|
| `pi-scaffold` | Context |
| `pi-context` | Context |
| `pi-memory` | Persistence |
| `pi-permissions` | Safety |
| `pi-hooks` | Quality |
| `pi-skills` | Composition |
| `pi-routing` | Orchestration |
| `pi-gates` | Quality |
| `pi-ergonomics` | Ergonomics |

## Hooks

### pi-validate

Runs after Edit/Write on harness files:
- Checks prompt size and structure
- Validates JSON syntax in settings
- Ensures hook scripts are executable

### pi-drift

Runs at conversation end:
- Checks prompt staleness
- Verifies memory index sync
- Reports orphaned references

## Project Structure

```
.pi/
├── prompts/              # Project context templates
│   ├── project.md       # Project overview (/project)
│   ├── test.md          # Test workflow (/test)
│   └── *.md            # Other prompts
├── memory/              # Cross-session memory
│   ├── MEMORY.md       # Index
│   └── *.md            # Individual memories
├── settings.json        # Permissions and hooks
└── skills/              # Project-specific skills (optional)

skills/                   # Pi harness skills
├── pi-engineer/
├── pi-scaffold/
├── pi-audit/
└── ...

hooks/                    # Hook scripts
├── pi-validate.sh
└── pi-drift.sh
```

## License

MIT
