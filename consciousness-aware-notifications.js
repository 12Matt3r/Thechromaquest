// Consciousness-Aware Notifications - Smart system alerts based on awareness levels
// Notifications adapt to lucidity state with intelligent filtering and timing

class ConsciousnessAwareNotifications {
    constructor() {
        this.activeNotifications = [];
        this.notificationHistory = [];
        this.filterSettings = {
            basicLevel: 0.2,
            intermediateLevel: 0.4,
            advancedLevel: 0.6,
            expertLevel: 0.8,
            maxNotifications: 5,
            quietHours: false,
            sleepMode: false
        };
        this.sensitivity = 0.5;
        this.adaptiveFiltering = true;
        this.contextualAwareness = true;
        this.intelligence = 0.5;
        this.init();
    }

    init() {
        console.log('🔔 Consciousness-Aware Notifications initialized');
        this.createNotificationInterface();
        this.setupEventListeners();
        this.loadNotificationSettings();
        this.startIntelligentMonitoring();
    }

    createNotificationInterface() {
        const notificationPanel = document.createElement('div');
        notificationPanel.id = 'consciousness-notifications-panel';
        notificationPanel.innerHTML = `
            <div class="can-container">
                <div class="can-header">
                    <div class="can-title">🔔 Smart Notifications</div>
                    <div class="can-status" id="can-status">Active</div>
                    <div class="can-close" onclick="consciousnessNotifications.hide()">✕</div>
                </div>
                
                <div class="can-display">
                    <div class="can-current-level">
                        <div class="can-level-bar">
                            <div class="can-level-fill" id="can-level-fill" style="width: 50%"></div>
                            <div class="can-level-text" id="can-level-text">Normal</div>
                        </div>
                        <div class="can-filter-indicator" id="can-filter-indicator">
                            <span class="filter-status">Moderate Filtering</span>
                            <div class="filter-bar">
                                <div class="filter-fill" id="filter-fill" style="width: 50%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="can-active-notifications" id="can-active-notifications">
                        <div class="no-notifications">
                            <div class="no-notifications-icon">🔔</div>
                            <div class="no-notifications-text">No active notifications</div>
                            <div class="no-notifications-subtext">Smart filtering active</div>
                        </div>
                    </div>
                    
                    <div class="can-recent-history" id="can-recent-history">
                        <div class="history-header">Recent Notifications</div>
                        <div class="history-list" id="history-list">
                            <div class="history-item">
                                <span class="history-time">--:--</span>
                                <span class="history-type">No history yet</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="can-controls">
                    <div class="can-control-group">
                        <h4>Notification Levels</h4>
                        <div class="can-level-slider">
                            <label>Basic Alerts:</label>
                            <input type="range" id="basic-level" min="0" max="100" value="20">
                            <span>20%</span>
                        </div>
                        <div class="can-level-slider">
                            <label>Intermediate:</label>
                            <input type="range" id="intermediate-level" min="0" max="100" value="40">
                            <span>40%</span>
                        </div>
                        <div class="can-level-slider">
                            <label>Advanced:</label>
                            <input type="range" id="advanced-level" min="0" max="100" value="60">
                            <span>60%</span>
                        </div>
                        <div class="can-level-slider">
                            <label>Expert Only:</label>
                            <input type="range" id="expert-level" min="0" max="100" value="80">
                            <span>80%</span>
                        </div>
                    </div>
                    
                    <div class="can-control-group">
                        <h4>Smart Features</h4>
                        <label class="can-checkbox">
                            <input type="checkbox" id="adaptive-filtering" checked>
                            <span>Adaptive filtering</span>
                        </label>
                        <label class="can-checkbox">
                            <input type="checkbox" id="contextual-awareness" checked>
                            <span>Contextual awareness</span>
                        </label>
                        <label class="can-checkbox">
                            <input type="checkbox" id="quiet-hours">
                            <span>Quiet hours</span>
                        </label>
                        <label class="can-checkbox">
                            <input type="checkbox" id="sleep-mode">
                            <span>Sleep mode</span>
                        </label>
                        <div class="can-slider">
                            <label>Sensitivity:</label>
                            <input type="range" id="sensitivity" min="10" max="100" value="50">
                            <span>50%</span>
                        </div>
                        <div class="can-slider">
                            <label>Intelligence:</label>
                            <input type="range" id="intelligence" min="10" max="100" value="50">
                            <span>50%</span>
                        </div>
                    </div>
                    
                    <div class="can-presets">
                        <button class="can-preset-btn" onclick="consciousnessNotifications.setPreset('minimal')">Minimal</button>
                        <button class="can-preset-btn" onclick="consciousnessNotifications.setPreset('balanced')">Balanced</button>
                        <button class="can-preset-btn" onclick="consciousnessNotifications.setPreset('comprehensive')">Comprehensive</button>
                        <button class="can-preset-btn" onclick="consciousnessNotifications.setPreset('expert')">Expert</button>
                    </div>
                </div>
                
                <div class="can-metrics">
                    <div class="can-metric">
                        <span class="metric-label">Today's Notifications:</span>
                        <span class="metric-value" id="daily-count">0</span>
                    </div>
                    <div class="can-metric">
                        <span class="metric-label">Filtered Out:</span>
                        <span class="metric-value" id="filtered-count">0</span>
                    </div>
                    <div class="can-metric">
                        <span class="metric-label">Effectiveness:</span>
                        <span class="metric-value" id="effectiveness">--</span>
                    </div>
                </div>
                
                <div class="can-actions">
                    <button class="can-action-btn" onclick="consciousnessNotifications.clearAll()">Clear All</button>
                    <button class="can-action-btn" onclick="consciousnessNotifications.exportSettings()">Export</button>
                    <button class="can-action-btn" onclick="consciousnessNotifications.testNotification()">Test Alert</button>
                </div>
            </div>
        `;
        document.body.appendChild(notificationPanel);
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Level sliders
        const levelSliders = ['basic-level', 'intermediate-level', 'advanced-level', 'expert-level'];
        levelSliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                slider.addEventListener('input', (e) => {
                    this.updateNotificationLevels();
                    e.target.nextElementSibling.textContent = `${e.target.value}%`;
                });
            }
        });
        
        // Feature toggles
        const toggles = ['adaptive-filtering', 'contextual-awareness', 'quiet-hours', 'sleep-mode'];
        toggles.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.updateFeatureSettings();
                });
            }
        });
        
        // Sensitivity and intelligence sliders
        const sliders = ['sensitivity', 'intelligence'];
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                slider.addEventListener('input', (e) => {
                    this.updateSmartSettings();
                    e.target.nextElementSibling.textContent = `${e.target.value}%`;
                });
            }
        });
    }

    startIntelligentMonitoring() {
        // Monitor for consciousness-related events that should trigger notifications
        setInterval(() => {
            this.analyzeConsciousnessEvents();
        }, 2000);
        
        // Monitor Cortana interactions for important information
        if (typeof cortanaDream !== 'undefined') {
            this.monitorCortanaInteractions();
        }
        
        // Monitor quantum file system events
        if (typeof quantumFS !== 'undefined') {
            this.monitorQuantumEvents();
        }
        
        // Monitor synchronicity patterns
        if (typeof synchronicityEngine !== 'undefined') {
            this.monitorSynchronicityEvents();
        }
        
        // Monitor game events
        if (typeof lucidityMeter !== 'undefined') {
            this.monitorLucidityChanges();
        }
    }

    analyzeConsciousnessEvents() {
        const currentLucidity = this.getCurrentLucidity();
        const recentEvents = this.getRecentConsciousnessEvents();
        
        recentEvents.forEach(event => {
            const notification = this.evaluateEventForNotification(event, currentLucidity);
            if (notification) {
                this.queueNotification(notification);
            }
        });
    }

    getCurrentLucidity() {
        if (typeof lucidityMeter !== 'undefined') {
            return lucidityMeter.currentLucidity;
        }
        return 0.5; // Default normal state
    }

    getRecentConsciousnessEvents() {
        // Gather events from various systems
        const events = [];
        
        // Check for Cortana responses that might be important
        if (typeof cortanaDream !== 'undefined' && cortanaDream.conversationHistory) {
            const recent = cortanaDream.conversationHistory.filter(c => 
                Date.now() - c.timestamp < 30000 // Last 30 seconds
            );
            recent.forEach(conv => {
                if (conv.type === 'cortana') {
                    events.push({
                        type: 'cortana-insight',
                        data: conv.response,
                        timestamp: conv.timestamp,
                        importance: this.calculateConversationImportance(conv.response)
                    });
                }
            });
        }
        
        // Check for quantum state changes
        if (typeof quantumFS !== 'undefined' && quantumFS.quantumFiles) {
            quantumFS.quantumFiles.forEach(file => {
                if (file.lastAccess && Date.now() - file.lastAccess < 10000) {
                    events.push({
                        type: 'quantum-access',
                        data: file,
                        timestamp: file.lastAccess,
                        importance: 0.7
                    });
                }
            });
        }
        
        // Check for synchronicity patterns
        if (typeof synchronicityEngine !== 'undefined') {
            const recentPatterns = synchronicityEngine.detectedPatterns?.filter(p =>
                Date.now() - p.timestamp < 60000 // Last minute
            ) || [];
            
            recentPatterns.forEach(pattern => {
                events.push({
                    type: 'synchronicity-pattern',
                    data: pattern,
                    timestamp: pattern.timestamp,
                    importance: 0.8
                });
            });
        }
        
        // Check for user interaction patterns that suggest awareness
        const userActivity = this.analyzeUserAwareness();
        if (userActivity.level > 0.6) {
            events.push({
                type: 'user-awareness-peak',
                data: userActivity,
                timestamp: Date.now(),
                importance: userActivity.level
            });
        }
        
        return events;
    }

    calculateConversationImportance(response) {
        // Analyze Cortana responses for importance indicators
        let importance = 0.3; // Base importance
        
        // Keywords that suggest important insights
        const importantKeywords = [
            'anomaly', 'pattern', 'lucid', 'consciousness', 'important',
            'significant', 'warning', 'attention', 'notice', 'discover'
        ];
        
        const responseLower = response.toLowerCase();
        importantKeywords.forEach(keyword => {
            if (responseLower.includes(keyword)) {
                importance += 0.1;
            }
        });
        
        // Longer responses might contain more important information
        if (response.length > 200) importance += 0.1;
        
        return Math.min(importance, 1.0);
    }

    analyzeUserAwareness() {
        // Analyze current user interaction patterns for awareness level
        const now = Date.now();
        const recentInteractions = this.getRecentInteractions(now - 10000); // Last 10 seconds
        
        if (recentInteractions.length === 0) {
            return { level: 0.2, reasons: ['no recent activity'] };
        }
        
        let awarenessLevel = 0.3;
        const reasons = [];
        
        // High interaction frequency suggests engagement
        const interactionRate = recentInteractions.length / 10; // per second
        if (interactionRate > 2) {
            awarenessLevel += 0.2;
            reasons.push('high interaction rate');
        }
        
        // Diverse interaction types suggest conscious awareness
        const interactionTypes = new Set(recentInteractions.map(i => i.type));
        if (interactionTypes.size > 2) {
            awarenessLevel += 0.15;
            reasons.push('diverse interactions');
        }
        
        // Rapid switching between activities suggests lucid state
        const rapidSwitching = this.detectRapidSwitching(recentInteractions);
        if (rapidSwitching) {
            awarenessLevel += 0.2;
            reasons.push('rapid activity switching');
        }
        
        // Complex mouse movements suggest conscious control
        const complexMovements = this.detectComplexMovements(recentInteractions);
        if (complexMovements) {
            awarenessLevel += 0.15;
            reasons.push('complex movements');
        }
        
        return { level: Math.min(awarenessLevel, 1.0), reasons };
    }

    getRecentInteractions(timeRange) {
        // Get user interactions within time range
        // This would integrate with other tracking systems
        return window.recentInteractions || [];
    }

    detectRapidSwitching(interactions) {
        // Detect if user is rapidly switching between different types of activities
        if (interactions.length < 4) return false;
        
        const typeSequence = interactions.slice(-4).map(i => i.type);
        const uniqueTypes = new Set(typeSequence);
        
        // If using more than 2 different types in sequence, suggests rapid switching
        return uniqueTypes.size > 2;
    }

    detectComplexMovements(interactions) {
        // Detect if mouse movements are complex and purposeful
        const mouseEvents = interactions.filter(i => i.type === 'mousemove');
        if (mouseEvents.length < 10) return false;
        
        // Calculate movement complexity
        let totalDistance = 0;
        for (let i = 1; i < mouseEvents.length; i++) {
            const dx = mouseEvents[i].x - mouseEvents[i-1].x;
            const dy = mouseEvents[i].y - mouseEvents[i-1].y;
            totalDistance += Math.sqrt(dx * dx + dy * dy);
        }
        
        // High movement complexity suggests conscious control
        return totalDistance > 500;
    }

    monitorCortanaInteractions() {
        // Override Cortana's message processing to detect important insights
        if (this._originalCortanaProcess) return; // Already monitoring
        
        this._originalCortanaProcess = cortanaDream.addCortanaResponse?.bind(cortanaDream);
        if (this._originalCortanaProcess) {
            cortanaDream.addCortanaResponse = (response) => {
                this._originalCortanaProcess(response);
                this.handleCortanaInsight(response);
            };
        }
    }

    handleCortanaInsight(response) {
        const importance = this.calculateConversationImportance(response);
        
        if (importance > 0.6) {
            this.queueNotification({
                title: '💡 AI Insight',
                message: response.substring(0, 100) + (response.length > 100 ? '...' : ''),
                type: 'insight',
                priority: this.mapImportanceToPriority(importance),
                source: 'cortana',
                timestamp: Date.now()
            });
        }
    }

    monitorQuantumEvents() {
        // Monitor quantum file system for important state changes
        this._originalQuantumCreate = quantumFS.createFile?.bind(quantumFS);
        if (this._originalQuantumCreate) {
            quantumFS.createFile = (name) => {
                const result = this._originalQuantumCreate(name);
                this.queueNotification({
                    title: '⚛️ Quantum File Created',
                    message: `New quantum file: ${name || 'Unnamed'}`,
                    type: 'quantum',
                    priority: 'medium',
                    source: 'quantum-fs',
                    timestamp: Date.now()
                });
                return result;
            };
        }
    }

    monitorSynchronicityEvents() {
        // Monitor synchronicity engine for pattern detections
        this._originalSynchronicityProcess = synchronicityEngine.detectPatterns?.bind(synchronicityEngine);
        if (this._originalSynchronicityProcess) {
            synchronicityEngine.detectPatterns = () => {
                const result = this._originalSynchronicityProcess();
                this.queueNotification({
                    title: '🌟 Synchronicity Detected',
                    message: 'Meaningful patterns discovered in your activity',
                    type: 'synchronicity',
                    priority: 'high',
                    source: 'synchronicity',
                    timestamp: Date.now()
                });
                return result;
            };
        }
    }

    monitorLucidityChanges() {
        // Monitor lucidity meter for significant changes
        this._originalLucidityUpdate = lucidityMeter.calculateLucidityLevel?.bind(lucidityMeter);
        if (this._originalLucidityUpdate) {
            lucidityMeter.calculateLucidityLevel = () => {
                const oldLevel = lucidityMeter.currentLucidity;
                const result = this._originalLucidityUpdate();
                const newLevel = lucidityMeter.currentLucidity;
                
                const change = Math.abs(newLevel - oldLevel);
                if (change > 0.2) { // Significant change
                    this.queueNotification({
                        title: '🧠 Lucidity Shift',
                        message: `Consciousness level ${newLevel > oldLevel ? 'increased' : 'decreased'} to ${Math.round(newLevel * 100)}%`,
                        type: 'lucidity',
                        priority: newLevel > oldLevel ? 'high' : 'medium',
                        source: 'lucidity-meter',
                        timestamp: Date.now()
                    });
                }
                
                return result;
            };
        }
    }

    evaluateEventForNotification(event, currentLucidity) {
        // Determine if event warrants a notification based on consciousness level
        const requiredLevel = this.getRequiredNotificationLevel(event);
        
        if (currentLucidity < requiredLevel) {
            // Event too advanced for current awareness level - filter out
            this.recordFilteredNotification(event);
            return null;
        }
        
        // Check for quiet hours
        if (this.filterSettings.quietHours && this.isQuietHours()) {
            return null;
        }
        
        // Check for sleep mode
        if (this.filterSettings.sleepMode && this.isSleepMode()) {
            return null;
        }
        
        // Use AI-like filtering based on contextual awareness
        if (this.adaptiveFiltering) {
            const shouldNotify = this.shouldNotifyBasedOnContext(event, currentLucidity);
            if (!shouldNotify) {
                this.recordFilteredNotification(event);
                return null;
            }
        }
        
        // Create appropriate notification
        return this.createNotificationFromEvent(event, currentLucidity);
    }

    getRequiredNotificationLevel(event) {
        // Map event types to required consciousness levels
        const levelMap = {
            'cortana-insight': this.filterSettings.intermediateLevel,
            'quantum-access': this.filterSettings.advancedLevel,
            'synchronicity-pattern': this.filterSettings.advancedLevel,
            'user-awareness-peak': this.filterSettings.expertLevel,
            'anomaly-detection': this.filterSettings.basicLevel,
            'system-update': this.filterSettings.intermediateLevel
        };
        
        return levelMap[event.type] || this.filterSettings.basicLevel;
    }

    shouldNotifyBasedOnContext(event, currentLucidity) {
        // AI-like contextual filtering
        const timeOfDay = new Date().getHours();
        const userActivity = this.getCurrentUserActivity();
        
        // Lower threshold during active hours
        if (timeOfDay >= 9 && timeOfDay <= 21) {
            return true;
        }
        
        // Higher threshold during quiet hours
        if (timeOfDay >= 22 || timeOfDay <= 6) {
            return event.importance > 0.7;
        }
        
        // Consider user activity level
        if (userActivity.level < 0.3) {
            return event.importance > 0.6;
        }
        
        // Check recent notification density
        const recentCount = this.activeNotifications.length;
        if (recentCount >= this.filterSettings.maxNotifications) {
            return event.importance > 0.8;
        }
        
        return true;
    }

    getCurrentUserActivity() {
        // Get current user activity level for contextual decisions
        const interactions = this.getRecentInteractions(Date.now() - 60000); // Last minute
        const activityScore = Math.min(interactions.length / 60, 1.0); // Normalize to 0-1
        
        return {
            level: activityScore,
            interactions: interactions.length,
            types: new Set(interactions.map(i => i.type))
        };
    }

    isQuietHours() {
        const now = new Date();
        const hour = now.getHours();
        // Quiet hours: 10 PM to 8 AM
        return hour >= 22 || hour <= 8;
    }

    isSleepMode() {
        // Check if user appears to be inactive (sleeping)
        const lastActivity = window.lastUserActivity || 0;
        const timeSinceActivity = Date.now() - lastActivity;
        return timeSinceActivity > 1800000; // 30 minutes of inactivity
    }

    createNotificationFromEvent(event, currentLucidity) {
        const notificationTypes = {
            'cortana-insight': {
                title: '💡 AI Insight',
                icon: '🤖',
                priority: 'medium'
            },
            'quantum-access': {
                title: '⚛️ Quantum Activity',
                icon: '⚛️',
                priority: 'medium'
            },
            'synchronicity-pattern': {
                title: '🌟 Pattern Detected',
                icon: '🌟',
                priority: 'high'
            },
            'user-awareness-peak': {
                title: '🧠 Awareness Peak',
                icon: '🧠',
                priority: 'medium'
            }
        };
        
        const typeConfig = notificationTypes[event.type] || {
            title: '📢 System Alert',
            icon: '📢',
            priority: 'low'
        };
        
        return {
            id: `can_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: typeConfig.title,
            message: this.formatEventMessage(event),
            type: event.type,
            priority: this.mapImportanceToPriority(event.importance),
            icon: typeConfig.icon,
            source: event.type,
            timestamp: event.timestamp,
            lucidityLevel: currentLucidity
        };
    }

    formatEventMessage(event) {
        switch (event.type) {
            case 'cortana-insight':
                const response = event.data.substring(0, 80);
                return response + (event.data.length > 80 ? '...' : '');
            case 'quantum-access':
                return `Accessed quantum file with ${event.data.states?.length || 0} probability states`;
            case 'synchronicity-pattern':
                return `Detected ${event.data.patterns?.length || 0} meaningful patterns`;
            case 'user-awareness-peak':
                return `High awareness detected: ${event.data.reasons?.join(', ') || 'activity spike'}`;
            default:
                return 'Consciousness-related event detected';
        }
    }

    mapImportanceToPriority(importance) {
        if (importance >= 0.8) return 'urgent';
        if (importance >= 0.6) return 'high';
        if (importance >= 0.4) return 'medium';
        return 'low';
    }

    queueNotification(notification) {
        // Check if we already have a similar notification
        const similarExists = this.activeNotifications.some(n => 
            n.type === notification.type && 
            Date.now() - n.timestamp < 30000 // Within 30 seconds
        );
        
        if (similarExists) {
            this.recordFilteredNotification(notification);
            return;
        }
        
        // Add to active notifications
        this.activeNotifications.push(notification);
        
        // Remove oldest if we have too many
        if (this.activeNotifications.length > this.filterSettings.maxNotifications) {
            const removed = this.activeNotifications.shift();
            this.recordFilteredNotification(removed, true);
        }
        
        // Display the notification
        this.displayNotification(notification);
        
        // Update history
        this.notificationHistory.push(notification);
        if (this.notificationHistory.length > 100) {
            this.notificationHistory.shift();
        }
        
        // Update metrics
        this.updateMetrics();
        
        // Auto-remove after some time
        setTimeout(() => {
            this.removeNotification(notification.id);
        }, this.getNotificationTimeout(notification));
    }

    displayNotification(notification) {
        // Create visual notification
        const notificationDiv = document.createElement('div');
        notificationDiv.className = `can-notification can-priority-${notification.priority}`;
        notificationDiv.id = `notification-${notification.id}`;
        notificationDiv.innerHTML = `
            <div class="can-notification-header">
                <div class="can-notification-icon">${notification.icon}</div>
                <div class="can-notification-title">${notification.title}</div>
                <div class="can-notification-close" onclick="consciousnessNotifications.removeNotification('${notification.id}')">×</div>
            </div>
            <div class="can-notification-message">${notification.message}</div>
            <div class="can-notification-footer">
                <span class="can-notification-time">${this.formatTime(notification.timestamp)}</span>
                <span class="can-notification-source">${notification.source}</span>
            </div>
        `;
        
        // Add to DOM
        const activeContainer = document.getElementById('can-active-notifications');
        if (activeContainer) {
            activeContainer.appendChild(notificationDiv);
            this.updateNotificationContainer();
        }
        
        // Add sound if enabled
        this.playNotificationSound(notification.priority);
        
        // Animate in
        setTimeout(() => {
            notificationDiv.classList.add('can-visible');
        }, 50);
    }

    updateNotificationContainer() {
        const activeContainer = document.getElementById('can-active-notifications');
        if (!activeContainer) return;
        
        if (this.activeNotifications.length === 0) {
            activeContainer.innerHTML = `
                <div class="no-notifications">
                    <div class="no-notifications-icon">🔔</div>
                    <div class="no-notifications-text">No active notifications</div>
                    <div class="no-notifications-subtext">Smart filtering active</div>
                </div>
            `;
        } else {
            // Clear and re-render all notifications
            activeContainer.innerHTML = '';
            this.activeNotifications.forEach(notification => {
                const notificationDiv = document.createElement('div');
                notificationDiv.className = `can-notification can-priority-${notification.priority}`;
                notificationDiv.id = `notification-${notification.id}`;
                notificationDiv.innerHTML = `
                    <div class="can-notification-header">
                        <div class="can-notification-icon">${notification.icon}</div>
                        <div class="can-notification-title">${notification.title}</div>
                        <div class="can-notification-close" onclick="consciousnessNotifications.removeNotification('${notification.id}')">×</div>
                    </div>
                    <div class="can-notification-message">${notification.message}</div>
                    <div class="can-notification-footer">
                        <span class="can-notification-time">${this.formatTime(notification.timestamp)}</span>
                        <span class="can-notification-source">${notification.source}</span>
                    </div>
                `;
                activeContainer.appendChild(notificationDiv);
            });
        }
    }

    getNotificationTimeout(notification) {
        const timeouts = {
            urgent: 30000,    // 30 seconds
            high: 20000,      // 20 seconds
            medium: 15000,    // 15 seconds
            low: 10000        // 10 seconds
        };
        
        return timeouts[notification.priority] || 15000;
    }

    playNotificationSound(priority) {
        // Create different tones for different priorities
        if (!document.getElementById('notification-sounds-enabled')?.checked) {
            return;
        }
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        const frequencies = {
            urgent: 800,
            high: 600,
            medium: 400,
            low: 200
        };
        
        oscillator.frequency.setValueAtTime(frequencies[priority] || 400, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    removeNotification(notificationId) {
        // Remove from active notifications
        this.activeNotifications = this.activeNotifications.filter(n => n.id !== notificationId);
        
        // Remove from DOM
        const notificationElement = document.getElementById(`notification-${notificationId}`);
        if (notificationElement) {
            notificationElement.classList.add('can-removing');
            setTimeout(() => {
                notificationElement.remove();
                this.updateNotificationContainer();
            }, 300);
        }
        
        // Update interface
        this.updateDisplays();
    }

    recordFilteredNotification(event, forceFiltered = false) {
        // Track filtered notifications for learning
        this.filteredCount = (this.filteredCount || 0) + 1;
        this.lastFilteredEvent = event;
        
        // Use filtered data to improve AI-like filtering
        if (this.adaptiveFiltering && !forceFiltered) {
            this.adjustFilteringBasedOnEvent(event);
        }
    }

    adjustFilteringBasedOnEvent(event) {
        // Learn from filtered events to improve future filtering
        const importance = event.importance || 0.5;
        const shouldHaveShown = importance > 0.7;
        
        if (shouldHaveShown) {
            // Event was important but filtered - lower thresholds slightly
            this.filterSettings.basicLevel = Math.max(0.1, this.filterSettings.basicLevel - 0.05);
            this.filterSettings.intermediateLevel = Math.max(0.2, this.filterSettings.intermediateLevel - 0.05);
        }
    }

    updateMetrics() {
        const today = new Date().toDateString();
        const todayNotifications = this.notificationHistory.filter(n => 
            new Date(n.timestamp).toDateString() === today
        );
        
        document.getElementById('daily-count').textContent = todayNotifications.length;
        document.getElementById('filtered-count').textContent = this.filteredCount || 0;
        
        // Calculate effectiveness
        const totalShown = todayNotifications.length;
        const totalFiltered = this.filteredCount || 0;
        const effectiveness = totalShown > 0 ? Math.round((totalShown / (totalShown + totalFiltered)) * 100) : 0;
        document.getElementById('effectiveness').textContent = `${effectiveness}%`;
    }

    updateDisplays() {
        const lucidity = this.getCurrentLucidity();
        
        // Update level indicator
        const levelFill = document.getElementById('can-level-fill');
        const levelText = document.getElementById('can-level-text');
        
        if (levelFill) {
            levelFill.style.width = `${lucidity * 100}%`;
            levelFill.style.background = this.getLucidityGradient(lucidity);
        }
        
        if (levelText) {
            levelText.textContent = this.getLucidityLabel(lucidity);
        }
        
        // Update filter indicator
        const filterFill = document.getElementById('filter-fill');
        const filterStatus = document.querySelector('.filter-status');
        
        if (filterFill) {
            const filterStrength = this.calculateFilterStrength();
            filterFill.style.width = `${filterStrength * 100}%`;
        }
        
        if (filterStatus) {
            filterStatus.textContent = this.getFilterStatusText();
        }
    }

    getLucidityGradient(lucidity) {
        const colors = [
            { pos: 0, color: '#888888' },
            { pos: 0.2, color: '#4a90e2' },
            { pos: 0.4, color: '#7ed321' },
            { pos: 0.7, color: '#f5a623' },
            { pos: 1, color: '#e91e63' }
        ];
        
        const gradient = colors.map(c => `${c.color} ${c.pos * 100}%`).join(', ');
        return `linear-gradient(90deg, ${gradient})`;
    }

    getLucidityLabel(lucidity) {
        if (lucidity < 0.2) return 'Normal';
        if (lucidity < 0.4) return 'Aware';
        if (lucidity < 0.7) return 'Lucid';
        return 'Transcendent';
    }

    calculateFilterStrength() {
        const currentLucidity = this.getCurrentLucidity();
        const maxLevel = Math.max(
            this.filterSettings.basicLevel,
            this.filterSettings.intermediateLevel,
            this.filterSettings.advancedLevel,
            this.filterSettings.expertLevel
        );
        
        return Math.min(currentLucidity / maxLevel, 1.0);
    }

    getFilterStatusText() {
        const filterStrength = this.calculateFilterStrength();
        if (filterStrength > 0.8) return 'Minimal Filtering';
        if (filterStrength > 0.6) return 'Light Filtering';
        if (filterStrength > 0.4) return 'Moderate Filtering';
        if (filterStrength > 0.2) return 'Heavy Filtering';
        return 'Maximum Filtering';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    updateNotificationLevels() {
        this.filterSettings.basicLevel = parseInt(document.getElementById('basic-level').value) / 100;
        this.filterSettings.intermediateLevel = parseInt(document.getElementById('intermediate-level').value) / 100;
        this.filterSettings.advancedLevel = parseInt(document.getElementById('advanced-level').value) / 100;
        this.filterSettings.expertLevel = parseInt(document.getElementById('expert-level').value) / 100;
        
        this.saveNotificationSettings();
    }

    updateFeatureSettings() {
        this.adaptiveFiltering = document.getElementById('adaptive-filtering').checked;
        this.contextualAwareness = document.getElementById('contextual-awareness').checked;
        this.filterSettings.quietHours = document.getElementById('quiet-hours').checked;
        this.filterSettings.sleepMode = document.getElementById('sleep-mode').checked;
        
        this.saveNotificationSettings();
    }

    updateSmartSettings() {
        this.sensitivity = parseInt(document.getElementById('sensitivity').value) / 100;
        this.intelligence = parseInt(document.getElementById('intelligence').value) / 100;
        
        this.saveNotificationSettings();
    }

    setPreset(presetName) {
        switch (presetName) {
            case 'minimal':
                this.setMinimalPreset();
                break;
            case 'balanced':
                this.setBalancedPreset();
                break;
            case 'comprehensive':
                this.setComprehensivePreset();
                break;
            case 'expert':
                this.setExpertPreset();
                break;
        }
        
        this.updateDisplays();
        this.saveNotificationSettings();
    }

    setMinimalPreset() {
        document.getElementById('basic-level').value = 10;
        document.getElementById('intermediate-level').value = 30;
        document.getElementById('advanced-level').value = 50;
        document.getElementById('expert-level').value = 70;
        document.getElementById('adaptive-filtering').checked = true;
        document.getElementById('contextual-awareness').checked = false;
        document.getElementById('quiet-hours').checked = true;
        document.getElementById('sleep-mode').checked = true;
        document.getElementById('sensitivity').value = 30;
        document.getElementById('intelligence').value = 30;
        this.updateNotificationLevels();
        this.updateFeatureSettings();
        this.updateSmartSettings();
    }

    setBalancedPreset() {
        document.getElementById('basic-level').value = 20;
        document.getElementById('intermediate-level').value = 40;
        document.getElementById('advanced-level').value = 60;
        document.getElementById('expert-level').value = 80;
        document.getElementById('adaptive-filtering').checked = true;
        document.getElementById('contextual-awareness').checked = true;
        document.getElementById('quiet-hours').checked = false;
        document.getElementById('sleep-mode').checked = false;
        document.getElementById('sensitivity').value = 50;
        document.getElementById('intelligence').value = 50;
        this.updateNotificationLevels();
        this.updateFeatureSettings();
        this.updateSmartSettings();
    }

    setComprehensivePreset() {
        document.getElementById('basic-level').value = 30;
        document.getElementById('intermediate-level').value = 50;
        document.getElementById('advanced-level').value = 70;
        document.getElementById('expert-level').value = 90;
        document.getElementById('adaptive-filtering').checked = true;
        document.getElementById('contextual-awareness').checked = true;
        document.getElementById('quiet-hours').checked = false;
        document.getElementById('sleep-mode').checked = false;
        document.getElementById('sensitivity').value = 70;
        document.getElementById('intelligence').value = 70;
        this.updateNotificationLevels();
        this.updateFeatureSettings();
        this.updateSmartSettings();
    }

    setExpertPreset() {
        document.getElementById('basic-level').value = 40;
        document.getElementById('intermediate-level').value = 60;
        document.getElementById('advanced-level').value = 80;
        document.getElementById('expert-level').value = 100;
        document.getElementById('adaptive-filtering').checked = true;
        document.getElementById('contextual-awareness').checked = true;
        document.getElementById('quiet-hours').checked = false;
        document.getElementById('sleep-mode').checked = false;
        document.getElementById('sensitivity').value = 90;
        document.getElementById('intelligence').value = 90;
        this.updateNotificationLevels();
        this.updateFeatureSettings();
        this.updateSmartSettings();
    }

    clearAll() {
        this.activeNotifications.forEach(notification => {
            this.removeNotification(notification.id);
        });
    }

    testNotification() {
        this.queueNotification({
            title: '🧪 Test Notification',
            message: 'This is a test of the consciousness-aware notification system',
            type: 'test',
            priority: 'medium',
            source: 'test',
            timestamp: Date.now()
        });
    }

    exportSettings() {
        const settings = {
            filterSettings: this.filterSettings,
            sensitivity: this.sensitivity,
            intelligence: this.intelligence,
            adaptiveFiltering: this.adaptiveFiltering,
            contextualAwareness: this.contextualAwareness,
            notificationHistory: this.notificationHistory.slice(-50),
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `consciousness-notifications-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    saveNotificationSettings() {
        const settings = {
            filterSettings: this.filterSettings,
            sensitivity: this.sensitivity,
            intelligence: this.intelligence,
            adaptiveFiltering: this.adaptiveFiltering,
            contextualAwareness: this.contextualAwareness
        };
        localStorage.setItem('consciousness-notifications-settings', JSON.stringify(settings));
    }

    loadNotificationSettings() {
        const saved = localStorage.getItem('consciousness-notifications-settings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                Object.assign(this, settings);
                this.filterSettings = { ...this.filterSettings, ...settings.filterSettings };
                
                // Update UI with loaded settings
                document.getElementById('basic-level').value = this.filterSettings.basicLevel * 100;
                document.getElementById('intermediate-level').value = this.filterSettings.intermediateLevel * 100;
                document.getElementById('advanced-level').value = this.filterSettings.advancedLevel * 100;
                document.getElementById('expert-level').value = this.filterSettings.expertLevel * 100;
                document.getElementById('adaptive-filtering').checked = this.adaptiveFiltering;
                document.getElementById('contextual-awareness').checked = this.contextualAwareness;
                document.getElementById('sensitivity').value = this.sensitivity * 100;
                document.getElementById('intelligence').value = this.intelligence * 100;
            } catch (e) {
                console.warn('Failed to load notification settings:', e);
            }
        }
    }

    show() {
        const panel = document.getElementById('consciousness-notifications-panel');
        if (panel) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.opacity = '1';
            }, 10);
        }
    }

    hide() {
        const panel = document.getElementById('consciousness-notifications-panel');
        if (panel) {
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }

    adaptComplexity(level) {
        // Method for other systems to adapt notification complexity
        const complexityMap = {
            1: 'minimal',
            2: 'basic',
            3: 'standard',
            4: 'detailed',
            5: 'comprehensive'
        };
        
        const detailLevel = complexityMap[level] || 'standard';
        // Apply complexity settings to notification display
    }
}

