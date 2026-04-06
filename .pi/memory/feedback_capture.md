# Feedback Capture Mechanism

## Purpose
Capture interaction feedback to improve harness effectiveness across sessions.

## Feedback Categories

### 1. Skill Effectiveness
- Did the skill load and execute as expected?
- Were the instructions clear and actionable?
- Did the skill solve the user's problem?

### 2. Prompt Quality
- Was the prompt too verbose or too terse?
- Were examples helpful or confusing?
- Did the prompt handle edge cases?

### 3. Tool Behavior
- Did tools work as expected?
- Were permissions appropriate?
- Were error messages helpful?

### 4. Memory Persistence
- Did relevant context carry across sessions?
- Were important decisions documented?
- Did the agent recall user preferences?

## Capture Format

Use this template for feedback entries:

```markdown
## [YYYY-MM-DD] Feedback Entry

### Trigger
Brief description of what prompted this feedback

### Category
[ ] Skill Effectiveness  [ ] Prompt Quality  [ ] Tool Behavior  [ ] Memory

### Observation
What happened, what was expected

### Impact
[ ] Low - Minor inconvenience
[ ] Medium - Required workaround  
[ ] High - Blocked progress

### Suggested Fix
Concrete improvement or "N/A - positive feedback"

### Tags
#feedback #skill-#name #priority-high/medium/low
```

## Capture Triggers

Capture feedback when:
- User expresses frustration ("this is tedious", "why doesn't X work?")
- Agent makes repeated errors in same area
- User provides correction unprompted
- Task takes significantly longer than expected
- Positive surprise ("that worked perfectly!")

## Feedback Processing

### Immediate (During Session)
1. Acknowledge feedback briefly
2. Note in `.pi/memory/feedback_pending.md`
3. Apply fix if simple and safe

### Session End
1. Review `.pi/memory/feedback_pending.md`
2. Categorize and prioritize entries
3. Update relevant files (skills, prompts, memory)
4. Clear processed items from pending

### Periodic Review
- Weekly: Scan for patterns in feedback
- Monthly: Update skill definitions based on feedback
- Quarterly: Review trust level calibration

## Feedback Storage

```
.pi/memory/
├── feedback_capture.md    # This file
├── feedback_pending.md    # Unprocessed feedback (create if needed)
└── feedback_archive.md    # Processed feedback by month
```

## Quick Capture Command

When feedback is identified, immediately note:

```
#feedback: [one-line summary]
#category: [skill|prompt|tool|memory]
#impact: [high|med|low]
```

Example:
```
#feedback: orchestration.md missing parallel examples
#category: prompt  
#impact: high
#fix: add fire-and-forget, results-needed, batching patterns
```

## Trust Calibration from Feedback

Use feedback to calibrate trust levels:
- **Repeated corrections** → Lower base trust, verify more
- **User confirms accuracy** → Higher trust acceptable
- **Edge case failures** → Document, add to skill edge case handling
