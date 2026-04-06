---
description: Pi Harness project overview and key commands
---
# Pi Harness Project

A configuration framework for the pi coding agent. This is the reference implementation and documentation project.

## Project Structure

```
harnesspi/           # Root - pi configuration
├── .pi/            # Harness configuration (pi-specific)
│   ├── prompts/    # Invokable prompts (/project, /test)
│   ├── memory/     # Cross-session memory
│   └── skills/     # Atomic skill definitions
├── prompts/        # Root-level prompt copies
├── skills/         # Root-level skill copies
├── hooks/          # Quality gate scripts
├── docs/           # Documentation
└── evals/          # Evaluation files
```

## Essential Commands

```bash
# No build step needed - pure documentation project
# Run hooks manually
./hooks/pi-validate.sh   # Validate harness files
./hooks/pi-drift.sh       # Check for drift

# View harness structure
ls -la .pi/
ls -la .pi/skills/
ls -la .pi/prompts/
```

## Code Style

- Language: Markdown (documentation)
- Scripts: Bash
- Configuration: JSON
- Skill definitions: Markdown with YAML frontmatter

## Architecture

- **Prompts** in `.pi/prompts/*.md` — loaded via `/prompt-name`
- **Skills** in `.pi/skills/*/SKILL.md` — loaded via `/skill:name`
- **Memory** in `.pi/memory/*.md` — persistent cross-session knowledge
- **Settings** in `.pi/settings.json` — permissions and hooks

## Key Conventions

- Skills follow pi skill format: `name`, `description`, `location`
- Prompts use YAML frontmatter: `description`, followed by markdown
- Hooks are bash scripts in `/hooks/`
- All skill locations are relative paths

## Skills Reference

| Skill | Purpose |
|-------|---------|
| `pi-engineer` | Master router for harness engineering |
| `pi-init` | Bootstrap new projects |
| `pi-scaffold` | Generate prompts and memory |
| `pi-audit` | Evaluate harness completeness |
| `pi-loop` | Continuous improvement |
| `pi-context` | Optimize prompts |
| `pi-memory` | Manage cross-session memory |
| `pi-permissions` | Configure allowed actions |
| `pi-hooks` | Add automated hooks |
| `pi-skills` | Design skill composition |
| `pi-routing` | Orchestration strategy |
| `pi-gates` | Quality gates |
| `pi-ergonomics` | Interaction tuning |
