// chromashift-dreamos-game.js - Main Dream OS Game Class
// Time-travel Windows versions, Anomaly Terminal, Radio Stations, Full Customization

import { DreamOSAPI } from './chromashift-dreamos-api.js';

class DreamOSGame {
    constructor() {
        this.isActive = false;
        this.currentVersion = 'Windows 97 (Dream Edition)';
        this.radioStations = new Map();
        this.anomalyLogs = [];
        this.customThemes = new Map();
        this.gameData = new Map();
        this.uiElements = {};
        this.dreamOSVersions = [
            'Windows 95', 'Windows 96', 'Windows 97', 'Windows 98', 'Windows 2000',
            'Windows ME', 'Windows XP', 'Windows Vista', 'Windows 7', 'Windows 8',
            'Windows 10', 'Windows 11', 'Windows 2050 (Future)'
        ];
        
        this.init();
    }

    async init() {
        this.createUI();
        this.setupEventListeners();
        await this.loadGameData();
        console.log('DreamOS Initialized - Ready for time-travel OS experiences');
    }

    // ============================================================================
    // UI CREATION AND MANAGEMENT
    // ============================================================================

    createUI() {
        // Create Dream OS modal container
        const modalHTML = `
            <div id="dreamos-modal" class="dreamos-modal" style="display: none;">
                <div class="dreamos-window">
                    <!-- Windows 97 Title Bar -->
                    <div class="dreamos-titlebar">
                        <div class="dreamos-title">🖥️ DreamOS - Windows ${this.currentVersion}</div>
                        <div class="dreamos-controls">
                            <button class="dreamos-btn minimize">_</button>
                            <button class="dreamos-btn maximize">□</button>
                            <button class="dreamos-btn close" onclick="dreamosGame.close()">×</button>
                        </div>
                    </div>
                    
                    <!-- Dream OS Desktop -->
                    <div class="dreamos-desktop">
                        <!-- Start Menu -->
                        <div class="dreamos-start-menu" id="dreamos-start-menu" style="display: none;">
                            <div class="dreamos-start-header">DreamOS Start</div>
                            <div class="dreamos-menu-items">
                                <div class="dreamos-menu-item" onclick="dreamosGame.openAnomalyTerminal()">
                                    📊 Anomaly Terminal
                                </div>
                                <div class="dreamos-menu-item" onclick="dreamosGame.openRadioManager()">
                                    📻 Radio Station Manager
                                </div>
                                <div class="dreamos-menu-item" onclick="dreamosGame.openThemeCustomizer()">
                                    🎨 Theme Customizer
                                </div>
                                <div class="dreamos-menu-item" onclick="dreamosGame.openGameData()">
                                    📁 Game Data Hub
                                </div>
                                <div class="dreamos-menu-item" onclick="dreamosGame.openTimeTravel()">
                                    ⏰ Time Travel OS
                                </div>
                                <div class="dreamos-menu-item" onclick="dreamosGame.openHouseExport()">
                                    💾 House Export System
                                </div>
                                <div class="dreamos-separator"></div>
                                <div class="dreamos-menu-item" onclick="dreamosGame.shutdown()">
                                    🔌 Shutdown DreamOS
                                </div>
                            </div>
                        </div>
                        
                        <!-- Main Desktop Area -->
                        <div class="dreamos-desktop-area">
                            <!-- Desktop Icons -->
                            <div class="dreamos-icons">
                                <div class="dreamos-icon" onclick="dreamosGame.openAnomalyTerminal()" title="Anomaly Detection Terminal">
                                    📊<span>Anomaly Terminal</span>
                                </div>
                                <div class="dreamos-icon" onclick="dreamosGame.openRadioManager()" title="Radio Station Manager">
                                    📻<span>Radio Manager</span>
                                </div>
                                <div class="dreamos-icon" onclick="dreamosGame.openThemeCustomizer()" title="UI Customization">
                                    🎨<span>Theme Customizer</span>
                                </div>
                                <div class="dreamos-icon" onclick="dreamosGame.openGameData()" title="Game Data Hub">
                                    📁<span>Game Data Hub</span>
                                </div>
                                <div class="dreamos-icon" onclick="dreamosGame.openTimeTravel()" title="Time Travel OS Versions">
                                    ⏰<span>Time Travel OS</span>
                                </div>
                                <div class="dreamos-icon" onclick="dreamosGame.openHouseExport()" title="Export Dream Data">
                                    💾<span>House Export</span>
                                </div>
                            </div>
                            
                            <!-- Taskbar -->
                            <div class="dreamos-taskbar">
                                <button class="dreamos-start-btn" onclick="dreamosGame.toggleStartMenu()">🪟 Start</button>
                                <div class="dreamos-taskbar-items">
                                    <div class="dreamos-task-item active">DreamOS Desktop</div>
                                </div>
                                <div class="dreamos-system-tray">
                                    <span id="dreamos-time">${new Date().toLocaleTimeString()}</span>
                                    <span id="dreamos-lucidity">💫 75%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Application Windows -->
                    <div class="dreamos-app-windows">
                        <!-- Anomaly Terminal Window -->
                        <div id="dreamos-anomaly-window" class="dreamos-app-window" style="display: none;">
                            <div class="dreamos-window-header">
                                <span>📊 Anomaly Terminal</span>
                                <button onclick="dreamosGame.closeApp('anomaly')">×</button>
                            </div>
                            <div class="dreamos-app-content">
                                <div class="dreamos-terminal">
                                    <div class="dreamos-terminal-header">DreamOS Anomaly Detection System</div>
                                    <div class="dreamos-terminal-body">
                                        <div id="dreamos-anomaly-log" class="dreamos-log"></div>
                                        <div class="dreamos-terminal-input">
                                            <input type="text" id="dreamos-anomaly-input" placeholder="Enter command...">
                                            <button onclick="dreamosGame.runAnomalyCommand()">Run</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Radio Manager Window -->
                        <div id="dreamos-radio-window" class="dreamos-app-window" style="display: none;">
                            <div class="dreamos-window-header">
                                <span>📻 Radio Station Manager</span>
                                <button onclick="dreamosGame.closeApp('radio')">×</button>
                            </div>
                            <div class="dreamos-app-content">
                                <div class="dreamos-radio-interface">
                                    <div class="dreamos-radio-stations">
                                        <h3>Active Stations</h3>
                                        <div id="dreamos-stations-list"></div>
                                    </div>
                                    <div class="dreamos-radio-controls">
                                        <button onclick="dreamosGame.createStation()">Create New Station</button>
                                        <button onclick="dreamosGame.broadcastToAll()">Broadcast to All</button>
                                        <div class="dreamos-current-station">
                                            <h4>Current Station: <span id="dreamos-current-station">Dreamwave FM</span></h4>
                                            <div class="dreamos-dj-content">
                                                <div id="dreamos-dj-display"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Theme Customizer Window -->
                        <div id="dreamos-theme-window" class="dreamos-app-window" style="display: none;">
                            <div class="dreamos-window-header">
                                <span>🎨 DreamOS Theme Customizer</span>
                                <button onclick="dreamosGame.closeApp('theme')">×</button>
                            </div>
                            <div class="dreamos-app-content">
                                <div class="dreamos-theme-interface">
                                    <div class="dreamos-theme-controls">
                                        <div class="dreamos-color-picker">
                                            <label>Primary Color: <input type="color" id="dreamos-primary-color" value="#ff00ff"></label>
                                            <label>Secondary Color: <input type="color" id="dreamos-secondary-color" value="#00ffff"></label>
                                            <label>Accent Color: <input type="color" id="dreamos-accent-color" value="#ffff00"></label>
                                        </div>
                                        <div class="dreamos-animation-controls">
                                            <label><input type="checkbox" id="dreamos-animations" checked> Enable Animations</label>
                                            <label><input type="checkbox" id="dreamos-glow" checked> Enable Glow Effects</label>
                                            <label><input type="checkbox" id="dreamos-float" checked> Enable Floating Elements</label>
                                        </div>
                                        <button onclick="dreamosGame.applyCustomTheme()">Apply Theme</button>
                                        <button onclick="dreamosGame.saveCustomTheme()">Save Theme</button>
                                    </div>
                                    <div class="dreamos-theme-preview">
                                        <h4>Theme Preview</h4>
                                        <div class="dreamos-theme-sample">
                                            <div class="dreamos-sample-window">
                                                <div class="dreamos-sample-title">Sample Window</div>
                                                <div class="dreamos-sample-content">This is how your theme will look!</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Game Data Hub Window -->
                        <div id="dreamos-data-window" class="dreamos-app-window" style="display: none;">
                            <div class="dreamos-window-header">
                                <span>📁 Game Data Hub</span>
                                <button onclick="dreamosGame.closeApp('data')">×</button>
                            </div>
                            <div class="dreamos-app-content">
                                <div class="dreamos-data-interface">
                                    <div class="dreamos-data-sections">
                                        <div class="dreamos-data-section">
                                            <h3>🎮 Player Progress</h3>
                                            <div id="dreamos-player-data"></div>
                                        </div>
                                        <div class="dreamos-data-section">
                                            <h3>🌈 Chroma Keys Collected</h3>
                                            <div id="dreamos-chroma-data"></div>
                                        </div>
                                        <div class="dreamos-data-section">
                                            <h3>🧠 Dream State Analysis</h3>
                                            <div id="dreamos-dream-data"></div>
                                        </div>
                                        <div class="dreamos-data-section">
                                            <h3>📊 Session Statistics</h3>
                                            <div id="dreamos-session-data"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Time Travel OS Window -->
                        <div id="dreamos-timetravel-window" class="dreamos-app-window" style="display: none;">
                            <div class="dreamos-window-header">
                                <span>⏰ Time Travel OS Versions</span>
                                <button onclick="dreamosGame.closeApp('timetravel')">×</button>
                            </div>
                            <div class="dreamos-app-content">
                                <div class="dreamos-timetravel-interface">
                                    <div class="dreamos-version-selector">
                                        <h3>Select Windows Version</h3>
                                        <div class="dreamos-versions-grid" id="dreamos-versions-grid"></div>
                                    </div>
                                    <div class="dreamos-version-details">
                                        <h4 id="dreamos-version-title">Windows 97 (Dream Edition)</h4>
                                        <div id="dreamos-version-info"></div>
                                        <button onclick="dreamosGame.travelToVersion()">Travel to This Version</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- House Export Window -->
                        <div id="dreamos-export-window" class="dreamos-app-window" style="display: none;">
                            <div class="dreamos-window-header">
                                <span>💾 House Export System</span>
                                <button onclick="dreamosGame.closeApp('export')">×</button>
                            </div>
                            <div class="dreamos-app-content">
                                <div class="dreamos-export-interface">
                                    <div class="dreamos-export-options">
                                        <h3>Export Dream Data</h3>
                                        <div class="dreamos-export-types">
                                            <label><input type="checkbox" id="export-anomalies" checked> Anomaly Logs</label>
                                            <label><input type="checkbox" id="export-radio" checked> Radio Stations</label>
                                            <label><input type="checkbox" id="export-progress" checked> Player Progress</label>
                                            <label><input type="checkbox" id="export-dreams" checked> Dream Patterns</label>
                                        </div>
                                        <button onclick="dreamosGame.performExport()">Export House Data</button>
                                    </div>
                                    <div class="dreamos-export-status">
                                        <h4>Export Status</h4>
                                        <div id="dreamos-export-log"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    setupEventListeners() {
        // Start menu toggle
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dreamos-start-menu') && !e.target.closest('.dreamos-start-btn')) {
                this.closeStartMenu();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                this.toggle();
            }
        });

        // Update time display
        setInterval(() => {
            const timeEl = document.getElementById('dreamos-time');
            if (timeEl) {
                timeEl.textContent = new Date().toLocaleTimeString();
            }
        }, 1000);
    }

    // ============================================================================
    // DREAM OS CONTROL METHODS
    // ============================================================================

    toggle() {
        this.isActive = !this.isActive;
        const modal = document.getElementById('dreamos-modal');
        if (modal) {
            modal.style.display = this.isActive ? 'block' : 'none';
            if (this.isActive) {
                this.onOpen();
            } else {
                this.onClose();
            }
        }
    }

    close() {
        this.isActive = false;
        const modal = document.getElementById('dreamos-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.onClose();
    }

    onOpen() {
        console.log('DreamOS activated - Ready for time-travel computing');
        this.updateGameData();
        this.refreshAllWindows();
    }

    onClose() {
        console.log('DreamOS deactivated');
        this.saveGameData();
    }

    toggleStartMenu() {
        const startMenu = document.getElementById('dreamos-start-menu');
        if (startMenu) {
            startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
        }
    }

    closeStartMenu() {
        const startMenu = document.getElementById('dreamos-start-menu');
        if (startMenu) {
            startMenu.style.display = 'none';
        }
    }

    shutdown() {
        this.close();
        console.log('DreamOS Shutdown Complete');
    }

    // ============================================================================
    // APPLICATION WINDOWS
    // ============================================================================

    openAnomalyTerminal() {
        const window = document.getElementById('dreamos-anomaly-window');
        if (window) {
            window.style.display = 'block';
            this.loadAnomalyData();
        }
        this.closeStartMenu();
    }

    openRadioManager() {
        const window = document.getElementById('dreamos-radio-window');
        if (window) {
            window.style.display = 'block';
            this.loadRadioStations();
        }
        this.closeStartMenu();
    }

    openThemeCustomizer() {
        const window = document.getElementById('dreamos-theme-window');
        if (window) {
            window.style.display = 'block';
            this.loadThemeOptions();
        }
        this.closeStartMenu();
    }

    openGameData() {
        const window = document.getElementById('dreamos-data-window');
        if (window) {
            window.style.display = 'block';
            this.loadGameDataHub();
        }
        this.closeStartMenu();
    }

    openTimeTravel() {
        const window = document.getElementById('dreamos-timetravel-window');
        if (window) {
            window.style.display = 'block';
            this.loadTimeTravelVersions();
        }
        this.closeStartMenu();
    }

    openHouseExport() {
        const window = document.getElementById('dreamos-export-window');
        if (window) {
            window.style.display = 'block';
        }
        this.closeStartMenu();
    }

    closeApp(appType) {
        const window = document.getElementById(`dreamos-${appType}-window`);
        if (window) {
            window.style.display = 'none';
        }
    }

    // ============================================================================
    // ANOMALY TERMINAL FUNCTIONALITY
    // ============================================================================

    async loadAnomalyData() {
        const logContainer = document.getElementById('dreamos-anomaly-log');
        if (!logContainer) return;

        // Display recent anomaly logs
        const recentLogs = this.anomalyLogs.slice(-10);
        logContainer.innerHTML = recentLogs.map(log => 
            `<div class="dreamos-log-entry">
                <span class="dreamos-timestamp">[${new Date(log.timestamp).toLocaleTimeString()}]</span>
                <span class="dreamos-level">${log.level}</span>
                <span class="dreamos-message">${log.message}</span>
            </div>`
        ).join('');

        // Auto-scroll to bottom
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    async runAnomalyCommand() {
        const input = document.getElementById('dreamos-anomaly-input');
        if (!input || !input.value.trim()) return;

        const command = input.value.trim();
        input.value = '';

        // Process anomaly command
        const result = await this.processAnomalyCommand(command);
        this.displayAnomalyResult(result);
    }

    async processAnomalyCommand(command) {
        try {
            // Use API to process command
            const response = await DreamOSAPI.logAnomalyData(
                { title: 'Current Scene', narrativeDescription: 'Processing command' },
                command
            );
            
            return {
                type: 'success',
                message: `Command executed: ${command}`,
                data: response
            };
        } catch (error) {
            return {
                type: 'error',
                message: `Command failed: ${error.message}`,
                data: null
            };
        }
    }

    displayAnomalyResult(result) {
        const logContainer = document.getElementById('dreamos-anomaly-log');
        if (!logContainer) return;

        const logEntry = document.createElement('div');
        logEntry.className = `dreamos-log-entry ${result.type}`;
        logEntry.innerHTML = `
            <span class="dreamos-timestamp">[${new Date().toLocaleTimeString()}]</span>
            <span class="dreamos-level">${result.type.toUpperCase()}</span>
            <span class="dreamos-message">${result.message}</span>
        `;

        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;

        // Add to anomaly logs
        this.anomalyLogs.push({
            timestamp: Date.now(),
            level: result.type,
            message: result.message,
            data: result.data
        });
    }

    // ============================================================================
    // RADIO STATION MANAGER
    // ============================================================================

    async loadRadioStations() {
        const stationsList = document.getElementById('dreamos-stations-list');
        if (!stationsList) return;

        // Create default stations if none exist
        if (this.radioStations.size === 0) {
            await this.createDefaultStations();
        }

        stationsList.innerHTML = Array.from(this.radioStations.values()).map(station => `
            <div class="dreamos-station-item" onclick="dreamosGame.selectStation('${station.id}')">
                <div class="dreamos-station-info">
                    <strong>${station.name}</strong> (${station.frequency})
                    <div class="dreamos-station-meta">${station.genre} • ${station.djName}</div>
                </div>
                <div class="dreamos-station-controls">
                    <button onclick="dreamosGame.editStation('${station.id}')">Edit</button>
                    <button onclick="dreamosGame.deleteStation('${station.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    async createDefaultStations() {
        const defaultStations = [
            {
                id: 'dreamwave-fm',
                name: 'Dreamwave FM',
                frequency: '97.7',
                genre: 'Ambient Dreamscape',
                djName: 'DJ Lucidity',
                description: 'Broadcasting from the edge of consciousness'
            },
            {
                id: 'retro-vibes',
                name: 'Retro Vibes',
                frequency: '103.5',
                genre: 'Nostalgic Electronic',
                djName: 'DJ Memory',
                description: 'Throwback tunes from lost timelines'
            },
            {
                id: 'quantum-fm',
                name: 'Quantum FM',
                frequency: '88.2',
                genre: 'Experimental',
                djName: 'DJ Probability',
                description: 'Sounds that exist in multiple dimensions'
            }
        ];

        for (const station of defaultStations) {
            this.radioStations.set(station.id, station);
        }
    }

