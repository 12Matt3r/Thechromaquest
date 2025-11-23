// Synchronicity Engine - Meaningful coincidence detection and pattern recognition
// AI-powered system for identifying meaningful patterns and coincidences

class SynchronicityEngine {
    constructor() {
        this.patterns = new Map();
        this.coincidences = [];
        this.meaningfulnessThreshold = 0.7;
        this.correlationWindow = 24 * 60 * 60 * 1000; // 24 hours
        this.aiSensitivity = 0.8;
        this.init();
    }

    init() {
        console.log('🌟 Synchronicity Engine initialized');
        this.createSynchronicityInterface();
        this.setupEventMonitoring();
        this.loadHistoricalData();
    }

    createSynchronicityInterface() {
        const synchPanel = document.createElement('div');
        synchPanel.id = 'synchronicity-engine';
        synchPanel.innerHTML = `
            <div class="synch-container">
                <div class="synch-header">
                    <div class="synch-icon">🌟</div>
                    <div class="synch-title">Synchronicity Engine</div>
                    <div class="synch-controls">
                        <button class="synch-btn" onclick="synchronicityEngine.analyzePatterns()" title="Analyze Patterns">🔍</button>
                        <button class="synch-btn" onclick="synchronicityEngine.detectCoincidences()" title="Detect Coincidences">⚡</button>
                        <button class="synch-btn" onclick="synchronicityEngine.clearData()" title="Clear Data">🗑️</button>
                        <button class="synch-close" onclick="synchronicityEngine.hide()">✕</button>
                    </div>
                </div>
                <div class="synch-content">
                    <div class="synch-dashboard">
                        <div class="synch-metric">
                            <div class="synch-metric-label">Pattern Detection</div>
                            <div class="synch-metric-value" id="synch-pattern-count">0</div>
                            <div class="synch-metric-bar">
                                <div class="synch-metric-fill" id="synch-pattern-fill"></div>
                            </div>
                        </div>
                        <div class="synch-metric">
                            <div class="synch-metric-label">Meaningful Coincidences</div>
                            <div class="synch-metric-value" id="synch-coincidence-count">0</div>
                            <div class="synch-metric-bar">
                                <div class="synch-metric-fill" id="synch-coincidence-fill"></div>
                            </div>
                        </div>
                        <div class="synch-metric">
                            <div class="synch-metric-label">AI Sensitivity</div>
                            <div class="synch-metric-value" id="synch-sensitivity-value">80%</div>
                            <div class="synch-metric-bar">
                                <div class="synch-metric-fill" id="synch-sensitivity-fill"></div>
                            </div>
                        </div>
                    </div>
                    <div class="synch-controls-panel">
                        <div class="synch-control-group">
                            <label class="synch-control-label">Meaningfulness Threshold:</label>
                            <input type="range" id="synch-threshold" min="0.1" max="1.0" step="0.1" value="0.7" 
                                   onchange="synchronicityEngine.updateThreshold(this.value)" class="synch-slider">
                            <span class="synch-control-value" id="synch-threshold-value">0.7</span>
                        </div>
                        <div class="synch-control-group">
                            <label class="synch-control-label">AI Sensitivity:</label>
                            <input type="range" id="synch-sensitivity" min="0.1" max="1.0" step="0.1" value="0.8" 
                                   onchange="synchronicityEngine.updateSensitivity(this.value)" class="synch-slider">
                            <span class="synch-control-value" id="synch-sensitivity-display">0.8</span>
                        </div>
                    </div>
                    <div class="synch-patterns-display" id="synch-patterns-display">
                        <div class="synch-patterns-header">
                            <span>Detected Patterns</span>
                            <button class="synch-refresh-btn" onclick="synchronicityEngine.refreshPatterns()">🔄</button>
                        </div>
                        <div class="synch-patterns-content" id="synch-patterns-content">
                            <div class="synch-placeholder">
                                <div class="synch-placeholder-icon">🌟</div>
                                <div class="synch-placeholder-text">No patterns detected yet</div>
                                <div class="synch-placeholder-subtext">Meaningful coincidences will appear here</div>
                            </div>
                        </div>
                    </div>
                    <div class="synch-recent-coincidences">
                        <div class="synch-recent-header">Recent Coincidences</div>
                        <div class="synch-recent-content" id="synch-recent-content">
                            <div class="synch-recent-placeholder">No recent coincidences</div>
                        </div>
                    </div>
                </div>
                <div class="synch-status-bar">
                    <div class="synch-status-item">
                        <span class="synch-status-label">Last Analysis:</span>
                        <span class="synch-status-value" id="synch-last-analysis">Never</span>
                    </div>
                    <div class="synch-status-item">
                        <span class="synch-status-label">Correlation Window:</span>
                        <span class="synch-status-value">24h</span>
                    </div>
                    <div class="synch-status-item">
                        <span class="synch-status-label">Pattern Strength:</span>
                        <span class="synch-status-value" id="synch-pattern-strength">0%</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(synchPanel);
    }

    setupEventMonitoring() {
        // Monitor various game events for patterns
        setInterval(() => {
            this.monitorGameEvents();
        }, 5000);

        // Analyze patterns periodically
        setInterval(() => {
            this.automaticPatternAnalysis();
        }, 30000);
    }

    monitorGameEvents() {
        // Collect game data for pattern analysis
        const currentEvent = {
            timestamp: Date.now(),
            gameState: this.getGameStateSnapshot(),
            dreamMetrics: this.getDreamMetrics(),
            userActions: this.getRecentUserActions(),
            environmentalFactors: this.getEnvironmentalFactors()
        };

        this.analyzeEventForPatterns(currentEvent);
    }

    getGameStateSnapshot() {
        return {
            lucidity: Math.random() * 10, // Simplified for demo
            anomalyCount: Math.floor(Math.random() * 5),
            chromaProgress: Math.random() * 100,
            tvChannels: Math.floor(Math.random() * 8) + 1,
            achievements: Math.floor(Math.random() * 20)
        };
    }

    getDreamMetrics() {
        return {
            consciousnessLevel: Math.random(),
            coherenceLevel: Math.random(),
            frequency: Math.random() * 100,
            amplitude: Math.random() * 50
        };
    }

    getRecentUserActions() {
        return {
            clicks: Math.floor(Math.random() * 10),
            wordsSpoken: Math.floor(Math.random() * 50),
            timeSpent: Math.random() * 300,
            actions: ['explore', 'observe', 'navigate', 'interact', 'listen']
        };
    }

    getEnvironmentalFactors() {
        return {
            timeOfDay: new Date().getHours(),
            dayOfWeek: new Date().getDay(),
            season: Math.floor(new Date().getMonth() / 3),
            lunar: Math.random()
        };
    }

    analyzeEventForPatterns(event) {
        // Check for meaningful patterns in the event
        const patterns = this.detectPatterns(event);
        
        patterns.forEach(pattern => {
            this.addPattern(pattern);
        });
    }

    detectPatterns(event) {
        const patterns = [];
        
        // Time-based patterns
        const timePattern = this.detectTimePatterns(event);
        if (timePattern && timePattern.strength > this.meaningfulnessThreshold) {
            patterns.push(timePattern);
        }
        
        // Game state correlation patterns
        const gamePattern = this.detectGamePatterns(event);
        if (gamePattern && gamePattern.strength > this.meaningfulnessThreshold) {
            patterns.push(gamePattern);
        }
        
        // Environmental correlation patterns
        const environmentalPattern = this.detectEnvironmentalPatterns(event);
        if (environmentalPattern && environmentalPattern.strength > this.meaningfulnessThreshold) {
            patterns.push(environmentalPattern);
        }
        
        // Dream metric correlations
        const dreamPattern = this.detectDreamPatterns(event);
        if (dreamPattern && dreamPattern.strength > this.meaningfulnessThreshold) {
            patterns.push(dreamPattern);
        }
        
        return patterns;
    }

    detectTimePatterns(event) {
        const hour = event.environmentalFactors.timeOfDay;
        const day = event.environmentalFactors.dayOfWeek;
        
        // Check if patterns emerge based on time
        if (this.patterns.has(`time_${hour}_${day}`)) {
            const existing = this.patterns.get(`time_${hour}_${day}`);
            return {
                id: `time_${hour}_${day}`,
                type: 'temporal',
                description: `Activity peaks at ${hour}:00 on day ${day}`,
                strength: Math.min(1.0, existing.occurrences * 0.1),
                occurrences: existing.occurrences + 1,
                lastSeen: event.timestamp
            };
        } else {
            return {
                id: `time_${hour}_${day}`,
                type: 'temporal',
                description: `Initial activity pattern at ${hour}:00`,
                strength: 0.1,
                occurrences: 1,
                lastSeen: event.timestamp
            };
        }
    }

    detectGamePatterns(event) {
        const state = event.gameState;
        
        // Look for correlations between game metrics
        if (state.lucidity > 5 && state.anomalyCount < 2) {
            return {
                id: `lucidity_anomaly_${Date.now()}`,
                type: 'game_state',
                description: 'High lucidity correlates with low anomaly activity',
                strength: this.calculatePatternStrength(state.lucidity, 10 - state.anomalyCount),
                data: { lucidity: state.lucidity, anomalyCount: state.anomalyCount },
                lastSeen: event.timestamp
            };
        }
        
        if (state.chromaProgress > 50 && state.achievements > 10) {
            return {
                id: `progress_achievement_${Date.now()}`,
                type: 'progression',
                description: 'Chroma progress correlates with achievement count',
                strength: this.calculatePatternStrength(state.chromaProgress / 10, state.achievements / 2),
                data: { chromaProgress: state.chromaProgress, achievements: state.achievements },
                lastSeen: event.timestamp
            };
        }
        
        return null;
    }

    detectEnvironmentalPatterns(event) {
        const env = event.environmentalFactors;
        
        // Check for environmental correlations
        if (env.lunar > 0.7 && env.season === 2) { // Full moon in summer
            return {
                id: `lunar_seasonal_${Date.now()}`,
                type: 'environmental',
                description: 'High lunar activity during seasonal transition',
                strength: env.lunar * env.season * 0.5,
                data: { lunar: env.lunar, season: env.season },
                lastSeen: event.timestamp
            };
        }
        
        return null;
    }

    detectDreamPatterns(event) {
        const dream = event.dreamMetrics;
        
        // Look for dream metric correlations
        if (dream.consciousnessLevel > 0.7 && dream.coherenceLevel > 0.8) {
            return {
                id: `consciousness_coherence_${Date.now()}`,
                type: 'dream_metrics',
                description: 'Consciousness and coherence levels sync',
                strength: dream.consciousnessLevel * dream.coherenceLevel,
                data: dream,
                lastSeen: event.timestamp
            };
        }
        
        return null;
    }

    calculatePatternStrength(value1, value2) {
        // Simple correlation calculation
        return Math.min(1.0, Math.abs(value1 - value2) / Math.max(value1, value2));
    }

    addPattern(pattern) {
        // Check if pattern already exists
        if (this.patterns.has(pattern.id)) {
            const existing = this.patterns.get(pattern.id);
            existing.occurrences++;
            existing.strength = Math.min(1.0, existing.strength * 1.1);
            existing.lastSeen = pattern.lastSeen;
        } else {
            this.patterns.set(pattern.id, pattern);
        }
        
        // Create meaningful coincidence if pattern is strong enough
        if (pattern.strength > this.meaningfulnessThreshold) {
            this.createMeaningfulCoincidence(pattern);
        }
        
        this.updateInterface();
    }

    createMeaningfulCoincidence(pattern) {
        const coincidence = {
            id: `coin_${Date.now()}`,
            patternId: pattern.id,
            description: this.generateCoincidenceDescription(pattern),
            significance: this.calculateSignificance(pattern),
            timestamp: Date.now(),
            meaningIndex: Math.random() * 100,
            fateIndicator: this.generateFateIndicator(),
            quantumCorrelation: Math.random()
        };
        
        this.coincidences.unshift(coincidence);
        
        // Keep only recent coincidences
        if (this.coincidences.length > 50) {
            this.coincidences = this.coincidences.slice(0, 50);
        }
        
        // Show coincidence notification
        this.showCoincidenceNotification(coincidence);
    }

    generateCoincidenceDescription(pattern) {
        const descriptions = {
            temporal: `You discovered that your dream activity peaks during this time - a meaningful temporal synchronization with your consciousness patterns.`,
            game_state: `An interesting connection emerged between your dream state and game progress - your awareness and achievement seem mysteriously linked.`,
            progression: `A meaningful correlation between your Chroma progress and dream evolution suggests deeper patterns in your consciousness journey.`,
            environmental: `Your dream activity seems to respond to environmental factors in ways that suggest a deeper connection between your inner and outer worlds.`,
            dream_metrics: `Your consciousness metrics show synchronized patterns that suggest your dream mind is organizing itself in meaningful ways.`
        };
        
        return descriptions[pattern.type] || `A meaningful pattern emerged in your consciousness data, suggesting deeper connections in your dream experience.`;
    }

    calculateSignificance(pattern) {
        // Calculate how significant this coincidence is
        const baseSignificance = pattern.strength * 100;
        const occurrenceBonus = pattern.occurrences * 5;
        const timeBonus = this.calculateTimeSignificance(pattern.lastSeen);
        
        return Math.min(100, baseSignificance + occurrenceBonus + timeBonus);
    }

    calculateTimeSignificance(timestamp) {
        const hoursSinceLast = (Date.now() - timestamp) / (1000 * 60 * 60);
        return Math.max(0, 20 - hoursSinceLast); // Recent patterns get bonus
    }

    generateFateIndicator() {
        const indicators = [
            '🕉️ Cosmic Alignment',
            '✨ Spiritual Convergence',
            '🌟 Destiny Whisper',
            '🔮 Mystical Synchronization',
            '💫 Universal Pattern',
            '⚡ Quantum Coincidence',
            '🎭 Cosmic Drama',
            '🌊 Universal Flow'
        ];
        
        return indicators[Math.floor(Math.random() * indicators.length)];
    }

    showCoincidenceNotification(coincidence) {
        // Create a floating notification
        const notification = document.createElement('div');
        notification.className = 'synch-coincidence-notification';
        notification.innerHTML = `
            <div class="synch-notification-icon">🌟</div>
            <div class="synch-notification-content">
                <div class="synch-notification-title">Meaningful Coincidence Detected!</div>
                <div class="synch-notification-text">${coincidence.description}</div>
                <div class="synch-notification-fate">${coincidence.fateIndicator}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    analyzePatterns() {
        const analysis = {
            totalPatterns: this.patterns.size,
            strongPatterns: Array.from(this.patterns.values()).filter(p => p.strength > 0.8).length,
            temporalPatterns: Array.from(this.patterns.values()).filter(p => p.type === 'temporal').length,
            gamePatterns: Array.from(this.patterns.values()).filter(p => p.type.includes('game')).length,
            averageStrength: this.calculateAveragePatternStrength(),
            mostRecent: this.getMostRecentPattern()
        };
        
        this.updateLastAnalysisTime();
        this.generateAnalysisReport(analysis);
        
        return analysis;
    }

    calculateAveragePatternStrength() {
        if (this.patterns.size === 0) return 0;
        
        const totalStrength = Array.from(this.patterns.values())
            .reduce((sum, pattern) => sum + pattern.strength, 0);
        
        return totalStrength / this.patterns.size;
    }

    getMostRecentPattern() {
        const patterns = Array.from(this.patterns.values());
        if (patterns.length === 0) return null;
        
        return patterns.reduce((latest, pattern) => 
            pattern.lastSeen > latest.lastSeen ? pattern : latest
        );
    }

    generateAnalysisReport(analysis) {
        console.log('🌟 Synchronicity Analysis Report:', analysis);
        
        // Update pattern strength display
        const patternStrengthElement = document.getElementById('synch-pattern-strength');
        if (patternStrengthElement) {
            patternStrengthElement.textContent = `${(analysis.averageStrength * 100).toFixed(1)}%`;
        }
    }

    updateInterface() {
        this.updateCounters();
        this.updatePatternsDisplay();
        this.updateRecentCoincidences();
        this.updateMetrics();
    }

    updateCounters() {
        const patternCount = document.getElementById('synch-pattern-count');
        const coincidenceCount = document.getElementById('synch-coincidence-count');
        
        if (patternCount) {
            patternCount.textContent = this.patterns.size;
        }
        
        if (coincidenceCount) {
            coincidenceCount.textContent = this.coincidences.length;
        }
    }

    updateMetrics() {
        const avgStrength = this.calculateAveragePatternStrength();
        
        // Update pattern detection metric
        const patternFill = document.getElementById('synch-pattern-fill');
        if (patternFill) {
            patternFill.style.width = `${Math.min(100, this.patterns.size * 10)}%`;
        }
        
        // Update coincidence metric
        const coincidenceFill = document.getElementById('synch-coincidence-fill');
        if (coincidenceFill) {
            coincidenceFill.style.width = `${Math.min(100, this.coincidences.length * 5)}%`;
        }
        
        // Update sensitivity display
        const sensitivityFill = document.getElementById('synch-sensitivity-fill');
        if (sensitivityFill) {
            sensitivityFill.style.width = `${this.aiSensitivity * 100}%`;
        }
    }

    updatePatternsDisplay() {
        const content = document.getElementById('synch-patterns-content');
        if (!content) return;
        
        if (this.patterns.size === 0) {
            content.innerHTML = `
                <div class="synch-placeholder">
                    <div class="synch-placeholder-icon">🌟</div>
                    <div class="synch-placeholder-text">No patterns detected yet</div>
                    <div class="synch-placeholder-subtext">Meaningful coincidences will appear here</div>
                </div>
            `;
        } else {
            let html = '';
            const patterns = Array.from(this.patterns.values())
                .sort((a, b) => b.strength - a.strength)
                .slice(0, 10);
            
            patterns.forEach(pattern => {
                const strengthPercent = (pattern.strength * 100).toFixed(1);
                html += `
                    <div class="synch-pattern-item">
                        <div class="synch-pattern-header">
                            <span class="synch-pattern-type">${pattern.type}</span>
                            <span class="synch-pattern-strength">${strengthPercent}%</span>
                        </div>
                        <div class="synch-pattern-description">${pattern.description}</div>
                        <div class="synch-pattern-meta">
                            <span class="synch-pattern-occurrences">${pattern.occurrences} occurrences</span>
                            <span class="synch-pattern-time">${this.formatTime(pattern.lastSeen)}</span>
                        </div>
                    </div>
                `;
            });
            
            content.innerHTML = html;
        }
    }

    updateRecentCoincidences() {
        const content = document.getElementById('synch-recent-content');
        if (!content) return;
        
        if (this.coincidences.length === 0) {
            content.innerHTML = '<div class="synch-recent-placeholder">No recent coincidences</div>';
        } else {
            let html = '';
            const recent = this.coincidences.slice(0, 5);
            
            recent.forEach(coincidence => {
                html += `
                    <div class="synch-coincidence-item">
                        <div class="synch-coincidence-header">
                            <span class="synch-coincidence-indicator">${coincidence.fateIndicator}</span>
                            <span class="synch-coincidence-significance">${coincidence.significance.toFixed(1)}%</span>
                        </div>
                        <div class="synch-coincidence-description">${coincidence.description}</div>
                        <div class="synch-coincidence-time">${this.formatTime(coincidence.timestamp)}</div>
                    </div>
                `;
            });
            
            content.innerHTML = html;
        }
    }

    updateThreshold(value) {
        this.meaningfulnessThreshold = parseFloat(value);
        document.getElementById('synch-threshold-value').textContent = value;
    }

    updateSensitivity(value) {
        this.aiSensitivity = parseFloat(value);
        document.getElementById('synch-sensitivity-value').textContent = `${Math.round(value * 100)}%`;
        document.getElementById('synch-sensitivity-display').textContent = value;
    }

    updateLastAnalysisTime() {
        const element = document.getElementById('synch-last-analysis');
        if (element) {
            element.textContent = 'Just now';
        }
    }

    formatTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return `${Math.floor(diff / 86400000)}d ago`;
    }

