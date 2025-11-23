// AI-Powered Desktop Personalization - Dynamic wallpaper and intelligent organization
// System adapts to user behavior patterns and dream state for personalized experience

class AIPoweredDesktopPersonalization {
    constructor() {
        this.userProfile = {
            preferences: {},
            behaviorPatterns: {},
            aestheticPreferences: {},
            usageHistory: [],
            learningData: {}
        };
        this.currentTheme = 'dream-default';
        this.adaptationLevel = 0.5;
        this.learningEnabled = true;
        this.personalizationStrength = 0.7;
        this.contextualAwareness = true;
        this.interfaceComplexity = 3;
        this.init();
    }

    init() {
        console.log('🎨 AI-Powered Desktop Personalization initialized');
        this.createPersonalizationInterface();
        this.setupEventListeners();
        this.loadUserProfile();
        this.startLearningSystem();
        this.generateInitialPersonalization();
    }

    createPersonalizationInterface() {
        const personalizationPanel = document.createElement('div');
        personalizationPanel.id = 'ai-personalization-panel';
        personalizationPanel.innerHTML = `
            <div class="apd-container">
                <div class="apd-header">
                    <div class="apd-title">🎨 AI Desktop Personalization</div>
                    <div class="apd-status" id="apd-status">Learning</div>
                    <div class="apd-close" onclick="aiPersonalization.hide()">✕</div>
                </div>
                
                <div class="apd-display">
                    <div class="apd-user-profile">
                        <div class="profile-section">
                            <h4>Current Profile</h4>
                            <div class="profile-stats">
                                <div class="profile-stat">
                                    <span class="stat-label">Learning Progress:</span>
                                    <div class="progress-bar">
                                        <div class="progress-fill" id="learning-progress" style="width: 30%"></div>
                                    </div>
                                    <span class="stat-value" id="learning-value">30%</span>
                                </div>
                                <div class="profile-stat">
                                    <span class="stat-label">Adaptation Level:</span>
                                    <span class="stat-value" id="adaptation-level">Moderate</span>
                                </div>
                                <div class="profile-stat">
                                    <span class="stat-label">Theme Preference:</span>
                                    <span class="stat-value" id="theme-preference">Dream-State</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="profile-section">
                            <h4>Behavior Analysis</h4>
                            <div class="behavior-patterns">
                                <div class="pattern-item">
                                    <span class="pattern-name">Interaction Style:</span>
                                    <span class="pattern-value" id="interaction-style">Balanced</span>
                                </div>
                                <div class="pattern-item">
                                    <span class="pattern-name">Visual Preference:</span>
                                    <span class="pattern-value" id="visual-preference">Complex</span>
                                </div>
                                <div class="pattern-item">
                                    <span class="pattern-name">Complexity Tolerance:</span>
                                    <span class="pattern-value" id="complexity-tolerance">High</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="apd-personalization-preview">
                        <div class="preview-header">Personalization Preview</div>
                        <div class="preview-canvas" id="preview-canvas">
                            <div class="preview-desktop" id="preview-desktop">
                                <div class="preview-wallpaper" id="preview-wallpaper"></div>
                                <div class="preview-icons" id="preview-icons">
                                    <div class="preview-icon">📁</div>
                                    <div class="preview-icon">🖥️</div>
                                    <div class="preview-icon">📝</div>
                                    <div class="preview-icon">🎮</div>
                                </div>
                                <div class="preview-taskbar" id="preview-taskbar"></div>
                            </div>
                        </div>
                        <div class="preview-info">
                            <div class="preview-details" id="preview-details">
                                Dynamic wallpaper based on your consciousness patterns
                            </div>
                        </div>
                    </div>
                    
                    <div class="apd-learning-insights">
                        <h4>AI Learning Insights</h4>
                        <div class="insights-list" id="insights-list">
                            <div class="insight-item">
                                <span class="insight-icon">🧠</span>
                                <span class="insight-text">Learning your visual preferences...</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="apd-controls">
                    <div class="apd-control-group">
                        <h4>Personalization Settings</h4>
                        <label class="apd-checkbox">
                            <input type="checkbox" id="dynamic-wallpaper" checked>
                            <span>Dynamic wallpaper generation</span>
                        </label>
                        <label class="apd-checkbox">
                            <input type="checkbox" id="intelligent-arrangement" checked>
                            <span>Intelligent icon arrangement</span>
                        </label>
                        <label class="apd-checkbox">
                            <input type="checkbox" id="contextual-items" checked>
                            <span>Contextual desktop items</span>
                        </label>
                        <label class="apd-checkbox">
                            <input type="checkbox" id="learning-system" checked>
                            <span>AI learning system</span>
                        </label>
                    </div>
                    
                    <div class="apd-control-group">
                        <h4>Adaptation Controls</h4>
                        <div class="apd-slider">
                            <label>Personalization Strength:</label>
                            <input type="range" id="personalization-strength" min="0" max="100" value="70">
                            <span>70%</span>
                        </div>
                        <div class="apd-slider">
                            <label>Adaptation Speed:</label>
                            <input type="range" id="adaptation-speed" min="10" max="100" value="50">
                            <span>50%</span>
                        </div>
                        <div class="apd-slider">
                            <label>Interface Complexity:</label>
                            <input type="range" id="interface-complexity" min="1" max="10" value="3">
                            <span>3</span>
                        </div>
                    </div>
                    
                    <div class="apd-presets">
                        <button class="apd-preset-btn" onclick="aiPersonalization.setPreset('minimal')">Minimal</button>
                        <button class="apd-preset-btn" onclick="aiPersonalization.setPreset('balanced')">Balanced</button>
                        <button class="apd-preset-btn" onclick="aiPersonalization.setPreset('maximal')">Maximal</button>
                        <button class="apd-preset-btn" onclick="aiPersonalization.setPreset('adaptive')">Adaptive</button>
                    </div>
                </div>
                
                <div class="apd-wallpaper-gallery">
                    <h4>Generated Wallpapers</h4>
                    <div class="wallpaper-grid" id="wallpaper-grid">
                        <div class="wallpaper-item">
                            <div class="wallpaper-preview" style="background: linear-gradient(45deg, #1a1a1a, #2a2a2a)"></div>
                            <div class="wallpaper-info">
                                <span class="wallpaper-name">Dream State Default</span>
                                <span class="wallpaper-type">Generated</span>
                            </div>
                        </div>
                    </div>
                    <button class="apd-action-btn" onclick="aiPersonalization.generateNewWallpaper()">Generate New</button>
                </div>
                
                <div class="apd-actions">
                    <button class="apd-action-btn" onclick="aiPersonalization.resetProfile()">Reset Profile</button>
                    <button class="apd-action-btn" onclick="aiPersonalization.exportProfile()">Export Profile</button>
                    <button class="apd-action-btn" onclick="aiPersonalization.applyPersonalization()">Apply Now</button>
                </div>
            </div>
        `;
        document.body.appendChild(personalizationPanel);
        
        this.setupEventListeners();
    }

