// ChromaShift Player Tracking System
// Tracks collective playtime, resets, and player statistics

import { gameState } from './chromashift-state-ui.js';

class PlayerTracker {
    constructor() {
        this.playerStats = this.loadPlayerStats();
        this.currentSessionStart = Date.now();
        this.lastKeyReset = Date.now();
        this.collectivePlaytime = this.loadCollectivePlaytime();
        this.sessionPlaytime = 0;
        this.statsUpdateInterval = null;
        this.narrativeHistory = [];
        this.currentNarrative = '';
        this.isVoiceEnabled = false;
        this.speechRecognition = null;
    }

    // Initialize player tracking
    async init() {
        this.startSessionTracking();
        this.loadNarrativeHistory();
        this.initializeSpeechRecognition();
        this.updateStatsDisplay();
        
        console.log('Player Tracker initialized:', {
            sessionStart: new Date(this.currentSessionStart).toISOString(),
            collectivePlaytime: this.formatTime(this.collectivePlaytime),
            totalResets: this.playerStats.totalResets
        });
    }

    // Load player statistics from localStorage
    loadPlayerStats() {
        const saved = localStorage.getItem('chromashift-player-stats');
        return saved ? JSON.parse(saved) : {
            totalPlaytime: 0, // in milliseconds
            totalResets: 0,
            keysCollected: 0,
            scenesVisited: 0,
            playerSessions: [],
            averageSessionLength: 0,
            totalAnomaliesDiscovered: 0,
            radioStationsCreated: 0,
            lastPlayDate: Date.now()
        };
    }

    // Save player statistics to localStorage
    savePlayerStats() {
        try {
            localStorage.setItem('chromashift-player-stats', JSON.stringify(this.playerStats));
        } catch (error) {
            console.warn('Failed to save player stats:', error);
        }
    }

    // Load collective playtime from shared storage
    loadCollectivePlaytime() {
        const shared = localStorage.getItem('chromashift-collective-playtime');
        return shared ? parseInt(shared, 10) : 0;
    }

    // Save collective playtime
    saveCollectivePlaytime() {
        try {
            localStorage.setItem('chromashift-collective-playtime', this.collectivePlaytime.toString());
        } catch (error) {
            console.warn('Failed to save collective playtime:', error);
        }
    }

    // Start session tracking
    startSessionTracking() {
        this.statsUpdateInterval = setInterval(() => {
            this.updateSessionPlaytime();
            this.saveSessionData();
        }, 1000); // Update every second
    }

    // Update current session playtime
    updateSessionPlaytime() {
        this.sessionPlaytime = Date.now() - this.currentSessionStart;
        this.playerStats.totalPlaytime += 1000; // Add 1 second
        this.collectivePlaytime += 1000; // Add to collective
        this.saveCollectivePlaytime();
        this.savePlayerStats();
    }