    refreshPatterns() {
        this.updateInterface();
    }

    clearData() {
        this.patterns.clear();
        this.coincidences = [];
        this.updateInterface();
        console.log('🌟 Synchronicity data cleared');
    }

    automaticPatternAnalysis() {
        // Run analysis if we have enough data
        if (this.patterns.size > 5) {
            this.analyzePatterns();
        }
    }

    detectCoincidences() {
        // Manual coincidence detection
        this.analyzePatterns();
        
        // Force pattern detection
        const patterns = Array.from(this.patterns.values());
        patterns.forEach(pattern => {
            if (pattern.strength > this.meaningfulnessThreshold) {
                this.createMeaningfulCoincidence(pattern);
            }
        });
        
        console.log('⚡ Manual coincidence detection completed');
    }

    loadHistoricalData() {
        // Load saved data
        const saved = localStorage.getItem('synchronicity-engine');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.patterns = new Map(data.patterns || []);
                this.coincidences = data.coincidences || [];
                this.updateInterface();
            } catch (e) {
                console.error('Failed to load synchronicity data:', e);
            }
        }
    }

    saveData() {
        const data = {
            patterns: Array.from(this.patterns.entries()),
            coincidences: this.coincidences,
            timestamp: Date.now()
        };
        localStorage.setItem('synchronicity-engine', JSON.stringify(data));
    }

    show() {
        const panel = document.getElementById('synchronicity-engine');
        if (panel) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.opacity = '1';
            }, 10);
        }
    }

    hide() {
        const panel = document.getElementById('synchronicity-engine');
        if (panel) {
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }
}

