#!/usr/bin/env bash
# pi-validate: PostToolUse hook for Edit/Write on harness files
# Validates changes to CLAUDE.md, settings.json, and hook scripts

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

# CLAUDE.md checks
if [[ "$BASENAME" == "CLAUDE.md" ]]; then
    if [[ -f "$FILE_PATH" ]]; then
        LINE_COUNT=$(wc -l < "$FILE_PATH")
        if (( LINE_COUNT > 800 )); then
            ERRORS+="WARNING: CLAUDE.md is $LINE_COUNT lines. Consider moving content to commands/ to stay within context budget.\n"
        fi

        # Check for secrets
        if grep -qiE '(api[_-]?key|secret|password|token)\s*[:=]\s*["\x27]?[A-Za-z0-9+/=]{20,}' "$FILE_PATH" 2>/dev/null; then
            ERRORS+="BLOCKED: CLAUDE.md appears to contain secrets. Remove them.\n"
            echo -e "$ERRORS"
            exit 2
        fi
    fi
fi

# settings.json checks
if [[ "$BASENAME" == "settings.json" || "$BASENAME" == "settings.local.json" ]]; then
    if [[ -f "$FILE_PATH" ]] && command -v jq &>/dev/null; then
        if ! jq empty "$FILE_PATH" 2>/dev/null; then
            ERRORS+="BLOCKED: $BASENAME has invalid JSON. Fix before proceeding.\n"
            echo -e "$ERRORS"
            exit 2
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

if [[ -n "$ERRORS" ]]; then
    echo -e "$ERRORS"
fi

exit 0