// Initialize Consciousness-Aware Notifications
const consciousnessNotifications = new ConsciousnessAwareNotifications();

// Add CSS styles
const consciousnessStyles = `
<style>
.can-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10002;
    background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
    border: 2px solid #4a90e2;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
    width: 480px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    color: #e0e0e0;
}

.can-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid #4a90e2;
    border-radius: 13px 13px 0 0;
}

.can-title {
    font-size: 18px;
    font-weight: bold;
    color: #4a90e2;
}

.can-status {
    background: #4a90e2;
    color: #fff;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
}

.can-close {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: background 0.2s;
}

.can-close:hover {
    background: rgba(255, 107, 107, 0.1);
}

.can-display {
    padding: 20px;
}

.can-current-level {
    margin-bottom: 20px;
}

.can-level-bar {
    position: relative;
    width: 100%;
    height: 30px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #4a90e2;
    border-radius: 15px;
    margin-bottom: 10px;
    overflow: hidden;
}

.can-level-fill {
    height: 100%;
    background: linear-gradient(90deg, #888888 0%, #4a90e2 20%, #7ed321 40%, #f5a623 70%, #e91e63 100%);
    border-radius: 14px;
    transition: width 0.5s ease;
}

.can-level-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 14px;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.can-filter-indicator {
    text-align: center;
}

.filter-status {
    display: block;
    font-size: 12px;
    color: #ccc;
    margin-bottom: 5px;
}

.filter-bar {
    width: 100%;
    height: 8px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    overflow: hidden;
}

.filter-fill {
    height: 100%;
    background: linear-gradient(90deg, #7ed321, #f5a623, #e91e63);
    transition: width 0.3s ease;
}

.can-active-notifications {
    min-height: 200px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
}

.no-notifications {
    text-align: center;
    padding: 40px 20px;
    color: #666;
}

.no-notifications-icon {
    font-size: 48px;
    margin-bottom: 10px;
    opacity: 0.5;
}

.no-notifications-text {
    font-size: 16px;
    margin-bottom: 5px;
}

.no-notifications-subtext {
    font-size: 12px;
    opacity: 0.7;
}

.can-notification {
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid #555;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 12px;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
    position: relative;
}

.can-notification.can-visible {
    transform: translateX(0);
    opacity: 1;
}

.can-notification.can-removing {
    transform: translateX(100%);
    opacity: 0;
}

.can-notification.can-priority-urgent {
    border-color: #e91e63;
    border-left: 4px solid #e91e63;
}

.can-notification.can-priority-high {
    border-color: #f5a623;
    border-left: 4px solid #f5a623;
}

.can-notification.can-priority-medium {
    border-color: #4a90e2;
    border-left: 4px solid #4a90e2;
}

.can-notification.can-priority-low {
    border-color: #7ed321;
    border-left: 4px solid #7ed321;
}

.can-notification-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.can-notification-icon {
    font-size: 16px;
    margin-right: 8px;
}

.can-notification-title {
    flex: 1;
    font-weight: bold;
    font-size: 14px;
}

.can-notification-close {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 16px;
    cursor: pointer;
    padding: 2px;
}

.can-notification-message {
    font-size: 12px;
    line-height: 1.4;
    margin-bottom: 8px;
    color: #ccc;
}

.can-notification-footer {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #888;
}

.can-recent-history {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.history-header {
    color: #4a90e2;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
}

.history-list {
    max-height: 100px;
    overflow-y: auto;
}

.history-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    font-size: 11px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.history-time {
    color: #888;
}

.history-type {
    color: #ccc;
}

.can-controls {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.can-control-group {
    margin-bottom: 15px;
}

.can-control-group h4 {
    color: #4a90e2;
    margin-bottom: 10px;
    font-size: 14px;
}

.can-checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
}

.can-checkbox input {
    margin-right: 8px;
}

.can-level-slider, .can-slider {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
}

.can-level-slider label, .can-slider label {
    min-width: 80px;
    font-size: 12px;
}

.can-level-slider input[type="range"], .can-slider input[type="range"] {
    flex: 1;
}

.can-level-slider span, .can-slider span {
    min-width: 40px;
    text-align: right;
    font-size: 12px;
    color: #4a90e2;
}

.can-presets {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.can-preset-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #4a90e2;
    color: #4a90e2;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.can-preset-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #4a90e2;
}

.can-metrics {
    display: flex;
    justify-content: space-around;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.can-metric {
    text-align: center;
}

.metric-label {
    display: block;
    font-size: 10px;
    color: #888;
    margin-bottom: 4px;
}

.metric-value {
    font-size: 16px;
    font-weight: bold;
    color: #4a90e2;
}

.can-actions {
    display: flex;
    gap: 8px;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0 0 13px 13px;
}

.can-action-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #4a90e2;
    color: #4a90e2;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.can-action-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 5px #4a90e2;
}

@media (max-width: 600px) {
    .can-container {
        width: 95vw;
    }
    
    .can-metrics {
        flex-direction: column;
        gap: 10px;
    }
    
    .can-presets {
        flex-wrap: wrap;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', consciousnessStyles);