    // Format time for display
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    }

    // Get formatted collective playtime
    getCollectivePlaytime() {
        return this.formatTime(this.collectivePlaytime);
    }

    // Get current session time
    getSessionTime() {
        return this.formatTime(this.sessionPlaytime);
    }

    // Record key collection and trigger reset
    recordKeyCollection() {
        this.playerStats.keysCollected++;
        this.playerStats.totalResets++;
        this.lastKeyReset = Date.now();
        
        // Trigger game reset
        this.triggerGameReset();
        
        this.savePlayerStats();
        
        console.log('Key collected and reset triggered:', {
            totalKeys: this.playerStats.keysCollected,
            totalResets: this.playerStats.totalResets
        });
    }

    // Trigger game reset
    triggerGameReset() {
        // Clear game state but preserve player stats
        if (typeof gameState !== 'undefined') {
            // Reset game state for fair start
            gameState.isProcessing = false;
            gameState.lastActionTime = 0;
            // Clear any cached panorama images
            if (gameState.gameHistory) {
                gameState.gameHistory = [];
            }
        }

        // Show reset notification
        this.showResetNotification();
    }

    // Show reset notification
    showResetNotification() {
        const notification = document.createElement('div');
        notification.className = 'reset-notification';
        notification.innerHTML = `
            <div class="reset-content">
                <h3>🔄 Reality Rebooted</h3>
                <p>The dream has reset for a fresh experience!</p>
                <p>Keys collected: ${this.playerStats.keysCollected}</p>
                <p>Total resets: ${this.playerStats.totalResets}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 5000);
    }

    // Record scene visit
    recordSceneVisit() {
        this.playerStats.scenesVisited++;
        this.savePlayerStats();
    }

    // Record anomaly discovery
    recordAnomalyDiscovery() {
        this.playerStats.totalAnomaliesDiscovered++;
        this.savePlayerStats();
    }

    // Record radio station creation
    recordRadioStationCreation() {
        this.playerStats.radioStationsCreated++;
        this.savePlayerStats();
    }

    // Update narrative history
    updateNarrativeHistory(narrativeText) {
        if (narrativeText && narrativeText !== this.currentNarrative) {
            this.narrativeHistory.unshift({
                text: narrativeText,
                timestamp: Date.now(),
                formattedTime: new Date().toLocaleTimeString()
            });
            
            // Keep only last 50 narratives
            if (this.narrativeHistory.length > 50) {
                this.narrativeHistory = this.narrativeHistory.slice(0, 50);
            }
            
            this.currentNarrative = narrativeText;
            this.saveNarrativeHistory();
        }
    }

    // Save narrative history
    saveNarrativeHistory() {
        try {
            localStorage.setItem('chromashift-narrative-history', JSON.stringify(this.narrativeHistory));
        } catch (error) {
            console.warn('Failed to save narrative history:', error);
        }
    }

    // Load narrative history
    loadNarrativeHistory() {
        try {
            const saved = localStorage.getItem('chromashift-narrative-history');
            if (saved) {
                this.narrativeHistory = JSON.parse(saved);
            }
        } catch (error) {
            console.warn('Failed to load narrative history:', error);
            this.narrativeHistory = [];
        }
    }

    // Get recent narratives
    getRecentNarratives(count = 5) {
        return this.narrativeHistory.slice(0, count);
    }

    // Get latest narrative
    getLatestNarrative() {
        return this.narrativeHistory.length > 0 ? this.narrativeHistory[0] : null;
    }

    // Initialize Speech Recognition
    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.speechRecognition = new SpeechRecognition();
            
            this.speechRecognition.continuous = false;
            this.speechRecognition.interimResults = false;
            this.speechRecognition.lang = 'en-US';
            
            this.speechRecognition.onstart = () => {
                this.isVoiceEnabled = true;
                console.log('Voice recognition started');
            };
            
            this.speechRecognition.onend = () => {
                this.isVoiceEnabled = false;
                console.log('Voice recognition ended');
            };
            
            this.speechRecognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isVoiceEnabled = false;
            };
            
            this.speechRecognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('Speech recognized:', transcript);
                
                // Trigger input with recognized speech
                if (window.handleVoiceInput) {
                    window.handleVoiceInput(transcript);
                }
            };
        }
    }

    // Start voice recognition
    startVoiceRecognition() {
        if (this.speechRecognition) {
            try {
                this.speechRecognition.start();
            } catch (error) {
                console.error('Failed to start speech recognition:', error);
            }
        }
    }

    // Update stats display in UI
    updateStatsDisplay() {
        // Update collective playtime display
        const collectiveDisplay = document.getElementById('collective-playtime');
        if (collectiveDisplay) {
            collectiveDisplay.textContent = this.getCollectivePlaytime();
        }

        // Update session playtime display
        const sessionDisplay = document.getElementById('session-playtime');
        if (sessionDisplay) {
            sessionDisplay.textContent = this.getSessionTime();
        }

        // Update keys collected display
        const keysDisplay = document.getElementById('keys-collected');
        if (keysDisplay) {
            keysDisplay.textContent = this.playerStats.keysCollected;
        }
    }

    // Save session data
    saveSessionData() {
        this.playerStats.lastPlayDate = Date.now();
        
        // Add session to history if significant time has passed
        const currentSessionLength = Date.now() - this.currentSessionStart;
        if (currentSessionLength > 300000) { // 5 minutes
            this.playerStats.playerSessions.push({
                startTime: this.currentSessionStart,
                endTime: Date.now(),
                duration: currentSessionLength
            });
            
            // Keep only last 50 sessions
            if (this.playerStats.playerSessions.length > 50) {
                this.playerStats.playerSessions = this.playerStats.playerSessions.slice(-50);
            }
            
            this.calculateAverageSessionLength();
        }
        
        this.savePlayerStats();
    }

    // Calculate average session length
    calculateAverageSessionLength() {
        if (this.playerStats.playerSessions.length === 0) {
            this.playerStats.averageSessionLength = 0;
            return;
        }
        
        const totalDuration = this.playerStats.playerSessions.reduce((sum, session) => {
            return sum + session.duration;
        }, 0);
        
        this.playerStats.averageSessionLength = totalDuration / this.playerStats.playerSessions.length;
    }

    // Get player statistics
    getPlayerStats() {
        return {
            ...this.playerStats,
            currentSessionTime: this.getSessionTime(),
            collectivePlaytime: this.getCollectivePlaytime(),
            recentNarratives: this.getRecentNarratives(),
            latestNarrative: this.getLatestNarrative()
        };
    }

    // Export player data
    exportPlayerData() {
        return {
            playerStats: this.playerStats,
            narrativeHistory: this.narrativeHistory,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    // Clean up on page unload
    cleanup() {
        if (this.statsUpdateInterval) {
            clearInterval(this.statsUpdateInterval);
        }
        
        if (this.speechRecognition) {
            this.speechRecognition.stop();
        }
    }
}

// Export singleton instance
export const playerTracker = new PlayerTracker();

// Export for global access
if (typeof window !== 'undefined') {
    window.playerTracker = playerTracker;
}