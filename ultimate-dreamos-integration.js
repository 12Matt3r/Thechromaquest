// Ultimate DreamOS Integration - Bringing all systems together
// Master controller for the complete ChromaShift enhancement suite

class UltimateDreamOS {
    constructor() {
        this.systems = {
            cortana: null,
            quantumFS: null,
            synchronicity: null,
            mainGame: null
        };
        this.isInitialized = false;
        this.dreamChannels = [];
        this.init();
    }

    async init() {
        console.log('🌌 Ultimate DreamOS initializing...');
        
        // Initialize core systems
        await this.initializeSystems();
        await this.createIntegratedInterface();
        await this.setupChannelSystem();
        await this.connectToMainGame();
        
        this.isInitialized = true;
        console.log('✨ Ultimate DreamOS ready!');
        
        // Show startup sequence
        this.showDreamOSStartup();
    }

    async initializeSystems() {
        // Initialize Cortana Dream Assistant
        if (typeof CortanaDream !== 'undefined') {
            this.systems.cortana = new CortanaDream();
        }
        
        // Initialize Quantum File System
        if (typeof QuantumFileSystem !== 'undefined') {
            this.systems.quantumFS = new QuantumFileSystem();
        }
        
        // Initialize Synchronicity Engine
        if (typeof SynchronicityEngine !== 'undefined') {
            this.systems.synchronicity = new SynchronicityEngine();
        }
        
        console.log('🛠️ All systems initialized');
    }

