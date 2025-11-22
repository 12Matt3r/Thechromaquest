// ChromaShift Player UI Components
// Bottom left TV, stats panel, and voice controls

import { playerTracker } from './chromashift-player-tracker.js';
import { customRadioManager } from './chromashift-custom-radio.js';

class PlayerUI {
    constructor() {
        this.isTVExpanded = false;
        this.isStatsPanelVisible = false;
        this.currentNarrative = '';
    }

    // Initialize all UI components
    async init() {
        this.createBottomLeftTV();
        this.createPlayerStatsPanel();
        this.createVoiceControl();
        this.setupEventListeners();
        
        console.log('Player UI initialized');
    }

    // Create bottom left collapsible TV
    createBottomLeftTV() {
        const tv = document.createElement('div');
        tv.id = 'bottom-left-tv';
        tv.className = 'collapsed';
        tv.innerHTML = `
            <div class="tv-screen">
                <div class="tv-content" style="display: none;" id="tv-content-expanded">
                    <div class="tv-header">
                        <div class="tv-title">📺 Narrative Replay</div>
                        <div class="tv-controls">
                            <button class="tv-control-btn" onclick="toggleTV()" title="Collapse TV">−</button>
                            <button class="tv-control-btn" onclick="clearNarrativeHistory()" title="Clear History">🗑️</button>
                        </div>
                    </div>
                    <div class="narrative-display" id="narrative-display">
                        <div style="text-align: center; color: #888; padding: 20px;">
                            No recent narratives
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(tv);
    }

    // Create player stats panel
    createPlayerStatsPanel() {
        const statsPanel = document.createElement('div');
        statsPanel.id = 'player-stats-panel';
        statsPanel.className = 'stats-panel';
        statsPanel.innerHTML = `
            <div class="stats-header">
                <div class="stats-title">🎮 Player Stats</div>
                <div class="stats-subtitle">Real-time tracking</div>
            </div>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-label">Total Playtime</div>
                    <div class="stat-value" id="collective-playtime">0s</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Current Session</div>
                    <div class="stat-value" id="session-playtime">0s</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Keys Collected</div>
                    <div class="stat-value" id="keys-collected">0</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Total Resets</div>
                    <div class="stat-value" id="total-resets">0</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Scenes Visited</div>
                    <div class="stat-value" id="scenes-visited">0</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Radio Stations</div>
                    <div class="stat-value" id="radio-stations">0</div>
                </div>
            </div>
            <div class="stats-actions">
                <button class="stats-btn" onclick="toggleStatsPanel()">📊 Details</button>
                <button class="stats-btn" onclick="exportPlayerData()">💾 Export</button>
            </div>
        `;
        
        document.body.appendChild(statsPanel);
    }

    // Create voice control button
    createVoiceControl() {
        const voiceControl = document.createElement('div');
        voiceControl.id = 'voice-control';
        voiceControl.className = 'voice-indicator';
        voiceControl.title = 'Voice Input - Click to speak';
        
        document.body.appendChild(voiceControl);
    }

    // Setup event listeners
    setupEventListeners() {
        // TV click handler
        const tv = document.getElementById('bottom-left-tv');
        if (tv) {
            tv.addEventListener('click', (e) => {
                if (e.target.closest('.tv-control-btn')) return; // Don't toggle for control buttons
                this.toggleTV();
            });
        }

        // Voice control click handler
        const voiceControl = document.getElementById('voice-control');
        if (voiceControl) {
            voiceControl.addEventListener('click', () => {
                this.toggleVoiceInput();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                this.toggleTV();
            }
            if (e.ctrlKey && e.key === 'v') {
                e.preventDefault();
                this.toggleVoiceInput();
            }
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.toggleStatsPanel();
            }
        });

        // Update UI periodically
        setInterval(() => {
            this.updateStatsDisplay();
        }, 1000);
    }

    // Toggle TV expansion
    toggleTV() {
        const tv = document.getElementById('bottom-left-tv');
        const tvContent = document.getElementById('tv-content-expanded');
        const narrativeDisplay = document.getElementById('narrative-display');
        
        if (!tv || !tvContent) return;

        this.isTVExpanded = !this.isTVExpanded;
        
        if (this.isTVExpanded) {
            tv.classList.remove('collapsed');
            tv.classList.add('expanded');
            tvContent.style.display = 'block';
            this.updateNarrativeDisplay();
        } else {
            tv.classList.remove('expanded');
            tv.classList.add('collapsed');
            tvContent.style.display = 'none';
        }
    }

    // Toggle stats panel visibility
    toggleStatsPanel() {
        const statsPanel = document.getElementById('player-stats-panel');
        if (!statsPanel) return;

        this.isStatsPanelVisible = !this.isStatsPanelVisible;
        
        if (this.isStatsPanelVisible) {
            statsPanel.style.display = 'block';
        } else {
            statsPanel.style.display = 'none';
        }
    }

    // Toggle voice input
    toggleVoiceInput() {
        const voiceControl = document.getElementById('voice-control');
        if (!voiceControl) return;

        if (playerTracker.isVoiceEnabled) {
            // Stop voice recognition
            playerTracker.speechRecognition?.stop();
            voiceControl.classList.remove('active');
        } else {
            // Start voice recognition
            playerTracker.startVoiceRecognition();
            if (playerTracker.speechRecognition) {
                voiceControl.classList.add('active');
            }
        }
    }

    // Update narrative display
    updateNarrativeDisplay() {
        const narrativeDisplay = document.getElementById('narrative-display');
        if (!narrativeDisplay) return;

        const recentNarratives = playerTracker.getRecentNarratives(10);
        
        if (recentNarratives.length === 0) {
            narrativeDisplay.innerHTML = `
                <div style="text-align: center; color: #888; padding: 20px;">
                    No recent narratives available
                </div>
            `;
            return;
        }

        narrativeDisplay.innerHTML = recentNarratives.map(narrative => `
            <div class="narrative-item" onclick="showFullNarrative('${narrative.text.replace(/'/g, "\\'")}')">
                <div class="narrative-text">${this.truncateText(narrative.text, 150)}</div>
                <div class="narrative-time">${narrative.formattedTime}</div>
            </div>
        `).join('');
    }

    // Update stats display
    updateStatsDisplay() {
        const stats = playerTracker.getPlayerStats();
        
        // Update individual stat elements
        this.updateStatElement('collective-playtime', stats.collectivePlaytime);
        this.updateStatElement('session-playtime', stats.currentSessionTime);
        this.updateStatElement('keys-collected', stats.keysCollected);
        this.updateStatElement('total-resets', stats.totalResets);
        this.updateStatElement('scenes-visited', stats.scenesVisited);
        this.updateStatElement('radio-stations', stats.radioStationsCreated);

        // Update voice control appearance
        const voiceControl = document.getElementById('voice-control');
        if (voiceControl) {
            if (playerTracker.isVoiceEnabled) {
                voiceControl.classList.add('active');
            } else {
                voiceControl.classList.remove('active');
            }
        }
    }

    // Update individual stat element
    updateStatElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element && element.textContent !== value) {
            element.textContent = value;
        }
    }

    // Record new narrative
    recordNarrative(narrativeText) {
        if (narrativeText && narrativeText !== this.currentNarrative) {
            playerTracker.updateNarrativeHistory(narrativeText);
            this.currentNarrative = narrativeText;
            
            // If TV is expanded, update display immediately
            if (this.isTVExpanded) {
                this.updateNarrativeDisplay();
            }
        }
    }

    // Record key collection
    recordKeyCollection() {
        playerTracker.recordKeyCollection();
    }

    // Record scene visit
    recordSceneVisit() {
        playerTracker.recordSceneVisit();
    }

    // Show full narrative
    showFullNarrative(narrativeText) {
        // Create modal to display full narrative
        const modal = document.createElement('div');
        modal.className = 'modal-overlay show';
        modal.onclick = () => document.body.removeChild(modal);
        
        const content = document.createElement('div');
        content.className = 'modal-content';
        content.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #ff00ff;
            border-radius: 10px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            z-index: 1001;
            font-family: 'Courier New', monospace;
            color: #00ff88;
        `;
        