    async createStation() {
        const name = prompt('Enter station name:');
        if (!name) return;

        const frequency = prompt('Enter frequency (e.g., 101.5):');
        if (!frequency) return;

        const genre = prompt('Enter genre:') || 'General';
        const djName = prompt('Enter DJ name:') || 'DJ Unknown';

        const station = {
            id: `station-${Date.now()}`,
            name,
            frequency,
            genre,
            djName,
            description: 'Custom radio station'
        };

        this.radioStations.set(station.id, station);
        this.loadRadioStations();
    }

    selectStation(stationId) {
        const station = this.radioStations.get(stationId);
        if (!station) return;

        document.getElementById('dreamos-current-station').textContent = station.name;
        this.displayDJContent(station);
    }

    async displayDJContent(station) {
        const djDisplay = document.getElementById('dreamos-dj-display');
        if (!djDisplay) return;

        try {
            const content = await DreamOSAPI.generateDJContent(
                station,
                'day',
                'Player exploring dream world'
            );

            djDisplay.innerHTML = `
                <div class="dreamos-dj-segment">
                    <strong>${station.djName}:</strong> ${content.content}
                </div>
            `;
        } catch (error) {
            djDisplay.innerHTML = '<div class="dreamos-dj-segment">Welcome to Dreamwave...</div>';
        }
    }

