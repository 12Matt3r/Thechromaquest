// Lucidity Meter Integration - Real-time consciousness monitoring
// Interface complexity adapts based on lucidity levels with real-time feedback

class LucidityMeterIntegration {
    constructor() {
        this.currentLucidity = 0.5; // 0.0 = normal waking, 1.0 = fully lucid
        this.baseComplexity = 1;
        this.lucidityHistory = [];
        this.interfaceLayers = [];
        this.consciousnessLevel = 'normal'; // normal, aware, lucid, transcendent
        this.lastUpdateTime = Date.now();
        this.analysisInterval = null;
        this.init();
    }

    init() {
        console.log('🧠 Lucidity Meter Integration initialized');
        this.createLucidityInterface();
        this.setupMonitoring();
        this.loadLucidityData();
        this.startContinuousMonitoring();
    }

    createLucidityInterface() {
        const lucidityPanel = document.createElement('div');
        lucidityPanel.id = 'lucidity-meter-panel';
        lucidityPanel.innerHTML = `
            <div class="lucidity-container">
                <div class="lucidity-header">
                    <div class="lucidity-title">🧠 Lucidity Meter</div>
                    <div class="lucidity-level" id="lucidity-level">Normal</div>
                    <div class="lucidity-close" onclick="lucidityMeter.hide()">✕</div>
                </div>
                
                <div class="lucidity-display">
                    <div class="lucidity-meter">
                        <div class="lucidity-meter-bar" id="lucidity-meter-bar" style="width: 50%"></div>
                        <div class="lucidity-meter-text" id="lucidity-meter-text">50%</div>
                        <div class="lucidity-meter-glow" id="lucidity-meter-glow"></div>
                    </div>
                    
                    <div class="lucidity-indicators">
                        <div class="lucidity-indicator" id="indicator-normal">Normal</div>
                        <div class="lucidity-indicator" id="indicator-aware">Aware</div>
                        <div class="lucidity-indicator" id="indicator-lucid">Lucid</div>
                        <div class="lucidity-indicator" id="indicator-transcendent">Transcendent</div>
                    </div>
                    
                    <div class="lucidity-analytics">
                        <div class="lucidity-stat">
                            <span class="stat-label">Current State:</span>
                            <span class="stat-value" id="current-state">Normal Awareness</span>
                        </div>
                        <div class="lucidity-stat">
                            <span class="stat-label">Stability:</span>
                            <span class="stat-value" id="stability-value">Stable</span>
                        </div>
                        <div class="lucidity-stat">
                            <span class="stat-label">Trend:</span>
                            <span class="stat-value" id="trend-value">↔️ Stable</span>
                        </div>
                    </div>
                </div>
                
                <div class="lucidity-controls">
                    <div class="lucidity-control-group">
                        <h4>Interface Adaptation</h4>
                        <label class="lucidity-checkbox">
                            <input type="checkbox" id="auto-complexity" checked>
                            <span>Auto-adjust complexity</span>
                        </label>
                        <label class="lucidity-checkbox">
                            <input type="checkbox" id="color-adaptation" checked>
                            <span>Color scheme adaptation</span>
                        </label>
                        <label class="lucidity-checkbox">
                            <input type="checkbox" id="notification-filter" checked>
                            <span>Smart notifications</span>
                        </label>
                    </div>
                    
                    <div class="lucidity-control-group">
                        <h4>Analysis Settings</h4>
                        <div class="lucidity-slider">
                            <label>Sensitivity:</label>
                            <input type="range" id="lucidity-sensitivity" min="10" max="100" value="50">
                            <span id="sensitivity-value">50%</span>
                        </div>
                        <div class="lucidity-slider">
                            <label>Update Rate:</label>
                            <input type="range" id="update-interval" min="100" max="2000" value="500" step="100">
                            <span id="interval-value">500ms</span>
                        </div>
                    </div>
                    
                    <div class="lucidity-presets">
                        <button class="lucidity-preset-btn" onclick="lucidityMeter.setPreset('developer')">Developer</button>
                        <button class="lucidity-preset-btn" onclick="lucidityMeter.setPreset('balanced')">Balanced</button>
                        <button class="lucidity-preset-btn" onclick="lucidityMeter.setPreset('minimal')">Minimal</button>
                        <button class="lucidity-preset-btn" onclick="lucidityMeter.setPreset('maximal')">Maximal</button>
                    </div>
                </div>
                
                <div class="lucidity-graph" id="lucidity-graph">
                    <div class="graph-title">Lucidity History (Last 5 minutes)</div>
                    <canvas id="lucidity-canvas" width="400" height="150"></canvas>
                </div>
                
                <div class="lucidity-actions">
                    <button class="lucidity-action-btn" onclick="lucidityMeter.calibrateBaseline()">Calibrate</button>
                    <button class="lucidity-action-btn" onclick="lucidityMeter.resetHistory()">Reset</button>
                    <button class="lucidity-action-btn" onclick="lucidityMeter.exportData()">Export</button>
                    <button class="lucidity-action-btn" onclick="lucidityMeter.toggleAdvanced()">Advanced</button>
                </div>
            </div>
        `;
        document.body.appendChild(lucidityPanel);
        
        this.drawLucidityGraph();
        this.setupEventListeners();
    }

