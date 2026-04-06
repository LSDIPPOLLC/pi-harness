# Pi Harness

**Elite-grade configuration framework for the pi coding agent.**

A structured, 7-pillar approach to building robust, maintainable agentic systems with pi.

## The 7 Pillars

| # | Pillar | Description |
|---|--------|-------------|
| 1 | Skill Composition | Atomic, composable skill modules |
| 2 | Context Engineering | Prompt templates & memory |
| 3 | Orchestration | Routing & delegation patterns |
| 4 | Persistence | Cross-session memory system |
| 5 | Quality Gates | Validation hooks & drift detection |
| 6 | Permissions | Auto-allow / gate dangerous ops |
| 7 | Ergonomics | Tune interaction style |

## Skills

| Skill | Purpose |
|-------|---------|
| `pi-engineer` | Master router for harness engineering |
| `pi-init` | Bootstrap a new project harness |
| `pi-scaffold` | Generate project context from prompts |
| `pi-audit` | Score harness maturity (0-21) |
| `pi-loop` | Continuous improvement cycle |
| `pi-memory` | Design memory systems |
| `pi-hooks` | Implement validation hooks |
| `pi-context` | Optimize prompts & context |
| `pi-gates` | Design quality gates |
| `pi-skills` | Decompose workflows into skills |
| `pi-routing` | Orchestration patterns |
| `pi-permissions` | Configure permission boundaries |
| `pi-ergonomics` | Tune interaction style |

## Project Structure

```
.pi/
├── skills/              # 13 atomic skill modules
│   └── */SKILL.md       # Skill definitions
├── prompts/             # Prompt templates
│   ├── project.md
│   ├── test.md
│   └── orchestration.md
├── memory/               # Cross-session memory
│   ├── MEMORY.md         # Memory index
│   └── *.md              # Memory entries
└── settings.json         # Pi configuration

hooks/
├── pi-validate.sh        # Post-edit validation
└── pi-drift.sh           # Drift detection
```

## Usage

Load skills via pi:

```
/skill:pi-init      # Bootstrap harness
/skill:pi-audit     # Score maturity
/skill:pi-loop      # Improve iteratively
```

## License

MIT