    // ============================================================================
    // THEME CUSTOMIZER
    // ============================================================================

    async loadThemeOptions() {
        // Load saved themes or create defaults
        if (this.customThemes.size === 0) {
            await this.createDefaultThemes();
        }
    }

    async createDefaultThemes() {
        const themes = [
            {
                id: 'psychedelic',
                name: 'Psychedelic Dreams',
                colors: { primary: '#ff00ff', secondary: '#00ffff', accent: '#ffff00' },
                effects: { animations: true, glow: true, float: true }
            },
            {
                id: 'neon-noir',
                name: 'Neon Noir',
                colors: { primary: '#ff6b6b', secondary: '#4ecdc4', accent: '#45b7d1' },
                effects: { animations: true, glow: true, float: false }
            },
            {
                id: 'cosmic-void',
                name: 'Cosmic Void',
                colors: { primary: '#2c1810', secondary: '#8b4513', accent: '#ffd700' },
                effects: { animations: true, glow: false, float: true }
            }
        ];

        for (const theme of themes) {
            this.customThemes.set(theme.id, theme);
        }
    }

    applyCustomTheme() {
        const primaryColor = document.getElementById('dreamos-primary-color').value;
        const secondaryColor = document.getElementById('dreamos-secondary-color').value;
        const accentColor = document.getElementById('dreamos-accent-color').value;
        
        const animations = document.getElementById('dreamos-animations').checked;
        const glow = document.getElementById('dreamos-glow').checked;
        const float = document.getElementById('dreamos-float').checked;

        // Apply theme to DreamOS interface
        const style = document.createElement('style');
        style.textContent = `
            .dreamos-window {
                --primary-color: ${primaryColor};
                --secondary-color: ${secondaryColor};
                --accent-color: ${accentColor};
                ${animations ? '--animation-enabled: 1;' : '--animation-enabled: 0;'}
                ${glow ? '--glow-enabled: 1;' : '--glow-enabled: 0;'}
                ${float ? '--float-enabled: 1;' : '--float-enabled: 0;'}
            }
        `;
        
        // Remove old theme styles
        const oldStyle = document.getElementById('dreamos-theme-style');
        if (oldStyle) oldStyle.remove();
        
        style.id = 'dreamos-theme-style';
        document.head.appendChild(style);

        // Update preview
        this.updateThemePreview(primaryColor, secondaryColor, accentColor);
    }

