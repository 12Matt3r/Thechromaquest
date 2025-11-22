// chromashift-dreamos-integration.js - CRT Channel System & Game Integration
// Handles channel switching, DreamOS activation, and ChromaShift integration

import { initDreamOS, getDreamOSGame } from './chromashift-dreamos-game.js';
import { DreamOSAPI } from './chromashift-dreamos-api.js';

class CRTChannelSystem {
    constructor() {
        this.currentChannel = 'dream-narrative';
        this.availableChannels = [
            { id: 'dream-narrative', name: 'Dream Narrative', icon: '🌈' },
            { id: 'dreamos-windows97', name: 'DreamOS Windows 97', icon: '🖥️' },
            { id: 'anomaly-monitor', name: 'Anomaly Monitor', icon: '📊' },
            { id: 'radio-frequencies', name: 'Radio Frequencies', icon: '📻' },
            { id: 'time-stream', name: 'Time Stream Viewer', icon: '⏰' },
            { id: 'consciousness-matrix', name: 'Consciousness Matrix', icon: '🧠' },
            { id: 'reality-signal', name: 'Reality Signal', icon: '📡' },
            { id: 'dream-waves', name: 'Dream Waves', icon: '🌊' }
        ];
        this.channelTransition = null;
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        this.createCRTInterface();
        this.setupEventListeners();
        this.startChannelTicker();
        console.log('CRT Channel System initialized - Ready for DreamOS access');
    }

    // ============================================================================
    // CRT INTERFACE ENHANCEMENT
    // ============================================================================

    createCRTInterface() {
        // Add channel selector to CRT overlay
        const crtOverlay = document.getElementById('crt-overlay');
        if (!crtOverlay) return;

        // Create channel selector overlay
        const channelSelector = document.createElement('div');
        channelSelector.id = 'crt-channel-selector';
        channelSelector.innerHTML = `
            <div class="crt-channel-header">
                <h3>📺 CHROMAVISION CABLE SYSTEM</h3>
                <button onclick="crtChannelSystem.closeChannelSelector()" class="crt-channel-close">×</button>
            </div>
            <div class="crt-channel-grid">
                ${this.availableChannels.map(channel => `
                    <div class="crt-channel-item" onclick="crtChannelSystem.switchChannel('${channel.id}')">
                        <div class="crt-channel-icon">${channel.icon}</div>
                        <div class="crt-channel-name">${channel.name}</div>
                        <div class="crt-channel-frequency">${this.getChannelFrequency(channel.id)}</div>
                    </div>
                `).join('')}
            </div>
            <div class="crt-channel-info">
                <div class="crt-current-channel">
                    Current: <span id="crt-current-channel-display">${this.getCurrentChannelName()}</span>
                </div>
                <div class="crt-channel-controls">
                    <button onclick="crtChannelSystem.previousChannel()">← Previous</button>
                    <button onclick="crtChannelSystem.nextChannel()">Next →</button>
                    <button onclick="crtChannelSystem.openChannelSelector()">Channel List</button>
                </div>
            </div>
        `;

        crtOverlay.appendChild(channelSelector);

        // Add channel button to CRT
        const crtControls = crtOverlay.querySelector('.crt-controls-area') || this.createCRTControlsArea();
        const channelButton = document.createElement('button');
        channelButton.id = 'crt-channel-button';
        channelButton.className = 'crt-control-btn';
        channelButton.innerHTML = '📺';
        channelButton.title = 'Change Channel (Access DreamOS)';
        channelButton.onclick = () => this.openChannelSelector();
        crtControls.appendChild(channelButton);

        console.log('CRT channel interface enhanced with DreamOS access');
    }