// Add CSS styles
const synchStyles = `
    #synchronicity-engine {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 900px;
        height: 700px;
        background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%);
        border: 2px solid #ffd700;
        border-radius: 15px;
        box-shadow: 0 0 40px rgba(255, 215, 0, 0.3);
        z-index: 10000;
        font-family: 'Courier New', monospace;
        transition: all 0.3s ease;
        overflow: hidden;
    }

    .synch-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .synch-header {
        display: flex;
        align-items: center;
        padding: 15px;
        background: rgba(0, 0, 0, 0.4);
        border-bottom: 2px solid #ffd700;
    }

    .synch-icon {
        font-size: 24px;
        margin-right: 10px;
    }

    .synch-title {
        flex: 1;
        color: #ffd700;
        font-size: 18px;
        font-weight: bold;
    }

    .synch-controls {
        display: flex;
        gap: 8px;
    }

    .synch-btn {
        width: 36px;
        height: 36px;
        background: rgba(255, 215, 0, 0.2);
        border: 1px solid rgba(255, 215, 0, 0.4);
        border-radius: 6px;
        color: #ffd700;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .synch-btn:hover {
        background: rgba(255, 215, 0, 0.3);
        transform: translateY(-1px);
    }

    .synch-close {
        background: rgba(244, 67, 54, 0.2);
        border: 1px solid rgba(244, 67, 54, 0.4);
        color: #ffcdd2;
    }

    .synch-content {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .synch-dashboard {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }

    .synch-metric {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 215, 0, 0.3);
        border-radius: 8px;
        padding: 15px;
        text-align: center;
    }

    .synch-metric-label {
        color: #ffd700;
        font-size: 12px;
        margin-bottom: 8px;
    }

    .synch-metric-value {
        color: #fff3e0;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .synch-metric-bar {
        height: 8px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        overflow: hidden;
    }

    .synch-metric-fill {
        height: 100%;
        background: linear-gradient(90deg, #ffd700, #ff9800);
        border-radius: 4px;
        transition: width 0.5s ease;
    }

    .synch-controls-panel {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 215, 0, 0.3);
        border-radius: 8px;
        padding: 15px;
    }

    .synch-control-group {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    .synch-control-group:last-child {
        margin-bottom: 0;
    }

    .synch-control-label {
        color: #ffd700;
        font-size: 14px;
        min-width: 160px;
    }

    .synch-slider {
        flex: 1;
        accent-color: #ffd700;
    }

    .synch-control-value {
        color: #fff3e0;
        font-weight: bold;
        min-width: 40px;
        text-align: right;
    }

    .synch-patterns-display {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 215, 0, 0.3);
        border-radius: 8px;
        padding: 15px;
        flex: 1;
        min-height: 200px;
    }

    .synch-patterns-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ffd700;
        font-weight: bold;
        margin-bottom: 12px;
    }

    .synch-refresh-btn {
        background: none;
        border: none;
        color: #ffd700;
        cursor: pointer;
        font-size: 16px;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    .synch-refresh-btn:hover {
        background: rgba(255, 215, 0, 0.1);
    }

    .synch-patterns-content {
        max-height: 250px;
        overflow-y: auto;
    }

    .synch-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        text-align: center;
        color: #ffd700;
    }

    .synch-placeholder-icon {
        font-size: 48px;
        margin-bottom: 15px;
    }

    .synch-placeholder-text {
        font-size: 18px;
        margin-bottom: 8px;
        color: #fff3e0;
    }

    .synch-placeholder-subtext {
        font-size: 14px;
        color: #ffcc02;
    }

    .synch-pattern-item {
        background: rgba(255, 215, 0, 0.1);
        border: 1px solid rgba(255, 215, 0, 0.3);
        border-radius: 6px;
        padding: 10px;
        margin-bottom: 8px;
    }

    .synch-pattern-item:last-child {
        margin-bottom: 0;
    }

    .synch-pattern-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
    }

    .synch-pattern-type {
        color: #ffd700;
        font-size: 12px;
        text-transform: capitalize;
    }

    .synch-pattern-strength {
        color: #fff3e0;
        font-size: 12px;
        font-weight: bold;
    }

    .synch-pattern-description {
        color: #e0e0e0;
        font-size: 13px;
        margin-bottom: 6px;
        line-height: 1.3;
    }

    .synch-pattern-meta {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: #b8860b;
    }

    .synch-recent-coincidences {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 215, 0, 0.3);
        border-radius: 8px;
        padding: 15px;
        max-height: 150px;
        overflow-y: auto;
    }

    .synch-recent-header {
        color: #ffd700;
        font-weight: bold;
        margin-bottom: 8px;
        font-size: 14px;
    }

    .synch-recent-placeholder {
        color: #b8860b;
        font-style: italic;
        text-align: center;
        padding: 20px;
    }

    .synch-coincidence-item {
        background: rgba(255, 215, 0, 0.05);
        border: 1px solid rgba(255, 215, 0, 0.2);
        border-radius: 6px;
        padding: 8px;
        margin-bottom: 6px;
    }

    .synch-coincidence-item:last-child {
        margin-bottom: 0;
    }

    .synch-coincidence-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }

    .synch-coincidence-indicator {
        color: #ffd700;
        font-size: 12px;
    }

    .synch-coincidence-significance {
        color: #fff3e0;
        font-size: 12px;
        font-weight: bold;
    }

    .synch-coincidence-description {
        color: #e0e0e0;
        font-size: 12px;
        margin-bottom: 4px;
        line-height: 1.3;
    }

    .synch-coincidence-time {
        color: #b8860b;
        font-size: 10px;
        text-align: right;
    }

    .synch-status-bar {
        padding: 10px 15px;
        background: rgba(0, 0, 0, 0.4);
        border-top: 1px solid rgba(255, 215, 0, 0.3);
        display: flex;
        justify-content: space-around;
    }

    .synch-status-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
    }

    .synch-status-label {
        color: #b8860b;
        font-size: 11px;
    }

    .synch-status-value {
        color: #ffd700;
        font-weight: bold;
        font-size: 14px;
    }

    .synch-coincidence-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 350px;
        background: linear-gradient(135deg, #ffd700, #ff9800);
        color: #1a1a2e;
        border-radius: 12px;
        padding: 15px;
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
        z-index: 11000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }

    .synch-coincidence-notification.show {
        opacity: 1;
        transform: translateX(0);
    }

    .synch-notification-icon {
        font-size: 24px;
        margin-top: 2px;
    }

    .synch-notification-content {
        flex: 1;
    }

    .synch-notification-title {
        font-weight: bold;
        margin-bottom: 4px;
        font-size: 14px;
    }

    .synch-notification-text {
        font-size: 12px;
        line-height: 1.3;
        margin-bottom: 4px;
    }

    .synch-notification-fate {
        font-size: 11px;
        font-style: italic;
        opacity: 0.8;
    }
`;

// Inject styles
const synchStyleSheet = document.createElement('style');
synchStyleSheet.textContent = synchStyles;
document.head.appendChild(synchStyleSheet);

// Export for global use
window.SynchronicityEngine = SynchronicityEngine;