    updateThemePreview(primary, secondary, accent) {
        const preview = document.querySelector('.dreamos-sample-window');
        if (preview) {
            preview.style.background = `linear-gradient(135deg, ${primary}20, ${secondary}20)`;
            preview.style.border = `2px solid ${accent}`;
        }
    }

    saveCustomTheme() {
        const name = prompt('Enter theme name:');
        if (!name) return;

        const theme = {
            id: `theme-${Date.now()}`,
            name,
            colors: {
                primary: document.getElementById('dreamos-primary-color').value,
                secondary: document.getElementById('dreamos-secondary-color').value,
                accent: document.getElementById('dreamos-accent-color').value
            },
            effects: {
                animations: document.getElementById('dreamos-animations').checked,
                glow: document.getElementById('dreamos-glow').checked,
                float: document.getElementById('dreamos-float').checked
            }
        };

        this.customThemes.set(theme.id, theme);
        alert('Theme saved successfully!');
    }

    // ============================================================================
    // GAME DATA HUB
    // ============================================================================

    async loadGameDataHub() {
        this.updatePlayerData();
        this.updateChromaData();
        this.updateDreamData();
        this.updateSessionData();
    }

    updatePlayerData() {
        const container = document.getElementById('dreamos-player-data');
        if (!container) return;

        // Mock player data - in real implementation, get from ChromaShift game state
        const playerData = {
            level: 'Dream Explorer',
            experience: 2847,
            location: 'Supermarket Dreamscape',
            questsCompleted: 12,
            achievements: 7
        };

        container.innerHTML = `
            <div class="dreamos-data-item">
                <strong>Level:</strong> ${playerData.level}
            </div>
            <div class="dreamos-data-item">
                <strong>Experience:</strong> ${playerData.experience} XP
            </div>
            <div class="dreamos-data-item">
                <strong>Current Location:</strong> ${playerData.location}
            </div>
            <div class="dreamos-data-item">
                <strong>Quests Completed:</strong> ${playerData.questsCompleted}
            </div>
            <div class="dreamos-data-item">
                <strong>Achievements:</strong> ${playerData.achievements}
            </div>
        `;
    }

