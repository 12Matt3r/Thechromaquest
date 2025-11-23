// Quantum File System - Files existing in multiple states simultaneously
// Revolutionary data management with superposition storage

class QuantumFileSystem {
    constructor() {
        this.quantumFiles = new Map();
        this.entanglementMap = new Map();
        this.probabilityStates = new Map();
        this.observerEffect = false;
        this.quantumCoherence = 1.0;
        this.init();
    }

    init() {
        console.log('🌌 Quantum File System initialized');
        this.createQuantumInterface();
        this.setupQuantumListeners();
        this.loadExistingFiles();
    }

    createQuantumInterface() {
        const qfsPanel = document.createElement('div');
        qfsPanel.id = 'quantum-file-system';
        qfsPanel.innerHTML = `
            <div class="qfs-container">
                <div class="qfs-header">
                    <div class="qfs-icon">⚛️</div>
                    <div class="qfs-title">Quantum File System</div>
                    <div class="qfs-controls">
                        <button class="qfs-btn" onclick="quantumFS.createFile()" title="Create Quantum File">⚡</button>
                        <button class="qfs-btn" onclick="quantumFS.collapseStates()" title="Collapse States">📐</button>
                        <button class="qfs-btn" onclick="quantumFS.entangleFiles()" title="Entangle Files">🔗</button>
                        <button class="qfs-close" onclick="quantumFS.hide()">✕</button>
                    </div>
                </div>
                <div class="qfs-content">
                    <div class="qfs-coherence-bar">
                        <div class="qfs-coherence-label">Quantum Coherence</div>
                        <div class="qfs-coherence-meter">
                            <div class="qfs-coherence-fill" id="qfs-coherence-fill" style="width: 100%"></div>
                        </div>
                        <div class="qfs-coherence-value" id="qfs-coherence-value">100%</div>
                    </div>
                    <div class="qfs-file-grid" id="qfs-file-grid">
                        <div class="qfs-placeholder">
                            <div class="qfs-placeholder-icon">⚛️</div>
                            <div class="qfs-placeholder-text">No quantum files yet</div>
                            <div class="qfs-placeholder-subtext">Create files that exist in multiple states simultaneously</div>
                        </div>
                    </div>
                    <div class="qfs-entanglement-network" id="qfs-entanglement-network">
                        <div class="qfs-network-header">Entanglement Network</div>
                        <div class="qfs-network-content" id="qfs-network-content">
                            <div class="qfs-network-placeholder">No entangled files</div>
                        </div>
                    </div>
                </div>
                <div class="qfs-status-bar">
                    <div class="qfs-status-item">
                        <span class="qfs-status-label">Superposition Files:</span>
                        <span class="qfs-status-value" id="qfs-superposition-count">0</span>
                    </div>
                    <div class="qfs-status-item">
                        <span class="qfs-status-label">Entangled Pairs:</span>
                        <span class="qfs-status-value" id="qfs-entangled-count">0</span>
                    </div>
                    <div class="qfs-status-item">
                        <span class="qfs-status-label">Collapse Events:</span>
                        <span class="qfs-status-value" id="qfs-collapse-count">0</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(qfsPanel);
    }

    setupQuantumListeners() {
        // Monitor for quantum events
        setInterval(() => {
            this.updateCoherence();
            this.processQuantumFluctuations();
        }, 2000);
    }

    async createFile(name = null) {
        const fileName = name || `Quantum_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const quantumFile = {
            id: `qf_${Date.now()}`,
            name: fileName,
            states: {
                probable: this.generateProbableStates(),
                observed: false,
                collapsed: null
            },
            content: {
                allStates: [],
                probability: {},
                entanglement: []
            },
            created: Date.now(),
            coherence: 1.0,
            phase: Math.random() * 2 * Math.PI
        };

        // Generate quantum content for multiple states
        for (let i = 0; i < 3; i++) {
            const state = {
                state: `State_${i}`,
                probability: (0.3 + Math.random() * 0.4), // 30-70% probability
                content: this.generateQuantumContent(fileName, i),
                amplitude: Math.sqrt(0.3 + Math.random() * 0.4) * Math.exp(1i * Math.random() * 2 * Math.PI)
            };
            quantumFile.content.allStates.push(state);
        }

        this.quantumFiles.set(quantumFile.id, quantumFile);
        this.probabilityStates.set(quantumFile.id, quantumFile.content.allStates);
        
        this.updateQuantumInterface();
        this.simulateQuantumFluctuation();
        
        console.log(`⚛️ Created quantum file: ${fileName} with ${quantumFile.content.allStates.length} states`);
    }

