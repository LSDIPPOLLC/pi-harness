---
name: pi-skills
description: Analyze project workflows and decompose them into a skill system. Use when identifying what skills a project needs or organizing pi commands. Triggers on: "what skills do I need", "decompose into skills", "skill analysis", or any request about organizing automated workflows.
---

# Pi Skills

Analyze a project's workflows and design a skill system. Skills capture workflows so pi can execute them reliably.

## Why Skill Decomposition Matters

Without skills, complex workflows live in the user's head. Skills capture deployment processes, review checklists, migration steps so pi can execute them reliably.

Too many skills create decision fatigue. The goal is minimum set covering maximum workflow surface.

## Step 1: Discover Workflows

### Ask the User

1. "What are the 3-5 things you do most often with pi?"
2. "What multi-step processes do you find yourself explaining repeatedly?"
3. "What's annoying about working with pi on this project?"

### Analyze Git History

```bash
# What kinds of changes happen most?
git log --oneline -100 | head -30

# Commit message patterns
git log --oneline -100 | grep -oiE '^\w+\s+(add|fix|update|refactor|test|deploy)' | sort | uniq -c
```

### Survey Existing Prompts

```bash
# Existing prompts
ls .pi/prompts/ 2>/dev/null

# Existing skills
ls .pi/skills/ 2>/dev/null
```

## Step 2: Classify Candidates

| Question | Yes → Skill | No → Something else |
|----------|------------|-------------------|
| Multi-step? (>3 steps) | Skill | Simple prompt |
| Recurring? (>1x/week) | Skill | One-off |
| Needs context? | Skill | Generic enough |
| Benefits from structure? | Skill | Free-form fine |

### Skill vs. Prompt vs. Memory

| Artifact | Use when | Loaded |
|----------|----------|--------|
| **Skill** | Complex workflow, needs structure | Via `/skill:name` |
| **Prompt** | Simple trigger, workflow steps | Via `/prompt-name` |
| **Memory** | Persistent preferences/facts | Via memory system |

## Step 3: Design the Skill Map

### Atomic Skills

Each has:
- Clear trigger (when does a user need this?)
- Bounded scope (what's in and out?)
- Defined output (what does done look like?)

### Composed Skills

Workflows that chain atomic skills:
- Deploy = build → test → push → verify
- Release = bump version → changelog → tag → deploy

### Entry Points

If many skills, consider a router:
- User says vague thing → router figures out which skill(s)
- Prevents user needing to know all skill names

## Step 4: Check for Problems

### Overlap Detection

Two skills overlap when a prompt could trigger either:
- Are descriptions distinct enough?
- Would user know which to use?

### Gap Detection

For common patterns (deploy, test, review):
- Is there a skill covering this?
- Would having one save meaningful time?

### Trigger Quality

- **Too narrow**: "Use when user says 'deploy to staging'" — misses "push to staging"
- **Too broad**: "Use for any code task" — triggers on everything
- **Keyword collision**: Two skills mention "test"

## Step 5: Recommend and Build

Present in priority order:

1. **Must-have** — Daily workflows currently requiring re-explanation
2. **Nice-to-have** — Weekly workflows or improvements
3. **Later** — Rare workflows or future needs

For each:
- Name and description
- What it does
- What triggers it
- Estimated complexity

## Maintenance

Skills need occasional maintenance:
- **Trigger tuning**: If skill never fires, description needs work
- **Scope creep**: If skill keeps growing, split it
- **Staleness**: If workflow changed, update skill
- **Redundancy**: If two skills converged, merge them