    updateChromaData() {
        const container = document.getElementById('dreamos-chroma-data');
        if (!container) return;

        const chromaKeys = [
            { type: 'Reality Fragment', count: 3, color: '#ff00ff' },
            { type: 'Temporal Echo', count: 2, color: '#00ffff' },
            { type: 'Memory Crystal', count: 1, color: '#ffff00' },
            { type: 'Dream Anchor', count: 4, color: '#ff6b6b' }
        ];

        container.innerHTML = chromaKeys.map(key => `
            <div class="dreamos-data-item">
                <span class="dreamos-chroma-color" style="background: ${key.color}"></span>
                <strong>${key.type}:</strong> ${key.count}
            </div>
        `).join('');
    }

    updateDreamData() {
        const container = document.getElementById('dreamos-dream-data');
        if (!container) return;

        const dreamStats = {
            lucidity: 75,
            coherence: 42,
            perception: 88,
            stability: 'Fluctuating',
            depth: 'Surface Level'
        };

        container.innerHTML = `
            <div class="dreamos-data-item">
                <strong>Lucidity:</strong> ${dreamStats.lucidity}%
            </div>
            <div class="dreamos-data-item">
                <strong>Reality Coherence:</strong> ${dreamStats.coherence}%
            </div>
            <div class="dreamos-data-item">
                <strong>Perception:</strong> ${dreamStats.perception}%
            </div>
            <div class="dreamos-data-item">
                <strong>Dream Stability:</strong> ${dreamStats.stability}
            </div>
            <div class="dreamos-data-item">
                <strong>Depth Level:</strong> ${dreamStats.depth}
            </div>
        `;
    }

