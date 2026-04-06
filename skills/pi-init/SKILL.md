---
name: pi-init
description: Bootstrap a complete pi harness for a project from scratch. Use when initializing or bootstrapping for pi — creating prompts, configuring settings, setting up memory and hooks. Triggers on: "set up pi", "initialize harness", "bootstrap this project", or any request to get a project ready for productive pi usage.
---

# Pi Init

A composed skill that orchestrates a full project bootstrap by running multiple atomic skills in sequence.

## Bootstrap Sequence

### Phase 1: Scaffold (required)

**Skill**: `pi-scaffold`

Generate prompts in `.pi/prompts/` with project-specific context and setup `.pi/memory/` structure.

Present the generated prompts for review before proceeding.

### Phase 2: Permissions (required)

**Skill**: `pi-permissions`

Configure permissions based on detected tech stack:
- Auto-allow reads and local builds
- Prompt for shared-state mutations

### Phase 3: Memory (recommended)

**Skill**: `pi-memory`

Set up the persistence layer:
- Create memory directory structure
- Initialize MEMORY.md index
- Seed with project context discovered during scaffolding

### Phase 4: Hooks (optional)

**Skill**: `pi-hooks`

Recommend and create hooks based on project tooling:
- Auto-format on save (if formatter detected)
- Lint on edit (if linter detected)
- Test on change (if test framework detected)

Let the user choose which hooks to install.

## Completion Checklist

```
Pi Harness Bootstrap Complete
──────────────────────────────
✓ .pi/prompts/project.md created
✓ .pi/settings.json configured
✓ .pi/memory/ initialized
✓ Hooks installed: [list]

Next steps:
- Run /pi-audit after a few sessions
- Add memories as you discover preferences
- Create workflow prompts as needed (/test, /build, etc.)
```

## Adapting to Existing Harnesses

If the project already has harness files:
- Don't overwrite existing prompts — merge or offer to rewrite
- Don't duplicate existing permissions
- Don't create memory structure if one exists
- Skip phases already well-covered

Consider suggesting `pi-audit` instead for existing projects.

## Usage After Bootstrap

After setup, pi will have project context via:
- `/project` — project overview and commands
- `/test` — run tests (if created)
- `/build` — build project (if created)
- `/skill:pi-memory` — access memories

The user invokes these explicitly — pi doesn't auto-load them.