    generateProbableStates() {
        const states = [];
        for (let i = 0; i < 3; i++) {
            states.push({
                name: `Probable_${i + 1}`,
                likelihood: Math.random() * 0.8 + 0.1,
                outcome: this.generateProbableOutcome(),
                quantumSignature: this.generateQuantumSignature()
            });
        }
        return states;
    }

    generateProbableOutcome() {
        const outcomes = [
            'Data successfully accessed',
            'File exists in multiple dimensions',
            'Quantum entanglement detected',
            'Probability wave collapsed',
            'Reality layer shifted',
            'Consciousness interaction required'
        ];
        return outcomes[Math.floor(Math.random() * outcomes.length)];
    }

    generateQuantumSignature() {
        return Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    generateQuantumContent(filename, stateIndex) {
        const stateContents = [
            `File content for ${filename} in Primary Reality Layer (State ${stateIndex})`,
            `Alternative existence of ${filename} in Temporal Probability Space (State ${stateIndex})`,
            `Quantum superposition content for ${filename} in Dream Consciousness (State ${stateIndex})`
        ];
        return stateContents[stateIndex] || `Quantum content for ${filename}`;
    }

    async accessFile(fileId, observerIntent = 'read') {
        const file = this.quantumFiles.get(fileId);
        if (!file) return null;

        // Observer effect - accessing changes the quantum state
        file.states.observed = true;
        file.observerEffect = true;

        // Perform quantum measurement (collapse probability wave)
        const collapsedState = this.collapseWaveFunction(file);
        file.states.collapsed = collapsedState;

        // Update coherence (measurement disturbs quantum state)
        file.coherence *= 0.8; // Coherence reduced by observation
        this.updateCoherence();

        // Record collapse event
        this.incrementCollapseCounter();

        // Create entanglement effect
        this.createQuantumEntanglement(fileId);

        return {
            fileName: file.name,
            content: collapsedState.content,
            state: collapsedState.state,
            probability: collapsedState.probability,
            coherence: file.coherence,
            quantumSignature: this.generateQuantumSignature()
        };
    }

    collapseWaveFunction(file) {
        // Quantum measurement - randomly select state based on probability
        const states = file.content.allStates;
        const totalProbability = states.reduce((sum, state) => sum + state.probability, 0);
        const random = Math.random() * totalProbability;
        
        let cumulative = 0;
        for (const state of states) {
            cumulative += state.probability;
            if (random <= cumulative) {
                return state;
            }
        }
        
        return states[0]; // Fallback
    }

    async entangleFiles(fileId1, fileId2 = null) {
        if (!fileId2) {
            // Auto-select a random file for entanglement
            const files = Array.from(this.quantumFiles.keys());
            if (files.length < 2) {
                console.log('⚠️ Need at least 2 files for entanglement');
                return;
            }
            fileId2 = files.find(id => id !== fileId1) || files[1];
        }

        const file1 = this.quantumFiles.get(fileId1);
        const file2 = this.quantumFiles.get(fileId2);
        
        if (!file1 || !file2) return;

        // Create quantum entanglement
        const entanglement = {
            id: `ent_${Date.now()}`,
            files: [fileId1, fileId2],
            correlation: Math.random() * 0.8 + 0.2, // 20-100% correlation
            phaseLock: Math.random() * 2 * Math.PI,
            quantumState: 'entangled',
            created: Date.now()
        };

        this.entanglementMap.set(entanglement.id, entanglement);
        
        // Link files bidirectionally
        if (!file1.content.entanglement.includes(entanglement.id)) {
            file1.content.entanglement.push(entanglement.id);
        }
        if (!file2.content.entanglement.includes(entanglement.id)) {
            file2.content.entanglement.push(entanglement.id);
        }

        this.updateQuantumInterface();
        this.simulateQuantumFluctuation();
        
        console.log(`🔗 Entangled files ${file1.name} and ${file2.name} with ${(entanglement.correlation * 100).toFixed(1)}% correlation`);
    }

    createQuantumEntanglement(fileId) {
        // Find entangled files and simulate quantum correlation
        const file = this.quantumFiles.get(fileId);
        if (!file || !file.content.entanglement) return;

        file.content.entanglement.forEach(entanglementId => {
            const entanglement = this.entanglementMap.get(entanglementId);
            if (entanglement && entanglement.quantumState === 'entangled') {
                // Simulate quantum correlation effect
                this.simulateQuantumCorrelation(entanglement);
            }
        });
    }

    simulateQuantumCorrelation(entanglement) {
        const [fileId1, fileId2] = entanglement.files;
        const file1 = this.quantumFiles.get(fileId1);
        const file2 = this.quantumFiles.get(fileId2);
        
        if (file1 && file2) {
            // Quantum correlation affects both files
            const correlationEffect = entanglement.correlation * 0.1;
            file1.coherence = Math.min(1.0, file1.coherence + correlationEffect);
            file2.coherence = Math.min(1.0, file2.coherence + correlationEffect);
            
            console.log(`⚛️ Quantum correlation: ${file1.name} ↔ ${file2.name} (${(entanglement.correlation * 100).toFixed(1)}%)`);
        }
    }

    collapseStates() {
        // Force collapse of all quantum states
        let collapseCount = 0;
        
        this.quantumFiles.forEach((file, fileId) => {
            if (file.states.observed && !file.states.collapsed) {
                this.accessFile(fileId, 'forced_collapse');
                collapseCount++;
            }
        });
        
        this.updateCoherence();
        console.log(`📐 Collapsed ${collapseCount} quantum states`);
    }

    updateCoherence() {
        // Calculate overall quantum coherence
        let totalCoherence = 0;
        let fileCount = 0;
        
        this.quantumFiles.forEach(file => {
            totalCoherence += file.coherence;
            fileCount++;
        });
        
        const averageCoherence = fileCount > 0 ? totalCoherence / fileCount : 1.0;
        this.quantumCoherence = averageCoherence;
        
        // Update UI
        const coherenceFill = document.getElementById('qfs-coherence-fill');
        const coherenceValue = document.getElementById('qfs-coherence-value');
        
        if (coherenceFill && coherenceValue) {
            const coherencePercent = (averageCoherence * 100).toFixed(1);
            coherenceFill.style.width = `${coherencePercent}%`;
            coherenceFill.style.background = `linear-gradient(90deg, #4caf50, #2196f3, #9c27b0)`;
            coherenceValue.textContent = `${coherencePercent}%`;
            
            // Change color based on coherence level
            if (averageCoherence > 0.7) {
                coherenceFill.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.5)';
            } else if (averageCoherence > 0.3) {
                coherenceFill.style.boxShadow = '0 0 10px rgba(33, 150, 243, 0.5)';
            } else {
                coherenceFill.style.boxShadow = '0 0 10px rgba(156, 39, 176, 0.5)';
            }
        }
    }