    setupMonitoring() {
        // Monitor user interactions for lucidity indicators
        this.interactionPatterns = {
            clickFrequency: 0,
            keyPressVariety: new Set(),
            tabSwitching: 0,
            scrollPatterns: [],
            timeOnPage: 0,
            previousStates: []
        };
        
        this.startInteractionMonitoring();
    }

    startInteractionMonitoring() {
        // Monitor click patterns
        document.addEventListener('click', (e) => {
            this.analyzeClickPattern(e);
        });
        
        // Monitor keyboard input
        document.addEventListener('keydown', (e) => {
            this.analyzeKeyPattern(e);
        });
        
        // Monitor scrolling behavior
        document.addEventListener('scroll', (e) => {
            this.analyzeScrollPattern();
        });
        
        // Monitor window focus/blur
        window.addEventListener('focus', () => {
            this.handleWindowFocus();
        });
        
        window.addEventListener('blur', () => {
            this.handleWindowBlur();
        });
        
        // Monitor time spent
        setInterval(() => {
            this.interactionPatterns.timeOnPage++;
        }, 1000);
    }

    analyzeClickPattern(event) {
        this.interactionPatterns.clickFrequency++;
        
        // Calculate click entropy (more varied clicks = higher awareness)
        const clickVariety = this.calculateClickVariety(event);
        
        // Update interaction pattern
        this.interactionPatterns.previousStates.push({
            type: 'click',
            variety: clickVariety,
            timestamp: Date.now(),
            x: event.clientX,
            y: event.clientY
        });
        
        // Limit history to recent interactions
        if (this.interactionPatterns.previousStates.length > 100) {
            this.interactionPatterns.previousStates.shift();
        }
    }

    analyzeKeyPattern(event) {
        this.interactionPatterns.keyPressVariety.add(event.code);
        
        // Monitor for dream-like behavior (random keys, patterns)
        const isRandomPattern = this.detectRandomPattern(event);
        
        this.interactionPatterns.previousStates.push({
            type: 'key',
            code: event.code,
            isRandom: isRandomPattern,
            timestamp: Date.now()
        });
        
        if (this.interactionPatterns.previousStates.length > 100) {
            this.interactionPatterns.previousStates.shift();
        }
    }

    analyzeScrollPattern() {
        const scrollPosition = window.scrollY;
        const scrollSpeed = Math.abs(window.pageYOffset - (this.lastScrollY || 0));
        
        this.interactionPatterns.scrollPatterns.push({
            position: scrollPosition,
            speed: scrollSpeed,
            timestamp: Date.now()
        });
        
        // Keep only recent patterns
        if (this.interactionPatterns.scrollPatterns.length > 50) {
            this.interactionPatterns.scrollPatterns.shift();
        }
        
        this.lastScrollY = window.pageYOffset;
    }

    calculateClickVariety(event) {
        const recentClicks = this.interactionPatterns.previousStates
            .filter(state => state.type === 'click' && 
                Date.now() - state.timestamp < 5000);
        
        if (recentClicks.length < 2) return 0.5;
        
        // Calculate spatial variety
        const xVariance = this.calculateVariance(recentClicks.map(c => c.x));
        const yVariance = this.calculateVariance(recentClicks.map(c => c.y));
        
        // Calculate temporal variety
        const timeVariance = this.calculateVariance(recentClicks.map(c => c.timestamp));
        
        return (xVariance + yVariance + timeVariance) / 3;
    }

