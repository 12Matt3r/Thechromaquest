// chromashift-monkeypaw.js
// Monkey Paw Game Integration for ChromaShift Dreamscape

import { 
    getTwistedWish, 
    getFixedWish, 
    getSummary, 
    generateWishForPlayer, 
    evaluateConsequence,
    generateDreamWish,
    interpretDreamConsequence
} from './chromashift-monkeypaw-api.js';
import { gameState, showToast } from './chromashift-state-ui.js';
import { chromaRecords } from './chromashift-records.js';

class ChromaShiftMonkeyPaw {
    constructor() {
        this.wishesGranted = 0;
        this.TOTAL_WISHES = 5;
        this.lastConsequence = "";
        this.lastDreamConsequence = "";
        this.isProcessing = false;
        
        // Paw mode properties
        this.isWisherMode = true;
        this.currentWish = "";
        this.pawScore = 0;
        this.totalEvaluations = 0;
        
        // Integration properties
        this.pawAppearedInDream = false;
        this.pawCooldown = 0;
        
        this.dom = {};
        this.init();
    }

    init() {
        this.createPawInterface();
        this.addEventListeners();
        this.updateWishesDisplay();
        this.addAccessibilityFeatures();
    }

    createPawInterface() {
        // Create the monkey paw interface elements
        const interfaceContainer = document.getElementById('monkey-paw-interface');
        
        // Create monkey paw container
        const pawContainer = document.createElement('div');
        pawContainer.id = 'monkey-paw-container';
        pawContainer.className = 'hidden';
        
        pawContainer.innerHTML = `
            <div id="monkey-paw-visual">
                <div id="monkey-paw" class="monkey-paw" tabindex="0" role="button" aria-label="The cursed monkey's paw">
                    <div class="paw-fingers"></div>
                    <div class="paw-palm"></div>
                    <div class="paw-energy"></div>
                </div>
            </div>
            
            <div id="monkey-paw-controls">
                <div id="wish-form">
                    <textarea 
                        id="wish-input" 
                        placeholder="Speak your desire to the monkey's paw..."
                        aria-label="Enter your wish"
                        maxlength="500"
                    ></textarea>
                    <div class="button-group">
                        <button id="submit-wish-btn" class="btn-primary">Make a Wish</button>
                        <button id="fix-wish-btn" class="btn-secondary">✨ Fix Wish</button>
                        <button id="summarize-btn" class="btn-tertiary hidden">Summarize</button>
                    </div>
                </div>
                
                <div id="mode-controls">
                    <button id="mode-toggle-btn" class="mode-toggle">
                        <span id="wisher-icon">👤</span>
                        <span id="paw-icon" class="hidden">🐾</span>
                        <span id="mode-indicator">WISHER MODE</span>
                    </button>
                    
                    <div id="wishes-left-text">5 wishes remain...</div>
                    <div id="paw-score" class="hidden">Malevolence Score: 0/100</div>
                </div>
                
                <div id="current-wish-display" class="hidden">
                    <h4>Victim's Desire:</h4>
                    <div id="current-wish-text"></div>
                    <button id="new-wish-btn" class="btn-secondary">New Victim</button>
                </div>
                
                <div id="consequences-log">
                    <h4>Wish Consequences:</h4>
                    <div class="log-entries" role="list"></div>
                </div>
            </div>
            
            <!-- Modal for wish results -->
            <div id="result-modal" class="modal hidden">
                <div class="modal-content">
                    <span class="close-btn" id="close-modal-btn">&times;</span>
                    <h2 id="result-title">The Wish is Granted...</h2>
                    <div id="result-text"></div>
                    <div id="summary-text" class="summary hidden"></div>
                    <button id="close-modal-btn-bottom" class="btn-primary">Continue Dream</button>
                </div>
            </div>
            
            <!-- Media controls -->
            <div id="media-controls-paw">
                <button id="mute-btn" title="Toggle sound">
                    <span id="unmuted-icon">🔊</span>
                    <span id="muted-icon" class="hidden">🔇</span>
                </button>
                <button id="tts-btn" title="Toggle text-to-speech">
                    <span id="tts-on-icon">🗣️</span>
                    <span id="tts-off-icon" class="hidden">🤐</span>
                </button>
            </div>
        `;
        
        if (interfaceContainer) {
            interfaceContainer.appendChild(pawContainer);
        } else {
            // If no specific container, add to body
            document.body.appendChild(pawContainer);
        }
        
        // Store DOM references
        this.dom = {
            monkeyPaw: document.getElementById('monkey-paw'),
            wishForm: document.getElementById('wish-form'),
            wishInput: document.getElementById('wish-input'),
            submitWishBtn: document.getElementById('submit-wish-btn'),
            fixWishBtn: document.getElementById('fix-wish-btn'),
            summarizeBtn: document.getElementById('summarize-btn'),
            wishesLeftText: document.getElementById('wishes-left-text'),
            resultModal: document.getElementById('result-modal'),
            resultTitle: document.getElementById('result-title'),
            resultText: document.getElementById('result-text'),
            summaryText: document.getElementById('summary-text'),
            closeModalBtn: document.getElementById('close-modal-btn'),
            closeModalBtnBottom: document.getElementById('close-modal-btn-bottom'),
            consequencesLog: document.getElementById('consequences-log'),
            logEntries: document.getElementById('consequences-log').querySelector('.log-entries'),
            muteBtn: document.getElementById('mute-btn'),
            unmutedIcon: document.getElementById('unmuted-icon'),
            mutedIcon: document.getElementById('muted-icon'),
            ttsBtn: document.getElementById('tts-btn'),
            ttsOnIcon: document.getElementById('tts-on-icon'),
            ttsOffIcon: document.getElementById('tts-off-icon'),
            modeToggleBtn: document.getElementById('mode-toggle-btn'),
            wisherIcon: document.getElementById('wisher-icon'),
            pawIcon: document.getElementById('paw-icon'),
            modeIndicator: document.getElementById('mode-indicator'),
            pawScore: document.getElementById('paw-score'),
            currentWishDisplay: document.getElementById('current-wish-display'),
            currentWishText: document.getElementById('current-wish-text'),
            newWishBtn: document.getElementById('new-wish-btn'),
        };
    }