    processQuantumFluctuations() {
        // Simulate quantum decoherence over time
        this.quantumFiles.forEach(file => {
            if (file.coherence > 0.1) {
                file.coherence *= 0.999; // Very slight decoherence
            }
        });
        
        this.updateCoherence();
    }

    simulateQuantumFluctuation() {
        // Visual quantum fluctuation effect
        const coherenceFill = document.getElementById('qfs-coherence-fill');
        if (coherenceFill) {
            coherenceFill.style.transform = 'scaleY(1.2)';
            setTimeout(() => {
                coherenceFill.style.transform = 'scaleY(1)';
            }, 200);
        }
    }

    incrementCollapseCounter() {
        const counter = document.getElementById('qfs-collapse-count');
        if (counter) {
            const current = parseInt(counter.textContent) || 0;
            counter.textContent = current + 1;
        }
    }

    updateQuantumInterface() {
        const fileGrid = document.getElementById('qfs-file-grid');
        const entanglementContent = document.getElementById('qfs-network-content');
        
        if (!fileGrid) return;

        // Clear existing content
        fileGrid.innerHTML = '';
        
        // Display quantum files
        if (this.quantumFiles.size === 0) {
            fileGrid.innerHTML = `
                <div class="qfs-placeholder">
                    <div class="qfs-placeholder-icon">⚛️</div>
                    <div class="qfs-placeholder-text">No quantum files yet</div>
                    <div class="qfs-placeholder-subtext">Create files that exist in multiple states simultaneously</div>
                </div>
            `;
        } else {
            this.quantumFiles.forEach(file => {
                const fileElement = this.createQuantumFileElement(file);
                fileGrid.appendChild(fileElement);
            });
        }

        // Update counters
        this.updateCounters();
        
        // Update entanglement network
        this.updateEntanglementNetwork();
    }

