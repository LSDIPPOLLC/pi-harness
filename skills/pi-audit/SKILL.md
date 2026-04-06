---
name: pi-audit
description: Audit and evaluate an existing pi harness against the 7 pillars. Use when assessing setup, finding gaps, or checking harness quality. Triggers on: "audit my harness", "what's missing", "check my setup", or any request to diagnose pi configuration.
---

# Pi Audit

Evaluate an existing pi harness against the 7 pillars. Produce a maturity score, identify gaps, and recommend improvements.

## Audit Process

### Step 1: Gather Current State

Read all harness artifacts:

```
.pi/
├── settings.json        # Permissions and hooks
├── prompts/             # Project context templates
│   ├── project.md      # Project overview (key)
│   └── *.md           # Other workflow prompts
├── memory/             # Cross-session memory
│   ├── MEMORY.md      # Index
│   └── *.md           # Individual memories
└── skills/             # Project-specific skills (if any)
```

Also check:
- Git history for prompt updates
- Any skill directories

### Step 2: Score Each Pillar

Rate each pillar 0-3:

| Score | Meaning |
|-------|---------|
| 0 | **Absent** — No configuration |
| 1 | **Basic** — Minimal setup, significant gaps |
| 2 | **Solid** — Good coverage, minor improvements |
| 3 | **Excellent** — Well-tuned, actively maintained |

#### Pillar 1: Skill Composition
- Are there project-specific prompts in `.pi/prompts/`?
- Do prompts have clear descriptions?
- Are common workflows covered?

#### Pillar 2: Context Engineering
- Does `.pi/prompts/project.md` exist?
- Does it contain project-specific info?
- Are essential commands documented?

#### Pillar 3: Orchestration & Routing
- Are there patterns for when to use subagents?
- Is there guidance on parallelization?
- Are complex workflows decomposed into prompts?

#### Pillar 4: Persistence & State
- Is there a memory system in `.pi/memory/`?
- Are memories organized and up-to-date?
- Does MEMORY.md index exist?

#### Pillar 5: Quality Gates & Feedback Loops
- Are there hooks configured in settings.json?
- Do hooks validate important actions?
- Is there a drift detection hook?

#### Pillar 6: Permission & Safety Boundaries
- Is settings.json configured?
- Are dangerous operations gated?
- Are common commands auto-allowed?

#### Pillar 7: Ergonomics & Trust Calibration
- Are there interaction style notes in prompts or memory?
- Is the trust level appropriate?
- Is feedback being captured?

### Step 3: Present the Report

```
Pi Harness Audit Report
════════════════════════

Overall Maturity: [X/21] — [Nascent|Developing|Solid|Advanced|Elite]

Pillar Scores:
  1. Skill Composition      [█░░] 1/3
  2. Context Engineering   [██░] 2/3
  3. Orchestration         [░░░] 0/3
  4. Persistence & State    [██░] 2/3
  5. Quality Gates         [█░░] 1/3
  6. Permissions & Safety  [███] 3/3
  7. Ergonomics & Trust    [█░░] 1/3

Top 3 Recommendations:
  1. Create .pi/prompts/project.md with essential commands
  2. Set up .pi/memory/ for cross-session persistence
  3. Add a post-edit hook for auto-formatting
```

### Maturity Levels

- 0-5: **Nascent** — Just getting started
- 6-10: **Developing** — Foundation in place
- 11-15: **Solid** — Good working harness
- 16-18: **Advanced** — Well-engineered setup
- 19-21: **Elite** — Comprehensive, actively maintained

### Step 4: Recommend Next Steps

Prioritize by impact:
- **Quick wins**: Things that can be fixed in minutes
- **High impact**: Things that most improve the experience
- **Long-term**: Things that pay off over time

Offer to execute the top recommendation immediately.