        content.innerHTML = `
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            <h3 style="color: #ff00ff; margin-bottom: 20px;">📖 Full Narrative</h3>
            <div style="line-height: 1.6; white-space: pre-wrap;">${narrativeText}</div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    // Clear narrative history
    clearNarrativeHistory() {
        if (confirm('Clear all narrative history?')) {
            playerTracker.narrativeHistory = [];
            playerTracker.saveNarrativeHistory();
            this.updateNarrativeDisplay();
        }
    }

    // Export player data
    exportPlayerData() {
        const data = playerTracker.exportPlayerData();
        const stationsData = customRadioManager.exportStations();
        
        const exportData = {
            playerData: data,
            radioStations: stationsData,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `chromashift-player-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }

    // Truncate text for display
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            background: ${type === 'success' ? 'rgba(0, 255, 136, 0.95)' : 
                        type === 'error' ? 'rgba(255, 0, 136, 0.95)' : 
                        type === 'warning' ? 'rgba(255, 255, 0, 0.95)' : 
                        'rgba(255, 0, 255, 0.95)'};
            color: #000;
            border-radius: 5px;
            z-index: 3000;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            font-weight: bold;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border: 1px solid ${type === 'success' ? '#00ff88' : '#ff00ff'};
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Global functions for UI events
window.toggleTV = () => {
    if (window.playerUI) {
        window.playerUI.toggleTV();
    }
};

window.clearNarrativeHistory = () => {
    if (window.playerUI) {
        window.playerUI.clearNarrativeHistory();
    }
};

window.showFullNarrative = (narrativeText) => {
    if (window.playerUI) {
        window.playerUI.showFullNarrative(narrativeText);
    }
};

window.toggleStatsPanel = () => {
    if (window.playerUI) {
        window.playerUI.toggleStatsPanel();
    }
};

window.exportPlayerData = () => {
    if (window.playerUI) {
        window.playerUI.exportPlayerData();
    }
};

window.toggleVoiceInput = () => {
    if (window.playerUI) {
        window.playerUI.toggleVoiceInput();
    }
};

window.openRadioManager = () => {
    if (typeof window.customRadioManager !== 'undefined' && window.customRadioManager) {
        window.customRadioManager.createRadioManagerUI?.();
        const manager = document.getElementById('radio-manager');
        const overlay = document.getElementById('modal-overlay');
        
        if (manager) manager.classList.add('show');
        if (overlay) overlay.classList.add('show');
        
        if (window.customRadioManager) {
            window.customRadioManager.updateStationDisplay();
        }
    }
};

window.handleVoiceInput = (transcript) => {
    // This function will be called by the speech recognition system
    // and should integrate with the main game input system
    console.log('Voice input received:', transcript);
    
    // You can integrate this with your game input system here
    // For example, if using a choice system, you could match voice input to choices
};

// Export singleton instance
export const playerUI = new PlayerUI();

// Export for global access
if (typeof window !== 'undefined') {
    window.playerUI = playerUI;
}