    async createIntegratedInterface() {
        const dreamOSPanel = document.createElement('div');
        dreamOSPanel.id = 'ultimate-dreamos';
        dreamOSPanel.innerHTML = `
            <div class="dreamos-container">
                <div class="dreamos-desktop">
                    <div class="dreamos-taskbar">
                        <div class="dreamos-start-button" onclick="ultimateDreamOS.showStartMenu()">
                            <span class="dreamos-start-icon">🌌</span>
                            DreamOS
                        </div>
                        <div class="dreamos-taskbar-apps" id="dreamos-taskbar-apps">
                            <button class="dreamos-taskbar-app" onclick="ultimateDreamOS.toggleCortana()" title="Cortana Dream">
                                🤖
                            </button>
                            <button class="dreamos-taskbar-app" onclick="ultimateDreamOS.toggleQuantumFS()" title="Quantum File System">
                                ⚛️
                            </button>
                            <button class="dreamos-taskbar-app" onclick="ultimateDreamOS.toggleSynchronicity()" title="Synchronicity Engine">
                                🌟
                            </button>
                            <button class="dreamos-taskbar-app" onclick="ultimateDreamOS.showChannelSystem()" title="Dream Channels">
                                📺
                            </button>
                        </div>
                        <div class="dreamos-taskbar-time" id="dreamos-taskbar-time">
                            ${new Date().toLocaleTimeString()}
                        </div>
                    </div>
                    
                    <div class="dreamos-desktop-icons" id="dreamos-desktop-icons">
                        <div class="dreamos-desktop-icon" onclick="ultimateDreamOS.toggleCortana()">
                            <div class="dreamos-icon">🤖</div>
                            <div class="dreamos-icon-label">Cortana Dream</div>
                        </div>
                        <div class="dreamos-desktop-icon" onclick="ultimateDreamOS.toggleQuantumFS()">
                            <div class="dreamos-icon">⚛️</div>
                            <div class="dreamos-icon-label">Quantum Files</div>
                        </div>
                        <div class="dreamos-desktop-icon" onclick="ultimateDreamOS.toggleSynchronicity()">
                            <div class="dreamos-icon">🌟</div>
                            <div class="dreamos-icon-label">Synchronicity</div>
                        </div>
                        <div class="dreamos-desktop-icon" onclick="ultimateDreamOS.showChannelSystem()">
                            <div class="dreamos-icon">📺</div>
                            <div class="dreamos-icon-label">Dream Channels</div>
                        </div>
                        <div class="dreamos-desktop-icon" onclick="ultimateDreamOS.createQuantumFile()">
                            <div class="dreamos-icon">⚡</div>
                            <div class="dreamos-icon-label">New Quantum File</div>
                        </div>
                        <div class="dreamos-desktop-icon" onclick="ultimateDreamOS.runAnalysis()">
                            <div class="dreamos-icon">🔍</div>
                            <div class="dreamos-icon-label">Pattern Analysis</div>
                        </div>
                    </div>
                </div>
                
                <div class="dreamos-start-menu" id="dreamos-start-menu">
                    <div class="dreamos-start-header">
                        <div class="dreamos-start-title">DreamOS Windows 97</div>
                        <div class="dreamos-start-subtitle">Consciousness Computing System</div>
                    </div>
                    <div class="dreamos-start-programs">
                        <div class="dreamos-program-item" onclick="ultimateDreamOS.toggleCortana(); ultimateDreamOS.hideStartMenu()">
                            <div class="dreamos-program-icon">🤖</div>
                            <div class="dreamos-program-info">
                                <div class="dreamos-program-name">Cortana Dream</div>
                                <div class="dreamos-program-desc">AI Assistant for Consciousness Exploration</div>
                            </div>
                        </div>
                        <div class="dreamos-program-item" onclick="ultimateDreamOS.toggleQuantumFS(); ultimateDreamOS.hideStartMenu()">
                            <div class="dreamos-program-icon">⚛️</div>
                            <div class="dreamos-program-info">
                                <div class="dreamos-program-name">Quantum File System</div>
                                <div class="dreamos-program-desc">Multi-dimensional Data Management</div>
                            </div>
                        </div>
                        <div class="dreamos-program-item" onclick="ultimateDreamOS.toggleSynchronicity(); ultimateDreamOS.hideStartMenu()">
                            <div class="dreamos-program-icon">🌟</div>
                            <div class="dreamos-program-info">
                                <div class="dreamos-program-name">Synchronicity Engine</div>
                                <div class="dreamos-program-desc">Meaningful Coincidence Detection</div>
                            </div>
                        </div>
                        <div class="dreamos-program-item" onclick="ultimateDreamOS.showChannelSystem(); ultimateDreamOS.hideStartMenu()">
                            <div class="dreamos-program-icon">📺</div>
                            <div class="dreamos-program-info">
                                <div class="dreamos-program-name">Dream Channel System</div>
                                <div class="dreamos-program-desc">Reality Layer Navigation</div>
                            </div>
                        </div>
                    </div>
                    <div class="dreamos-start-footer">
                        <button class="dreamos-shutdown-btn" onclick="ultimateDreamOS.shutdown()">Shutdown DreamOS</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dreamOSPanel);
    }

    async setupChannelSystem() {
        // Define dream channels
        this.dreamChannels = [
            {
                id: 'consciousness',
                name: 'Consciousness Stream',
                icon: '🧠',
                frequency: '42.0 MHz',
                description: 'Real-time consciousness monitoring and lucid state tracking'
            },
            {
                id: 'anomaly',
                name: 'Anomaly Detection',
                icon: '⚠️',
                frequency: '13.37 MHz',
                description: 'Dream distortion monitoring and reality stability alerts'
            },
            {
                id: 'quantum',
                name: 'Quantum Layer',
                icon: '⚛️',
                frequency: '99.9 MHz',
                description: 'Multi-dimensional data access and quantum file systems'
            },
            {
                id: 'synchronicity',
                name: 'Synchronicity Hub',
                icon: '🌟',
                frequency: '7.77 MHz',
                description: 'Meaningful coincidence detection and pattern recognition'
            },
            {
                id: 'ai_assistant',
                name: 'AI Companion',
                icon: '🤖',
                frequency: '8080 MHz',
                description: 'Cortana Dream AI assistant and guidance system'
            },
            {
                id: 'time_stream',
                name: 'Time Stream',
                icon: '⏰',
                frequency: 'TIME MHz',
                description: 'Temporal analysis and timeline navigation'
            },
            {
                id: 'reality_signal',
                name: 'Reality Signal',
                icon: '📡',
                frequency: 'REAL MHz',
                description: 'Reality coherence monitoring and stability metrics'
            },
            {
                id: 'dream_waves',
                name: 'Dream Waves',
                icon: '🌊',
                frequency: 'DREAM MHz',
                description: 'Dream pattern analysis and consciousness harmonics'
            }
        ];
    }

    async connectToMainGame() {
        // Check if main game exists and integrate
        if (window.ChromaShiftGame) {
            this.systems.mainGame = window.ChromaShiftGame;
            
            // Add DreamOS controls to main game
            this.addDreamOSControlsToMainGame();
        }
        
        console.log('🎮 Connected to main ChromaShift game');
    }

    addDreamOSControlsToMainGame() {
        // Add DreamOS button to main game interface
        const mainGameContainer = document.querySelector('.game-container') || document.body;
        if (mainGameContainer) {
            const dreamOSButton = document.createElement('button');
            dreamOSButton.className = 'dreamos-activate-btn';
            dreamOSButton.innerHTML = '🌌 DreamOS';
            dreamOSButton.onclick = () => this.toggleDreamOS();
            dreamOSButton.title = 'Activate DreamOS Windows 97';
            
            // Style the button to blend with the game
            dreamOSButton.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 12px 20px;
                font-family: 'Courier New', monospace;
                font-weight: bold;
                cursor: pointer;
                z-index: 5000;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
            `;
            
            dreamOSButton.onmouseover = () => {
                dreamOSButton.style.transform = 'translateY(-2px)';
                dreamOSButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            };
            
            dreamOSButton.onmouseout = () => {
                dreamOSButton.style.transform = 'translateY(0)';
                dreamOSButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            };
            
            document.body.appendChild(dreamOSButton);
        }
    }

    showDreamOSStartup() {
        // Create startup animation
        const startupOverlay = document.createElement('div');
        startupOverlay.id = 'dreamos-startup';
        startupOverlay.innerHTML = `
            <div class="dreamos-startup-screen">
                <div class="dreamos-boot-logo">🌌</div>
                <div class="dreamos-boot-text">DreamOS Windows 97</div>
                <div class="dreamos-boot-subtitle">Consciousness Computing System</div>
                <div class="dreamos-boot-progress">
                    <div class="dreamos-progress-bar" id="dreamos-progress-bar"></div>
                </div>
                <div class="dreamos-boot-status" id="dreamos-boot-status">Initializing quantum consciousness interface...</div>
            </div>
        `;
        
        document.body.appendChild(startupOverlay);
        
        // Animate startup sequence
        const progressBar = document.getElementById('dreamos-progress-bar');
        const statusElement = document.getElementById('dreamos-boot-status');
        
        const bootMessages = [
            'Initializing quantum consciousness interface...',
            'Loading synchronicity detection algorithms...',
            'Connecting to dream reality layers...',
            'Establishing AI assistant protocols...',
            'Calibrating quantum file systems...',
            'DreamOS ready!'
        ];
        
        let currentMessage = 0;
        const bootInterval = setInterval(() => {
            if (currentMessage < bootMessages.length - 1) {
                progressBar.style.width = `${((currentMessage + 1) / bootMessages.length) * 100}%`;
                statusElement.textContent = bootMessages[currentMessage + 1];
                currentMessage++;
            } else {
                progressBar.style.width = '100%';
                clearInterval(bootInterval);
                
                setTimeout(() => {
                    startupOverlay.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(startupOverlay);
                        this.showWelcomeMessage();
                    }, 1000);
                }, 1000);
            }
        }, 800);
    }

    showWelcomeMessage() {
        const welcome = document.createElement('div');
        welcome.className = 'dreamos-welcome-notification';
        welcome.innerHTML = `
            <div class="dreamos-welcome-content">
                <div class="dreamos-welcome-icon">✨</div>
                <div class="dreamos-welcome-text">
                    <div class="dreamos-welcome-title">Welcome to DreamOS!</div>
                    <div class="dreamos-welcome-desc">Your consciousness computing system is ready</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(welcome);
        
        setTimeout(() => {
            welcome.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            welcome.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(welcome);
            }, 300);
        }, 4000);
    }

    showWelcomeMessage() {
        const welcome = document.createElement('div');
        welcome.className = 'dreamos-welcome-notification';
        welcome.innerHTML = `
            <div class="dreamos-welcome-content">
                <div class="dreamos-welcome-icon">✨</div>
                <div class="dreamos-welcome-text">
                    <div class="dreamos-welcome-title">Welcome to DreamOS!</div>
                    <div class="dreamos-welcome-desc">Your consciousness computing system is ready</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(welcome);
        
        setTimeout(() => {
            welcome.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            welcome.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(welcome);
            }, 300);
        }, 4000);
    }

    // System control methods
    toggleCortana() {
        if (this.systems.cortana) {
            const panel = document.getElementById('cortana-dream-panel');
            if (panel && panel.style.display !== 'none') {
                this.systems.cortana.hide();
            } else {
                this.systems.cortana.show();
            }
        }
    }

    toggleQuantumFS() {
        if (this.systems.quantumFS) {
            const panel = document.getElementById('quantum-file-system');
            if (panel && panel.style.display !== 'none') {
                this.systems.quantumFS.hide();
            } else {
                this.systems.quantumFS.show();
            }
        }
    }

    toggleSynchronicity() {
        if (this.systems.synchronicity) {
            const panel = document.getElementById('synchronicity-engine');
            if (panel && panel.style.display !== 'none') {
                this.systems.synchronicity.hide();
            } else {
                this.systems.synchronicity.show();
            }
        }
    }

    showChannelSystem() {
        if (!this.channelWindow) {
            this.createChannelWindow();
        } else {
            this.channelWindow.style.display = 'block';
        }
    }

    createChannelWindow() {
        this.channelWindow = document.createElement('div');
        this.channelWindow.id = 'dreamos-channel-window';
        this.channelWindow.innerHTML = `
            <div class="dreamos-channel-container">
                <div class="dreamos-channel-header">
                    <div class="dreamos-channel-title">Dream Channel System</div>
                    <button class="dreamos-channel-close" onclick="ultimateDreamOS.closeChannelWindow()">✕</button>
                </div>
                <div class="dreamos-channels-grid" id="dreamos-channels-grid">
                    ${this.dreamChannels.map(channel => `
                        <div class="dreamos-channel-card" onclick="ultimateDreamOS.selectChannel('${channel.id}')">
                            <div class="dreamos-channel-icon">${channel.icon}</div>
                            <div class="dreamos-channel-name">${channel.name}</div>
                            <div class="dreamos-channel-frequency">${channel.frequency}</div>
                            <div class="dreamos-channel-description">${channel.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(this.channelWindow);
    }

    selectChannel(channelId) {
        const channel = this.dreamChannels.find(c => c.id === channelId);
        if (!channel) return;
        
        console.log(`📺 Selected channel: ${channel.name}`);
        
        // Activate the corresponding system
        switch (channelId) {
            case 'consciousness':
                this.toggleCortana();
                break;
            case 'quantum':
                this.toggleQuantumFS();
                break;
            case 'synchronicity':
                this.toggleSynchronicity();
                break;
            case 'ai_assistant':
                this.toggleCortana();
                break;
        }
        
        this.closeChannelWindow();
    }

    closeChannelWindow() {
        if (this.channelWindow) {
            this.channelWindow.style.display = 'none';
        }
    }

    createQuantumFile() {
        if (this.systems.quantumFS) {
            this.systems.quantumFS.createFile();
        }
    }

    runAnalysis() {
        if (this.systems.synchronicity) {
            this.systems.synchronicity.analyzePatterns();
        }
        
        if (this.systems.cortana) {
            this.systems.cortana.processMessage("Analyze current dream state patterns");
        }
    }

    showStartMenu() {
        const menu = document.getElementById('dreamos-start-menu');
        if (menu) {
            const isVisible = menu.style.display === 'block';
            menu.style.display = isVisible ? 'none' : 'block';
            
            if (!isVisible) {
                menu.style.opacity = '0';
                menu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateY(0)';
                }, 10);
            }
        }
    }

    hideStartMenu() {
        const menu = document.getElementById('dreamos-start-menu');
        if (menu) {
            menu.style.display = 'none';
        }
    }

    toggleDreamOS() {
        const dreamOS = document.getElementById('ultimate-dreamos');
        if (dreamOS) {
            const isVisible = dreamOS.style.display === 'block';
            dreamOS.style.display = isVisible ? 'none' : 'block';
            
            if (!isVisible) {
                this.showDreamOSStartup();
            }
        }
    }

    shutdown() {
        this.hideStartMenu();
        
        // Close all system panels
        this.toggleCortana();
        this.toggleQuantumFS();
        this.toggleSynchronicity();
        
        // Hide DreamOS
        this.toggleDreamOS();
        
        console.log('🔌 DreamOS shutting down...');
    }

    // Utility methods
    getSystemStatus() {
        return {
            cortana: this.systems.cortana ? 'active' : 'inactive',
            quantumFS: this.systems.quantumFS ? 'active' : 'inactive',
            synchronicity: this.systems.synchronicity ? 'active' : 'inactive',
            mainGame: this.systems.mainGame ? 'connected' : 'disconnected'
        };
    }

    saveAllData() {
        // Save data from all systems
        if (this.systems.quantumFS && this.systems.quantumFS.saveState) {
            this.systems.quantumFS.saveState();
        }
        
        if (this.systems.synchronicity && this.systems.synchronicity.saveData) {
            this.systems.synchronicity.saveData();
        }
        
        console.log('💾 All DreamOS data saved');
    }
}

