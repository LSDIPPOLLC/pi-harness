---
name: pi-routing
description: "Design agent orchestration, routing, parallelization, and subagent patterns for pi. Use when structuring complex workflows or delegation."
---

# Pi Routing

Design how tasks route to specialist agents or get executed.

## Decision Matrix

| Scenario | Approach |
|----------|----------|
| Independent research | Parallel subagents |
| State-changing sequence | Serialize |
| Trivial task | Inline execution |
| Complex multi-step | Compose skills |

## Subagent Patterns

### Research Subagent
For gathering info from multiple sources:
```
/skill:research "compare testing frameworks"
```

### Build Subagent
For independent implementation:
```
/skill:build "implement auth module"
```

## Parallelization

Run independent tasks concurrently:
```
Task A ──┐
Task B ──┼──> Results
Task C ──┘
```

## Skill Composition

Chain skills for workflows:
```
pi-scaffold(build) + pi-gates(test) + pi-routing(deploy)
```