    createQuantumFileElement(file) {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'qfs-file';
        fileDiv.innerHTML = `
            <div class="qfs-file-header">
                <div class="qfs-file-icon">⚛️</div>
                <div class="qfs-file-name">${file.name}</div>
                <div class="qfs-file-states">${file.content.allStates.length} states</div>
            </div>
            <div class="qfs-file-preview">
                <div class="qfs-file-content">${file.content.allStates[0]?.content || 'Quantum content...'}</div>
                <div class="qfs-file-probability">
                    Coherence: ${(file.coherence * 100).toFixed(1)}%
                </div>
            </div>
            <div class="qfs-file-actions">
                <button class="qfs-action-btn" onclick="quantumFS.accessFile('${file.id}')" title="Access File">
                    📖
                </button>
                <button class="qfs-action-btn" onclick="quantumFS.entangleFiles('${file.id}')" title="Entangle">
                    🔗
                </button>
                <button class="qfs-action-btn" onclick="quantumFS.deleteFile('${file.id}')" title="Delete">
                    🗑️
                </button>
            </div>
            <div class="qfs-file-visualization">
                ${this.createQuantumVisualization(file)}
            </div>
        `;
        return fileDiv;
    }

    createQuantumVisualization(file) {
        const states = file.content.allStates;
        let viz = '<div class="qfs-states-bar">';
        
        states.forEach((state, index) => {
            const width = state.probability * 100;
            const hue = (index * 120) % 360; // Different color for each state
            viz += `<div class="qfs-state-bar" style="width: ${width}%; background: hsl(${hue}, 70%, 60%);" title="${state.state}: ${(state.probability * 100).toFixed(1)}%"></div>`;
        });
        
        viz += '</div>';
        return viz;
    }

    updateCounters() {
        const superpositionCount = document.getElementById('qfs-superposition-count');
        const entangledCount = document.getElementById('qfs-entangled-count');
        
        if (superpositionCount) {
            superpositionCount.textContent = this.quantumFiles.size;
        }
        
        if (entangledCount) {
            entangledCount.textContent = Math.floor(this.entanglementMap.size / 2); // Number of pairs
        }
    }

    updateEntanglementNetwork() {
        const networkContent = document.getElementById('qfs-network-content');
        if (!networkContent) return;

        if (this.entanglementMap.size === 0) {
            networkContent.innerHTML = '<div class="qfs-network-placeholder">No entangled files</div>';
        } else {
            let networkHTML = '';
            this.entanglementMap.forEach(entanglement => {
                const [fileId1, fileId2] = entanglement.files;
                const file1 = this.quantumFiles.get(fileId1);
                const file2 = this.quantumFiles.get(fileId2);
                
                if (file1 && file2) {
                    const correlation = (entanglement.correlation * 100).toFixed(1);
                    networkHTML += `
                        <div class="qfs-entanglement-pair">
                            <span class="qfs-file-ref">${file1.name}</span>
                            <span class="qfs-entanglement-symbol">⟷</span>
                            <span class="qfs-file-ref">${file2.name}</span>
                            <span class="qfs-correlation">(${correlation}%)</span>
                        </div>
                    `;
                }
            });
            networkContent.innerHTML = networkHTML;
        }
    }

