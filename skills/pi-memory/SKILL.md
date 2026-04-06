---
name: pi-memory
description: Design, set up, audit, and maintain pi memory system. Use when creating memory structure, organizing memories, or auditing for staleness. Triggers on: "set up memory", "organize memories", "audit my memories", "remember across sessions", or any request about persistent cross-session state.
---

# Pi Memory

Design and maintain the memory system for pi. Memory transforms pi from stateless to persistent — it remembers your project, preferences, and past work across sessions.

## Memory Types

| Type | What it stores | Example |
|------|---------------|---------|
| **user** | User role, preferences, expertise | "Senior backend engineer, prefers terse output" |
| **feedback** | Corrections AND confirmations | "Don't mock the DB in integration tests" |
| **project** | Ongoing work, decisions, status | "Auth rewrite driven by compliance" |
| **reference** | External systems and resources | "Pipeline bugs tracked in Linear" |

## Step 1: Check Current State

Look for existing memory structure:

```
.pi/memory/
  MEMORY.md          # Index
  *.md               # Individual memories
```

## Step 2: Create Memory Structure

### Directory and Index

```bash
mkdir -p .pi/memory
```

MEMORY.md format:
```markdown
# Memory Index

## User
- [User Role](user_role.md) — Senior backend eng, prefers terse output

## Feedback
- [Testing Approach](feedback_testing.md) — Use real DB, never mock integration tests

## Project
- [Auth Rewrite](project_auth_rewrite.md) — Compliance-driven, deadline March 2026

## References
- [Bug Tracker](reference_bug_tracker.md) — Linear project INGEST
```

## Step 3: Memory File Format

Each memory is a separate .md file:

```markdown
---
name: descriptive-name
description: One-line description for relevance checking
type: user|feedback|project|reference
---

Content here.

**Why:** The reason behind it.

**How to apply:** When and where this guidance kicks in.
```

## Step 4: Audit Existing Memories

Check each memory:
- Has complete frontmatter (name, description, type)
- Description is specific enough to judge relevance
- Content is still accurate
- Not duplicated by another memory

### Common Problems

| Problem | Fix |
|---------|-----|
| Missing frontmatter | Add name, description, type |
| Vague description | Rewrite to be specific |
| Stale content | Update or delete |
| Duplicate memories | Merge into one |

### Index Sync Check

```bash
# Memory files
find .pi/memory -name "*.md" ! -name "MEMORY.md" | wc -l

# Index entries
grep -c '^\s*-\s*\[' .pi/memory/MEMORY.md
```

## What Belongs Where

| Information | Where |
|------------|-------|
| Build commands, code style | Prompts (`.pi/prompts/`) |
| User's role, expertise | Memory (user) |
| "Don't do X" corrections | Memory (feedback) |
| Active sprint/deadline | Memory (project) |
| External system URLs | Memory (reference) |
| Current task steps | In conversation, not memory |

## Memory Hygiene

1. **Create on discovery**: Save non-obvious information immediately
2. **Update on change**: Don't create new memories for updates
3. **Delete on completion**: Project memories for finished work
4. **Review monthly**: Remove stale entries

## Anti-patterns

- **Hoarding**: Saving everything "just in case"
- **Duplicating prompts**: If it's in a prompt, don't also put in memory
- **Storing code**: Memory is for human context, not code patterns
- **Relative dates**: "Next Thursday" meaningless in future sessions — use absolute dates