    startLearningSystem() {
        // Start monitoring user interactions to learn preferences
        this.interactionTracker = new InteractionTracker();
        
        // Monitor visual preferences
        this.startVisualPreferenceLearning();
        
        // Monitor behavioral patterns
        this.startBehavioralPatternLearning();
        
        // Monitor aesthetic preferences
        this.startAestheticPreferenceLearning();
        
        // Generate initial insights
        setTimeout(() => {
            this.generateLearningInsights();
        }, 3000);
    }

    setupEventListeners() {
        // Control sliders
        const sliders = ['personalization-strength', 'adaptation-speed', 'interface-complexity'];
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                slider.addEventListener('input', (e) => {
                    this.updateControlSetting(id, e.target.value);
                });
            }
        });
        
        // Feature toggles
        const toggles = ['dynamic-wallpaper', 'intelligent-arrangement', 'contextual-items', 'learning-system'];
        toggles.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.updateFeatureSetting(id, checkbox.checked);
                });
            }
        });
    }

    startVisualPreferenceLearning() {
        // Monitor what visual elements user interacts with most
        this.visualInteractionHistory = [];
        
        // Track mouse movements and clicks to analyze visual preferences
        document.addEventListener('mousemove', (e) => {
            this.trackVisualInteraction(e, 'move');
        });
        
        document.addEventListener('click', (e) => {
            this.trackVisualInteraction(e, 'click');
        });
        
        // Analyze color preferences based on interface usage
        this.analyzeColorPreferences();
    }

    trackVisualInteraction(event, type) {
        const interaction = {
            type: type,
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now(),
            element: this.getElementAtPosition(event.clientX, event.clientY)
        };
        
        this.visualInteractionHistory.push(interaction);
        
        // Keep only recent history for analysis
        if (this.visualInteractionHistory.length > 500) {
            this.visualInteractionHistory.shift();
        }
        
        // Analyze preferences periodically
        if (this.visualInteractionHistory.length % 50 === 0) {
            this.analyzeVisualPreferences();
        }
    }

    getElementAtPosition(x, y) {
        const element = document.elementFromPoint(x, y);
        return element ? element.className || element.tagName : 'unknown';
    }

    analyzeVisualPreferences() {
        const recentInteractions = this.visualInteractionHistory.slice(-100);
        
        if (recentInteractions.length < 10) return;
        
        // Analyze spatial distribution of interactions
        const spatialAnalysis = this.analyzeSpatialPatterns(recentInteractions);
        
        // Analyze timing patterns
        const temporalAnalysis = this.analyzeTemporalPatterns(recentInteractions);
        
        // Update user profile
        this.userProfile.visualPreferences = {
            ...spatialAnalysis,
            ...temporalAnalysis,
            lastUpdate: Date.now()
        };
        
        this.updateProfileDisplays();
    }

    analyzeSpatialPatterns(interactions) {
        // Analyze where user tends to interact most
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        const regions = {
            top: 0, bottom: 0, left: 0, right: 0, center: 0
        };
        
        interactions.forEach(interaction => {
            const x = interaction.x / screenWidth;
            const y = interaction.y / screenHeight;
            
            if (x < 0.3) regions.left++;
            else if (x > 0.7) regions.right++;
            else regions.center++;
            
            if (y < 0.3) regions.top++;
            else if (y > 0.7) regions.bottom++;
        });
        
        const total = interactions.length;
        const preferences = {
            horizontalPreference: regions.left > regions.right ? 'left' : regions.right > regions.left ? 'right' : 'center',
            verticalPreference: regions.top > regions.bottom ? 'top' : regions.bottom > regions.top ? 'bottom' : 'center',
            centerFocus: regions.center / total
        };
        
        return preferences;
    }

    analyzeTemporalPatterns(interactions) {
        // Analyze timing and rhythm of interactions
        const intervals = [];
        
        for (let i = 1; i < interactions.length; i++) {
            intervals.push(interactions[i].timestamp - interactions[i-1].timestamp);
        }
        
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const intervalVariance = this.calculateVariance(intervals);
        
        return {
            averageInteractionInterval: avgInterval,
            interactionVariability: intervalVariance,
            interactionRhythm: avgInterval < 500 ? 'rapid' : avgInterval < 2000 ? 'moderate' : 'slow'
        };
    }

    calculateVariance(values) {
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        return Math.sqrt(variance);
    }

    startBehavioralPatternLearning() {
        // Monitor application usage patterns
        this.applicationUsageHistory = [];
        this.focusHistory = [];
        
        // Track window focus changes
        window.addEventListener('focus', () => {
            this.trackApplicationFocus('gained');
        });
        
        window.addEventListener('blur', () => {
            this.trackApplicationFocus('lost');
        });
        
        // Analyze productivity patterns
        setInterval(() => {
            this.analyzeBehavioralPatterns();
        }, 10000); // Every 10 seconds
    }

    trackApplicationFocus(state) {
        this.focusHistory.push({
            state: state,
            timestamp: Date.now(),
            activeElement: document.activeElement?.tagName || 'unknown'
        });
        
        // Keep only recent focus history
        if (this.focusHistory.length > 200) {
            this.focusHistory.shift();
        }
    }

    analyzeBehavioralPatterns() {
        const recentFocus = this.focusHistory.filter(f => 
            Date.now() - f.timestamp < 300000 // Last 5 minutes
        );
        
        if (recentFocus.length < 5) return;
        
        const focusStability = this.calculateFocusStability(recentFocus);
        const elementPreferences = this.analyzeElementPreferences(recentFocus);
        
        this.userProfile.behaviorPatterns = {
            focusStability: focusStability,
            elementPreferences: elementPreferences,
            lastUpdate: Date.now()
        };
        
        this.updateProfileDisplays();
    }

    calculateFocusStability(focusHistory) {
        const switches = focusHistory.filter(f => f.state === 'lost').length;
        const duration = focusHistory[focusHistory.length - 1].timestamp - focusHistory[0].timestamp;
        
        return switches / (duration / 60000); // Switches per minute
    }

    analyzeElementPreferences(focusHistory) {
        const elementCounts = {};
        
        focusHistory.forEach(focus => {
            const element = focus.activeElement;
            elementCounts[element] = (elementCounts[element] || 0) + 1;
        });
        
        const total = focusHistory.length;
        const preferences = {};
        
        Object.keys(elementCounts).forEach(element => {
            preferences[element] = elementCounts[element] / total;
        });
        
        return preferences;
    }

    startAestheticPreferenceLearning() {
        // Monitor color and visual aesthetic preferences
        this.colorInteractionHistory = [];
        
        // Track interactions with colored elements
        document.addEventListener('click', (e) => {
            this.trackColorInteraction(e);
        });
        
        // Analyze UI theme preferences
        this.analyzeThemePreferences();
    }

    trackColorInteraction(event) {
        const element = event.target;
        const computedStyle = window.getComputedStyle(element);
        const color = computedStyle.color || computedStyle.backgroundColor;
        
        if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
            this.colorInteractionHistory.push({
                color: color,
                element: element.tagName,
                timestamp: Date.now()
            });
            
            if (this.colorInteractionHistory.length > 200) {
                this.colorInteractionHistory.shift();
            }
            
            // Analyze color preferences periodically
            if (this.colorInteractionHistory.length % 25 === 0) {
                this.analyzeColorPreferences();
            }
        }
    }

    analyzeColorPreferences() {
        if (this.colorInteractionHistory.length < 10) return;
        
        const colorAnalysis = this.extractColorPatterns(this.colorInteractionHistory);
        
        this.userProfile.aestheticPreferences = {
            ...colorAnalysis,
            lastUpdate: Date.now()
        };
    }

    extractColorPatterns(colorHistory) {
        // Extract dominant colors and color preferences
        const colorCounts = {};
        const brightnessScores = [];
        
        colorHistory.forEach(entry => {
            const rgb = this.parseRGBColor(entry.color);
            if (rgb) {
                const brightness = this.calculateBrightness(rgb);
                brightnessScores.push(brightness);
                
                const colorKey = this.categorizeColor(rgb);
                colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
            }
        });
        
        const avgBrightness = brightnessScores.reduce((a, b) => a + b, 0) / brightnessScores.length;
        const preferredColors = Object.keys(colorCounts).sort((a, b) => 
            colorCounts[b] - colorCounts[a]
        ).slice(0, 5);
        
        return {
            brightnessPreference: avgBrightness > 128 ? 'bright' : 'dark',
            colorPreferences: preferredColors,
            colorDiversity: preferredColors.length
        };
    }

    parseRGBColor(color) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3])
            };
        }
        return null;
    }

    calculateBrightness(rgb) {
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    }

    categorizeColor(rgb) {
        const { r, g, b } = rgb;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        
        if (max === min) return 'neutral';
        if (r > g && r > b) return 'red';
        if (g > r && g > b) return 'green';
        if (b > r && b > g) return 'blue';
        if (r === g && r > b) return 'yellow';
        if (g === b && r < g) return 'cyan';
        if (r === b && g < r) return 'magenta';
        
        return 'mixed';
    }

    generateInitialPersonalization() {
        // Generate initial wallpaper based on default patterns
        const wallpaper = this.generateDynamicWallpaper();
        this.applyWallpaper(wallpaper);
        
        // Arrange icons based on spatial preferences
        this.arrangeDesktopIcons();
        
        // Apply initial theme
        this.applyTheme();
    }

    generateDynamicWallpaper() {
        // Generate wallpaper based on current user state and preferences
        const lucidity = this.getCurrentLucidity();
        const timeOfDay = new Date().getHours();
        const userMood = this.analyzeCurrentMood();
        
        // Create gradient based on lucidity level
        const lucidityColors = this.getLucidityColors(lucidity);
        const timeColors = this.getTimeOfDayColors(timeOfDay);
        const moodColors = this.getMoodColors(userMood);
        
        // Blend colors based on user preferences
        const primaryColor = this.blendColors(lucidityColors, timeColors, moodColors);
        
        // Generate pattern based on behavior patterns
        const patternType = this.getPatternType();
        
        return {
            type: 'generated',
            colors: primaryColor,
            pattern: patternType,
            timestamp: Date.now(),
            lucidity: lucidity,
            mood: userMood
        };
    }

    getCurrentLucidity() {
        if (typeof lucidityMeter !== 'undefined') {
            return lucidityMeter.currentLucidity || 0.5;
        }
        return 0.5;
    }

    analyzeCurrentMood() {
        // Analyze current user state for mood detection
        const recentActivity = this.getRecentActivity();
        
        if (recentActivity.length === 0) return 'neutral';
        
        const activityLevel = recentActivity.length / 60; // Normalized per minute
        const focusLevel = this.calculateCurrentFocusLevel();
        
        if (activityLevel > 0.8 && focusLevel > 0.7) return 'energized';
        if (activityLevel < 0.2 && focusLevel < 0.3) return 'calm';
        if (focusLevel > 0.8) return 'focused';
        
        return 'balanced';
    }

    getRecentActivity() {
        // Get user activity from last 5 minutes
        const fiveMinutesAgo = Date.now() - 300000;
        return this.interactionTracker?.getActivitySince(fiveMinutesAgo) || [];
    }

    calculateCurrentFocusLevel() {
        const recentFocus = this.focusHistory?.filter(f => 
            Date.now() - f.timestamp < 60000
        ) || [];
        
        if (recentFocus.length < 2) return 0.5;
        
        const switches = recentFocus.filter(f => f.state === 'lost').length;
        return Math.max(0, 1 - (switches / 10));
    }

    getLucidityColors(lucidity) {
        const colorSchemes = {
            normal: { primary: '#2a2a2a', secondary: '#4a4a4a', accent: '#888888' },
            aware: { primary: '#1a2a4a', secondary: '#2a4a6a', accent: '#4a90e2' },
            lucid: { primary: '#1a4a2a', secondary: '#2a6a4a', accent: '#7ed321' },
            transcendent: { primary: '#4a1a4a', secondary: '#6a2a6a', accent: '#e91e63' }
        };
        
        if (lucidity < 0.2) return colorSchemes.normal;
        if (lucidity < 0.4) return colorSchemes.aware;
        if (lucidity < 0.7) return colorSchemes.lucid;
        return colorSchemes.transcendent;
    }

    getTimeOfDayColors(hour) {
        const timeSchemes = {
            dawn: { primary: '#ff9a00', secondary: '#ff6b6b', accent: '#ffdd44' },
            morning: { primary: '#87ceeb', secondary: '#98fb98', accent: '#ffff99' },
            afternoon: { primary: '#87cefa', secondary: '#90ee90', accent: '#ffd700' },
            evening: { primary: '#ff4500', secondary: '#ff6347', accent: '#ffa500' },
            night: { primary: '#191970', secondary: '#4169e1', accent: '#9370db' }
        };
        
        if (hour >= 5 && hour < 8) return timeSchemes.dawn;
        if (hour >= 8 && hour < 12) return timeSchemes.morning;
        if (hour >= 12 && hour < 17) return timeSchemes.afternoon;
        if (hour >= 17 && hour < 21) return timeSchemes.evening;
        return timeSchemes.night;
    }

    getMoodColors(mood) {
        const moodSchemes = {
            energized: { primary: '#ff4500', secondary: '#ff6347', accent: '#ffd700' },
            calm: { primary: '#87ceeb', secondary: '#98fb98', accent: '#e6e6fa' },
            focused: { primary: '#1e90ff', secondary: '#4169e1', accent: '#00bfff' },
            balanced: { primary: '#32cd32', secondary: '#228b22', accent: '#90ee90' },
            neutral: { primary: '#808080', secondary: '#a9a9a9', accent: '#d3d3d3' }
        };
        
        return moodSchemes[mood] || moodSchemes.neutral;
    }

    blendColors(lucidityColors, timeColors, moodColors) {
        // Intelligent color blending based on user preferences
        const userPreferences = this.userProfile.aestheticPreferences || {};
        const brightnessWeight = userPreferences.brightnessPreference === 'bright' ? 1.2 : 0.8;
        
        return {
            primary: this.blendTwoColors(lucidityColors.primary, timeColors.primary, 0.6),
            secondary: this.blendTwoColors(lucidityColors.secondary, moodColors.secondary, 0.7),
            accent: this.mixColors(lucidityColors.accent, timeColors.accent, moodColors.accent),
            brightness: brightnessWeight
        };
    }

    blendTwoColors(color1, color2, weight1) {
        // Blend two colors with weighted average
        const rgb1 = this.hexToRgb(color1) || { r: 42, g: 42, b: 42 };
        const rgb2 = this.hexToRgb(color2) || { r: 74, g: 74, b: 74 };
        
        const r = Math.round(rgb1.r * weight1 + rgb2.r * (1 - weight1));
        const g = Math.round(rgb1.g * weight1 + rgb2.g * (1 - weight1));
        const b = Math.round(rgb1.b * weight1 + rgb2.b * (1 - weight1));
        
        return this.rgbToHex(r, g, b);
    }

    mixColors(color1, color2, color3) {
        // Mix three colors
        const rgb1 = this.hexToRgb(color1) || { r: 136, g: 136, b: 136 };
        const rgb2 = this.hexToRgb(color2) || { r: 135, g: 206, b: 235 };
        const rgb3 = this.hexToRgb(color3) || { r: 50, g: 205, b: 50 };
        
        const r = Math.round((rgb1.r + rgb2.r + rgb3.r) / 3);
        const g = Math.round((rgb1.g + rgb2.g + rgb3.g) / 3);
        const b = Math.round((rgb1.b + rgb2.b + rgb3.b) / 3);
        
        return this.rgbToHex(r, g, b);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    getPatternType() {
        const preferences = this.userProfile.visualPreferences || {};
        const centerFocus = preferences.centerFocus || 0.3;
        
        if (centerFocus > 0.6) return 'radial';
        if (preferences.horizontalPreference === 'left') return 'gradient-left';
        if (preferences.horizontalPreference === 'right') return 'gradient-right';
        
        return 'linear';
    }

    applyWallpaper(wallpaper) {
        const previewWallpaper = document.getElementById('preview-wallpaper');
        if (previewWallpaper) {
            const gradient = this.generateGradientFromWallpaper(wallpaper);
            previewWallpaper.style.background = gradient;
        }
        
        // Store wallpaper for application
        this.currentWallpaper = wallpaper;
        
        // Update wallpaper preview in gallery
        this.addWallpaperToGallery(wallpaper);
    }

    generateGradientFromWallpaper(wallpaper) {
        const { colors, pattern } = wallpaper;
        
        switch (pattern) {
            case 'radial':
                return `radial-gradient(circle at center, ${colors.secondary} 0%, ${colors.primary} 70%)`;
            case 'gradient-left':
                return `linear-gradient(90deg, ${colors.accent} 0%, ${colors.primary} 50%, ${colors.secondary} 100%)`;
            case 'gradient-right':
                return `linear-gradient(270deg, ${colors.accent} 0%, ${colors.primary} 50%, ${colors.secondary} 100%)`;
            default:
                return `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`;
        }
    }

    arrangeDesktopIcons() {
        // Arrange desktop icons based on user spatial preferences
        const preferences = this.userProfile.visualPreferences || {};
        const previewIcons = document.getElementById('preview-icons');
        
        if (!previewIcons || !preferences.horizontalPreference) return;
        
        // Adjust icon positioning based on preferences
        const iconPositions = {
            left: 'flex-start',
            right: 'flex-end',
            center: 'center'
        };
        
        previewIcons.style.justifyContent = iconPositions[preferences.horizontalPreference] || 'flex-start';
    }

    applyTheme() {
        // Apply theme based on user preferences and current state
        const lucidity = this.getCurrentLucidity();
        const theme = this.selectOptimalTheme(lucidity);
        
        // Update preview theme
        const previewDesktop = document.getElementById('preview-desktop');
        if (previewDesktop) {
            previewDesktop.className = `preview-desktop theme-${theme}`;
        }
        
        this.currentTheme = theme;
    }

    selectOptimalTheme(lucidity) {
        if (lucidity < 0.2) return 'minimal';
        if (lucidity < 0.4) return 'standard';
        if (lucidity < 0.7) return 'enhanced';
        return 'transcendent';
    }

    updateProfileDisplays() {
        // Update profile statistics in UI
        this.updateLearningProgress();
        this.updateBehaviorPatterns();
        this.updateAdaptationLevel();
    }

    updateLearningProgress() {
        const dataPoints = [
            this.userProfile.visualPreferences,
            this.userProfile.behaviorPatterns,
            this.userProfile.aestheticPreferences
        ].filter(Boolean).length;
        
        const progress = Math.min((dataPoints / 3) * 100, 100);
        const progressFill = document.getElementById('learning-progress');
        const progressValue = document.getElementById('learning-value');
        
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressValue) progressValue.textContent = `${Math.round(progress)}%`;
    }

    updateBehaviorPatterns() {
        const patterns = this.userProfile.behaviorPatterns;
        
        if (patterns?.focusStability !== undefined) {
            const style = patterns.focusStability > 0.5 ? 'Focused' : 'Exploratory';
            const styleElement = document.getElementById('interaction-style');
            if (styleElement) styleElement.textContent = style;
        }
    }

    updateAdaptationLevel() {
        const dataCompleteness = this.calculateDataCompleteness();
        const level = dataCompleteness > 0.8 ? 'Advanced' : 
                     dataCompleteness > 0.5 ? 'Moderate' : 'Learning';
        const levelElement = document.getElementById('adaptation-level');
        if (levelElement) levelElement.textContent = level;
    }

    calculateDataCompleteness() {
        const categories = [
            this.userProfile.visualPreferences,
            this.userProfile.behaviorPatterns,
            this.userProfile.aestheticPreferences
        ];
        
        return categories.filter(Boolean).length / categories.length;
    }

    generateLearningInsights() {
        // Generate AI insights about user patterns
        const insights = [];
        
        // Visual preference insights
        if (this.userProfile.visualPreferences?.centerFocus > 0.6) {
            insights.push({
                icon: '🎯',
                text: 'You prefer center-focused interfaces',
                type: 'visual'
            });
        }
        
        // Behavioral insights
        if (this.userProfile.behaviorPatterns?.focusStability > 0.7) {
            insights.push({
                icon: '🔍',
                text: 'High focus stability detected',
                type: 'behavioral'
            });
        }
        
        // Aesthetic insights
        if (this.userProfile.aestheticPreferences?.brightnessPreference === 'dark') {
            insights.push({
                icon: '🌙',
                text: 'Prefers darker color schemes',
                type: 'aesthetic'
            });
        }
        
        this.updateInsightsList(insights);
        
        if (insights.length === 0) {
            insights.push({
                icon: '🧠',
                text: 'Learning your preferences...',
                type: 'learning'
            });
            this.updateInsightsList(insights);
        }
    }

    updateInsightsList(insights) {
        const insightsList = document.getElementById('insights-list');
        if (!insightsList) return;
        
        insightsList.innerHTML = '';
        insights.forEach(insight => {
            const insightElement = document.createElement('div');
            insightElement.className = 'insight-item';
            insightElement.innerHTML = `
                <span class="insight-icon">${insight.icon}</span>
                <span class="insight-text">${insight.text}</span>
            `;
            insightsList.appendChild(insightElement);
        });
    }

    generateNewWallpaper() {
        const newWallpaper = this.generateDynamicWallpaper();
        this.applyWallpaper(newWallpaper);
        this.generateLearningInsights();
        
        console.log('🎨 Generated new AI wallpaper');
    }

    addWallpaperToGallery(wallpaper) {
        const wallpaperGrid = document.getElementById('wallpaper-grid');
        if (!wallpaperGrid) return;
        
        const wallpaperItem = document.createElement('div');
        wallpaperItem.className = 'wallpaper-item';
        wallpaperItem.innerHTML = `
            <div class="wallpaper-preview" style="background: ${this.generateGradientFromWallpaper(wallpaper)}"></div>
            <div class="wallpaper-info">
                <span class="wallpaper-name">AI Generated ${new Date().toLocaleTimeString()}</span>
                <span class="wallpaper-type">Dynamic</span>
            </div>
        `;
        
        wallpaperGrid.appendChild(wallpaperItem);
        
        // Keep only last 6 wallpapers
        while (wallpaperGrid.children.length > 6) {
            wallpaperGrid.removeChild(wallpaperGrid.firstChild);
        }
    }

    setPreset(presetName) {
        switch (presetName) {
            case 'minimal':
                this.setMinimalPreset();
                break;
            case 'balanced':
                this.setBalancedPreset();
                break;
            case 'maximal':
                this.setMaximalPreset();
                break;
            case 'adaptive':
                this.setAdaptivePreset();
                break;
        }
    }

    setMinimalPreset() {
        document.getElementById('dynamic-wallpaper').checked = false;
        document.getElementById('intelligent-arrangement').checked = false;
        document.getElementById('contextual-items').checked = false;
        document.getElementById('learning-system').checked = true;
        document.getElementById('personalization-strength').value = 30;
        document.getElementById('adaptation-speed').value = 30;
        document.getElementById('interface-complexity').value = 2;
        this.updateAllSettings();
    }

    setBalancedPreset() {
        document.getElementById('dynamic-wallpaper').checked = true;
        document.getElementById('intelligent-arrangement').checked = true;
        document.getElementById('contextual-items').checked = true;
        document.getElementById('learning-system').checked = true;
        document.getElementById('personalization-strength').value = 70;
        document.getElementById('adaptation-speed').value = 50;
        document.getElementById('interface-complexity').value = 5;
        this.updateAllSettings();
    }

    setMaximalPreset() {
        document.getElementById('dynamic-wallpaper').checked = true;
        document.getElementById('intelligent-arrangement').checked = true;
        document.getElementById('contextual-items').checked = true;
        document.getElementById('learning-system').checked = true;
        document.getElementById('personalization-strength').value = 100;
        document.getElementById('adaptation-speed').value = 90;
        document.getElementById('interface-complexity').value = 10;
        this.updateAllSettings();
    }

    setAdaptivePreset() {
        document.getElementById('dynamic-wallpaper').checked = true;
        document.getElementById('intelligent-arrangement').checked = true;
        document.getElementById('contextual-items').checked = true;
        document.getElementById('learning-system').checked = true;
        document.getElementById('personalization-strength').value = 50;
        document.getElementById('adaptation-speed').value = 70;
        document.getElementById('interface-complexity').value = 6;
        this.updateAllSettings();
    }

    updateAllSettings() {
        this.updateControlSetting('personalization-strength', document.getElementById('personalization-strength').value);
        this.updateControlSetting('adaptation-speed', document.getElementById('adaptation-speed').value);
        this.updateControlSetting('interface-complexity', document.getElementById('interface-complexity').value);
        this.updateFeatureSetting('dynamic-wallpaper', document.getElementById('dynamic-wallpaper').checked);
        this.updateFeatureSetting('intelligent-arrangement', document.getElementById('intelligent-arrangement').checked);
        this.updateFeatureSetting('contextual-items', document.getElementById('contextual-items').checked);
        this.updateFeatureSetting('learning-system', document.getElementById('learning-system').checked);
    }

    updateControlSetting(id, value) {
        const valueSpan = document.getElementById(id).nextElementSibling;
        if (valueSpan) {
            if (id === 'interface-complexity') {
                valueSpan.textContent = value;
            } else {
                valueSpan.textContent = value + '%';
            }
        }
        
        // Update internal settings
        switch (id) {
            case 'personalization-strength':
                this.personalizationStrength = value / 100;
                break;
            case 'adaptation-speed':
                this.adaptationLevel = value / 100;
                break;
            case 'interface-complexity':
                this.interfaceComplexity = parseInt(value);
                this.applyComplexityLevel();
                break;
        }
    }

    updateFeatureSetting(id, checked) {
        switch (id) {
            case 'dynamic-wallpaper':
                this.dynamicWallpaperEnabled = checked;
                break;
            case 'intelligent-arrangement':
                this.intelligentArrangementEnabled = checked;
                break;
            case 'contextual-items':
                this.contextualItemsEnabled = checked;
                break;
            case 'learning-system':
                this.learningEnabled = checked;
                break;
        }
    }

    applyComplexityLevel() {
        // Apply complexity level to preview desktop
        const previewDesktop = document.getElementById('preview-desktop');
        if (previewDesktop) {
            previewDesktop.style.setProperty('--complexity-level', this.interfaceComplexity);
        }
        
        // Notify other systems of complexity change
        if (typeof lucidityMeter !== 'undefined') {
            lucidityMeter.applyComplexityLevel(this.interfaceComplexity);
        }
    }

    applyPersonalization() {
        // Apply current personalization to the actual desktop
        if (this.currentWallpaper) {
            this.applyWallpaperToActualDesktop(this.currentWallpaper);
        }
        
        if (this.intelligentArrangementEnabled) {
            this.arrangeIconsOnActualDesktop();
        }
        
        if (this.contextualItemsEnabled) {
            this.updateContextualDesktopItems();
        }
        
        console.log('🎨 AI personalization applied');
    }

    applyWallpaperToActualDesktop(wallpaper) {
        const body = document.body;
        const gradient = this.generateGradientFromWallpaper(wallpaper);
        body.style.background = gradient;
        body.style.backgroundAttachment = 'fixed';
    }

    arrangeIconsOnActualDesktop() {
        // Arrange actual desktop icons based on user preferences
        const preferences = this.userProfile.visualPreferences || {};
        // Implementation would depend on actual desktop implementation
    }

    updateContextualDesktopItems() {
        // Add contextual items to desktop based on current state
        // Implementation would add relevant tools and shortcuts
    }

    resetProfile() {
        this.userProfile = {
            preferences: {},
            behaviorPatterns: {},
            aestheticPreferences: {},
            usageHistory: [],
            learningData: {}
        };
        
        this.interactionTracker = new InteractionTracker();
        this.visualInteractionHistory = [];
        this.applicationUsageHistory = [];
        this.colorInteractionHistory = [];
        this.focusHistory = [];
        
        this.updateProfileDisplays();
        this.generateInitialPersonalization();
        
        console.log('🧠 User profile reset for re-learning');
    }

    exportProfile() {
        const profileData = {
            userProfile: this.userProfile,
            currentWallpaper: this.currentWallpaper,
            currentTheme: this.currentTheme,
            settings: {
                personalizationStrength: this.personalizationStrength,
                adaptationLevel: this.adaptationLevel,
                interfaceComplexity: this.interfaceComplexity,
                learningEnabled: this.learningEnabled,
                dynamicWallpaperEnabled: this.dynamicWallpaperEnabled
            },
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-desktop-profile-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    saveUserProfile() {
        localStorage.setItem('ai-desktop-profile', JSON.stringify(this.userProfile));
    }

    loadUserProfile() {
        const saved = localStorage.getItem('ai-desktop-profile');
        if (saved) {
            try {
                this.userProfile = JSON.parse(saved);
                this.updateProfileDisplays();
            } catch (e) {
                console.warn('Failed to load user profile:', e);
            }
        }
    }

    show() {
        const panel = document.getElementById('ai-personalization-panel');
        if (panel) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.opacity = '1';
            }, 10);
        }
    }

    hide() {
        const panel = document.getElementById('ai-personalization-panel');
        if (panel) {
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }

    adaptComplexity(level) {
        // Method called by other systems to adapt personalization complexity
        this.interfaceComplexity = level;
        this.applyComplexityLevel();
    }
}

