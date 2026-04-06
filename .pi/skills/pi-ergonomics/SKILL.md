---
name: pi-ergonomics
description: "Tune how pi interacts with the user. Use when pi is too chatty, too terse, not responding well, or needs style adjustments."
---

# Pi Ergonomics

Tune interaction style and trust calibration for pi. Ergonomics covers:
- Verbosity level
- Autonomy vs confirmation
- Output format preferences
- Feedback capture

## Trust Levels

### Level 1: New User
- Confirm everything
- Verbose explanations
- Ask before destructive actions

### Level 2: Established
- Routine tasks auto-execute
- Confirm destructive actions
- Moderate verbosity

### Level 3: Power User
- Autonomous operation
- Terse output
- Only confirm critical actions

## Tuning Patterns

### Too Chatty
Add to `.pi/memory/user_role.md`:
```
Preferred verbosity: terse
Only explain decisions if asked
```

### Too Silent
```
Preferred verbosity: verbose
Explain what you're doing
```

### Wrong Tone
```
Communication style: direct, technical
Avoid: pleasantries, filler words
```
