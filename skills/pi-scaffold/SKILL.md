---
name: pi-scaffold
description: Generate project context for pi using prompts and memory. Use when setting up pi for a project, creating project-specific context, or bootstrapping. Triggers on: "create project context", "set up pi for this project", "scaffold prompts", or any request to create foundational harness files for pi.
---

# Pi Scaffold

Generate project-tailored prompts in `.pi/prompts/` and set up the harness structure for pi.

## How Pi Gets Context

Unlike Claude Code which auto-loads CLAUDE.md, pi uses:
- **Prompts** (`.pi/prompts/*.md`) — loaded via `/prompt-name`, expandable templates
- **Memory** (`.pi/memory/*.md`) — persistent cross-session knowledge
- **Skills** — loaded on-demand via `/skill:skill-name`

This skill creates the prompts and memory that make pi understand your project.

## Step 1: Detect the Tech Stack

Read project files:

**Package/build manifests:**
- `package.json` — Node.js/JS/TS projects
- `pyproject.toml` / `requirements.txt` — Python projects
- `Cargo.toml` — Rust projects
- `go.mod` — Go projects
- `Makefile` / `justfile` — Task runners

**Code style:**
- `.editorconfig` — Editor settings
- `.prettierrc` / `.eslintrc*` — Formatting/linting
- `tsconfig.json` — TypeScript config
- `ruff.toml` — Python linting

**CI/CD:**
- `.github/workflows/` — GitHub Actions
- `.gitlab-ci.yml` — GitLab CI

## Step 2: Analyze Git History

```bash
# Commit style
git log --oneline -20

# Active directories
git log --pretty=format: --name-only -50 | sort | uniq -c | sort -rn | head -20
```

## Step 3: Extract Engineering Patterns

Sample files from active directories to understand:
- Component patterns (React/Vue/Svelte)
- State management approach
- Data fetching conventions
- Error handling patterns
- Testing philosophy

## Step 4: Create Prompts

Pi uses `.pi/prompts/` for project context. Create templates that are loaded when invoked.

### Required: Project Overview

Create `.pi/prompts/project.md`:

```markdown
---
description: Project overview and key commands
---
# $PROJECT_NAME

$ONE_LINE_DESCRIPTION

## Essential Commands

\`\`\`bash
# Install dependencies
$INSTALL_CMD

# Run development
$DEV_CMD

# Run tests
$TEST_CMD

# Build
$BUILD_CMD
\`\`\`

## Project Structure

- `src/` — $PURPOSE
- `tests/` — $PURPOSE
- `docs/` — $PURPOSE

## Code Style

- Language: $LANGUAGE
- Formatting: $FORMATTER
- Naming: $NAMING_CONVENTION
```

### Recommended: Common Workflows

Create `.pi/prompts/test.md`:

```markdown
---
description: Run tests
---
Run the test suite. Report pass/fail counts and any failures.
```

Create `.pi/prompts/build.md`:

```markdown
---
description: Build the project
---
Build the project. Report success or any build errors.
```

### Optional: Stack-Specific

- `deploy.md` — Deployment procedures
- `migrate.md` — Migration steps
- `review.md` — Code review checklist

## Step 5: Create Memory Seed

Create `.pi/memory/` structure:

```bash
mkdir -p .pi/memory
```

Create `.pi/memory/MEMORY.md` index:

```markdown
# Memory Index

## User
- [User Role](user_role.md)

## Feedback
- [Testing Approach](feedback_testing.md)

## Project
- [Architecture](project_architecture.md)
```

## Step 6: Present and Confirm

Show the created prompts and ask:
1. "Does this accurately describe your project?"
2. "Are there workflows that should have prompts?"
3. "Any conventions I should know about?"

## Prompt Best Practices

- **Use `$VARIABLE` syntax** for user arguments: `/project Button` → `$1 = "Button"`
- **Keep prompts short** — a prompt should be a trigger, not a tutorial
- **One purpose per prompt** — `/test` runs tests, `/test-coverage` runs with coverage
- **Be specific** — "Use Zustand for state" not "use a state library"

## Common Pitfalls

- **Too generic**: "This is a TypeScript project" → "SvelteKit + TypeScript strict mode, Tailwind, Vercel"
- **Too verbose**: Keep prompts as triggers, not documentation
- **Missing commands**: The #1 thing pi needs is build/test/run commands
