# 🧾 Output Structure & Scene Template

## Required Fields for Each Generated Scene

When generating a scene (e.g., via LLM), ensure the output includes:

- title: Scene name + high-level descriptor.
- narrativeDescription: 200–300 words of vivid, surreal description.
- ticker: A brief WTF moment or subconscious whisper.
- lucidity, coherence, perception: Updated numeric stats (0–100 or clamped).
- imagePrompt: Equirectangular 360° panoramic prompt matching the narrative.
- choices: Four textual options for the player’s next action.
- prologText: Optional short conflict/urgency text (can be empty).

Example JSON schema:

```json
{
  "title": "SCENE TITLE [LOCATION TYPE]",
  "narrativeDescription": "200–300 words of detailed, surreal description...",
  "ticker": "Brief WTF moment or whisper",
  "lucidity": 47,
  "coherence": 23,
  "perception": 75,
  "imagePrompt": "360° panoramic prompt...",
  "choices": [
    {"text": "Choice 1"},
    {"text": "Choice 2"},
    {"text": "Choice 3"},
    {"text": "Choice 4"}
  ],
  "prologText": "Short conflict text or \"\""
}
## Enhanced Output Format with Player Tracking

### Player Enhancement Fields
Updated scene output structure to include collective playtime and enhancement features:

```json
{
  "title": "SCENE TITLE [LOCATION TYPE]",
  "narrativeDescription": "200–300 words of detailed, surreal description...",
  "ticker": "Brief WTF moment or whisper",
  "lucidity": 47,
  "coherence": 23,
  "perception": 75,
  "imagePrompt": "360° panoramic prompt...",
  "choices": [
    {"text": "Choice 1"},
    {"text": "Choice 2"},
    {"text": "Choice 3"},
    {"text": "Choice 4"}
  ],
  "prologText": "Short conflict text or \"\"",
  "playerStats": {
    "sessionPlaytime": 1240000,
    "collectivePlaytime": 86400000,
    "sessionStartTime": "2025-11-23T07:05:00Z",
    "keysCollected": 0,
    "sessionMinutes": 20
  },
  "enhancementStates": {
    "tvVisible": false,
    "voiceControlActive": false,
    "currentRadioStation": null,
    "narrativeHistory": [
      "Previous scene 1...",
      "Previous scene 2...",
      "Previous scene 3..."
    ]
  },
  "resetTriggered": false
}
```

### Key Collection Event Output
When a Chroma-Key is collected, the output must include reset trigger:

```json
{
  "keyCollectionEvent": true,
  "chromaKeyAcquired": true,
  "title": "CHROMA KEY AWARDED",
  "narrativeDescription": "Congratulations on acquiring the Chroma Key...",
  "resetTriggered": true,
  "dreamStateReset": {
    "lucidity": 25,
    "coherence": 25,
    "perception": 25,
    "dreamTier": 1
  },
  "statsPreserved": {
    "playerStats": true,
    "radioStations": true,
    "enhancementStates": true
  }
}
```

### Voice Command Processing Output
Speech-to-text commands maintain the same scene format but add voice metadata:

```json
{
  "title": "SCENE TITLE [LOCATION TYPE]",
  "narrativeDescription": "200–300 words of detailed, surreal description...",
  "ticker": "Brief WTF moment or whisper",
  "lucidity": 47,
  "coherence": 23,
  "perception": 75,
  "imagePrompt": "360° panoramic prompt...",
  "choices": [
    {"text": "Choice 1"},
    {"text": "Choice 2"},
    {"text": "Choice 3"},
    {"text": "Choice 4"}
  ],
  "prologText": "Short conflict text or \"\"",
  "voiceCommandReceived": true,
  "recognizedText": "touch the melting wall",
  "commandType": "manifestation",
  "voiceConfidence": 0.89
}