    createCRTControlsArea() {
        const controlsArea = document.createElement('div');
        controlsArea.className = 'crt-controls-area';
        controlsArea.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 20px;
            display: flex;
            gap: 8px;
            z-index: 1006;
        `;
        document.getElementById('crt-overlay').appendChild(controlsArea);
        return controlsArea;
    }

    // ============================================================================
    // CHANNEL SWITCHING SYSTEM
    // ============================================================================

    openChannelSelector() {
        const selector = document.getElementById('crt-channel-selector');
        if (selector) {
            selector.style.display = 'block';
            // Add entrance animation
            selector.style.opacity = '0';
            selector.style.transform = 'translateY(20px)';
            setTimeout(() => {
                selector.style.transition = 'all 0.3s ease';
                selector.style.opacity = '1';
                selector.style.transform = 'translateY(0)';
            }, 50);
        }
    }

    closeChannelSelector() {
        const selector = document.getElementById('crt-channel-selector');
        if (selector) {
            selector.style.transition = 'all 0.3s ease';
            selector.style.opacity = '0';
            selector.style.transform = 'translateY(20px)';
            setTimeout(() => {
                selector.style.display = 'none';
            }, 300);
        }
    }

    async switchChannel(targetChannel) {
        if (this.isTransitioning || this.currentChannel === targetChannel) return;

        this.isTransitioning = true;
        const previousChannel = this.currentChannel;
        this.currentChannel = targetChannel;

        // Update display
        document.getElementById('crt-current-channel-display').textContent = this.getCurrentChannelName();

        // Visual transition effect
        await this.performChannelTransition(previousChannel, targetChannel);

        // Handle channel-specific functionality
        await this.handleChannelSwitch(targetChannel);

        this.closeChannelSelector();
        this.isTransitioning = false;

        console.log(`Switched from ${previousChannel} to ${targetChannel}`);
    }

    async performChannelTransition(fromChannel, toChannel) {
        // Create transition overlay
        const transitionOverlay = document.createElement('div');
        transitionOverlay.id = 'crt-channel-transition';
        transitionOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            z-index: 1007;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
            font-family: 'Courier New', monospace;
        `;

        const crtOverlay = document.getElementById('crt-overlay');
        crtOverlay.appendChild(transitionOverlay);

        // Static effect
        for (let i = 0; i < 3; i++) {
            transitionOverlay.innerHTML = '<div style="font-size: 48px; animation: crt-static 0.1s infinite;">📺📺📺</div>';
            await this.sleep(100);
            transitionOverlay.innerHTML = '<div style="font-size: 48px; animation: crt-static 0.1s infinite reverse;">📺📺📺</div>';
            await this.sleep(100);
        }

        // Channel change announcement
        transitionOverlay.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 18px; margin-bottom: 10px;">CHANNEL CHANGE</div>
                <div style="font-size: 24px; color: #00ffff;">${this.getCurrentChannelName()}</div>
                <div style="font-size: 14px; color: #888; margin-top: 10px;">
                    ${this.getChannelDescription(toChannel)}
                </div>
            </div>
        `;

        await this.sleep(1500);

        // Fade out transition
        transitionOverlay.style.transition = 'all 0.5s ease';
        transitionOverlay.style.opacity = '0';
        await this.sleep(500);
        transitionOverlay.remove();
    }

    async handleChannelSwitch(channelId) {
        switch (channelId) {
            case 'dreamos-windows97':
                await this.activateDreamOS();
                break;
            case 'anomaly-monitor':
                await this.showAnomalyMonitor();
                break;
            case 'radio-frequencies':
                await this.showRadioInterface();
                break;
            case 'time-stream':
                await this.showTimeStream();
                break;
            case 'consciousness-matrix':
                await this.showConsciousnessMatrix();
                break;
            case 'reality-signal':
                await this.showRealitySignal();
                break;
            case 'dream-waves':
                await this.showDreamWaves();
                break;
            default:
                await this.returnToNarrative();
                break;
        }
    }

    // ============================================================================
    // DREAM OS ACTIVATION
    // ============================================================================

    async activateDreamOS() {
        try {
            console.log('Activating DreamOS via CRT channel switch...');
            
            // Initialize DreamOS if not already done
            let dreamosGame = getDreamOSGame();
            if (!dreamosGame) {
                await initDreamOS();
                dreamosGame = getDreamOSGame();
            }

            // Handle CRT integration
            await dreamosGame.handleCRTChannelChange('dream-narrative', 'dreamos-windows97');
            
            // Small delay for effect
            await this.sleep(500);
            
            // Open DreamOS
            dreamosGame.toggle();
            
            this.showNotification('DreamOS Activated - Welcome to Windows 97', 'success');
            
        } catch (error) {
            console.error('Failed to activate DreamOS:', error);
            this.showNotification('DreamOS activation failed', 'error');
        }
    }

    // ============================================================================
    // OTHER CHANNEL FUNCTIONALITY
    // ============================================================================

    async showAnomalyMonitor() {
        // Quick anomaly overview in CRT
        const crtOverlay = document.getElementById('crt-overlay');
        const screenOffEl = document.getElementById('crt-screen-off');
        
        if (screenOffEl) {
            screenOffEl.style.display = 'none';
        }

        // Show anomaly data overlay
        this.displayOverlayContent(`
            <div style="background: rgba(0,0,0,0.9); color: #00ff00; padding: 20px; text-align: center; font-family: 'Courier New', monospace;">
                <h3>🛡️ ANOMALY DETECTION SYSTEM</h3>
                <div>Status: MONITORING</div>
                <div>Anomalies Detected: ${this.getAnomalyCount()}</div>
                <div>Threat Level: ELEVATED</div>
                <div style="margin-top: 20px; font-size: 12px;">Switch to DreamOS for full analysis</div>
            </div>
        `, 3000);

        setTimeout(() => {
            this.returnToNarrative();
        }, 5000);
    }

    async showRadioInterface() {
        this.displayOverlayContent(`
            <div style="background: rgba(0,20,40,0.95); color: #00ffff; padding: 20px; text-align: center; font-family: 'Courier New', monospace;">
                <h3>📻 RADIO FREQUENCY SCANNER</h3>
                <div>Active Stations: ${this.getActiveRadioStations()}</div>
                <div>Current Frequency: ${this.getCurrentRadioFrequency()}</div>
                <div>Signal Strength: ${this.getSignalStrength()}%</div>
                <div style="margin-top: 20px; font-size: 12px;">Use DreamOS for full radio management</div>
            </div>
        `, 3000);

        setTimeout(() => {
            this.returnToNarrative();
        }, 5000);
    }

    async showTimeStream() {
        this.displayOverlayContent(`
            <div style="background: rgba(40,0,40,0.95); color: #ff00ff; padding: 20px; text-align: center; font-family: 'Courier New', monospace;">
                <h3>⏰ TIME STREAM VIEWER</h3>
                <div>Current Timeline: Windows 97 (Dream Edition)</div>
                <div>Time Anomalies: ${this.getTimeAnomalies()}</div>
                <div>Reality Stability: ${this.getRealityStability()}%</div>
                <div style="margin-top: 20px; font-size: 12px;">Access DreamOS for time travel controls</div>
            </div>
        `, 3000);

        setTimeout(() => {
            this.returnToNarrative();
        }, 5000);
    }

    async showConsciousnessMatrix() {
        this.displayOverlayContent(`
            <div style="background: rgba(0,40,0,0.95); color: #00ff00; padding: 20px; text-align: center; font-family: 'Courier New', monospace;">
                <h3>🧠 CONSCIOUSNESS MATRIX</h3>
                <div>Lucidity Level: ${this.getPlayerLucidity()}%</div>
                <div>Dream Depth: ${this.getDreamDepth()}</div>
                <div>Reality Anchor Points: ${this.getAnchorPoints()}</div>
                <div style="margin-top: 20px; font-size: 12px;">DreamOS provides full consciousness analysis</div>
            </div>
        `, 3000);

        setTimeout(() => {
            this.returnToNarrative();
        }, 5000);
    }

    async showRealitySignal() {
        this.displayOverlayContent(`
            <div style="background: rgba(20,20,0,0.95); color: #ffff00; padding: 20px; text-align: center; font-family: 'Courier New', monospace;">
                <h3>📡 REALITY SIGNAL MONITOR</h3>
                <div>Signal Integrity: ${this.getSignalIntegrity()}%</div>
                <div>Distortion Level: ${this.getDistortionLevel()}</div>
                <div>Probability Matrix: STABLE</div>
                <div style="margin-top: 20px; font-size: 12px;">Open DreamOS for signal analysis tools</div>
            </div>
        `, 3000);

        setTimeout(() => {
            this.returnToNarrative();
        }, 5000);
    }

    async showDreamWaves() {
        this.displayOverlayContent(`
            <div style="background: rgba(0,0,20,0.95); color: #0080ff; padding: 20px; text-align: center; font-family: 'Courier New', monospace;">
                <h3>🌊 DREAM WAVE PATTERNS</h3>
                <div>Wave Frequency: ${this.getWaveFrequency()} Hz</div>
                <div>Amplitude: ${this.getWaveAmplitude()}</div>
                <div>Phase State: SYNCHRONIZED</div>
                <div style="margin-top: 20px; font-size: 12px;">DreamOS offers wave manipulation controls</div>
            </div>
        `, 3000);

        setTimeout(() => {
            this.returnToNarrative();
        }, 5000);
    }

    async returnToNarrative() {
        // Switch back to narrative channel after showing channel content
        this.currentChannel = 'dream-narrative';
        document.getElementById('crt-current-channel-display').textContent = this.getCurrentChannelName();
    }

    // ============================================================================
    // UTILITY METHODS
    // ============================================================================

    getCurrentChannelName() {
        const channel = this.availableChannels.find(ch => ch.id === this.currentChannel);
        return channel ? channel.name : 'Unknown Channel';
    }

    getChannelFrequency(channelId) {
        const frequencies = {
            'dream-narrative': 'CH-001',
            'dreamos-windows97': 'CH-097',
            'anomaly-monitor': 'CH-042',
            'radio-frequencies': 'CH-103',
            'time-stream': 'CH-2077',
            'consciousness-matrix': 'CH-314',
            'reality-signal': 'CH-666',
            'dream-waves': 'CH-808'
        };
        return frequencies[channelId] || 'CH-000';
    }

    getChannelDescription(channelId) {
        const descriptions = {
            'dream-narrative': 'Main story progression and quest objectives',
            'dreamos-windows97': 'Complete operating system for dream management',
            'anomaly-monitor': 'Real-time anomaly detection and analysis',
            'radio-frequencies': 'Radio station broadcasting and management',
            'time-stream': 'Timeline navigation and version control',
            'consciousness-matrix': 'Player mental state and dream analytics',
            'reality-signal': 'Reality stability monitoring and calibration',
            'dream-waves': 'Subconscious pattern analysis and manipulation'
        };
        return descriptions[channelId] || 'Specialized dream channel';
    }

    displayOverlayContent(content, duration = 3000) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1008;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
        `;
        overlay.innerHTML = content;

        document.getElementById('crt-overlay').appendChild(overlay);

        // Auto-remove after duration
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, duration);
    }

    startChannelTicker() {
        // Update current channel display periodically
        setInterval(() => {
            const display = document.getElementById('crt-current-channel-display');
            if (display && this.currentChannel === 'dream-narrative') {
                // Show main channel info during narrative mode
                display.textContent = 'Dream Narrative';
            }
        }, 5000);
    }

    setupEventListeners() {
        // Keyboard shortcuts for channel switching
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key >= '1' && e.key <= '8') {
                e.preventDefault();
                const channelIndex = parseInt(e.key) - 1;
                if (this.availableChannels[channelIndex]) {
                    this.switchChannel(this.availableChannels[channelIndex].id);
                }
            }
            if (e.ctrlKey && e.key === '0') {
                e.preventDefault();
                this.switchChannel('dreamos-windows97');
            }
        });
    }

    previousChannel() {
        const currentIndex = this.availableChannels.findIndex(ch => ch.id === this.currentChannel);
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : this.availableChannels.length - 1;
        this.switchChannel(this.availableChannels[previousIndex].id);
    }

    nextChannel() {
        const currentIndex = this.availableChannels.findIndex(ch => ch.id === this.currentChannel);
        const nextIndex = currentIndex < this.availableChannels.length - 1 ? currentIndex + 1 : 0;
        this.switchChannel(this.availableChannels[nextIndex].id);
    }

    // ============================================================================
    // DATA METHODS (Mock implementations)
    // ============================================================================

    getAnomalyCount() { return Math.floor(Math.random() * 20) + 5; }
    getActiveRadioStations() { return 3; }
    getCurrentRadioFrequency() { return '97.7 MHz'; }
    getSignalStrength() { return Math.floor(Math.random() * 30) + 70; }
    getTimeAnomalies() { return Math.floor(Math.random() * 5) + 1; }
    getRealityStability() { return Math.floor(Math.random() * 40) + 60; }
    getPlayerLucidity() { return Math.floor(Math.random() * 30) + 60; }
    getDreamDepth() { return ['Surface', 'Intermediate', 'Deep', 'Transcendent'][Math.floor(Math.random() * 4)]; }
    getAnchorPoints() { return Math.floor(Math.random() * 8) + 3; }
    getSignalIntegrity() { return Math.floor(Math.random() * 25) + 75; }
    getDistortionLevel() { return ['Minimal', 'Low', 'Moderate', 'High'][Math.floor(Math.random() * 4)]; }
    getWaveFrequency() { return (Math.random() * 40 + 10).toFixed(1); }
    getWaveAmplitude() { return ['Weak', 'Moderate', 'Strong'][Math.floor(Math.random() * 3)]; }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#44ff44' : '#4444ff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: var(--dreamos-font, sans-serif);
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            animation: notification-slide-in 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'notification-slide-out 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ============================================================================
// INTEGRATION WITH CHROMASHIFT ENGINE
// ============================================================================

