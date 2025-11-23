# 📊 Dream State, Metrics & Internal Logic

## Core Dream State Object

Suggested structure:

```javascript
dreamState = {
  lucidity: 47,           // 0–100
  realityCoherence: 23,   // 0–100
  perception: 'DISTORTED',
  dreamTier: 1,           // 1–5
  whispersCompleted: 0,
  whispersFailed: 0,
  descentLevel: 0,
  anomalyCount: 0
};


## Enhanced Dream State with Player Tracking

### Player Enhancement State Variables
New state management for collective playtime and enhancement features:

```javascript
enhancedDreamState = {
  // Original dream state variables
  lucidity: 47,           
  realityCoherence: 23,   
  perception: 'DISTORTED',
  dreamTier: 1,           
  whispersCompleted: 0,
  whispersFailed: 0,
  descentLevel: 0,
  anomalyCount: 0,
  
  // New player enhancement tracking
  playerSessionStart: Date.now(),
  totalPlaytimeMs: 0,
  keysCollected: 0,
  sessionPlaytime: 0,
  collectivePlaytime: 0, // Global across all players
  radioStations: {},     // User-created stations
  currentRadioStation: null,
  narrativeHistory: [],  // Previous narrative experiences
  isTvVisible: false     // TV interface state
};
```

### Automatic State Reset System
After every key collection, the dream state resets to ensure fair play:
- All core metrics (lucidity, realityCoherence, perception, dreamTier) reset to baseline
- Whispers progress is maintained for narrative continuity
- Player session data persists to track cumulative statistics
- Enhancement features (radio, TV settings) remain intact

### Playtime Metrics Tracking
Comprehensive time tracking system:
- Individual session tracking with millisecond precision
- Collective playtime across all players globally
- Automatic calculation of total hours and minutes played
- Reset-resistant statistics for fair competition
- Persistent storage using localStorage for continuity

### Narrative History Management
TV interface state tracking:
- Each narrative experience stored with timestamp
- Story progression context maintained for player reference
- Expandable history with collapse/expand animations
- Integration with CRT aesthetic for authentic retro feel

### Audio Environment State
Custom radio station management:
- User-created station metadata storage
- Current playback state (playing/paused/current track)
- Uploaded music file references and metadata
- Personal radio library organization