#!/usr/bin/env bash
# pi-drift: Stop hook for end-of-conversation harness health check

set -euo pipefail

ISSUES=""
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"

# CLAUDE.md staleness check
if [[ -f "$PROJECT_DIR/CLAUDE.md" ]]; then
    CLAUDE_MD_AGE=$(stat -c %Y "$PROJECT_DIR/CLAUDE.md" 2>/dev/null || stat -f %m "$PROJECT_DIR/CLAUDE.md" 2>/dev/null || echo 0)
    NOW=$(date +%s)
    DAYS_OLD=$(( (NOW - CLAUDE_MD_AGE) / 86400 ))

    if (( DAYS_OLD > 14 )); then
        if command -v git &>/dev/null && git -C "$PROJECT_DIR" rev-parse --git-dir &>/dev/null; then
            RECENT_COMMITS=$(git -C "$PROJECT_DIR" log --since="${DAYS_OLD} days ago" --oneline 2>/dev/null | wc -l || echo 0)
            if (( RECENT_COMMITS > 10 )); then
                ISSUES+="STALE: CLAUDE.md hasn't been updated in ${DAYS_OLD} days but ${RECENT_COMMITS} commits. Consider running pi-audit.\n"
            fi
        fi
    fi
fi

# Memory index sync check
MEMORY_DIR=""
if [[ -d "$PROJECT_DIR/.pi/memory" ]]; then
    MEMORY_DIR="$PROJECT_DIR/.pi/memory"
elif [[ -n "${CLAUDE_MEMORY_DIR:-}" && -d "$CLAUDE_MEMORY_DIR" ]]; then
    MEMORY_DIR="$CLAUDE_MEMORY_DIR"
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

if [[ -n "$ISSUES" ]]; then
    echo -e "Harness health check:\n$ISSUES"
fi

exit 0
