#!/usr/bin/env bash
# pi-drift: Stop hook for end-of-conversation harness health check

set -euo pipefail

ISSUES=""
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"

# Memory index sync check
MEMORY_DIR=""
if [[ -d "$PROJECT_DIR/.pi/memory" ]]; then
    MEMORY_DIR="$PROJECT_DIR/.pi/memory"
fi

if [[ -n "$MEMORY_DIR" && -f "$MEMORY_DIR/MEMORY.md" ]]; then
    MEMORY_FILES=$(find "$MEMORY_DIR" -name "*.md" ! -name "MEMORY.md" -type f 2>/dev/null | wc -l || echo 0)
    INDEX_ENTRIES=$(grep -c '^\s*-\s*\[' "$MEMORY_DIR/MEMORY.md" 2>/dev/null || echo 0)

    DIFF=$(( MEMORY_FILES - INDEX_ENTRIES ))
    if (( DIFF > 2 )) || (( DIFF < -2 )); then
        ISSUES+="DRIFT: Memory index has $INDEX_ENTRIES entries but found $MEMORY_FILES files. MEMORY.md may be out of sync.\n"
    fi
fi

# Orphaned hook check
if [[ -f "$PROJECT_DIR/.pi/settings.json" ]] && command -v jq &>/dev/null; then
    HOOK_COMMANDS=$(jq -r '.hooks[]?.command // empty' "$PROJECT_DIR/.pi/settings.json" 2>/dev/null || true)
    while IFS= read -r cmd; do
        [[ -z "$cmd" ]] && continue
        SCRIPT=$(echo "$cmd" | grep -oE '[^ ]+\.(sh|py|js)' | head -1 || true)
        if [[ -n "$SCRIPT" && ! -f "$SCRIPT" && ! -f "$PROJECT_DIR/$SCRIPT" ]]; then
            ISSUES+="MISSING: Hook references '$SCRIPT' but file doesn't exist.\n"
        fi
    done <<< "$HOOK_COMMANDS"
fi

# Settings.json validation check
if [[ -f "$PROJECT_DIR/.pi/settings.json" ]] && command -v jq &>/dev/null; then
    if ! jq empty "$PROJECT_DIR/.pi/settings.json" 2>/dev/null; then
        ISSUES+="INVALID: .pi/settings.json has invalid JSON.\n"
    fi
fi

# Skill frontmatter check
SKILLS_DIR="$PROJECT_DIR/.pi/skills"
if [[ -d "$SKILLS_DIR" ]]; then
    for skill_md in "$SKILLS_DIR"/*/SKILL.md; do
        [[ -f "$skill_md" ]] || continue
        if command -v python3 &>/dev/null; then
            if ! python3 -c "import yaml; yaml.safe_load(open('$skill_md').read().split('---')[1])" 2>/dev/null; then
                SKILL_NAME=$(basename $(dirname "$skill_md"))
                ISSUES+="YAML ERROR: $SKILL_NAME/SKILL.md has invalid frontmatter.\n"
            fi
        fi
    done
fi

if [[ -n "$ISSUES" ]]; then
    echo -e "Harness health check:\n$ISSUES"
fi

exit 0
