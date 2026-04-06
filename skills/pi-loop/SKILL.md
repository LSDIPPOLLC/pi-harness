---
name: pi-loop
description: Continuous improvement loop for pi harnesses. Use when iteratively improving harness or systematically working through gaps. Triggers on: "improve my harness", "iterate on the harness", "keep improving", or when wanting to systematically address harness gaps.
---

# Pi Loop

A continuous improvement cycle that identifies the weakest pillar, improves it, validates the improvement, and moves to the next.

## The Loop

```
┌─────────────────────────────────┐
│  1. Audit (assess current state) │
├─────────────────────────────────┤
│  2. Identify (weakest pillar)    │
├─────────────────────────────────┤
│  3. Improve (apply atomic skill) │
├─────────────────────────────────┤
│  4. Validate (check improvement) │
├─────────────────────────────────┤
│  5. Continue? (user decides)     │
└─────────────────────────────────┘
```

### Step 1: Audit

Run `pi-audit` to get current pillar scores (or use recent audit results).

### Step 2: Identify the Target

Pick the pillar to improve:
1. **Lowest score first** — bring up the floor before polishing the ceiling
2. **User preference** — if they care more about X, do X
3. **Dependencies** — some pillars depend on others

Tell the user: "Your weakest area is [X] (score [N]/3). I'll focus on improving that."

### Step 3: Improve

Route to the appropriate atomic skill:

| Pillar | Atomic Skill |
|--------|-------------|
| Skill Composition | `pi-skills` |
| Context Engineering | `pi-scaffold` / `pi-context` |
| Orchestration & Routing | `pi-routing` |
| Persistence & State | `pi-memory` |
| Quality Gates | `pi-gates` |
| Permissions & Safety | `pi-permissions` |
| Ergonomics & Trust | `pi-ergonomics` |
| Hooks | `pi-hooks` |

### Step 4: Validate

After improvement:
1. Re-score the target pillar — did the score improve?
2. Check for regressions in adjacent pillars
3. Verify consistency

### Step 5: Continue or Stop

Present updated scores and ask: "Want to continue to the next pillar, or stop here?"

If continuing, move to the next weakest pillar and repeat.

## Session Continuity

If the user returns and says "keep improving my harness":
1. Check for improvement log memory
2. Re-audit for fresh scores
3. Resume from where they left off

## Parallel Improvements

For advanced users who want to move faster:
- Identify 2-3 independent pillars
- Execute atomic skills concurrently
- Validate all changes together
