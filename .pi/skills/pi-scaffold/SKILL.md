---
name: pi-scaffold
description: "Generate project context for pi using prompts and memory. Use when creating new project setup, generating boilerplate, or documenting project structure."
---

# Pi Scaffold

Generate project-tailored harness structure.

## Scaffold Process

1. Analyze project type (Node, Python, Rust, etc.)
2. Detect build/test commands
3. Identify conventions from existing code
4. Generate prompts
5. Create memory entries

## Generated Artifacts

### Prompts
- `project.md` — overview, commands, structure
- `test.md` — testing approach
- `style.md` — conventions

### Memory
- Project type classification
- Key decisions documented
- Reference links

## Customization

Generated scaffold is a starting point. Customize via:
- `/skill:pi-context` — refine prompts
- `/skill:pi-memory` — expand memory
- `/skill:pi-permissions` — tune permissions