export class DreamOSIntegration {
    constructor() {
        this.crtChannelSystem = null;
        this.dreamosGame = null;
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            // Initialize CRT channel system
            this.crtChannelSystem = new CRTChannelSystem();

            // Initialize DreamOS game
            this.dreamosGame = await initDreamOS();

            // Integrate with ChromaShift game state
            this.setupChromaShiftIntegration();

            this.isInitialized = true;
            console.log('DreamOS Integration initialized successfully');
        } catch (error) {
            console.error('Failed to initialize DreamOS Integration:', error);
        }
    }

    setupChromaShiftIntegration() {
        // Override ChromaShift's CRT power button to include channel access
        const originalPowerBtn = document.getElementById('crt-power-button');
        if (originalPowerBtn) {
            const originalOnclick = originalPowerBtn.onclick;
            originalPowerBtn.onclick = () => {
                // Call original function
                if (originalOnclick) originalOnclick();
                
                // Add channel system access after a delay
                setTimeout(() => {
                    if (this.crtChannelSystem) {
                        // Show subtle hint about channel switching
                        this.crtChannelSystem.showNotification('Press CTRL+0 for DreamOS', 'info');
                    }
                }, 1000);
            };
        }

        // Update DreamOS game state when ChromaShift state changes
        this.watchChromaShiftState();
    }

    watchChromaShiftState() {
        // Monitor ChromaShift game state changes
        setInterval(() => {
            if (this.dreamosGame && window.gameState) {
                this.dreamosGame.updateDreamState({
                    lucidity: window.gameState.lucidity || 50,
                    coherence: window.gameState.coherence || 50,
                    perception: window.gameState.perception || 50
                });
            }
        }, 2000);
    }

    getCRTChannelSystem() {
        return this.crtChannelSystem;
    }

    getDreamOSGame() {
        return this.dreamosGame;
    }

    // Public API for ChromaShift engine
    async handleSpecialAction(actionType, data) {
        switch (actionType) {
            case 'anomaly_detected':
                // Notify DreamOS of anomaly
                if (this.dreamosGame) {
                    await this.dreamosGame.anomalyLogs.push({
                        timestamp: Date.now(),
                        level: 'alert',
                        message: `Anomaly detected: ${data.description}`,
                        data: data
                    });
                }
                break;

            case 'player_choice':
                // Analyze player choice for dream patterns
                if (this.dreamosGame) {
                    console.log('Analyzing player choice in DreamOS context:', data.choice);
                }
                break;

            case 'reality_shift':
                // Handle reality coherence changes
                if (this.dreamosGame && window.gameState) {
                    window.gameState.coherence = Math.max(0, window.gameState.coherence - data.intensity || 0);
                }
                break;
        }
    }
}