    calculateVariance(values) {
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        return Math.sqrt(variance);
    }

    detectRandomPattern(event) {
        const recentKeys = this.interactionPatterns.previousStates
            .filter(state => state.type === 'key' && 
                Date.now() - state.timestamp < 2000);
        
        if (recentKeys.length < 3) return false;
        
        // Check for non-standard key combinations
        const hasRandomKeys = recentKeys.some(k => 
            !['Enter', 'Space', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
                .some(standard => k.code.includes(standard))
        );
        
        return hasRandomKeys && recentKeys.length > 5;
    }

    startContinuousMonitoring() {
        const sensitivity = parseInt(document.getElementById('lucidity-sensitivity')?.value) || 50;
        const interval = parseInt(document.getElementById('update-interval')?.value) || 500;
        
        this.analysisInterval = setInterval(() => {
            this.calculateLucidityLevel();
            this.adaptInterface();
            this.updateDisplays();
        }, interval);
    }

    calculateLucidityLevel() {
        const now = Date.now();
        const patterns = this.interactionPatterns.previousStates;
        
        if (patterns.length === 0) {
            this.currentLucidity = Math.max(0.1, this.currentLucidity - 0.01);
            return;
        }
        
        // Analyze recent interaction patterns (last 10 seconds)
        const recentPatterns = patterns.filter(p => now - p.timestamp < 10000);
        
        if (recentPatterns.length === 0) {
            this.currentLucidity = Math.max(0.1, this.currentLucidity - 0.02);
            return;
        }
        
        // Lucidity indicators
        let lucidityScore = 0;
        
        // High interaction frequency suggests lucid state
        const interactionDensity = recentPatterns.length / 10; // interactions per second
        lucidityScore += Math.min(interactionDensity / 10, 0.3);
        
        // High variety in interactions suggests conscious awareness
        const clickVarieties = recentPatterns.filter(p => p.type === 'click' && p.variety > 0.5).length;
        const keyVarieties = recentPatterns.filter(p => p.type === 'key' && p.isRandom).length;
        lucidityScore += Math.min((clickVarieties + keyVarieties) / recentPatterns.length, 0.4);
        
        // Complex scroll patterns suggest lucid exploration
        const scrollComplexity = this.calculateScrollComplexity();
        lucidityScore += scrollComplexity * 0.2;
        
        // Temporal analysis - irregular patterns suggest lucid state
        const temporalEntropy = this.calculateTemporalEntropy(recentPatterns);
        lucidityScore += temporalEntropy * 0.3;
        
        // Smooth the transition (prevents jarring changes)
        const smoothingFactor = 0.1;
        this.currentLucidity = this.currentLucidity * (1 - smoothingFactor) + lucidityScore * smoothingFactor;
        
        // Add baseline stability and natural fluctuations
        this.currentLucidity += (Math.random() - 0.5) * 0.02;
        this.currentLucidity = Math.max(0.05, Math.min(0.95, this.currentLucidity));
        
        this.updateConsciousnessLevel();
        this.recordLucidityData();
    }

    calculateScrollComplexity() {
        const scrollPatterns = this.interactionPatterns.scrollPatterns;
        if (scrollPatterns.length < 5) return 0;
        
        // Analyze scroll velocity changes
        const velocities = scrollPatterns.map(s => s.speed);
        const velocityVariance = this.calculateVariance(velocities);
        const avgVelocity = velocities.reduce((a, b) => a + b, 0) / velocities.length;
        
        // Complex scrolling patterns suggest exploration
        const complexity = Math.min(velocityVariance / (avgVelocity + 1), 1);
        return complexity;
    }

    calculateTemporalEntropy(patterns) {
        if (patterns.length < 5) return 0;
        
        // Calculate time intervals between interactions
        const intervals = [];
        for (let i = 1; i < patterns.length; i++) {
            intervals.push(patterns[i].timestamp - patterns[i-1].timestamp);
        }
        
        // Higher variance in timing suggests lucid awareness
        const intervalVariance = this.calculateVariance(intervals);
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        
        return Math.min(intervalVariance / (avgInterval + 1), 1);
    }

    updateConsciousnessLevel() {
        const lucidity = this.currentLucidity;
        
        if (lucidity < 0.2) {
            this.consciousnessLevel = 'normal';
        } else if (lucidity < 0.4) {
            this.consciousnessLevel = 'aware';
        } else if (lucidity < 0.7) {
            this.consciousnessLevel = 'lucid';
        } else {
            this.consciousnessLevel = 'transcendent';
        }
    }

    adaptInterface() {
        if (!document.getElementById('auto-complexity')?.checked) return;
        
        const complexity = this.getInterfaceComplexity();
        this.applyComplexityLevel(complexity);
    }

    getInterfaceComplexity() {
        const lucidity = this.currentLucidity;
        
        // Base complexity scales with lucidity
        const baseComplexity = Math.floor(lucidity * 5) + 1;
        
        // Add dynamic elements based on consciousness level
        const dynamicElements = this.getDynamicElements();
        
        return Math.min(baseComplexity + dynamicElements, 10);
    }

    getDynamicElements() {
        const elements = 0;
        
        if (this.consciousnessLevel === 'lucid') elements += 1;
        if (this.consciousnessLevel === 'transcendent') elements += 2;
        
        // Add elements based on interaction patterns
        if (this.interactionPatterns.clickFrequency > 100) elements += 1;
        if (this.interactionPatterns.keyPressVariety.size > 20) elements += 1;
        
        return elements;
    }

    applyComplexityLevel(level) {
        // Hide/show interface elements based on complexity
        const elements = {
            'advanced-analytics': level >= 6,
            'detailed-controls': level >= 4,
            'expert-options': level >= 8,
            'debugging-info': level >= 9
        };
        
        // Apply complexity to existing systems
        if (typeof cortanaDream !== 'undefined') {
            cortanaDream.adaptComplexity(level);
        }
        
        if (typeof quantumFS !== 'undefined') {
            quantumFS.adaptComplexity(level);
        }
        
        if (typeof synchronicityEngine !== 'undefined') {
            synchronicityEngine.adaptComplexity(level);
        }
        
        // Apply color scheme adaptation
        if (document.getElementById('color-adaptation')?.checked) {
            this.applyColorScheme();
        }
    }

    applyColorScheme() {
        const lucidity = this.currentLucidity;
        const level = this.consciousnessLevel;
        
        // Color progression based on consciousness level
        const colorSchemes = {
            normal: '#888888',
            aware: '#4a90e2',
            lucid: '#7ed321',
            transcendent: '#f5a623'
        };
        
        const accentColor = colorSchemes[level] || colorSchemes.normal;
        
        // Update CSS custom properties
        document.documentElement.style.setProperty('--lucidity-accent', accentColor);
        document.documentElement.style.setProperty('--lucidity-opacity', (0.3 + lucidity * 0.7));
        
        // Apply glow effects for higher lucidity
        const glowIntensity = lucidity * 20;
        document.documentElement.style.setProperty('--lucidity-glow', `0 0 ${glowIntensity}px ${accentColor}`);
    }

    updateDisplays() {
        // Update main meter
        const meterBar = document.getElementById('lucidity-meter-bar');
        const meterText = document.getElementById('lucidity-meter-text');
        const meterGlow = document.getElementById('lucidity-meter-glow');
        
        if (meterBar) {
            const percentage = Math.round(this.currentLucidity * 100);
            meterBar.style.width = `${percentage}%`;
            meterBar.style.background = this.getLucidityGradient();
        }
        
        if (meterText) {
            meterText.textContent = `${Math.round(this.currentLucidity * 100)}%`;
        }
        
        if (meterGlow) {
            meterGlow.style.opacity = this.currentLucidity * 0.8;
            meterGlow.style.background = this.getLucidityGlow();
        }
        
        // Update indicators
        this.updateIndicators();
        
        // Update analytics
        this.updateAnalytics();
        
        // Redraw graph
        this.drawLucidityGraph();
    }

    getLucidityGradient() {
        const colors = [
            { pos: 0, color: '#888888' },   // Normal - gray
            { pos: 0.2, color: '#4a90e2' }, // Aware - blue
            { pos: 0.4, color: '#7ed321' }, // Lucid - green
            { pos: 0.7, color: '#f5a623' }, // Transcendent - orange
            { pos: 1, color: '#e91e63' }    // Peak - pink
        ];
        
        const gradient = colors.map(c => `${c.color} ${c.pos * 100}%`).join(', ');
        return `linear-gradient(90deg, ${gradient})`;
    }

    getLucidityGlow() {
        const level = this.consciousnessLevel;
        const intensity = this.currentLucidity;
        
        const glows = {
            normal: `radial-gradient(circle, rgba(136, 136, 136, ${intensity * 0.3}) 0%, transparent 70%)`,
            aware: `radial-gradient(circle, rgba(74, 144, 226, ${intensity * 0.4}) 0%, transparent 70%)`,
            lucid: `radial-gradient(circle, rgba(126, 211, 33, ${intensity * 0.5}) 0%, transparent 70%)`,
            transcendent: `radial-gradient(circle, rgba(245, 166, 35, ${intensity * 0.6}) 0%, transparent 70%)`
        };
        
        return glows[level] || glows.normal;
    }

    updateIndicators() {
        const indicators = ['normal', 'aware', 'lucid', 'transcendent'];
        const currentIndex = indicators.indexOf(this.consciousnessLevel);
        
        indicators.forEach((level, index) => {
            const indicator = document.getElementById(`indicator-${level}`);
            if (indicator) {
                if (index <= currentIndex) {
                    indicator.classList.add('active');
                    indicator.classList.remove('inactive');
                } else {
                    indicator.classList.add('inactive');
                    indicator.classList.remove('active');
                }
            }
        });
    }

    updateAnalytics() {
        const stateElement = document.getElementById('current-state');
        const stabilityElement = document.getElementById('stability-value');
        const trendElement = document.getElementById('trend-value');
        
        if (stateElement) {
            const stateNames = {
                normal: 'Normal Awareness',
                aware: 'Heightened Awareness',
                lucid: 'Lucid Dreaming',
                transcendent: 'Transcendent Consciousness'
            };
            stateElement.textContent = stateNames[this.consciousnessLevel];
        }
        
        if (stabilityElement) {
            const stability = this.calculateStability();
            stabilityElement.textContent = stability;
            stabilityElement.className = `stat-value stability-${stability.toLowerCase()}`;
        }
        
        if (trendElement) {
            const trend = this.calculateTrend();
            trendElement.textContent = trend;
        }
    }

    calculateStability() {
        if (this.lucidityHistory.length < 5) return 'Unknown';
        
        const recent = this.lucidityHistory.slice(-5);
        const variance = this.calculateVariance(recent);
        
        if (variance < 0.01) return 'Very Stable';
        if (variance < 0.05) return 'Stable';
        if (variance < 0.1) return 'Moderate';
        return 'Unstable';
    }

    calculateTrend() {
        if (this.lucidityHistory.length < 3) return '↔️ No Data';
        
        const recent = this.lucidityHistory.slice(-3);
        const trend = recent[2] - recent[0];
        
        if (trend > 0.05) return '↗️ Rising';
        if (trend < -0.05) return '↘️ Declining';
        return '↔️ Stable';
    }

    drawLucidityGraph() {
        const canvas = document.getElementById('lucidity-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let x = 0; x < width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let y = 0; y < height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw lucidity line
        if (this.lucidityHistory.length > 1) {
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const dataPoints = this.lucidityHistory.slice(-20); // Last 20 points
            dataPoints.forEach((value, index) => {
                const x = (index / (dataPoints.length - 1)) * width;
                const y = height - (value * height);
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
            
            // Draw current point
            const lastValue = this.lucidityHistory[this.lucidityHistory.length - 1];
            const lastX = width;
            const lastY = height - (lastValue * height);
            
            ctx.fillStyle = '#00ff00';
            ctx.beginPath();
            ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    recordLucidityData() {
        this.lucidityHistory.push(this.currentLucidity);
        
        // Keep history to last 5 minutes
        const fiveMinutesAgo = Date.now() - 300000;
        while (this.lucidityHistory.length > 0 && 
               this.lucidityHistory.length > 300 && // Roughly 5 minutes at 1 second intervals
               this.lucidityHistory.length > 100) {
            this.lucidityHistory.shift();
        }
        
        // Save to localStorage periodically
        if (this.lucidityHistory.length % 10 === 0) {
            this.saveLucidityData();
        }
    }

    saveLucidityData() {
        const data = {
            history: this.lucidityHistory.slice(-100), // Save last 100 readings
            level: this.consciousnessLevel,
            lastUpdate: Date.now()
        };
        localStorage.setItem('lucidity-data', JSON.stringify(data));
    }

    loadLucidityData() {
        const saved = localStorage.getItem('lucidity-data');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (Array.isArray(data.history)) {
                    this.lucidityHistory = data.history;
                    if (this.lucidityHistory.length > 0) {
                        this.currentLucidity = this.lucidityHistory[this.lucidityHistory.length - 1];
                    }
                }
            } catch (e) {
                console.warn('Failed to load lucidity data:', e);
            }
        }
    }

    handleWindowFocus() {
        this.interactionPatterns.windowFocused = true;
        // Window focus often indicates conscious re-engagement
        this.currentLucidity = Math.min(0.9, this.currentLucidity + 0.1);
    }

    handleWindowBlur() {
        this.interactionPatterns.windowFocused = false;
        // Window blur can indicate lucid disengagement
        this.currentLucidity = Math.max(0.1, this.currentLucidity - 0.05);
    }

    setupEventListeners() {
        // Update interval slider
        const intervalSlider = document.getElementById('update-interval');
        if (intervalSlider) {
            intervalSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                document.getElementById('interval-value').textContent = `${value}ms`;
                this.restartMonitoring();
            });
        }
        
        // Sensitivity slider
        const sensitivitySlider = document.getElementById('lucidity-sensitivity');
        if (sensitivitySlider) {
            sensitivitySlider.addEventListener('input', (e) => {
                document.getElementById('sensitivity-value').textContent = `${e.target.value}%`;
            });
        }
    }

    restartMonitoring() {
        if (this.analysisInterval) {
            clearInterval(this.analysisInterval);
        }
        this.startContinuousMonitoring();
    }

    setPreset(presetName) {
        switch (presetName) {
            case 'developer':
                this.setDeveloperPreset();
                break;
            case 'balanced':
                this.setBalancedPreset();
                break;
            case 'minimal':
                this.setMinimalPreset();
                break;
            case 'maximal':
                this.setMaximalPreset();
                break;
        }
    }

    setDeveloperPreset() {
        document.getElementById('lucidity-sensitivity').value = 80;
        document.getElementById('update-interval').value = 100;
        document.getElementById('auto-complexity').checked = true;
        document.getElementById('color-adaptation').checked = true;
        this.restartMonitoring();
    }

    setBalancedPreset() {
        document.getElementById('lucidity-sensitivity').value = 50;
        document.getElementById('update-interval').value = 500;
        document.getElementById('auto-complexity').checked = true;
        document.getElementById('color-adaptation').checked = true;
        this.restartMonitoring();
    }

    setMinimalPreset() {
        document.getElementById('lucidity-sensitivity').value = 30;
        document.getElementById('update-interval').value = 1000;
        document.getElementById('auto-complexity').checked = false;
        document.getElementById('color-adaptation').checked = false;
        this.restartMonitoring();
    }

    setMaximalPreset() {
        document.getElementById('lucidity-sensitivity').value = 100;
        document.getElementById('update-interval').value = 50;
        document.getElementById('auto-complexity').checked = true;
        document.getElementById('color-adaptation').checked = true;
        this.restartMonitoring();
    }

    calibrateBaseline() {
        // Reset current lucidity to baseline
        this.currentLucidity = 0.5;
        this.lucidityHistory = [];
        this.interactionPatterns = {
            clickFrequency: 0,
            keyPressVariety: new Set(),
            tabSwitching: 0,
            scrollPatterns: [],
            timeOnPage: 0,
            previousStates: []
        };
        this.updateDisplays();
        console.log('🧠 Lucidity baseline calibrated');
    }

    resetHistory() {
        this.lucidityHistory = [];
        this.updateDisplays();
        console.log('🧠 Lucidity history reset');
    }

    exportData() {
        const data = {
            currentLevel: this.currentLucidity,
            consciousnessLevel: this.consciousnessLevel,
            history: this.lucidityHistory,
            interactions: this.interactionPatterns,
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lucidity-data-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    toggleAdvanced() {
        // Toggle advanced features visibility
        const advancedElements = document.querySelectorAll('.advanced-feature');
        advancedElements.forEach(el => {
            el.style.display = el.style.display === 'none' ? 'block' : 'none';
        });
    }

    show() {
        const panel = document.getElementById('lucidity-meter-panel');
        if (panel) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.opacity = '1';
            }, 10);
        }
    }

    hide() {
        const panel = document.getElementById('lucidity-meter-panel');
        if (panel) {
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }

    adaptComplexity(level) {
        // Method called by other systems to adapt their complexity
        this.applyComplexityLevel(level);
    }
}

// Initialize Lucidity Meter
const lucidityMeter = new LucidityMeterIntegration();

// Add CSS styles
const lucidityStyles = `
<style>
:root {
    --lucidity-accent: #888888;
    --lucidity-opacity: 0.3;
    --lucidity-glow: 0 0 0px #888888;
}

.lucidity-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10001;
    background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
    border: 2px solid var(--lucidity-accent);
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
    box-shadow: var(--lucidity-glow);
    width: 500px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    color: #e0e0e0;
}

.lucidity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid var(--lucidity-accent);
    border-radius: 13px 13px 0 0;
}

.lucidity-title {
    font-size: 18px;
    font-weight: bold;
    color: var(--lucidity-accent);
}

.lucidity-level {
    background: var(--lucidity-accent);
    color: #000;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    opacity: var(--lucidity-opacity);
}

.lucidity-close {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: background 0.2s;
}

.lucidity-close:hover {
    background: rgba(255, 107, 107, 0.1);
}

.lucidity-display {
    padding: 20px;
    text-align: center;
}

.lucidity-meter {
    position: relative;
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid var(--lucidity-accent);
    border-radius: 20px;
    margin-bottom: 15px;
    overflow: hidden;
}

.lucidity-meter-bar {
    height: 100%;
    background: linear-gradient(90deg, #888888 0%, #4a90e2 20%, #7ed321 40%, #f5a623 70%, #e91e63 100%);
    border-radius: 18px;
    transition: width 0.5s ease;
    position: relative;
}

.lucidity-meter-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 16px;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.lucidity-meter-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    transition: opacity 0.3s ease;
}

.lucidity-indicators {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.lucidity-indicator {
    flex: 1;
    padding: 8px 4px;
    margin: 0 2px;
    text-align: center;
    border-radius: 8px;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.lucidity-indicator.active {
    background: var(--lucidity-accent);
    color: #000;
    box-shadow: 0 0 10px var(--lucidity-accent);
}

.lucidity-indicator.inactive {
    background: rgba(255, 255, 255, 0.1);
    color: #666;
}

.lucidity-analytics {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.lucidity-stat {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.stat-label {
    color: #ccc;
}

.stat-value {
    font-weight: bold;
    color: var(--lucidity-accent);
}

.stability-very-stable { color: #7ed321; }
.stability-stable { color: #4a90e2; }
.stability-moderate { color: #f5a623; }
.stability-unstable { color: #e91e63; }

.lucidity-controls {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.lucidity-control-group {
    margin-bottom: 15px;
}

.lucidity-control-group h4 {
    color: var(--lucidity-accent);
    margin-bottom: 10px;
    font-size: 14px;
}

.lucidity-checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
}

.lucidity-checkbox input {
    margin-right: 8px;
}

.lucidity-slider {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
}

.lucidity-slider label {
    min-width: 80px;
    font-size: 12px;
}

.lucidity-slider input[type="range"] {
    flex: 1;
}

.lucidity-slider span {
    min-width: 40px;
    text-align: right;
    font-size: 12px;
    color: var(--lucidity-accent);
}

.lucidity-presets {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.lucidity-preset-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid var(--lucidity-accent);
    color: var(--lucidity-accent);
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.lucidity-preset-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px var(--lucidity-accent);
}

.lucidity-graph {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.graph-title {
    color: var(--lucidity-accent);
    font-size: 12px;
    margin-bottom: 10px;
    text-align: center;
}

#lucidity-canvas {
    width: 100%;
    height: 150px;
    border: 1px solid var(--lucidity-accent);
    border-radius: 4px;
}

.lucidity-actions {
    display: flex;
    gap: 8px;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0 0 13px 13px;
}

.lucidity-action-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid var(--lucidity-accent);
    color: var(--lucidity-accent);
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.lucidity-action-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 5px var(--lucidity-accent);
}

.advanced-feature {
    transition: opacity 0.3s ease;
}

@media (max-width: 600px) {
    .lucidity-container {
        width: 95vw;
    }
    
    .lucidity-indicators {
        flex-wrap: wrap;
    }
    
    .lucidity-presets {
        flex-wrap: wrap;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', lucidityStyles);