// Add CSS styles for Ultimate DreamOS
const dreamosStyles = `
    #ultimate-dreamos {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%);
        z-index: 9000;
        font-family: 'MS Sans Serif', sans-serif;
        display: none;
    }

    .dreamos-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .dreamos-desktop {
        flex: 1;
        position: relative;
        background: 
            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%),
            linear-gradient(90deg, rgba(255,255,255,0.02) 50%, transparent 50%);
        background-size: 20px 20px;
    }

    .dreamos-taskbar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(to bottom, #c0c0c0, #808080);
        border-top: 2px solid #ffffff;
        display: flex;
        align-items: center;
        padding: 0 8px;
        gap: 8px;
        z-index: 10001;
    }

    .dreamos-start-button {
        background: linear-gradient(to bottom, #e0e0e0, #c0c0c0);
        border: 2px solid #808080;
        border-right-color: #ffffff;
        border-bottom-color: #ffffff;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: bold;
        cursor: pointer;
        font-size: 12px;
        color: #000000;
        user-select: none;
    }

    .dreamos-start-button:hover {
        background: linear-gradient(to bottom, #f0f0f0, #d0d0d0);
    }

    .dreamos-start-icon {
        font-size: 14px;
    }

    .dreamos-taskbar-apps {
        display: flex;
        gap: 4px;
        flex: 1;
    }

    .dreamos-taskbar-app {
        width: 32px;
        height: 32px;
        background: linear-gradient(to bottom, #e0e0e0, #c0c0c0);
        border: 1px solid #808080;
        border-right-color: #ffffff;
        border-bottom-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
    }

    .dreamos-taskbar-app:hover {
        background: linear-gradient(to bottom, #f0f0f0, #d0d0d0);
    }

    .dreamos-taskbar-time {
        background: #c0c0c0;
        padding: 6px 12px;
        border: 1px inset #ffffff;
        font-size: 11px;
        color: #000000;
        font-family: 'Courier New', monospace;
    }

    .dreamos-desktop-icons {
        position: absolute;
        top: 20px;
        left: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
    }

    .dreamos-desktop-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        transition: all 0.2s ease;
        width: 80px;
        text-align: center;
    }

    .dreamos-desktop-icon:hover {
        background: rgba(255, 255, 255, 0.1);
        outline: 1px dotted #ffffff;
    }

    .dreamos-icon {
        font-size: 32px;
        margin-bottom: 4px;
    }

    .dreamos-icon-label {
        color: #ffffff;
        font-size: 11px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        word-wrap: break-word;
    }

    .dreamos-start-menu {
        position: fixed;
        bottom: 40px;
        left: 4px;
        width: 300px;
        background: linear-gradient(to bottom right, #c0c0c0, #808080);
        border: 2px outset #ffffff;
        border-right-color: #808080;
        border-bottom-color: #808080;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.5);
        z-index: 10002;
        display: none;
    }

    .dreamos-start-header {
        background: linear-gradient(to bottom, #003366, #006699);
        color: #ffffff;
        padding: 12px;
        text-align: center;
    }

    .dreamos-start-title {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 2px;
    }

    .dreamos-start-subtitle {
        font-size: 10px;
        opacity: 0.8;
    }

    .dreamos-start-programs {
        padding: 8px;
        max-height: 300px;
        overflow-y: auto;
    }

    .dreamos-program-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        cursor: pointer;
        border-radius: 2px;
        transition: all 0.2s ease;
    }

    .dreamos-program-item:hover {
        background: rgba(0, 102, 204, 0.3);
    }

    .dreamos-program-icon {
        font-size: 20px;
        width: 24px;
        text-align: center;
    }

    .dreamos-program-info {
        flex: 1;
    }

    .dreamos-program-name {
        color: #000000;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 2px;
    }

    .dreamos-program-desc {
        color: #666666;
        font-size: 10px;
        line-height: 1.2;
    }

    .dreamos-start-footer {
        padding: 8px;
        border-top: 1px solid #808080;
        text-align: center;
    }

    .dreamos-shutdown-btn {
        background: #ff6666;
        color: #ffffff;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        font-size: 11px;
    }

    .dreamos-shutdown-btn:hover {
        background: #ff8888;
    }

    #dreamos-channel-window {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        height: 500px;
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
        border: 3px solid #3498db;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(52, 152, 219, 0.4);
        z-index: 10003;
        overflow: hidden;
    }

    .dreamos-channel-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .dreamos-channel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        background: rgba(0, 0, 0, 0.3);
        border-bottom: 2px solid #3498db;
    }

    .dreamos-channel-title {
        color: #3498db;
        font-size: 18px;
        font-weight: bold;
    }

    .dreamos-channel-close {
        background: rgba(231, 76, 60, 0.8);
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dreamos-channels-grid {
        flex: 1;
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        overflow-y: auto;
    }

    .dreamos-channel-card {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(52, 152, 219, 0.3);
        border-radius: 8px;
        padding: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }

    .dreamos-channel-card:hover {
        background: rgba(52, 152, 219, 0.2);
        border-color: #3498db;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    }

    .dreamos-channel-icon {
        font-size: 32px;
        margin-bottom: 8px;
    }

    .dreamos-channel-name {
        color: #3498db;
        font-weight: bold;
        margin-bottom: 4px;
        font-size: 14px;
    }

    .dreamos-channel-frequency {
        color: #ecf0f1;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        margin-bottom: 8px;
    }

    .dreamos-channel-description {
        color: #bdc3c7;
        font-size: 11px;
        line-height: 1.3;
    }

    .dreamos-startup-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #000428 0%, #004e92 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 15000;
    }

    .dreamos-boot-logo {
        font-size: 120px;
        margin-bottom: 20px;
        animation: bootGlow 2s ease-in-out infinite alternate;
    }

    .dreamos-boot-text {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 8px;
        text-align: center;
    }

    .dreamos-boot-subtitle {
        font-size: 16px;
        margin-bottom: 40px;
        opacity: 0.8;
        text-align: center;
    }

    .dreamos-boot-progress {
        width: 300px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 20px;
    }

    .dreamos-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #00d2ff, #3a7bd5);
        border-radius: 10px;
        width: 0%;
        transition: width 0.8s ease;
    }

    .dreamos-boot-status {
        font-size: 14px;
        opacity: 0.8;
        text-align: center;
    }

    .dreamos-welcome-notification {
        position: fixed;
        top: 50px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        z-index: 11000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    }

    .dreamos-welcome-notification.show {
        opacity: 1;
        transform: translateX(0);
    }

    .dreamos-welcome-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .dreamos-welcome-icon {
        font-size: 24px;
    }

    .dreamos-welcome-title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 4px;
    }

    .dreamos-welcome-desc {
        font-size: 12px;
        opacity: 0.9;
    }

    @keyframes bootGlow {
        0% { 
            filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.5));
        }
        100% { 
            filter: drop-shadow(0 0 40px rgba(0, 210, 255, 0.8));
        }
    }
`;

// Inject styles
const dreamosStyleSheet = document.createElement('style');
dreamosStyleSheet.textContent = dreamosStyles;
document.head.appendChild(dreamosStyleSheet);

// Export and initialize
window.UltimateDreamOS = UltimateDreamOS;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ultimateDreamOS = new UltimateDreamOS();
    });
} else {
    window.ultimateDreamOS = new UltimateDreamOS();
}