# 🧾 Command Processing & Interpretation Engine

## Command Pipeline

Conceptual steps:

1. Receive text input (location or action).
2. Validate (non-empty, within length limits).
3. Analyze (extract verbs, nouns, modifiers).
4. Classify (location shift vs. action; subtypes like touch, consume, speak, abstract).
5. Interpret (apply surrealist logic informed by dreamState and context).
6. Generate (scene description, stats changes, WTF moment, choices).
7. Update dreamState.
8. Render new scene and await input.

## Supported Command Types (Examples)

- Location shifts:
  - “Underwater cathedral”, “my childhood bedroom”, “the edge of the universe”.
- Simple actions:
  - “Touch the wall”, “eat the clock”, “whisper to the shadows”.
- Complex/chained:
  - “Run to the door; open it slowly”.
- Dialogue:
  - “Ask the businessman about the storm”.
- Environment manipulation:
  - “Make the ceiling melt”.
- Object creation:
  - “Create a ladder made of light”.
- Self-transformation:
  - “I become weightless”.
- Meta/abstract:
  - “Manifest justice”, “distill my fear into an object”.

## Power Words & Special Triggers

Define a small set of special tokens (e.g., RECURSION, VOID, WAKE, MIRROR, TRUTH, SYNESTHESIA):

- When detected, apply large systemic changes (tier shifts, recursion loops, void spaces, etc.).
- Use sparingly to keep them feeling significant.

## Failure & Glitch Handling

If a command cannot be sensibly realized even in dream logic:

- Respond with a glitch: visual distortion, repeated line, or “reality cannot parse that request.”
- Avoid hard failure; always give the player something to react to.


## Enhanced Command Processing Features

### Voice Command Integration
The command engine now supports speech-to-text input through the Web Speech API:
- Voice commands are transcribed in real-time and processed through the same validation pipeline
- Voice input provides microphone toggle button in the interface
- Commands spoken aloud are treated identically to typed input
- Supports voice commands for all existing command types including location shifts, actions, and meta commands
- Voice input failures gracefully fall back to text input prompt

### Player State Reset Integration
After every key collection, the command engine automatically triggers a complete game state reset:
- All dream metrics are reset to baseline values
- Current scene context is cleared
- Command history is maintained for continuity
- Reset timing is synchronized with key collection animations