    updateSessionData() {
        const container = document.getElementById('dreamos-session-data');
        if (!container) return;

        const sessionData = {
            playTime: '2h 34m',
            scenesVisited: 18,
            anomaliesDetected: 7,
            wishesGranted: 3,
            choicesMade: 24
        };

        container.innerHTML = `
            <div class="dreamos-data-item">
                <strong>Session Time:</strong> ${sessionData.playTime}
            </div>
            <div class="dreamos-data-item">
                <strong>Scenes Visited:</strong> ${sessionData.scenesVisited}
            </div>
            <div class="dreamos-data-item">
                <strong>Anomalies Detected:</strong> ${sessionData.anomaliesDetected}
            </div>
            <div class="dreamos-data-item">
                <strong>Wishes Granted:</strong> ${sessionData.wishesGranted}
            </div>
            <div class="dreamos-data-item">
                <strong>Choices Made:</strong> ${sessionData.choicesMade}
            </div>
        `;
    }

    // ============================================================================
    // TIME TRAVEL OS
    // ============================================================================

    async loadTimeTravelVersions() {
        const grid = document.getElementById('dreamos-versions-grid');
        if (!grid) return;

        grid.innerHTML = this.dreamOSVersions.map(version => `
            <div class="dreamos-version-card" onclick="dreamosGame.selectVersion('${version}')">
                <div class="dreamos-version-icon">🖥️</div>
                <div class="dreamos-version-name">${version}</div>
            </div>
        `).join('');
    }

