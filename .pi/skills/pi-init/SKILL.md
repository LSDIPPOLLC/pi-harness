---
name: pi-init
description: "Bootstrap a complete pi harness for a project from scratch. Use when setting up pi for a new project or initializing harness structure."
---

# Pi Init

Bootstrap a complete harness for the current project. Orchestrates multiple skills.

## What Gets Created

```
.pi/
├── settings.json       # Permissions and hooks
├── prompts/
│   ├── project.md      # Project overview
│   ├── test.md        # Testing commands
│   └── style.md       # Code style
├── memory/
│   └── MEMORY.md      # Memory index
└── hooks/
    └── pi-validate.sh  # Validation hook
```

## Bootstrap Process

1. Analyze project structure
2. Create essential prompts
3. Set up memory system
4. Configure permissions
5. Add quality hooks

## Customization

After bootstrap, customize via:
- `/skill:pi-context` — tune prompts
- `/skill:pi-permissions` — adjust permissions
- `/skill:pi-ergonomics` — set interaction style