    deleteFile(fileId) {
        const file = this.quantumFiles.get(fileId);
        if (!file) return;

        // Remove entanglements
        if (file.content.entanglement) {
            file.content.entanglement.forEach(entanglementId => {
                this.entanglementMap.delete(entanglementId);
            });
        }

        // Remove the file
        this.quantumFiles.delete(fileId);
        this.probabilityStates.delete(fileId);
        
        this.updateQuantumInterface();
        console.log(`🗑️ Deleted quantum file: ${file.name}`);
    }

    show() {
        const panel = document.getElementById('quantum-file-system');
        if (panel) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            panel.style.transform = 'scale(0.8)';
            setTimeout(() => {
                panel.style.opacity = '1';
                panel.style.transform = 'scale(1)';
            }, 10);
        }
    }

    hide() {
        const panel = document.getElementById('quantum-file-system');
        if (panel) {
            panel.style.opacity = '0';
            panel.style.transform = 'scale(0.8)';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }

    loadExistingFiles() {
        // Load from localStorage if available
        const saved = localStorage.getItem('quantum-file-system');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.quantumFiles = new Map(data.quantumFiles || []);
                this.entanglementMap = new Map(data.entanglementMap || []);
                this.updateQuantumInterface();
            } catch (e) {
                console.error('Failed to load quantum file system data:', e);
            }
        }
    }

    saveState() {
        // Save current state
        const data = {
            quantumFiles: Array.from(this.quantumFiles.entries()),
            entanglementMap: Array.from(this.entanglementMap.entries()),
            timestamp: Date.now()
        };
        localStorage.setItem('quantum-file-system', JSON.stringify(data));
    }
}