    addAccessibilityFeatures() {
        if (!this.dom.wishInput) return;
        
        // Add ARIA labels
        this.dom.wishInput.setAttribute('aria-label', 'Enter your wish');
        this.dom.submitWishBtn.setAttribute('aria-label', 'Submit your wish to the monkey\'s paw');
        this.dom.fixWishBtn.setAttribute('aria-label', 'Analyze and fix potential issues with your wish');
        this.dom.muteBtn.setAttribute('aria-label', 'Toggle sound on/off');
        this.dom.ttsBtn.setAttribute('aria-label', 'Toggle text-to-speech on/off');
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        if (!this.dom.submitWishBtn.disabled) {
                            this.handleWishSubmit(e);
                        }
                        break;
                    case 'm':
                        e.preventDefault();
                        this.handleMuteToggle();
                        break;
                    case 't':
                        e.preventDefault();
                        this.handleTTSToggle();
                        break;
                }
            }
        });
    }

    addEventListeners() {
        if (!this.dom.wishInput) return;

        // Debounced input handling
        this.dom.wishInput.addEventListener('input', () => {
            this.handleInputChange();
        });

        this.dom.wishInput.addEventListener('keydown', () => {
            if (this.audioManager) {
                this.audioManager.playKeyClick();
            }
        });
        
        this.dom.closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.dom.closeModalBtnBottom.addEventListener('click', () => {
            this.closeModal();
        });
        
        if (this.dom.wishForm) {
            this.dom.wishForm.addEventListener('submit', (e) => this.handleWishSubmit(e));
        }
        
        if (this.dom.fixWishBtn) {
            this.dom.fixWishBtn.addEventListener('click', () => this.handleWishFix());
        }
        
        if (this.dom.muteBtn) {
            this.dom.muteBtn.addEventListener('click', () => this.handleMuteToggle());
        }
        
        if (this.dom.summarizeBtn) {
            this.dom.summarizeBtn.addEventListener('click', () => this.handleSummarize());
        }
        
        if (this.dom.ttsBtn) {
            this.dom.ttsBtn.addEventListener('click', () => this.handleTTSToggle());
        }

        // Modal click outside to close
        if (this.dom.resultModal) {
            this.dom.resultModal.addEventListener('click', (e) => {
                if (e.target === this.dom.resultModal) {
                    this.closeModal();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.dom.resultModal && this.dom.resultModal.classList.contains('visible')) {
                this.closeModal();
            }
        });

        if (this.dom.modeToggleBtn) {
            this.dom.modeToggleBtn.addEventListener('click', () => this.toggleMode());
        }
        
        if (this.dom.newWishBtn) {
            this.dom.newWishBtn.addEventListener('click', () => this.generateNewWish());
        }

        // Paw click to show/hide interface
        if (this.dom.monkeyPaw) {
            this.dom.monkeyPaw.addEventListener('click', () => this.togglePawInterface());
        }
    }

    // Integration with ChromaShift engine
    checkForPawAppearance() {
        // 5% chance per scene that the monkey paw appears as a dream anomaly
        if (this.pawCooldown > 0) {
            this.pawCooldown--;
            return;
        }
        
        if (Math.random() < 0.05 && !this.pawAppearedInDream) {
            this.spawnPawInDream();
            this.pawCooldown = 10; // Don't spawn again for 10 scenes
        }
    }

    spawnPawInDream() {
        this.pawAppearedInDream = true;
        
        // Show the monkey paw in the interface
        const pawContainer = document.getElementById('monkey-paw-container');
        if (pawContainer) {
            pawContainer.classList.remove('hidden');
        }
        
        // Log as an anomaly
        try {
            chromaRecords.createAnomaly({
                title: 'Monkey Paw Manifestation',
                text: 'The cursed monkey\'s paw appeared in the dream, pulsing with malevolent energy.',
                anomaly_type: 'manifestation'
            });
        } catch (error) {
            console.warn('Failed to log monkey paw anomaly:', error);
        }
        
        showToast('A cursed artifact manifests in the dream...');
        
        // Add visual effect to the paw
        if (this.dom.monkeyPaw) {
            this.dom.monkeyPaw.classList.add('appearing');
            setTimeout(() => {
                this.dom.monkeyPaw.classList.remove('appearing');
            }, 2000);
        }
    }

    togglePawInterface() {
        const pawContainer = document.getElementById('monkey-paw-container');
        if (pawContainer) {
            pawContainer.classList.toggle('hidden');
            if (!pawContainer.classList.contains('hidden')) {
                this.dom.wishInput?.focus();
            }
        }
    }

    handleInputChange() {
        if (!this.dom.wishInput || !this.dom.submitWishBtn) return;
        
        const hasText = this.dom.wishInput.value.trim().length > 0;
        const canInteract = !this.isProcessing && this.wishesGranted < this.TOTAL_WISHES;
        
        this.dom.submitWishBtn.disabled = !hasText || !canInteract;
        this.dom.fixWishBtn.disabled = !hasText || !canInteract;
        
        this.updateInputFeedback();
    }

    updateInputFeedback() {
        if (!this.dom.wishInput) return;
        
        const text = this.dom.wishInput.value.trim();
        const charCount = text.length;
        
        // Add visual feedback for wish length
        if (charCount > 400) {
            this.dom.wishInput.style.borderColor = '#ff0000';
        } else if (charCount > 200) {
            this.dom.wishInput.style.borderColor = '#ff9900';
        } else if (charCount > 50) {
            this.dom.wishInput.style.borderColor = '#ffcc00';
        } else {
            this.dom.wishInput.style.borderColor = '#666';
        }
    }

    async handleMuteToggle() {
        // Implementation for audio management
        const isMuted = this.audioManager ? this.audioManager.toggleMute() : false;
        if (this.dom.unmutedIcon && this.dom.mutedIcon) {
            this.dom.unmutedIcon.classList.toggle('hidden', isMuted);
            this.dom.mutedIcon.classList.toggle('hidden', !isMuted);
        }
        showToast(isMuted ? 'Sound muted' : 'Sound enabled');
    }

    async handleTTSToggle() {
        // Implementation for TTS management
        const ttsEnabled = this.audioManager ? this.audioManager.toggleTTS() : false;
        if (this.dom.ttsOnIcon && this.dom.ttsOffIcon) {
            this.dom.ttsOnIcon.classList.toggle('hidden', !ttsEnabled);
            this.dom.ttsOffIcon.classList.toggle('hidden', ttsEnabled);
        }
        showToast(ttsEnabled ? 'Text-to-speech enabled' : 'Text-to-speech disabled');
    }

    updateWishesDisplay() {
        if (!this.dom.wishesLeftText) return;
        
        const remaining = this.TOTAL_WISHES - this.wishesGranted;
        this.dom.wishesLeftText.textContent = remaining > 1 ? `${remaining} wishes remain...` : 
            remaining === 1 ? `1 wish remains...` : `No wishes remain.`;
        
        this.dom.wishesLeftText.setAttribute('aria-live', 'polite');
    }

    async handleWishSubmit(e) {
        e.preventDefault();
        if (this.isProcessing) return;
        
        if (this.isWisherMode) {
            await this.handleWisherSubmit();
        } else {
            await this.handlePawSubmit();
        }
    }

    async handleWisherSubmit() {
        if (this.wishesGranted >= this.TOTAL_WISHES) {
            this.showResult("The paw is still. Its power is spent.", "Powerless");
            return;
        }
        
        if (!this.dom.wishInput) return;
        
        const wishText = this.dom.wishInput.value.trim();
        if (!wishText) return;

        this.isProcessing = true;
        
        try {
            this.setButtonsDisabled(true);
            if (this.dom.submitWishBtn) {
                this.dom.submitWishBtn.textContent = "Granting...";
            }
            
            this.showResult("The ancient paw stirs with malevolent energy...", "Channeling Dark Magic...", true);
            
            // Generate dream-contextualized wish and consequence
            const dreamWish = await generateDreamWish(wishText);
            const [consequence, dreamConsequence] = await Promise.all([
                getTwistedWish(wishText),
                getTwistedWish(wishText).then(result => interpretDreamConsequence(result))
            ]);
            
            this.lastConsequence = consequence;
            this.lastDreamConsequence = dreamConsequence;
            
            if (this.dom.monkeyPaw) {
                this.dom.monkeyPaw.classList.add('fist');
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Display both the dark consequence and the dream interpretation
            const resultText = `
                <div class="consequence-section">
                    <h3 class="consequence-title">The Wish is Granted...</h3>
                    <p class="dark-consequence">${this.lastConsequence}</p>
                </div>
                <div class="consequence-section dream-section">
                    <h3 class="consequence-title">In the Dream's Mirror:</h3>
                    <p class="dream-consequence">${this.lastDreamConsequence}</p>
                </div>
            `;
            
            this.showResult(resultText, "The Dark Gift");
            
            // Add to log with both interpretations
            const summaryResult = await getSummary(this.lastConsequence);
            this.addToLog(wishText, summaryResult, this.lastDreamConsequence);

            this.wishesGranted++;
            if (this.dom.monkeyPaw) {
                this.dom.monkeyPaw.classList.add(`wished-${this.wishesGranted}`);
            }
            
            // Log as anomaly if the consequence is particularly dark
            if (this.wishesGranted > 2) {
                try {
                    await chromaRecords.createAnomaly({
                        title: `Wish ${this.wishesGranted}: ${wishText.substring(0, 30)}...`,
                        text: `Dark consequence: ${this.lastConsequence.substring(0, 150)}...`,
                        anomaly_type: 'wish'
                    });
                } catch (anomalyError) {
                    console.warn('Failed to log wish anomaly:', anomalyError);
                }
            }
            
        } catch (error) {
            console.error('Error processing wish:', error);
            this.showResult("The paw recoils from an unseen force...", "Error");
            showToast('Something went wrong. Please try again.');
        } finally {
            this.isProcessing = false;
        }
    }

    async handlePawSubmit() {
        if (!this.dom.wishInput || !this.currentWish) return;
        
        const consequenceText = this.dom.wishInput.value.trim();
        if (!consequenceText) return;

        this.isProcessing = true;
        
        try {
            this.setButtonsDisabled(true);
            if (this.dom.submitWishBtn) {
                this.dom.submitWishBtn.textContent = "Evaluating...";
            }
            
            this.showResult("The ancient powers judge your malevolence...", "Assessing Your Cruelty...", true);
            
            const evaluation = await evaluateConsequence(this.currentWish, consequenceText);
            
            if (this.dom.monkeyPaw) {
                this.dom.monkeyPaw.classList.add('fist');
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update score
            this.totalEvaluations++;
            this.pawScore = Math.round((this.pawScore * (this.totalEvaluations - 1) + evaluation.score) / this.totalEvaluations);
            if (this.dom.pawScore) {
                this.dom.pawScore.textContent = `Malevolence Score: ${this.pawScore}/100 (Grade: ${evaluation.grade})`;
            }
            
            const resultText = `
                <div class="mb-4">
                    <h3 class="text-xl font-bold text-purple-400 mb-2">Your Twisted Consequence:</h3>
                    <p class="mb-4 italic">"${consequenceText}"</p>
                    
                    <div class="border-t border-purple-600 pt-4">
                        <h4 class="text-lg font-bold text-purple-300 mb-2">Judgment: ${evaluation.score}/100 (${evaluation.grade})</h4>
                        <p>${evaluation.feedback}</p>
                    </div>
                </div>
            `;
            
            this.showResult(resultText, "The Paw's Judgment");
            
            // Add to log
            this.addToPawLog(this.currentWish, consequenceText, evaluation.score);
            
        } catch (error) {
            console.error('Error processing consequence:', error);
            this.showResult("The ancient powers reject your offering...", "Error");
            showToast('Something went wrong. Please try again.');
        } finally {
            this.isProcessing = false;
        }
    }

    addToLog(wishText, summary, dreamConsequence) {
        if (!this.dom.logEntries) return;
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <strong class="text-purple-200">Wish ${this.wishesGranted + 1}:</strong> "${wishText}" 
            <br><em class="dream-echo">Dream: ${dreamConsequence}</em>
            <br><span class="summary">${summary.replace('In short: ', '')}</span>
        `;
        logEntry.setAttribute('tabindex', '0');
        logEntry.setAttribute('role', 'listitem');
        this.dom.logEntries.prepend(logEntry);
        
        // Limit log entries for performance
        const entries = this.dom.logEntries.children;
        if (entries.length > 8) {
            entries[entries.length - 1].remove();
        }
    }

    addToPawLog(wish, consequence, score) {
        if (!this.dom.logEntries) return;
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <strong class="text-purple-200">Victim:</strong> "${wish}" <br>
            <strong class="text-red-300">Your Curse:</strong> "${consequence}" 
            <span class="text-purple-400">(${score}/100)</span>
        `;
        logEntry.setAttribute('tabindex', '0');
        logEntry.setAttribute('role', 'listitem');
        this.dom.logEntries.prepend(logEntry);
        
        // Limit log entries for performance
        const entries = this.dom.logEntries.children;
        if (entries.length > 8) {
            entries[entries.length - 1].remove();
        }
    }

    setButtonsDisabled(disabled) {
        if (this.dom.submitWishBtn) this.dom.submitWishBtn.disabled = disabled;
        if (this.dom.fixWishBtn) this.dom.fixWishBtn.disabled = disabled;
    }

    async handleWishFix() {
        if (!this.dom.wishInput || !this.dom.fixWishBtn) return;
        
        const wishText = this.dom.wishInput.value.trim();
        if (!wishText) return;
        
        this.dom.fixWishBtn.disabled = true;
        this.dom.fixWishBtn.textContent = "Analyzing...";
        
        this.showResult("The paw writhes, scrutinizing your words for loopholes...", "Analyzing Wish Safety...", true);
        
        try {
            const fixedWish = await getFixedWish(wishText);
            this.dom.wishInput.value = fixedWish.replace(/<br>/g, '\n');
            this.dom.resultModal.classList.remove('visible');
            
            this.dom.fixWishBtn.disabled = false;
            this.dom.fixWishBtn.textContent = "✨ Fix Wish";
        } catch (error) {
            console.error('Error fixing wish:', error);
            this.dom.fixWishBtn.disabled = false;
            this.dom.fixWishBtn.textContent = "✨ Fix Wish";
            showToast('Analysis failed. The paw remains unpredictable.');
        }
    }

    async handleSummarize() {
        if (!this.dom.summarizeBtn || !this.lastConsequence) return;
        
        this.dom.summarizeBtn.disabled = true;
        try {
            const summary = await getSummary(this.lastConsequence);
            if (this.dom.summaryText) {
                this.dom.summaryText.innerHTML = summary;
                this.dom.summaryText.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error getting summary:', error);
        } finally {
            this.dom.summarizeBtn.disabled = false;
        }
    }

    async toggleMode() {
        this.isWisherMode = !this.isWisherMode;
        
        // Update UI elements
        if (this.dom.wisherIcon) this.dom.wisherIcon.classList.toggle('hidden', !this.isWisherMode);
        if (this.dom.pawIcon) this.dom.pawIcon.classList.toggle('hidden', this.isWisherMode);
        if (this.dom.modeIndicator) this.dom.modeIndicator.textContent = this.isWisherMode ? 'WISHER MODE' : 'PAW MODE';
        
        // Show/hide appropriate elements
        if (this.dom.wishesLeftText) this.dom.wishesLeftText.classList.toggle('hidden', !this.isWisherMode);
        if (this.dom.pawScore) this.dom.pawScore.classList.toggle('hidden', this.isWisherMode);
        if (this.dom.currentWishDisplay) this.dom.currentWishDisplay.classList.toggle('hidden', this.isWisherMode);
        if (this.dom.fixWishBtn) this.dom.fixWishBtn.classList.toggle('hidden', !this.isWisherMode);
        if (this.dom.newWishBtn) this.dom.newWishBtn.classList.toggle('hidden', this.isWisherMode);
        
        // Update placeholders and button text
        if (this.isWisherMode) {
            if (this.dom.wishInput) this.dom.wishInput.placeholder = "Speak your desire...";
            if (this.dom.submitWishBtn) this.dom.submitWishBtn.textContent = "Make a Wish";
            this.resetWisherMode();
        } else {
            if (this.dom.wishInput) this.dom.wishInput.placeholder = "Craft your malevolent consequence...";
            if (this.dom.submitWishBtn) this.dom.submitWishBtn.textContent = "Curse the Wisher";
            await this.generateNewWish();
        }
        
        showToast(`Switched to ${this.isWisherMode ? 'Wisher' : 'Paw'} Mode`);
    }

    async generateNewWish() {
        if (!this.dom.newWishBtn || !this.dom.currentWishText) return;
        
        this.dom.newWishBtn.disabled = true;
        this.dom.newWishBtn.textContent = "Summoning...";
        
        try {
            this.currentWish = await generateWishForPlayer();
            this.dom.currentWishText.textContent = this.currentWish;
            this.dom.newWishBtn.disabled = false;
            this.dom.newWishBtn.textContent = "New Victim";
            
            // Clear previous input
            if (this.dom.wishInput) {
                this.dom.wishInput.value = "";
                this.handleInputChange();
            }
        } catch (error) {
            console.error('Error generating wish:', error);
            this.dom.newWishBtn.disabled = false;
            this.dom.newWishBtn.textContent = "New Victim";
        }
    }

    resetWisherMode() {
        this.wishesGranted = 0;
        if (this.dom.monkeyPaw) {
            this.dom.monkeyPaw.className = '';
        }
        if (this.dom.wishInput) {
            this.dom.wishInput.disabled = false;
            this.dom.wishInput.value = '';
        }
        this.updateWishesDisplay();
        this.handleInputChange();
    }

    closeModal() {
        if (this.dom.resultModal) {
            this.dom.resultModal.classList.remove('visible');
        }
        
        if (this.isWisherMode) {
            this.resetAfterWish();
        } else {
            this.resetAfterPawJudgment();
        }
    }

    resetAfterPawJudgment() {
        if (this.dom.monkeyPaw) {
            this.dom.monkeyPaw.classList.remove('fist');
        }
        if (this.dom.wishInput) {
            this.dom.wishInput.value = '';
        }
        if (this.dom.submitWishBtn) {
            this.dom.submitWishBtn.textContent = "Curse the Wisher";
        }
        this.setButtonsDisabled(false);
        if (this.dom.newWishBtn) {
            this.dom.newWishBtn.disabled = false;
        }
        this.handleInputChange();
    }

    resetAfterWish() {
        if (this.dom.monkeyPaw) {
            this.dom.monkeyPaw.classList.remove('fist');
        }
        if (this.dom.wishInput) {
            this.dom.wishInput.value = '';
        }
        if (this.dom.submitWishBtn) {
            this.dom.submitWishBtn.textContent = "Make a Wish";
        }
        if (this.dom.fixWishBtn) {
            this.dom.fixWishBtn.textContent = "✨ Fix Wish";
        }
        this.updateWishesDisplay();
        
        if (this.wishesGranted >= this.TOTAL_WISHES) {
            if (this.dom.wishInput) {
                this.dom.wishInput.placeholder = "The paw is still... its power spent.";
                this.dom.wishInput.disabled = true;
            }
            this.setButtonsDisabled(true);
        } else {
            this.setButtonsDisabled(true);
            if (this.dom.wishInput) {
                this.dom.wishInput.focus();
            }
        }
    }

    showResult(text, title, isLoading = false) {
        if (!this.dom.resultTitle || !this.dom.resultText) return;
        
        this.dom.resultTitle.textContent = title;
        
        if (this.dom.resultTitle) {
            this.dom.resultTitle.classList.toggle('flicker', title === "The Wish is Granted...");
        }
        
        if (isLoading) {
            this.dom.resultText.innerHTML = `<div class="loading-text">${text}</div>`;
        } else {
            this.dom.resultText.innerHTML = text;
        }
        
        if (this.dom.summaryText) {
            this.dom.summaryText.innerHTML = "";
            this.dom.summaryText.classList.add('hidden');
        }
        
        if (this.dom.resultModal) {
            this.dom.resultModal.classList.add('visible');
        }

        const isPostWish = !isLoading && title === "The Wish is Granted...";
        if (this.dom.summarizeBtn) {
            this.dom.summarizeBtn.style.display = isPostWish ? 'inline-block' : 'none';
            this.dom.summarizeBtn.disabled = false;
        }
        
        if (this.dom.closeModalBtnBottom) {
            this.dom.closeModalBtnBottom.style.display = isPostWish ? 'inline-block' : 'none';
        }
        
        // Focus management for accessibility
        if (isPostWish) {
            setTimeout(() => this.dom.closeModalBtnBottom?.focus(), 100);
        }
    }

    // Public methods for external integration
    isVisible() {
        const pawContainer = document.getElementById('monkey-paw-container');
        return pawContainer && !pawContainer.classList.contains('hidden');
    }

    show() {
        const pawContainer = document.getElementById('monkey-paw-container');
        if (pawContainer) {
            pawContainer.classList.remove('hidden');
        }
    }

    hide() {
        const pawContainer = document.getElementById('monkey-paw-container');
        if (pawContainer) {
            pawContainer.classList.add('hidden');
        }
    }

    // Get current state for integration
    getState() {
        return {
            wishesGranted: this.wishesGranted,
            totalWishes: this.TOTAL_WISHES,
            isWisherMode: this.isWisherMode,
            pawScore: this.pawScore,
            totalEvaluations: this.totalEvaluations,
            isVisible: this.isVisible(),
            currentWish: this.currentWish
        };
    }
}

// Create global instance
let chromaShiftMonkeyPaw = null;

// Initialize when DOM is ready
function initChromaShiftMonkeyPaw() {
    if (!chromaShiftMonkeyPaw) {
        chromaShiftMonkeyPaw = new ChromaShiftMonkeyPaw();
    }
    return chromaShiftMonkeyPaw;
}

// Export for integration
export { initChromaShiftMonkeyPaw, chromaShiftMonkeyPaw };

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChromaShiftMonkeyPaw);
    } else {
        initChromaShiftMonkeyPaw();
    }
}