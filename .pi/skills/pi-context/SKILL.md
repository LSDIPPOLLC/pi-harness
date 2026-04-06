---
name: pi-context
description: "Optimize pi project context using prompts. Use when prompts are too verbose, not loading properly, or need better organization."
---

# Pi Context

Optimize what pi loads via prompts and how it's organized. For pi, context lives in:
- `.pi/prompts/*.md` — loaded when invoked via `/prompt-name`
- `.pi/memory/*.md` — persistent cross-session knowledge

## Why Context Engineering Matters

Unlike Claude Code's auto-loaded CLAUDE.md, pi uses explicit prompt invocation. This means:
- **Context is opt-in** — prompts must be created and invoked
- **Context is discoverable** — `/` shows available prompts
- **Context is composable** — combine prompts as needed

The goal: create the right prompts so `/project` gives pi everything it needs.

## Step 1: Audit Current Prompts

### List Existing Prompts

```bash
ls -la .pi/prompts/
```

### Evaluate Each Prompt

For each prompt in `.pi/prompts/`:

| Classification | Action |
|----------------|--------|
| **Essential** — project overview, commands | Keep, front-load |
| **Workflow** — test, build, deploy | Keep if used regularly |
| **Reference** — long docs, schemas | Consider moving to memory |
| **Unused** — never invoked | Remove or archive |
| **Stale** — outdated info | Update or delete |

### Check Memory Index

```bash
cat .pi/memory/MEMORY.md
```

- Are memories organized by type (user, feedback, project, reference)?
- Is the index consistent with actual memory files?

## Step 2: Design Context Layers

### Layer 1: Always Available Prompts

Content relevant to every session:
- `project.md` — project overview, essential commands
- `style.md` — code style and conventions

These should be short triggers that remind pi of key info.

### Layer 2: Workflow Prompts

Content for specific tasks:
- `test.md` — how to run tests
- `build.md` — build procedures
- `deploy.md` — deployment steps
- `review.md` — code review checklist

Create as needed, not upfront.

### Layer 3: Memory (Persistent)

Information spanning sessions:
- User preferences (feedback memories)
- Project decisions and status
- External system references

### Layer 4: On-Demand

Information pi can find when needed:
- File contents (pi reads files)
- Git history (pi runs git commands)
- Config details (pi reads config files)

Don't put in prompts what pi can discover.

## Step 3: Optimize Prompts

### Front-loading Principle

In each prompt, put the most important info first:
1. Essential commands (build, test, run)
2. Critical conventions
3. Warnings or constraints
4. Everything else

### Conciseness Patterns

Keep prompts concise. If content exceeds ~15 lines, consider splitting or moving details to memory.

### Deduplication

If a convention is documented elsewhere (config files, code):
- Don't repeat it in prompts
- Just reference: "Follow .eslintrc for style"

## Step 4: Validate

1. **Completeness**: Does `/project` give pi build/test/run commands?
2. **Freshness**: Is everything in prompts still accurate?
3. **Discoverability**: Are prompts named clearly?
4. **Usage**: Are workflow prompts actually being used?

## Step 5: Set Up Maintenance

- Review prompts monthly
- Update when project structure changes
- Remove stale prompts
- Add new workflow prompts as patterns emerge

## Prompt Naming Conventions

| Pattern | Example | Use |
|---------|---------|-----|
| `verb.md` | `test.md`, `build.md` | Action-oriented |
| `noun.md` | `project.md`, `architecture.md` | Overview/info |
| `workflow-noun.md` | `deploy-production.md` | Specific workflows |
