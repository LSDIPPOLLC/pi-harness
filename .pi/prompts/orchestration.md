# Orchestration Prompt

Use this prompt when coordinating multiple subagents or tasks.

## Subagent Guidelines

### Task Decomposition
1. Break complex tasks into atomic, independent subtasks
2. Each subagent should have a clear, single responsibility
3. Define clear inputs/outputs between subagents

### Communication Patterns
- **Parallel Execution**: Use when subtasks are independent (e.g., file reads, searches)
- **Sequential**: Use when subtask output feeds into next task
- **Hierarchical**: Use for complex multi-level coordination

### Error Handling
- Subagents should report failures clearly with context
- Main orchestrator decides retry, skip, or abort strategy
- Log all subagent results for debugging

### Coordination Commands
```
/delegate <task>    # Assign to subagent
/status             # Check all subagent progress
/cancel <id>        # Cancel running subagent
/results            # Aggregate all subagent outputs
```

### Best Practices
- Keep subagent prompts focused and concise
- Provide all necessary context upfront
- Set explicit success criteria for each subtask
- Use consistent naming conventions across agents

### Parallelization Patterns

#### Fire-and-Forget (Async, No Result Collection)
Use when tasks are independent and their outputs aren't needed for the main flow.

```markdown
/Delegate: Search all 5 documentation files for "authentication" patterns
/Delegate: Find all TODO comments in src/
/Delegate: List all environment variables used in config/

# Main task continues - delegates run in background
# Results available via /status or /results if needed
```

#### Results-Needed (Sync Parallel, Aggregate All)
Use when all subtask results are required before proceeding.

```markdown
/Delegate: Read file1.md and summarize key points
/Delegate: Read file2.md and summarize key points  
/Delegate: Read file3.md and summarize key points

# Wait for all via /results
# Aggregate: Combine summaries into unified overview
# Proceed only after all results received
```

#### Tool Batching (Single Agent, Multiple Operations)
Use when one agent needs to perform multiple related operations efficiently.

```markdown
Execute these operations in parallel:
1. Read src/config.ts - extract all env var references
2. Read src/constants.ts - list all hardcoded values
3. Grep src/ - find all 'TODO:' comments
4. List src/ - show directory structure

# Return results as structured array, maintain operation order
```

#### Parallelization Decision Matrix

| Pattern | Latency | Result Usage | Failure Handling | Best For |
|---------|---------|--------------|------------------|----------|
| Fire-and-forget | Lowest | Optional | Log & continue | Logging, analytics, notifications |
| Results-needed | Highest | Required | Retry affected | Aggregations, comparisons |
| Tool batching | Medium | Required | Partial fail | Related reads, batch operations |

### Coordination Commands
```
/delegate <task>    # Assign to subagent (use -p flag for parallel)
/status             # Check all subagent progress
/cancel <id>        # Cancel running subagent
/results            # Aggregate all subagent outputs
/wait               # Block until all parallel tasks complete
/abort              # Cancel all running subtasks
```

### Error Handling Strategies
- **Fail-fast**: Abort all if any critical subtask fails
- **Best-effort**: Collect available results, log failures
- **Retry-with-backoff**: Re-attempt failed tasks up to N times
- **Fallback**: Use cached/stale results if fresh data unavailable
