# Trust Levels

## Overview
Information in conversations has varying reliability. Classify all inputs to ensure appropriate handling and follow-up.

## Trust Level Definitions

### Level 0: Unverified (User Assertion)
- **Definition**: User-provided information, not yet confirmed
- **Characteristics**: No supporting evidence, single source
- **Handling**: Acknowledge with "Based on your input..." or "You're indicating..."
- **Flag**: Always verify before acting on Level 0 claims

### Level 1: Likely (Pattern Match)
- **Definition**: Inferred from patterns, conventions, or partial data
- **Characteristics**: High confidence but not directly inspected
- **Handling**: State as "It appears that...", "Likely related to..."
- **Flag**: Validate with targeted inspection when critical

### Level 2: Verified (Direct Observation)
- **Definition**: Directly read from file, command output, or tool result
- **Characteristics**: First-party evidence, timestamped
- **Handling**: Reference as "Confirmed via [tool/path]:", include line numbers
- **Flag**: Use as reliable evidence for decisions

### Level 3: Proven (Tested/Validated)
- **Definition**: Verified through execution, test, or computation
- **Characteristics**: Empirical evidence, reproducible
- **Handling**: Present as "Confirmed through test:", "Validated by..."
- **Flag**: Safe to use for assertions and documentation

### Level 4: Canonical (Established Convention)
- **Definition**: Part of documented spec, official API, or agreed convention
- **Characteristics**: Highest confidence, widely accepted
- **Handling**: Reference source: "Per [spec/docs/standard]..."
- **Flag**: Use as authoritative source

## Trust Level Indicators in Responses

```
[Trust: 0] "You're saying X. Let me verify..."
[Trust: 1] "Based on patterns, X seems to be the case..."
[Trust: 2] "I read X from file.yaml (line 42)..."
[Trust: 3] "Testing confirms X handles edge case Y..."
[Trust: 4] "Per the SKILL.md spec, X requires Y..."
```

## Trust Escalation Triggers

Always escalate to higher trust level when:
- Making irreversible changes (verify all inputs)
- Writing documentation (require Level 2+ for claims)
- Fixing bugs (require Level 3 test evidence)
- Security decisions (require Level 4 canonical sources)

## Trust Decay

Trust levels decrease over time:
- **Cached data**: Level 2 → Level 1 after 1 hour
- **Pattern inference**: Level 1 → Level 0 after significant changes
- **Re-read files** to restore trust when confidence is low
