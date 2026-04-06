---
name: pi-routing
description: Design agent orchestration, routing, parallelization, and subagent delegation. Use when designing workflows or deciding when to parallelize. Triggers on: "parallelize", "subagent", "orchestration", or any question about distributing work.
---

# Pi Routing

Design orchestration strategies. Analyze workflows, recommend routing, parallelization, and delegation strategies.

## Core Decision: Subagent vs. Inline

### Use a Subagent When

- **Self-contained**: Clear inputs, clear outputs, doesn't need shared state mid-execution
- **Expensive but independent**: Large searches, test runs, multi-file analysis
- **Risky**: Experimental changes that might corrupt working state
- **Needs different mindset**: Deep review vs. planning vs. generation

### Keep Inline When

- **Trivial**: Single file edit, quick lookup
- **Needs user clarification**: Interactive refinement
- **Mutates dependent state**: Step 2 reads what step 1 wrote

## Parallelization Strategy

### Parallelize These

- Independent research queries (find usages + find config + read test)
- Test runs across modules
- Multi-file analysis
- Exploration + planning (gather facts while drafting plan)

### Serialize These

- State-changing sequences (create → make changes → commit → push)
- Dependent analysis (find entry point → trace call chain → identify bug)
- User-facing decisions (present options → get input → execute)
- File modifications to the same file

## Subagent Types

### Explore Agents (fast, focused)

Use for: codebase search, pattern finding, file discovery.

Strengths: speed, low cost, can fire many in parallel.
Weaknesses: no deep reasoning, no modifications.

### Plan Agents (architecture, strategy)

Use for: designing approaches, breaking down tasks, identifying risks.

Strengths: deep reasoning, holistic view, risk identification.
Weaknesses: slow, output needs validation.

### General Agents (complex tasks)

Use for: implement a feature, fix a bug, write tests.

Strengths: multi-step, iterate on failures, produce working code.
Weaknesses: expensive, need clear constraints.

### Validation Agents (quality gates)

Use for: reviewing another agent's output, running tests, checking style.

Strengths: independent judgment.
Weaknesses: need clear criteria.

## Build-Loop Pattern

```
1. Assess current state (what's done, what's next)
2. Pick next phase from plan
3. Route to appropriate specialist agent
4. Collect output
5. Validate output (tests pass, requirements met)
6. Log progress
7. Update plan if needed
8. Repeat until complete
```

### Phase Design

- Each phase produces a testable artifact
- Order by dependency (foundation before features)
- Keep phases small enough to validate
- Design rollback points

## Worktree Isolation

Use when:
- Experimental changes (fail → discard, no cleanup)
- Parallel branches (two agents on different branches)
- Risky refactors (work in worktree, merge if tests pass)

Don't use when:
- Simple edits
- Already on feature branch
- Shared state dependencies

## Background Agents

### Fire-and-Forget

Use when: result logged but not needed by orchestrator's next step.
Pattern: launch, don't wait, check results later.

### Results-Needed

Use when: orchestrator needs result before proceeding.
Pattern: launch, continue independent work, collect at sync point.

## Error Handling

### Failure Modes

- **Wrong output**: Validation catches this. Re-route with more specific instructions.
- **Times out**: Kill, log, retry with simpler scope.
- **Corrupts state**: Use worktree isolation. Discard on failure.
- **Off-track**: Improve brief with more constraints.

### Retry Strategy

1. First retry: same specialist, more specific instructions
2. Second retry: different specialist or approach
3. Third failure: escalate to user

## Applying to a Project

1. **Map task types**: What kinds of work does this project require?
2. **Identify parallelism**: Which tasks are independent?
3. **Find constraints**: Which have dependencies?
4. **Design phases**: Break common task into 5-10 validated phases
5. **Identify risks**: What could break the build?
6. **Build routing table**: Map task descriptions to specialists
7. **Define validation**: What does success look like?
8. **Design progress log**: What info needed to resume?
