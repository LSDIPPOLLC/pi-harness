#!/usr/bin/env bash
# pi-validate: PostToolUse hook for Edit/Write on harness files
# Validates changes to harness configuration files

set -euo pipefail

TOOL_INPUT="${CLAUDE_TOOL_INPUT:-}"
FILE_PATH=""

if command -v jq &>/dev/null; then
    FILE_PATH=$(echo "$TOOL_INPUT" | jq -r '.file_path // empty' 2>/dev/null || true)
fi

if [[ -z "$FILE_PATH" ]]; then
    exit 0
fi

BASENAME=$(basename "$FILE_PATH")
ERRORS=""

# settings.json checks
if [[ "$BASENAME" == "settings.json" ]]; then
    if [[ -f "$FILE_PATH" ]] && command -v jq &>/dev/null; then
        if ! jq empty "$FILE_PATH" 2>/dev/null; then
            ERRORS+="BLOCKED: settings.json has invalid JSON. Fix before proceeding.\n"
            echo -e "$ERRORS"
            exit 2
        fi
    fi
fi

# SKILL.md checks (validate YAML frontmatter)
if [[ "$BASENAME" == "SKILL.md" ]]; then
    if [[ -f "$FILE_PATH" ]]; then
        if command -v python3 &>/dev/null; then
            if ! python3 -c "import yaml; yaml.safe_load(open('$FILE_PATH').read().split('---')[1])" 2>/dev/null; then
                ERRORS+="WARNING: $FILE_PATH has invalid YAML frontmatter.\n"
            fi
        fi
    fi
fi

# Hook script checks
if [[ "$FILE_PATH" == *"/hooks/"* && "$FILE_PATH" == *.sh ]]; then
    if [[ -f "$FILE_PATH" && ! -x "$FILE_PATH" ]]; then
        chmod +x "$FILE_PATH"
        ERRORS+="NOTE: Made $BASENAME executable.\n"
    fi
fi

# .pi prompts/*.md checks
if [[ "$FILE_PATH" == .pi/prompts/*.md ]]; then
    if [[ -f "$FILE_PATH" ]]; then
        # Check for frontmatter
        if head -1 "$FILE_PATH" | grep -q "^---"; then
            # Has frontmatter, check it's valid
            if command -v python3 &>/dev/null; then
                CONTENT=$(awk '/^---/{p=1;next} /^---/{p=0} p' "$FILE_PATH" | head -20)
                if ! echo "$CONTENT" | python3 -c "import yaml; yaml.safe_load(sys.stdin)" 2>/dev/null; then
                    ERRORS+="WARNING: $FILE_PATH has invalid YAML frontmatter.\n"
                fi
            fi
        fi
    fi
fi

if [[ -n "$ERRORS" ]]; then
    echo -e "$ERRORS"
fi

exit 0