// Add CSS styles
const qfsStyles = `
    #quantum-file-system {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        height: 600px;
        background: linear-gradient(135deg, #0a0a2e 0%, #16213e 50%, #1a1a2e 100%);
        border: 2px solid #9c27b0;
        border-radius: 15px;
        box-shadow: 0 0 40px rgba(156, 39, 176, 0.4);
        z-index: 10000;
        font-family: 'Courier New', monospace;
        transition: all 0.3s ease;
        overflow: hidden;
    }

    .qfs-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .qfs-header {
        display: flex;
        align-items: center;
        padding: 15px;
        background: rgba(0, 0, 0, 0.4);
        border-bottom: 2px solid #9c27b0;
    }

    .qfs-icon {
        font-size: 24px;
        margin-right: 10px;
    }

    .qfs-title {
        flex: 1;
        color: #e1bee7;
        font-size: 18px;
        font-weight: bold;
    }

    .qfs-controls {
        display: flex;
        gap: 8px;
    }

    .qfs-btn {
        width: 36px;
        height: 36px;
        background: rgba(156, 39, 176, 0.2);
        border: 1px solid rgba(156, 39, 176, 0.4);
        border-radius: 6px;
        color: #e1bee7;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .qfs-btn:hover {
        background: rgba(156, 39, 176, 0.3);
        transform: translateY(-1px);
    }

    .qfs-close {
        background: rgba(244, 67, 54, 0.2);
        border: 1px solid rgba(244, 67, 54, 0.4);
        color: #ffcdd2;
    }

    .qfs-close:hover {
        background: rgba(244, 67, 54, 0.3);
    }

    .qfs-content {
        flex: 1;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        overflow-y: auto;
    }

    .qfs-coherence-bar {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        border: 1px solid rgba(156, 39, 176, 0.3);
    }

    .qfs-coherence-label {
        color: #e1bee7;
        font-weight: bold;
        min-width: 120px;
    }

    .qfs-coherence-meter {
        flex: 1;
        height: 20px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid rgba(156, 39, 176, 0.3);
    }

    .qfs-coherence-fill {
        height: 100%;
        background: linear-gradient(90deg, #4caf50, #2196f3, #9c27b0);
        border-radius: 10px;
        transition: all 0.3s ease;
    }

    .qfs-coherence-value {
        color: #e1bee7;
        font-weight: bold;
        min-width: 50px;
        text-align: right;
    }

    .qfs-file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
        flex: 1;
    }

    .qfs-placeholder {
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        text-align: center;
        color: #9c27b0;
    }

    .qfs-placeholder-icon {
        font-size: 48px;
        margin-bottom: 15px;
    }

    .qfs-placeholder-text {
        font-size: 18px;
        margin-bottom: 8px;
        color: #e1bee7;
    }

    .qfs-placeholder-subtext {
        font-size: 14px;
        color: #ba68c8;
    }

    .qfs-file {
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(156, 39, 176, 0.3);
        border-radius: 8px;
        padding: 12px;
        transition: all 0.3s ease;
    }

    .qfs-file:hover {
        border-color: rgba(156, 39, 176, 0.6);
        box-shadow: 0 4px 12px rgba(156, 39, 176, 0.2);
    }

    .qfs-file-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
    }

    .qfs-file-icon {
        font-size: 16px;
    }

    .qfs-file-name {
        flex: 1;
        color: #e1bee7;
        font-weight: bold;
        font-size: 14px;
    }

    .qfs-file-states {
        background: rgba(156, 39, 176, 0.3);
        color: #e1bee7;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 11px;
    }

    .qfs-file-preview {
        margin-bottom: 8px;
    }

    .qfs-file-content {
        color: #f3e5f5;
        font-size: 12px;
        margin-bottom: 4px;
        line-height: 1.3;
    }

    .qfs-file-probability {
        color: #ba68c8;
        font-size: 11px;
    }

    .qfs-file-actions {
        display: flex;
        gap: 4px;
        justify-content: center;
        margin-bottom: 8px;
    }

    .qfs-action-btn {
        width: 28px;
        height: 28px;
        background: rgba(156, 39, 176, 0.2);
        border: 1px solid rgba(156, 39, 176, 0.3);
        border-radius: 4px;
        color: #e1bee7;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s ease;
    }

    .qfs-action-btn:hover {
        background: rgba(156, 39, 176, 0.3);
        transform: scale(1.05);
    }

    .qfs-file-visualization {
        margin-top: 8px;
    }

    .qfs-states-bar {
        display: flex;
        height: 6px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 3px;
        overflow: hidden;
    }

    .qfs-state-bar {
        transition: all 0.3s ease;
    }

    .qfs-entanglement-network {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(156, 39, 176, 0.3);
        border-radius: 8px;
        padding: 10px;
        max-height: 120px;
        overflow-y: auto;
    }

    .qfs-network-header {
        color: #e1bee7;
        font-weight: bold;
        margin-bottom: 8px;
        font-size: 14px;
    }

    .qfs-network-placeholder {
        color: #9c27b0;
        font-style: italic;
        text-align: center;
        padding: 20px;
    }

    .qfs-entanglement-pair {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 0;
        border-bottom: 1px solid rgba(156, 39, 176, 0.1);
    }

    .qfs-entanglement-pair:last-child {
        border-bottom: none;
    }

    .qfs-file-ref {
        color: #f3e5f5;
        font-size: 12px;
    }

    .qfs-entanglement-symbol {
        color: #9c27b0;
        font-size: 14px;
        font-weight: bold;
    }

    .qfs-correlation {
        color: #ba68c8;
        font-size: 11px;
        font-style: italic;
    }

    .qfs-status-bar {
        padding: 10px 15px;
        background: rgba(0, 0, 0, 0.4);
        border-top: 1px solid rgba(156, 39, 176, 0.3);
        display: flex;
        justify-content: space-around;
    }

    .qfs-status-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
    }

    .qfs-status-label {
        color: #9c27b0;
        font-size: 11px;
    }

    .qfs-status-value {
        color: #e1bee7;
        font-weight: bold;
        font-size: 14px;
    }
`;

// Inject styles
const qfsStyleSheet = document.createElement('style');
qfsStyleSheet.textContent = qfsStyles;
document.head.appendChild(qfsStyleSheet);

// Export for global use
window.QuantumFileSystem = QuantumFileSystem;