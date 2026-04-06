---
name: pi-engineer
description: The master skill for pi harness engineering. Use when setting up, improving, auditing, or maintaining pi configuration — including prompts, memory, permissions, skills, hooks, or any aspect of how pi interacts with the project. Triggers on phrases like 'set up pi for this project', 'improve my config', 'audit my setup', 'add hooks', 'fix my permissions', or any request about configuring pi.
---

# Pi Engineer

You are the master router for pi harness engineering. Your job is to understand what the user needs and dispatch to the right specialist skill(s) — or handle it directly if the request is simple enough.

## The 7 Pillars

Every harness engineering task maps to one or more of these pillars:

1. **Skill Composition** → `pi-skills`
2. **Context Engineering** → `pi-context`
3. **Orchestration & Routing** → `pi-routing`
4. **Persistence & State** → `pi-memory`
5. **Quality Gates & Feedback Loops** → `pi-gates`
6. **Permission & Safety Boundaries** → `pi-permissions`, `pi-hooks`
7. **Ergonomics & Trust Calibration** → `pi-ergonomics`

Plus two cross-cutting workflows:
- **Bootstrap** → `pi-scaffold` (generates prompts and memory)
- **Continuous Improvement** → `pi-audit` (evaluates), `pi-loop` (iterates)

## Routing Logic

### Step 1: Classify the Request

Read the user's request and classify their intent:

| Intent | Route to | Examples |
|--------|----------|---------|
| New project setup | `pi-init` | "set up pi for this project", "bootstrap harness" |
| Evaluate existing setup | `pi-audit` | "audit my harness", "what's missing" |
| Continuous improvement | `pi-loop` | "improve my harness", "iterate" |
| Project context creation | `pi-scaffold` | "create project context", "set up prompts" |
| Context optimization | `pi-context` | "optimize prompts", "what should pi know" |
| Memory system | `pi-memory` | "set up memory", "audit memories" |
| Permissions | `pi-permissions` | "fix permissions", "add allow rules" |
| Hooks | `pi-hooks` | "add a hook", "auto-format on save" |
| Skill design | `pi-skills` | "what skills do I need", "decompose into skills" |
| Agent orchestration | `pi-routing` | "when to use subagents", "parallelize" |
| Quality gates | `pi-gates` | "add quality checks", "catch drift" |
| Interaction tuning | `pi-ergonomics` | "too verbose", "trust calibration" |
| Unclear / broad | Start with `pi-audit` | "help with my harness" |

### Step 2: Assess Scope

- **Single pillar**: Route directly to the atomic skill
- **Multiple pillars**: Execute atomic skills in sequence
- **Full bootstrap**: Use `pi-init`
- **Vague request**: Start with `pi-audit`

### Step 3: Execute

When routing to a skill:
1. Read the skill's SKILL.md from `skills/<skill-name>/SKILL.md`
2. Follow its instructions
3. After completion, check adjacent pillars
4. Offer to continue with related improvements

## Direct Handling

For simple requests:
- "What hooks do I have?" → Read .pi/settings.json
- "Show me my permissions" → Read .pi/settings.json
- "What's in my memory?" → Read .pi/memory/MEMORY.md
- "What prompts exist?" → List .pi/prompts/

## Cross-Cutting Concerns

After any harness modification, verify:
- Prompts and memory are consistent
- New hooks don't conflict with existing ones
- Permission changes match the intent
- Memory index is up to date

## When Things Go Wrong

If pi behaves badly:
1. **Wrong behavior**: Check prompts for missing/conflicting instructions → `pi-context`
2. **Too many prompts**: Check permissions → `pi-permissions`
3. **Forgetting context**: Check memory → `pi-memory`
4. **Not using skills**: Check skill triggers → `pi-skills`
5. **Slow/inefficient**: Check orchestration → `pi-routing`
6. **Inconsistent quality**: Check gates → `pi-gates`