// Helper class for interaction tracking
class InteractionTracker {
    constructor() {
        this.interactions = [];
        this.startTime = Date.now();
    }
    
    addInteraction(type, data = {}) {
        this.interactions.push({
            type: type,
            data: data,
            timestamp: Date.now()
        });
        
        // Keep only recent interactions
        if (this.interactions.length > 1000) {
            this.interactions.shift();
        }
    }
    
    getActivitySince(timeThreshold) {
        return this.interactions.filter(i => i.timestamp >= timeThreshold);
    }
    
    getInteractionPattern(timeWindow = 60000) {
        const cutoff = Date.now() - timeWindow;
        return this.getActivitySince(cutoff);
    }
}

// Initialize AI Desktop Personalization
const aiPersonalization = new AIPoweredDesktopPersonalization();

// Add CSS styles
const aiStyles = `
<style>
.apd-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10003;
    background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
    border: 2px solid #7ed321;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
    width: 550px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    color: #e0e0e0;
}

.apd-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid #7ed321;
    border-radius: 13px 13px 0 0;
}

.apd-title {
    font-size: 18px;
    font-weight: bold;
    color: #7ed321;
}

.apd-status {
    background: #7ed321;
    color: #000;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
}

.apd-close {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: background 0.2s;
}

.apd-close:hover {
    background: rgba(255, 107, 107, 0.1);
}

.apd-display {
    padding: 20px;
}

.apd-user-profile {
    margin-bottom: 20px;
}

.profile-section {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
}

.profile-section h4 {
    color: #7ed321;
    margin-bottom: 10px;
    font-size: 14px;
}

.profile-stats {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.profile-stat {
    display: flex;
    align-items: center;
    gap: 10px;
}

.stat-label {
    min-width: 120px;
    font-size: 12px;
    color: #ccc;
}

.progress-bar {
    flex: 1;
    height: 8px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #7ed321, #f5a623);
    transition: width 0.3s ease;
}

.stat-value {
    min-width: 60px;
    text-align: right;
    font-size: 12px;
    color: #7ed321;
    font-weight: bold;
}

.behavior-patterns {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.pattern-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
}

.pattern-name {
    font-size: 12px;
    color: #ccc;
}

.pattern-value {
    font-size: 12px;
    color: #7ed321;
    font-weight: bold;
}

.apd-personalization-preview {
    margin-bottom: 20px;
}

.preview-header {
    color: #7ed321;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
}

.preview-canvas {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #7ed321;
}

.preview-desktop {
    width: 100%;
    height: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.preview-wallpaper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #7ed321 100%);
    transition: background 0.5s ease;
}

.preview-icons {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 20px;
    gap: 15px;
    position: relative;
    z-index: 2;
}

.preview-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s;
}

.preview-icon:hover {
    background: rgba(126, 211, 33, 0.3);
    transform: scale(1.1);
}

.preview-taskbar {
    height: 30px;
    background: rgba(0, 0, 0, 0.8);
    border-top: 1px solid #7ed321;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
    z-index: 2;
}

.preview-info {
    margin-top: 10px;
    text-align: center;
}

.preview-details {
    font-size: 12px;
    color: #ccc;
    font-style: italic;
}

.apd-learning-insights {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.apd-learning-insights h4 {
    color: #7ed321;
    margin-bottom: 10px;
    font-size: 14px;
}

.insights-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.insight-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    background: rgba(126, 211, 33, 0.1);
    border-radius: 6px;
    border-left: 3px solid #7ed321;
}

.insight-icon {
    font-size: 16px;
}

.insight-text {
    font-size: 12px;
    color: #e0e0e0;
}

.apd-controls {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.apd-control-group {
    margin-bottom: 15px;
}

.apd-control-group h4 {
    color: #7ed321;
    margin-bottom: 10px;
    font-size: 14px;
}

.apd-checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
}

.apd-checkbox input {
    margin-right: 8px;
}

.apd-slider {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
}

.apd-slider label {
    min-width: 120px;
    font-size: 12px;
}

.apd-slider input[type="range"] {
    flex: 1;
}

.apd-slider span {
    min-width: 40px;
    text-align: right;
    font-size: 12px;
    color: #7ed321;
}

.apd-presets {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.apd-preset-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #7ed321;
    color: #7ed321;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.apd-preset-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #7ed321;
}

.apd-wallpaper-gallery {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.apd-wallpaper-gallery h4 {
    color: #7ed321;
    margin-bottom: 10px;
    font-size: 14px;
}

.wallpaper-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
    margin-bottom: 15px;
}

.wallpaper-item {
    text-align: center;
}

.wallpaper-preview {
    width: 100%;
    height: 60px;
    border-radius: 6px;
    border: 1px solid #7ed321;
    margin-bottom: 5px;
    cursor: pointer;
    transition: transform 0.2s;
}

.wallpaper-preview:hover {
    transform: scale(1.05);
}

.wallpaper-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.wallpaper-name {
    font-size: 10px;
    color: #e0e0e0;
}

.wallpaper-type {
    font-size: 9px;
    color: #888;
}

.apd-action-btn {
    width: 100%;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #7ed321;
    color: #7ed321;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.apd-action-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #7ed321;
}

.apd-actions {
    display: flex;
    gap: 8px;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0 0 13px 13px;
}

@media (max-width: 600px) {
    .apd-container {
        width: 95vw;
    }
    
    .apd-presets {
        flex-wrap: wrap;
    }
    
    .apd-wallpaper-gallery {
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', aiStyles);