    async selectVersion(version) {
        document.getElementById('dreamos-version-title').textContent = version;
        
        try {
            const versionData = await DreamOSAPI.getDreamOSVersion(`Switch to ${version}`);
            this.displayVersionInfo(versionData);
        } catch (error) {
            this.displayVersionInfo({
                version,
                theme: 'Classic Dream',
                features: ['Basic functionality', 'Dream integration'],
                retro_factors: ['Nostalgic feel'],
                dream_enhancements: ['Enhanced surreal interface']
            });
        }
    }

    displayVersionInfo(versionData) {
        const infoContainer = document.getElementById('dreamos-version-info');
        if (!infoContainer) return;

        infoContainer.innerHTML = `
            <div class="dreamos-version-detail">
                <strong>Theme:</strong> ${versionData.theme}
            </div>
            <div class="dreamos-version-detail">
                <strong>Features:</strong> ${versionData.features ? versionData.features.join(', ') : 'Standard DreamOS features'}
            </div>
            <div class="dreamos-version-detail">
                <strong>Retro Factors:</strong> ${versionData.retro_factors ? versionData.retro_factors.join(', ') : 'Classic computing nostalgia'}
            </div>
            <div class="dreamos-version-detail">
                <strong>Dream Enhancements:</strong> ${versionData.dream_enhancements ? versionData.dream_enhancements.join(', ') : 'Surreality amplification'}
            </div>
        `;
    }

    async travelToVersion() {
        const titleEl = document.getElementById('dreamos-version-title');
        if (!titleEl) return;

        const newVersion = titleEl.textContent;
        this.currentVersion = newVersion;
        
        // Update title bar
        document.querySelector('.dreamos-title').textContent = `🖥️ DreamOS - Windows ${newVersion}`;
        
        // Visual transition effect
        const window = document.querySelector('.dreamos-window');
        if (window) {
            window.style.transition = 'all 0.5s ease-in-out';
            window.style.transform = 'scale(0.95)';
            setTimeout(() => {
                window.style.transform = 'scale(1)';
            }, 250);
        }

        console.log(`Traveled to ${newVersion}!`);
    }

    // ============================================================================
    // HOUSE EXPORT SYSTEM
    // ============================================================================

