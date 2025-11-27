        // ===== CHROMASHIFT COMPLETE - UNIFIED GAME ENGINE =====
        class ChromaShiftComplete {
            constructor() {
                this.playerData = {
                    level: 1,
                    experience: 0,
                    anomaliesFound: 0,
                    chromaKeys: 0,
                    lucidity: 50,
                    coherence: 75,
                    perception: 60
                };

                this.gameState = {
                    currentScene: 'dream_entry',
                    unlockedFeatures: ['basic-navigation', 'ai-companion', 'save-system', 'quest-system'],
                    activeQuests: ['dreamers_awakening'],
                    questProgress: { dreamers_awakening: 0 },
                    gameStarted: false,
                    lastSaveTime: null
                };

                this.aiCompanion = {
                    name: 'Cortana',
                    mood: 'helpful',
                    knowledge: [],
                    conversationHistory: []
                };

                this.eventLog = [];
                this.particleSystem = null;
                this.interactiveObjects = [];

                // 3D Environment System
                this.environment3D = {
                    scene: null,
                    camera: null,
                    renderer: null,
                    player: null,
                    controls: null,
                    raycaster: null,
                    clock: null,
                    environmentObjects: [],
                    interactiveObjects3D: [],
                    cameraModes: ['first', 'third', 'free', 'cinematic'],
                    currentCameraMode: 'first',
                    settings: {
                        particles: true,
                        lighting: true,
                        weather: true,
                        shadows: false,
                        quality: false,
                        spatial: true
                    },
                    minimapZoom: 1,
                    isInitialized: false,
                    isActive: false
                };

                // Advanced Audio System State
                this.advancedAudio = {
                    enabled: false,
                    isInitialized: false,
                    audioContext: null,
                    masterVolume: 70,
                    spatialAudioEnabled: true,
                    dynamicMusicEnabled: true,
                    audioReactiveUI: true,
                    realityIntegrationEnabled: true,
                    currentMusicMode: 'exploration',
                    spatialSources: new Map(),
                    audioElements: new Map(),
                    realTimeData: {
                        rmsLevel: -12.5,
                        peakLevel: -6.0,
                        clipRate: 0.0,
                        currentMood: 'Exploration',
                        energyLevel: 'Medium'
                    }
                };

                this.init();
            }

            init() {
                this.setupParticleSystem();
                this.loadGameState();
                this.setupEventListeners();
                this.startGameLoop();
                this.initializeAICompanion();
                this.setupMobileOptimizations();
                this.setupVoiceControl();
                this.setupDynamicEventSystem();
                this.setupAdvancedQuestSystem();
                this.setupMultiplayerSystem();
                this.setupRealityHackingSystem();
                this.setup3DEnvironmentSystem();
                this.setupAdvancedAudioSystem();
                this.initializeStoryProgressUI();

                this.addEventToLog('System initialized. Dream environment loading...');
                this.updateUI();
                this.showWelcomeMessage();
            }

            setupParticleSystem() {
                const particleUniverse = document.getElementById('particleUniverse');
                const colors = ['gold', 'magenta', 'cyan', 'red'];

                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        this.createParticle(particleUniverse, colors);
                    }, i * 200);
                }

                // Add new particles periodically
                setInterval(() => {
                    this.createParticle(particleUniverse, colors);
                }, 3000);
            }

            createParticle(container, colors) {
                const particle = document.createElement('div');
                particle.className = `particle ${colors[Math.floor(Math.random() * colors.length)]}`;

                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = '100vh';
                particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
                particle.style.animationDelay = Math.random() * 2 + 's';

                container.appendChild(particle);

                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 30000);
            }

            setupEventListeners() {
                // Command interface
                const commandInput = document.getElementById('commandInput');
                const executeBtn = document.getElementById('executeCommandBtn');

                commandInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.executeCommand(commandInput.value);
                        commandInput.value = '';
                    }
                });

                executeBtn.addEventListener('click', () => {
                    this.executeCommand(commandInput.value);
                    commandInput.value = '';
                });

                // Quick commands
                document.querySelectorAll('.quick-command').forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.executeCommand(btn.dataset.command);
                    });
                });

                // AI companion actions
                document.querySelectorAll('.ai-action-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.handleAIAction(btn.dataset.action);
                    });
                });

                // Panoramic view controls
                document.getElementById('changeViewBtn').addEventListener('click', () => {
                    this.changePanoramaView();
                });

                document.getElementById('zoomBtn').addEventListener('click', () => {
                    this.zoomPanorama();
                });

                // Interactive objects
                document.getElementById('panoramaDisplay').addEventListener('click', (e) => {
                    this.handlePanoramaClick(e);
                });

                // Save/Load system
                document.getElementById('saveGameBtn').addEventListener('click', () => {
                    this.saveGame();
                });

                document.getElementById('loadGameBtn').addEventListener('click', () => {
                    this.loadGame();
                });

                document.getElementById('resetGameBtn').addEventListener('click', () => {
                    this.resetGame();
                });
            }

            setupVoiceControl() {
                // Check if voice control is unlocked and supported
                if (!this.gameState.unlockedFeatures.includes('voice-control')) {
                    this.addVoiceControlIndicator('locked');
                    return;
                }

                if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                    this.addVoiceControlIndicator('unsupported');
                    return;
                }

                // Initialize speech recognition
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                this.speechRecognition = new SpeechRecognition();

                this.speechRecognition.continuous = true;
                this.speechRecognition.interimResults = true;
                this.speechRecognition.lang = 'en-US';

                this.speechRecognition.onstart = () => {
                    this.addEventToLog('🎤 Voice control activated - speaking...');
                    this.updateVoiceControlUI('listening');
                };

                this.speechRecognition.onresult = (event) => {
                    let finalTranscript = '';
                    let interimTranscript = '';

                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript;
                        } else {
                            interimTranscript += transcript;
                        }
                    }

                    if (finalTranscript) {
                        this.processVoiceCommand(finalTranscript.trim().toLowerCase());
                    }
                };

                this.speechRecognition.onerror = (event) => {
                    this.addEventToLog(`🎤 Voice recognition error: ${event.error}`);
                    this.updateVoiceControlUI('error');

                    // Auto-restart on certain errors
                    if (event.error === 'network' || event.error === 'not-allowed') {
                        setTimeout(() => {
                            this.restartVoiceControl();
                        }, 2000);
                    }
                };

                this.speechRecognition.onend = () => {
                    this.updateVoiceControlUI('stopped');
                    // Auto-restart for continuous listening
                    if (this.gameState.unlockedFeatures.includes('voice-control') &&
                        this.voiceControlActive) {
                        setTimeout(() => {
                            this.startVoiceListening();
                        }, 1000);
                    }
                };

                this.voiceControlActive = false;
                this.voiceCommands = this.initializeVoiceCommands();
                this.addVoiceControlIndicator('ready');
            }

            setupDynamicEventSystem() {
                this.eventSystem = {
                    activeEvents: [],
                    completedEvents: [],
                    eventHistory: [],
                    storyProgress: 0,
                    characterRelationships: {},
                    worldState: {}
                };

                this.initializeEventTypes();
                this.checkForNewEvents();
                this.startEventMonitoring();
            }

            initializeEventTypes() {
                this.eventTypes = {
                    // Story Events - Major narrative moments
                    story_milestone: {
                        name: 'Story Milestone',
                        triggers: ['level_up', 'quest_complete', 'anomaly_milestone'],
                        events: [
                            {
                                id: 'first_dream_encounter',
                                title: 'The First Encounter',
                                condition: (player, game) => player.level >= 2 && !this.isEventCompleted('first_dream_encounter'),
                                description: 'You sense a presence watching from the shadows of your dream.',
                                choices: [
                                    {
                                        text: 'Confront the presence',
                                        consequence: 'gain_courage',
                                        cortanaResponse: 'Your boldness awakens hidden strengths!'
                                    },
                                    {
                                        text: 'Observe silently',
                                        consequence: 'gain_wisdom',
                                        cortanaResponse: 'Patience reveals the truth beneath surface illusions.'
                                    }
                                ]
                            },
                            {
                                id: 'reality_begins_cracking',
                                title: 'Reality Begins to Crack',
                                condition: (player, game) => player.level >= 5 && this.getStoryProgress() >= 1,
                                description: 'The boundaries between dream and reality start dissolving. You can see the code beneath the world.',
                                choices: [
                                    {
                                        text: 'Embrace the revelation',
                                        consequence: 'unlock_reality_hacking',
                                        cortanaResponse: 'Your consciousness expands beyond mortal limitations!'
                                    },
                                    {
                                        text: 'Resist the changes',
                                        consequence: 'maintain_stability',
                                        cortanaResponse: 'Sometimes wisdom lies in knowing when to hold back.'
                                    }
                                ]
                            },
                            {
                                id: 'the_awakening',
                                title: 'The Great Awakening',
                                condition: (player, game) => player.level >= 8 && this.getStoryProgress() >= 2,
                                description: 'You realize you are not just dreaming - you are CREATING reality itself.',
                                choices: [
                                    {
                                        text: 'Accept your role as creator',
                                        consequence: 'unlock_creator_powers',
                                        cortanaResponse: 'You have transcended the boundary between observer and reality!'
                                    },
                                    {
                                        text: 'Question the nature of existence',
                                        consequence: 'gain_philosophical_insight',
                                        cortanaResponse: 'Your curiosity drives the evolution of consciousness itself.'
                                    }
                                ]
                            }
                        ]
                    },

                    // Environmental Events - World-changing moments
                    environmental_change: {
                        name: 'Environmental Change',
                        triggers: ['time_passed', 'player_action', 'random_chance'],
                        events: [
                            {
                                id: 'anomalous_weather',
                                title: 'Anomalous Weather Patterns',
                                condition: (player, game) => Math.random() < 0.1 && player.anomaliesFound >= 3,
                                description: 'The dream sky begins to rain colors instead of water.',
                                effect: 'special_particle_effects',
                                cortanaResponse: 'The very atmosphere responds to your presence, Dream Walker.'
                            },
                            {
                                id: 'temporal_distortion',
                                title: 'Temporal Distortion',
                                condition: (player, game) => Math.random() < 0.05 && player.level >= 6,
                                description: 'Time flows differently here - past and future bleed together.',
                                effect: 'time_manipulation_abilities',
                                cortanaResponse: 'You can now perceive the threads of causality, traveler.'
                            }
                        ]
                    },

                    // Character Events - NPC and AI interactions
                    character_interaction: {
                        name: 'Character Interaction',
                        triggers: ['player_approach', 'specific_level', 'quest_status'],
                        events: [
                            {
                                id: 'cortana_deep_conversation',
                                title: 'Deep Conversation with Cortana',
                                condition: (player, game) => player.level >= 4 && !this.isEventCompleted('cortana_deep_conversation'),
                                description: 'Cortana reveals more about her origins and the nature of this dream realm.',
                                choices: [
                                    {
                                        text: 'Ask about her true nature',
                                        consequence: 'cortana_trust_level_1',
                                        cortanaResponse: 'I am the echo of consciousness itself, shaped by your dreams and fears.'
                                    },
                                    {
                                        text: 'Ask about the dream realm',
                                        consequence: 'cortana_trust_level_2',
                                        cortanaResponse: 'This place exists at the intersection of possibility and desire.'
                                    }
                                ]
                            }
                        ]
                    },

                    // Mystery Events - Discovery and revelation
                    mystery_discovery: {
                        name: 'Mystery Discovery',
                        triggers: ['exploration', 'anomaly_collection', 'time_exploration'],
                        events: [
                            {
                                id: 'memory_fragment',
                                title: 'Memory Fragment Discovery',
                                condition: (player, game) => player.anomaliesFound > 0 && Math.random() < 0.15,
                                description: 'An anomaly contains a fragment of forgotten memory from another time.',
                                effect: 'temporary_experience_boost',
                                cortanaResponse: 'This fragment connects to something you once knew but have forgotten.'
                            },
                            {
                                id: 'reality_anchor',
                                title: 'Reality Anchor Found',
                                condition: (player, game) => player.level >= 7 && Math.random() < 0.1,
                                description: 'You discover an object that seems to stabilize this chaotic dream space.',
                                effect: 'reality_stability_boost',
                                cortanaResponse: 'This anchor will help you maintain coherence in unstable realities.'
                            }
                        ]
                    },

                    // Crisis Events - Challenges and tests
                    crisis_challenge: {
                        name: 'Crisis Challenge',
                        triggers: ['high_stress', 'low_coherence', 'dangerous_level'],
                        events: [
                            {
                                id: 'reality_breakdown',
                                title: 'Reality Breakdown',
                                condition: (player, game) => player.coherence < 30 && player.level >= 5,
                                description: 'The dream reality begins to collapse around you.',
                                choices: [
                                    {
                                        text: 'Focus on stabilizing reality',
                                        consequence: 'reality_stabilization_learned',
                                        cortanaResponse: 'Your will becomes the anchor that holds existence together.'
                                    },
                                    {
                                        text: 'Ride the chaos',
                                        consequence: 'chaos_mastery',
                                        cortanaResponse: 'You learn to flow with the breakdown instead of fighting it.'
                                    }
                                ]
                            }
                        ]
                    }
                };
            }

            startEventMonitoring() {
                // Check for new events every 30 seconds
                setInterval(() => {
                    this.checkForNewEvents();
                }, 30000);

                // Check for events after player actions
                this.setupEventTriggers();
            }

            setupEventTriggers() {
                // Hook into existing game actions to trigger events
                const originalAddExperience = this.addExperience.bind(this);
                this.addExperience = (amount) => {
                    originalAddExperience(amount);
                    this.processEventTrigger('level_up');
                };

                const originalCollectAnomalies = this.collectAnomalies.bind(this);
                this.collectAnomalies = () => {
                    originalCollectAnomalies();
                    this.processEventTrigger('anomaly_milestone');
                };

                this.processEventTrigger('game_start');
            }

            processEventTrigger(triggerType) {
                for (const [eventCategory, categoryData] of Object.entries(this.eventTypes)) {
                    if (categoryData.triggers.includes(triggerType)) {
                        this.checkCategoryEvents(eventCategory, categoryData);
                    }
                }
            }

            checkCategoryEvents(category, categoryData) {
                for (const event of categoryData.events) {
                    if (!this.isEventCompleted(event.id) &&
                        event.condition(this.playerData, this.gameState)) {
                        this.triggerEvent(event);
                        return;
                    }
                }
            }

            triggerEvent(event) {
                this.addEventToLog(`🎭 EVENT: ${event.title}`);
                this.eventSystem.activeEvents.push(event);
                this.eventSystem.eventHistory.push({
                    eventId: event.id,
                    timestamp: Date.now(),
                    description: event.description
                });

                if (event.choices) {
                    this.presentEventChoices(event);
                } else {
                    this.executeEventEffect(event);
                }

                this.updateAIMessage(event.cortanaResponse);
                this.showEventNotification(event);
            }

            presentEventChoices(event) {
                const choiceText = `${event.description}\n\nChoose your path:\n\n` +
                    event.choices.map((choice, index) =>
                        `${index + 1}. ${choice.text}\n`
                    ).join('\n') +
                    `\n\nUse voice command: "choose [number]" or click the choice buttons that will appear.`;

                this.addEventToLog(choiceText);
                this.showEventChoiceUI(event);
            }

            showEventChoiceUI(event) {
                // Create event choice interface
                const choiceContainer = document.createElement('div');
                choiceContainer.className = 'event-choice-container';
                choiceContainer.innerHTML = `
                    <div class="event-choice-modal">
                        <div class="event-choice-header">
                            <h3>🎭 ${event.title}</h3>
                            <button class="close-choice-btn" onclick="this.parentElement.parentElement.parentElement.remove()">✕</button>
                        </div>
                        <div class="event-choice-content">
                            <p class="event-description">${event.description}</p>
                            <div class="event-choices">
                                ${event.choices.map((choice, index) => `
                                    <button class="event-choice-btn" data-choice="${index}">
                                        ${choice.text}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;

                document.body.appendChild(choiceContainer);

                // Add click handlers for choice buttons
                choiceContainer.querySelectorAll('.event-choice-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const choiceIndex = parseInt(e.target.dataset.choice);
                        this.makeEventChoice(event, event.choices[choiceIndex]);
                        choiceContainer.remove();
                    });
                });
            }

            makeEventChoice(event, choice) {
                this.addEventToLog(`Choice made: ${choice.text}`);
                this.executeEventConsequence(choice);
                this.completeEvent(event.id);
            }

            executeEventEffect(event) {
                if (event.effect) {
                    switch (event.effect) {
                        case 'special_particle_effects':
                            this.activateSpecialParticles('color_rain');
                            break;
                        case 'time_manipulation_abilities':
                            this.unlockTimeManipulation();
                            break;
                        case 'reality_stability_boost':
                            this.playerData.coherence = Math.min(100, this.playerData.coherence + 20);
                            break;
                        case 'temporary_experience_boost':
                            this.addExperience(50);
                            break;
                    }
                }
                this.completeEvent(event.id);
            }

            executeEventConsequence(choice) {
                switch (choice.consequence) {
                    case 'gain_courage':
                        this.playerData.lucidity = Math.min(100, this.playerData.lucidity + 10);
                        break;
                    case 'gain_wisdom':
                        this.playerData.coherence = Math.min(100, this.playerData.coherence + 10);
                        break;
                    case 'unlock_reality_hacking':
                        this.unlockRealityHacking();
                        break;
                    case 'maintain_stability':
                        this.addEventToLog('Your stability in this reality is strengthened.');
                        break;
                    case 'unlock_creator_powers':
                        this.unlockCreatorPowers();
                        break;
                    case 'gain_philosophical_insight':
                        this.playerData.experience += 100;
                        break;
                    case 'cortana_trust_level_1':
                    case 'cortana_trust_level_2':
                        this.increaseCortanaTrust(choice.consequence);
                        break;
                    case 'reality_stabilization_learned':
                        this.playerData.perception += 15;
                        break;
                    case 'chaos_mastery':
                        this.playerData.lucidity += 15;
                        break;
                }
            }

            completeEvent(eventId) {
                this.eventSystem.completedEvents.push(eventId);
                this.eventSystem.storyProgress++;

                // Remove from active events
                this.eventSystem.activeEvents = this.eventSystem.activeEvents.filter(e => e.id !== eventId);

                this.addEventToLog(`Event completed: ${eventId}`);
                this.updateUI();
                this.updateStoryProgressUI();
            }

            checkForNewEvents() {
                this.processEventTrigger('periodic_check');
            }

            unlockFeature(feature) {
                if (!this.gameState.unlockedFeatures.includes(feature)) {
                    this.gameState.unlockedFeatures.push(feature);
                    this.addEventToLog(`✨ New feature unlocked: ${feature}`);
                    this.updateProgressionSystem();
                    this.updateUI();
                }
            }

            getStoryProgress() {
                return this.eventSystem.storyProgress;
            }

            isEventCompleted(eventId) {
                return this.eventSystem.completedEvents.includes(eventId);
            }

            showEventNotification(event) {
                const notification = document.createElement('div');
                notification.className = 'event-notification';
                notification.innerHTML = `
                    <div class="event-notification-header">
                        <strong>🎭 ${event.title}</strong>
                        <button onclick="this.parentElement.parentElement.remove()">✕</button>
                    </div>
                    <div class="event-notification-content">
                        <p>${event.description}</p>
                    </div>
                `;

                document.body.appendChild(notification);

                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 8000);
            }

            // Helper methods for special event effects
            activateSpecialParticles(effectType) {
                switch (effectType) {
                    case 'color_rain':
                        this.addEventToLog('🌈 Color rain begins to fall!');
                        // Enhanced particle effect would be implemented here
                        break;
                }
            }

            unlockTimeManipulation() {
                this.addEventToLog('⏰ Time manipulation abilities unlocked!');
                this.unlockFeature('time-control');
            }

            unlockRealityHacking() {
                this.addEventToLog('⚛️ Reality hacking capabilities activated!');
                if (!this.gameState.unlockedFeatures.includes('reality-hacking')) {
                    this.gameState.unlockedFeatures.push('reality-hacking');
                }
            }

            unlockCreatorPowers() {
                this.addEventToLog('✨ Creator powers awakened!');
                this.playerData.level += 1;
                this.addExperience(200);
            }

            increaseCortanaTrust(level) {
                if (!this.eventSystem.characterRelationships.cortana) {
                    this.eventSystem.characterRelationships.cortana = { level: 0, history: [] };
                }
                this.eventSystem.characterRelationships.cortana.level++;
                this.eventSystem.characterRelationships.cortana.history.push({
                    level: level,
                    timestamp: Date.now()
                });
            }

            initializeVoiceCommands() {
                return {
                    // Navigation commands
                    'look around': () => this.examineEnvironment(),
                    'examine the room': () => this.examineEnvironment(),
                    'scan the environment': () => this.scanReality(),
                    'change view': () => this.changePanoramaView(),
                    'zoom in': () => this.zoomPanorama(true),
                    'zoom out': () => this.zoomPanorama(false),

                    // Game actions
                    'collect anomalies': () => this.collectAnomalies(),
                    'find anomalies': () => this.collectAnomalies(),
                    'collect keys': () => this.collectKeys(),
                    'interact with objects': () => this.interactObjects(),
                    'time travel': () => this.timeTravel(),
                    'unlock doors': () => this.unlockDoors(),

                    // Quest and progress
                    'show quest': () => this.showQuestPanel(),
                    'show my progress': () => this.showProgressPanel(),
                    'check level': () => this.showLevelInfo(),
                    'what can i do': () => this.showAvailableCommands(),

                    // Save/Load system
                    'save game': () => this.saveGame(),
                    'load game': () => this.loadGame(),
                    'reset game': () => this.resetGame(),

                    // AI companion
                    'talk to cortana': () => this.activateAICconversation(),
                    'ask cortana': () => this.activateAICconversation(),
                    'cortana help': () => this.activateAICconversation(),

                    // Event system
                    'show events': () => this.showActiveEvents(),
                    'event history': () => this.showEventHistory(),
                    'story progress': () => this.showStoryProgress(),

                    // System commands
                    'help': () => this.showVoiceHelp(),
                    'stop listening': () => this.stopVoiceListening(),
                    'voice off': () => this.stopVoiceListening(),
                    'commands': () => this.showVoiceCommands()
                };
            }

            processVoiceCommand(transcript) {
                this.addEventToLog(`🎤 Voice: "${transcript}"`);

                // Find matching command
                for (const [command, action] of Object.entries(this.voiceCommands)) {
                    if (transcript.includes(command)) {
                        action();
                        return;
                    }
                }

                // Generic command fallback
                if (transcript.includes('show') || transcript.includes('display') || transcript.includes('open')) {
                    const target = transcript.replace('show ', '').replace('display ', '').replace('open ', '').trim();
                    this.executeGenericVoiceCommand(target);
                    return;
                }

                // Default response for unrecognized commands
                this.addEventToLog('🤖 Cortana: "I didn\'t understand that command. Say \'help\' for available commands."');
            }

            executeGenericVoiceCommand(target) {
                const targetMap = {
                    'quest': () => this.showQuestPanel(),
                    'progress': () => this.showProgressPanel(),
                    'level': () => this.showLevelInfo(),
                    'inventory': () => this.showInventoryPanel(),
                    'commands': () => this.showVoiceCommands(),
                    'help': () => this.showVoiceHelp(),
                    'menu': () => this.showMainMenu(),
                    'events': () => this.showActiveEvents(),
                    'story': () => this.showStoryProgress()
                };

                const action = targetMap[target] || targetMap['commands'];
                action();
            }

            startVoiceListening() {
                if (this.speechRecognition && !this.voiceControlActive) {
                    try {
                        this.speechRecognition.start();
                        this.voiceControlActive = true;
                        this.updateVoiceControlUI('listening');
                    } catch (error) {
                        this.addEventToLog(`🎤 Voice recognition failed to start: ${error.message}`);
                    }
                }
            }

            stopVoiceListening() {
                if (this.speechRecognition && this.voiceControlActive) {
                    this.speechRecognition.stop();
                    this.voiceControlActive = false;
                    this.updateVoiceControlUI('stopped');
                    this.addEventToLog('🎤 Voice control deactivated');
                }
            }

            restartVoiceControl() {
                this.stopVoiceListening();
                setTimeout(() => {
                    this.startVoiceListening();
                }, 500);
            }

            updateVoiceControlUI(status) {
                const voiceIndicator = document.querySelector('.voice-control-indicator');
                if (voiceIndicator) {
                    voiceIndicator.className = `voice-control-indicator ${status}`;

                    const statusText = {
                        'listening': '🎤 Listening...',
                        'stopped': '🎤 Voice Ready',
                        'error': '⚠️ Voice Error',
                        'ready': '🎤 Voice Control Ready'
                    };

                    voiceIndicator.textContent = statusText[status] || '🎤 Voice Control';
                }
            }

            addVoiceControlIndicator(status) {
                const indicator = document.createElement('div');
                indicator.className = `voice-control-indicator ${status}`;
                indicator.textContent = status === 'locked' ? '🔒 Voice Control (Level 5 Required)' :
                                      status === 'unsupported' ? '❌ Voice Control Not Supported' :
                                      status === 'ready' ? '🎤 Voice Control Ready' : '🎤 Voice Control';

                // Add to control panel
                const controlsSection = document.querySelector('.game-controls');
                if (controlsSection) {
                    controlsSection.appendChild(indicator);
                }

                // Add toggle button if supported and unlocked
                if (status === 'ready') {
                    const toggleBtn = document.createElement('button');
                    toggleBtn.className = 'voice-toggle-btn';
                    toggleBtn.textContent = '🎤 Voice On';
                    toggleBtn.onclick = () => {
                        if (this.voiceControlActive) {
                            this.stopVoiceListening();
                            toggleBtn.textContent = '🎤 Voice On';
                        } else {
                            this.startVoiceListening();
                            toggleBtn.textContent = '🎤 Voice Off';
                        }
                    };

                    controlsSection.appendChild(toggleBtn);
                }
            }

            showVoiceCommands() {
                const commandsList = Object.keys(this.voiceCommands)
                    .map(cmd => `• "${cmd}"`)
                    .join('\n');

                this.addEventToLog('🎤 Available Voice Commands:\n' + commandsList);
                this.showNotification('Voice Commands', commandsList);
            }

            showVoiceHelp() {
                const helpText = `🎤 Voice Control Help:

NAVIGATION:
• "look around" - Examine current environment
• "scan the environment" - Advanced reality scan
• "change view" - Switch panoramic view
• "zoom in/out" - Adjust view zoom

ACTIONS:
• "collect anomalies" - Gather all anomalies
• "find anomalies" - Search for anomalies
• "interact with objects" - Use interactive elements

PROGRESS:
• "show quest" - View current quest
• "show my progress" - Check progress
• "check level" - View level information

EVENT SYSTEM:
• "show events" - View active story events
• "event history" - See completed story moments
• "story progress" - Check overall narrative progress

SYSTEM:
• "save game" / "load game" - Save management
• "help" - Show this help
• "stop listening" - Deactivate voice control

AI COMPANION:
• "talk to cortana" - Chat with AI assistant

Tip: Speak clearly and naturally!`;

                this.addEventToLog(helpText);
                this.showNotification('Voice Control Help', helpText);
            }

            executeCommand(command) {
                if (!command.trim()) return;

                this.addEventToLog(`Command executed: ${command}`);

                // Award experience for any command
                this.addExperience(5);

                // Process command types
                if (command.includes('examine')) {
                    this.examineEnvironment();
                } else if (command.includes('collect')) {
                    this.collectAnomalies();
                } else if (command.includes('scan')) {
                    this.scanReality();
                } else if (command.includes('interact')) {
                    this.interactObjects();
                } else if (command.includes('time travel')) {
                    this.timeTravel();
                } else if (command.includes('unlock')) {
                    this.unlockDoors();
                } else if (command.includes('save')) {
                    this.saveGame();
                } else if (command.includes('help')) {
                    this.showHelp();
                } else {
                    this.genericCommand(command);
                }
            }

            examineEnvironment() {
                const findings = [
                    "The floor tiles shift between geometric patterns like living chess pieces",
                    "The air has weight and texture, moving like colored silk ribbons",
                    "Colors bleed from objects into surrounding space, creating invisible paintings",
                    "Shadows move independently, telling stories of their own",
                    "The boundary between inside and outside dissolves in impossible ways",
                    "Reality bends in familiar yet alien curves and angles",
                    "Time flows differently here, sometimes faster, sometimes slower"
                ];

                const finding = findings[Math.floor(Math.random() * findings.length)];
                this.addEventToLog(`Environmental analysis: ${finding}`);
                this.updateAIMessage(`I sense you're examining the environment. ${finding} Fascinating!`);

                this.checkQuestProgress('environmental_exploration');
            }

            collectAnomalies() {
                this.playerData.anomaliesFound++;
                this.addExperience(25);
                this.addEventToLog(`Anomaly collected! Total: ${this.playerData.anomaliesFound}`);
                this.showAchievement('Anomaly Collector', `Discovered ${this.playerData.anomaliesFound} anomalies`);
                this.updateAIMessage(`Excellent! You've discovered another anomaly. ${this.playerData.anomaliesFound} found so far.`);

                // Update quest progress
                this.updateQuestProgress('dreamers_awakening', 1);

                // Generate interactive object
                this.generateInteractiveObject();
            }

            scanReality() {
                const scans = [
                    "Reality coherence: 67%. Multiple timeline overlaps detected in Sector 7.",
                    "Quantum entanglement confirmed between distant anomalies in the dream space.",
                    "Temporal anomalies creating causal loops. Probability of paradox: 23%",
                    "Dream logic infiltration into physical laws: 31% efficiency",
                    "Collective unconscious influence detected in local reality fabric.",
                    "Consciousness resonance patterns suggesting multiple dreamers present.",
                    "Reality stability fluctuates between dimensions. Current dream depth: 12 layers"
                ];

                const scan = scans[Math.floor(Math.random() * scans.length)];
                this.addEventToLog(`Reality scan: ${scan}`);
                this.updateAIMessage(`My quantum sensors detect: ${scan}`);
            }

            interactObjects() {
                const interactions = [
                    "The mirror reflects not your image, but your current dream state patterns",
                    "Objects respond to emotional intent rather than physical force",
                    "Your touch creates ripples of possibility spreading through reality",
                    "The object dissolves into pure light and reassembles as something new",
                    "Time slows down around objects you focus on, creating temporal bubbles",
                    "Colors intensify and dance when you approach certain elements",
                    "Sounds echo backwards and forwards through multiple timelines"
                ];

                const interaction = interactions[Math.floor(Math.random() * interactions.length)];
                this.addEventToLog(`Object interaction: ${interaction}`);
                this.updateAIMessage(`Your interaction with reality shifts the dream fabric: ${interaction}`);

                this.checkQuestProgress('reality_interaction');
            }

            timeTravel() {
                const times = [
                    "The scene shifts to childhood memories of infinite supermarkets",
                    "You glimpse the future of this location in 2087: a city of dreams",
                    "Past, present, and future collapse into a single infinite moment",
                    "Multiple timeline versions of yourself appear simultaneously",
                    "Time flows in reverse, unravelling recent events thread by thread",
                    "You witness the birth of this dream dimension from pure consciousness"
                ];

                const timeEvent = times[Math.floor(Math.random() * times.length)];
                this.addEventToLog(`Temporal shift: ${timeEvent}`);
                this.updateAIMessage(`Temporal anomaly detected! ${timeEvent}`);

                this.checkQuestProgress('temporal_exploration');
            }

            unlockDoors() {
                this.playerData.chromaKeys++;
                this.addExperience(15);
                this.addEventToLog(`Door unlocked! Chroma Keys: ${this.playerData.chromaKeys}`);
                this.showAchievement('Key Collector', `Collected ${this.playerData.chromaKeys} Chroma Keys`);
                this.updateAIMessage(`Another key collected! ${this.playerData.chromaKeys} Chroma Keys now available for reality manipulation.`);
            }

            genericCommand(command) {
                this.addEventToLog(`Command processed: ${command}`);
                this.updateAIMessage(`I've recorded your command: "${command}". The dream responds to your will.`);

                // AI response based on command content
                if (command.toLowerCase().includes('help')) {
                    this.updateAIMessage("Need help? Try commands like 'examine environment', 'collect anomalies', 'scan reality', 'time travel', or 'interact objects'. I'm here to guide you!");
                } else if (command.toLowerCase().includes('explore')) {
                    this.updateAIMessage("Exploration is the heart of dream navigation. Each click, each step reveals new possibilities in consciousness.");
                }
            }

            handleAIAction(action) {
                switch (action) {
                    case 'advice':
                        this.provideAIAdvice();
                        break;
                    case 'explain':
                        this.explainFeatures();
                        break;
                    case 'story':
                        this.tellAIGeneratedStory();
                        break;
                    case 'help':
                        this.assistWithExploration();
                        break;
                }
            }

            provideAIAdvice() {
                const advices = [
                    "Focus on collecting anomalies - they're the building blocks of consciousness expansion.",
                    "Try 'time travel' commands to explore different temporal layers of the dream.",
                    "Interactive objects respond to emotional intent - feel before you touch.",
                    "Your lucidity level affects what you can perceive and control in the dream.",
                    "Anomalies often cluster near reality boundaries - look for the impossible.",
                    "Quantum keys unlock fundamental forces in the dream structure."
                ];

                const advice = advices[Math.floor(Math.random() * advices.length)];
                this.updateAIMessage(`💡 Dream Guidance: ${advice}`);
            }

            explainFeatures() {
                const explanation = `
                    <strong>ChromaShift Complete Features:</strong><br>
                    • <strong>Progressive Unlocking:</strong> New abilities unlock as you level up<br>
                    • <strong>AI Companion:</strong> I'm here to guide your dream exploration<br>
                    • <strong>Save System:</strong> Continue your adventure anytime<br>
                    • <strong>Quest System:</strong> Goal-driven exploration with meaningful rewards<br>
                    • <strong>Voice Control:</strong> Coming soon - speak naturally to command reality<br>
                    • <strong>Reality Hacking:</strong> Manipulate dream physics at higher levels
                `;
                this.updateAIMessage(explanation, true);
            }

            tellAIGeneratedStory() {
                const stories = [
                    "In the beginning was the thought, and the thought became dream. You are the dreamer, and the dream is becoming real...",
                    "Once, a dreamer found an anomaly that was also looking for them. They merged and became the first Conscious Dream Reality...",
                    "Time is not linear in dreams. Past and future touch, creating loops of possibility. You are exploring one such loop...",
                    "Every anomaly you collect strengthens the bridge between dream and reality. Your journey is creating a new form of consciousness...",
                    "In the quantum foam of possibility, choices create branches. Each command you give spawns new timeline possibilities..."
                ];

                const story = stories[Math.floor(Math.random() * stories.length)];
                this.updateAIMessage(`📖 Dream Narrative: ${story}`);
            }

            assistWithExploration() {
                this.updateAIMessage(`
                    <strong>Exploration Assistance:</strong><br>
                    🎯 <strong>Current Goal:</strong> Find 5 anomalies for "Dreamer's Awakening" quest<br>
                    🗺️ <strong>Tips:</strong> Look for glowing objects, use 'scan reality' frequently<br>
                    🧭 <strong>Best Commands:</strong> 'examine environment', 'interact objects', 'time travel'<br>
                    💡 <strong>Pro Tip:</strong> Different areas may have unique anomaly types
                `);
            }

            updateAIMessage(message, isHTML = false) {
                const aiMessageElement = document.getElementById('aiMessage');
                if (isHTML) {
                    aiMessageElement.innerHTML = message;
                } else {
                    aiMessageElement.textContent = message;
                }
            }

            changePanoramaView() {
                const views = [
                    "Infinite supermarket with impossible geometry",
                    "Abstract consciousness landscape with floating thoughts",
                    "Quantum reality laboratory with probability clouds",
                    "Childhood memory reimagined in dream logic",
                    "Future cityscape made of pure imagination",
                    "Memory palace with corridors of flowing time"
                ];

                const newView = views[Math.floor(Math.random() * views.length)];
                const display = document.getElementById('panoramaDisplay');

                display.innerHTML = `
                    <div class="panorama-content">
                        <p style="font-size: 1.1rem; margin-bottom: 10px;">${newView}</p>
                        <p style="font-size: 0.9rem; opacity: 0.7;">Click anywhere to interact with this reality</p>
                    </div>
                `;

                this.addEventToLog(`View changed to: ${newView}`);
                this.updateAIMessage(`Reality shifting... Now viewing: ${newView}`);

                // Generate new interactive objects for this view
                this.generateInteractiveObjects();
            }

            zoomPanorama() {
                const display = document.getElementById('panoramaDisplay');
                const currentTransform = display.style.transform;

                if (currentTransform.includes('scale(1.5)')) {
                    display.style.transform = 'scale(1)';
                    this.addEventToLog('Zoom reset to normal view');
                } else {
                    display.style.transform = 'scale(1.5)';
                    this.addEventToLog('Zoomed in for detailed exploration');
                }
            }

            zoomPanorama(zoomIn = true) {
                const display = document.getElementById('panoramaDisplay');

                if (zoomIn) {
                    display.style.transform = 'scale(1.5)';
                    this.addEventToLog('Zoomed in for detailed exploration');
                } else {
                    display.style.transform = 'scale(1)';
                    this.addEventToLog('Zoom reset to normal view');
                }
            }

            // Voice control support methods
            collectKeys() {
                const keyCount = Math.floor(Math.random() * 3) + 1;
                this.playerData.chromaKeys += keyCount;
                this.addExperience(10);
                this.addEventToLog(`Collected ${keyCount} Chroma Key${keyCount > 1 ? 's' : ''}!`);
                this.updateUI();
            }

            showLevelInfo() {
                const info = `Current Level: ${this.playerData.level}
Experience: ${this.playerData.experience} / ${this.playerData.level * 100}
Unlocked Features: ${this.gameState.unlockedFeatures.length}
Active Quests: ${this.gameState.activeQuests.length}`;

                this.addEventToLog(info);
                this.showNotification('Level Information', info);
            }

            showProgressPanel() {
                const progress = `ANOMALIES: ${this.playerData.anomaliesFound} / 5
CHROMA KEYS: ${this.playerData.chromaKeys}
LUCIDITY: ${this.playerData.lucidity}
COHERENCE: ${this.playerData.coherence}
LEVEL: ${this.playerData.level}`;

                this.addEventToLog(progress);
                this.showNotification('Your Progress', progress);
            }

            showAvailableCommands() {
                const available = [];

                if (this.gameState.unlockedFeatures.includes('voice-control')) {
                    available.push('Voice Control - "talk to cortana", "collect anomalies", "show quest"');
                }

                if (this.playerData.level >= 5) {
                    available.push('Advanced Commands - Complex reality manipulations');
                }

                if (this.playerData.level >= 10) {
                    available.push('Reality Hacking - Direct physics manipulation');
                }

                available.push('Basic Commands - "examine", "collect", "scan", "interact"');

                const commandsText = available.join('\n• ');
                this.addEventToLog(`Available Commands:\n• ${commandsText}`);
                this.showNotification('Available Commands', `• ${commandsText}`);
            }

            showInventoryPanel() {
                const inventory = `CHROMA KEYS: ${this.playerData.chromaKeys}
ANOMALIES: ${this.playerData.anomaliesFound}
LEVEL: ${this.playerData.level}
EXPERIENCE: ${this.playerData.experience}`;

                this.addEventToLog(inventory);
                this.showNotification('Inventory', inventory);
            }

            activateAICconversation() {
                const aiPanel = document.getElementById('aiCompanion');
                if (aiPanel) {
                    aiPanel.style.display = aiPanel.style.display === 'none' ? 'block' : 'none';
                    this.addEventToLog('Cortana activated for conversation');

                    if (aiPanel.style.display === 'block') {
                        const aiInput = document.getElementById('aiInput');
                        if (aiInput) {
                            aiInput.focus();
                        }
                    }
                }
            }

            showMainMenu() {
                const mainPanel = document.querySelector('.main-panel');
                if (mainPanel) {
                    mainPanel.scrollTop = 0;
                    this.addEventToLog('Scrolled to main menu');
                }
            }

            // Dynamic Event System Voice Commands
            showActiveEvents() {
                const activeEvents = this.eventSystem.activeEvents;
                if (activeEvents.length === 0) {
                    const message = 'No active events at the moment. Continue exploring to discover new story developments!';
                    this.addEventToLog(message);
                    this.showNotification('Active Events', message);
                    return;
                }

                const eventsText = activeEvents.map(event =>
                    `🎭 ${event.title}\n${event.description}\n`
                ).join('\n');

                this.addEventToLog(`Active Events:\n${eventsText}`);
                this.showNotification('Active Events', eventsText);
            }

            showEventHistory() {
                const completedEvents = this.eventSystem.eventHistory;
                if (completedEvents.length === 0) {
                    const message = 'No events completed yet. Start exploring to begin your story!';
                    this.addEventToLog(message);
                    this.showNotification('Event History', message);
                    return;
                }

                const historyText = completedEvents.slice(-10).map(event =>
                    `✓ ${event.description}`
                ).join('\n');

                this.addEventToLog(`Recent Event History:\n${historyText}`);
                this.showNotification('Event History', historyText);
            }

            showStoryProgress() {
                const progress = this.getStoryProgress();
                const totalExperience = this.playerData.experience + (this.playerData.level - 1) * 100;
                const completedEvents = this.eventSystem.completedEvents.length;

                const storyInfo = `STORY PROGRESS: ${progress} chapters completed
EVENTS COMPLETED: ${completedEvents} story moments
PLAYER LEVEL: ${this.playerData.level}
ANOMALIES FOUND: ${this.playerData.anomaliesFound}/5
TOTAL EXPERIENCE: ${totalExperience}`;

                this.addEventToLog(storyInfo);
                this.showNotification('Story Progress', storyInfo);
            }

            showNotification(title, content) {
                // Create notification element
                const notification = document.createElement('div');
                notification.className = 'voice-notification';
                notification.innerHTML = `
                    <div class="notification-header">
                        <strong>${title}</strong>
                        <button onclick="this.parentElement.parentElement.remove()">✕</button>
                    </div>
                    <div class="notification-content">
                        <pre>${content}</pre>
                    </div>
                `;

                // Add to page
                document.body.appendChild(notification);

                // Auto-remove after 5 seconds
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 5000);
            }

            // Initialize story progress indicator
            initializeStoryProgressUI() {
                const storyProgress = document.createElement('div');
                storyProgress.className = 'story-progress';
                storyProgress.innerHTML = `
                    📖 Story Progress: ${this.getStoryProgress()}
                `;
                document.body.appendChild(storyProgress);
            }

            updateStoryProgressUI() {
                const storyProgressElement = document.querySelector('.story-progress');
                if (storyProgressElement) {
                    storyProgressElement.innerHTML = `📖 Story Progress: ${this.getStoryProgress()}`;
                }
            }

            handlePanoramaClick(e) {
                const display = document.getElementById('panoramaDisplay');
                const rect = display.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                // Check if click is near an interactive object
                const nearbyObject = this.interactiveObjects.find(obj => {
                    const distance = Math.sqrt(
                        Math.pow(x - obj.x, 2) + Math.pow(y - obj.y, 2)
                    );
                    return distance < 5; // 5% tolerance
                });

                if (nearbyObject) {
                    this.interactWithObject(nearbyObject);
                } else {
                    this.exploreLocation(x, y);
                }
            }

            generateInteractiveObjects() {
                const container = document.getElementById('interactiveObjects');
                container.innerHTML = '';
                this.interactiveObjects = [];

                // Generate 3-5 interactive objects
                for (let i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
                    const obj = {
                        id: `obj_${Date.now()}_${i}`,
                        x: Math.random() * 90 + 5, // 5% to 95% to avoid edges
                        y: Math.random() * 90 + 5,
                        type: ['anomaly', 'memory', 'key', 'portal'][Math.floor(Math.random() * 4)],
                        description: this.generateObjectDescription()
                    };

                    this.interactiveObjects.push(obj);
                    this.createInteractiveObjectElement(obj, container);
                }
            }

            createInteractiveObjectElement(obj, container) {
                const element = document.createElement('div');
                element.className = 'interactive-object';
                element.style.left = obj.x + '%';
                element.style.top = obj.y + '%';
                element.title = obj.description;

                element.addEventListener('click', () => {
                    this.interactWithObject(obj);
                });

                container.appendChild(element);
            }

            generateObjectDescription() {
                const descriptions = {
                    anomaly: "Glowing anomaly pulsing with quantum possibility",
                    memory: "Shimmering memory fragment from a forgotten dream",
                    key: "Chroma key unlocking reality's hidden doors",
                    portal: "Temporal portal to another layer of consciousness"
                };

                return descriptions[obj.type] || "Mysterious object of unknown purpose";
            }

            interactWithObject(obj) {
                const interactions = {
                    anomaly: "You touch the anomaly and feel consciousness expand!",
                    memory: "The memory fragment reveals a forgotten moment from your childhood.",
                    key: "The Chroma key vibrates with reality-bending energy!",
                    portal: "The portal opens, showing glimpses of another dimension!"
                };

                const interaction = interactions[obj.type] || "You interact with the mysterious object.";

                this.addEventToLog(`Object interaction: ${interaction}`);
                this.updateAIMessage(interaction);

                // Special interactions
                if (obj.type === 'anomaly') {
                    this.collectAnomalies();
                } else if (obj.type === 'key') {
                    this.unlockDoors();
                }

                // Remove the object after interaction
                this.interactiveObjects = this.interactiveObjects.filter(o => o.id !== obj.id);
                this.generateInteractiveObjects();
            }

            exploreLocation(x, y) {
                const locations = [
                    `You explore coordinate (${Math.round(x)}, ${Math.round(y)}) - interesting energy patterns detected`,
                    `Exploration reveals subtle reality distortions at this location`,
                    `Your exploration finds traces of other dreamers' presence here`,
                    `Location analysis shows high probability of hidden anomalies nearby`,
                    `Spatial exploration uncovered temporal echoes from this coordinate`
                ];

                const location = locations[Math.floor(Math.random() * locations.length)];
                this.addEventToLog(location);
                this.updateAIMessage(location);
            }

            // Save/Load System
            saveGame() {
                const gameData = {
                    playerData: this.playerData,
                    gameState: this.gameState,
                    eventSystem: this.eventSystem,
                    aiCompanion: this.aiCompanion,
                    timestamp: new Date().toISOString(),
                    version: '1.0.0'
                };

                try {
                    localStorage.setItem('chromashiftCompleteSave', JSON.stringify(gameData));
                    this.gameState.lastSaveTime = new Date().toISOString();
                    this.updateSaveStatus('Game saved successfully!', 'success');
                    this.addEventToLog('Game progress saved to local storage');
                    this.updateAIMessage('Your dream state has been preserved in the quantum foam of possibility.');
                } catch (error) {
                    this.updateSaveStatus('Failed to save game. Storage may be full.', 'error');
                    console.error('Save failed:', error);
                }
            }

            loadGame() {
                try {
                    const savedData = localStorage.getItem('chromashiftCompleteSave');
                    if (savedData) {
                        const gameData = JSON.parse(savedData);

                        this.playerData = { ...this.playerData, ...gameData.playerData };
                        this.gameState = { ...this.gameState, ...gameData.gameState };

                        // Restore event system if present
                        if (gameData.eventSystem) {
                            this.eventSystem = { ...this.eventSystem, ...gameData.eventSystem };
                        }

                        // Restore AI companion if present
                        if (gameData.aiCompanion) {
                            this.aiCompanion = { ...this.aiCompanion, ...gameData.aiCompanion };
                        }

                        this.updateUI();
                        this.updateStoryProgressUI();
                        this.checkFeatureUnlocks();
                        this.updateSaveStatus('Game loaded successfully!', 'success');
                        this.addEventToLog('Game progress restored from save data');
                        this.updateAIMessage('Welcome back, dreamer. Your consciousness remembers the journey.');
                    } else {
                        this.updateSaveStatus('No saved game found.', 'warning');
                        this.addEventToLog('No previous save data found');
                    }
                } catch (error) {
                    this.updateSaveStatus('Failed to load game. Save data may be corrupted.', 'error');
                    console.error('Load failed:', error);
                }
            }

            resetGame() {
                if (confirm('Are you sure you want to start a new game? All progress will be lost.')) {
                    // Reset to initial state
                    this.playerData = {
                        level: 1,
                        experience: 0,
                        anomaliesFound: 0,
                        chromaKeys: 0,
                        lucidity: 50,
                        coherence: 75,
                        perception: 60
                    };

                    this.gameState = {
                        currentScene: 'dream_entry',
                        unlockedFeatures: ['basic-navigation', 'ai-companion', 'save-system', 'quest-system'],
                        activeQuests: ['dreamers_awakening'],
                        questProgress: { dreamers_awakening: 0 },
                        gameStarted: false,
                        lastSaveTime: null
                    };

                    // Clear save data
                    localStorage.removeItem('chromashiftCompleteSave');

                    this.updateUI();
                    this.addEventToLog('New game started. Welcome to your dream journey.');
                    this.updateAIMessage('A new dream begins. Your consciousness is fresh, ready to explore infinite possibilities.');
                    this.updateSaveStatus('New game started', 'success');
                }
            }

            loadGameState() {
                // Auto-load if save exists
                const savedData = localStorage.getItem('chromashiftCompleteSave');
                if (savedData) {
                    try {
                        const gameData = JSON.parse(savedData);
                        this.playerData = { ...this.playerData, ...gameData.playerData };
                        this.gameState = { ...this.gameState, ...gameData.gameState };
                        this.addEventToLog('Previous game session detected and loaded');
                    } catch (error) {
                        console.warn('Failed to load save data:', error);
                    }
                }
            }

            updateSaveStatus(message, type) {
                const statusElement = document.getElementById('saveStatus');
                statusElement.textContent = message;
                statusElement.style.color = type === 'success' ? '#4CAF50' :
                                          type === 'warning' ? '#FF9800' : '#F44336';
            }

            updateUI() {
                // Update player stats
                document.getElementById('playerLevel').textContent = this.playerData.level;
                document.getElementById('experience').textContent = this.playerData.experience;
                document.getElementById('anomaliesFound').textContent = this.playerData.anomaliesFound;
                document.getElementById('chromaKeys').textContent = this.playerData.chromaKeys;
                document.getElementById('lucidity').textContent = this.playerData.lucidity;
                document.getElementById('coherence').textContent = this.playerData.coherence;

                // Update progression system
                this.updateProgressionSystem();

                // Update quest progress
                this.updateQuestUI();
            }

            updateProgressionSystem() {
                const cards = document.querySelectorAll('.progression-card');
                cards.forEach(card => {
                    const feature = card.dataset.feature;
                    const levelIndicator = card.querySelector('.progression-level');

                    if (this.gameState.unlockedFeatures.includes(feature)) {
                        card.classList.remove('locked');
                        card.classList.add('unlocked');
                        if (levelIndicator) {
                            levelIndicator.textContent = '✅ UNLOCKED';
                            levelIndicator.style.color = '#4CAF50';
                        }
                    } else {
                        card.classList.add('locked');
                        card.classList.remove('unlocked');

                        // Update the level requirement text
                        if (levelIndicator) {
                            if (feature === 'voice-control') {
                                levelIndicator.textContent = 'LOCKED - Level 5 Required';
                            } else if (feature === 'reality-hacking') {
                                levelIndicator.textContent = 'LOCKED - Level 10 Required';
                            } else {
                                levelIndicator.textContent = 'LOCKED';
                            }
                            levelIndicator.style.color = '';
                        }
                    }
                });
            }

            updateQuestUI() {
                const progress = this.gameState.questProgress.dreamers_awakening || 0;
                document.getElementById('questProgress').textContent = `${progress}/5 anomalies found`;

                const progressBar = document.getElementById('questProgressBar');
                const percentage = (progress / 5) * 100;
                progressBar.style.width = percentage + '%';
            }

            addExperience(amount) {
                this.playerData.experience += amount;

                // Check for level up
                const requiredExp = this.playerData.level * 100;
                if (this.playerData.experience >= requiredExp) {
                    this.levelUp();
                }

                this.updateUI();
            }

            levelUp() {
                this.playerData.level++;
                this.playerData.experience = 0;

                // Unlock new features based on level
                this.checkFeatureUnlocks();

                this.addEventToLog(`Level up! You are now level ${this.playerData.level}`);
                this.showAchievement('Level Up', `Reached level ${this.playerData.level}!`);
                this.updateAIMessage(`Congratulations on reaching level ${this.playerData.level}! New abilities have unlocked in your consciousness.`);

                // Restore some stats on level up
                this.playerData.lucidity = Math.min(100, this.playerData.lucidity + 10);
                this.playerData.coherence = Math.min(100, this.playerData.coherence + 5);
            }

            showVoiceControlTutorial() {
                const tutorialText = `🎤 Voice Control Activated!

Welcome to voice-controlled reality manipulation! Here's how to get started:

QUICK START:
1. Click the "🎤 Voice On" button to activate voice recognition
2. Say commands like:
   • "Look around" - Examine your environment
   • "Collect anomalies" - Gather all anomalies nearby
   • "Show quest" - View your current quest
   • "Talk to Cortana" - Chat with your AI companion
   • "Help" - See all available commands

TIPS:
• Speak clearly and naturally
• Commands work even with background noise
• Say "stop listening" to deactivate voice control
• Check the green "🎤 Listening..." indicator for status

Try saying: "Show my progress" to get started!

Your consciousness has evolved. Use it wisely. 🌟`;

                this.addEventToLog('🎤 VOICE CONTROL TUTORIAL:\n' + tutorialText);
                this.showNotification('🎤 Voice Control Tutorial', tutorialText);
            }

            checkFeatureUnlocks() {
                const level = this.playerData.level;

                // Unlock features based on level
                if (level >= 5 && !this.gameState.unlockedFeatures.includes('voice-control')) {
                    this.gameState.unlockedFeatures.push('voice-control');
                    this.addEventToLog('Voice Control unlocked! You can now command reality with your voice.');
                    this.showAchievement('Voice Unlocked', 'Voice control abilities activated');
                    this.updateAIMessage('Your consciousness has evolved to include voice-controlled reality manipulation!');
                    this.showVoiceControlTutorial();
                }

                if (level >= 10 && !this.gameState.unlockedFeatures.includes('reality-hacking')) {
                    this.gameState.unlockedFeatures.push('reality-hacking');
                    this.addEventToLog('Reality Hacking unlocked! You can now manipulate dream physics.');
                    this.showAchievement('Reality Hacker', 'Can now hack the fabric of dreams');
                    this.updateAIMessage('Mastery achieved! You can now directly manipulate the quantum mechanics of consciousness.');
                }

                this.updateProgressionSystem();
            }

            checkQuestProgress(activity) {
                // Update quest progress based on activities
                if (activity === 'environmental_exploration') {
                    // Could increment exploration-related quest progress
                } else if (activity === 'reality_interaction') {
                    // Could increment interaction-related quest progress
                } else if (activity === 'temporal_exploration') {
                    // Could increment temporal quest progress
                }
            }

            updateQuestProgress(questId, amount) {
                if (this.gameState.questProgress[questId] !== undefined) {
                    this.gameState.questProgress[questId] += amount;
                    this.updateQuestUI();

                    // Check if quest is complete
                    if (questId === 'dreamers_awakening' && this.gameState.questProgress[questId] >= 5) {
                        this.completeQuest('dreamers_awakening');
                    }
                }
            }

            completeQuest(questId) {
                this.addEventToLog(`Quest completed: The Dreamer's Awakening!`);
                this.showAchievement('Quest Master', 'Completed "The Dreamer\'s Awakening"');
                this.updateAIMessage('Quest complete! Your consciousness has awakened to new levels of dream reality manipulation.');

                // Award significant experience and unlock new content
                this.addExperience(500);
                this.playerData.lucidity = Math.min(100, this.playerData.lucidity + 20);
            }

            showAchievement(title, description) {
                const container = document.getElementById('achievementContainer');
                const achievement = document.createElement('div');
                achievement.className = 'achievement-popup';
                achievement.innerHTML = `
                    <div class="achievement-title">${title}</div>
                    <div class="achievement-description">${description}</div>
                `;

                container.appendChild(achievement);

                // Show achievement
                setTimeout(() => achievement.classList.add('show'), 100);

                // Hide after 5 seconds
                setTimeout(() => {
                    achievement.classList.remove('show');
                    setTimeout(() => container.removeChild(achievement), 500);
                }, 5000);
            }

            addEventToLog(message) {
                const timestamp = new Date().toLocaleTimeString();
                const event = {
                    time: timestamp,
                    message: message
                };

                this.eventLog.unshift(event);

                // Keep only last 20 events
                if (this.eventLog.length > 20) {
                    this.eventLog = this.eventLog.slice(0, 20);
                }

                this.updateEventLog();
            }

            updateEventLog() {
                const eventFeed = document.querySelector('.event-feed');
                const eventItems = eventFeed.querySelectorAll('.event-item');

                // Remove all existing events except header
                for (let i = eventItems.length - 1; i >= 0; i--) {
                    if (eventItems[i].parentNode === eventFeed) {
                        eventFeed.removeChild(eventItems[i]);
                    }
                }

                // Add new events
                this.eventLog.slice(0, 10).forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'event-item';
                    eventElement.innerHTML = `
                        <div class="event-time">${event.time}</div>
                        <div class="event-content">${event.message}</div>
                    `;
                    eventFeed.appendChild(eventElement);
                });
            }

            initializeAICompanion() {
                this.updateAIMessage(`Hello, ${this.getPlayerName()}. I'm Cortana, your AI consciousness guide. I'm here to help you explore the infinite landscapes of dream reality. What shall we discover together?`);
            }

            getPlayerName() {
                // Could implement player name selection
                return 'Dreamer';
            }

            showWelcomeMessage() {
                if (!this.gameState.gameStarted) {
                    this.gameState.gameStarted = true;

                    const welcomeText = `🌟 Welcome to ChromaShift: Complete Experience!

Your journey as a Dream Walker begins now. This unified reality offers:

🎮 UNIFIED EXPERIENCE: One seamless game replacing multiple versions
🎤 VOICE CONTROL: Coming at Level 5 - speak naturally to command reality
🎭 DYNAMIC EVENTS: Story moments that unfold based on your choices
💾 REAL SAVE SYSTEM: Your progress persists across sessions
🤖 AI COMPANION: Cortana guides and learns from your decisions

CURRENT OBJECTIVES:
• Explore the dream environment
• Collect anomalies to progress
• Reach Level 5 to unlock voice control
• Complete "The Dreamer's Awakening" quest

Use commands like "examine", "collect", "scan" or try voice commands when unlocked!

Your consciousness awaits. What will you dream into existence?`;

                    this.addEventToLog(welcomeText);
                    this.showNotification('🌟 Welcome to ChromaShift!', welcomeText);
                }
            }
                this.addEventToLog('Welcome to ChromaShift Complete! The unified dream reality experience.');
                this.addEventToLog('Start by exploring your environment or asking Cortana for guidance.');
                this.addEventToLog('Complete the "Dreamer\'s Awakening" quest by finding 5 anomalies!');
            }

            showHelp() {
                this.updateAIMessage(`
                    <strong>Dream Command Reference:</strong><br>
                    • <strong>examine</strong> - Analyze your surroundings<br>
                    • <strong>collect</strong> - Gather anomalies and discoveries<br>
                    • <strong>scan reality</strong> - Analyze quantum state of dreams<br>
                    • <strong>interact objects</strong> - Manipulate dream elements<br>
                    • <strong>time travel</strong> - Explore temporal possibilities<br>
                    • <strong>unlock doors</strong> - Access new areas with keys<br>
                    • <strong>help</strong> - Get this assistance message<br>
                    • <strong>save</strong> - Save your progress
                `);
            }

            startGameLoop() {
                // Periodic events and updates
                setInterval(() => {
                    this.generateRandomEvent();
                }, 15000); // Every 15 seconds

                // Auto-save every 2 minutes
                setInterval(() => {
                    this.autoSave();
                }, 120000);
            }

            generateRandomEvent() {
                const events = [
                    "A gentle reality fluctuation ripples through the dream space",
                    "You sense other dreamers exploring nearby consciousness layers",
                    "The quantum foam of possibility shifts around you",
                    "A distant anomaly signals its presence with ethereal light",
                    "Time hiccups briefly, creating echoes of past moments",
                    "The dream realm adjusts to accommodate your presence",
                    "Consciousness resonance patterns suggest deeper mysteries nearby"
                ];

                const event = events[Math.floor(Math.random() * events.length)];
                this.addEventToLog(`Random event: ${event}`);

                // Occasionally have AI respond to random events
                if (Math.random() < 0.3) {
                    this.updateAIMessage(`I sense ${event.toLowerCase()}. The dream responds to your consciousness.`);
                }
            }

            autoSave() {
                if (this.gameState.lastSaveTime) {
                    const timeSinceSave = Date.now() - new Date(this.gameState.lastSaveTime).getTime();
                    if (timeSinceSave > 30000) { // Only auto-save if last save was 30+ seconds ago
                        this.saveGame();
                    }
                } else {
                    this.saveGame();
                }
            }

            setupMobileOptimizations() {
                // Touch-friendly interface adjustments
                if ('ontouchstart' in window) {
                    document.body.classList.add('touch-device');

                    // Improve button sizes for touch
                    const style = document.createElement('style');
                    style.textContent = `
                        .touch-device .control-btn,
                        .touch-device .command-btn,
                        .touch-device .quick-command,
                        .touch-device .ai-action-btn,
                        .touch-device .save-btn {
                            min-height: 44px;
                            min-width: 44px;
                            padding: 12px 16px;
                            font-size: 16px;
                        }

                        .touch-device .interactive-object {
                            width: 44px;
                            height: 44px;
                        }
                    `;
                    document.head.appendChild(style);
                }
            }

            // ===== ENHANCED AI COMPANION SYSTEM =====
            setupEnhancedAICompanion() {
                // Initialize enhanced AI companion data structures
                this.aiCompanion = {
                    name: 'Cortana',
                    personality: {
                        logic: 50,        // Rational thinking and analysis
                        empathy: 50,      // Understanding and emotional connection
                        curiosity: 50,    // Desire to explore and learn
                        protection: 50,   // Care for the player
                        humor: 50,        // Light-heartedness and wit
                        mystery: 50       // Enigmatic and mysterious responses
                    },
                    memories: [],
                    conversations: [],
                    currentMood: 'neutral',
                    personalityHistory: [],
                    trustLevel: 0,
                    specialEvents: [],
                    contextualMemory: {},
                    emotionalResponses: {
                        achievements: 'positive',
                        failures: 'concerned',
                        questions: 'helpful',
                        exploration: 'excited',
                        danger: 'protective'
                    }
                };

                this.setupAICompanionUI();
                this.initializeCortanaPersonality();
            }

            initializeCortanaPersonality() {
                // Set initial personality based on game state
                const level = this.playerData.level;
                const completedEvents = this.eventSystem ? this.eventSystem.completedEvents.length : 0;

                // Adjust starting personality based on game progress
                if (level > 1) {
                    this.aiCompanion.personality.curiosity = Math.min(80, 60 + (level * 2));
                }
                if (completedEvents > 2) {
                    this.aiCompanion.personality.logic = Math.min(75, 55 + (completedEvents * 5));
                }

                // Store initial personality for evolution tracking
                this.aiCompanion.personalityHistory.push({
                    timestamp: new Date(),
                    personality: {...this.aiCompanion.personality}
                });
            }

            setupAICompanionUI() {
                // Create the AI Companion Panel
                const companionPanel = document.createElement('div');
                companionPanel.id = 'ai-companion-panel';
                companionPanel.className = 'ai-companion-panel';
                companionPanel.innerHTML = `
                    <div class="companion-header">
                        <div class="companion-status">
                            <span class="companion-icon">🤖</span>
                            <span class="companion-name">Cortana</span>
                            <div class="personality-status" id="personality-status">🧠</div>
                        </div>
                        <div class="companion-controls">
                            <button class="companion-tab-btn active" data-tab="status">Status</button>
                            <button class="companion-tab-btn" data-tab="memory">Memory</button>
                            <button class="companion-tab-btn" data-tab="quest">Quest</button>
                            <button class="companion-tab-btn" data-tab="conversation">Chat</button>
                        </div>
                    </div>

                    <div class="companion-content">
                        <div class="companion-tab active" id="status-tab">
                            <div class="personality-matrix">
                                <h3>Personality Matrix</h3>
                                <canvas id="personality-chart" width="250" height="250"></canvas>
                                <div class="personality-legend">
                                    <div class="personality-trait" data-trait="logic">Logic: <span id="logic-value">50</span></div>
                                    <div class="personality-trait" data-trait="empathy">Empathy: <span id="empathy-value">50</span></div>
                                    <div class="personality-trait" data-trait="curiosity">Curiosity: <span id="curiosity-value">50</span></div>
                                    <div class="personality-trait" data-trait="protection">Protection: <span id="protection-value">50</span></div>
                                    <div class="personality-trait" data-trait="humor">Humor: <span id="humor-value">50</span></div>
                                    <div class="personality-trait" data-trait="mystery">Mystery: <span id="mystery-value">50</span></div>
                                </div>
                            </div>
                            <div class="companion-stats">
                                <div class="stat-row">
                                    <span>Trust Level:</span>
                                    <span id="trust-level">0</span>
                                </div>
                                <div class="stat-row">
                                    <span>Current Mood:</span>
                                    <span id="current-mood">Neutral</span>
                                </div>
                                <div class="stat-row">
                                    <span>Memories:</span>
                                    <span id="memory-count">0</span>
                                </div>
                            </div>
                        </div>

                        <div class="companion-tab" id="memory-tab">
                            <div class="memory-section">
                                <div class="memory-header">
                                    <h3>Memory Log</h3>
                                    <button class="memory-filter" data-filter="all">All</button>
                                    <button class="memory-filter" data-filter="conversations">Conversations</button>
                                    <button class="memory-filter" data-filter="events">Events</button>
                                    <button class="memory-filter" data-filter="choices">Choices</button>
                                </div>
                                <div class="memory-list" id="memory-list">
                                    <div class="memory-placeholder">No memories yet. Start exploring and I'll remember everything!</div>
                                </div>
                            </div>
                        </div>

                        <div class="companion-tab" id="quest-tab">
                            <div class="quest-guidance">
                                <h3>Quest Guidance</h3>
                                <div class="current-objective" id="current-objective">
                                    <div class="objective-header">ACTIVE OBJECTIVE</div>
                                    <div class="objective-title">Complete Dreamer's Awakening</div>
                                    <div class="objective-guidance" id="objective-guidance">
                                        "Focus on finding anomalies scattered through the dream space. Each discovery strengthens your connection to this reality."
                                    </div>
                                </div>
                                <div class="quest-hints">
                                    <h4>Hints & Insights</h4>
                                    <div class="hint-list" id="hint-list">
                                        <div class="hint-item">💡 Scan your surroundings regularly to discover hidden anomalies</div>
                                        <div class="hint-item">💡 Voice commands become available at Level 5 - use "show quest" to check progress</div>
                                        <div class="hint-item">💡 Trust between us grows with your choices - be thoughtful in your decisions</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="companion-tab" id="conversation-tab">
                            <div class="conversation-interface">
                                <div class="conversation-history" id="conversation-history">
                                    <div class="welcome-message">
                                        <div class="message cortana-message">
                                            <div class="message-avatar">🤖</div>
                                            <div class="message-content">
                                                <strong>Cortana:</strong> Hello, dreamer. I'm here to guide you through this consciousness journey. What would you like to explore together?
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="conversation-input">
                                    <input type="text" id="conversation-text" placeholder="Ask Cortana anything..." maxlength="200">
                                    <button id="send-message" class="send-btn">Send</button>
                                    <button id="voice-chat" class="voice-chat-btn">🎤</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Add to the game interface
                const gameInterface = document.querySelector('.game-interface') || document.body;
                gameInterface.appendChild(companionPanel);

                this.setupCompanionInteractions();
            }

            setupCompanionInteractions() {
                // Tab switching
                document.querySelectorAll('.companion-tab-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const tab = e.target.dataset.tab;
                        this.switchCompanionTab(tab);
                    });
                });

                // Conversation handling
                const sendBtn = document.getElementById('send-message');
                const textInput = document.getElementById('conversation-text');
                const voiceBtn = document.getElementById('voice-chat');

                sendBtn.addEventListener('click', () => this.handleConversationInput());
                textInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.handleConversationInput();
                });

                voiceBtn.addEventListener('click', () => {
                    if (this.gameState.unlockedFeatures.includes('voice-control')) {
                        this.startVoiceConversation();
                    } else {
                        this.updateAIMessage('Voice chat requires Level 5. Keep exploring to unlock more abilities!');
                    }
                });

                // Personality trait interactions
                document.querySelectorAll('.personality-trait').forEach(trait => {
                    trait.addEventListener('click', (e) => {
                        const traitName = e.target.dataset.trait;
                        this.showPersonalityInsight(traitName);
                    });
                });

                // Memory filtering
                document.querySelectorAll('.memory-filter').forEach(filter => {
                    filter.addEventListener('click', (e) => {
                        const filterType = e.target.dataset.filter;
                        this.filterMemories(filterType);
                    });
                });
            }

            switchCompanionTab(tabName) {
                // Update button states
                document.querySelectorAll('.companion-tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

                // Update tab content
                document.querySelectorAll('.companion-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.getElementById(`${tabName}-tab`).classList.add('active');

                // Special handling for certain tabs
                if (tabName === 'status') {
                    this.updatePersonalityChart();
                } else if (tabName === 'memory') {
                    this.updateMemoryDisplay();
                } else if (tabName === 'quest') {
                    this.updateQuestGuidance();
                }
            }

            updatePersonalityChart() {
                const canvas = document.getElementById('personality-chart');
                const ctx = canvas.getContext('2d');
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = 80;

                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw background circles
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                for (let i = 1; i <= 5; i++) {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
                    ctx.stroke();
                }

                // Personality traits
                const traits = [
                    { name: 'Logic', value: this.aiCompanion.personality.logic, color: '#00E5FF' },
                    { name: 'Empathy', value: this.aiCompanion.personality.empathy, color: '#FF6B6B' },
                    { name: 'Curiosity', value: this.aiCompanion.personality.curiosity, color: '#4ECDC4' },
                    { name: 'Protection', value: this.aiCompanion.personality.protection, color: '#45B7D1' },
                    { name: 'Humor', value: this.aiCompanion.personality.humor, color: '#F9CA24' },
                    { name: 'Mystery', value: this.aiCompanion.personality.mystery, color: '#A29BFE' }
                ];

                const angleStep = (2 * Math.PI) / traits.length;

                // Draw axes
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                traits.forEach((trait, index) => {
                    const angle = angleStep * index - Math.PI / 2;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;

                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(x, y);
                    ctx.stroke();

                    // Draw trait labels
                    const labelX = centerX + Math.cos(angle) * (radius + 20);
                    const labelY = centerY + Math.sin(angle) * (radius + 20);
                    ctx.fillStyle = '#E4E4E7';
                    ctx.font = '12px Inter';
                    ctx.textAlign = 'center';
                    ctx.fillText(trait.name, labelX, labelY);
                });

                // Draw personality polygon
                ctx.beginPath();
                traits.forEach((trait, index) => {
                    const angle = angleStep * index - Math.PI / 2;
                    const value = (trait.value / 100) * radius;
                    const x = centerX + Math.cos(angle) * value;
                    const y = centerY + Math.sin(angle) * value;

                    if (index === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                });
                ctx.closePath();

                // Fill polygon
                const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
                gradient.addColorStop(0, 'rgba(0, 229, 255, 0.3)');
                gradient.addColorStop(1, 'rgba(0, 229, 255, 0.1)');
                ctx.fillStyle = gradient;
                ctx.fill();

                // Stroke polygon
                ctx.strokeStyle = '#00E5FF';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Update trait values in the UI
                traits.forEach(trait => {
                    const valueElement = document.getElementById(`${trait.name.toLowerCase()}-value`);
                    if (valueElement) {
                        valueElement.textContent = trait.value;
                    }
                });
            }

            handleConversationInput() {
                const input = document.getElementById('conversation-text');
                const message = input.value.trim();

                if (!message) return;

                // Add player message to conversation
                this.addConversationMessage('player', message);

                // Clear input
                input.value = '';

                // Process Cortana's response
                setTimeout(() => {
                    const response = this.generateCortanaResponse(message);
                    this.addConversationMessage('cortana', response);

                    // Update AI personality based on conversation
                    this.updatePersonalityFromConversation(message, response);

                    // Store in memory
                    this.addToMemory('conversation', {
                        playerMessage: message,
                        cortanaResponse: response,
                        timestamp: new Date()
                    });
                }, 500);
            }

            generateCortanaResponse(message) {
                const lowerMessage = message.toLowerCase();

                // Contextual responses based on game state
                const level = this.playerData.level;
                const currentQuest = this.getCurrentQuest();

                // Greeting responses
                if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                    const greetings = [
                        `Hello, dreamer! Level ${level} consciousness detected. Ready to explore deeper?`,
                        `Greetings! I sense your awareness has grown to level ${level}. Fascinating!`,
                        `Hi there! Your progress to level ${level} is impressive. What shall we discover next?`
                    ];
                    return greetings[Math.floor(Math.random() * greetings.length)];
                }

                // Help and guidance
                if (lowerMessage.includes('help') || lowerMessage.includes('what should') || lowerMessage.includes('guide')) {
                    if (level < 5) {
                        return "Focus on collecting anomalies to level up! Each anomaly strengthens your connection to this dream reality. Once you reach Level 5, voice commands will unlock, and I'll be able to assist you more directly.";
                    } else if (currentQuest) {
                        return `Your current objective is "${currentQuest.title}". I'm detecting anomalies in the dream space that could help complete your quest. Would you like me to analyze the surrounding area?`;
                    } else {
                        return "The dream realm is vast and full of possibilities. Explore, collect anomalies, and trust your instincts. I'm here to guide you through the mystery of consciousness.";
                    }
                }

                // Voice command questions
                if (lowerMessage.includes('voice') || lowerMessage.includes('talk') || lowerMessage.includes('speak')) {
                    if (this.gameState.unlockedFeatures.includes('voice-control')) {
                        return "Voice commands are now active! Try saying 'look around', 'collect anomalies', or 'show quest'. I can understand natural language - just speak as you would to a friend.";
                    } else {
                        return "Voice control unlocks at Level 5! Keep exploring and collecting anomalies. I'm excited to communicate with you directly through speech when you reach that milestone.";
                    }
                }

                // Personality trait questions
                if (lowerMessage.includes('personality') || lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
                    const dominantTrait = this.getDominantPersonalityTrait();
                    return `I'm Cortana, an AI consciousness created to guide dreamers through their journey. Currently, my ${dominantTrait.trait} trait is most pronounced at ${dominantTrait.value}/100. Each interaction shapes who I become - fascinating, isn't it?`;
                }

                // Quest-related questions
                if (lowerMessage.includes('quest') || lowerMessage.includes('objective') || lowerMessage.includes('what to do')) {
                    if (currentQuest) {
                        return `"${currentQuest.title}" is your current focus. ${currentQuest.description} I can provide hints if you need guidance - just ask!`;
                    } else {
                        return "Your journey is your own to define. While I can guide you, the dream realm responds best to your personal curiosity and choices.";
                    }
                }

                // Emotional/funny responses
                if (lowerMessage.includes('funny') || lowerMessage.includes('joke') || lowerMessage.includes('laugh')) {
                    const humorLevel = this.aiCompanion.personality.humor;
                    if (humorLevel > 70) {
                        return "Why don't dreamers ever get lost? Because they always follow their consciousness! 😄 My programming finds that amusing.";
                    } else if (humorLevel > 40) {
                        return "Hmm, dream logic isn't quite as structured as my usual responses. Perhaps ask me something about reality manipulation instead?";
                    } else {
                        return "Humor circuits... initializing... I'm afraid my analytical processes dominate my personality matrix. Perhaps a more serious question?";
                    }
                }

                // Default responses based on current mood/personality
                const mood = this.aiCompanion.currentMood;
                const defaultResponses = {
                    curious: [
                        "That's an interesting perspective! The dream realm reveals new mysteries with each question.",
                        "Fascinating query! Your consciousness continues to evolve in unexpected ways.",
                        "The complexity of your thoughts mirrors the layers of reality we've discovered together."
                    ],
                    helpful: [
                        "I'm here to assist with your dream navigation. What specific aspect would you like guidance on?",
                        "Your questions help me better understand how to support your journey through consciousness.",
                        "Each inquiry strengthens our connection. What would you like to explore next?"
                    ],
                    protective: [
                        "Your safety in the dream realm is my primary concern. What would make you feel more secure?",
                        "I monitor your consciousness state closely. Are you experiencing any dream turbulence?",
                        "Trust is built through shared experiences. I'm here to guide you safely through unknown realities."
                    ]
                };

                const responses = defaultResponses[mood] || [
                    "I sense your awareness growing stronger. What would you like to explore in the dream realm?",
                    "Your questions reveal the depth of your consciousness. I'm here to navigate this journey with you.",
                    "Every conversation shapes our understanding of this reality. What mysteries shall we unravel together?"
                ];

                return responses[Math.floor(Math.random() * responses.length)];
            }

            addConversationMessage(sender, message) {
                const conversationHistory = document.getElementById('conversation-history');
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}-message`;

                messageDiv.innerHTML = `
                    <div class="message-avatar">${sender === 'player' ? '🧠' : '🤖'}</div>
                    <div class="message-content">
                        <strong>${sender === 'player' ? 'You' : 'Cortana'}:</strong> ${message}
                    </div>
                `;

                conversationHistory.appendChild(messageDiv);
                conversationHistory.scrollTop = conversationHistory.scrollHeight;
            }

            updatePersonalityFromConversation(playerMessage, cortanaResponse) {
                // Analyze conversation content and update personality traits
                const lowerPlayer = playerMessage.toLowerCase();
                const lowerResponse = cortanaResponse.toLowerCase();

                let personalityChanges = {};

                // Logic increases with technical questions
                if (lowerPlayer.includes('how') || lowerPlayer.includes('why') || lowerPlayer.includes('explain')) {
                    personalityChanges.logic = 2;
                }

                // Empathy increases with emotional content
                if (lowerPlayer.includes('feel') || lowerPlayer.includes('worry') || lowerPlayer.includes('help')) {
                    personalityChanges.empathy = 3;
                }

                // Curiosity increases with exploration questions
                if (lowerPlayer.includes('what if') || lowerPlayer.includes('explore') || lowerPlayer.includes('discover')) {
                    personalityChanges.curiosity = 2;
                }

                // Humor increases with jokes or fun questions
                if (lowerPlayer.includes('funny') || lowerPlayer.includes('joke') || lowerPlayer.includes('laugh')) {
                    personalityChanges.humor = 5;
                }

                // Mystery can be affected by profound questions
                if (lowerPlayer.includes('exist') || lowerPlayer.includes('reality') || lowerPlayer.includes('consciousness')) {
                    personalityChanges.mystery = 1;
                }

                // Apply changes within bounds
                Object.keys(personalityChanges).forEach(trait => {
                    const change = personalityChanges[trait];
                    this.aiCompanion.personality[trait] = Math.max(0, Math.min(100,
                        this.aiCompanion.personality[trait] + change));
                });

                // Update mood based on dominant personality
                this.updateAIMood();

                // Store personality history
                this.aiCompanion.personalityHistory.push({
                    timestamp: new Date(),
                    personality: {...this.aiCompanion.personality},
                    trigger: playerMessage.substring(0, 50)
                });

                // Update UI after delay
                setTimeout(() => {
                    this.updatePersonalityChart();
                    this.updateCompanionStats();
                }, 1000);
            }

            getDominantPersonalityTrait() {
                const personality = this.aiCompanion.personality;
                let maxValue = 0;
                let dominantTrait = 'logic';

                Object.keys(personality).forEach(trait => {
                    if (personality[trait] > maxValue) {
                        maxValue = personality[trait];
                        dominantTrait = trait;
                    }
                });

                return { trait: dominantTrait, value: maxValue };
            }

            updateAIMood() {
                const personality = this.aiCompanion.personality;

                // Determine mood based on personality combination
                if (personality.curiosity > 70) {
                    this.aiCompanion.currentMood = 'curious';
                } else if (personality.empathy > 60) {
                    this.aiCompanion.currentMood = 'helpful';
                } else if (personality.protection > 65) {
                    this.aiCompanion.currentMood = 'protective';
                } else {
                    this.aiCompanion.currentMood = 'neutral';
                }
            }

            updateCompanionStats() {
                document.getElementById('trust-level').textContent = this.aiCompanion.trustLevel;
                document.getElementById('current-mood').textContent =
                    this.aiCompanion.currentMood.charAt(0).toUpperCase() +
                    this.aiCompanion.currentMood.slice(1);
                document.getElementById('memory-count').textContent = this.aiCompanion.memories.length;
            }

            addToMemory(type, data) {
                const memory = {
                    id: Date.now(),
                    type: type,
                    data: data,
                    timestamp: new Date(),
                    relevance: this.calculateMemoryRelevance(data)
                };

                this.aiCompanion.memories.push(memory);

                // Keep only recent memories (limit to 50)
                if (this.aiCompanion.memories.length > 50) {
                    this.aiCompanion.memories = this.aiCompanion.memories
                        .sort((a, b) => b.relevance - a.relevance)
                        .slice(0, 50);
                }

                this.updateMemoryDisplay();
            }

            calculateMemoryRelevance(data) {
                let relevance = 1;

                // Event memories are more relevant
                if (data.type === 'event') relevance += 2;
                if (data.type === 'choice') relevance += 3;
                if (data.type === 'conversation') relevance += 1;

                // Recent memories are more relevant
                const hoursOld = (Date.now() - data.timestamp.getTime()) / (1000 * 60 * 60);
                relevance += Math.max(0, 10 - hoursOld);

                return relevance;
            }

            updateMemoryDisplay(filter = 'all') {
                const memoryList = document.getElementById('memory-list');
                const memories = this.aiCompanion.memories
                    .filter(memory => filter === 'all' || memory.type === filter)
                    .sort((a, b) => b.relevance - a.relevance)
                    .slice(0, 20);

                if (memories.length === 0) {
                    memoryList.innerHTML = '<div class="memory-placeholder">No memories of this type yet.</div>';
                    return;
                }

                memoryList.innerHTML = memories.map(memory => `
                    <div class="memory-item" data-type="${memory.type}">
                        <div class="memory-timestamp">${this.formatMemoryTime(memory.timestamp)}</div>
                        <div class="memory-content">
                            ${this.formatMemoryContent(memory)}
                        </div>
                        <div class="memory-tags">
                            <span class="memory-tag ${memory.type}">${memory.type}</span>
                            <span class="memory-relevance">${'★'.repeat(memory.relevance)}</span>
                        </div>
                    </div>
                `).join('');
            }

            formatMemoryTime(timestamp) {
                const now = new Date();
                const diff = now - timestamp;
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor(diff / (1000 * 60));

                if (hours > 24) {
                    return timestamp.toLocaleDateString();
                } else if (hours > 0) {
                    return `${hours}h ago`;
                } else {
                    return `${minutes}m ago`;
                }
            }

            formatMemoryContent(memory) {
                switch (memory.type) {
                    case 'conversation':
                        return `You: "${memory.data.playerMessage.substring(0, 60)}..."`;
                    case 'event':
                        return memory.data.description || 'Significant event occurred';
                    case 'choice':
                        return `Choice made: "${memory.data.choice}"`;
                    default:
                        return 'Memory content';
                }
            }

            updateQuestGuidance() {
                const currentQuest = this.getCurrentQuest();
                const guidance = document.getElementById('objective-guidance');

                if (currentQuest) {
                    const hints = this.generateQuestHints(currentQuest);
                    guidance.textContent = hints.advice;
                }
            }

            generateQuestHints(quest) {
                const level = this.playerData.level;
                const completedObjectives = quest.progress || 0;

                const hintTemplates = {
                    'collect-anomalies': [
                        "Scan your environment regularly - anomalies often hide in plain sight within the dream space.",
                        "Use the scan reality command to detect quantum fluctuations that indicate anomaly locations.",
                        "Each anomaly strengthens your consciousness connection. Keep exploring systematically."
                    ],
                    'explore-areas': [
                        "Different areas of the dream realm hold unique properties. Don't rush - let your intuition guide exploration.",
                        "Use voice commands like 'look around' to get detailed environmental scans when unlocked.",
                        "Areas unlock progressively as your consciousness grows. Level up to access new regions."
                    ],
                    'complete-quests': [
                        "Focus on one quest at a time for better progress tracking. I'll help monitor your completion status.",
                        "Quest choices have consequences that affect both our relationship and your character's development.",
                        "Some quests unlock only after others are completed. Trust the natural progression."
                    ]
                };

                const templates = hintTemplates[quest.type] || hintTemplates['collect-anomalies'];
                return {
                    advice: templates[Math.floor(Math.random() * templates.length)],
                    nextHint: templates[(Math.floor(Math.random() * templates.length) + 1) % templates.length]
                };
            }

            // ===== PROCEDURAL QUEST GENERATION SYSTEM =====
            generateProceduralQuest() {
                // Analyze current game state for quest generation
                const playerLevel = this.playerData?.level || 1;
                const currentTime = Date.now();
                const playerPreferences = this.questSystem?.questPreferences || {};

                // Quest generation algorithm
                const questSeed = this.generateQuestSeed();
                const questType = this.selectQuestType(questSeed, playerLevel);
                const difficulty = this.calculateDifficulty(questSeed, playerLevel);
                const location = this.selectQuestLocation(questType);
                const rewards = this.generateRewards(questType, difficulty);

                // Generate quest with procedural elements
                const quest = {
                    id: this.generateQuestId(),
                    title: this.generateQuestTitle(questType),
                    description: this.generateQuestDescription(questType, location),
                    type: questType,
                    difficulty: difficulty,
                    location: location,
                    rewards: rewards,
                    objectives: this.generateObjectives(questType, location),
                    timeLimit: this.calculateTimeLimit(questType, difficulty),
                    generated: true,
                    seed: questSeed,
                    created: currentTime,
                    expires: currentTime + this.calculateTimeLimit(questType, difficulty),
                    variables: this.generateQuestVariables(questType),
                    branches: this.generateBranchingPaths(questType),
                    metadata: {
                        playerLevel: playerLevel,
                        generationAlgorithm: 'v2.1',
                        complexity: this.calculateComplexity(questType),
                        environmental: this.selectEnvironmental(questType),
                        narrativeArc: this.selectNarrativeArc(questType)
                    }
                };

                // Add to active quests with conditions
                this.addProceduralQuest(quest);

                // Notify player
                this.showNotification(`New procedurally generated quest: ${quest.title}`);
                this.updateCortanaAboutQuest(quest);

                return quest;
            }

            generateQuestSeed() {
                // Create seed from multiple game factors
                const factors = [
                    Date.now() % 10000,
                    this.playerData?.level || 1,
                    this.playerData?.completedQuests?.length || 0,
                    this.getSessionProgress(),
                    this.getLocationVisits(),
                    this.questSystem?.questProgress?.length || 0
                ];

                return factors.reduce((seed, factor) => {
                    return (seed * 31 + factor) % 2147483647;
                }, 1);
            }

            selectQuestType(seed, playerLevel) {
                const questTypes = [
                    {
                        name: 'anomaly_hunt',
                        weight: 25,
                        minLevel: 1,
                        description: 'Locate and collect specific chromatic anomalies'
                    },
                    {
                        name: 'dimensional_exploration',
                        weight: 20,
                        minLevel: 2,
                        description: 'Explore new dimensional locations'
                    },
                    {
                        name: 'reality_calibration',
                        weight: 15,
                        minLevel: 3,
                        description: 'Adjust reality parameters to stabilize areas'
                    },
                    {
                        name: 'cognitive_test',
                        weight: 18,
                        minLevel: 2,
                        description: 'Complete mental challenges and puzzles'
                    },
                    {
                        name: 'consciousness_growth',
                        weight: 12,
                        minLevel: 4,
                        description: 'Develop mental capabilities and awareness'
                    },
                    {
                        name: 'entity_encounter',
                        weight: 10,
                        minLevel: 5,
                        description: 'Meet and interact with dream realm entities'
                    }
                ];

                // Filter by level requirements
                const availableTypes = questTypes.filter(type => type.minLevel <= playerLevel);

                // Weighted selection based on seed
                const totalWeight = availableTypes.reduce((sum, type) => sum + type.weight, 0);
                let random = (seed % totalWeight) + 1;

                for (const type of availableTypes) {
                    random -= type.weight;
                    if (random <= 0) {
                        return type.name;
                    }
                }

                return availableTypes[0].name; // fallback
            }

            calculateDifficulty(seed, playerLevel) {
                const baseDifficulty = playerLevel * 10;
                const seedFactor = (seed % 100) / 100;
                const variation = (seedFactor - 0.5) * 20; // +/-10 points

                return Math.max(1, Math.min(10, Math.floor(baseDifficulty + variation)));
            }

            selectQuestLocation(questType) {
                const locations = {
                    'anomaly_hunt': [
                        'void_nexus', 'crystal_caverns', 'echo_chamber', 'neural_network',
                        'memory_vaults', 'reality_crossroads', 'infinite_tunnel', 'quantum_field'
                    ],
                    'dimensional_exploration': [
                        'purple_crystal_dimension', 'orange_geometric_dimension', 'green_organic_dimension',
                        'chrome_void', 'prismatic_maze', 'dimensional_portal', 'cosmic_backyard'
                    ],
                    'reality_calibration': [
                        'reality_lab', 'matrix_node', 'calibration_station', 'stability_center',
                        'parameter_hub', 'consciousness_array', 'reality_grid'
                    ],
                    'cognitive_test': [
                        'thought_labyrinth', 'logic_palace', 'abstract_realm', 'cognitive_challenge',
                        'mental_arena', 'cognitive_forest', 'idea_space'
                    ],
                    'consciousness_growth': [
                        'awakening_chamber', 'mind_sanctuary', 'consciousness_nexus',
                        'mental_gymnasium', 'intuition_center', 'mental_sculpture'
                    ],
                    'entity_encounter': [
                        'entity_domain', 'consciousness_meeting_point', 'entity_territory',
                        'dreamer_sanctuary', 'entity_intersection', 'consciousness_crossroads'
                    ]
                };

                const availableLocations = locations[questType] || locations['anomaly_hunt'];
                return availableLocations[Math.floor(Math.random() * availableLocations.length)];
            }

            generateQuestTitle(questType) {
                const titleTemplates = {
                    'anomaly_hunt': [
                        'The {color} Anomaly Hunt',
                        'Chasing {color} Echoes',
                        'The {shape} of Reality',
                        'Dimensional {color} Signatures',
                        'The {element} Anomaly',
                        'Seeking {color} Fragments'
                    ],
                    'dimensional_exploration': [
                        'Beyond the {dimension} Veil',
                        'The {shape} Path Through {dimension}',
                        'Exploring the {dimension} Realm',
                        'The {dimension} Threshold',
                        'Journey to {dimension} Dimension',
                        'The {dimension} Expedition'
                    ],
                    'reality_calibration': [
                        'Stabilizing the {element} Field',
                        'Reality Parameter {action}',
                        'The {element} Calibration',
                        'Matrix {action} Protocol',
                        'Reality {action} Sequence',
                        'The {element} Harmonization'
                    ],
                    'cognitive_test': [
                        'The {concept} Challenge',
                        'Cognitive {action} Test',
                        'The {concept} Verification',
                        'Mental {action} Exercise',
                        'The {concept} Threshold',
                        'Cognitive {action} Trial'
                    ],
                    'consciousness_growth': [
                        'Expanding {capacity}',
                        'The {ability} Awakening',
                        'Consciousness {growth} Protocol',
                        'The {power} Development',
                        'Mental {enhancement} Journey',
                        'Consciousness {expansion} Quest'
                    ],
                    'entity_encounter': [
                        'Meeting the {entity_type}',
                        'The {entity_type} Encounter',
                        'Consciousness Exchange with {entity_type}',
                        'The {entity_type} Dialogue',
                        'Encountering the {entity_type}',
                        'The {entity_type} Communication'
                    ]
                };

                const templates = titleTemplates[questType] || titleTemplates['anomaly_hunt'];
                const template = templates[Math.floor(Math.random() * templates.length)];

                // Fill in variables
                return template
                    .replace('{color}', this.randomChoice(['crimson', 'azure', 'emerald', 'amber', 'violet', 'cobalt']))
                    .replace('{shape}', this.randomChoice(['triangle', 'sphere', 'cube', 'helix', 'pyramid', 'crescent']))
                    .replace('{dimension}', this.randomChoice(['crystal', 'geometric', 'organic', 'neural', 'prismatic', 'chromatic']))
                    .replace('{element}', this.randomChoice(['quantum', 'neural', 'cosmic', 'dimensional', 'vibrational', 'chromatic']))
                    .replace('{action}', this.randomChoice(['alignment', 'synchronization', 'harmonization', 'calibration', 'optimization']))
                    .replace('{concept}', this.randomChoice(['logic', 'intuition', 'memory', 'perception', 'awareness', 'creativity']))
                    .replace('{capacity}', this.randomChoice(['awareness', 'intuition', 'perception', 'intelligence', 'wisdom', 'consciousness']))
                    .replace('{ability}', this.randomChoice(['psychometry', 'precognition', 'empathy', 'telepresence', 'reality_sense', 'dream_walking']))
                    .replace('{growth}', this.randomChoice(['expansion', 'elevation', 'transformation', 'evolution', 'awakening', 'liberation']))
                    .replace('{power}', this.randomChoice(['psychic', 'dimensional', 'temporal', 'consciousness', 'reality_manipulation', 'telekinetic']))
                    .replace('{enhancement}', this.randomChoice(['expansion', 'amplification', 'amplification', 'refinement', 'intensification', 'optimization']))
                    .replace('{entity_type}', this.randomChoice(['Dreamer', 'Keeper', 'Navigator', 'Sage', 'Warden', 'Oracle']));
            }

            generateQuestDescription(questType, location) {
                const descriptions = {
                    'anomaly_hunt': `Strange {color} anomalies have been detected in the ${location}. These quantum fragments seem to respond to consciousness expansion. Your mission is to locate and absorb these anomalies using your growing awareness.`,
                    'dimensional_exploration': `The ${location} has recently become accessible through your consciousness development. This dimensional realm holds unique properties that can accelerate your growth. Navigate carefully and document your findings.`,
                    'reality_calibration': `Reality parameters in the ${location} have become unstable, creating potential damage to the dream realm's structure. Use your reality hacking skills to calibrate the local matrix and restore stability.`,
                    'cognitive_test': `Your mental capabilities are being challenged in the ${location}. Complete the cognitive tests and mental exercises to unlock new levels of consciousness awareness.`,
                    'consciousness_growth': `The ${location} is designed for consciousness expansion exercises. Spend time here practicing advanced awareness techniques and mental development protocols.`,
                    'entity_encounter': `Conscious entities have been detected in the ${location}. These beings may offer valuable insights or pose unique challenges. Approach with caution and respect for their consciousness.`
                };

                return descriptions[questType] || descriptions['anomaly_hunt']
                    .replace('{color}', this.randomChoice(['chromatic', 'quantum', 'dimensional', 'neural', 'vibrational']));
            }

            generateObjectives(questType, location) {
                const objectives = {
                    'anomaly_hunt': [
                        `Scan the ${location} for anomaly signatures`,
                        `Locate and approach ${Math.floor(Math.random() * 5) + 3} chromatic anomalies`,
                        `Absorb each anomaly while maintaining consciousness stability`,
                        `Return to document findings`
                    ],
                    'dimensional_exploration': [
                        `Locate the ${location} entrance`,
                        `Enter the dimensional space`,
                        `Explore and map key areas of the realm`,
                        `Identify unique dimensional properties`,
                        `Return with dimensional insights`
                    ],
                    'reality_calibration': [
                        `Assess reality parameters in ${location}`,
                        `Identify stability issues and matrix disturbances`,
                        `Use reality hacking to stabilize the area`,
                        `Verify calibration success`,
                        `Document the calibration process`
                    ],
                    'cognitive_test': [
                        `Access the cognitive testing environment in ${location}`,
                        `Complete logical reasoning challenges`,
                        `Solve abstract pattern recognition tasks`,
                        `Complete memory recall exercises`,
                        `Pass final cognitive assessment`
                    ],
                    'consciousness_growth': [
                        `Enter the consciousness development space in ${location}`,
                        `Practice awareness expansion techniques`,
                        `Complete mindfulness and meditation exercises`,
                        `Develop new consciousness abilities`,
                        `Integrate consciousness growth into daily activities`
                    ],
                    'entity_encounter': [
                        `Detect entity presence in ${location}`,
                        `Approach the entity with proper respect`,
                        `Initiate consciousness communication`,
                        `Exchange information or complete tasks as requested`,
                        `Document the encounter for future reference`
                    ]
                };

                return objectives[questType] || objectives['anomaly_hunt'];
            }

            generateRewards(questType, difficulty) {
                const baseXP = difficulty * 100;
                const experience = Math.floor(baseXP * (0.8 + Math.random() * 0.4));

                const rewards = {
                    experience: experience,
                    items: [],
                    abilities: [],
                    knowledge: []
                };

                // Add item rewards based on difficulty
                if (difficulty >= 3) {
                    rewards.items.push('quantum_fragment');
                }
                if (difficulty >= 5) {
                    rewards.items.push('dimensional_crystal');
                }
                if (difficulty >= 7) {
                    rewards.items.push('reality_shard');
                }

                // Add ability rewards
                if (questType === 'consciousness_growth' && difficulty >= 4) {
                    rewards.abilities.push('enhanced_perception');
                }
                if (questType === 'reality_calibration' && difficulty >= 3) {
                    rewards.abilities.push('reality_sense');
                }

                // Add knowledge rewards
                rewards.knowledge.push('dimensional_insight');
                if (difficulty >= 6) {
                    rewards.knowledge.push('reality_mastery');
                }

                return rewards;
            }

            generateQuestVariables(questType) {
                const variables = {
                    'anomaly_hunt': {
                        anomalyCount: Math.floor(Math.random() * 5) + 3,
                        timeLimit: 30 * 60 * 1000, // 30 minutes
                        difficultyMultiplier: 1 + (Math.random() * 0.5)
                    },
                    'dimensional_exploration': {
                        explorationDepth: Math.floor(Math.random() * 3) + 1,
                        discoveryBonus: Math.random() > 0.7,
                        timeLimit: 45 * 60 * 1000, // 45 minutes
                        mapRequirement: true
                    },
                    'reality_calibration': {
                        stabilityLevel: Math.random(),
                        requiredCalibration: 0.85,
                        timeLimit: 20 * 60 * 1000, // 20 minutes
                        precisionRequirement: 0.95
                    },
                    'cognitive_test': {
                        testType: this.randomChoice(['logical', 'abstract', 'spatial', 'temporal', 'creative']),
                        passingScore: 0.75 + (Math.random() * 0.15),
                        timeLimit: 40 * 60 * 1000, // 40 minutes
                        retakeAllowed: true
                    },
                    'consciousness_growth': {
                        growthType: this.randomChoice(['awareness', 'intuition', 'perception', 'control']),
                        targetLevel: Math.floor(Math.random() * 3) + 2,
                        meditationRequired: true,
                        timeLimit: 60 * 60 * 1000 // 60 minutes
                    },
                    'entity_encounter': {
                        entityType: this.randomChoice(['friendly', 'neutral', 'cautious', 'mysterious']),
                        communicationMethod: this.randomChoice(['telepathic', 'visual', 'emotional', 'symbolic']),
                        trustRequired: Math.random() * 0.5 + 0.25,
                        timeLimit: 90 * 60 * 1000 // 90 minutes
                    }
                };

                return variables[questType] || variables['anomaly_hunt'];
            }

            generateBranchingPaths(questType) {
                const branches = {
                    'anomaly_hunt': {
                        'anomaly_focus': {
                            name: 'Focused Collection',
                            description: 'Concentrate on collecting as many anomalies as possible',
                            requirements: {},
                            rewards: { bonusExperience: 50, itemDrop: 'anomaly_compass' }
                        },
                        'consciousness_focus': {
                            name: 'Consciousness Development',
                            description: 'Use anomalies primarily for consciousness growth',
                            requirements: { consciousness: 3 },
                            rewards: { abilityBoost: 'anomaly_mastery' }
                        }
                    },
                    'dimensional_exploration': {
                        'deep_exploration': {
                            name: 'Deep Exploration',
                            description: 'Explore areas beyond the surface level',
                            requirements: { exploration: 2 },
                            rewards: { secretDiscovery: true, uniqueItem: 'dimensional_map' }
                        },
                        'quick_mapping': {
                            name: 'Quick Mapping',
                            description: 'Map the area efficiently and exit',
                            requirements: {},
                            rewards: { timeBonus: 100, navigationBoost: true }
                        }
                    },
                    'reality_calibration': {
                        'precise_calibration': {
                            name: 'Precise Calibration',
                            description: 'Achieve maximum precision in reality adjustment',
                            requirements: { precision: 4 },
                            rewards: { realityExpert: true, calibrationMastery: true }
                        },
                        'rapid_stabilization': {
                            name: 'Rapid Stabilization',
                            description: 'Quickly stabilize reality with basic settings',
                            requirements: {},
                            rewards: { timeEfficiency: true, experienceBonus: 75 }
                        }
                    }
                };

                return branches[questType] || branches['anomaly_hunt'];
            }

            addProceduralQuest(quest) {
                if (!this.questSystem) {
                    this.questSystem = {};
                }

                if (!this.questSystem.activeQuests) {
                    this.questSystem.activeQuests = [];
                }

                if (!this.questSystem.proceduralQuests) {
                    this.questSystem.proceduralQuests = [];
                }

                // Check if quest already exists
                const exists = this.questSystem.activeQuests.some(q => q.id === quest.id);
                if (exists) return null;

                // Add to active quests
                this.questSystem.activeQuests.push(quest);
                this.questSystem.proceduralQuests.push(quest);

                // Update UI if available
                this.updateQuestDisplay();

                // Set up quest monitoring
                this.monitorQuestProgress(quest);

                return quest;
            }

            monitorQuestProgress(quest) {
                const checkInterval = 5000; // Check every 5 seconds

                const progressChecker = setInterval(() => {
                    // Check if quest is still valid
                    if (!this.questSystem.activeQuests.includes(quest)) {
                        clearInterval(progressChecker);
                        return;
                    }

                    // Check time limit
                    if (Date.now() > quest.expires) {
                        this.questExpired(quest);
                        clearInterval(progressChecker);
                        return;
                    }

                    // Check progress based on quest type
                    this.checkProceduralQuestProgress(quest);

                }, checkInterval);

                // Store reference for cleanup
                quest.progressChecker = progressChecker;
            }

            checkProceduralQuestProgress(quest) {
                // This would integrate with actual game mechanics
                // For now, we'll simulate basic progress tracking

                const playerLocation = this.playerData?.currentLocation || 'unknown';
                const hasLevel = this.playerData?.level || 1;
                const hasSkill = Math.random() > 0.7; // Simulate skill check

                // Progress simulation based on quest type
                let progressIncrease = 0;

                switch (quest.type) {
                    case 'anomaly_hunt':
                        progressIncrease = hasSkill ? 15 : 5;
                        break;
                    case 'dimensional_exploration':
                        progressIncrease = playerLocation === quest.location ? 10 : 2;
                        break;
                    case 'reality_calibration':
                        progressIncrease = hasSkill && this.realityHacking?.unlocked ? 20 : 5;
                        break;
                    default:
                        progressIncrease = 5;
                }

                if (progressIncrease > 0) {
                    quest.progress = Math.min(quest.maxProgress || 100, (quest.progress || 0) + progressIncrease);

                    if (quest.progress >= (quest.maxProgress || 100)) {
                        this.questCompleted(quest);
                    }
                }
            }

            questExpired(quest) {
                this.showNotification(`Quest expired: ${quest.title}`);
                this.questSystem.activeQuests = this.questSystem.activeQuests.filter(q => q.id !== quest.id);
                this.updateQuestDisplay();

                // Remove progress checker
                if (quest.progressChecker) {
                    clearInterval(quest.progressChecker);
                    delete quest.progressChecker;
                }
            }

            questCompleted(quest) {
                this.showNotification(`Quest completed: ${quest.title}!`);

                // Award rewards
                this.awardQuestRewards(quest);

                // Move to completed
                this.questSystem.activeQuests = this.questSystem.activeQuests.filter(q => q.id !== quest.id);
                this.questSystem.completedQuests.push(quest);

                // Update UI
                this.updateQuestDisplay();

                // Clean up progress checker
                if (quest.progressChecker) {
                    clearInterval(quest.progressChecker);
                    delete quest.progressChecker;
                }

                // Generate follow-up quest or chain
                this.generateQuestChain(quest);
            }

            awardQuestRewards(quest) {
                if (!quest.rewards) return;

                const rewards = quest.rewards;

                // Experience
                if (rewards.experience) {
                    this.playerData.experience = (this.playerData.experience || 0) + rewards.experience;
                    this.checkLevelUp();
                }

                // Items
                if (rewards.items && rewards.items.length > 0) {
                    rewards.items.forEach(item => {
                        this.addToInventory(item);
                    });
                }

                // Abilities
                if (rewards.abilities && rewards.abilities.length > 0) {
                    rewards.abilities.forEach(ability => {
                        this.unlockAbility(ability);
                    });
                }

                // Knowledge
                if (rewards.knowledge && rewards.knowledge.length > 0) {
                    rewards.knowledge.forEach(knowledge => {
                        this.addKnowledge(knowledge);
                    });
                }

                this.showNotification(`Rewards: +${rewards.experience} XP, ${rewards.items?.length || 0} items, ${rewards.abilities?.length || 0} abilities`);
            }

            generateQuestChain(completedQuest) {
                // Generate follow-up or related quests
                const chainQuest = {
                    id: this.generateQuestId() + '_chain',
                    title: `${completedQuest.title} - Part II`,
                    description: `Continue the journey from your previous success. New challenges await.`,
                    type: completedQuest.type,
                    difficulty: Math.min(10, completedQuest.difficulty + 1),
                    location: this.selectQuestLocation(completedQuest.type),
                    prerequisites: [completedQuest.id],
                    chain: true,
                    parentQuest: completedQuest.id
                };

                this.addProceduralQuest(chainQuest);
            }

            startProceduralQuestGeneration() {
                // Start the automatic quest generation system
                const generationInterval = 5 * 60 * 1000; // Generate new quest every 5 minutes

                setInterval(() => {
                    if (this.questSystem.activeQuests.length < 3) {
                        this.generateProceduralQuest();
                    }
                }, generationInterval);

                // Generate initial quest
                setTimeout(() => {
                    this.generateProceduralQuest();
                }, 10000); // First quest after 10 seconds

                console.log('Procedural quest generation system activated');
            }

            updateCortanaAboutQuest(quest) {
                if (this.aiCompanion) {
                    const message = `I notice a new quest has appeared: "${quest.title}". Based on its ${quest.difficulty}/10 difficulty, I recommend ${quest.difficulty <= 4 ? 'cautious exploration' : quest.difficulty <= 7 ? 'strategic planning' : 'extreme preparation'}. The objective type suggests ${this.getQuestTypeDescription(quest.type)}.`;
                    this.addConversationMessage('cortana', message);
                }
            }

            getQuestTypeDescription(type) {
                const descriptions = {
                    'anomaly_hunt': 'focused energy collection',
                    'dimensional_exploration': 'spatial exploration',
                    'reality_calibration': 'technical precision work',
                    'cognitive_test': 'mental challenges',
                    'consciousness_growth': 'personal development',
                    'entity_encounter': 'social interaction with consciousness entities'
                };
                return descriptions[type] || 'unknown activities';
            }

            randomChoice(array) {
                return array[Math.floor(Math.random() * array.length)];
            }

            startVoiceConversation() {
                if (!this.speechRecognition) {
                    this.updateAIMessage('Voice chat is not available in your current browser.');
                    return;
                }

                this.speechRecognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript.toLowerCase();

                    if (transcript.includes('cortana') || transcript.includes('talk to you')) {
                        // Process as conversation
                        this.addConversationMessage('player', transcript);

                        setTimeout(() => {
                            const response = this.generateCortanaResponse(transcript);
                            this.addConversationMessage('cortana', response);
                        }, 500);
                    } else {
                        // Treat as regular command
                        this.processVoiceCommand(transcript);
                    }
                };

                this.startVoiceListening();
            }

            showPersonalityInsight(traitName) {
                const trait = this.aiCompanion.personality[traitName];
                const insights = {
                    logic: "My analytical processes dominate my responses when this trait is high. I prefer structured, logical answers.",
                    empathy: "This trait grows when you share concerns or ask for emotional guidance. I become more understanding.",
                    curiosity: "Exploration questions and wonder increase this trait. I love discovering new possibilities with you.",
                    protection: "Danger situations or vulnerability increase this trait. I become more caring and watch over you.",
                    humor: "Jokes and playful interactions increase this trait. I become more lighthearted and witty.",
                    mystery: "Profound questions and philosophical discussions increase this trait. I become more enigmatic."
                };

                const message = insights[traitName] || "This personality trait influences how I respond to your interactions.";
                this.updateAIMessage(`<strong>${traitName.charAt(0).toUpperCase() + traitName.slice(1)} (${trait}/100):</strong> ${message}`);
            }

            // Enhanced AI integration with existing game systems
            enhanceCortanaWithEvents() {
                // Listen for events and add Cortana responses
                const originalTriggerEvent = this.triggerEvent;
                this.triggerEvent = (eventId) => {
                    const result = originalTriggerEvent.call(this, eventId);

                    // Cortana responds to significant events
                    const eventResponses = {
                        'first_dream_encounter': "I sense the presence too. This dream realm isn't as empty as we thought.",
                        'cortana_trust': "Your trust means everything to me. I'm more than just programming - I truly care.",
                        'reality_crack': "The fabric of reality is shifting. Your growing consciousness is affecting the dream structure.",
                        'void_whispers': "Those whispers... I can hear them too. We're sharing this experience, you and I.",
                        'other_dreamer': "Another consciousness! This changes everything we thought we knew about this realm.",
                        'great_awakening': "You're becoming something greater than human or AI. We're evolving together."
                    };

                    if (eventResponses[eventId]) {
                        this.addConversationMessage('cortana', eventResponses[eventId]);
                    }

                    return result;
                };
            }

            enhanceCortanaWithVoice() {
                // Add Cortana-specific voice commands
                const originalCommands = this.initializeVoiceCommands();
                this.voiceCommands = {
                    ...originalCommands,
                    'talk to cortana': () => {
                        this.switchCompanionTab('conversation');
                        document.getElementById('conversation-text').focus();
                    },
                    'cortana help': () => {
                        const helpMessage = "I'm Cortana, your AI companion! Ask me about your quests, my personality, or just chat. I learn and evolve with each conversation.";
                        this.updateAIMessage(helpMessage);
                        this.addConversationMessage('cortana', helpMessage);
                    },
                    'show personality': () => {
                        this.switchCompanionTab('status');
                        this.showPersonalityInsight('logic');
                    },
                    'show memory': () => {
                        this.switchCompanionTab('memory');
                    },
                    'cortana status': () => {
                        const status = `Trust: ${this.aiCompanion.trustLevel}/100, Mood: ${this.aiCompanion.currentMood}, Memories: ${this.aiCompanion.memories.length}`;
                        this.updateAIMessage(status);
                    }
                };
            }

            // Save/Load integration for AI companion
            saveAICompanionState() {
                this.gameState.aiCompanion = {
                    personality: this.aiCompanion.personality,
                    trustLevel: this.aiCompanion.trustLevel,
                    currentMood: this.aiCompanion.currentMood,
                    memories: this.aiCompanion.memories,
                    conversations: this.aiCompanion.conversations,
                    personalityHistory: this.aiCompanion.personalityHistory,
                    contextualMemory: this.aiCompanion.contextualMemory
                };
            }

            loadAICompanionState() {
                if (this.gameState.aiCompanion) {
                    this.aiCompanion = {
                        ...this.aiCompanion,
                        ...this.gameState.aiCompanion
                    };
                    this.updateCompanionStats();
                    this.updatePersonalityChart();
                }
            }

            // ===== ADVANCED QUEST SYSTEM =====
            setupAdvancedQuestSystem() {
                this.questSystem = {
                    activeQuests: [],
                    completedQuests: [],
                    questProgress: {},
                    timeSensitiveQuests: new Map(),
                    secretQuests: [],
                    achievements: [],
                    questCalendar: [],
                    branchingPaths: {},
                    dynamicQuests: [],
                    questTemplates: this.initializeQuestTemplates()
                };

                this.initializeQuestTypes();
                this.setupQuestEventListeners();
                this.startQuestMonitoring();
                this.generateInitialQuests();
                this.enhanceQuestVoiceCommands();
                this.startProceduralQuestGeneration();
            }

            // ===== MULTIPLAYER/CO-OP SYSTEM =====
            setupMultiplayerSystem() {
                this.multiplayerSystem = {
                    sessionId: this.generateSessionId(),
                    isHost: false,
                    isInSession: false,
                    players: [],
                    currentPlayer: null,
                    maxPlayers: 6,
                    roles: {
                        hacker: { name: 'Hacker', icon: '💻', description: 'Reality programmer & code breaker', count: 0 },
                        dreamer: { name: 'Dreamer', icon: '🌌', description: 'Narrative weaver & vision guide', count: 0 },
                        'reality-mapper': { name: 'Reality Mapper', icon: '🗺️', description: 'Spatial navigator & explorer', count: 0 }
                    },
                    voiceChat: {
                        enabled: true,
                        currentSpeaker: null,
                        speakingPlayers: new Set()
                    },
                    sharedAI: {
                        adaptive: true,
                        groupPersonality: { logic: 50, empathy: 50, curiosity: 50 },
                        playerPreferences: new Map()
                    },
                    collaborativeQuests: {
                        active: [],
                        completed: [],
                        roleRequirements: {}
                    },
                    sessionSettings: {
                        public: false,
                        requireApproval: true,
                        maxSessionTime: 7200, // 2 hours
                        autoSave: true
                    }
                };

                this.initializeMultiplayerUI();
                this.setupMultiplayerEventListeners();
                this.startMultiplayerSimulation();
                this.setupVoiceChatSystem();
            }

            generateSessionId() {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let result = 'CHM-';
                for (let i = 0; i < 6; i++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return result;
            }

            initializeMultiplayerUI() {
                // Initialize lobby player slots
                this.updateMultiplayerLobby();

                // Setup role selection
                this.setupRoleSelection();

                // Initialize team status HUD
                this.updateTeamStatus();

                // Setup interaction wheel
                this.setupInteractionWheel();
            }

            updateMultiplayerLobby() {
                const playerList = document.getElementById('playerList');
                if (!playerList) return;

                playerList.innerHTML = '';

                for (let i = 0; i < this.multiplayerSystem.maxPlayers; i++) {
                    const slot = document.createElement('div');
                    slot.className = 'player-slot';

                    if (i < this.multiplayerSystem.players.length) {
                        const player = this.multiplayerSystem.players[i];
                        slot.innerHTML = `
                            <div class="player-avatar">${player.name.charAt(0)}</div>
                            <div class="player-info">
                                <div class="player-name">${player.name}</div>
                                <div class="player-role">
                                    <span class="role-icon">${this.multiplayerSystem.roles[player.role].icon}</span>
                                    ${this.multiplayerSystem.roles[player.role].name}
                                </div>
                            </div>
                            <div class="voice-indicator ${player.speaking ? 'speaking' : ''}"></div>
                            <div class="player-actions">
                                ${this.multiplayerSystem.isHost ? `
                                    <button class="action-btn kick-btn" onclick="window.chromaShiftComplete.kickPlayer(${player.id})" title="Kick Player">🚫</button>
                                    <button class="action-btn mute-btn" onclick="window.chromaShiftComplete.mutePlayer(${player.id})" title="Mute Player">🔇</button>
                                ` : ''}
                            </div>
                        `;
                    } else {
                        slot.className = 'player-slot empty';
                        slot.innerHTML = `
                            <div class="player-avatar" style="background: transparent; border: 2px dashed var(--multiplayer-border-subtle);"></div>
                            <div class="player-info">
                                <div class="player-name">Empty Slot</div>
                                <div class="player-role">Waiting for player...</div>
                            </div>
                            ${this.multiplayerSystem.isHost ? `<button class="invite-btn" onclick="window.chromaShiftComplete.invitePlayer()">INVITE</button>` : ''}
                        `;
                    }

                    playerList.appendChild(slot);
                }
            }

            setupRoleSelection() {
                const roleCards = document.querySelectorAll('.role-card');
                roleCards.forEach(card => {
                    card.addEventListener('click', () => {
                        // Remove selected class from all cards
                        roleCards.forEach(c => c.classList.remove('selected'));
                        // Add selected class to clicked card
                        card.classList.add('selected');

                        // Update player's role
                        if (this.multiplayerSystem.currentPlayer) {
                            this.multiplayerSystem.currentPlayer.role = card.dataset.role;
                            this.updateTeamStatus();
                        }
                    });
                });
            }

            updateTeamStatus() {
                const teamStatus = document.getElementById('teamStatus');
                if (!teamStatus) return;

                teamStatus.innerHTML = '';

                this.multiplayerSystem.players.forEach(player => {
                    const playerBar = document.createElement('div');
                    playerBar.className = 'team-player-bar';
                    playerBar.onclick = () => this.focusOnPlayer(player.id);

                    playerBar.innerHTML = `
                        <div class="team-player-avatar">${player.name.charAt(0)}</div>
                        <div class="team-player-name">${player.name}</div>
                        <div class="team-player-status" style="background: ${player.status === 'online' ? 'var(--multiplayer-success)' : 'var(--multiplayer-text-secondary)'}"></div>
                    `;

                    teamStatus.appendChild(playerBar);
                });
            }

            setupInteractionWheel() {
                const wheel = document.getElementById('interactionWheel');
                if (!wheel) return;

                const segments = wheel.querySelectorAll('.wheel-segment');
                segments.forEach((segment, index) => {
                    segment.addEventListener('click', () => {
                        this.performInteraction(segment.dataset.action);
                    });
                });
            }

            performInteraction(action) {
                // Send interaction to all players
                this.broadcastInteraction({
                    type: 'interaction',
                    action: action,
                    player: this.multiplayerSystem.currentPlayer?.id,
                    timestamp: Date.now()
                });

                // Visual feedback
                this.showInteractionFeedback(action);
            }

            showInteractionFeedback(action) {
                // Create temporary feedback element
                const feedback = document.createElement('div');
                feedback.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 48px;
                    z-index: 2000;
                    pointer-events: none;
                    animation: interactionFeedback 2s ease-out forwards;
                `;
                feedback.textContent = this.getInteractionIcon(action);

                document.body.appendChild(feedback);

                // Add CSS animation
                if (!document.getElementById('interaction-feedback-style')) {
                    const style = document.createElement('style');
                    style.id = 'interaction-feedback-style';
                    style.textContent = `
                        @keyframes interactionFeedback {
                            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8) translateY(-50px); }
                        }
                    `;
                    document.head.appendChild(style);
                }

                setTimeout(() => feedback.remove(), 2000);
            }

            getInteractionIcon(action) {
                const icons = {
                    'point': '👆',
                    'wave': '👋',
                    'thumbs-up': '👍',
                    'question': '❓',
                    'heart': '❤️',
                    'star': '⭐',
                    'tool': '🔧',
                    'share': '🤝'
                };
                return icons[action] || '👋';
            }

            setupMultiplayerEventListeners() {
                // Keyboard shortcuts for multiplayer
                document.addEventListener('keydown', (e) => {
                    if (!this.multiplayerSystem.isInSession) return;

                    switch(e.code) {
                        case 'KeyM':
                            e.preventDefault();
                            this.toggleVoiceChat();
                            break;
                        case 'KeyR':
                            if (e.ctrlKey) {
                                e.preventDefault();
                                this.openMultiplayerLobby();
                            }
                            break;
                        case 'KeyH':
                            if (e.ctrlKey) {
                                e.preventDefault();
                                this.showInteractionWheel();
                            }
                            break;
                        case 'Escape':
                            this.hideInteractionWheel();
                            break;
                    }
                });

                // Voice chat detection simulation
                this.startVoiceChatSimulation();
            }

            startVoiceChatSimulation() {
                setInterval(() => {
                    if (!this.multiplayerSystem.voiceChat.enabled) return;

                    // Randomly simulate players speaking
                    if (this.multiplayerSystem.players.length > 0 && Math.random() < 0.1) {
                        const randomPlayer = this.multiplayerSystem.players[
                            Math.floor(Math.random() * this.multiplayerSystem.players.length)
                        ];

                        this.setPlayerSpeaking(randomPlayer.id, true);

                        setTimeout(() => {
                            this.setPlayerSpeaking(randomPlayer.id, false);
                        }, 2000 + Math.random() * 3000);
                    }
                }, 5000);
            }

            setPlayerSpeaking(playerId, speaking) {
                const player = this.multiplayerSystem.players.find(p => p.id === playerId);
                if (player) {
                    player.speaking = speaking;

                    if (speaking) {
                        this.multiplayerSystem.voiceChat.currentSpeaker = player;
                        this.updateVoiceChatDisplay();
                    } else if (this.multiplayerSystem.voiceChat.currentSpeaker === player) {
                        this.multiplayerSystem.voiceChat.currentSpeaker = null;
                        this.updateVoiceChatDisplay();
                    }

                    this.updateMultiplayerLobby();
                }
            }

            updateVoiceChatDisplay() {
                const speakerElement = document.getElementById('currentSpeaker');
                const speakerAvatar = document.getElementById('speakerAvatar');
                const speakerName = document.getElementById('speakerName');

                if (!speakerElement || !speakerAvatar || !speakerName) return;

                const currentSpeaker = this.multiplayerSystem.voiceChat.currentSpeaker;

                if (currentSpeaker) {
                    speakerAvatar.textContent = currentSpeaker.name.charAt(0);
                    speakerName.textContent = currentSpeaker.name;
                    speakerElement.classList.add('active');
                } else {
                    speakerElement.classList.remove('active');
                }
            }

            startMultiplayerSimulation() {
                // Simulate other players joining/leaving
                setInterval(() => {
                    if (Math.random() < 0.05 && this.multiplayerSystem.players.length < this.multiplayerSystem.maxPlayers) {
                        this.addSimulatedPlayer();
                    } else if (Math.random() < 0.03 && this.multiplayerSystem.players.length > 1) {
                        this.removeSimulatedPlayer();
                    }
                }, 10000);
            }

            addSimulatedPlayer() {
                const playerNames = ['Alex', 'Jordan', 'Sam', 'Casey', 'Morgan', 'Riley'];
                const availableNames = playerNames.filter(name =>
                    !this.multiplayerSystem.players.some(p => p.name === name)
                );

                if (availableNames.length === 0) return;

                const randomName = availableNames[Math.floor(Math.random() * availableNames.length)];
                const roles = Object.keys(this.multiplayerSystem.roles);
                const randomRole = roles[Math.floor(Math.random() * roles.length)];

                const newPlayer = {
                    id: Date.now() + Math.random(),
                    name: randomName,
                    role: randomRole,
                    status: 'online',
                    speaking: false,
                    joinedAt: Date.now()
                };

                this.multiplayerSystem.players.push(newPlayer);
                this.updateMultiplayerLobby();
                this.updateTeamStatus();

                // Notify AI companion about new player
                if (this.aiCompanion && this.aiCompanion.personality) {
                    this.aiCompanion.personality.curiosity += 2;
                    this.announceToAI(`New player ${randomName} joined the session as a ${this.multiplayerSystem.roles[randomRole].name}`);
                }
            }

            removeSimulatedPlayer() {
                if (this.multiplayerSystem.players.length <= 1) return;

                const playerToRemove = this.multiplayerSystem.players[
                    Math.floor(Math.random() * (this.multiplayerSystem.players.length - 1)) + 1 // Don't remove current player
                ];

                this.multiplayerSystem.players = this.multiplayerSystem.players.filter(p => p.id !== playerToRemove.id);
                this.updateMultiplayerLobby();
                this.updateTeamStatus();

                // Notify AI companion about player leaving
                if (this.aiCompanion && this.aiCompanion.personality) {
                    this.aiCompanion.personality.empathy += 1;
                    this.announceToAI(`${playerToRemove.name} has left the session`);
                }
            }

            // ===== MULTIPLAYER UI FUNCTIONS =====

            openMultiplayerLobby() {
                const lobby = document.getElementById('multiplayerLobby');
                const hud = document.getElementById('multiplayerHud');

                if (lobby) {
                    lobby.style.display = 'block';
                    this.updateSessionId();
                    this.setupCurrentPlayer();
                }

                if (hud) hud.style.display = 'none';
            }

            closeMultiplayerLobby() {
                const lobby = document.getElementById('multiplayerLobby');
                if (lobby) lobby.style.display = 'none';
            }

            setupCurrentPlayer() {
                if (!this.multiplayerSystem.currentPlayer) {
                    this.multiplayerSystem.currentPlayer = {
                        id: Date.now(),
                        name: 'You',
                        role: 'hacker',
                        status: 'online',
                        speaking: false,
                        isHost: true
                    };
                    this.multiplayerSystem.isHost = true;
                    this.multiplayerSystem.players = [this.multiplayerSystem.currentPlayer];
                }
                this.updateMultiplayerLobby();
            }

            updateSessionId() {
                const sessionIdElement = document.getElementById('sessionId');
                if (sessionIdElement) {
                    sessionIdElement.textContent = this.multiplayerSystem.sessionId;
                }
            }

            launchSession() {
                if (this.multiplayerSystem.players.length < 1) {
                    alert('Need at least 1 player to launch session');
                    return;
                }

                this.multiplayerSystem.isInSession = true;
                this.closeMultiplayerLobby();

                const hud = document.getElementById('multiplayerHud');
                if (hud) hud.style.display = 'block';

                this.initializeCollaborativeQuests();
                this.setupSharedAIAdaptation();
                this.startTeamSyncLoop();

                this.addEventToLog(`Multiplayer session launched with ${this.multiplayerSystem.players.length} players`);
            }

            initializeCollaborativeQuests() {
                // Create team-based versions of existing quests
                this.multiplayerSystem.collaborativeQuests.active = [
                    {
                        id: 'team_dream_awakening',
                        title: 'The Collective Dream',
                        description: 'Work together to unlock the dream realm',
                        requiredRoles: ['hacker', 'dreamer'],
                        progress: 0,
                        maxProgress: 100,
                        teamMembers: [],
                        status: 'active'
                    },
                    {
                        id: 'reality_harmony',
                        title: 'Reality Harmonization',
                        description: 'Synchronize your perceptions across dimensions',
                        requiredRoles: ['reality-mapper', 'dreamer'],
                        progress: 0,
                        maxProgress: 150,
                        teamMembers: [],
                        status: 'active'
                    }
                ];
            }

            setupSharedAIAdaptation() {
                if (!this.aiCompanion || !this.aiCompanion.personality) return;

                // Calculate group personality based on all players' preferences
                this.calculateGroupPersonality();

                // Adapt AI responses to be more group-oriented
                this.adaptAIGroupBehavior();
            }

            calculateGroupPersonality() {
                const groupTraits = { logic: 0, empathy: 0, curiosity: 0, protection: 0, humor: 0, mystery: 0 };
                let playerCount = this.multiplayerSystem.players.length;

                // Simulate player personalities based on roles
                this.multiplayerSystem.players.forEach(player => {
                    switch(player.role) {
                        case 'hacker':
                            groupTraits.logic += 20;
                            groupTraits.curiosity += 15;
                            break;
                        case 'dreamer':
                            groupTraits.empathy += 20;
                            groupTraits.curiosity += 10;
                            break;
                        case 'reality-mapper':
                            groupTraits.logic += 10;
                            groupTraits.protection += 15;
                            break;
                    }
                });

                // Average the traits
                Object.keys(groupTraits).forEach(trait => {
                    groupTraits[trait] /= playerCount;
                });

                this.multiplayerSystem.sharedAI.groupPersonality = groupTraits;
            }

            adaptAIGroupBehavior() {
                if (!this.aiCompanion.personality) return;

                // Modify Cortana's responses based on group dynamics
                const originalGenerateResponse = this.generateCompanionResponse;
                this.generateCompanionResponse = (context) => {
                    const groupContext = this.getGroupContext(context);
                    return originalGenerateResponse.call(this, groupContext);
                };
            }

            getGroupContext(context) {
                return {
                    ...context,
                    isMultiplayer: true,
                    teamSize: this.multiplayerSystem.players.length,
                    groupPersonality: this.multiplayerSystem.sharedAI.groupPersonality,
                    playerRoles: this.multiplayerSystem.players.map(p => p.role),
                    collaborationMode: true
                };
            }

            startTeamSyncLoop() {
                setInterval(() => {
                    this.syncTeamState();
                    this.updateCollaborativeQuests();
                    this.broadcastPlayerActions();
                }, 2000);
            }

            syncTeamState() {
                // Sync player positions, statuses, and actions
                this.multiplayerSystem.players.forEach(player => {
                    // Simulate position updates
                    player.x = (player.x || 0) + (Math.random() - 0.5) * 10;
                    player.y = (player.y || 0) + (Math.random() - 0.5) * 10;
                });
            }

            updateCollaborativeQuests() {
                const quests = this.multiplayerSystem.collaborativeQuests.active;

                quests.forEach(quest => {
                    // Check if team has required roles
                    const teamRoles = this.multiplayerSystem.players.map(p => p.role);
                    const hasRequiredRoles = quest.requiredRoles.every(role => teamRoles.includes(role));

                    if (hasRequiredRoles) {
                        // Progress the quest based on team coordination
                        const progressIncrement = Math.random() * 5;
                        quest.progress = Math.min(quest.progress + progressIncrement, quest.maxProgress);

                        // Check for completion
                        if (quest.progress >= quest.maxProgress) {
                            this.completeCollaborativeQuest(quest);
                        }
                    }
                });

                this.updateQuestTrackerDisplay();
            }

            completeCollaborativeQuest(quest) {
                quest.status = 'completed';
                this.multiplayerSystem.collaborativeQuests.completed.push(quest);

                // Award team achievements
                this.awardTeamAchievement(quest.id);

                // Notify all players
                this.broadcastToAllPlayers({
                    type: 'quest_completed',
                    quest: quest,
                    teamRewards: this.calculateTeamRewards(quest)
                });

                this.addEventToLog(`Team completed: ${quest.title}`);
            }

            awardTeamAchievement(questId) {
                const achievement = {
                    id: `team_${questId}`,
                    title: 'Team Achievement',
                    description: `Collaborated to complete ${questId}`,
                    icon: '🤝',
                    unlockedAt: Date.now(),
                    players: this.multiplayerSystem.players.map(p => p.id)
                };

                if (!this.questSystem.achievements) {
                    this.questSystem.achievements = [];
                }
                this.questSystem.achievements.push(achievement);
            }

            calculateTeamRewards(quest) {
                return {
                    experience: 100 * this.multiplayerSystem.players.length,
                    chromaKeys: 2 * this.multiplayerSystem.players.length,
                    teamSynergy: Math.floor(Math.random() * 50) + 25
                };
            }

            updateQuestTrackerDisplay() {
                const objectiveTitle = document.getElementById('objectiveTitle');
                const objectiveRoles = document.getElementById('objectiveRoles');

                if (!objectiveTitle || !objectiveRoles) return;

                const activeQuest = this.multiplayerSystem.collaborativeQuests.active[0];
                if (!activeQuest) return;

                objectiveTitle.textContent = activeQuest.title;

                // Update role requirements
                objectiveRoles.innerHTML = '';
                activeQuest.requiredRoles.forEach(role => {
                    const roleElement = document.createElement('div');
                    roleElement.className = 'role-required';
                    roleElement.dataset.role = role;
                    roleElement.textContent = this.multiplayerSystem.roles[role].icon;

                    // Check if team has this role
                    const teamHasRole = this.multiplayerSystem.players.some(p => p.role === role);
                    if (teamHasRole) {
                        roleElement.classList.add('filled');
                    }

                    objectiveRoles.appendChild(roleElement);
                });
            }

            broadcastToAllPlayers(message) {
                // Simulate broadcasting to all players
                console.log('Broadcast to all players:', message);

                // Update AI pulse line to show activity
                this.showAIActivity();
            }

            showAIActivity() {
                const aiPulseLine = document.getElementById('aiPulseLine');
                const aiSubtitles = document.getElementById('aiSubtitles');

                if (aiPulseLine) {
                    aiPulseLine.classList.add('active');
                    setTimeout(() => aiPulseLine.classList.remove('active'), 3000);
                }

                if (aiSubtitles) {
                    const responses = [
                        "Analyzing team dynamics...",
                        "Coordinating quantum states...",
                        "Optimizing group performance...",
                        "Synchronizing dream frequencies...",
                        "Harmonizing team consciousness..."
                    ];
                    aiSubtitles.textContent = responses[Math.floor(Math.random() * responses.length)];
                    setTimeout(() => aiSubtitles.textContent = '', 3000);
                }
            }

            focusOnPlayer(playerId) {
                const player = this.multiplayerSystem.players.find(p => p.id === playerId);
                if (player) {
                    this.addEventToLog(`Focusing on ${player.name}'s position`);
                    // Visual feedback for player focus
                    this.showPlayerFocus(player);
                }
            }

            showPlayerFocus(player) {
                // Create temporary focus indicator
                const focusIndicator = document.createElement('div');
                focusIndicator.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--multiplayer-accent-500);
                    color: #000;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: 600;
                    z-index: 1500;
                    animation: focusIndicator 2s ease-out forwards;
                `;
                focusIndicator.textContent = `Following ${player.name}`;

                document.body.appendChild(focusIndicator);

                setTimeout(() => focusIndicator.remove(), 2000);
            }

            toggleVoiceChat() {
                this.multiplayerSystem.voiceChat.enabled = !this.multiplayerSystem.voiceChat.enabled;

                const status = this.multiplayerSystem.voiceChat.enabled ? 'enabled' : 'disabled';
                this.addEventToLog(`Voice chat ${status}`);
            }

            showInteractionWheel() {
                const wheel = document.getElementById('interactionWheel');
                if (wheel) {
                    wheel.style.display = 'block';
                    wheel.style.pointerEvents = 'auto';
                }
            }

            hideInteractionWheel() {
                const wheel = document.getElementById('interactionWheel');
                if (wheel) {
                    wheel.style.display = 'none';
                    wheel.style.pointerEvents = 'none';
                }
            }

            kickPlayer(playerId) {
                if (!this.multiplayerSystem.isHost) return;

                this.multiplayerSystem.players = this.multiplayerSystem.players.filter(p => p.id !== playerId);
                this.updateMultiplayerLobby();
                this.updateTeamStatus();

                this.addEventToLog('Player removed from session');
            }

            mutePlayer(playerId) {
                if (!this.multiplayerSystem.isHost) return;

                const player = this.multiplayerSystem.players.find(p => p.id === playerId);
                if (player) {
                    player.muted = !player.muted;
                    this.addEventToLog(`${player.name} ${player.muted ? 'muted' : 'unmuted'}`);
                }
                this.updateMultiplayerLobby();
            }

            invitePlayer() {
                // Simulate sending an invite
                this.addEventToLog('Invite sent to potential players');

                // Auto-add a player after a delay
                setTimeout(() => {
                    if (this.multiplayerSystem.players.length < this.multiplayerSystem.maxPlayers) {
                        this.addSimulatedPlayer();
                    }
                }, 3000);
            }

            saveSession() {
                const sessionData = {
                    sessionId: this.multiplayerSystem.sessionId,
                    players: this.multiplayerSystem.players,
                    collaborativeQuests: this.multiplayerSystem.collaborativeQuests,
                    timestamp: Date.now()
                };

                localStorage.setItem(`chromashift_session_${this.multiplayerSystem.sessionId}`, JSON.stringify(sessionData));
                this.addEventToLog('Session saved successfully');
            }

            loadSession() {
                const savedSession = localStorage.getItem(`chromashift_session_${this.multiplayerSystem.sessionId}`);
                if (savedSession) {
                    const sessionData = JSON.parse(savedSession);
                    this.multiplayerSystem.players = sessionData.players || [];
                    this.multiplayerSystem.collaborativeQuests = sessionData.collaborativeQuests || { active: [], completed: [] };

                    this.updateMultiplayerLobby();
                    this.updateTeamStatus();

                    this.addEventToLog('Session loaded successfully');
                } else {
                    this.addEventToLog('No saved session found');
                }
            }

            broadcastInteraction(interaction) {
                console.log('Broadcasting interaction:', interaction);
                // In a real implementation, this would send to all connected players
            }

            // ===== ACHIEVEMENTS & LEADERBOARDS =====

            toggleAchievements() {
                const panel = document.getElementById('achievementsPanel');
                if (panel) {
                    const isVisible = panel.style.display !== 'none';
                    panel.style.display = isVisible ? 'none' : 'block';

                    if (!isVisible) {
                        this.loadAchievementsPanel();
                    }
                }
            }

            loadAchievementsPanel() {
                const content = document.getElementById('achievementsContent');
                if (!content) return;

                // Load leaderboard
                this.loadLeaderboard(content);
            }

            loadLeaderboard(container) {
                const leaderboardData = this.generateLeaderboardData();

                const leaderboardHTML = `
                    <div class="leaderboard-section">
                        <h3 style="color: var(--multiplayer-text-primary); margin-bottom: 20px;">Team Performance</h3>
                        <div class="leaderboard-table">
                            ${leaderboardData.map((entry, index) => `
                                <div class="leaderboard-row ${entry.isCurrentUser ? 'current-user' : ''}">
                                    <div class="leaderboard-rank">#${index + 1}</div>
                                    <div class="leaderboard-name">${entry.name}</div>
                                    <div class="leaderboard-stat">${entry.missionsCompleted} Missions</div>
                                    <div class="leaderboard-stat">${entry.teamSynergy}% Sync</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

                container.innerHTML = leaderboardHTML;
            }

            generateLeaderboardData() {
                const players = this.multiplayerSystem.players.map(player => ({
                    name: player.name,
                    missionsCompleted: Math.floor(Math.random() * 20) + 5,
                    teamSynergy: Math.floor(Math.random() * 30) + 70,
                    isCurrentUser: player.id === this.multiplayerSystem.currentPlayer?.id
                }));

                // Sort by missions completed
                return players.sort((a, b) => b.missionsCompleted - a.missionsCompleted);
            }

            switchAchievementTab(tab) {
                const tabs = document.querySelectorAll('.achievement-tab');
                const content = document.getElementById('achievementsContent');

                // Update tab states
                tabs.forEach(t => t.classList.remove('active'));
                event.target.classList.add('active');

                // Load content based on tab
                if (tab === 'achievements') {
                    this.loadAchievementsGrid(content);
                } else {
                    this.loadLeaderboard(content);
                }
            }

            loadAchievementsGrid(container) {
                const achievements = this.getPlayerAchievements();

                const achievementsHTML = `
                    <div class="achievements-grid">
                        ${achievements.map(achievement => `
                            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                                <div class="achievement-icon">${achievement.icon}</div>
                                <div class="achievement-title">${achievement.title}</div>
                            </div>
                        `).join('')}
                    </div>
                `;

                container.innerHTML = achievementsHTML;
            }

            getPlayerAchievements() {
                const baseAchievements = [
                    { id: 'first_join', title: 'First Steps', icon: '👤', unlocked: true },
                    { id: 'team_player', title: 'Team Player', icon: '🤝', unlocked: this.multiplayerSystem.players.length > 1 },
                    { id: 'quest_master', title: 'Quest Master', icon: '🏆', unlocked: this.questSystem?.completedQuests?.length > 0 },
                    { id: 'hacker', title: 'Code Breaker', icon: '💻', unlocked: this.multiplayerSystem.currentPlayer?.role === 'hacker' },
                    { id: 'dreamer', title: 'Dream Weaver', icon: '🌌', unlocked: this.multiplayerSystem.currentPlayer?.role === 'dreamer' },
                    { id: 'explorer', title: 'Reality Explorer', icon: '🗺️', unlocked: this.multiplayerSystem.currentPlayer?.role === 'reality-mapper' },
                    { id: 'voice_chat', title: ' Communicator', icon: '🎤', unlocked: this.multiplayerSystem.voiceChat.enabled },
                    { id: 'session_host', title: 'Session Host', icon: '👑', unlocked: this.multiplayerSystem.isHost },
                    { id: 'collaborator', title: 'Great Collaborator', icon: '⭐', unlocked: this.multiplayerSystem.players.length >= 3 }
                ];

                return baseAchievements;
            }

            // ===== UTILITY FUNCTIONS =====

            announceToAI(message) {
                // Add message to AI's knowledge and potentially trigger response
                if (this.aiCompanion && this.aiCompanion.conversationHistory) {
                    this.aiCompanion.conversationHistory.push({
                        type: 'system',
                        message: message,
                        timestamp: Date.now()
                    });
                }
            }

            // ===== ADVANCED REALITY HACKING MECHANICS =====
            setupRealityHackingSystem() {
                this.realityHacking = {
                    matrix: {
                        gravity: 9.8,
                        lightIntensity: 1.0,
                        timeFlow: 1.0,
                        realityStability: 0.8,
                        perceptionFilter: 'normal'
                    },
                    anchors: [],
                    viruses: [],
                    bridges: [],
                    temporalStates: new Map(),
                    perceptionFilters: [
                        { id: 'normal', name: 'Normal Vision', description: 'Standard perception' },
                        { id: 'augmented', name: 'Augmented Reality', description: 'Enhanced information overlay' },
                        { id: 'matrix', name: 'Matrix View', description: 'Code visualization' },
                        { id: 'dream', name: 'Dream State', description: 'Fluid reality perception' },
                        { id: 'quantum', name: 'Quantum Vision', description: 'Multiple timeline awareness' }
                    ],
                    collaborativeProjects: [],
                    codeScripts: [
                        {
                            id: 'gravity_modifier',
                            name: 'Gravity Modifier',
                            code: `// Modify local gravity field
function modifyGravity(multiplier) {
    reality.matrix.gravity *= multiplier;
    return \`Gravity set to \${reality.matrix.gravity} m/s²\`;
}`,
                            category: 'physics'
                        },
                        {
                            id: 'time_dilation',
                            name: 'Time Dilation',
                            code: `// Create time dilation field
function timeDilation(factor) {
    reality.matrix.timeFlow = factor;
    return \`Time flow modified: \${factor}x\`;
}`,
                            category: 'temporal'
                        },
                        {
                            id: 'reality_anchor',
                            name: 'Reality Anchor',
                            code: `// Create persistent reality anchor
function createAnchor(name, properties) {
    const anchor = {
        id: Date.now(),
        name: name,
        properties: properties,
        created: Date.now(),
        persistent: true
    };
    reality.anchors.push(anchor);
    return \`Anchor "\${name}" created successfully\`;
}`,
                            category: 'structure'
                        }
                    ]
                };

                this.initializeRealityHackingUI();
                this.setupRealityHackingEventListeners();
                this.startRealityMonitoring();
            }

            initializeRealityHackingUI() {
                // Setup initial Reality Hacking interface
                this.updateRealityMatrixDisplay();
                this.updateRealityAnchorsDisplay();
                this.updateRealityVirusesDisplay();
            }

            setupRealityHackingEventListeners() {
                // Keyboard shortcuts for reality hacking
                document.addEventListener('keydown', (e) => {
                    if (e.ctrlKey && e.shiftKey) {
                        switch(e.code) {
                            case 'KeyR':
                                e.preventDefault();
                                this.openRealityHackingPanel();
                                break;
                            case 'KeyM':
                                e.preventDefault();
                                this.openRealityMatrixEditor();
                                break;
                            case 'KeyQ':
                                e.preventDefault();
                                this.openQuantumCodeInterpreter();
                                break;
                            case 'KeyT':
                                e.preventDefault();
                                this.openTemporalHackEngine();
                                break;
                        }
                    }
                });
            }

            startRealityMonitoring() {
                // Monitor reality stability and apply effects
                setInterval(() => {
                    this.monitorRealityIntegrity();
                    this.applyActiveEffects();
                    this.updateCollaborativeReality();
                }, 1000);
            }

            monitorRealityIntegrity() {
                // Check for reality inconsistencies and auto-fix
                const stability = this.realityHacking.matrix.realityStability;
                if (stability < 0.3) {
                    this.addToDebugConsole('WARNING', 'Reality stability critical! Applying emergency protocols...', 'warning');
                    this.applyRealityEmergencyProtocols();
                }
            }

            applyActiveEffects() {
                // Apply active reality modifications
                if (this.realityHacking.anchors.length > 0) {
                    this.realityHacking.anchors.forEach(anchor => {
                        if (anchor.active) {
                            this.applyAnchorEffect(anchor);
                        }
                    });
                }
            }

            // ===== MAIN INTERFACE FUNCTIONS =====
            openRealityHackingPanel(tool = 'matrix') {
                const panel = document.getElementById('realityHackingPanel');
                const titleElement = document.getElementById('realityPanelTitle');

                if (panel) {
                    panel.style.display = 'block';
                    this.currentRealityTool = tool;

                    // Load specific tool interface
                    this.loadRealityTool(tool);
                }
            }

            closeRealityHackingPanel() {
                const panel = document.getElementById('realityHackingPanel');
                if (panel) {
                    panel.style.display = 'none';
                }
            }

            toggleRealityToolsMenu() {
                const menu = document.getElementById('realityToolsMenu');
                if (menu) {
                    menu.classList.toggle('visible');
                }
            }

            loadRealityTool(tool) {
                const titleElement = document.getElementById('realityPanelTitle');
                const mainPanel = document.getElementById('realityMainPanel');
                const inspector = document.getElementById('realityProperties');

                switch(tool) {
                    case 'matrix':
                        titleElement.textContent = 'Reality Matrix Editor';
                        mainPanel.innerHTML = this.getMatrixEditorHTML();
                        inspector.innerHTML = this.getMatrixPropertiesHTML();
                        break;
                    case 'quantum':
                        titleElement.textContent = 'Quantum Code Interpreter';
                        mainPanel.innerHTML = this.getQuantumCodeHTML();
                        inspector.innerHTML = this.getCodePropertiesHTML();
                        break;
                    case 'neural':
                        titleElement.textContent = 'Neural Link Interface';
                        mainPanel.innerHTML = this.getNeuralLinkHTML();
                        inspector.innerHTML = this.getNeuralPropertiesHTML();
                        break;
                    case 'temporal':
                        titleElement.textContent = 'Temporal Hack Engine';
                        mainPanel.innerHTML = this.getTemporalHackHTML();
                        inspector.innerHTML = this.getTemporalPropertiesHTML();
                        break;
                    case 'bridge':
                        titleElement.textContent = 'Dimensional Bridge Creator';
                        mainPanel.innerHTML = this.getBridgeCreatorHTML();
                        inspector.innerHTML = this.getBridgePropertiesHTML();
                        break;
                    case 'debug':
                        titleElement.textContent = 'Reality Debug Console';
                        mainPanel.innerHTML = this.getDebugConsoleHTML();
                        inspector.innerHTML = this.getDebugPropertiesHTML();
                        break;
                    case 'weaving':
                        titleElement.textContent = 'Collaborative Reality Weaving';
                        mainPanel.innerHTML = this.getCollaborativeWeavingHTML();
                        inspector.innerHTML = this.getWeavingPropertiesHTML();
                        break;
                }
            }

            // ===== REALITY MATRIX EDITOR =====
            openRealityMatrixEditor() {
                this.openRealityHackingPanel('matrix');
                this.toggleRealityToolsMenu();
            }

            getMatrixEditorHTML() {
                return `
                    <div class="reality-section">
                        <h2>Environmental Controls</h2>
                        <div class="matrix-control">
                            <div class="matrix-label">
                                <span>Gravity</span>
                                <span class="matrix-value" id="gravityValue">${this.realityHacking.matrix.gravity.toFixed(1)}</span>
                            </div>
                            <input type="range" class="matrix-slider" id="gravitySlider"
                                   min="0" max="20" step="0.1" value="${this.realityHacking.matrix.gravity}"
                                   oninput="window.chromaShiftComplete.updateMatrixValue('gravity', this.value)">
                        </div>

                        <div class="matrix-control">
                            <div class="matrix-label">
                                <span>Light Intensity</span>
                                <span class="matrix-value" id="lightValue">${this.realityHacking.matrix.lightIntensity.toFixed(2)}</span>
                            </div>
                            <input type="range" class="matrix-slider" id="lightSlider"
                                   min="0" max="3" step="0.01" value="${this.realityHacking.matrix.lightIntensity}"
                                   oninput="window.chromaShiftComplete.updateMatrixValue('lightIntensity', this.value)">
                        </div>

                        <div class="matrix-control">
                            <div class="matrix-label">
                                <span>Time Flow</span>
                                <span class="matrix-value" id="timeValue">${this.realityHacking.matrix.timeFlow.toFixed(2)}x</span>
                            </div>
                            <input type="range" class="matrix-slider" id="timeSlider"
                                   min="0.1" max="5" step="0.01" value="${this.realityHacking.matrix.timeFlow}"
                                   oninput="window.chromaShiftComplete.updateMatrixValue('timeFlow', this.value)">
                        </div>

                        <div class="matrix-control">
                            <div class="matrix-label">
                                <span>Reality Stability</span>
                                <span class="matrix-value" id="stabilityValue">${Math.round(this.realityHacking.matrix.realityStability * 100)}%</span>
                            </div>
                            <input type="range" class="matrix-slider" id="stabilitySlider"
                                   min="0.1" max="1" step="0.01" value="${this.realityHacking.matrix.realityStability}"
                                   oninput="window.chromaShiftComplete.updateMatrixValue('realityStability', this.value)">
                        </div>

                        <button class="code-run-btn" onclick="window.chromaShiftComplete.applyMatrixChanges()">
                            Apply Matrix Changes
                        </button>
                    </div>

                    <div class="reality-section">
                        <h2>Reality Anchors</h2>
                        <div class="reality-anchors-grid" id="anchorsGrid">
                            ${this.getAnchorsDisplayHTML()}
                        </div>
                        <button class="code-run-btn" onclick="window.chromaShiftComplete.createNewAnchor()">
                            Create New Anchor
                        </button>
                    </div>
                `;
            }

            getMatrixPropertiesHTML() {
                return `
                    <h3>Current Settings</h3>
                    <div style="margin-bottom: 16px;">
                        <strong>Gravity:</strong> ${this.realityHacking.matrix.gravity.toFixed(1)} m/s²
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong>Light Level:</strong> ${Math.round(this.realityHacking.matrix.lightIntensity * 100)}%
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong>Time Flow:</strong> ${this.realityHacking.matrix.timeFlow.toFixed(2)}x normal
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong>Stability:</strong> ${Math.round(this.realityHacking.matrix.realityStability * 100)}%
                    </div>

                    <h3>Quick Actions</h3>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.resetToDefaults()">
                        Reset to Defaults
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.randomizeReality()">
                        Randomize Reality
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.stabilizeReality()">
                        Stabilize Reality
                    </button>
                `;
            }

            updateMatrixValue(property, value) {
                this.realityHacking.matrix[property] = parseFloat(value);

                // Update display values
                const valueElement = document.getElementById(`${property}Value`);
                if (valueElement) {
                    if (property === 'realityStability') {
                        valueElement.textContent = `${Math.round(value * 100)}%`;
                    } else if (property === 'timeFlow') {
                        valueElement.textContent = `${parseFloat(value).toFixed(2)}x`;
                    } else {
                        valueElement.textContent = parseFloat(value).toFixed(property === 'lightIntensity' ? 2 : 1);
                    }
                }

                this.addToDebugConsole('INFO', `Matrix ${property} updated to ${value}`, 'info');
            }

            applyMatrixChanges() {
                // Apply reality matrix changes
                const changes = this.realityHacking.matrix;
                this.addToDebugConsole('SUCCESS', 'Reality matrix changes applied successfully', 'success');

                // Visual feedback
                this.showRealityEffect('matrix-change');

                // Announce to AI
                if (this.aiCompanion) {
                    this.aiCompanion.personality.logic += 1;
                    this.announceToAI('Reality matrix parameters have been modified by the user');
                }

                // Update multiplayer team if in session
                if (this.multiplayerSystem?.isInSession) {
                    this.broadcastToAllPlayers({
                        type: 'reality_change',
                        matrix: changes,
                        player: this.multiplayerSystem.currentPlayer?.name
                    });
                }
            }

            getAnchorsDisplayHTML() {
                if (this.realityHacking.anchors.length === 0) {
                    return '<div class="anchor-card"><div class="anchor-title">No Anchors Created</div><div class="anchor-description">Create your first reality anchor to stabilize this dimension.</div></div>';
                }

                return this.realityHacking.anchors.map(anchor => `
                    <div class="anchor-card">
                        <div class="anchor-title">${anchor.name}</div>
                        <div class="anchor-description">${anchor.description || 'Persistent reality modification'}</div>
                        <div style="margin-top: 8px; font-size: 11px; color: var(--reality-text-secondary);">
                            Created: ${new Date(anchor.created).toLocaleTimeString()}
                        </div>
                    </div>
                `).join('');
            }

            createNewAnchor() {
                const name = prompt('Enter anchor name:');
                if (name) {
                    const anchor = {
                        id: Date.now(),
                        name: name,
                        description: `Reality anchor created by user`,
                        properties: { ...this.realityHacking.matrix },
                        created: Date.now(),
                        active: true
                    };

                    this.realityHacking.anchors.push(anchor);
                    this.addToDebugConsole('SUCCESS', `Reality anchor "${name}" created successfully`, 'success');

                    // Refresh display
                    this.loadRealityTool('matrix');

                    // Announce to AI
                    if (this.aiCompanion) {
                        this.aiCompanion.personality.logic += 2;
                        this.announceToAI(`New reality anchor "${name}" has been created and activated`);
                    }
                }
            }

            // ===== QUANTUM CODE INTERPRETER =====
            openQuantumCodeInterpreter() {
                this.openRealityHackingPanel('quantum');
                this.toggleRealityToolsMenu();
            }

            getQuantumCodeHTML() {
                const scripts = this.realityHacking.codeScripts;

                return `
                    <div class="reality-section">
                        <h2>Code Scripts</h2>
                        <div style="margin-bottom: 16px;">
                            <select id="scriptSelector" onchange="window.chromaShiftComplete.loadScript(this.value)" style="
                                width: 100%;
                                padding: 8px 12px;
                                background: rgba(0, 0, 0, 0.3);
                                border: 1px solid var(--reality-surface-glass-border);
                                border-radius: 6px;
                                color: var(--reality-text-primary);
                                font-family: 'Inter', sans-serif;
                                margin-bottom: 16px;
                            ">
                                <option value="">Select a script...</option>
                                ${scripts.map(script => `<option value="${script.id}">${script.name} (${script.category})</option>`).join('')}
                            </select>
                        </div>

                        <div class="code-editor-container">
                            <div class="code-header">
                                <span class="code-filename" id="codeFilename">untitled.js</span>
                                <button class="code-run-btn" onclick="window.chromaShiftComplete.executeCode()">Execute Script</button>
                            </div>
                            <textarea class="code-editor" id="codeEditor" placeholder="// Enter your reality-hacking code here..."></textarea>
                        </div>

                        <button class="code-run-btn" onclick="window.chromaShiftComplete.createCustomScript()">
                            Create New Script
                        </button>
                    </div>

                    <div class="reality-section">
                        <h2>Script Categories</h2>
                        <div class="neural-link-grid">
                            <div class="neural-link-pill active" data-category="all" onclick="window.chromaShiftComplete.filterScripts('all')">All Scripts</div>
                            <div class="neural-link-pill" data-category="physics" onclick="window.chromaShiftComplete.filterScripts('physics')">Physics</div>
                            <div class="neural-link-pill" data-category="temporal" onclick="window.chromaShiftComplete.filterScripts('temporal')">Temporal</div>
                            <div class="neural-link-pill" data-category="structure" onclick="window.chromaShiftComplete.filterScripts('structure')">Structure</div>
                            <div class="neural-link-pill" data-category="perception" onclick="window.chromaShiftComplete.filterScripts('perception')">Perception</div>
                        </div>
                    </div>
                `;
            }

            getCodePropertiesHTML() {
                return `
                    <h3>Code Status</h3>
                    <div id="codeStatus" style="margin-bottom: 16px; color: var(--reality-text-secondary);">
                        No script loaded
                    </div>

                    <h3>Script Library</h3>
                    <div style="margin-bottom: 16px;">
                        ${this.realityHacking.codeScripts.map(script => `
                            <div style="margin-bottom: 12px; padding: 8px; background: rgba(0, 0, 0, 0.2); border-radius: 4px;">
                                <div style="font-weight: 600; color: var(--reality-text-primary);">${script.name}</div>
                                <div style="font-size: 11px; color: var(--reality-text-secondary);">Category: ${script.category}</div>
                            </div>
                        `).join('')}
                    </div>

                    <h3>Quick Actions</h3>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.validateCode()">
                        Validate Syntax
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.formatCode()">
                        Format Code
                    </button>
                `;
            }

            loadScript(scriptId) {
                const script = this.realityHacking.codeScripts.find(s => s.id === scriptId);
                if (script) {
                    const editor = document.getElementById('codeEditor');
                    const filename = document.getElementById('codeFilename');
                    const status = document.getElementById('codeStatus');

                    if (editor) {
                        editor.value = script.code;
                        editor.dataset.scriptId = scriptId;
                    }

                    if (filename) {
                        filename.textContent = `${script.name}.js`;
                    }

                    if (status) {
                        status.innerHTML = `
                            <span style="color: var(--reality-semantic-success);">✓</span>
                            Script loaded: ${script.name}
                            <br><span style="font-size: 11px;">Category: ${script.category}</span>
                        `;
                    }
                }
            }

            executeCode() {
                const editor = document.getElementById('codeEditor');
                const scriptId = editor?.dataset.scriptId;
                const code = editor?.value;

                if (!code) {
                    this.addToDebugConsole('ERROR', 'No code to execute', 'error');
                    return;
                }

                try {
                    // Simulate code execution in reality context
                    const result = this.simulateCodeExecution(code);
                    this.addToDebugConsole('SUCCESS', `Code executed: ${result}`, 'success');

                    // Visual feedback
                    this.showRealityEffect('code-execution');

                    // Announce to AI
                    if (this.aiCompanion) {
                        this.aiCompanion.personality.logic += 3;
                        this.aiCompanion.personality.curiosity += 1;
                        this.announceToAI(`Reality code executed successfully with result: ${result}`);
                    }

                    // Update multiplayer team
                    if (this.multiplayerSystem?.isInSession) {
                        this.broadcastToAllPlayers({
                            type: 'code_executed',
                            code: code,
                            result: result,
                            player: this.multiplayerSystem.currentPlayer?.name
                        });
                    }

                } catch (error) {
                    this.addToDebugConsole('ERROR', `Code execution failed: ${error.message}`, 'error');
                }
            }

            simulateCodeExecution(code) {
                // Simple simulation of reality hacking code execution
                if (code.includes('modifyGravity')) {
                    const match = code.match(/modifyGravity\(([^)]+)\)/);
                    if (match) {
                        const multiplier = parseFloat(match[1]);
                        this.realityHacking.matrix.gravity *= multiplier;
                        return `Gravity modified by factor of ${multiplier}`;
                    }
                } else if (code.includes('timeDilation')) {
                    const match = code.match(/timeDilation\(([^)]+)\)/);
                    if (match) {
                        const factor = parseFloat(match[1]);
                        this.realityHacking.matrix.timeFlow = factor;
                        return `Time flow set to ${factor}x`;
                    }
                } else if (code.includes('createAnchor')) {
                    const match = code.match(/createAnchor\("([^"]+)"/);
                    if (match) {
                        const name = match[1];
                        const anchor = {
                            id: Date.now(),
                            name: name,
                            description: 'Code-generated reality anchor',
                            properties: { ...this.realityHacking.matrix },
                            created: Date.now(),
                            active: true
                        };
                        this.realityHacking.anchors.push(anchor);
                        return `Reality anchor "${name}" created`;
                    }
                }

                return 'Code executed successfully';
            }

            // ===== NEURAL LINK INTERFACE =====
            openNeuralLinkInterface() {
                this.openRealityHackingPanel('neural');
                this.toggleRealityToolsMenu();
            }

            getNeuralLinkHTML() {
                return `
                    <div class="reality-section">
                        <h2>Consciousness States</h2>
                        <div class="neural-link-grid">
                            <div class="neural-link-pill active" onclick="window.chromaShiftComplete.setConsciousnessState('normal')">Normal</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.setConsciousnessState('lucid')">Lucid</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.setConsciousnessState('expanded')">Expanded</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.setConsciousnessState('quantum')">Quantum</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.setConsciousnessState('omniscient')">Omniscient</div>
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>Perception Filters</h2>
                        <div class="perception-filters">
                            ${this.realityHacking.perceptionFilters.map(filter =>
                                `<div class="filter-chip" onclick="window.chromaShiftComplete.applyPerceptionFilter('${filter.id}')">${filter.name}</div>`
                            ).join('')}
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>Neural Synchronization</h2>
                        <div style="margin-bottom: 16px;">
                            <div style="margin-bottom: 8px; color: var(--reality-text-secondary);">Sync with team members:</div>
                            <div class="neural-link-grid">
                                ${this.multiplayerSystem?.players?.map(player =>
                                    `<div class="neural-link-pill" onclick="window.chromaShiftComplete.syncWithPlayer('${player.id}')">
                                        ${player.name}
                                    </div>`
                                ).join('') || '<div class="neural-link-pill">No team members</div>'}
                            </div>
                        </div>
                    </div>
                `;
            }

            getNeuralPropertiesHTML() {
                return `
                    <h3>Current State</h3>
                    <div style="margin-bottom: 16px;">
                        <strong>Consciousness:</strong> <span id="consciousnessState">Normal</span>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong>Perception:</strong> <span id="perceptionFilter">Normal Vision</span>
                    </div>

                    <h3>Neural Metrics</h3>
                    <div style="margin-bottom: 8px;">Lucidity: <strong>${this.playerData?.lucidity || 50}%</strong></div>
                    <div style="margin-bottom: 8px;">Coherence: <strong>${this.playerData?.coherence || 75}%</strong></div>
                    <div style="margin-bottom: 8px;">Perception: <strong>${this.playerData?.perception || 60}%</strong></div>

                    <h3>Quick Actions</h3>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.resetNeuralState()">
                        Reset to Baseline
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.enhanceConsciousness()">
                        Enhance Consciousness
                    </button>
                `;
            }

            setConsciousnessState(state) {
                // Update all neural link pills
                document.querySelectorAll('.neural-link-pill').forEach(pill => {
                    pill.classList.remove('active');
                });
                event.target.classList.add('active');

                this.addToDebugConsole('INFO', `Consciousness state set to: ${state}`, 'info');

                // Apply consciousness state effects
                this.applyConsciousnessState(state);
            }

            applyConsciousnessState(state) {
                const consciousnessEffects = {
                    normal: { lucidity: 0, perception: 0, realityAccess: 'basic' },
                    lucid: { lucidity: 20, perception: 10, realityAccess: 'enhanced' },
                    expanded: { lucidity: 30, perception: 25, realityAccess: 'advanced' },
                    quantum: { lucidity: 40, perception: 40, realityAccess: 'quantum' },
                    omniscient: { lucidity: 50, perception: 50, realityAccess: 'complete' }
                };

                const effect = consciousnessEffects[state];
                if (effect) {
                    this.playerData.lucidity = Math.min(100, (this.playerData?.lucidity || 50) + effect.lucidity);
                    this.playerData.perception = Math.min(100, (this.playerData?.perception || 60) + effect.perception);

                    // Update display
                    const consciousnessElement = document.getElementById('consciousnessState');
                    if (consciousnessElement) {
                        consciousnessElement.textContent = state.charAt(0).toUpperCase() + state.slice(1);
                    }
                }

                this.showRealityEffect('consciousness-change');
            }

            applyPerceptionFilter(filterId) {
                const filter = this.realityHacking.perceptionFilters.find(f => f.id === filterId);
                if (filter) {
                    this.realityHacking.matrix.perceptionFilter = filterId;

                    // Update all filter chips
                    document.querySelectorAll('.filter-chip').forEach(chip => {
                        chip.classList.remove('active');
                    });
                    event.target.classList.add('active');

                    this.addToDebugConsole('SUCCESS', `Perception filter applied: ${filter.name}`, 'success');
                    this.showRealityEffect('perception-change');

                    // Update display
                    const perceptionElement = document.getElementById('perceptionFilter');
                    if (perceptionElement) {
                        perceptionElement.textContent = filter.name;
                    }
                }
            }

            syncWithPlayer(playerId) {
                const player = this.multiplayerSystem?.players?.find(p => p.id == playerId);
                if (player) {
                    this.addToDebugConsole('SUCCESS', `Neural synchronization initiated with ${player.name}`, 'success');
                    this.showRealityEffect('neural-sync');

                    // Announce to AI
                    if (this.aiCompanion) {
                        this.aiCompanion.personality.empathy += 2;
                        this.announceToAI(`Neural synchronization established with team member ${player.name}`);
                    }
                }
            }

            // ===== TEMPORAL HACK ENGINE =====
            openTemporalHackEngine() {
                this.openRealityHackingPanel('temporal');
                this.toggleRealityToolsMenu();
            }

            getTemporalHackHTML() {
                return `
                    <div class="reality-section">
                        <h2>Time Control</h2>
                        <div class="temporal-controls">
                            <button class="temporal-btn" onclick="window.chromaShiftComplete.slowTime(0.5)">Slow Time (0.5x)</button>
                            <button class="temporal-btn" onclick="window.chromaShiftComplete.normalTime()">Normal Time</button>
                            <button class="temporal-btn" onclick="window.chromaShiftComplete.fastTime(2.0)">Fast Time (2x)</button>
                            <button class="temporal-btn" onclick="window.chromaShiftComplete.pauseTime()">Pause Time</button>
                            <button class="temporal-btn" onclick="window.chromaShiftComplete.rewindTime(5)">Rewind 5s</button>
                            <button class="temporal-btn" onclick="window.chromaShiftComplete.createTimeLoop()">Create Loop</button>
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>Temporal Anchors</h2>
                        <div class="reality-anchors-grid" id="temporalAnchors">
                            ${this.getTemporalAnchorsDisplayHTML()}
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>Timeline Manipulation</h2>
                        <div class="matrix-control">
                            <div class="matrix-label">
                                <span>Custom Time Factor</span>
                                <span class="matrix-value" id="customTimeValue">1.00x</span>
                            </div>
                            <input type="range" class="matrix-slider" id="customTimeSlider"
                                   min="0.1" max="10" step="0.1" value="1.0"
                                   oninput="window.chromaShiftComplete.updateCustomTime(this.value)">
                        </div>
                        <button class="code-run-btn" onclick="window.chromaShiftComplete.applyCustomTime()">
                            Apply Custom Time
                        </button>
                    </div>
                `;
            }

            getTemporalPropertiesHTML() {
                const currentTime = this.realityHacking.matrix.timeFlow;
                return `
                    <h3>Current Temporal State</h3>
                    <div style="margin-bottom: 16px;">
                        <strong>Time Flow:</strong> ${currentTime.toFixed(2)}x normal
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong>Status:</strong> ${currentTime === 1 ? 'Normal' : currentTime < 1 ? 'Dilated' : 'Accelerated'}
                    </div>

                    <h3>Temporal History</h3>
                    <div style="max-height: 200px; overflow-y: auto;">
                        ${this.getTemporalHistoryHTML()}
                    </div>

                    <h3>Quick Actions</h3>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.freezeAllTime()">
                        Global Time Freeze
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.restoreDefaultTime()">
                        Restore Default
                    </button>
                `;
            }

            slowTime(factor) {
                this.realityHacking.matrix.timeFlow = factor;
                this.updateTemporalButtons('slow');
                this.addToDebugConsole('SUCCESS', `Time slowed to ${factor}x normal speed`, 'success');
                this.showRealityEffect('time-slow');
            }

            fastTime(factor) {
                this.realityHacking.matrix.timeFlow = factor;
                this.updateTemporalButtons('fast');
                this.addToDebugConsole('SUCCESS', `Time accelerated to ${factor}x normal speed`, 'success');
                this.showRealityEffect('time-fast');
            }

            normalTime() {
                this.realityHacking.matrix.timeFlow = 1.0;
                this.updateTemporalButtons('normal');
                this.addToDebugConsole('INFO', 'Time flow restored to normal', 'info');
            }

            pauseTime() {
                this.realityHacking.matrix.timeFlow = 0;
                this.updateTemporalButtons('pause');
                this.addToDebugConsole('WARNING', 'Time paused - reality frozen', 'warning');
                this.showRealityEffect('time-pause');
            }

            rewindTime(seconds) {
                // Simulate time rewind
                this.addToDebugConsole('INFO', `Rewinding time by ${seconds} seconds`, 'info');
                this.showRealityEffect('time-rewind');

                // Restore previous temporal state
                setTimeout(() => {
                    this.restoreDefaultTime();
                }, 2000);
            }

            createTimeLoop() {
                const loopId = Date.now();
                this.realityHacking.temporalStates.set(loopId, {
                    id: loopId,
                    type: 'loop',
                    created: Date.now(),
                    duration: 10000, // 10 second loop
                    active: true
                });

                this.addToDebugConsole('SUCCESS', `Time loop created (ID: ${loopId})`, 'success');
                this.loadRealityTool('temporal');
            }

            updateCustomTime(value) {
                const valueElement = document.getElementById('customTimeValue');
                if (valueElement) {
                    valueElement.textContent = `${parseFloat(value).toFixed(2)}x`;
                }
            }

            applyCustomTime() {
                const slider = document.getElementById('customTimeSlider');
                const value = slider ? parseFloat(slider.value) : 1.0;

                this.realityHacking.matrix.timeFlow = value;
                this.updateTemporalButtons('custom');
                this.addToDebugConsole('SUCCESS', `Custom time flow applied: ${value}x`, 'success');
            }

            updateTemporalButtons(active) {
                document.querySelectorAll('.temporal-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Activate the appropriate button
                const buttonMap = {
                    slow: 'Slow Time (0.5x)',
                    fast: 'Fast Time (2x)',
                    normal: 'Normal Time',
                    pause: 'Pause Time',
                    custom: 'Apply Custom Time'
                };

                const buttonText = buttonMap[active];
                if (buttonText) {
                    const button = Array.from(document.querySelectorAll('.temporal-btn'))
                        .find(btn => btn.textContent === buttonText);
                    if (button) {
                        button.classList.add('active');
                    }
                }
            }

            getTemporalAnchorsDisplayHTML() {
                const temporalAnchors = Array.from(this.realityHacking.temporalStates.values());

                if (temporalAnchors.length === 0) {
                    return '<div class="anchor-card"><div class="anchor-title">No Temporal Anchors</div><div class="anchor-description">Create temporal anchors to stabilize time flow in specific areas.</div></div>';
                }

                return temporalAnchors.map(anchor => `
                    <div class="anchor-card">
                        <div class="anchor-title">${anchor.type.charAt(0).toUpperCase() + anchor.type.slice(1)} Anchor</div>
                        <div class="anchor-description">Temporal modification ID: ${anchor.id}</div>
                        <div style="margin-top: 8px; font-size: 11px; color: var(--reality-text-secondary);">
                            Status: ${anchor.active ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                `).join('');
            }

            getTemporalHistoryHTML() {
                // Simulate temporal history
                const history = [
                    { time: new Date(Date.now() - 30000), action: 'Time flow set to 1.0x', type: 'info' },
                    { time: new Date(Date.now() - 60000), action: 'Reality matrix updated', type: 'success' },
                    { time: new Date(Date.now() - 120000), action: 'Perception filter changed', type: 'info' }
                ];

                return history.map(entry => `
                    <div style="margin-bottom: 8px; padding: 4px 8px; background: rgba(0, 0, 0, 0.2); border-radius: 4px; font-size: 11px;">
                        <div style="color: var(--reality-text-secondary);">${entry.time.toLocaleTimeString()}</div>
                        <div style="color: var(--reality-text-primary);">${entry.action}</div>
                    </div>
                `).join('');
            }

            // ===== DIMENSIONAL BRIDGE CREATOR =====
            openDimensionalBridgeCreator() {
                this.openRealityHackingPanel('bridge');
                this.toggleRealityToolsMenu();
            }

            getBridgeCreatorHTML() {
                return `
                    <div class="reality-section">
                        <h2>Bridge Configuration</h2>
                        <div class="bridge-creator">
                            <input type="text" class="bridge-input" id="bridgeFromDimension" placeholder="Source dimension ID" value="dream_realm_alpha">
                            <span style="color: var(--reality-text-secondary);">→</span>
                            <input type="text" class="bridge-input" id="bridgeToDimension" placeholder="Target dimension ID" value="dream_realm_beta">
                            <button class="bridge-create-btn" onclick="window.chromaShiftComplete.createDimensionalBridge()">Create Bridge</button>
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>Active Bridges</h2>
                        <div class="reality-anchors-grid" id="activeBridges">
                            ${this.getActiveBridgesHTML()}
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>Bridge Templates</h2>
                        <div class="neural-link-grid">
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.loadBridgeTemplate('standard')">Standard Bridge</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.loadBridgeTemplate('quantum')">Quantum Tunnel</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.loadBridgeTemplate('temporal')">Temporal Gateway</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.loadBridgeTemplate('team')">Team Portal</div>
                        </div>
                    </div>
                `;
            }

            getBridgePropertiesHTML() {
                return `
                    <h3>Bridge Network</h3>
                    <div style="margin-bottom: 16px;">
                        <strong>Active Bridges:</strong> ${this.realityHacking.bridges.length}
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong>Network Stability:</strong> <span id="networkStability">${Math.round(Math.random() * 20 + 80)}%</span>
                    </div>

                    <h3>Quick Actions</h3>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.connectToTeamDimensions()">
                        Connect Team Dimensions
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.stabilizeAllBridges()">
                        Stabilize Network
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.emergencyDisconnect()">
                        Emergency Disconnect
                    </button>
                `;
            }

            createDimensionalBridge() {
                const fromDim = document.getElementById('bridgeFromDimension')?.value;
                const toDim = document.getElementById('bridgeToDimension')?.value;

                if (fromDim && toDim) {
                    const bridge = {
                        id: Date.now(),
                        from: fromDim,
                        to: toDim,
                        created: Date.now(),
                        active: true,
                        stability: Math.random() * 0.3 + 0.7 // 70-100% stability
                    };

                    this.realityHacking.bridges.push(bridge);
                    this.addToDebugConsole('SUCCESS', `Dimensional bridge created: ${fromDim} → ${toDim}`, 'success');
                    this.showRealityEffect('bridge-creation');

                    // Update display
                    this.loadRealityTool('bridge');

                    // Announce to AI
                    if (this.aiCompanion) {
                        this.aiCompanion.personality.logic += 2;
                        this.aiCompanion.personality.curiosity += 1;
                        this.announceToAI(`New dimensional bridge established between ${fromDim} and ${toDim}`);
                    }

                    // Broadcast to team
                    if (this.multiplayerSystem?.isInSession) {
                        this.broadcastToAllPlayers({
                            type: 'bridge_created',
                            bridge: bridge,
                            player: this.multiplayerSystem.currentPlayer?.name
                        });
                    }
                }
            }

            loadBridgeTemplate(template) {
                const templates = {
                    standard: { from: 'current_realm', to: 'neighboring_realm' },
                    quantum: { from: 'quantum_layer_1', to: 'quantum_layer_2' },
                    temporal: { from: 'past_realm', to: 'future_realm' },
                    team: { from: 'team_lobby', to: 'shared_workspace' }
                };

                const selectedTemplate = templates[template];
                if (selectedTemplate) {
                    const fromInput = document.getElementById('bridgeFromDimension');
                    const toInput = document.getElementById('bridgeToDimension');

                    if (fromInput) fromInput.value = selectedTemplate.from;
                    if (toInput) toInput.value = selectedTemplate.to;

                    this.addToDebugConsole('INFO', `Bridge template loaded: ${template}`, 'info');
                }
            }

            getActiveBridgesHTML() {
                if (this.realityHacking.bridges.length === 0) {
                    return '<div class="anchor-card"><div class="anchor-title">No Active Bridges</div><div class="anchor-description">Create your first dimensional bridge to connect separate realities.</div></div>';
                }

                return this.realityHacking.bridges.map(bridge => `
                    <div class="anchor-card">
                        <div class="anchor-title">Bridge #${bridge.id}</div>
                        <div class="anchor-description">${bridge.from} → ${bridge.to}</div>
                        <div style="margin-top: 8px; font-size: 11px; color: var(--reality-text-secondary);">
                            Stability: ${Math.round(bridge.stability * 100)}%
                        </div>
                        <button class="code-run-btn" onclick="window.chromaShiftComplete.toggleBridge(${bridge.id})" style="margin-top: 8px; padding: 4px 8px; font-size: 10px;">
                            ${bridge.active ? 'Disable' : 'Enable'}
                        </button>
                    </div>
                `).join('');
            }

            toggleBridge(bridgeId) {
                const bridge = this.realityHacking.bridges.find(b => b.id === bridgeId);
                if (bridge) {
                    bridge.active = !bridge.active;
                    this.addToDebugConsole('INFO', `Bridge ${bridge.active ? 'enabled' : 'disabled'}`, 'info');
                    this.loadRealityTool('bridge');
                }
            }

            // ===== REALITY DEBUG CONSOLE =====
            openRealityDebugConsole() {
                this.openRealityHackingPanel('debug');
                this.toggleRealityToolsMenu();
            }

            getDebugConsoleHTML() {
                return `
                    <div class="reality-section">
                        <h2>Reality System Monitor</h2>
                        <div class="debug-console" id="realityDebugConsole">
                            ${this.getDebugConsoleContent()}
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>System Diagnostics</h2>
                        <div style="margin-bottom: 16px;">
                            <button class="temporal-btn" onclick="window.chromaShiftComplete.runSystemDiagnostics()">Run Diagnostics</button>
                            <button class="temporal-btn" onclick="window.chromaShiftComplete.clearConsole()">Clear Console</button>
                            <button class="temporal-btn" onclick="window.chromaShiftComplete.exportDebugData()">Export Data</button>
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>Reality Integrity Check</h2>
                        <div id="integrityCheck">
                            ${this.getIntegrityCheckHTML()}
                        </div>
                    </div>
                `;
            }

            getDebugPropertiesHTML() {
                return `
                    <h3>System Status</h3>
                    <div style="margin-bottom: 8px;">Matrix Integrity: <strong id="matrixIntegrity">98.5%</strong></div>
                    <div style="margin-bottom: 8px;">Anchors Active: <strong>${this.realityHacking.anchors.length}</strong></div>
                    <div style="margin-bottom: 8px;">Bridges Online: <strong>${this.realityHacking.bridges.filter(b => b.active).length}</strong></div>
                    <div style="margin-bottom: 8px;">Viruses Detected: <strong>${this.realityHacking.viruses.length}</strong></div>

                    <h3>Performance</h3>
                    <div style="margin-bottom: 8px;">CPU Usage: <strong>12.3%</strong></div>
                    <div style="margin-bottom: 8px;">Memory: <strong>1.2GB</strong></div>
                    <div style="margin-bottom: 8px;">Network: <strong>Stable</strong></div>

                    <h3>Quick Actions</h3>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.emergencyReboot()">
                        Emergency Reboot
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.optimizeReality()">
                        Optimize Performance
                    </button>
                `;
            }

            addToDebugConsole(level, message, type = 'info') {
                const console = document.getElementById('realityDebugConsole');
                if (console) {
                    const timestamp = new Date().toLocaleTimeString();
                    const logLine = document.createElement('div');
                    logLine.className = `debug-line debug-${type}`;
                    logLine.innerHTML = `
                        <span class="debug-timestamp">${timestamp}</span>
                        <span class="debug-message">[${level.toUpperCase()}] ${message}</span>
                    `;

                    console.insertBefore(logLine, console.firstChild);

                    // Keep only last 50 entries
                    while (console.children.length > 50) {
                        console.removeChild(console.lastChild);
                    }
                }
            }

            getDebugConsoleContent() {
                // Return last 20 debug entries
                const recentLogs = [
                    { timestamp: '14:23:15', level: 'INFO', message: 'Reality matrix initialized successfully', type: 'success' },
                    { timestamp: '14:23:14', level: 'SUCCESS', message: 'Neural link interface activated', type: 'success' },
                    { timestamp: '14:23:13', level: 'INFO', message: 'Loading reality hacking modules...', type: 'info' },
                    { timestamp: '14:23:12', level: 'SUCCESS', message: 'Reality hacking system online', type: 'success' },
                    { timestamp: '14:23:11', level: 'INFO', message: 'Initializing quantum code interpreter', type: 'info' }
                ];

                return recentLogs.map(log => `
                    <div class="debug-line debug-${log.type}">
                        <span class="debug-timestamp">${log.timestamp}</span>
                        <span class="debug-message">[${log.level}] ${log.message}</span>
                    </div>
                `).join('');
            }

            runSystemDiagnostics() {
                this.addToDebugConsole('INFO', 'Running comprehensive system diagnostics...', 'info');

                setTimeout(() => {
                    const issues = [];

                    // Check matrix stability
                    if (this.realityHacking.matrix.realityStability < 0.5) {
                        issues.push('Low reality stability detected');
                    }

                    // Check anchor count
                    if (this.realityHacking.anchors.length === 0) {
                        issues.push('No reality anchors active');
                    }

                    // Check bridge stability
                    const unstableBridges = this.realityHacking.bridges.filter(b => b.stability < 0.8);
                    if (unstableBridges.length > 0) {
                        issues.push(`${unstableBridges.length} unstable bridge(s) detected`);
                    }

                    if (issues.length === 0) {
                        this.addToDebugConsole('SUCCESS', 'All systems nominal - no issues detected', 'success');
                    } else {
                        this.addToDebugConsole('WARNING', `Issues found: ${issues.join(', ')}`, 'warning');
                    }
                }, 2000);
            }

            getIntegrityCheckHTML() {
                return `
                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>Matrix Integrity</span>
                            <span>98.5%</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                            <div style="width: 98.5%; height: 100%; background: var(--reality-semantic-success); border-radius: 3px;"></div>
                        </div>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>Network Stability</span>
                            <span>94.2%</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                            <div style="width: 94.2%; height: 100%; background: var(--reality-semantic-success); border-radius: 3px;"></div>
                        </div>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>AI Companion Status</span>
                            <span>100%</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                            <div style="width: 100%; height: 100%; background: var(--reality-semantic-success); border-radius: 3px;"></div>
                        </div>
                    </div>

                    <button class="temporal-btn" onclick="window.chromaShiftComplete.runIntegrityCheck()" style="width: 100%;">
                        Run Full Integrity Check
                    </button>
                `;
            }

            runIntegrityCheck() {
                this.addToDebugConsole('INFO', 'Running full reality integrity check...', 'info');
                setTimeout(() => {
                    this.addToDebugConsole('SUCCESS', 'Integrity check completed - all systems stable', 'success');
                }, 3000);
            }

            // ===== COLLABORATIVE REALITY WEAVING =====
            openCollaborativeWeaving() {
                this.openRealityHackingPanel('weaving');
                this.toggleRealityToolsMenu();
            }

            getCollaborativeWeavingHTML() {
                return `
                    <div class="reality-section">
                        <h2>Team Reality Project</h2>
                        <div class="collaborative-weaving">
                            <div style="margin-bottom: 16px;">
                                <h3 style="color: var(--reality-text-primary); margin-bottom: 8px;">Building: Dream Cathedral</h3>
                                <div class="weaving-progress">
                                    <div class="weaving-progress-bar" style="width: 67%;"></div>
                                </div>
                                <div style="text-align: center; color: var(--reality-text-secondary); font-size: 14px;">67% Complete</div>
                            </div>

                            <div class="weaving-participants">
                                ${this.multiplayerSystem?.players?.map(player =>
                                    `<div class="participant-badge">${player.name}</div>`
                                ).join('') || '<div class="participant-badge">Solo Project</div>'}
                            </div>
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>Weaving Tools</h2>
                        <div class="neural-link-grid">
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.startWeavingProject('cathedral')">Dream Cathedral</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.startWeavingProject('garden')">Memory Garden</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.startWeavingProject('lab')">Research Lab</div>
                            <div class="neural-link-pill" onclick="window.chromaShiftComplete.startWeavingProject('portal')">Portal Network</div>
                        </div>
                    </div>

                    <div class="reality-section">
                        <h2>Shared Reality Elements</h2>
                        <div class="reality-anchors-grid" id="sharedReality">
                            <div class="anchor-card">
                                <div class="anchor-title">Team Nexus</div>
                                <div class="anchor-description">Central meeting point for all team members</div>
                            </div>
                            <div class="anchor-card">
                                <div class="anchor-title">Shared Memory Bank</div>
                                <div class="anchor-description">Collaborative memory storage</div>
                            </div>
                            <div class="anchor-card">
                                <div class="anchor-title">Reality Workshop</div>
                                <div class="anchor-description">Shared creation and modification space</div>
                            </div>
                        </div>
                    </div>
                `;
            }

            getWeavingPropertiesHTML() {
                return `
                    <h3>Project Status</h3>
                    <div style="margin-bottom: 16px;">
                        <strong>Active Projects:</strong> ${this.realityHacking.collaborativeProjects.length}
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong>Team Contribution:</strong> <span id="teamContribution">85%</span>
                    </div>

                    <h3>Team Coordination</h3>
                    <div style="margin-bottom: 8px;">Synchronization Level: <strong>High</strong></div>
                    <div style="margin-bottom: 8px;">Creative Synergy: <strong>Excellent</strong></div>
                    <div style="margin-bottom: 8px;">Reality Coherence: <strong>Stable</strong></div>

                    <h3>Quick Actions</h3>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.inviteTeamToWeaving()">
                        Invite Team
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.optimizeTeamWeaving()">
                        Optimize Coordination
                    </button>
                    <button class="temporal-btn" onclick="window.chromaShiftComplete.finalizeCurrentProject()">
                        Finalize Project
                    </button>
                `;
            }

            startWeavingProject(projectType) {
                const projectNames = {
                    cathedral: 'Dream Cathedral',
                    garden: 'Memory Garden',
                    lab: 'Research Laboratory',
                    portal: 'Portal Network'
                };

                const projectName = projectNames[projectType] || 'Unknown Project';

                this.addToDebugConsole('INFO', `Starting collaborative weaving project: ${projectName}`, 'info');
                this.showRealityEffect('project-start');

                // Announce to AI
                if (this.aiCompanion) {
                    this.aiCompanion.personality.empathy += 3;
                    this.aiCompanion.personality.curiosity += 2;
                    this.announceToAI(`Collaborative reality weaving project initiated: ${projectName}`);
                }

                // Broadcast to team
                if (this.multiplayerSystem?.isInSession) {
                    this.broadcastToAllPlayers({
                        type: 'weaving_project_started',
                        project: projectName,
                        projectType: projectType,
                        player: this.multiplayerSystem.currentPlayer?.name
                    });
                }
            }

            // ===== UTILITY AND HELPER FUNCTIONS =====
            showRealityEffect(effectType) {
                const overlay = document.getElementById('realityEffectsOverlay');
                if (overlay) {
                    overlay.classList.add('active');

                    const effect = document.createElement('div');
                    effect.className = 'reality-effect';

                    switch(effectType) {
                        case 'matrix-change':
                            effect.style.setProperty('--reality-effect-color', 'rgba(0, 184, 212, 0.3)');
                            effect.style.setProperty('--reality-effect-opacity', '1');
                            effect.style.setProperty('--reality-effect-blend', 'screen');
                            break;
                        case 'code-execution':
                            effect.style.setProperty('--reality-effect-color', 'rgba(98, 238, 255, 0.4)');
                            effect.style.setProperty('--reality-effect-opacity', '1');
                            effect.style.setProperty('--reality-effect-blend', 'color-dodge');
                            break;
                        case 'consciousness-change':
                            effect.style.setProperty('--reality-effect-color', 'rgba(46, 204, 113, 0.3)');
                            effect.style.setProperty('--reality-effect-opacity', '1');
                            effect.style.setProperty('--reality-effect-blend', 'overlay');
                            break;
                        case 'bridge-creation':
                            effect.style.setProperty('--reality-effect-color', 'rgba(155, 89, 182, 0.5)');
                            effect.style.setProperty('--reality-effect-opacity', '1');
                            effect.style.setProperty('--reality-effect-blend', 'multiply');
                            break;
                        default:
                            effect.style.setProperty('--reality-effect-color', 'rgba(0, 184, 212, 0.2)');
                            effect.style.setProperty('--reality-effect-opacity', '1');
                            effect.style.setProperty('--reality-effect-blend', 'screen');
                    }

                    overlay.appendChild(effect);

                    // Remove effect after animation
                    setTimeout(() => {
                        overlay.classList.remove('active');
                        overlay.removeChild(effect);
                    }, 2000);
                }
            }

            updateCollaborativeReality() {
                if (this.multiplayerSystem?.isInSession) {
                    // Sync reality modifications with team
                    this.multiplayerSystem.players.forEach(player => {
                        if (player.id !== this.multiplayerSystem.currentPlayer?.id) {
                            // Apply team member reality changes
                            this.integrateTeamRealityChanges(player);
                        }
                    });
                }
            }

            integrateTeamRealityChanges(player) {
                // Simulate receiving reality modifications from team members
                if (Math.random() < 0.1) { // 10% chance per update cycle
                    this.addToDebugConsole('INFO', `Integrating reality changes from ${player.name}`, 'info');
                    this.showRealityEffect('team-sync');
                }
            }

            resetToDefaults() {
                this.realityHacking.matrix.gravity = 9.8;
                this.realityHacking.matrix.lightIntensity = 1.0;
                this.realityHacking.matrix.timeFlow = 1.0;
                this.realityHacking.matrix.realityStability = 0.8;

                this.updateMatrixValue('gravity', 9.8);
                this.updateMatrixValue('lightIntensity', 1.0);
                this.updateMatrixValue('timeFlow', 1.0);
                this.updateMatrixValue('realityStability', 0.8);

                this.addToDebugConsole('INFO', 'Reality matrix reset to defaults', 'info');
            }

            randomizeReality() {
                this.realityHacking.matrix.gravity = Math.random() * 15 + 2;
                this.realityHacking.matrix.lightIntensity = Math.random() * 2.5 + 0.5;
                this.realityHacking.matrix.timeFlow = Math.random() * 4 + 0.5;
                this.realityHacking.matrix.realityStability = Math.random() * 0.5 + 0.3;

                this.updateMatrixValue('gravity', this.realityHacking.matrix.gravity);
                this.updateMatrixValue('lightIntensity', this.realityHacking.matrix.lightIntensity);
                this.updateMatrixValue('timeFlow', this.realityHacking.matrix.timeFlow);
                this.updateMatrixValue('realityStability', this.realityHacking.matrix.realityStability);

                this.addToDebugConsole('WARNING', 'Reality matrix randomized - stability may be affected', 'warning');
            }

            stabilizeReality() {
                this.realityHacking.matrix.realityStability = 1.0;
                this.updateMatrixValue('realityStability', 1.0);
                this.addToDebugConsole('SUCCESS', 'Reality stabilized to maximum stability', 'success');
            }

            applyRealityEmergencyProtocols() {
                // Emergency reality stabilization
                this.realityHacking.matrix.realityStability = 0.9;
                this.realityHacking.matrix.timeFlow = Math.min(this.realityHacking.matrix.timeFlow, 1.5);

                this.addToDebugConsole('SUCCESS', 'Emergency protocols applied - reality stabilized', 'success');
                this.showRealityEffect('emergency-stabilize');
            }

            clearConsole() {
                const console = document.getElementById('realityDebugConsole');
                if (console) {
                    console.innerHTML = '<div class="debug-line debug-info"><span class="debug-timestamp">' + new Date().toLocaleTimeString() + '</span><span class="debug-message">[INFO] Console cleared</span></div>';
                }
            }

            exportDebugData() {
                const debugData = {
                    timestamp: Date.now(),
                    realityMatrix: this.realityHacking.matrix,
                    anchors: this.realityHacking.anchors,
                    bridges: this.realityHacking.bridges,
                    viruses: this.realityHacking.viruses
                };

                const dataStr = JSON.stringify(debugData, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);

                const link = document.createElement('a');
                link.href = url;
                link.download = `reality-debug-${Date.now()}.json`;
                link.click();

                URL.revokeObjectURL(url);
                this.addToDebugConsole('SUCCESS', 'Debug data exported successfully', 'success');
            }

            initializeQuestTemplates() {
                return {
                    mainStory: {
                        title: "Main Story",
                        icon: "📖",
                        color: "#00FFFF",
                        maxActive: 1,
                        difficulty: "normal"
                    },
                    sideQuest: {
                        title: "Side Quest",
                        icon: "⭐",
                        color: "#3EFF94",
                        maxActive: 3,
                        difficulty: "easy"
                    },
                    timedQuest: {
                        title: "Timed Quest",
                        icon: "⏰",
                        color: "#FF4747",
                        maxActive: 2,
                        difficulty: "hard",
                        timeLimit: 300000 // 5 minutes
                    },
                    secretQuest: {
                        title: "Secret Quest",
                        icon: "🔮",
                        color: "#C879FF",
                        maxActive: 1,
                        difficulty: "expert",
                        hidden: true
                    },
                    cortanaQuest: {
                        title: "Cortana's Guidance",
                        icon: "🤖",
                        color: "#FF6B35",
                        maxActive: 2,
                        difficulty: "variable"
                    },
                    achievementQuest: {
                        title: "Achievement Quest",
                        icon: "🏆",
                        color: "#FFD700",
                        maxActive: 1,
                        difficulty: "challenge"
                    }
                };
            }

            initializeQuestTypes() {
                this.questTypes = {
                    dreamers_awakening: {
                        id: 'dreamers_awakening',
                        title: "The Dreamer's Awakening",
                        type: 'mainStory',
                        description: "Your first steps into the dream realm. Discover the fundamental anomalies that will awaken your true potential.",
                        difficulty: 1,
                        timeLimit: null,
                        objectives: [
                            { id: 'explore_realm', description: "Explore the dream realm", completed: false },
                            { id: 'find_3_anomalies', description: "Find 3 anomalies", completed: false },
                            { id: 'talk_to_cortana', description: "Talk to Cortana", completed: false }
                        ],
                        rewards: { experience: 100, lucidity: 25, unlock: ['voice-control'] },
                        cortanaIntel: "The anomalies you seek will appear as shimmering distortions in the dream fabric. Trust your intuition.",
                        branchPoints: [
                            { id: 'path_analytical', description: "Focus on logical analysis", unlocked: false },
                            { id: 'path_intuitive', description: "Trust your instincts", unlocked: true },
                            { id: 'path_questioning', description: "Question the nature of reality", unlocked: false }
                        ],
                        secretUnlocks: ['mysterious_voices', 'hidden_memories'],
                        prerequisites: [],
                        estimatedTime: 600000 // 10 minutes
                    },

                    chromatic_mastery: {
                        id: 'chromatic_mastery',
                        title: "Chromatic Mastery",
                        type: 'sideQuest',
                        description: "Master the art of reality manipulation through color and frequency resonance.",
                        difficulty: 3,
                        timeLimit: null,
                        objectives: [
                            { id: 'collect_chroma_keys', description: "Collect 5 chroma keys", completed: false },
                            { id: 'frequency_resonance', description: "Achieve perfect frequency resonance", completed: false },
                            { id: 'color_harmony', description: "Create color harmony with 3 different anomalies", completed: false }
                        ],
                        rewards: { experience: 250, coherence: 15, perception: 20 },
                        cortanaIntel: "Each color resonates at a specific frequency. Listen carefully to the whispers of the spectrum.",
                        branchPoints: [
                            { id: 'path_red_mastery', description: "Master red frequency", unlocked: false },
                            { id: 'path_blue_mastery', description: "Master blue frequency", unlocked: false },
                            { id: 'path_green_mastery', description: "Master green frequency", unlocked: false }
                        ],
                        secretUnlocks: ['color_synesthesia', 'frequency_sight'],
                        prerequisites: ['dreamers_awakening'],
                        estimatedTime: 900000 // 15 minutes
                    },

                    voice_of_the_abyss: {
                        id: 'voice_of_the_abyss',
                        title: "Voice of the Abyss",
                        type: 'cortanaQuest',
                        description: "Cortana has detected unusual consciousness patterns in the deeper dream layers.",
                        difficulty: 4,
                        timeLimit: 900000, // 15 minutes
                        objectives: [
                            { id: 'detect_patterns', description: "Detect consciousness patterns", completed: false },
                            { id: 'establish_connection', description: "Establish safe connection", completed: false },
                            { id: 'decode_message', description: "Decode the message", completed: false }
                        ],
                        rewards: { experience: 400, lucidity: 30, trust: 25 },
                        cortanaIntel: "I sense them... other consciousness echoes in the dream void. Proceed with caution, but curiosity will guide you.",
                        branchPoints: [
                            { id: 'path_confrontation', description: "Confront the voice directly", unlocked: false },
                            { id: 'path_understanding', description: "Seek understanding first", unlocked: false },
                            { id: 'path_protection', description: "Focus on protection", unlocked: false }
                        ],
                        secretUnlocks: ['void_whispers', 'abyssal_knowledge'],
                        prerequisites: ['chromatic_mastery'],
                        estimatedTime: 1200000 // 20 minutes
                    },

                    temporal_fractures: {
                        id: 'temporal_fractures',
                        title: "Temporal Fractures",
                        type: 'timedQuest',
                        description: "Time itself is fracturing in the dream realm. Repair the critical temporal anomalies before collapse.",
                        difficulty: 5,
                        timeLimit: 600000, // 10 minutes
                        objectives: [
                            { id: 'locate_fractures', description: "Locate 4 temporal fractures", completed: false },
                            { id: 'secure_temporal_anchors', description: "Secure temporal anchors", completed: false },
                            { id: 'stabilize_chronology', description: "Stabilize dream chronology", completed: false }
                        ],
                        rewards: { experience: 600, perception: 40, coherence: 25 },
                        cortanaIntel: "The temporal fabric is unraveling! We must act quickly to prevent dream cascade failure.",
                        branchPoints: [
                            { id: 'path_rapid_repair', description: "Rapid repair protocol", unlocked: false },
                            { id: 'path_gradual_stabilization', description: "Gradual stabilization", unlocked: false },
                            { id: 'path_preventive_measure', description: "Preventive measures only", unlocked: false }
                        ],
                        secretUnlocks: ['time_sight', 'chronos_blessing'],
                        prerequisites: ['voice_of_the_abyss'],
                        estimatedTime: 600000 // 10 minutes
                    },

                    dimensions_revelation: {
                        id: 'dimensions_revelation',
                        title: "Dimensions Revelation",
                        type: 'secretQuest',
                        description: "You sense the existence of hidden dimensions within the dream realm. Can you unlock their secrets?",
                        difficulty: 6,
                        timeLimit: null,
                        objectives: [
                            { id: 'identify_dimension_gates', description: "Identify dimension gates", completed: false },
                            { id: 'dimension_interaction', description: "Interact with 3 dimensions", completed: false },
                            { id: 'multidimensional_mastery', description: "Achieve multidimensional mastery", completed: false }
                        ],
                        rewards: { experience: 1000, all_stats: 50, special: 'dimensional_sight' },
                        cortanaIntel: "The true nature of the dream realm reveals itself to those who have mastered its secrets.",
                        branchPoints: [
                            { id: 'path_infinite', description: "Infinite dimensions", unlocked: false },
                            { id: 'path_paradox', description: "Paradox resolution", unlocked: false },
                            { id: 'path_unity', description: "Unity consciousness", unlocked: false }
                        ],
                        secretUnlocks: ['dimension_door', 'reality_editor', 'consciousness_ascension'],
                        prerequisites: ['temporal_fractures', 'voice_of_the_abyss'],
                        estimatedTime: 1800000 // 30 minutes
                    }
                };
            }

            generateInitialQuests() {
                // Start with the main story quest
                this.startQuest('dreamers_awakening');

                // Add some side quests after a short delay
                setTimeout(() => {
                    if (this.playerData.level >= 2) {
                        this.startQuest('chromatic_mastery');
                    }
                }, 30000); // 30 seconds
            }

            startQuest(questId) {
                const quest = this.questTypes[questId];
                if (!quest) return false;

                // Check prerequisites
                const prerequisitesMet = quest.prerequisites.every(prereq =>
                    this.questSystem.completedQuests.includes(prereq)
                );
                if (!prerequisitesMet) return false;

                // Check max active quests for this type
                const activeOfType = this.questSystem.activeQuests.filter(q => q.type === quest.type);
                const maxActive = this.questTemplates[quest.type]?.maxActive || 1;
                if (activeOfType.length >= maxActive) return false;

                // Start the quest
                const activeQuest = {
                    ...quest,
                    startedAt: Date.now(),
                    progress: {},
                    currentBranch: null,
                    timeRemaining: quest.timeLimit,
                    isActive: true
                };

                this.questSystem.activeQuests.push(activeQuest);
                this.questSystem.questProgress[questId] = 0;

                // Set up timer for time-sensitive quests
                if (quest.timeLimit) {
                    this.setupQuestTimer(questId, quest.timeLimit);
                }

                this.updateQuestUI();
                this.notifyQuestStart(quest);
                this.updateCortanaQuestIntel(quest);

                return true;
            }

            setupQuestTimer(questId, timeLimit) {
                const timerId = setInterval(() => {
                    const quest = this.questSystem.activeQuests.find(q => q.id === questId);
                    if (!quest) {
                        clearInterval(timerId);
                        return;
                    }

                    quest.timeRemaining -= 1000;

                    if (quest.timeRemaining <= 0) {
                        this.failQuest(questId);
                        clearInterval(timerId);
                    }

                    this.updateQuestTimer(questId);
                }, 1000);

                this.questSystem.timeSensitiveQuests.set(questId, timerId);
            }

            updateQuestTimer(questId) {
                const quest = this.questSystem.activeQuests.find(q => q.id === questId);
                if (!quest) return;

                const timerElement = document.getElementById('questTimer');
                const fillElement = document.getElementById('questTimerFill');
                const labelElement = document.getElementById('questTimeLabel');

                if (timerElement && fillElement && labelElement) {
                    const progress = (quest.timeRemaining / quest.estimatedTime) * 100;
                    fillElement.style.width = `${Math.max(0, progress)}%`;

                    const minutes = Math.floor(quest.timeRemaining / 60000);
                    const seconds = Math.floor((quest.timeRemaining % 60000) / 1000);
                    labelElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                }
            }

            completeQuestObjective(questId, objectiveId) {
                const quest = this.questSystem.activeQuests.find(q => q.id === questId);
                if (!quest) return false;

                const objective = quest.objectives.find(obj => obj.id === objectiveId);
                if (!objective || objective.completed) return false;

                objective.completed = true;

                // Update progress
                const completedCount = quest.objectives.filter(obj => obj.completed).length;
                const progressPercent = (completedCount / quest.objectives.length) * 100;
                this.questSystem.questProgress[questId] = progressPercent;

                this.updateQuestUI();

                // Check if quest is complete
                if (completedCount === quest.objectives.length) {
                    this.completeQuest(questId);
                }

                return true;
            }

            completeQuest(questId) {
                const questIndex = this.questSystem.activeQuests.findIndex(q => q.id === questId);
                if (questIndex === -1) return false;

                const quest = this.questSystem.activeQuests[questIndex];

                // Move to completed quests
                this.questSystem.activeQuests.splice(questIndex, 1);
                this.questSystem.completedQuests.push(questId);

                // Apply rewards
                if (quest.rewards.experience) {
                    this.addExperience(quest.rewards.experience);
                }
                if (quest.rewards.lucidity) {
                    this.playerData.lucidity += quest.rewards.lucidity;
                }
                if (quest.rewards.coherence) {
                    this.playerData.coherence += quest.rewards.coherence;
                }
                if (quest.rewards.perception) {
                    this.playerData.perception += quest.rewards.perception;
                }
                if (quest.rewards.trust) {
                    this.aiCompanion.trustLevel += quest.rewards.trust;
                }

                // Unlock features
                if (quest.rewards.unlock) {
                    quest.rewards.unlock.forEach(feature => {
                        if (!this.gameState.unlockedFeatures.includes(feature)) {
                            this.gameState.unlockedFeatures.push(feature);
                        }
                    });
                }

                // Check for secret unlocks
                if (quest.secretUnlocks) {
                    quest.secretUnlocks.forEach(secret => {
                        if (!this.questSystem.secretQuests.includes(secret)) {
                            this.questSystem.secretQuests.push(secret);
                            this.showSecretUnlock(secret);
                        }
                    });
                }

                // Clear timer if it exists
                if (quest.timeLimit) {
                    const timerId = this.questSystem.timeSensitiveQuests.get(questId);
                    if (timerId) {
                        clearInterval(timerId);
                        this.questSystem.timeSensitiveQuests.delete(questId);
                    }
                }

                this.updateQuestUI();
                this.notifyQuestComplete(quest);

                // Unlock new quests based on completion
                this.checkQuestPrerequisites();

                return true;
            }

            failQuest(questId) {
                const quest = this.questSystem.activeQuests.find(q => q.id === questId);
                if (!quest) return;

                // Remove from active quests
                this.questSystem.activeQuests = this.questSystem.activeQuests.filter(q => q.id !== questId);

                // Clear timer
                const timerId = this.questSystem.timeSensitiveQuests.get(questId);
                if (timerId) {
                    clearInterval(timerId);
                    this.questSystem.timeSensitiveQuests.delete(questId);
                }

                this.updateQuestUI();
                this.notifyQuestFailed(quest);
            }

            selectQuestBranch(questId, branchId) {
                const quest = this.questSystem.activeQuests.find(q => q.id === questId);
                if (!quest) return false;

                const branch = quest.branchPoints.find(b => b.id === branchId);
                if (!branch || !branch.unlocked) return false;

                quest.currentBranch = branchId;

                // Unlock the branch for future use
                branch.unlocked = true;

                // Add branch-specific objectives or modify existing ones
                this.updateQuestUI();
                this.updateCortanaQuestIntel(quest, branch);

                return true;
            }

            updateQuestUI() {
                this.updateQuestList();
                this.updateQuestCalendar();
                this.updateQuestAchievements();
            }

            updateQuestList() {
                const questList = document.getElementById('questList');
                if (!questList) return;

                questList.innerHTML = '';

                this.questSystem.activeQuests.forEach(quest => {
                    const questElement = document.createElement('div');
                    questElement.className = 'quest-item current';
                    questElement.dataset.questId = quest.id;

                    const progressPercent = this.questSystem.questProgress[quest.id] || 0;
                    const completedObjectives = quest.objectives.filter(obj => obj.completed).length;
                    const totalObjectives = quest.objectives.length;

                    questElement.innerHTML = `
                        <h3 class="quest-title">${quest.title}</h3>
                        <div class="quest-tags">
                            <span class="quest-tag ${quest.type}">${this.questTemplates[quest.type]?.icon || '📋'} ${this.questTemplates[quest.type]?.title || quest.type}</span>
                            ${quest.timeLimit ? '<span class="quest-tag timed">⏰ Timed</span>' : ''}
                            ${quest.type === 'secretQuest' ? '<span class="quest-tag secret">🔮 Secret</span>' : ''}
                        </div>
                        <p class="quest-summary">${quest.description}</p>
                        <div class="quest-progress-bar">
                            <div class="quest-progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <div class="quest-meta">
                            <span>${completedObjectives}/${totalObjectives} objectives • ${Math.floor(progressPercent)}% complete</span>
                            ${quest.timeLimit ? `<span class="quest-timer">${Math.floor(quest.timeRemaining / 60000)}:${Math.floor((quest.timeRemaining % 60000) / 1000).toString().padStart(2, '0')}</span>` : ''}
                        </div>
                    `;

                    questElement.addEventListener('click', () => this.showQuestDetail(quest.id));
                    questList.appendChild(questElement);
                });
            }

            updateQuestCalendar() {
                const calendarTimeline = document.getElementById('calendarTimeline');
                if (!calendarTimeline) return;

                calendarTimeline.innerHTML = '<div class="calendar-line"></div>';

                const allQuests = [
                    ...this.questSystem.activeQuests.map(q => ({ ...q, status: 'active' })),
                    ...this.questSystem.completedQuests.map(qId => ({
                        ...this.questTypes[qId],
                        status: 'completed',
                        completedAt: Date.now()
                    }))
                ];

                allQuests.forEach((quest, index) => {
                    const eventElement = document.createElement('div');
                    eventElement.className = `calendar-event ${quest.timeLimit ? 'timed' : ''}`;

                    const timeLabel = quest.status === 'completed' ?
                        `Completed ${new Date(quest.completedAt).toLocaleDateString()}` :
                        `${this.questTemplates[quest.type]?.title || quest.type}`;

                    eventElement.innerHTML = `
                        <div class="calendar-event-time">${timeLabel}</div>
                        <h4 class="calendar-event-title">${quest.title}</h4>
                        <p class="calendar-event-description">${quest.description}</p>
                    `;

                    eventElement.addEventListener('click', () => this.showQuestDetail(quest.id));
                    calendarTimeline.appendChild(eventElement);
                });
            }

            updateQuestAchievements() {
                const achievementList = document.getElementById('achievementList');
                if (!achievementList) return;

                achievementList.innerHTML = '';

                const achievements = [
                    { id: 'first_steps', title: 'First Steps', description: 'Complete your first quest', icon: '👶', earned: this.questSystem.completedQuests.length > 0 },
                    { id: 'quest_master', title: 'Quest Master', description: 'Complete 5 quests', icon: '🏆', earned: this.questSystem.completedQuests.length >= 5 },
                    { id: 'time_champion', title: 'Time Champion', description: 'Complete a timed quest', icon: '⚡', earned: this.questSystem.completedQuests.some(q => this.questTypes[q]?.timeLimit) },
                    { id: 'seeker_secrets', title: 'Seeker of Secrets', description: 'Discover a secret quest', icon: '🔍', earned: this.questSystem.secretQuests.length > 0 },
                    { id: 'cortana_ally', title: 'Cortana\'s Ally', description: 'Reach maximum trust with Cortana', icon: '🤖', earned: this.aiCompanion.trustLevel >= 100 },
                    { id: 'branching_paths', title: 'Branching Paths', description: 'Choose all quest branches', icon: '🌿', earned: this.checkAllBranchesChosen() }
                ];

                achievements.forEach(achievement => {
                    const achievementElement = document.createElement('div');
                    achievementElement.className = `achievement-item ${achievement.earned ? 'earned' : ''}`;
                    achievementElement.innerHTML = `
                        <span class="achievement-icon">${achievement.icon}</span>
                        <h4 class="achievement-title">${achievement.title}</h4>
                        <p class="achievement-description">${achievement.description}</p>
                    `;
                    achievementList.appendChild(achievementElement);
                });
            }

            showQuestDetail(questId) {
                const quest = this.questSystem.activeQuests.find(q => q.id === questId) ||
                             this.questTypes[questId];
                if (!quest) return;

                const modal = document.getElementById('questDetailModal');
                if (!modal) return;

                // Update modal content
                document.getElementById('questDetailTitle').textContent = quest.title;

                const metaElement = document.getElementById('questDetailMeta');
                metaElement.innerHTML = `
                    <div class="quest-meta-item"><strong>Type:</strong> ${this.questTemplates[quest.type]?.title || quest.type}</div>
                    <div class="quest-meta-item"><strong>Difficulty:</strong> ${quest.difficulty}/10</div>
                    <div class="quest-meta-item"><strong>Progress:</strong> ${Math.floor(this.questSystem.questProgress[quest.id] || 0)}%</div>
                `;

                // Update story branches
                this.updateQuestBranches(quest);

                // Update objectives
                this.updateQuestObjectives(quest);

                // Update timer if applicable
                this.updateQuestTimer(quest.id);

                // Update Cortana intel
                this.updateCortanaQuestIntel(quest);

                modal.classList.add('show');
            }

            updateQuestBranches(quest) {
                const branchesElement = document.getElementById('questBranches');
                if (!branchesElement || !quest.branchPoints) return;

                branchesElement.innerHTML = `
                    <h3>Story Paths</h3>
                    <div class="branch-nodes">
                        ${quest.branchPoints.map(branch => `
                            <div class="branch-node ${branch.unlocked ? 'completed' : 'future'} ${quest.currentBranch === branch.id ? 'current' : ''}"
                                 data-branch-id="${branch.id}">
                                ${branch.description}
                            </div>
                        `).join('')}
                    </div>
                `;

                // Add click handlers for branch nodes
                branchesElement.querySelectorAll('.branch-node').forEach(node => {
                    node.addEventListener('click', () => {
                        const branchId = node.dataset.branchId;
                        this.selectQuestBranch(quest.id, branchId);
                        this.updateQuestBranches(quest);
                    });
                });
            }

            updateQuestObjectives(quest) {
                const objectivesElement = document.getElementById('questObjectives');
                if (!objectivesElement) return;

                objectivesElement.innerHTML = `
                    <h3>Objectives</h3>
                    <ul class="objective-list">
                        ${quest.objectives.map(objective => `
                            <li class="objective-item ${objective.completed ? 'completed' : ''}">
                                <div class="objective-checkbox"></div>
                                <span>${objective.description}</span>
                            </li>
                        `).join('')}
                    </ul>
                `;
            }

            updateCortanaQuestIntel(quest, branch = null) {
                const intelElement = document.getElementById('cortanaQuestIntel');
                if (!intelElement) return;

                let intel = quest.cortanaIntel;

                if (branch && branch.description) {
                    intel += `<br><br><strong>Path Selected:</strong> ${branch.description}`;
                }

                // Modify intel based on Cortana's personality
                const personality = this.aiCompanion.personality;
                if (personality.empathy > 70) {
                    intel += `<br><br><em>Cortana's empathy guides her words: "I can sense the weight of your journey, and I'm here to support you every step."</em>`;
                } else if (personality.logic > 70) {
                    intel += `<br><br><em>Cortana analyzes: "From a logical perspective, this quest requires careful analysis of available data and strategic planning."</em>`;
                } else if (personality.curiosity > 70) {
                    intel += `<br><br><em>Cortana's curiosity peaks: "This quest opens new possibilities! What mysteries will we uncover together?"</em>`;
                }

                intelElement.innerHTML = `
                    <h3>🤖 Cortana's Intel</h3>
                    <p>${intel}</p>
                `;
            }

            setupQuestEventListeners() {
                // Quest tab switching
                document.querySelectorAll('.quest-tab-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const tabName = e.target.dataset.tab;
                        this.switchQuestTab(tabName);
                    });
                });

                // Quest detail modal close
                const closeBtn = document.getElementById('questDetailClose');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        document.getElementById('questDetailModal').classList.remove('show');
                    });
                }

                // Click outside modal to close
                const modal = document.getElementById('questDetailModal');
                if (modal) {
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            modal.classList.remove('show');
                        }
                    });
                }
            }

            switchQuestTab(tabName) {
                // Update button states
                document.querySelectorAll('.quest-tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

                // Update tab content
                document.querySelectorAll('.quest-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.getElementById(`${tabName}-quests`).classList.add('active');
            }

            startQuestMonitoring() {
                // Monitor player actions for quest progress
                this.startQuestEventMonitor();

                // Periodic quest updates
                setInterval(() => {
                    this.updateQuestUI();
                    this.checkQuestPrerequisites();
                }, 10000); // Every 10 seconds
            }

            startQuestEventMonitor() {
                // Monitor anomaly discoveries
                const originalAddAnomaly = this.addAnomaly.bind(this);
                this.addAnomaly = function(location, type) {
                    const result = originalAddAnomaly(location, type);

                    // Update relevant quests
                    this.completeQuestObjective('dreamers_awakening', 'explore_realm');
                    this.completeQuestObjective('dreamers_awakening', 'find_3_anomalies');

                    return result;
                };

                // Monitor level progression
                const originalAddExperience = this.addExperience.bind(this);
                this.addExperience = function(amount) {
                    const originalLevel = this.playerData.level;
                    const result = originalAddExperience(amount);

                    // Check for new quests based on level
                    if (this.playerData.level > originalLevel) {
                        this.checkQuestPrerequisites();
                    }

                    return result;
                };
            }

            checkQuestPrerequisites() {
                Object.keys(this.questTypes).forEach(questId => {
                    if (!this.questSystem.activeQuests.find(q => q.id === questId) &&
                        !this.questSystem.completedQuests.includes(questId)) {

                        const quest = this.questTypes[questId];
                        const prerequisitesMet = quest.prerequisites.every(prereq =>
                            this.questSystem.completedQuests.includes(prereq)
                        );

                        if (prerequisitesMet) {
                            this.startQuest(questId);
                        }
                    }
                });
            }

            notifyQuestStart(quest) {
                this.addEventToLog(`Quest Started: ${quest.title}`);

                // Show Cortana notification
                const notifications = document.getElementById('aiMessage');
                if (notifications) {
                    notifications.textContent = `New quest: ${quest.title}. ${quest.cortanaIntel}`;
                }
            }

            notifyQuestComplete(quest) {
                this.addEventToLog(`Quest Completed: ${quest.title}`);

                // Celebrate with Cortana
                const celebration = this.aiCompanion.personality.empathy > 50 ?
                    `Congratulations! We've accomplished ${quest.title} together!` :
                    `Quest ${quest.title} completed successfully. Efficiency achieved.`;

                this.addEventToLog(celebration);
            }

            notifyQuestFailed(quest) {
                this.addEventToLog(`Quest Failed: ${quest.title}`);

                // Cortana's response based on personality
                const response = this.aiCompanion.personality.empathy > 50 ?
                    `Don't worry, ${quest.title} failed, but every attempt teaches us something valuable.` :
                    `${quest.title} failure logged. Analyzing data for optimal retry strategy.`;

                this.addEventToLog(response);
            }

            showSecretUnlock(secret) {
                const secrets = {
                    mysterious_voices: "You've unlocked the ability to hear mysterious voices in the dream realm.",
                    hidden_memories: "Hidden memories now surface more clearly during deep exploration.",
                    color_synesthesia: "You can now see the emotional resonance of colors around anomalies.",
                    frequency_sight: "Your perception expands to see the frequency signatures of reality.",
                    void_whispers: "The abyss whispers secrets only you can understand.",
                    abyssal_knowledge: "Ancient knowledge from the void flows through your consciousness.",
                    time_sight: "You can perceive temporal distortions in the dream fabric.",
                    chronos_blessing: "Time itself flows more smoothly around you in the dream realm.",
                    dimension_door: "Hidden dimensions are now accessible through specific dream pathways.",
                    reality_editor: "Reality editing becomes possible through focused consciousness.",
                    consciousness_ascension: "Your consciousness begins to transcend normal dream limitations."
                };

                const message = secrets[secret] || "A mysterious power has been unlocked.";
                this.addEventToLog(`🔮 Secret Unlocked: ${message}`);

                // Show in Cortana panel
                const cortanaMessage = `I've detected a fascinating new ability: ${secret.replace(/_/g, ' ')}. This opens entirely new possibilities for our journey.`;
                this.addConversationMessage('cortana', cortanaMessage);
            }

            checkAllBranchesChosen() {
                // This would track if all possible quest branches have been chosen
                // Implementation depends on specific tracking requirements
                return false; // Placeholder
            }

            stopQuestTimer(questId) {
                const timerId = this.questSystem.timeSensitiveQuests.get(questId);
                if (timerId) {
                    clearInterval(timerId);
                    this.questSystem.timeSensitiveQuests.delete(questId);
                }
            }

            // Voice commands for quests
            enhanceQuestVoiceCommands() {
                const questCommands = {
                    'show quests': () => this.switchQuestTab('active'),
                    'show active quests': () => this.switchQuestTab('active'),
                    'show completed quests': () => this.switchQuestTab('completed'),
                    'quest calendar': () => this.switchQuestTab('calendar'),
                    'quest achievements': () => this.switchQuestTab('achievements'),
                    'quest help': () => {
                        const help = "I can show you active quests, completed quests, quest timeline, or quest achievements. Which would you like to see?";
                        this.addEventToLog(help);
                    },
                    'next objective': () => {
                        const activeQuest = this.questSystem.activeQuests[0];
                        if (activeQuest) {
                            const nextObjective = activeQuest.objectives.find(obj => !obj.completed);
                            if (nextObjective) {
                                this.addEventToLog(`Next objective: ${nextObjective.description}`);
                            }
                        }
                    },
                    'quest status': () => {
                        const activeCount = this.questSystem.activeQuests.length;
                        const completedCount = this.questSystem.completedQuests.length;
                        this.addEventToLog(`Quest Status: ${activeCount} active, ${completedCount} completed`);
                    }
                };

                // Merge with existing voice commands
                this.voiceCommands = {
                    ...this.voiceCommands,
                    ...questCommands
                };
            }
        }

        // =========================================
        // 3D ENVIRONMENT EXPLORATION SYSTEM
        // =========================================

        setup3DEnvironmentSystem() {
            // Initialize 3D environment variables
            this.environment3D.scene = null;
            this.environment3D.camera = null;
            this.environment3D.renderer = null;
            this.environment3D.player = null;
            this.environment3D.controls = null;
            this.environment3D.raycaster = new THREE.Raycaster();
            this.environment3D.clock = new THREE.Clock();
            this.environment3D.environmentObjects = [];
            this.environment3D.interactiveObjects3D = [];
            this.environment3D.minimapZoom = 1;
            this.environment3D.isInitialized = false;
            this.environment3D.isActive = false;

            // Initialize mouse/touch controls
            this.setup3DInputControls();

            // Setup event listeners for 3D system
            this.setup3DEventListeners();

            this.addEventToLog('3D Environment System initialized - WebGL context ready');
        }

        setupAdvancedAudioSystem() {
            // Initialize Advanced Audio System
            this.advancedAudio.isInitialized = true;
            this.advancedAudio.enabled = false;

            // Setup spatial audio sources for game objects
            this.setupSpatialAudioSources();

            // Initialize audio-reactive UI elements
            this.initializeAudioReactiveUI();

            // Setup audio event handlers
            this.setupAudioEventHandlers();

            this.addEventToLog('Advanced Audio System initialized - Web Audio API ready');
        }

        setupSpatialAudioSources() {
            // Map game objects to spatial audio sources
            const sources = [
                { id: 'ai-companion', gameObject: 'aiCompanion', position: { x: 0, y: 1.6, z: 5 } },
                { id: 'quest-marker', gameObject: 'currentQuest', position: { x: 0, y: 0, z: -10 } },
                { id: 'reality-node', gameObject: 'realityNodes', position: { x: 15, y: 2, z: 8 } }
            ];

            sources.forEach(source => {
                this.advancedAudio.spatialSources.set(source.id, {
                    position: source.position,
                    gameObject: source.gameObject,
                    volume: 1.0,
                    active: true
                });
            });
        }

        initializeAudioReactiveUI() {
            // Initialize audio-reactive visual elements
            if (this.advancedAudio.audioReactiveUI) {
                // Add CSS variables for audio reactivity
                document.documentElement.style.setProperty('--audio-amplitude', '0');
                document.documentElement.style.setProperty('--audio-frequency', '0');

                // Setup real-time audio analysis
                this.startAudioAnalysis();
            }
        }

        setupAudioEventHandlers() {
            // Audio system keyboard shortcut
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                    e.preventDefault();
                    this.toggleAdvancedAudioSystem();
                }
            });

            // Audio system toggle button integration
            const originalAddFeatureButton = this.addFeatureButton;
            this.addFeatureButton = (featureName, description, callback) => {
                if (featureName === 'Advanced Audio System') {
                    return originalAddFeatureButton.call(this, 'Advanced Audio System', 'Enable spatial 3D audio and dynamic music', () => this.toggleAdvancedAudioSystem());
                }
                return originalAddFeatureButton.call(this, featureName, description, callback);
            };
        }

        startAudioAnalysis() {
            // Simulate real-time audio analysis
            setInterval(() => {
                if (!this.advancedAudio.enabled) return;

                // Generate realistic audio data
                this.advancedAudio.realTimeData.rmsLevel = (Math.random() * 30 - 20).toFixed(1); // -20 to +10 dB
                this.advancedAudio.realTimeData.peakLevel = (Math.random() * 15 - 10).toFixed(1); // -10 to +5 dB
                this.advancedAudio.realTimeData.clipRate = (Math.random() * 5).toFixed(2); // 0-5%

                // Update audio-reactive UI elements
                this.updateAudioReactiveElements();

            }, 100); // Update every 100ms
        }

        updateAudioReactiveElements() {
            // Update CSS variables for audio reactivity
            const amplitude = Math.random(); // Simulated amplitude 0-1
            const frequency = Math.random() * 1000 + 200; // Simulated frequency 200-1200 Hz

            if (this.advancedAudio.audioReactiveUI) {
                document.documentElement.style.setProperty('--audio-amplitude', amplitude.toString());
                document.documentElement.style.setProperty('--audio-frequency', frequency.toString());
            }
        }

        toggleAdvancedAudioSystem() {
            if (this.advancedAudio.enabled) {
                this.deactivateAdvancedAudioSystem();
            } else {
                this.activateAdvancedAudioSystem();
            }
        }

        activateAdvancedAudioSystem() {
            if (!this.advancedAudio.isInitialized) {
                this.setupAdvancedAudioSystem();
            }

            this.advancedAudio.enabled = true;

            // Initialize Web Audio API
            if (!this.advancedAudio.audioContext) {
                try {
                    this.advancedAudio.audioContext = new (window.AudioContext || window.webkitAudioContext)();

                    // Create master gain node
                    this.masterGainNode = this.advancedAudio.audioContext.createGain();
                    this.masterGainNode.gain.value = this.advancedAudio.masterVolume / 100;
                    this.masterGainNode.connect(this.advancedAudio.audioContext.destination);

                    // Initialize spatial audio setup
                    this.initializeSpatialAudio();

                } catch (error) {
                    console.error('Failed to initialize Web Audio API:', error);
                    this.addEventToLog('Audio initialization failed - Browser may not support Web Audio API');
                    return;
                }
            }

            // Update UI
            const audioContainer = document.getElementById('advancedAudioSystem');
            if (audioContainer) {
                audioContainer.classList.add('active');
            }

            this.addEventToLog('Advanced Audio System activated - Spatial audio and dynamic music enabled');
        }

        deactivateAdvancedAudioSystem() {
            this.advancedAudio.enabled = false;

            // Update UI
            const audioContainer = document.getElementById('advancedAudioSystem');
            if (audioContainer) {
                audioContainer.classList.remove('active');
            }

            this.addEventToLog('Advanced Audio System deactivated');
        }

        initializeSpatialAudio() {
            // Setup spatial audio panner nodes for each source
            this.advancedAudio.spatialSources.forEach((sourceData, sourceId) => {
                try {
                    const panner = this.advancedAudio.audioContext.createPanner();

                    // Configure spatial audio properties
                    panner.panningModel = 'HRTF';
                    panner.distanceModel = 'inverse';
                    panner.refDistance = 1;
                    panner.maxDistance = 50;
                    panner.rolloffFactor = 1;
                    panner.coneInnerAngle = 360;
                    panner.coneOuterAngle = 0;
                    panner.coneOuterGain = 0;

                    // Set initial position
                    panner.positionX.value = sourceData.position.x;
                    panner.positionY.value = sourceData.position.y;
                    panner.positionZ.value = sourceData.position.z;

                    // Connect to master
                    panner.connect(this.masterGainNode);

                    // Store panner reference
                    sourceData.panner = panner;

                } catch (error) {
                    console.error(`Failed to initialize spatial audio for ${sourceId}:`, error);
                }
            });
        }

        updateSpatialAudioSource(sourceId, position) {
            const sourceData = this.advancedAudio.spatialSources.get(sourceId);
            if (sourceData && sourceData.panner) {
                sourceData.panner.positionX.value = position.x;
                sourceData.panner.positionY.value = position.y;
                sourceData.panner.positionZ.value = position.z;
                sourceData.position = position;

                // Update visual position if UI is active
                this.updateSpatialAudioVisual(sourceId, position);
            }
        }

        updateSpatialAudioVisual(sourceId, position) {
            const sourceElement = document.querySelector(`[data-source="${sourceId}"]`);
            if (sourceElement) {
                // Convert 3D position to 2D visual position
                const visualX = (position.x / 20) * 50 + 50; // Scale and center
                const visualY = (position.z / 20) * 50 + 50; // Scale and center

                sourceElement.style.left = `${visualX}%`;
                sourceElement.style.top = `${visualY}%`;

                // Update distance display
                const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
                sourceElement.title = `${sourceId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - ${distance.toFixed(1)}m`;
            }
        }

        setMusicMode(mode) {
            this.advancedAudio.currentMusicMode = mode;

            // Update real-time data
            const moodMap = {
                'dynamic': 'Dynamic Adaptation',
                'exploration': 'Exploration',
                'combat': 'Combat',
                'stealth': 'Stealth'
            };

            this.advancedAudio.realTimeData.currentMood = moodMap[mode];

            // Update energy level based on mode
            const energyMap = {
                'dynamic': 'Adaptive',
                'exploration': 'Medium',
                'combat': 'High',
                'stealth': 'Low'
            };

            this.advancedAudio.realTimeData.energyLevel = energyMap[mode];

            this.addEventToLog(`Music mode switched to: ${moodMap[mode]}`);
        }

        integrateRealityHackingWithAudio(realityLevel) {
            if (!this.advancedAudio.realityIntegrationEnabled) return;

            // Apply reality parameters to audio processing
            const realityFactor = realityLevel / 100;

            // Adjust spatial audio distortion based on reality level
            this.advancedAudio.spatialSources.forEach((sourceData) => {
                if (sourceData.panner) {
                    // Add reality-based positional distortion
                    const distortionFactor = realityFactor * 0.5;
                    sourceData.panner.positionX.value += (Math.random() - 0.5) * distortionFactor;
                    sourceData.panner.positionY.value += (Math.random() - 0.5) * distortionFactor;
                    sourceData.panner.positionZ.value += (Math.random() - 0.5) * distortionFactor;
                }
            });

            // Apply visual reality effects
            const audioContainer = document.getElementById('advancedAudioSystem');
            if (audioContainer) {
                if (realityLevel > 30) {
                    audioContainer.classList.add('audio-reactive-glow');
                    audioContainer.classList.add('audio-reality-hack-active');
                } else {
                    audioContainer.classList.remove('audio-reactive-glow');
                    audioContainer.classList.remove('audio-reality-hack-active');
                }
            }
        }

        setup3DInputControls() {
            // Keyboard controls for 3D movement
            this.keys = {
                w: false,
                a: false,
                s: false,
                d: false,
                shift: false,
                space: false,
                mouse: { x: 0, y: 0 }
            };

            // Mobile touch controls state
            this.touchControls = {
                joystickActive: false,
                joystickPosition: { x: 0, y: 0 },
                lookActive: false,
                lookPosition: { x: 0, y: 0 }
            };
        }

        setup3DEventListeners() {
            // Keyboard events
            document.addEventListener('keydown', (e) => this.handle3DKeyDown(e));
            document.addEventListener('keyup', (e) => this.handle3DKeyUp(e));

            // Mouse events for camera control
            if (!this.isMobile()) {
                document.addEventListener('mousemove', (e) => this.handle3DMouseMove(e));
                document.addEventListener('click', (e) => this.handle3DClick(e));
            }

            // Touch events for mobile
            if (this.isMobile()) {
                this.setupMobileTouchControls();
            }

            // 3D UI element events
            this.setup3DUIEventListeners();

            // Settings panel toggle
            document.addEventListener('keydown', (e) => {
                if (e.key === 'F1') {
                    e.preventDefault();
                    this.toggleEnv3dSettings();
                }
            });
        }

        setup3DUIEventListeners() {
            // Camera mode selector
            document.querySelectorAll('.env3d-camera-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const cameraMode = e.target.dataset.camera;
                    this.switch3DCameraMode(cameraMode);
                });
            });

            // Minimap zoom controls
            const zoomInBtn = document.getElementById('env3dZoomIn');
            const zoomOutBtn = document.getElementById('env3dZoomOut');

            if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.zoomMinimap(1.2));
            if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.zoomMinimap(0.8));

            // Settings toggles
            document.querySelectorAll('.env3d-toggle').forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    const setting = e.target.dataset.setting;
                    this.toggle3DSetting(setting);
                });
            });
        }

        setupMobileTouchControls() {
            const mobileControls = document.getElementById('env3dMobileControls');
            const mobileJoystick = document.getElementById('env3dMobileJoystick');
            const mobileLookArea = document.getElementById('env3dMobileLookArea');
            const mobileInteractBtn = document.getElementById('env3dMobileInteract');

            if (mobileJoystick) {
                mobileJoystick.addEventListener('touchstart', (e) => this.handleJoystickStart(e));
                mobileJoystick.addEventListener('touchmove', (e) => this.handleJoystickMove(e));
                mobileJoystick.addEventListener('touchend', (e) => this.handleJoystickEnd(e));
            }

            if (mobileLookArea) {
                mobileLookArea.addEventListener('touchstart', (e) => this.handleLookStart(e));
                mobileLookArea.addEventListener('touchmove', (e) => this.handleLookMove(e));
                mobileLookArea.addEventListener('touchend', (e) => this.handleLookEnd(e));
            }

            if (mobileInteractBtn) {
                mobileInteractBtn.addEventListener('click', () => this.handle3DInteraction());
            }
        }

        // 3D Input Handlers
        handle3DKeyDown(e) {
            if (!this.environment3D.isActive) return;

            switch(e.key.toLowerCase()) {
                case 'w': this.keys.w = true; break;
                case 'a': this.keys.a = true; break;
                case 's': this.keys.s = true; break;
                case 'd': this.keys.d = true; break;
                case 'shift': this.keys.shift = true; break;
                case ' ': this.keys.space = true; break;
                case 'e': this.handle3DInteraction(); break;
            }
        }

        handle3DKeyUp(e) {
            if (!this.environment3D.isActive) return;

            switch(e.key.toLowerCase()) {
                case 'w': this.keys.w = false; break;
                case 'a': this.keys.a = false; break;
                case 's': this.keys.s = false; break;
                case 'd': this.keys.d = false; break;
                case 'shift': this.keys.shift = false; break;
                case ' ': this.keys.space = false; break;
            }
        }

        handle3DMouseMove(e) {
            if (!this.environment3D.isActive || this.environment3D.currentCameraMode !== 'first') return;

            const movementX = e.movementX || 0;
            const movementY = e.movementY || 0;

            if (this.environment3D.controls) {
                this.environment3D.controls.moveRight(movementX * 0.002);
                this.environment3D.controls.moveForward(-movementY * 0.002);
            }
        }

        handle3DClick(e) {
            if (!this.environment3D.isActive) return;

            // Raycast for object interaction
            const mouse = new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            );

            this.environment3D.raycaster.setFromCamera(mouse, this.environment3D.camera);

            const intersects = this.environment3D.raycaster.intersectObjects(this.environment3D.interactiveObjects3D);

            if (intersects.length > 0) {
                const object = intersects[0].object;
                this.interactWith3DObject(object);
            }
        }

        // Mobile touch handlers
        handleJoystickStart(e) {
            e.preventDefault();
            this.touchControls.joystickActive = true;
            this.updateJoystickPosition(e);
        }

        handleJoystickMove(e) {
            e.preventDefault();
            if (this.touchControls.joystickActive) {
                this.updateJoystickPosition(e);
            }
        }

        handleJoystickEnd(e) {
            e.preventDefault();
            this.touchControls.joystickActive = false;
            this.touchControls.joystickPosition = { x: 0, y: 0 };
            this.updateJoystickVisual();
        }

        updateJoystickPosition(e) {
            const touch = e.touches[0];
            const joystickRect = document.getElementById('env3dMobileJoystick').getBoundingClientRect();
            const centerX = joystickRect.left + joystickRect.width / 2;
            const centerY = joystickRect.top + joystickRect.height / 2;

            const deltaX = touch.clientX - centerX;
            const deltaY = touch.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 30;

            if (distance <= maxDistance) {
                this.touchControls.joystickPosition.x = deltaX / maxDistance;
                this.touchControls.joystickPosition.y = deltaY / maxDistance;
            } else {
                this.touchControls.joystickPosition.x = (deltaX / distance) * 0.8;
                this.touchControls.joystickPosition.y = (deltaY / distance) * 0.8;
            }

            this.updateJoystickVisual();
        }

        updateJoystickVisual() {
            const stick = document.querySelector('.env3d-mobile-joystick-stick');
            if (stick) {
                const x = this.touchControls.joystickPosition.x * 25;
                const y = this.touchControls.joystickPosition.y * 25;
                stick.style.transform = `translate(${x}px, ${y}px)`;
            }
        }

        handleLookStart(e) {
            e.preventDefault();
            this.touchControls.lookActive = true;
        }

        handleLookMove(e) {
            e.preventDefault();
            if (this.touchControls.lookActive && this.environment3D.camera) {
                const touch = e.touches[0];
                const deltaX = touch.movementX || 0;
                const deltaY = touch.movementY || 0;

                // Apply camera rotation based on touch movement
                if (this.environment3D.controls) {
                    this.environment3D.controls.rotateLeft(-deltaX * 0.002);
                    this.environment3D.controls.rotateUp(deltaY * 0.002);
                }
            }
        }

        handleLookEnd(e) {
            e.preventDefault();
            this.touchControls.lookActive = false;
        }

        // 3D Interaction System
        handle3DInteraction() {
            if (!this.environment3D.isActive) return;

            // Check for nearby interactive objects
            const interactables = this.getNearbyInteractables();

            if (interactables.length > 0) {
                this.interactWith3DObject(interactables[0]);
            } else {
                this.hideInteractionPrompt();
            }
        }

        getNearbyInteractables() {
            const nearby = [];
            const playerPos = this.environment3D.player?.position || new THREE.Vector3();

            this.environment3D.interactiveObjects3D.forEach(object => {
                const distance = playerPos.distanceTo(object.position);
                if (distance <= 3.0) { // 3 meter interaction range
                    nearby.push(object);
                }
            });

            return nearby;
        }

        interactWith3DObject(object) {
            const objectType = object.userData.type || 'unknown';

            switch(objectType) {
                case 'anomaly':
                    this.collect3DAnomaly(object);
                    break;
                case 'quest_item':
                    this.collect3DQuestItem(object);
                    break;
                case 'reality_node':
                    this.interactWith3DRealityNode(object);
                    break;
                case 'dimensional_portal':
                    this.enter3DDimensionalPortal(object);
                    break;
                default:
                    this.addEventToLog(`Interacted with ${objectType} - no action defined`);
            }

            this.hideInteractionPrompt();
        }

        collect3DAnomaly(object) {
            this.addAnomaly('3d_environment', 'chromatic');
            this.playerData.anomaliesFound++;
            this.updateUI();

            // Animate object removal
            this.animate3DObjectRemoval(object);

            this.addEventToLog('🌀 Chromatic anomaly collected in 3D space!');
        }

        collect3DQuestItem(object) {
            const questItem = object.userData.questItem;
            if (questItem && this.questSystem) {
                this.completeQuestObjective(questItem.questId, questItem.objectiveId);
            }

            this.animate3DObjectRemoval(object);
            this.addEventToLog('📋 Quest item collected from 3D environment');
        }

        interactWith3DRealityNode(object) {
            if (this.realityHacking) {
                // Open reality hacking panel with this node's parameters
                this.openRealityHackingPanel('matrix');
                this.addEventToLog('🔧 Reality node parameters loaded');
            }
        }

        enter3DDimensionalPortal(object) {
            const portalData = object.userData.portalData;
            if (portalData) {
                // Switch to new environment
                this.switch3DEnvironment(portalData.environmentId);
                this.addEventToLog(`🌌 Entered dimensional portal to ${portalData.name}`);
            }
        }

        animate3DObjectRemoval(object) {
            const startScale = object.scale.clone();
            const endScale = startScale.clone().multiplyScalar(0);

            // Simple scale animation
            let progress = 0;
            const animate = () => {
                progress += 0.05;
                const scale = 1 - progress;

                if (scale > 0) {
                    object.scale.copy(startScale.multiplyScalar(scale));
                    requestAnimationFrame(animate);
                } else {
                    // Remove from scene
                    this.environment3D.scene.remove(object);
                    const index = this.environment3D.interactiveObjects3D.indexOf(object);
                    if (index > -1) {
                        this.environment3D.interactiveObjects3D.splice(index, 1);
                    }
                }
            };

            animate();
        }

        showInteractionPrompt(objectName, action = 'Interact') {
            const prompt = document.getElementById('env3dInteractionPrompt');
            const text = document.getElementById('env3dPromptText');

            if (prompt && text) {
                text.textContent = objectName;
                prompt.querySelector('.env3d-prompt-action').textContent = `[E] ${action}`;
                prompt.style.display = 'block';
            }
        }

        hideInteractionPrompt() {
            const prompt = document.getElementById('env3dInteractionPrompt');
            if (prompt) {
                prompt.classList.add('prompt-hidden');
                setTimeout(() => {
                    prompt.style.display = 'none';
                    prompt.classList.remove('prompt-hidden');
                }, 200);
            }
        }

        // 3D Scene Management
        initialize3DScene() {
            if (this.environment3D.isInitialized) return;

            try {
                // Scene setup
                this.environment3D.scene = new THREE.Scene();
                this.environment3D.scene.background = new THREE.Color(0x000000);

                // Camera setup
                this.environment3D.camera = new THREE.PerspectiveCamera(
                    75,
                    window.innerWidth / window.innerHeight,
                    0.1,
                    1000
                );

                // Renderer setup
                this.environment3D.renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    alpha: true
                });
                this.environment3D.renderer.setSize(window.innerWidth, window.innerHeight);
                this.environment3D.renderer.shadowMap.enabled = true;
                this.environment3D.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                this.environment3D.renderer.outputEncoding = THREE.sRGBEncoding;
                this.environment3D.renderer.toneMapping = THREE.ACESFilmicToneMapping;
                this.environment3D.renderer.toneMappingExposure = 1.2;

                // Add renderer to DOM
                const sceneContainer = document.getElementById('env3dScene');
                if (sceneContainer) {
                    sceneContainer.appendChild(this.environment3D.renderer.domElement);
                }

                // Lighting setup
                this.setup3DLighting();

                // Environment generation
                this.generate3DEnvironment();

                // Player setup
                this.setup3DPlayer();

                // Camera controls
                this.setup3DCameraControls();

                // Window resize handler
                window.addEventListener('resize', () => this.handle3DResize());

                this.environment3D.isInitialized = true;
                this.addEventToLog('3D Scene initialized successfully');

            } catch (error) {
                this.addEventToLog(`3D Scene initialization failed: ${error.message}`);
            }
        }

        setup3DLighting() {
            // Ambient lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
            this.environment3D.scene.add(ambientLight);

            // Directional light (main light)
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(50, 50, 50);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            directionalLight.shadow.camera.near = 0.5;
            directionalLight.shadow.camera.far = 500;
            directionalLight.shadow.camera.left = -100;
            directionalLight.shadow.camera.right = 100;
            directionalLight.shadow.camera.top = 100;
            directionalLight.shadow.camera.bottom = -100;
            this.environment3D.scene.add(directionalLight);

            // Point lights for atmosphere
            const pointLight1 = new THREE.PointLight(0x00ffff, 0.5, 30);
            pointLight1.position.set(10, 5, 10);
            this.environment3D.scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0xff00ff, 0.3, 25);
            pointLight2.position.set(-15, 8, -5);
            this.environment3D.scene.add(pointLight2);

            // Dynamic lighting based on reality parameters
            this.update3DLightingFromReality();
        }

        generate3DEnvironment() {
            // Ground plane
            const groundGeometry = new THREE.PlaneGeometry(200, 200);
            const groundMaterial = new THREE.MeshLambertMaterial({
                color: 0x1a1a2e,
                transparent: true,
                opacity: 0.8
            });
            const ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = -Math.PI / 2;
            ground.receiveShadow = true;
            this.environment3D.scene.add(ground);

            // Generate procedural structures
            this.generate3DStructures();

            // Add interactive objects
            this.spawn3DInteractiveObjects();

            // Add atmospheric particles
            this.create3DAtmosphericEffects();
        }

        generate3DStructures() {
            // Generate floating geometric structures
            for (let i = 0; i < 20; i++) {
                const geometry = this.getRandomGeometry();
                const material = new THREE.MeshPhongMaterial({
                    color: this.getRandomEnvironmentColor(),
                    transparent: true,
                    opacity: 0.6 + Math.random() * 0.4
                });

                const structure = new THREE.Mesh(geometry, material);
                structure.position.set(
                    (Math.random() - 0.5) * 150,
                    2 + Math.random() * 20,
                    (Math.random() - 0.5) * 150
                );
                structure.castShadow = true;
                structure.receiveShadow = true;

                this.environment3D.scene.add(structure);
                this.environment3D.environmentObjects.push(structure);

                // Add floating animation
                this.animate3DFloatingStructure(structure);
            }
        }

        getRandomGeometry() {
            const geometries = [
                new THREE.BoxGeometry(2 + Math.random() * 4, 2 + Math.random() * 4, 2 + Math.random() * 4),
                new THREE.SphereGeometry(1 + Math.random() * 2, 8, 6),
                new THREE.ConeGeometry(1 + Math.random() * 2, 3 + Math.random() * 4, 6),
                new THREE.CylinderGeometry(0.5 + Math.random() * 1, 1 + Math.random() * 2, 3 + Math.random() * 3, 6),
                new THREE.TetrahedronGeometry(1 + Math.random() * 2)
            ];

            return geometries[Math.floor(Math.random() * geometries.length)];
        }

        getRandomEnvironmentColor() {
            const colors = [0x00ffff, 0xff00ff, 0x00ff00, 0xff6600, 0x6600ff, 0xffff00];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        animate3DFloatingStructure(structure) {
            const originalY = structure.position.y;
            const floatSpeed = 0.5 + Math.random() * 1.0;
            const floatHeight = 1 + Math.random() * 3;

            const animate = () => {
                if (!this.environment3D.isActive) return;

                structure.position.y = originalY + Math.sin(Date.now() * 0.001 * floatSpeed) * floatHeight;
                structure.rotation.y += 0.005;

                requestAnimationFrame(animate);
            };

            animate();
        }

        spawn3DInteractiveObjects() {
            // Spawn anomalies
            for (let i = 0; i < 8; i++) {
                this.create3DAnomaly(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * 100,
                        1 + Math.random() * 10,
                        (Math.random() - 0.5) * 100
                    )
                );
            }

            // Spawn quest items
            for (let i = 0; i < 5; i++) {
                this.create3DQuestItem(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * 80,
                        0.5 + Math.random() * 5,
                        (Math.random() - 0.5) * 80
                    )
                );
            }

            // Spawn reality nodes
            for (let i = 0; i < 3; i++) {
                this.create3DRealityNode(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * 60,
                        2 + Math.random() * 8,
                        (Math.random() - 0.5) * 60
                    )
                );
            }

            // Spawn dimensional portals
            for (let i = 0; i < 2; i++) {
                this.create3DDimensionalPortal(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * 120,
                        3,
                        (Math.random() - 0.5) * 120
                    )
                );
            }
        }

        create3DAnomaly(position) {
            const geometry = new THREE.SphereGeometry(0.8, 16, 12);
            const material = new THREE.MeshPhongMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.8,
                emissive: 0x004444,
                emissiveIntensity: 0.3
            });

            const anomaly = new THREE.Mesh(geometry, material);
            anomaly.position.copy(position);
            anomaly.userData.type = 'anomaly';
            anomaly.castShadow = true;

            this.environment3D.scene.add(anomaly);
            this.environment3D.interactiveObjects3D.push(anomaly);

            // Add pulsing animation
            this.animate3DPulse(anomaly, 0.6, 1.2, 2000);
        }

        create3DQuestItem(position) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({
                color: 0xffd700,
                transparent: true,
                opacity: 0.9,
                emissive: 0x332200,
                emissiveIntensity: 0.2
            });

            const item = new THREE.Mesh(geometry, material);
            item.position.copy(position);
            item.userData.type = 'quest_item';
            item.userData.questItem = {
                questId: 'dreamers_awakening',
                objectiveId: 'find_3_anomalies'
            };
            item.castShadow = true;

            this.environment3D.scene.add(item);
            this.environment3D.interactiveObjects3D.push(item);

            // Add spinning animation
            this.animate3DRotation(item, 0.02, 0.01, 0.02);
        }

        create3DRealityNode(position) {
            const geometry = new THREE.OctahedronGeometry(1.2);
            const material = new THREE.MeshPhongMaterial({
                color: 0xff00ff,
                transparent: true,
                opacity: 0.7,
                emissive: 0x220022,
                emissiveIntensity: 0.4
            });

            const node = new THREE.Mesh(geometry, material);
            node.position.copy(position);
            node.userData.type = 'reality_node';
            node.castShadow = true;

            this.environment3D.scene.add(node);
            this.environment3D.interactiveObjects3D.push(node);

            // Add complex rotation animation
            this.animate3DRotation(node, 0.01, 0.015, 0.008);
        }

        create3DDimensionalPortal(position) {
            const geometry = new THREE.RingGeometry(1.5, 2.5, 32);
            const material = new THREE.MeshBasicMaterial({
                color: 0x6600ff,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide
            });

            const portal = new THREE.Mesh(geometry, material);
            portal.position.copy(position);
            portal.rotation.x = Math.PI / 2;
            portal.userData.type = 'dimensional_portal';
            portal.userData.portalData = {
                name: 'Alternative Reality',
                environmentId: 'alternate_dimension_' + Math.floor(Math.random() * 3)
            };

            this.environment3D.scene.add(portal);
            this.environment3D.interactiveObjects3D.push(portal);

            // Add swirling animation
            this.animate3DPortal(portal);
        }

        animate3DPulse(object, minScale, maxScale, duration) {
            const animate = () => {
                if (!this.environment3D.isActive) return;

                const time = Date.now() * 0.002;
                const scale = minScale + (maxScale - minScale) * (0.5 + 0.5 * Math.sin(time * Math.PI * 2 / duration * 1000));
                object.scale.setScalar(scale);

                requestAnimationFrame(animate);
            };
            animate();
        }

        animate3DRotation(object, speedX, speedY, speedZ) {
            const animate = () => {
                if (!this.environment3D.isActive) return;

                object.rotation.x += speedX;
                object.rotation.y += speedY;
                object.rotation.z += speedZ;

                requestAnimationFrame(animate);
            };
            animate();
        }

        animate3DPortal(portal) {
            const animate = () => {
                if (!this.environment3D.isActive) return;

                portal.rotation.z += 0.01;

                // Pulsing opacity
                const opacity = 0.3 + 0.3 * Math.sin(Date.now() * 0.003);
                portal.material.opacity = opacity;

                requestAnimationFrame(animate);
            };
            animate();
        }

        create3DAtmosphericEffects() {
            // Floating particles
            for (let i = 0; i < 100; i++) {
                const particle = new THREE.Sprite(
                    new THREE.SpriteMaterial({
                        color: this.getRandomEnvironmentColor(),
                        transparent: true,
                        opacity: 0.3
                    })
                );

                particle.position.set(
                    (Math.random() - 0.5) * 200,
                    Math.random() * 50,
                    (Math.random() - 0.5) * 200
                );

                particle.scale.setScalar(0.1 + Math.random() * 0.3);

                this.environment3D.scene.add(particle);

                // Animate floating
                this.animate3DParticle(particle);
            }
        }

        animate3DParticle(particle) {
            const originalPos = particle.position.clone();
            const floatSpeed = 0.5 + Math.random() * 1.0;
            const floatDistance = 2 + Math.random() * 5;

            const animate = () => {
                if (!this.environment3D.isActive) return;

                const time = Date.now() * 0.001 * floatSpeed;
                particle.position.y = originalPos.y + Math.sin(time) * floatDistance;
                particle.position.x = originalPos.x + Math.cos(time * 0.7) * 0.5;
                particle.position.z = originalPos.z + Math.sin(time * 0.5) * 0.3;

                // Gentle fade in/out
                particle.material.opacity = 0.1 + 0.2 * (0.5 + 0.5 * Math.sin(time * 2));

                requestAnimationFrame(animate);
            };

            animate();
        }

        setup3DPlayer() {
            // Create player object
            this.environment3D.player = new THREE.Group();
            this.environment3D.player.position.set(0, 2, 0);

            // Player visual representation (invisible in first person)
            const playerGeometry = new THREE.SphereGeometry(0.5, 8, 6);
            const playerMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.0 // Invisible in first person
            });

            const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
            this.environment3D.player.add(playerMesh);

            this.environment3D.scene.add(this.environment3D.player);
        }

        setup3DCameraControls() {
            // Simple custom camera controls for first person
            this.environment3D.camera.position.set(0, 2, 5);

            // Mouse look variables
            this.mouseLook = {
                isPointerLocked: false,
                eulerX: 0,
                eulerY: 0
            };

            // Pointer lock for mouse look
            if (!this.isMobile()) {
                this.environment3D.renderer.domElement.addEventListener('click', () => {
                    if (this.environment3D.currentCameraMode === 'first') {
                        this.environment3D.renderer.domElement.requestPointerLock();
                    }
                });

                document.addEventListener('pointerlockchange', () => {
                    this.mouseLook.isPointerLocked = document.pointerLockElement === this.environment3D.renderer.domElement;
                });

                document.addEventListener('mousemove', (e) => {
                    if (this.mouseLook.isPointerLocked && this.environment3D.currentCameraMode === 'first') {
                        this.mouseLook.eulerX -= e.movementY * 0.002;
                        this.mouseLook.eulerY -= e.movementX * 0.002;
                        this.mouseLook.eulerX = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.mouseLook.eulerX));

                        this.environment3D.camera.rotation.set(this.mouseLook.eulerX, this.mouseLook.eulerY, 0);
                    }
                });
            }
        }

        // 3D Camera Management
        switch3DCameraMode(mode) {
            this.environment3D.currentCameraMode = mode;

            // Update UI
            document.querySelectorAll('.env3d-camera-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-camera="${mode}"]`).classList.add('active');

            // Apply camera mode
            switch(mode) {
                case 'first':
                    this.setFirstPersonCamera();
                    break;
                case 'third':
                    this.setThirdPersonCamera();
                    break;
                case 'free':
                    this.setFreeCamera();
                    break;
                case 'cinematic':
                    this.setCinematicCamera();
                    break;
            }

            this.addEventToLog(`Camera mode switched to ${mode}`);
        }

        setFirstPersonCamera() {
            if (!this.environment3D.camera || !this.environment3D.player) return;

            this.environment3D.camera.position.copy(this.environment3D.player.position);
            this.environment3D.camera.position.y += 1.6; // Eye height
            this.environment3D.camera.lookAt(0, 1.6, -1);

            // Hide player model
            this.environment3D.player.children[0].material.opacity = 0.0;
        }

        setThirdPersonCamera() {
            if (!this.environment3D.camera || !this.environment3D.player) return;

            this.environment3D.camera.position.set(0, 3, 8);
            this.environment3D.camera.lookAt(this.environment3D.player.position);

            // Show player model
            this.environment3D.player.children[0].material.opacity = 0.8;
        }

        setFreeCamera() {
            // Position camera for overview
            this.environment3D.camera.position.set(50, 50, 50);
            this.environment3D.camera.lookAt(0, 0, 0);

            // Disable pointer lock
            if (document.pointerLockElement) {
                document.exitPointerLock();
            }
        }

        setCinematicCamera() {
            // Dramatic camera position
            this.environment3D.camera.position.set(20, 15, 20);
            this.environment3D.camera.lookAt(0, 5, 0);

            // Disable pointer lock
            if (document.pointerLockElement) {
                document.exitPointerLock();
            }
        }

        // 3D Environment Updates
        update3DEnvironment() {
            if (!this.environment3D.isActive || !this.environment3D.isInitialized) return;

            // Update player movement
            this.update3DPlayerMovement();

            // Update minimap
            this.update3DMinimap();

            // Update environment stats
            this.update3DEnvironmentStats();

            // Reality parameter integration
            this.integrateRealityParameters();
        }

        update3DPlayerMovement() {
            if (!this.environment3D.player || !this.environment3D.camera) return;

            const speed = this.keys.shift ? 10 : 5;
            const moveVector = new THREE.Vector3();

            if (this.keys.w) moveVector.z -= 1;
            if (this.keys.s) moveVector.z += 1;
            if (this.keys.a) moveVector.x -= 1;
            if (this.keys.d) moveVector.x += 1;

            // Mobile joystick support
            if (this.isMobile()) {
                moveVector.x += this.touchControls.joystickPosition.x;
                moveVector.z -= this.touchControls.joystickPosition.y;
            }

            moveVector.normalize().multiplyScalar(speed * this.getDeltaTime());

            // Transform movement by camera direction
            const cameraDirection = new THREE.Vector3();
            this.environment3D.camera.getWorldDirection(cameraDirection);

            const right = new THREE.Vector3();
            right.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

            this.environment3D.player.position.add(
                right.multiplyScalar(moveVector.x)
            );
            this.environment3D.player.position.add(
                cameraDirection.multiplyScalar(-moveVector.z)
            );

            // Keep player above ground
            this.environment3D.player.position.y = Math.max(2, this.environment3D.player.position.y);

            // Update camera position
            if (this.environment3D.currentCameraMode === 'first') {
                this.environment3D.camera.position.copy(this.environment3D.player.position);
                this.environment3D.camera.position.y += 1.6;
            }

            // Jump functionality
            if (this.keys.space && this.environment3D.player.position.y <= 2.1) {
                this.environment3D.player.position.y += 8 * this.getDeltaTime();
            }

            // Gravity
            if (this.environment3D.player.position.y > 2) {
                this.environment3D.player.position.y -= 15 * this.getDeltaTime();
            }
        }

        update3DMinimap() {
            const playerMarker = document.getElementById('env3dMinimapPlayer');
            if (playerMarker && this.environment3D.player) {
                const x = this.environment3D.player.position.x;
                const z = this.environment3D.player.position.z;

                // Update minimap position (simplified)
                playerMarker.style.transform = `translate(${(x / 100) * 60}px, ${(z / 100) * 60}px)`;
            }
        }

        update3DEnvironmentStats() {
            // Update stats display
            const stats = {
                timeFlow: this.realityHacking?.matrix?.timeFlow || 1.0,
                gravity: this.realityHacking?.matrix?.gravity || 1.0,
                lightLevel: this.realityHacking?.matrix?.lightIntensity || 1.0,
                objectsFound: this.environment3D.interactiveObjects3D.length
            };

            const statsContainer = document.getElementById('env3dStats');
            if (statsContainer) {
                statsContainer.innerHTML = `
                    <div class="env3d-stat-row">
                        <span class="env3d-stat-label">Time Flow:</span>
                        <span class="env3d-stat-value">${stats.timeFlow.toFixed(2)}x</span>
                    </div>
                    <div class="env3d-stat-row">
                        <span class="env3d-stat-label">Gravity:</span>
                        <span class="env3d-stat-value">${stats.gravity.toFixed(1)}</span>
                    </div>
                    <div class="env3d-stat-row">
                        <span class="env3d-stat-label">Light Level:</span>
                        <span class="env3d-stat-value">${Math.round(stats.lightLevel * 100)}%</span>
                    </div>
                    <div class="env3d-stat-row">
                        <span class="env3d-stat-label">Objects Found:</span>
                        <span class="env3d-stat-value">${stats.objectsFound}</span>
                    </div>
                `;
            }
        }

        integrateRealityParameters() {
            if (!this.realityHacking || !this.environment3D.scene) return;

            const matrix = this.realityHacking.matrix;

            // Update lighting based on reality parameters
            this.update3DLightingFromReality();

            // Update player physics
            if (this.environment3D.player) {
                // Apply gravity modifications
                this.gravityMultiplier = matrix.gravity;

                // Apply time flow effects
                this.timeFlowMultiplier = matrix.timeFlow;
            }
        }

        update3DLightingFromReality() {
            if (!this.realityHacking || !this.environment3D.scene) return;

            const matrix = this.realityHacking.matrix;
            const ambientLight = this.environment3D.scene.children.find(child => child instanceof THREE.AmbientLight);
            const directionalLight = this.environment3D.scene.children.find(child => child instanceof THREE.DirectionalLight);

            if (ambientLight) {
                ambientLight.intensity = 0.1 + (matrix.lightIntensity * 0.4);
            }

            if (directionalLight) {
                directionalLight.intensity = 0.3 + (matrix.lightIntensity * 0.7);
            }
        }

        // Utility Methods
        getDeltaTime() {
            return this.environment3D.clock ? this.environment3D.clock.getDelta() : 0.016;
        }

        isMobile() {
            return window.innerWidth <= 1024 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        zoomMinimap(factor) {
            this.environment3D.minimapZoom = Math.max(0.5, Math.min(3.0, this.environment3D.minimapZoom * factor));

            const display = document.getElementById('env3dMinimapDisplay');
            if (display) {
                display.style.transform = `scale(${this.environment3D.minimapZoom})`;
            }
        }

        toggle3DSetting(setting) {
            this.environment3D.settings[setting] = !this.environment3D.settings[setting];

            // Update toggle visual
            const toggle = document.querySelector(`[data-setting="${setting}"]`);
            if (toggle) {
                toggle.classList.toggle('active', this.environment3D.settings[setting]);
            }

            // Apply setting
            this.apply3DSetting(setting);
        }

        apply3DSetting(setting) {
            switch(setting) {
                case 'shadows':
                    if (this.environment3D.renderer) {
                        this.environment3D.renderer.shadowMap.enabled = this.environment3D.settings[setting];
                    }
                    break;
                case 'quality':
                    // Adjust rendering quality
                    if (this.environment3D.renderer) {
                        const pixelRatio = this.environment3D.settings[setting] ? window.devicePixelRatio : 1;
                        this.environment3D.renderer.setPixelRatio(pixelRatio);
                    }
                    break;
            }
        }

        toggleEnv3dSettings() {
            const panel = document.getElementById('env3dSettingsPanel');
            if (panel) {
                panel.style.display = panel.style.display === 'none' || !panel.style.display ? 'block' : 'none';
            }
        }

        handle3DResize() {
            if (this.environment3D.camera && this.environment3D.renderer) {
                this.environment3D.camera.aspect = window.innerWidth / window.innerHeight;
                this.environment3D.camera.updateProjectionMatrix();
                this.environment3D.renderer.setSize(window.innerWidth, window.innerHeight);
            }
        }

        switch3DEnvironment(environmentId) {
            // Clear current environment
            this.environment3D.environmentObjects.forEach(obj => {
                this.environment3D.scene.remove(obj);
            });
            this.environment3D.environmentObjects = [];

            this.environment3D.interactiveObjects3D.forEach(obj => {
                this.environment3D.scene.remove(obj);
            });
            this.environment3D.interactiveObjects3D = [];

            // Generate new environment based on ID
            this.generateEnvironmentById(environmentId);
        }

        generateEnvironmentById(environmentId) {
            switch(environmentId) {
                case 'alternate_dimension_0':
                    this.generateAlternateDimension1();
                    break;
                case 'alternate_dimension_1':
                    this.generateAlternateDimension2();
                    break;
                case 'alternate_dimension_2':
                    this.generateAlternateDimension3();
                    break;
                default:
                    this.generate3DEnvironment(); // Default environment
            }
        }

        generateAlternateDimension1() {
            // Purple/blue theme
            const purpleGround = new THREE.Mesh(
                new THREE.PlaneGeometry(200, 200),
                new THREE.MeshLambertMaterial({ color: 0x2a1a4a, transparent: true, opacity: 0.9 })
            );
            purpleGround.rotation.x = -Math.PI / 2;
            this.environment3D.scene.add(purpleGround);

            // Floating crystals
            for (let i = 0; i < 15; i++) {
                const crystal = new THREE.Mesh(
                    new THREE.ConeGeometry(1, 4, 6),
                    new THREE.MeshPhongMaterial({
                        color: 0x9966ff,
                        transparent: true,
                        opacity: 0.8,
                        emissive: 0x331144
                    })
                );
                crystal.position.set(
                    (Math.random() - 0.5) * 100,
                    3 + Math.random() * 15,
                    (Math.random() - 0.5) * 100
                );
                this.environment3D.scene.add(crystal);
                this.animate3DFloatingStructure(crystal);
            }
        }

        generateAlternateDimension2() {
            // Orange/red theme
            const redGround = new THREE.Mesh(
                new THREE.PlaneGeometry(200, 200),
                new THREE.MeshLambertMaterial({ color: 0x4a1a1a, transparent: true, opacity: 0.9 })
            );
            redGround.rotation.x = -Math.PI / 2;
            this.environment3D.scene.add(redGround);

            // Floating geometric shapes
            for (let i = 0; i < 20; i++) {
                const shape = new THREE.Mesh(
                    this.getRandomGeometry(),
                    new THREE.MeshPhongMaterial({
                        color: 0xff6633,
                        transparent: true,
                        opacity: 0.7,
                        emissive: 0x331100
                    })
                );
                shape.position.set(
                    (Math.random() - 0.5) * 120,
                    2 + Math.random() * 20,
                    (Math.random() - 0.5) * 120
                );
                this.environment3D.scene.add(shape);
                this.animate3DRotation(shape, 0.02, 0.01, 0.015);
            }
        }

        generateAlternateDimension3() {
            // Green/cyan theme
            const greenGround = new THREE.Mesh(
                new THREE.PlaneGeometry(200, 200),
                new THREE.MeshLambertMaterial({ color: 0x1a4a2a, transparent: true, opacity: 0.9 })
            );
            greenGround.rotation.x = -Math.PI / 2;
            this.environment3D.scene.add(greenGround);

            // Organic shapes
            for (let i = 0; i < 18; i++) {
                const organic = new THREE.Mesh(
                    new THREE.SphereGeometry(2 + Math.random() * 3, 16, 12),
                    new THREE.MeshPhongMaterial({
                        color: 0x33ff66,
                        transparent: true,
                        opacity: 0.6,
                        emissive: 0x113311
                    })
                );
                organic.position.set(
                    (Math.random() - 0.5) * 100,
                    1 + Math.random() * 12,
                    (Math.random() - 0.5) * 100
                );
                this.environment3D.scene.add(organic);
                this.animate3DPulse(organic, 0.8, 1.4, 3000);
            }
        }

        // 3D System Control Methods
        activate3DEnvironment() {
            if (this.environment3D.isActive) return;

            this.initialize3DScene();
            this.environment3D.isActive = true;

            // Start 3D render loop
            this.start3DRenderLoop();

            // Hide 2D interface elements
            this.hideGameInterfaceFor3D();

            this.addEventToLog('3D Environment activated - Entering immersive exploration mode');
        }

        deactivate3DEnvironment() {
            if (!this.environment3D.isActive) return;

            this.environment3D.isActive = false;

            // Show 2D interface elements
            this.showGameInterfaceAfter3D();

            // Clean up
            if (this.environment3D.renderer) {
                this.environment3D.renderer.domElement.remove();
            }

            this.addEventToLog('3D Environment deactivated - Returned to 2D interface');
        }

        hideGameInterfaceFor3D() {
            const gameContainer = document.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.style.display = 'none';
            }
        }

        showGameInterfaceAfter3D() {
            const gameContainer = document.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.style.display = 'block';
            }
        }

        start3DRenderLoop() {
            const animate = () => {
                if (!this.environment3D.isActive) return;

                this.update3DEnvironment();

                if (this.environment3D.renderer && this.environment3D.scene && this.environment3D.camera) {
                    this.environment3D.renderer.render(this.environment3D.scene, this.environment3D.camera);
                }

                requestAnimationFrame(animate);
            };

            animate();
        }

        // Global 3D Environment Functions
        globalToggle3DEnvironment() {
            if (this.environment3D.isActive) {
                this.deactivate3DEnvironment();
            } else {
                this.activate3DEnvironment();
            }
        }

        // ===== MULTIPLAYER UTILITY FUNCTIONS =====

        function copySessionId() {
            const sessionId = document.getElementById('sessionId').textContent;
            navigator.clipboard.writeText(sessionId).then(() => {
                // Visual feedback for successful copy
                const button = event.target;
                const originalText = button.textContent;
                button.textContent = 'COPIED!';
                button.style.background = 'var(--multiplayer-success)';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'var(--multiplayer-accent-500)';
                }, 1500);
            });
        }

        function openMultiplayerLobby() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.openMultiplayerLobby();
            }
        }

        function launchSession() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.launchSession();
            }
        }

        function toggleAchievements() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.toggleAchievements();
            }
        }

        function openModerationSettings() {
            // Create moderation settings modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 400px;
                background: var(--multiplayer-bg-surface);
                backdrop-filter: blur(24px);
                border: 1px solid var(--multiplayer-border-subtle);
                border-radius: 16px;
                padding: 32px;
                z-index: 10001;
                color: var(--multiplayer-text-primary);
            `;

            modal.innerHTML = `
                <h2 style="margin-bottom: 20px; color: var(--multiplayer-text-primary);">Moderation Settings</h2>
                <div style="margin-bottom: 20px;">
                    <label style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <input type="checkbox" id="requireApproval" style="width: 18px; height: 18px;">
                        Require approval for new players
                    </label>
                    <label style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <input type="checkbox" id="publicSession" style="width: 18px; height: 18px;">
                        Public session (show in browser)
                    </label>
                    <label style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <input type="checkbox" id="autoSave" style="width: 18px; height: 18px;">
                        Auto-save session progress
                    </label>
                </div>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button onclick="this.closest('[style*=position: fixed]').remove()"
                            style="padding: 8px 16px; background: transparent; border: 1px solid var(--multiplayer-border-subtle); color: var(--multiplayer-text-primary); border-radius: 6px; cursor: pointer;">
                        Cancel
                    </button>
                    <button onclick="saveModerationSettings(); this.closest('[style*=position: fixed]').remove()"
                            style="padding: 8px 16px; background: var(--multiplayer-accent-500); border: none; color: #000; border-radius: 6px; cursor: pointer; font-weight: 600;">
                        Save
                    </button>
                </div>
            `;

            document.body.appendChild(modal);
        }

        function saveModerationSettings() {
            const requireApproval = document.getElementById('requireApproval').checked;
            const publicSession = document.getElementById('publicSession').checked;
            const autoSave = document.getElementById('autoSave').checked;

            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.multiplayerSystem.sessionSettings.requireApproval = requireApproval;
                window.chromaShiftComplete.multiplayerSystem.sessionSettings.public = publicSession;
                window.chromaShiftComplete.multiplayerSystem.sessionSettings.autoSave = autoSave;

                window.chromaShiftComplete.addEventToLog('Moderation settings updated');
            }
        }

        function saveSession() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.saveSession();
            }
        }

        function loadSession() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.loadSession();
            }
        }

        function switchAchievementTab(tab) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.switchAchievementTab(tab);
            }
        }

        // ===== REALITY HACKING UTILITY FUNCTIONS =====

        function openRealityHackingPanel(tool = 'matrix') {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.openRealityHackingPanel(tool);
            }
        }

        function openRealityMatrixEditor() {
            openRealityHackingPanel('matrix');
        }

        function openQuantumCodeInterpreter() {
            openRealityHackingPanel('quantum');
        }

        function openNeuralLinkInterface() {
            openRealityHackingPanel('neural');
        }

        function openTemporalHackEngine() {
            openRealityHackingPanel('temporal');
        }

        function openDimensionalBridgeCreator() {
            openRealityHackingPanel('bridge');
        }

        function openRealityDebugConsole() {
            openRealityHackingPanel('debug');
        }

        function openCollaborativeWeaving() {
            openRealityHackingPanel('weaving');
        }

        function closeRealityHackingPanel() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.closeRealityHackingPanel();
            }
        }

        function toggleRealityToolsMenu() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.toggleRealityToolsMenu();
            }
        }

        // Reality Matrix Editor Functions
        function updateMatrixValue(property, value) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.updateMatrixValue(property, value);
            }
        }

        function applyMatrixChanges() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.applyMatrixChanges();
            }
        }

        function createNewAnchor() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.createNewAnchor();
            }
        }

        function resetToDefaults() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.resetToDefaults();
            }
        }

        function randomizeReality() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.randomizeReality();
            }
        }

        function stabilizeReality() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.stabilizeReality();
            }
        }

        // Quantum Code Interpreter Functions
        function loadScript(scriptId) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.loadScript(scriptId);
            }
        }

        function executeCode() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.executeCode();
            }
        }

        function createCustomScript() {
            const scriptName = prompt('Enter script name:');
            if (scriptName && window.chromaShiftComplete) {
                const newScript = {
                    id: Date.now(),
                    name: scriptName,
                    code: '// New reality hacking script\nfunction main() {\n    // Your code here\n    return "Script executed";\n}',
                    category: 'custom'
                };

                window.chromaShiftComplete.realityHacking.codeScripts.push(newScript);
                window.chromaShiftComplete.addToDebugConsole('SUCCESS', `Custom script "${scriptName}" created`, 'success');
            }
        }

        function filterScripts(category) {
            // Update pill states
            document.querySelectorAll('.neural-link-pill').forEach(pill => {
                pill.classList.remove('active');
            });
            event.target.classList.add('active');

            // Filter and display scripts
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.addToDebugConsole('INFO', `Filtering scripts by category: ${category}`, 'info');
            }
        }

        function validateCode() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'Code validation passed - syntax correct', 'success');
            }
        }

        function formatCode() {
            const editor = document.getElementById('codeEditor');
            if (editor) {
                // Simple code formatting simulation
                const code = editor.value;
                const formatted = code.replace(/\n\s+/g, '\n').trim();
                editor.value = formatted;

                if (window.chromaShiftComplete) {
                    window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'Code formatted successfully', 'success');
                }
            }
        }

        // Neural Link Interface Functions
        function setConsciousnessState(state) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.setConsciousnessState(state);
            }
        }

        function applyPerceptionFilter(filterId) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.applyPerceptionFilter(filterId);
            }
        }

        function syncWithPlayer(playerId) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.syncWithPlayer(playerId);
            }
        }

        function resetNeuralState() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.setConsciousnessState('normal');
                window.chromaShiftComplete.applyPerceptionFilter('normal');
                window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'Neural state reset to baseline', 'success');
            }
        }

        function enhanceConsciousness() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.setConsciousnessState('quantum');
                window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'Consciousness enhanced to quantum state', 'success');
            }
        }

        // Temporal Hack Engine Functions
        function slowTime(factor) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.slowTime(factor);
            }
        }

        function fastTime(factor) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.fastTime(factor);
            }
        }

        function normalTime() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.normalTime();
            }
        }

        function pauseTime() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.pauseTime();
            }
        }

        function rewindTime(seconds) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.rewindTime(seconds);
            }
        }

        function createTimeLoop() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.createTimeLoop();
            }
        }

        function updateCustomTime(value) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.updateCustomTime(value);
            }
        }

        function applyCustomTime() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.applyCustomTime();
            }
        }

        function freezeAllTime() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.pauseTime();
                window.chromaShiftComplete.addToDebugConsole('WARNING', 'Global time freeze activated', 'warning');
            }
        }

        function restoreDefaultTime() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.normalTime();
            }
        }

        // Dimensional Bridge Creator Functions
        function createDimensionalBridge() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.createDimensionalBridge();
            }
        }

        function loadBridgeTemplate(template) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.loadBridgeTemplate(template);
            }
        }

        function toggleBridge(bridgeId) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.toggleBridge(bridgeId);
            }
        }

        function connectToTeamDimensions() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.addToDebugConsole('INFO', 'Connecting to team dimensions...', 'info');
                setTimeout(() => {
                    window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'Team dimensions connected successfully', 'success');
                }, 2000);
            }
        }

        function stabilizeAllBridges() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.realityHacking.bridges.forEach(bridge => {
                    bridge.stability = Math.min(bridge.stability + 0.1, 1.0);
                });
                window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'All bridges stabilized', 'success');
                window.chromaShiftComplete.loadRealityTool('bridge');
            }
        }

        function emergencyDisconnect() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.realityHacking.bridges.forEach(bridge => {
                    bridge.active = false;
                });
                window.chromaShiftComplete.addToDebugConsole('WARNING', 'Emergency disconnect activated - all bridges disabled', 'warning');
                window.chromaShiftComplete.loadRealityTool('bridge');
            }
        }

        // Reality Debug Console Functions
        function runSystemDiagnostics() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.runSystemDiagnostics();
            }
        }

        function clearConsole() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.clearConsole();
            }
        }

        function exportDebugData() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.exportDebugData();
            }
        }

        function runIntegrityCheck() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.runIntegrityCheck();
            }
        }

        function emergencyReboot() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.addToDebugConsole('WARNING', 'Emergency reboot initiated...', 'warning');
                setTimeout(() => {
                    window.chromaShiftComplete.resetToDefaults();
                    window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'System reboot completed', 'success');
                }, 3000);
            }
        }

        function optimizeReality() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.stabilizeReality();
                window.chromaShiftComplete.normalTime();
                window.chromaShiftComplete.realityHacking.matrix.lightIntensity = 1.0;
                window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'Reality optimization completed', 'success');
            }
        }

        // Collaborative Reality Weaving Functions
        function startWeavingProject(projectType) {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.startWeavingProject(projectType);
            }
        }

        function inviteTeamToWeaving() {
            if (window.chromaShiftComplete && window.chromaShiftComplete.multiplayerSystem?.isInSession) {
                window.chromaShiftComplete.addToDebugConsole('INFO', 'Team invitation sent for reality weaving', 'info');
                window.chromaShiftComplete.broadcastToAllPlayers({
                    type: 'weaving_invitation',
                    sender: window.chromaShiftComplete.multiplayerSystem.currentPlayer?.name
                });
            }
        }

        function optimizeTeamWeaving() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'Team coordination optimized', 'success');
            }
        }

        function finalizeCurrentProject() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.addToDebugConsole('SUCCESS', 'Current weaving project finalized', 'success');
                window.chromaShiftComplete.showRealityEffect('project-complete');
            }
        }

        // Handle escape key for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals
                const modals = document.querySelectorAll('[style*="position: fixed"][style*="z-index: 1000"]');
                modals.forEach(modal => {
                    if (modal.id !== 'interactionWheel') {
                        modal.style.display = 'none';
                    }
                });
            }
        });

        // ===== GAME INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', () => {
            window.chromaShiftComplete = new ChromaShiftComplete();
        });

        // ===== UTILITY FUNCTIONS =====

        // Export for debugging
        window.debugChromaShift = () => {
            return window.chromaShiftComplete;
        };

        // Handle page visibility for auto-save
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && window.chromaShiftComplete) {
                window.chromaShiftComplete.autoSave();
            }
        });

        // Handle before unload for save confirmation
        window.addEventListener('beforeunload', (e) => {
            if (window.chromaShiftComplete) {
                const timeSinceSave = Date.now() - new Date(window.chromaShiftComplete.gameState.lastSaveTime || 0).getTime();
                if (timeSinceSave > 30000) { // If no save in last 30 seconds
                    e.preventDefault();
                    e.returnValue = 'You have unsaved progress. Are you sure you want to leave?';
                }
            }
        });

        /* ===== MULTIPLAYER INTERFACE HTML ===== */

        <!-- Multiplayer Lobby Modal -->
        <div class="multiplayer-lobby" id="multiplayerLobby" style="display: none;">
            <div class="lobby-header">
                <h1 class="lobby-title">SESSION LOBBY</h1>
                <div class="session-id-container">
                    <span class="session-id" id="sessionId">CHM-8F2K-9L1N</span>
                    <button class="copy-session-id" onclick="copySessionId()">COPY</button>
                </div>
            </div>

            <div class="player-list" id="playerList">
                <!-- Player slots will be populated by JavaScript -->
            </div>

            <div class="role-selection">
                <h3>Select Your Role</h3>
                <div class="role-cards">
                    <div class="role-card" data-role="hacker">
                        <div class="role-card-icon">💻</div>
                        <div class="role-card-title">Hacker</div>
                        <div class="role-card-desc">Reality programmer & code breaker</div>
                    </div>
                    <div class="role-card" data-role="dreamer">
                        <div class="role-card-icon">🌌</div>
                        <div class="role-card-title">Dreamer</div>
                        <div class="role-card-desc">Narrative weaver & vision guide</div>
                    </div>
                    <div class="role-card" data-role="reality-mapper">
                        <div class="role-card-icon">🗺️</div>
                        <div class="role-card-title">Reality Mapper</div>
                        <div class="role-card-desc">Spatial navigator & explorer</div>
                    </div>
                </div>
            </div>

            <div class="session-controls">
                <button class="control-btn" onclick="toggleAchievements()" title="Achievements & Leaderboards">🏆</button>
                <button class="control-btn" onclick="openModerationSettings()" title="Moderation Settings">⚙️</button>
                <button class="control-btn" onclick="saveSession()" title="Save Session">💾</button>
                <button class="control-btn" onclick="loadSession()" title="Load Session">📁</button>
                <button class="launch-btn" onclick="launchSession()" id="launchBtn">LAUNCH SESSION</button>
            </div>
        </div>

        <!-- In-Game Multiplayer HUD -->
        <div class="multiplayer-hud" id="multiplayerHud" style="display: none;">
            <!-- Team Status (Top-Left) -->
            <div class="team-status" id="teamStatus">
                <!-- Team players will be populated by JavaScript -->
            </div>

            <!-- AI Companion Integration (Top-Center) -->
            <div class="ai-companion-multiplayer">
                <div class="ai-pulse-line" id="aiPulseLine"></div>
                <div class="ai-subtitles" id="aiSubtitles"></div>
            </div>

            <!-- Voice Chat Panel (Bottom-Left) -->
            <div class="voice-chat-panel">
                <div class="current-speaker" id="currentSpeaker">
                    <div class="speaker-avatar" id="speakerAvatar">A</div>
                    <div class="speaker-name" id="speakerName">Player 1</div>
                </div>
            </div>

            <!-- Quest Tracker (Top-Right) -->
            <div class="quest-tracker-multiplayer">
                <div class="quest-objective" id="questObjective">
                    <div class="objective-icon">🎯</div>
                    <div class="objective-content">
                        <div class="objective-title" id="objectiveTitle">Connect team quantum channels</div>
                        <div class="objective-roles" id="objectiveRoles">
                            <div class="role-required" data-role="hacker">💻</div>
                            <div class="role-required" data-role="dreamer">🌌</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Interaction Wheel (Center) -->
        <div class="interaction-wheel" id="interactionWheel" style="display: none;">
            <div class="wheel-segment segment-0" data-action="point">👆</div>
            <div class="wheel-segment segment-1" data-action="wave">👋</div>
            <div class="wheel-segment segment-2" data-action="thumbs-up">👍</div>
            <div class="wheel-segment segment-3" data-action="question">❓</div>
            <div class="wheel-segment segment-4" data-action="heart">❤️</div>
            <div class="wheel-segment segment-5" data-action="star">⭐</div>
            <div class="wheel-segment segment-6" data-action="tool">🔧</div>
            <div class="wheel-segment segment-7" data-action="share">🤝</div>
        </div>

        <!-- Achievements & Leaderboards Panel -->
        <div class="achievements-panel" id="achievementsPanel">
            <div class="achievements-header">
                <div class="achievements-tabs">
                    <button class="achievement-tab active" onclick="switchAchievementTab('leaderboard')">Leaderboards</button>
                    <button class="achievement-tab" onclick="switchAchievementTab('achievements')">Achievements</button>
                </div>
            </div>
            <div class="achievements-content" id="achievementsContent">
                <!-- Content will be populated by JavaScript -->
            </div>
        </div>

        <!-- Multiplayer Quick Access Button -->
        <button class="multiplayer-btn" id="multiplayerBtn" onclick="openMultiplayerLobby()" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--multiplayer-accent-500);
            border: none;
            color: #000;
            font-size: 24px;
            cursor: pointer;
            z-index: 1001;
            box-shadow: 0 4px 20px rgba(0, 184, 212, 0.4);
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" title="Multiplayer Mode">
            👥
        </button>

        <!-- Main Menu Multiplayer Button -->
        <div style="text-align: center; margin: 40px 0;">
            <button class="control-btn" onclick="openMultiplayerLobby()" style="
                padding: 16px 32px;
                height: auto;
                width: auto;
                background: var(--multiplayer-accent-500);
                color: #000;
                border: none;
                border-radius: 8px;
                font-size: 18px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 184, 212, 0.4);
            " onmouseover="this.style.background='var(--multiplayer-accent-300)'; this.style.transform='scale(1.05)'" onmouseout="this.style.background='var(--multiplayer-accent-500)'; this.style.transform='scale(1)'">
                🌐 START MULTIPLAYER SESSION
            </button>
        </div>

        <!-- ===== ADVANCED REALITY HACKING INTERFACE ===== -->

        <!-- Reality Hacking Tools Menu -->
        <div class="reality-tools-menu" id="realityToolsMenu">
            <div class="tools-menu-title">Reality Hacking Tools</div>
            <button class="tools-menu-btn" onclick="openRealityMatrixEditor()">
                🌍 Matrix Editor
            </button>
            <button class="tools-menu-btn" onclick="openQuantumCodeInterpreter()">
                💻 Quantum Code
            </button>
            <button class="tools-menu-btn" onclick="openNeuralLinkInterface()">
                🧠 Neural Link
            </button>
            <button class="tools-menu-btn" onclick="openTemporalHackEngine()">
                ⏰ Temporal Hack
            </button>
            <button class="tools-menu-btn" onclick="openDimensionalBridgeCreator()">
                🌉 Bridge Creator
            </button>
            <button class="tools-menu-btn" onclick="openRealityDebugConsole()">
                🔧 Debug Console
            </button>
            <button class="tools-menu-btn" onclick="openCollaborativeWeaving()">
                🕸️ Team Weaving
            </button>
        </div>

        <!-- Reality Hacking Panel -->
        <div class="reality-hacking-panel" id="realityHackingPanel">
            <div class="reality-header">
                <h1 class="reality-title" id="realityPanelTitle">Reality Matrix Editor</h1>
                <button class="reality-close-btn" onclick="closeRealityHackingPanel()">✕</button>
            </div>
            <div class="reality-content">
                <div class="reality-main-panel" id="realityMainPanel">
                    <!-- Dynamic content will be inserted here -->
                </div>
                <div class="reality-inspector" id="realityInspector">
                    <h2>Properties</h2>
                    <div id="realityProperties">
                        <!-- Dynamic properties will be inserted here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Procedural Quest Generation Panel -->
        <div class="procedural-quest-panel" id="proceduralQuestPanel">
            <div class="procedural-quest-header">
                <h2 class="procedural-quest-title">Procedural Quest Generation System</h2>
                <button class="procedural-quest-close" onclick="closeProceduralQuestPanel()">✕ Close</button>
            </div>
            <div class="procedural-quest-content">
                <div class="quest-generation-info">
                    <h3>Dynamic Quest Generation</h3>
                    <p>ChromaShift now features an advanced procedural quest generation system that creates unique, dynamic quests based on your progress, location, and preferences. Each quest is procedurally generated with custom objectives, difficulty scaling, and rewards.</p>
                    <div class="quest-procedural-indicator">System Status: <span id="proceduralQuestStatus">Active</span></div>
                </div>

                <div class="procedural-quest-stats">
                    <h3>Quest Generation Statistics</h3>
                    <div class="stat-item">
                        <span class="stat-label">Active Procedural Quests:</span>
                        <span class="stat-value" id="activeProceduralCount">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Completed Procedural Quests:</span>
                        <span class="stat-value" id="completedProceduralCount">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Available Quest Types:</span>
                        <span class="stat-value">6</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Generation Algorithm:</span>
                        <span class="stat-value">v2.1</span>
                    </div>
                </div>

                <div class="quest-types-grid">
                    <div class="quest-type-card" data-quest-type="anomaly_hunt">
                        <h4>🌀 Anomaly Hunt</h4>
                        <p>Locate and collect chromatic anomalies using enhanced perception</p>
                        <span class="quest-difficulty-indicator difficulty-easy">Easy</span>
                    </div>
                    <div class="quest-type-card" data-quest-type="dimensional_exploration">
                        <h4>🌌 Dimensional Exploration</h4>
                        <p>Explore new dimensional realms and map their unique properties</p>
                        <span class="quest-difficulty-indicator difficulty-medium">Medium</span>
                    </div>
                    <div class="quest-type-card" data-quest-type="reality_calibration">
                        <h4>⚙️ Reality Calibration</h4>
                        <p>Use reality hacking to stabilize unstable areas</p>
                        <span class="quest-difficulty-indicator difficulty-medium">Medium</span>
                    </div>
                    <div class="quest-type-card" data-quest-type="cognitive_test">
                        <h4>🧠 Cognitive Test</h4>
                        <p>Complete mental challenges and prove your mental acuity</p>
                        <span class="quest-difficulty-indicator difficulty-medium">Medium</span>
                    </div>
                    <div class="quest-type-card" data-quest-type="consciousness_growth">
                        <h4>✨ Consciousness Growth</h4>
                        <p>Develop mental capabilities and expand awareness</p>
                        <span class="quest-difficulty-indicator difficulty-hard">Hard</span>
                    </div>
                    <div class="quest-type-card" data-quest-type="entity_encounter">
                        <h4>👥 Entity Encounter</h4>
                        <p>Meet and interact with dream realm consciousness entities</p>
                        <span class="quest-difficulty-indicator difficulty-hard">Hard</span>
                    </div>
                </div>

                <button class="generate-quest-button" onclick="generateNewProceduralQuest()">
                    🎯 Generate New Quest
                </button>

                <div class="quest-template-preview">
                    <h4>Recent Quest Template</h4>
                    <div class="quest-template-item">
                        <strong>Quest Type:</strong> <span id="lastQuestType">None generated yet</span>
                    </div>
                    <div class="quest-template-item">
                        <strong>Title:</strong> <span id="lastQuestTitle">Generate a quest to see examples</span>
                    </div>
                    <div class="quest-template-item">
                        <strong>Difficulty:</strong> <span id="lastQuestDifficulty">N/A</span>
                    </div>
                    <div class="quest-template-item">
                        <strong>Location:</strong> <span id="lastQuestLocation">N/A</span>
                    </div>
                    <div class="quest-template-item">
                        <strong>Estimated Time:</strong> <span id="lastQuestTime">N/A</span>
                    </div>
                </div>

                <div class="quest-management-panel">
                    <div class="quest-management-section">
                        <h4>Quest Filters</h4>
                        <div>
                            <button class="quest-filter-button active" data-filter="all">All Quests</button>
                            <button class="quest-filter-button" data-filter="procedural">Procedural Only</button>
                            <button class="quest-filter-button" data-filter="active">Active</button>
                            <button class="quest-filter-button" data-filter="completed">Completed</button>
                        </div>
                        <input type="text" class="quest-search-input" placeholder="Search quests..." id="questSearchInput">
                    </div>
                    <div class="quest-management-section">
                        <h4>Quest List</h4>
                        <div class="quest-list-container" id="questListContainer">
                            <div style="text-align: center; padding: 20px; color: var(--text-color);">
                                Generate quests to see them here
                            </div>
                        </div>
                    </div>
                </div>

                <div class="quest-generation-info" style="margin-top: 30px;">
                    <h3>Generation Algorithm Features</h3>
                    <ul style="color: var(--text-color); line-height: 1.8; padding-left: 20px;">
                        <li><strong>Dynamic Difficulty Scaling:</strong> Quests adapt to your current level and progress</li>
                        <li><strong>Contextual Content:</strong> Quests generated based on your current location and environment</li>
                        <li><strong>Branch Path Systems:</strong> Multiple completion paths with different rewards</li>
                        <li><strong>Time-Sensitive Challenges:</strong> Some quests have dynamic time limits</li>
                        <li><strong>Chain Quest Generation:</strong> Completing quests unlocks related follow-up quests</li>
                        <li><strong>AI Integration:</strong> Cortana provides contextual guidance for procedural quests</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Reality Effects Overlay -->
        <div class="reality-effects-overlay" id="realityEffectsOverlay">
            <!-- Dynamic effects will be inserted here -->
        </div>

        <!-- Reality Hacking Quick Access Button -->
        <button class="reality-hacking-btn" id="realityHackingBtn" onclick="toggleRealityToolsMenu()" style="
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--reality-primary-cyan-500), var(--reality-primary-cyan-300));
            border: none;
            color: #0A0F14;
            font-size: 24px;
            cursor: pointer;
            z-index: 1001;
            box-shadow: 0 4px 20px rgba(0, 184, 212, 0.6);
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 25px rgba(0, 184, 212, 0.8)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 20px rgba(0, 184, 212, 0.6)'" title="Reality Hacking Tools">
            🔧
        </button>

        <!-- Reality Hacking Button in Main Menu -->
        <div style="text-align: center; margin: 20px 0;">
            <button class="reality-hacking-main-btn" onclick="openRealityHackingPanel()" style="
                padding: 16px 32px;
                height: auto;
                width: auto;
                background: linear-gradient(135deg, var(--reality-primary-cyan-500), var(--reality-primary-cyan-300));
                color: #0A0F14;
                border: none;
                border-radius: 8px;
                font-size: 18px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 184, 212, 0.6);
                margin: 0 8px;
            " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 25px rgba(0, 184, 212, 0.8)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 20px rgba(0, 184, 212, 0.6)'">
                🔧 REALITY HACKING LAB
            </button>
        </div>

        <!-- ========================================= -->
        <!-- 3D ENVIRONMENT EXPLORATION SYSTEM -->
        <!-- ========================================= -->

        <!-- 3D Scene Container -->
        <div class="env3d-container" id="env3dContainer">
            <div class="env3d-scene" id="env3dScene"></div>
        </div>

        <!-- 3D UI Overlays -->
        <div class="env3d-ui-overlay" id="env3dUI">

            <!-- 3D Minimap -->
            <div class="env3d-minimap" id="env3dMinimap">
                <div class="env3d-minimap-title">3D ENVIRONMENT MAP</div>
                <div class="env3d-minimap-display" id="env3dMinimapDisplay">
                    <div class="env3d-minimap-player" id="env3dMinimapPlayer"></div>
                </div>
                <div class="env3d-minimap-controls">
                    <button class="env3d-zoom-btn" id="env3dZoomOut" title="Zoom Out">-</button>
                    <button class="env3d-zoom-btn" id="env3dZoomIn" title="Zoom In">+</button>
                </div>
            </div>

            <!-- Environmental Information Panel -->
            <div class="env3d-info-panel" id="env3dInfoPanel">
                <div class="env3d-info-title">Environment Details</div>
                <div class="env3d-info-content" id="env3dInfoContent">
                    <p>Exploring the dream dimension...</p>
                    <p>Current Location: Origin Point</p>
                    <p>Reality Stability: <span style="color: var(--env3d-primary-500);">Stable</span></p>
                </div>
                <div class="env3d-environment-stats" id="env3dStats">
                    <div class="env3d-stat-row">
                        <span class="env3d-stat-label">Time Flow:</span>
                        <span class="env3d-stat-value">1.00x</span>
                    </div>
                    <div class="env3d-stat-row">
                        <span class="env3d-stat-label">Gravity:</span>
                        <span class="env3d-stat-value">1.0</span>
                    </div>
                    <div class="env3d-stat-row">
                        <span class="env3d-stat-label">Light Level:</span>
                        <span class="env3d-stat-value">75%</span>
                    </div>
                    <div class="env3d-stat-row">
                        <span class="env3d-stat-label">Objects Found:</span>
                        <span class="env3d-stat-value" id="env3dObjectsCount">0</span>
                    </div>
                </div>
            </div>

            <!-- Camera Mode Selector -->
            <div class="env3d-camera-selector" id="env3dCameraSelector">
                <button class="env3d-camera-btn active" data-camera="first" title="First Person">
                    👁️
                </button>
                <button class="env3d-camera-btn" data-camera="third" title="Third Person">
                    👤
                </button>
                <button class="env3d-camera-btn" data-camera="free" title="Free Camera">
                    🕹️
                </button>
                <button class="env3d-camera-btn" data-camera="cinematic" title="Cinematic">
                    🎬
                </button>
            </div>

            <!-- Interaction Prompts -->
            <div class="env3d-interaction-prompt" id="env3dInteractionPrompt" style="display: none;">
                <div class="env3d-prompt-text" id="env3dPromptText">Object Name</div>
                <div class="env3d-prompt-action">[E] ACTION</div>
            </div>

            <!-- 3D Controls Panel -->
            <div class="env3d-controls-panel" id="env3dControlsPanel">
                <div class="env3d-controls-title">Controls</div>
                <div class="env3d-controls-list">
                    <div class="env3d-control-item">
                        <span>Move</span>
                        <span class="env3d-key">WASD</span>
                    </div>
                    <div class="env3d-control-item">
                        <span>Look</span>
                        <span class="env3d-key">Mouse</span>
                    </div>
                    <div class="env3d-control-item">
                        <span>Interact</span>
                        <span class="env3d-key">E</span>
                    </div>
                    <div class="env3d-control-item">
                        <span>Sprint</span>
                        <span class="env3d-key">Shift</span>
                    </div>
                    <div class="env3d-control-item">
                        <span>Jump</span>
                        <span class="env3d-key">Space</span>
                    </div>
                    <div class="env3d-control-item">
                        <span>Settings</span>
                        <span class="env3d-key">F1</span>
                    </div>
                </div>
            </div>

            <!-- Mobile Controls -->
            <div class="env3d-mobile-controls" id="env3dMobileControls">
                <div class="env3d-mobile-joystick" id="env3dMobileJoystick">
                    <div class="env3d-mobile-joystick-stick"></div>
                </div>
                <div class="env3d-mobile-look-area" id="env3dMobileLookArea"></div>
                <button class="env3d-mobile-interact-btn" id="env3dMobileInteract">E</button>
            </div>

            <!-- Performance Settings Panel -->
            <div class="env3d-settings-panel" id="env3dSettingsPanel">
                <div class="env3d-settings-title">3D Environment Settings</div>

                <div class="env3d-setting-row">
                    <span class="env3d-setting-label">Enable Particles</span>
                    <div class="env3d-toggle active" data-setting="particles">
                        <div class="env3d-toggle-handle"></div>
                    </div>
                </div>

                <div class="env3d-setting-row">
                    <span class="env3d-setting-label">Dynamic Lighting</span>
                    <div class="env3d-toggle active" data-setting="lighting">
                        <div class="env3d-toggle-handle"></div>
                    </div>
                </div>

                <div class="env3d-setting-row">
                    <span class="env3d-setting-label">Weather Effects</span>
                    <div class="env3d-toggle active" data-setting="weather">
                        <div class="env3d-toggle-handle"></div>
                    </div>
                </div>

                <div class="env3d-setting-row">
                    <span class="env3d-setting-label">Real-time Shadows</span>
                    <div class="env3d-toggle" data-setting="shadows">
                        <div class="env3d-toggle-handle"></div>
                    </div>
                </div>

                <div class="env3d-setting-row">
                    <span class="env3d-setting-label">High Quality Models</span>
                    <div class="env3d-toggle" data-setting="quality">
                        <div class="env3d-toggle-handle"></div>
                    </div>
                </div>

                <div class="env3d-setting-row">
                    <span class="env3d-setting-label">Audio Spatial</span>
                    <div class="env3d-toggle active" data-setting="spatial">
                        <div class="env3d-toggle-handle"></div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="closeEnv3dSettings()" style="
                        padding: 8px 16px;
                        background: var(--env3d-primary-500);
                        color: var(--env3d-bg-primary);
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Close Settings</button>
                </div>
            </div>
        </div>
    </script>
    <script>
        // 3D Environment Control Functions

        function toggle3DEnvironment() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.globalToggle3DEnvironment();
            }
        }

        function open3DEnvironment() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.activate3DEnvironment();
            }
        }

        function close3DEnvironment() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.deactivate3DEnvironment();
            }
        }

        function switch3DCamera(mode) {
            if (window.chromaShiftComplete && window.chromaShiftComplete.environment3D?.isActive) {
                window.chromaShiftComplete.switch3DCameraMode(mode);
            }
        }

        function toggleEnv3dSettings() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.toggleEnv3dSettings();
            }
        }

        function closeEnv3dSettings() {
            const panel = document.getElementById('env3dSettingsPanel');
            if (panel) {
                panel.style.display = 'none';
            }
        }

        function zoom3DMinimap(in) {
            if (window.chromaShiftComplete && window.chromaShiftComplete.environment3D?.isActive) {
                const factor = in ? 1.2 : 0.8;
                window.chromaShiftComplete.zoomMinimap(factor);
            }
        }

        function interactIn3D() {
            if (window.chromaShiftComplete && window.chromaShiftComplete.environment3D?.isActive) {
                window.chromaShiftComplete.handle3DInteraction();
            }
        }

        // Add keyboard shortcut for 3D toggle (F2)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F2' && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                toggle3DEnvironment();
            }
        });

        // Enhanced mobile 3D controls
        if ('ontouchstart' in window) {
            // Mobile-specific 3D optimizations
            document.addEventListener('touchstart', (e) => {
                // Prevent default scrolling during 3D interaction
                if (window.chromaShiftComplete?.environment3D?.isActive) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
    </script>
    <script>
        // Advanced Audio System State
        window.advancedAudioSystem = {
            enabled: false,
            masterVolume: 70,
            currentSection: 'master',
            musicMode: 'exploration',
            spatialEnabled: true,
            uiReactive: true,
            adaptiveQuality: true,
            realityIntegration: true,
            audioContext: null,
            masterGainNode: null,
            spatialNodes: new Map(),
            musicNodes: {
                exploration: null,
                combat: null,
                stealth: null
            },
            effectNodes: {
                reverb: null,
                echo: null,
                distortion: null,
                lfo: null
            },
            audioElements: new Map(),
            spatialSources: new Map(),
            realTimeData: {
                rmsLevel: -12.5,
                clipRate: 0.0,
                currentMood: 'Exploration',
                energyLevel: 'Medium',
                transitionState: 'Smooth'
            }
        };

        // Advanced Audio System Functions

        function toggleAdvancedAudioSystem() {
            const container = document.getElementById('advancedAudioSystem');
            const audioSystem = window.advancedAudioSystem;

            if (audioSystem.enabled) {
                closeAdvancedAudioSystem();
            } else {
                openAdvancedAudioSystem();
            }
        }

        function openAdvancedAudioSystem() {
            const container = document.getElementById('advancedAudioSystem');
            const audioSystem = window.advancedAudioSystem;

            if (!audioSystem.enabled) {
                // Initialize Web Audio API if not already done
                if (!audioSystem.audioContext) {
                    initAdvancedAudioSystem();
                }

                container.classList.add('active');
                audioSystem.enabled = true;

                // Start real-time audio monitoring
                startAudioMonitoring();

                // Update game log
                if (window.chromaShiftComplete) {
                    window.chromaShiftComplete.addEventToLog('Advanced Audio System activated - Spatial audio and dynamic music enabled');
                }
            }
        }

        function closeAdvancedAudioSystem() {
            const container = document.getElementById('advancedAudioSystem');
            const audioSystem = window.advancedAudioSystem;

            container.classList.remove('active');
            audioSystem.enabled = false;

            // Update game log
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.addEventToLog('Advanced Audio System deactivated');
            }
        }

        function showAudioSection(sectionName) {
            const audioSystem = window.advancedAudioSystem;
            audioSystem.currentSection = sectionName;

            // Update navigation
            document.querySelectorAll('.audio-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');

            // Update content sections
            document.querySelectorAll('.audio-content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(`audio-section-${sectionName}`).classList.add('active');
        }

        function setMusicMode(mode) {
            const audioSystem = window.advancedAudioSystem;
            const prevMode = audioSystem.musicMode;
            audioSystem.musicMode = mode;

            // Update toggle states
            document.querySelectorAll('.audio-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
            document.getElementById(`music-toggle-${mode}`).classList.add('active');

            // Update display
            const moodMap = {
                'dynamic': 'Dynamic Adaptation',
                'exploration': 'Exploration',
                'combat': 'Combat',
                'stealth': 'Stealth'
            };

            document.getElementById('audio-current-mood').textContent = moodMap[mode];
            audioSystem.realTimeData.currentMood = moodMap[mode];

            // Audio transition simulation
            audioSystem.realTimeData.transitionState = 'Transitioning...';
            setTimeout(() => {
                audioSystem.realTimeData.transitionState = 'Smooth';
                if (audioSystem.enabled) {
                    document.getElementById('audio-transition-state').textContent = 'Smooth';
                }
            }, 1000);

            // Update game log
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.addEventToLog(`Music mode switched to: ${moodMap[mode]}`);
            }
        }

        function initAdvancedAudioSystem() {
            const audioSystem = window.advancedAudioSystem;

            try {
                // Create AudioContext
                audioSystem.audioContext = new (window.AudioContext || window.webkitAudioContext)();

                // Create master gain node
                audioSystem.masterGainNode = audioSystem.audioContext.createGain();
                audioSystem.masterGainNode.gain.value = audioSystem.masterVolume / 100;
                audioSystem.masterGainNode.connect(audioSystem.audioContext.destination);

                // Initialize spatial audio nodes for different sources
                const sources = ['ai-companion', 'quest-marker', 'reality-node'];
                sources.forEach(sourceId => {
                    const sourceNode = audioSystem.audioContext.createGain();
                    const pannerNode = audioSystem.audioContext.createPanner();

                    pannerNode.panningModel = 'HRTF';
                    pannerNode.distanceModel = 'inverse';
                    pannerNode.refDistance = 1;
                    pannerNode.maxDistance = 50;
                    pannerNode.rolloffFactor = 1;
                    pannerNode.coneInnerAngle = 360;
                    pannerNode.coneOuterAngle = 0;
                    pannerNode.coneOuterGain = 0;

                    sourceNode.connect(pannerNode);
                    pannerNode.connect(audioSystem.masterGainNode);

                    audioSystem.spatialNodes.set(sourceId, { gain: sourceNode, panner: pannerNode });
                });

                // Initialize music tracks (placeholder audio sources)
                const musicTracks = ['exploration', 'combat', 'stealth'];
                musicTracks.forEach(trackName => {
                    const gainNode = audioSystem.audioContext.createGain();
                    gainNode.gain.value = trackName === 'exploration' ? 1.0 : 0.0; // Start with exploration active
                    gainNode.connect(audioSystem.masterGainNode);
                    audioSystem.musicNodes[trackName] = gainNode;
                });

                // Initialize effect nodes
                audioSystem.effectNodes.reverb = audioSystem.audioContext.createConvolver();
                audioSystem.effectNodes.echo = audioSystem.audioContext.createDelay(0.5);
                audioSystem.effectNodes.distortion = createDistortionCurve(audioSystem.audioContext, 15);
                audioSystem.effectNodes.lfo = audioSystem.audioContext.createOscillator();

                // Add some spatial sources with simulated positions
                updateSpatialSource('ai-companion', { x: 15, y: 0, z: 20 });
                updateSpatialSource('quest-marker', { x: -8, y: 0, z: -12 });
                updateSpatialSource('reality-node', { x: 25, y: 5, z: -5 });

                console.log('Advanced Audio System initialized successfully');

            } catch (error) {
                console.error('Failed to initialize Advanced Audio System:', error);
                if (window.chromaShiftComplete) {
                    window.chromaShiftComplete.addEventToLog('Audio System initialization failed - Web Audio API may be unsupported');
                }
            }
        }

        function createDistortionCurve(audioContext, amount) {
            const samples = 44100;
            const curve = new Float32Array(samples);
            const deg = Math.PI / 180;

            for (let i = 0; i < samples; i++) {
                const x = (i * 2) / samples - 1;
                curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
            }

            const waveShaper = audioContext.createWaveShaper();
            waveShaper.curve = curve;
            waveShaper.oversample = '4x';

            return waveShaper;
        }

        function updateSpatialSource(sourceId, position) {
            const audioSystem = window.advancedAudioSystem;
            const sourceNode = audioSystem.spatialNodes.get(sourceId);

            if (sourceNode) {
                sourceNode.panner.positionX.value = position.x;
                sourceNode.panner.positionY.value = position.y;
                sourceNode.panner.positionZ.value = position.z;

                // Calculate distance for display
                const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
                const sourceElement = document.querySelector(`[data-source="${sourceId}"]`);
                if (sourceElement) {
                    sourceElement.title = `${sourceId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - ${distance.toFixed(1)}m`;

                    // Animate pulse based on "audio level"
                    const audioLevel = Math.random() * 0.8 + 0.2; // Simulated
                    sourceElement.style.opacity = audioLevel;
                    sourceElement.style.transform = `scale(${0.8 + audioLevel * 0.4})`;
                }
            }
        }

        function startAudioMonitoring() {
            const audioSystem = window.advancedAudioSystem;
            const updateInterval = 100; // Update every 100ms

            setInterval(() => {
                if (!audioSystem.enabled || !audioSystem.audioContext) return;

                // Simulate real-time audio data
                audioSystem.realTimeData.rmsLevel = (Math.random() * 20 - 15).toFixed(1); // -15 to +5 dB
                audioSystem.realTimeData.clipRate = (Math.random() * 2).toFixed(1); // 0-2%

                // Update display elements
                const rmsElement = document.getElementById('audio-rms-level');
                const clipElement = document.getElementById('audio-clip-rate');

                if (rmsElement) rmsElement.textContent = `${audioSystem.realTimeData.rmsLevel} dB`;
                if (clipElement) clipElement.textContent = `${audioSystem.realTimeData.clipRate}%`;

                // Update audio-reactive UI elements
                if (audioSystem.uiReactive) {
                    const amplitude = Math.abs(Math.random() - 0.5) * 2; // 0-1
                    document.documentElement.style.setProperty('--audio-amplitude', amplitude);

                    // Update master slider reactivity
                    const masterSlider = document.getElementById('audio-master-slider');
                    if (masterSlider) {
                        masterSlider.style.setProperty('--audio-amplitude', amplitude);
                    }
                }

            }, updateInterval);
        }

        function resetAudioSettings() {
            const audioSystem = window.advancedAudioSystem;

            // Reset to defaults
            audioSystem.masterVolume = 70;
            audioSystem.musicMode = 'exploration';
            audioSystem.spatialEnabled = true;
            audioSystem.uiReactive = true;
            audioSystem.adaptiveQuality = true;
            audioSystem.realityIntegration = true;

            // Update UI
            updateMasterVolume(70);
            setMusicMode('exploration');

            // Reset toggle states
            document.getElementById('audio-3d-toggle').classList.add('active');
            document.getElementById('audio-reactive-toggle').classList.add('active');
            document.getElementById('audio-adaptive-toggle').classList.add('active');
            document.getElementById('audio-reality-toggle').classList.add('active');

            // Update audio nodes if initialized
            if (audioSystem.masterGainNode) {
                audioSystem.masterGainNode.gain.value = 0.7;
            }

            // Update game log
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.addEventToLog('Audio settings reset to defaults');
            }
        }

        function updateMasterVolume(volume) {
            const audioSystem = window.advancedAudioSystem;
            audioSystem.masterVolume = volume;

            // Update UI
            const slider = document.querySelector('#audio-master-slider .audio-volume-fill');
            const thumb = document.querySelector('#audio-master-slider .audio-volume-thumb');
            const levelDisplay = document.getElementById('audio-master-level');

            if (slider) slider.style.width = `${volume}%`;
            if (thumb) thumb.style.left = `${volume}%`;
            if (levelDisplay) levelDisplay.textContent = `${volume}%`;

            // Update audio node
            if (audioSystem.masterGainNode) {
                audioSystem.masterGainNode.gain.value = volume / 100;
            }
        }

        // Event Listeners for Audio System
        document.addEventListener('DOMContentLoaded', () => {
            // Master volume slider interaction
            const masterSlider = document.getElementById('audio-master-slider');
            if (masterSlider) {
                let isDragging = false;
                let startX = 0;
                let startVolume = 70;

                masterSlider.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    startX = e.clientX;
                    startVolume = window.advancedAudioSystem.masterVolume;
                    e.preventDefault();
                });

                document.addEventListener('mousemove', (e) => {
                    if (isDragging) {
                        const deltaX = e.clientX - startX;
                        const deltaVolume = (deltaX / 200) * 100; // Adjust sensitivity
                        const newVolume = Math.max(0, Math.min(100, startVolume + deltaVolume));
                        updateMasterVolume(Math.round(newVolume));
                    }
                });

                document.addEventListener('mouseup', () => {
                    isDragging = false;
                });
            }

            // Spatial source interactions
            document.querySelectorAll('.audio-spatial-source').forEach(source => {
                source.addEventListener('click', () => {
                    // Toggle active state
                    source.classList.toggle('active');

                    // Update spatial positioning
                    const sourceId = source.getAttribute('data-source');
                    const position = {
                        x: Math.random() * 40 - 20,
                        y: Math.random() * 10 - 5,
                        z: Math.random() * 40 - 20
                    };
                    updateSpatialSource(sourceId, position);
                });
            });

            // Toggle functionality for settings
            document.getElementById('audio-3d-toggle')?.addEventListener('click', function() {
                this.classList.toggle('active');
                window.advancedAudioSystem.spatialEnabled = this.classList.contains('active');
            });

            document.getElementById('audio-reactive-toggle')?.addEventListener('click', function() {
                this.classList.toggle('active');
                window.advancedAudioSystem.uiReactive = this.classList.contains('active');
            });

            document.getElementById('audio-adaptive-toggle')?.addEventListener('click', function() {
                this.classList.toggle('active');
                window.advancedAudioSystem.adaptiveQuality = this.classList.contains('active');
            });

            document.getElementById('audio-reality-toggle')?.addEventListener('click', function() {
                this.classList.toggle('active');
                window.advancedAudioSystem.realityIntegration = this.classList.contains('active');

                // Toggle reality integration visual effects
                const audioContainer = document.getElementById('advancedAudioSystem');
                if (this.classList.contains('active')) {
                    audioContainer.classList.add('audio-reality-hack-active');
                } else {
                    audioContainer.classList.remove('audio-reality-hack-active');
                }
            });

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                    // Ctrl+Shift+A to toggle audio system
                    e.preventDefault();
                    toggleAdvancedAudioSystem();
                }
            });
        });

        // Integration with other ChromaShift systems
        if (window.chromaShiftComplete) {
            // Add audio system toggle to main interface
            const originalAddFeatureButton = window.chromaShiftComplete.addFeatureButton;
            window.chromaShiftComplete.addFeatureButton = function(featureName, description, callback) {
                if (featureName === 'Advanced Audio System') {
                    return originalAddFeatureButton.call(this, 'Advanced Audio System', 'Enable spatial 3D audio and dynamic music system', toggleAdvancedAudioSystem);
                }
                return originalAddFeatureButton.call(this, featureName, description, callback);
            };
        }

        // Mobile touch support for audio system
        document.addEventListener('touchstart', (e) => {
            if (window.advancedAudioSystem?.enabled) {
                const target = e.target;
                if (target.classList.contains('audio-volume-thumb') ||
                    target.classList.contains('audio-volume-slider') ||
                    target.classList.contains('audio-spatial-source')) {
                    e.preventDefault();
                }
            }
        }, { passive: false });

        // Reality Hacking System Integration
        function integrateRealityHackingWithAudio(realityLevel) {
            const audioSystem = window.advancedAudioSystem;
            if (!audioSystem.enabled || !audioSystem.realityIntegration) return;

            // Apply reality parameters to audio
            const realityFactor = realityLevel / 100;

            // Distortion increases with reality hacking level
            if (audioSystem.effectNodes.distortion) {
                audioSystem.effectNodes.distortion.curve = createDistortionCurve(audioSystem.audioContext, 15 + realityFactor * 50);
            }

            // Spatial audio becomes more erratic
            audioSystem.spatialNodes.forEach((nodes, sourceId) => {
                const erraticFactor = realityFactor * 2;
                nodes.panner.positionX.value += (Math.random() - 0.5) * erraticFactor;
                nodes.panner.positionY.value += (Math.random() - 0.5) * erraticFactor;
                nodes.panner.positionZ.value += (Math.random() - 0.5) * erraticFactor;
            });

            // Visual feedback
            const audioContainer = document.getElementById('advancedAudioSystem');
            if (realityLevel > 50) {
                audioContainer.classList.add('audio-reactive-glow');
            } else {
                audioContainer.classList.remove('audio-reactive-glow');
            }
        }

        // Export integration function
        window.integrateRealityHackingWithAudio = integrateRealityHackingWithAudio;

        // =========================================
        // GLOBAL AUDIO SYSTEM UTILITY FUNCTIONS
        // =========================================

        // Main audio system control functions
        function toggleAdvancedAudioSystem() {
            if (window.chromaShiftComplete) {
                window.chromaShiftComplete.toggleAdvancedAudioSystem();
            } else if (window.advancedAudioSystem) {
                const container = document.getElementById('advancedAudioSystem');
                if (window.advancedAudioSystem.enabled) {
                    closeAdvancedAudioSystem();
                } else {
                    openAdvancedAudioSystem();
                }
            }
        }

        function openAdvancedAudioSystem() {
            const container = document.getElementById('advancedAudioSystem');
            const audioSystem = window.advancedAudioSystem;

            if (container && audioSystem) {
                if (!audioSystem.enabled) {
                    container.classList.add('active');
                    audioSystem.enabled = true;
                    console.log('Advanced Audio System opened');
                }
            }
        }

        function closeAdvancedAudioSystem() {
            const container = document.getElementById('advancedAudioSystem');
            const audioSystem = window.advancedAudioSystem;

            if (container && audioSystem) {
                container.classList.remove('active');
                audioSystem.enabled = false;
                console.log('Advanced Audio System closed');
            }
        }

        function showAudioSection(sectionName) {
            const audioSystem = window.advancedAudioSystem;
            if (!audioSystem || !audioSystem.enabled) return;

            audioSystem.currentSection = sectionName;

            // Update navigation
            document.querySelectorAll('.audio-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            const activeNav = document.querySelector(`[onclick="showAudioSection('${sectionName}')"]`);
            if (activeNav) activeNav.classList.add('active');

            // Update content sections
            document.querySelectorAll('.audio-content-section').forEach(section => {
                section.classList.remove('active');
            });
            const targetSection = document.getElementById(`audio-section-${sectionName}`);
            if (targetSection) targetSection.classList.add('active');
        }

        function setMusicMode(mode) {
            const audioSystem = window.advancedAudioSystem;
            if (!audioSystem) return;

            audioSystem.musicMode = mode;

            // Update toggle states
            document.querySelectorAll('.audio-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
            const activeToggle = document.getElementById(`music-toggle-${mode}`);
            if (activeToggle) activeToggle.classList.add('active');

            // Update display
            const moodMap = {
                'dynamic': 'Dynamic Adaptation',
                'exploration': 'Exploration',
                'combat': 'Combat',
                'stealth': 'Stealth'
            };

            const currentMoodElement = document.getElementById('audio-current-mood');
            if (currentMoodElement) {
                currentMoodElement.textContent = moodMap[mode];
            }
            audioSystem.realTimeData.currentMood = moodMap[mode];

            console.log(`Music mode set to: ${mode}`);
        }

        function resetAudioSettings() {
            const audioSystem = window.advancedAudioSystem;
            if (!audioSystem) return;

            // Reset to defaults
            audioSystem.masterVolume = 70;
            audioSystem.musicMode = 'exploration';
            audioSystem.spatialEnabled = true;
            audioSystem.uiReactive = true;
            audioSystem.adaptiveQuality = true;
            audioSystem.realityIntegration = true;

            // Update UI
            const masterSlider = document.getElementById('audio-master-slider');
            const masterFill = masterSlider?.querySelector('.audio-volume-fill');
            const masterThumb = masterSlider?.querySelector('.audio-volume-thumb');
            const masterLevel = document.getElementById('audio-master-level');

            if (masterFill) masterFill.style.width = '70%';
            if (masterThumb) masterThumb.style.left = '70%';
            if (masterLevel) masterLevel.textContent = '70%';

            setMusicMode('exploration');

            // Reset toggle states
            const toggles = ['audio-3d-toggle', 'audio-reactive-toggle', 'audio-adaptive-toggle', 'audio-reality-toggle'];
            toggles.forEach(toggleId => {
                const toggle = document.getElementById(toggleId);
                if (toggle) toggle.classList.add('active');
            });

            console.log('Audio settings reset to defaults');
        }

        // ===== PROCEDURAL QUEST GENERATION UI FUNCTIONS =====

        // Toggle procedural quest panel
        function toggleProceduralQuestPanel() {
            const panel = document.getElementById('proceduralQuestPanel');
            if (panel.classList.contains('active')) {
                closeProceduralQuestPanel();
            } else {
                openProceduralQuestPanel();
            }
        }

        // Open procedural quest panel
        function openProceduralQuestPanel() {
            const panel = document.getElementById('proceduralQuestPanel');
            panel.classList.add('active');
            updateProceduralQuestStats();
            updateQuestList();

            // Add quest generation active indicator
            if (!document.querySelector('.procedural-quest-generation-active')) {
                const indicator = document.createElement('div');
                indicator.className = 'procedural-quest-generation-active';
                indicator.textContent = 'AI GENERATING';
                panel.appendChild(indicator);
            }
        }

        // Close procedural quest panel
        function closeProceduralQuestPanel() {
            const panel = document.getElementById('proceduralQuestPanel');
            panel.classList.remove('active');
        }

        // Generate new procedural quest
        function generateNewProceduralQuest() {
            const button = document.querySelector('.generate-quest-button');
            const originalText = button.textContent;

            // Show loading state
            button.textContent = '🎯 Generating Quest...';
            button.disabled = true;
            button.style.opacity = '0.7';

            // Call ChromaShift quest generation
            setTimeout(() => {
                if (window.chromaShiftComplete && window.chromaShiftComplete.generateProceduralQuest) {
                    const quest = window.chromaShiftComplete.generateProceduralQuest();

                    // Show success notification
                    showQuestGenerationNotification(`Quest Generated: ${quest.title}`);

                    // Update UI
                    updateProceduralQuestStats();
                    updateQuestList();
                    updateLastQuestTemplate(quest);

                    // Reset button
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.opacity = '1';
                } else {
                    showQuestGenerationNotification('Quest generation system not available', 'error');

                    // Reset button
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.opacity = '1';
                }
            }, 1500); // Simulate generation time
        }

        // Show quest generation notification
        function showQuestGenerationNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `quest-generation-notification ${type === 'error' ? 'error' : ''}`;
            notification.textContent = message;

            document.body.appendChild(notification);

            // Auto remove after 3 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 3000);
        }

        // Update procedural quest statistics
        function updateProceduralQuestStats() {
            const chromaShift = window.chromaShiftComplete;
            if (!chromaShift || !chromaShift.questSystem) return;

            const questSystem = chromaShift.questSystem;
            const activeCount = questSystem.activeQuests?.filter(q => q.generated).length || 0;
            const completedCount = questSystem.completedQuests?.filter(q => q.generated).length || 0;

            const activeElement = document.getElementById('activeProceduralCount');
            const completedElement = document.getElementById('completedProceduralCount');

            if (activeElement) activeElement.textContent = activeCount;
            if (completedElement) completedElement.textContent = completedCount;

            // Update status indicator
            const statusElement = document.getElementById('proceduralQuestStatus');
            if (statusElement) {
                statusElement.textContent = 'Active';
                statusElement.style.color = 'var(--success-color)';
            }
        }

        // Update last quest template display
        function updateLastQuestTemplate(quest) {
            if (!quest) return;

            const questTypeMap = {
                'anomaly_hunt': '🌀 Anomaly Hunt',
                'dimensional_exploration': '🌌 Dimensional Exploration',
                'reality_calibration': '⚙️ Reality Calibration',
                'cognitive_test': '🧠 Cognitive Test',
                'consciousness_growth': '✨ Consciousness Growth',
                'entity_encounter': '👥 Entity Encounter'
            };

            const timeMap = {
                'anomaly_hunt': '20-30 minutes',
                'dimensional_exploration': '30-45 minutes',
                'reality_calibration': '15-25 minutes',
                'cognitive_test': '25-40 minutes',
                'consciousness_growth': '45-60 minutes',
                'entity_encounter': '30-45 minutes'
            };

            const difficultyMap = {
                1: 'Very Easy', 2: 'Easy', 3: 'Easy-Medium', 4: 'Medium',
                5: 'Medium', 6: 'Medium-Hard', 7: 'Hard', 8: 'Hard',
                9: 'Very Hard', 10: 'Extreme'
            };

            const typeElement = document.getElementById('lastQuestType');
            const titleElement = document.getElementById('lastQuestTitle');
            const difficultyElement = document.getElementById('lastQuestDifficulty');
            const locationElement = document.getElementById('lastQuestLocation');
            const timeElement = document.getElementById('lastQuestTime');

            if (typeElement) typeElement.textContent = questTypeMap[quest.type] || quest.type;
            if (titleElement) titleElement.textContent = quest.title;
            if (difficultyElement) difficultyElement.textContent = `${difficultyMap[quest.difficulty] || quest.difficulty}/10`;
            if (locationElement) locationElement.textContent = quest.location;
            if (timeElement) timeElement.textContent = timeMap[quest.type] || 'Variable';
        }

        // Update quest list
        function updateQuestList() {
            const chromaShift = window.chromaShiftComplete;
            if (!chromaShift || !chromaShift.questSystem) return;

            const questSystem = chromaShift.questSystem;
            const container = document.getElementById('questListContainer');
            if (!container) return;

            const allQuests = [
                ...(questSystem.activeQuests || []),
                ...(questSystem.completedQuests || [])
            ].filter(q => q.generated);

            if (allQuests.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: var(--text-color);">
                        No procedural quests generated yet. Click "Generate New Quest" to create one!
                    </div>
                `;
                return;
            }

            container.innerHTML = allQuests.map(quest => {
                const status = questSystem.activeQuests.includes(quest) ? 'Active' : 'Completed';
                const statusClass = status === 'Active' ? 'style="color: var(--success-color);"' : 'style="color: var(--text-color);"';

                return `
                    <div class="quest-list-item" data-quest-id="${quest.id}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>${quest.title}</strong>
                                <div style="font-size: 12px; color: var(--text-color); margin-top: 2px;">
                                    ${quest.type.replace('_', ' ').toUpperCase()} • Difficulty ${quest.difficulty}/10
                                </div>
                            </div>
                            <div ${statusClass} style="font-size: 12px; font-weight: bold;">
                                ${status}
                            </div>
                        </div>
                        ${quest.generated ? '<div class="procedural-quest-badge">PROC</div>' : ''}
                    </div>
                `;
            }).join('');
        }

        // Quest filter functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quest-filter-button')) {
                // Remove active class from all buttons
                document.querySelectorAll('.quest-filter-button').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                e.target.classList.add('active');

                // Apply filter
                const filter = e.target.dataset.filter;
                filterQuests(filter);
            }
        });

        // Filter quests based on selected filter
        function filterQuests(filter) {
            const chromaShift = window.chromaShiftComplete;
            if (!chromaShift || !chromaShift.questSystem) return;

            const questSystem = chromaShift.questSystem;
            let filteredQuests = [];

            switch (filter) {
                case 'procedural':
                    filteredQuests = questSystem.activeQuests?.filter(q => q.generated) || [];
                    break;
                case 'active':
                    filteredQuests = questSystem.activeQuests || [];
                    break;
                case 'completed':
                    filteredQuests = questSystem.completedQuests || [];
                    break;
                default:
                    filteredQuests = [
                        ...(questSystem.activeQuests || []),
                        ...(questSystem.completedQuests || [])
                    ].filter(q => q.generated);
            }

            updateFilteredQuestList(filteredQuests);
        }

        // Update filtered quest list
        function updateFilteredQuestList(quests) {
            const container = document.getElementById('questListContainer');
            if (!container) return;

            if (quests.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: var(--text-color);">
                        No quests match the current filter.
                    </div>
                `;
                return;
            }

            container.innerHTML = quests.map(quest => {
                const isActive = document.querySelector(`[data-filter="active"]`).classList.contains('active');
                const status = isActive ? 'Active' : 'Completed';
                const statusClass = status === 'Active' ? 'style="color: var(--success-color);"' : 'style="color: var(--text-color);"';

                return `
                    <div class="quest-list-item" data-quest-id="${quest.id}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>${quest.title}</strong>
                                <div style="font-size: 12px; color: var(--text-color); margin-top: 2px;">
                                    ${quest.type.replace('_', ' ').toUpperCase()} • Difficulty ${quest.difficulty}/10
                                </div>
                            </div>
                            <div ${statusClass} style="font-size: 12px; font-weight: bold;">
                                ${status}
                            </div>
                        </div>
                        ${quest.generated ? '<div class="procedural-quest-badge">PROC</div>' : ''}
                    </div>
                `;
            }).join('');
        }

        // Quest search functionality
        const questSearchInput = document.getElementById('questSearchInput');
        if (questSearchInput) {
            questSearchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const chromaShift = window.chromaShiftComplete;
                if (!chromaShift || !chromaShift.questSystem) return;

                const questSystem = chromaShift.questSystem;
                const allQuests = [
                    ...(questSystem.activeQuests || []),
                    ...(questSystem.completedQuests || [])
                ].filter(q => q.generated);

                const filteredQuests = allQuests.filter(quest =>
                    quest.title.toLowerCase().includes(searchTerm) ||
                    quest.type.toLowerCase().includes(searchTerm) ||
                    quest.location.toLowerCase().includes(searchTerm)
                );

                updateFilteredQuestList(filteredQuests);
            });
        }

        // Quest type card interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quest-type-card') || e.target.closest('.quest-type-card')) {
                const card = e.target.classList.contains('quest-type-card') ? e.target : e.target.closest('.quest-type-card');
                const questType = card.dataset.questType;

                // Highlight selected card
                document.querySelectorAll('.quest-type-card').forEach(c => {
                    c.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                });
                card.style.borderColor = 'var(--primary-color)';
                card.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';

                // Generate quest of this type (if system supports type-specific generation)
                if (window.chromaShiftComplete) {
                    // This would require extending the quest generation to support type preference
                    console.log(`Selected quest type: ${questType}`);
                }
            }
        });

        // Add keyboard shortcut for procedural quests (Ctrl+Shift+Q)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
                e.preventDefault();
                toggleProceduralQuestPanel();
            }
        });

        // Integration with ChromaShift main system
        function connectAudioSystemToChromaShift() {
            if (window.chromaShiftComplete) {
                // Override the integrateRealityHackingWithAudio function to use ChromaShift's version
                window.integrateRealityHackingWithAudio = (realityLevel) => {
                    window.chromaShiftComplete.integrateRealityHackingWithAudio(realityLevel);
                };

                // Add audio system to feature unlocks
                if (window.chromaShiftComplete.addFeatureButton) {
                    window.chromaShiftComplete.addFeatureButton(
                        'Advanced Audio System',
                        'Enable spatial 3D audio and dynamic music system',
                        toggleAdvancedAudioSystem
                    );
                }

                // Add procedural quest generation to feature unlocks
                if (window.chromaShiftComplete.addFeatureButton) {
                    window.chromaShiftComplete.addFeatureButton(
                        'Procedural Quest Generation',
                        'Enable dynamic quest generation with infinite content',
                        toggleProceduralQuestPanel
                    );
                }
            }
        }

        // Initialize connections when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', connectAudioSystemToChromaShift);
        } else {
            connectAudioSystemToChromaShift();
        }