// ============================================================================
// CSS ANIMATIONS
// ============================================================================

const additionalCSS = `
<style>
@keyframes crt-static {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}

@keyframes notification-slide-in {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes notification-slide-out {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.crt-channel-selector {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: none;
    z-index: 1006;
    font-family: 'Courier New', monospace;
}

.crt-channel-header {
    background: linear-gradient(90deg, #000080, #0000ff);
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #444;
}

.crt-channel-header h3 {
    margin: 0;
    font-size: 18px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.crt-channel-close {
    background: #ff4444;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
}

.crt-channel-close:hover {
    background: #ff6666;
    transform: scale(1.1);
}

.crt-channel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    padding: 20px;
    max-height: 60vh;
    overflow-y: auto;
}

.crt-channel-item {
    background: linear-gradient(135deg, #001122, #002244);
    border: 2px solid #00ffff;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #00ffff;
}

.crt-channel-item:hover {
    background: linear-gradient(135deg, #003366, #004488);
    border-color: #ffff00;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 255, 255, 0.3);
}

.crt-channel-icon {
    font-size: 32px;
    margin-bottom: 8px;
}

.crt-channel-name {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
}

.crt-channel-frequency {
    font-size: 12px;
    color: #888;
}

.crt-channel-info {
    background: rgba(0, 0, 0, 0.8);
    padding: 15px 20px;
    border-top: 2px solid #444;
}

.crt-current-channel {
    color: #00ff00;
    font-size: 14px;
    margin-bottom: 10px;
}

.crt-channel-controls {
    display: flex;
    gap: 10px;
}

.crt-channel-controls button {
    background: #000080;
    color: white;
    border: 1px solid #444;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Courier New', monospace;
    transition: all 0.2s ease;
}

.crt-channel-controls button:hover {
    background: #0000aa;
    border-color: #666;
}

.crt-control-btn {
    background: linear-gradient(135deg, #666, #888);
    border: 2px outset #999;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.crt-control-btn:hover {
    background: linear-gradient(135deg, #888, #aaa);
    transform: translateY(-1px);
}

.crt-control-btn:active {
    border: 2px inset #999;
    transform: translateY(0);
}
</style>
`;

// Inject additional CSS
document.head.insertAdjacentHTML('beforeend', additionalCSS);

// ============================================================================
// GLOBAL EXPORTS
// ============================================================================

let crtChannelSystem = null;
let dreamOSIntegration = null;

export async function initCRTChannelSystem() {
    if (!crtChannelSystem) {
        crtChannelSystem = new CRTChannelSystem();
    }
    return crtChannelSystem;
}

export async function initDreamOSIntegration() {
    if (!dreamOSIntegration) {
        dreamOSIntegration = new DreamOSIntegration();
        await dreamOSIntegration.init();
    }
    return dreamOSIntegration;
}

export { CRTChannelSystem };