    async performExport() {
        const exportLog = document.getElementById('dreamos-export-log');
        if (!exportLog) return;

        const exportOptions = {
            anomalies: document.getElementById('export-anomalies').checked,
            radio: document.getElementById('export-radio').checked,
            progress: document.getElementById('export-progress').checked,
            dreams: document.getElementById('export-dreams').checked
        };

        const exportData = [];

        if (exportOptions.anomalies) {
            exportLog.innerHTML += '<div>Exporting anomaly logs...</div>';
            exportData.push(...this.anomalyLogs);
        }

        if (exportOptions.radio) {
            exportLog.innerHTML += '<div>Exporting radio station data...</div>';
            exportData.push(...Array.from(this.radioStations.values()));
        }

        if (exportOptions.progress) {
            exportLog.innerHTML += '<div>Exporting player progress...</div>';
            // Add player progress data
        }

        if (exportOptions.dreams) {
            exportLog.innerHTML += '<div>Exporting dream pattern data...</div>';
            // Add dream pattern data
        }

        try {
            const exportedData = await DreamOSAPI.exportDreamData(exportData);
            
            // Create downloadable file
            const dataStr = JSON.stringify(exportedData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `dream-house-export-${Date.now()}.json`;
            link.click();
            
            exportLog.innerHTML += '<div class="dreamos-export-success">✅ Export completed successfully!</div>';
            URL.revokeObjectURL(url);
            
        } catch (error) {
            exportLog.innerHTML += `<div class="dreamos-export-error">❌ Export failed: ${error.message}</div>`;
        }

        exportLog.scrollTop = exportLog.scrollHeight;
    }

    // ============================================================================
    // DATA PERSISTENCE
    // ============================================================================

    async saveGameData() {
        const gameData = {
            currentVersion: this.currentVersion,
            radioStations: Array.from(this.radioStations.entries()),
            anomalyLogs: this.anomalyLogs,
            customThemes: Array.from(this.customThemes.entries()),
            gameData: Array.from(this.gameData.entries()),
            timestamp: Date.now()
        };

        localStorage.setItem('dreamos-data', JSON.stringify(gameData));
    }

    async loadGameData() {
        try {
            const saved = localStorage.getItem('dreamos-data');
            if (saved) {
                const data = JSON.parse(saved);
                this.currentVersion = data.currentVersion || this.currentVersion;
                this.radioStations = new Map(data.radioStations || []);
                this.anomalyLogs = data.anomalyLogs || [];
                this.customThemes = new Map(data.customThemes || []);
                this.gameData = new Map(data.gameData || []);
            }
        } catch (error) {
            console.warn('Failed to load DreamOS data:', error);
        }
    }

    updateGameData() {
        // Update game data from ChromaShift
        // This would integrate with the main game state
        this.gameData.set('lastUpdate', Date.now());
    }

    refreshAllWindows() {
        // Refresh all open windows with current data
        if (document.getElementById('dreamos-anomaly-window').style.display !== 'none') {
            this.loadAnomalyData();
        }
        if (document.getElementById('dreamos-radio-window').style.display !== 'none') {
            this.loadRadioStations();
        }
        if (document.getElementById('dreamos-data-window').style.display !== 'none') {
            this.loadGameDataHub();
        }
    }

    // ============================================================================
    // INTEGRATION WITH CHROMASHIFT
    // ============================================================================

    // Called from ChromaShift when CRT channel changes
    async handleCRTChannelChange(fromChannel, toChannel) {
        try {
            const result = await DreamOSAPI.processCRTChannelChange(fromChannel, toChannel);
            
            if (result.action === 'activateDreamOS') {
                // Auto-activate DreamOS
                setTimeout(() => {
                    this.toggle();
                }, result.delay || 1500);
                
                return result;
            }
        } catch (error) {
            console.warn('CRT channel handling failed:', error);
        }
    }

    // Get contextual commands for current game state
    async getContextualCommands() {
        try {
            const context = {
                scene: 'Current ChromaShift scene',
                playerState: {
                    lucidity: 75,
                    coherence: 42,
                    perception: 88
                }
            };
            
            return await DreamOSAPI.getContextualCommands(context.scene, context.playerState);
        } catch (error) {
            return {
                availableCommands: ['anomaly-log', 'radio-manager', 'theme-customizer'],
                priority: 'anomaly-log'
            };
        }
    }

    // Integration points for ChromaShift game loop
    updateDreamState(gameState) {
        // Update DreamOS with current ChromaShift state
        this.gameData.set('gameState', gameState);
        
        // Update lucidity display
        const lucidityEl = document.getElementById('dreamos-lucidity');
        if (lucidityEl && gameState.lucidity !== undefined) {
            lucidityEl.textContent = `💫 ${gameState.lucidity}%`;
        }
    }
}

// ============================================================================
// EXPORT AND INITIALIZATION
// ============================================================================

let dreamosGame = null;

export function initDreamOS() {
    if (!dreamosGame) {
        dreamosGame = new DreamOSGame();
        console.log('DreamOS Game System Initialized');
    }
    return dreamosGame;
}

export function getDreamOSGame() {
    return dreamosGame;
}

export { DreamOSGame };