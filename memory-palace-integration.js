// Memory Palace Integration - File organization based on memory techniques
// Visual association mapping and subconscious file discovery using Method of Loci

class MemoryPalaceIntegration {
    constructor() {
        this.palaceStructure = {};
        this.associationMap = new Map();
        this.subconsciousFiles = new Set();
        this.memoryTechniques = {
            methodOfLoci: true,
            spatialChunking: true,
            visualEncoding: true,
            emotionalTagging: true
        };
        this.palaceComplexity = 3;
        this.associationStrength = 0.7;
        this.retrievalEfficiency = 0.5;
        this.visualizationEnabled = true;
        this.init();
    }

    init() {
        console.log('🏛️ Memory Palace Integration initialized');
        this.createMemoryPalaceInterface();
        this.setupEventListeners();
        this.loadPalaceStructure();
        this.initializeDefaultPalace();
        this.startMemoryAnalysis();
    }

    createMemoryPalaceInterface() {
        const palacePanel = document.createElement('div');
        palacePanel.id = 'memory-palace-panel';
        palacePanel.innerHTML = `
            <div class="mpi-container">
                <div class="mpi-header">
                    <div class="mpi-title">🏛️ Memory Palace</div>
                    <div class="mpi-level" id="mpi-level">Palace of Files</div>
                    <div class="mpi-close" onclick="memoryPalace.hide()">✕</div>
                </div>
                
                <div class="mpi-display">
                    <div class="mpi-palace-overview">
                        <div class="palace-stats">
                            <div class="stat-item">
                                <span class="stat-label">Rooms:</span>
                                <span class="stat-value" id="palace-rooms">3</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Associated Files:</span>
                                <span class="stat-value" id="associated-files">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Retrieval Efficiency:</span>
                                <span class="stat-value" id="retrieval-efficiency">50%</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Subconscious Files:</span>
                                <span class="stat-value" id="subconscious-count">0</span>
                            </div>
                        </div>
                        
                        <div class="mpi-palace-visualization">
                            <div class="palace-canvas" id="palace-canvas">
                                <svg width="100%" height="300" id="palace-svg">
                                    <defs>
                                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" stroke-width="0.5"/>
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)"/>
                                    <!-- Palace rooms will be drawn here -->
                                </svg>
                            </div>
                            <div class="palace-controls">
                                <button class="palace-view-btn" onclick="memoryPalace.setPalaceView('2d')">2D Floor Plan</button>
                                <button class="palace-view-btn" onclick="memoryPalace.setPalaceView('3d')">3D Perspective</button>
                                <button class="palace-view-btn" onclick="memoryPalace.setPalaceView('navigate')">Navigate</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mpi-rooms-section">
                        <div class="rooms-header">
                            <h4>Palace Rooms</h4>
                            <button class="add-room-btn" onclick="memoryPalace.addNewRoom()">Add Room</button>
                        </div>
                        <div class="rooms-grid" id="rooms-grid">
                            <div class="room-card" data-room="entrance">
                                <div class="room-icon">🚪</div>
                                <div class="room-name">Entrance Hall</div>
                                <div class="room-description">Main entry point - files accessed frequently</div>
                                <div class="room-files">0 files</div>
                            </div>
                            <div class="room-card" data-room="study">
                                <div class="room-icon">📚</div>
                                <div class="room-name">Study</div>
                                <div class="room-description">Document storage and reading materials</div>
                                <div class="room-files">0 files</div>
                            </div>
                            <div class="room-card" data-room="vault">
                                <div class="room-icon">🔒</div>
                                <div class="room-name">Memory Vault</div>
                                <div class="room-description">Important and secure files</div>
                                <div class="room-files">0 files</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mpi-association-map">
                        <div class="association-header">
                            <h4>Visual Association Map</h4>
                            <div class="association-controls">
                                <label class="mpi-checkbox">
                                    <input type="checkbox" id="show-associations" checked>
                                    <span>Show connections</span>
                                </label>
                                <label class="mpi-checkbox">
                                    <input type="checkbox" id="show-emotions" checked>
                                    <span>Emotional tags</span>
                                </label>
                            </div>
                        </div>
                        <div class="association-network" id="association-network">
                            <div class="network-placeholder">
                                <div class="network-icon">🕸️</div>
                                <div class="network-text">No associations yet</div>
                                <div class="network-subtext">Files will be automatically linked as you use them</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mpi-subconscious-discovery">
                        <div class="subconscious-header">
                            <h4>🧠 Subconscious File Discovery</h4>
                            <button class="scan-btn" onclick="memoryPalace.scanSubconscious()">Scan Now</button>
                        </div>
                        <div class="subconscious-results" id="subconscious-results">
                            <div class="subconscious-placeholder">
                                <div class="subconscious-icon">🧠</div>
                                <div class="subconscious-text">Scanning for hidden patterns...</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mpi-controls">
                    <div class="mpi-control-group">
                        <h4>Memory Techniques</h4>
                        <label class="mpi-checkbox">
                            <input type="checkbox" id="method-of-loci" checked>
                            <span>Method of Loci (Memory Palace)</span>
                        </label>
                        <label class="mpi-checkbox">
                            <input type="checkbox" id="spatial-chunking" checked>
                            <span>Spatial Chunking</span>
                        </label>
                        <label class="mpi-checkbox">
                            <input type="checkbox" id="visual-encoding" checked>
                            <span>Visual Encoding</span>
                        </label>
                        <label class="mpi-checkbox">
                            <input type="checkbox" id="emotional-tagging" checked>
                            <span>Emotional Tagging</span>
                        </label>
                    </div>
                    
                    <div class="mpi-control-group">
                        <h4>Palace Configuration</h4>
                        <div class="mpi-slider">
                            <label>Palace Complexity:</label>
                            <input type="range" id="palace-complexity" min="1" max="10" value="3">
                            <span>3</span>
                        </div>
                        <div class="mpi-slider">
                            <label>Association Strength:</label>
                            <input type="range" id="association-strength" min="10" max="100" value="70">
                            <span>70%</span>
                        </div>
                        <div class="mpi-slider">
                            <label>Retrieval Speed:</label>
                            <input type="range" id="retrieval-speed" min="10" max="100" value="50">
                            <span>50%</span>
                        </div>
                    </div>
                    
                    <div class="mpi-presets">
                        <button class="mpi-preset-btn" onclick="memoryPalace.setPreset('simple')">Simple Palace</button>
                        <button class="mpi-preset-btn" onclick="memoryPalace.setPreset('complex')">Complex Palace</button>
                        <button class="mpi-preset-btn" onclick="memoryPalace.setPreset('minimal')">Minimal Memory</button>
                        <button class="mpi-preset-btn" onclick="memoryPalace.setPreset('visual')">Visual Heavy</button>
                    </div>
                </div>
                
                <div class="mpi-actions">
                    <button class="mpi-action-btn" onclick="memoryPalace.trainMemory()">Train Memory</button>
                    <button class="mpi-action-btn" onclick="memoryPalace.exportPalace()">Export Palace</button>
                    <button class="mpi-action-btn" onclick="memoryPalace.resetPalace()">Reset Palace</button>
                </div>
            </div>
        `;
        document.body.appendChild(palacePanel);
        
        this.drawPalaceVisualization();
        this.setupEventListeners();
    }

    initializeDefaultPalace() {
        // Create default memory palace structure using Method of Loci
        this.palaceStructure = {
            entrance: {
                name: 'Entrance Hall',
                description: 'Main entry point - frequently accessed files',
                function: 'primary_access',
                files: [],
                emotionalTone: 'neutral',
                color: '#4a90e2'
            },
            study: {
                name: 'Study',
                description: 'Document storage and reading materials',
                function: 'document_storage',
                files: [],
                emotionalTone: 'focused',
                color: '#7ed321'
            },
            vault: {
                name: 'Memory Vault',
                description: 'Important and secure files',
                function: 'secure_storage',
                files: [],
                emotionalTone: 'serious',
                color: '#f5a623'
            },
            garden: {
                name: 'Garden of Ideas',
                description: 'Creative and conceptual files',
                function: 'creative_thinking',
                files: [],
                emotionalTone: 'creative',
                color: '#e91e63'
            },
            workshop: {
                name: 'Workshop',
                description: 'Technical and development files',
                function: 'technical_work',
                files: [],
                emotionalTone: 'productive',
                color: '#9c27b0'
            }
        };
        
        this.updateRoomDisplays();
    }

    setupEventListeners() {
        // Room card clicks
        document.querySelectorAll('.room-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const roomId = card.dataset.room;
                this.navigateToRoom(roomId);
            });
        });
        
        // Control sliders
        const sliders = ['palace-complexity', 'association-strength', 'retrieval-speed'];
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                slider.addEventListener('input', (e) => {
                    this.updateControlSetting(id, e.target.value);
                });
            }
        });
        
        // Feature toggles
        const toggles = ['method-of-loci', 'spatial-chunking', 'visual-encoding', 'emotional-tagging'];
        toggles.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.updateFeatureSetting(id, checkbox.checked);
                });
            }
        });
    }

    startMemoryAnalysis() {
        // Start monitoring file access patterns for memory palace optimization
        setInterval(() => {
            this.analyzeAccessPatterns();
        }, 5000);
        
        // Monitor quantum file system for palace integration
        if (typeof quantumFS !== 'undefined') {
            this.integrateWithQuantumFS();
        }
        
        // Monitor synchronicity engine for meaningful associations
        if (typeof synchronicityEngine !== 'undefined') {
            this.integrateWithSynchronicityEngine();
        }
    }

    analyzeAccessPatterns() {
        // Analyze recent file access patterns to build associations
        const recentFiles = this.getRecentFileAccesses();
        
        recentFiles.forEach(access => {
            this.processFileAccess(access);
        });
        
        // Update associations based on patterns
        this.updateAssociationMap();
        
        // Discover subconscious patterns
        if (this.subconsciousFiles.size > 0) {
            this.analyzeSubconsciousPatterns();
        }
    }

    getRecentFileAccesses() {
        // Get recently accessed files from various systems
        const accesses = [];
        
        // Check quantum file system
        if (typeof quantumFS !== 'undefined') {
            quantumFS.quantumFiles?.forEach(file => {
                if (file.lastAccess) {
                    accesses.push({
                        file: file.name,
                        timestamp: file.lastAccess,
                        system: 'quantum',
                        context: 'quantum_file_access'
                    });
                }
            });
        }
        
        // Check browser localStorage for file references
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('memory_palace_') && key.endsWith('_last_access')) {
                const fileName = key.replace('memory_palace_', '').replace('_last_access', '');
                const timestamp = parseInt(localStorage.getItem(key));
                if (timestamp > Date.now() - 60000) { // Last minute
                    accesses.push({
                        file: fileName,
                        timestamp: timestamp,
                        system: 'local',
                        context: 'local_file_access'
                    });
                }
            }
        });
        
        return accesses.sort((a, b) => b.timestamp - a.timestamp);
    }

    processFileAccess(access) {
        const filePath = this.parseFilePath(access.file);
        const room = this.findOptimalRoom(filePath);
        const emotionalContext = this.analyzeEmotionalContext(access);
        
        // Create or update file association
        if (!this.associationMap.has(access.file)) {
            this.associationMap.set(access.file, {
                primaryRoom: room,
                accessCount: 0,
                lastAccess: access.timestamp,
                emotionalContext: emotionalContext,
                associations: new Set(),
                visualElements: this.generateVisualElements(filePath),
                memoryStrength: 0.1
            });
        }
        
        const fileData = this.associationMap.get(access.file);
        fileData.accessCount++;
        fileData.lastAccess = access.timestamp;
        fileData.memoryStrength = Math.min(1.0, fileData.memoryStrength + 0.1);
        
        // Add to room
        if (!this.palaceStructure[room].files.includes(access.file)) {
            this.palaceStructure[room].files.push(access.file);
        }
    }

    parseFilePath(filePath) {
        // Parse file path to extract meaningful components
        const components = filePath.split(/[\/\\\.]/).filter(c => c && c !== '..');
        const name = components[components.length - 1] || filePath;
        const extension = components.length > 1 ? components[components.length - 1].toLowerCase() : '';
        const directory = components.slice(0, -1).join('/');
        
        return {
            name: name,
            extension: extension,
            directory: directory,
            fullPath: filePath
        };
    }

    findOptimalRoom(filePath) {
        const parsed = this.parseFilePath(filePath);
        const name = parsed.name.toLowerCase();
        const ext = parsed.extension.toLowerCase();
        const dir = parsed.directory.toLowerCase();
        
        // Room assignment based on file characteristics
        if (this.isDocumentFile(ext) || name.includes('doc') || name.includes('readme')) {
            return 'study';
        }
        
        if (this.isCodeFile(ext) || name.includes('code') || name.includes('script')) {
            return 'workshop';
        }
        
        if (this.isImageFile(ext) || name.includes('img') || name.includes('photo')) {
            return 'garden';
        }
        
        if (name.includes('config') || name.includes('secure') || name.includes('key')) {
            return 'vault';
        }
        
        // Default to entrance for frequently accessed files
        return 'entrance';
    }

    isDocumentFile(extension) {
        return ['txt', 'md', 'doc', 'docx', 'pdf', 'rtf'].includes(extension);
    }

    isCodeFile(extension) {
        return ['js', 'html', 'css', 'py', 'java', 'cpp', 'rs', 'go'].includes(extension);
    }

    isImageFile(extension) {
        return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp'].includes(extension);
    }

    analyzeEmotionalContext(access) {
        // Analyze emotional context based on access patterns and file content
        let emotionalScore = 0;
        const fileName = access.file.toLowerCase();
        
        // Positive emotions for creative/exploratory files
        if (fileName.includes('creative') || fileName.includes('idea') || fileName.includes('art')) {
            emotionalScore += 0.3;
        }
        
        // Serious emotions for important/secure files
        if (fileName.includes('secure') || fileName.includes('important') || fileName.includes('secret')) {
            emotionalScore += 0.5;
        }
        
        // Focused emotions for work/technical files
        if (fileName.includes('work') || fileName.includes('task') || fileName.includes('project')) {
            emotionalScore += 0.2;
        }
        
        return Math.min(1.0, Math.max(-1.0, emotionalScore - 0.5));
    }

    generateVisualElements(filePath) {
        // Generate visual elements for memory association
        const parsed = this.parseFilePath(filePath);
        const elements = [];
        
        // Color based on file type
        if (this.isDocumentFile(parsed.extension)) {
            elements.push({ type: 'color', value: '#7ed321', symbol: '📄' });
        } else if (this.isCodeFile(parsed.extension)) {
            elements.push({ type: 'color', value: '#f5a623', symbol: '⚙️' });
        } else if (this.isImageFile(parsed.extension)) {
            elements.push({ type: 'color', value: '#e91e63', symbol: '🖼️' });
        } else {
            elements.push({ type: 'color', value: '#4a90e2', symbol: '📁' });
        }
        
        // Shape based on file name
        if (parsed.name.includes('config')) {
            elements.push({ type: 'shape', value: 'circle', symbol: '⚪' });
        } else if (parsed.name.includes('temp')) {
            elements.push({ type: 'shape', value: 'triangle', symbol: '🔺' });
        } else {
            elements.push({ type: 'shape', value: 'square', symbol: '⬜' });
        }
        
        return elements;
    }

    updateAssociationMap() {
        // Update visual associations between files based on access patterns
        const files = Array.from(this.associationMap.keys());
        
        for (let i = 0; i < files.length; i++) {
            for (let j = i + 1; j < files.length; j++) {
                const file1 = files[i];
                const file2 = files[j];
                const associationStrength = this.calculateAssociationStrength(file1, file2);
                
                if (associationStrength > 0.5) {
                    this.addFileAssociation(file1, file2, associationStrength);
                }
            }
        }
        
        this.renderAssociationNetwork();
    }

    calculateAssociationStrength(file1, file2) {
        const data1 = this.associationMap.get(file1);
        const data2 = this.associationMap.get(file2);
        
        if (!data1 || !data2) return 0;
        
        let strength = 0;
        
        // Same room association
        if (data1.primaryRoom === data2.primaryRoom) {
            strength += 0.3;
        }
        
        // Temporal proximity
        const timeDiff = Math.abs(data1.lastAccess - data2.lastAccess);
        if (timeDiff < 300000) { // Within 5 minutes
            strength += 0.4;
        }
        
        // Similar access frequency
        const freqDiff = Math.abs(data1.accessCount - data2.accessCount);
        if (freqDiff < 5) {
            strength += 0.2;
        }
        
        // Similar emotional context
        const emotionDiff = Math.abs(data1.emotionalContext - data2.emotionalContext);
        if (emotionDiff < 0.3) {
            strength += 0.1;
        }
        
        return Math.min(1.0, strength);
    }

    addFileAssociation(file1, file2, strength) {
        const data1 = this.associationMap.get(file1);
        const data2 = this.associationMap.get(file2);
        
        data1.associations.add(file2);
        data2.associations.add(file1);
        
        // Store association strength for rendering
        if (!data1.associationStrengths) data1.associationStrengths = new Map();
        if (!data2.associationStrengths) data2.associationStrengths = new Map();
        
        data1.associationStrengths.set(file2, strength);
        data2.associationStrengths.set(file1, strength);
    }

    analyzeSubconsciousPatterns() {
        // Discover patterns that the user might not be aware of
        const patterns = [];
        
        // Access time patterns
        const timePatterns = this.analyzeAccessTimePatterns();
        if (timePatterns.length > 0) {
            patterns.push({
                type: 'temporal',
                description: `You tend to access files at specific times: ${timePatterns.join(', ')}`,
                confidence: 0.8
            });
        }
        
        // File grouping patterns
        const groupingPatterns = this.analyzeFileGroupingPatterns();
        groupingPatterns.forEach(pattern => {
            patterns.push({
                type: 'grouping',
                description: pattern.description,
                confidence: pattern.confidence
            });
        });
        
        // Emotional patterns
        const emotionalPatterns = this.analyzeEmotionalPatterns();
        emotionalPatterns.forEach(pattern => {
            patterns.push({
                type: 'emotional',
                description: pattern.description,
                confidence: pattern.confidence
            });
        });
        
        this.updateSubconsciousResults(patterns);
    }

    analyzeAccessTimePatterns() {
        const accessTimes = [];
        this.associationMap.forEach(data => {
            const hour = new Date(data.lastAccess).getHours();
            accessTimes.push(hour);
        });
        
        // Find most common hours
        const hourCounts = {};
        accessTimes.forEach(hour => {
            hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        });
        
        const commonHours = Object.keys(hourCounts)
            .filter(hour => hourCounts[hour] > 2)
            .map(hour => `${hour}:00`);
        
        return commonHours;
    }

    analyzeFileGroupingPatterns() {
        const patterns = [];
        const roomCounts = {};
        
        // Count files per room
        Object.keys(this.palaceStructure).forEach(roomId => {
            roomCounts[roomId] = this.palaceStructure[roomId].files.length;
        });
        
        // Find dominant room
        const dominantRoom = Object.keys(roomCounts).reduce((a, b) => 
            roomCounts[a] > roomCounts[b] ? a : b
        );
        
        if (roomCounts[dominantRoom] > 3) {
            patterns.push({
                description: `Most of your files are stored in the ${this.palaceStructure[dominantRoom].name}`,
                confidence: 0.9
            });
        }
        
        return patterns;
    }

    analyzeEmotionalPatterns() {
        const patterns = [];
        const emotionalContexts = [];
        
        this.associationMap.forEach(data => {
            emotionalContexts.push(data.emotionalContext);
        });
        
        if (emotionalContexts.length > 5) {
            const avgEmotion = emotionalContexts.reduce((a, b) => a + b, 0) / emotionalContexts.length;
            
            if (avgEmotion > 0.2) {
                patterns.push({
                    description: 'You tend to work with positively-associated files',
                    confidence: 0.7
                });
            } else if (avgEmotion < -0.2) {
                patterns.push({
                    description: 'Many of your files have serious/negative emotional contexts',
                    confidence: 0.7
                });
            }
        }
        
        return patterns;
    }

    updateSubconsciousResults(patterns) {
        const resultsContainer = document.getElementById('subconscious-results');
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = '';
        
        if (patterns.length === 0) {
            resultsContainer.innerHTML = `
                <div class="subconscious-placeholder">
                    <div class="subconscious-icon">🧠</div>
                    <div class="subconscious-text">No subconscious patterns detected yet</div>
                    <div class="subconscious-subtext">Continue using files to build patterns</div>
                </div>
            `;
        } else {
            patterns.forEach(pattern => {
                const patternElement = document.createElement('div');
                patternElement.className = 'subconscious-pattern';
                patternElement.innerHTML = `
                    <div class="pattern-confidence" style="width: ${pattern.confidence * 100}%"></div>
                    <div class="pattern-text">${pattern.description}</div>
                    <div class="pattern-type">${pattern.type}</div>
                `;
                resultsContainer.appendChild(patternElement);
            });
        }
        
        // Update stats
        this.updateStatistics();
    }

    updateStatistics() {
        const totalFiles = this.associationMap.size;
        const totalRooms = Object.keys(this.palaceStructure).length;
        const retrievalEfficiency = this.calculateRetrievalEfficiency();
        const subconsciousCount = this.subconsciousFiles.size;
        
        // Update display
        const roomsElement = document.getElementById('palace-rooms');
        const filesElement = document.getElementById('associated-files');
        const efficiencyElement = document.getElementById('retrieval-efficiency');
        const subconsciousElement = document.getElementById('subconscious-count');
        
        if (roomsElement) roomsElement.textContent = totalRooms;
        if (filesElement) filesElement.textContent = totalFiles;
        if (efficiencyElement) efficiencyElement.textContent = `${Math.round(retrievalEfficiency * 100)}%`;
        if (subconsciousElement) subconsciousElement.textContent = subconsciousCount;
    }

    calculateRetrievalEfficiency() {
        if (this.associationMap.size === 0) return 0.5;
        
        let totalStrength = 0;
        this.associationMap.forEach(data => {
            totalStrength += data.memoryStrength;
        });
        
        return totalStrength / this.associationMap.size;
    }

    drawPalaceVisualization() {
        const svg = document.getElementById('palace-svg');
        if (!svg) return;
        
        // Clear existing content except grid
        while (svg.children.length > 1) {
            svg.removeChild(svg.lastChild);
        }
        
        // Draw palace rooms
        const roomPositions = {
            entrance: { x: 100, y: 50 },
            study: { x: 300, y: 50 },
            vault: { x: 500, y: 50 },
            garden: { x: 100, y: 200 },
            workshop: { x: 300, y: 200 }
        };
        
        Object.keys(this.palaceStructure).forEach(roomId => {
            const room = this.palaceStructure[roomId];
            const pos = roomPositions[roomId] || { x: 100, y: 100 };
            
            // Draw room rectangle
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', pos.x - 40);
            rect.setAttribute('y', pos.y - 30);
            rect.setAttribute('width', 80);
            rect.setAttribute('height', 60);
            rect.setAttribute('fill', room.color + '20');
            rect.setAttribute('stroke', room.color);
            rect.setAttribute('stroke-width', '2');
            rect.setAttribute('rx', '5');
            rect.setAttribute('class', 'palace-room');
            rect.addEventListener('click', () => this.navigateToRoom(roomId));
            svg.appendChild(rect);
            
            // Draw room label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', pos.x);
            text.setAttribute('y', pos.y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', room.color);
            text.setAttribute('font-size', '12');
            text.setAttribute('font-weight', 'bold');
            text.textContent = room.name;
            svg.appendChild(text);
            
            // Draw file count
            const countText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            countText.setAttribute('x', pos.x);
            countText.setAttribute('y', pos.y + 15);
            countText.setAttribute('text-anchor', 'middle');
            countText.setAttribute('fill', '#ccc');
            countText.setAttribute('font-size', '10');
            countText.textContent = `${room.files.length} files`;
            svg.appendChild(countText);
        });
        
        // Draw associations if enabled
        if (document.getElementById('show-associations')?.checked) {
            this.drawAssociations(svg);
        }
    }

    drawAssociations(svg) {
        // Draw lines between associated files
        this.associationMap.forEach((data, fileName) => {
            if (data.associations.size === 0) return;
            
            const fileElement = this.getFileElementInRoom(data.primaryRoom);
            if (!fileElement) return;
            
            data.associations.forEach(associatedFile => {
                const associatedData = this.associationMap.get(associatedFile);
                if (!associatedData) return;
                
                const associatedElement = this.getFileElementInRoom(associatedData.primaryRoom);
                if (!associatedElement) return;
                
                // Draw association line
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', fileElement.x);
                line.setAttribute('y1', fileElement.y);
                line.setAttribute('x2', associatedElement.x);
                line.setAttribute('y2', associatedElement.y);
                line.setAttribute('stroke', '#7ed321');
                line.setAttribute('stroke-width', '1');
                line.setAttribute('stroke-opacity', '0.3');
                svg.appendChild(line);
            });
        });
    }

    getFileElementInRoom(roomId) {
        // This would return the visual position of a file in the room
        // Simplified implementation for demo
        const roomPositions = {
            entrance: { x: 100, y: 50 },
            study: { x: 300, y: 50 },
            vault: { x: 500, y: 50 },
            garden: { x: 100, y: 200 },
            workshop: { x: 300, y: 200 }
        };
        
        return roomPositions[roomId];
    }

    renderAssociationNetwork() {
        const networkContainer = document.getElementById('association-network');
        if (!networkContainer) return;
        
        if (this.associationMap.size === 0) {
            networkContainer.innerHTML = `
                <div class="network-placeholder">
                    <div class="network-icon">🕸️</div>
                    <div class="network-text">No associations yet</div>
                    <div class="network-subtext">Files will be automatically linked as you use them</div>
                </div>
            `;
            return;
        }
        
        // Create network visualization
        const network = document.createElement('div');
        network.className = 'association-network-visual';
        
        this.associationMap.forEach((data, fileName) => {
            const node = document.createElement('div');
            node.className = 'association-node';
            node.innerHTML = `
                <div class="node-file">${this.truncateFileName(fileName)}</div>
                <div class="node-room">${this.palaceStructure[data.primaryRoom]?.name}</div>
                <div class="node-strength">${Math.round(data.memoryStrength * 100)}%</div>
            `;
            network.appendChild(node);
        });
        
        networkContainer.appendChild(network);
    }

    truncateFileName(fileName) {
        return fileName.length > 20 ? fileName.substring(0, 17) + '...' : fileName;
    }

    navigateToRoom(roomId) {
        const room = this.palaceStructure[roomId];
        if (!room) return;
        
        // Update active room display
        document.querySelectorAll('.room-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const roomCard = document.querySelector(`[data-room="${roomId}"]`);
        if (roomCard) {
            roomCard.classList.add('active');
        }
        
        // Show room details
        this.showRoomDetails(roomId);
        
        console.log(`🏛️ Navigated to ${room.name}`);
    }

    showRoomDetails(roomId) {
        const room = this.palaceStructure[roomId];
        if (!room) return;
        
        // Create room detail panel
        const detailPanel = document.createElement('div');
        detailPanel.className = 'room-detail-panel';
        detailPanel.innerHTML = `
            <div class="room-detail-header">
                <div class="room-detail-title">${room.name}</div>
                <button class="close-detail" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="room-detail-content">
                <div class="room-description">${room.description}</div>
                <div class="room-files-list">
                    <h5>Files in this room (${room.files.length}):</h5>
                    ${room.files.map(file => `
                        <div class="file-item">
                            <span class="file-name">${this.truncateFileName(file)}</span>
                            <span class="file-association">View Association</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add to DOM
        const palacePanel = document.getElementById('memory-palace-panel');
        if (palacePanel) {
            palacePanel.appendChild(detailPanel);
        }
    }

    setPalaceView(viewType) {
        // Update palace visualization based on view type
        const canvas = document.getElementById('palace-canvas');
        if (!canvas) return;
        
        canvas.className = `palace-canvas view-${viewType}`;
        
        // Update button states
        document.querySelectorAll('.palace-view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        event.target.classList.add('active');
        
        this.drawPalaceVisualization();
    }

    addNewRoom() {
        const roomNames = ['Library', 'Laboratory', 'Gallery', 'Archive', 'Sanctuary'];
        const roomFunctions = ['knowledge_storage', 'experimentation', 'art_display', 'record_keeping', 'meditation'];
        
        const randomIndex = Math.floor(Math.random() * roomNames.length);
        const roomId = `room_${Date.now()}`;
        
        this.palaceStructure[roomId] = {
            name: roomNames[randomIndex],
            description: `A specialized room for ${roomFunctions[randomIndex].replace('_', ' ')}`,
            function: roomFunctions[randomIndex],
            files: [],
            emotionalTone: 'neutral',
            color: this.generateRoomColor()
        };
        
        this.updateRoomDisplays();
        this.drawPalaceVisualization();
        
        console.log(`🏛️ Added new room: ${this.palaceStructure[roomId].name}`);
    }

    generateRoomColor() {
        const colors = ['#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateRoomDisplays() {
        // Update room cards with current file counts
        Object.keys(this.palaceStructure).forEach(roomId => {
            const room = this.palaceStructure[roomId];
            const roomCard = document.querySelector(`[data-room="${roomId}"]`);
            
            if (roomCard) {
                const filesElement = roomCard.querySelector('.room-files');
                if (filesElement) {
                    filesElement.textContent = `${room.files.length} files`;
                }
            }
        });
        
        // Add new room cards if needed
        const roomsGrid = document.getElementById('rooms-grid');
        if (roomsGrid) {
            Object.keys(this.palaceStructure).forEach(roomId => {
                if (!roomsGrid.querySelector(`[data-room="${roomId}"]`)) {
                    const room = this.palaceStructure[roomId];
                    const roomCard = document.createElement('div');
                    roomCard.className = 'room-card';
                    roomCard.dataset.room = roomId;
                    roomCard.innerHTML = `
                        <div class="room-icon">🏛️</div>
                        <div class="room-name">${room.name}</div>
                        <div class="room-description">${room.description}</div>
                        <div class="room-files">${room.files.length} files</div>
                    `;
                    roomsGrid.appendChild(roomCard);
                    
                    // Add click listener
                    roomCard.addEventListener('click', (e) => {
                        this.navigateToRoom(roomId);
                    });
                }
            });
        }
    }

    integrateWithQuantumFS() {
        // Monitor quantum file system for palace integration
        if (!this._originalQuantumProcess) {
            this._originalQuantumProcess = quantumFS.processQuantumFluctuations?.bind(quantumFS);
            if (this._originalQuantumProcess) {
                quantumFS.processQuantumFluctuations = () => {
                    this._originalQuantumProcess();
                    this.handleQuantumFileEvents();
                };
            }
        }
    }

    handleQuantumFileEvents() {
        // Handle quantum file system events for memory palace
        quantumFS.quantumFiles?.forEach(file => {
            // Add quantum files to palace if they meet criteria
            if (file.memoryStrength && file.memoryStrength > 0.3) {
                this.addQuantumFileToPalace(file);
            }
        });
    }

    addQuantumFileToPalace(quantumFile) {
        // Add quantum file to appropriate palace room
        const room = this.findOptimalRoom(quantumFile.name);
        if (!this.palaceStructure[room].files.includes(quantumFile.name)) {
            this.palaceStructure[room].files.push(quantumFile.name);
            this.associationMap.set(quantumFile.name, {
                primaryRoom: room,
                accessCount: 1,
                lastAccess: Date.now(),
                emotionalContext: 0,
                associations: new Set(),
                visualElements: [],
                memoryStrength: quantumFile.coherence || 0.5,
                quantumState: quantumFile.states
            });
        }
    }

    integrateWithSynchronicityEngine() {
        // Integrate with synchronicity engine for meaningful associations
        if (!this._originalSynchronicityProcess) {
            this._originalSynchronicityProcess = synchronicityEngine.detectPatterns?.bind(synchronicityEngine);
            if (this._originalSynchronicityProcess) {
                synchronicityEngine.detectPatterns = () => {
                    const result = this._originalSynchronicityProcess();
                    this.handleSynchronicityPatterns();
                    return result;
                };
            }
        }
    }

    handleSynchronicityPatterns() {
        // Create strong associations based on synchronicity patterns
        if (synchronicityEngine.detectedPatterns) {
            synchronicityEngine.detectedPatterns.forEach(pattern => {
                if (pattern.files && pattern.files.length > 1) {
                    // Create strong association between pattern files
                    for (let i = 0; i < pattern.files.length; i++) {
                        for (let j = i + 1; j < pattern.files.length; j++) {
                            this.addFileAssociation(pattern.files[i], pattern.files[j], 0.8);
                        }
                    }
                }
            });
        }
    }

    scanSubconscious() {
        // Trigger a deep scan for subconscious patterns
        this.subconsciousFiles.clear();
        
        // Scan for files that are accessed but not consciously remembered
        this.associationMap.forEach((data, fileName) => {
            if (data.accessCount > 2 && data.memoryStrength < 0.5) {
                this.subconsciousFiles.add(fileName);
            }
        });
        
        // Analyze access patterns for subconscious discoveries
        this.analyzeSubconsciousPatterns();
        
        console.log(`🧠 Scanned subconscious - found ${this.subconsciousFiles.size} hidden patterns`);
    }

    updateControlSetting(id, value) {
        const valueSpan = document.getElementById(id).nextElementSibling;
        if (valueSpan) {
            if (id === 'palace-complexity') {
                valueSpan.textContent = value;
            } else {
                valueSpan.textContent = value + '%';
            }
        }
        
        // Update internal settings
        switch (id) {
            case 'palace-complexity':
                this.palaceComplexity = parseInt(value);
                this.updatePalaceComplexity();
                break;
            case 'association-strength':
                this.associationStrength = value / 100;
                break;
            case 'retrieval-speed':
                this.retrievalEfficiency = value / 100;
                break;
        }
    }

    updateFeatureSetting(id, checked) {
        switch (id) {
            case 'method-of-loci':
                this.memoryTechniques.methodOfLoci = checked;
                break;
            case 'spatial-chunking':
                this.memoryTechniques.spatialChunking = checked;
                break;
            case 'visual-encoding':
                this.memoryTechniques.visualEncoding = checked;
                break;
            case 'emotional-tagging':
                this.memoryTechniques.emotionalTagging = checked;
                break;
        }
    }

    updatePalaceComplexity() {
        // Update palace structure based on complexity level
        const roomCount = Math.min(Math.max(this.palaceComplexity, 3), 10);
        const currentRooms = Object.keys(this.palaceStructure).length;
        
        if (roomCount > currentRooms) {
            // Add more rooms
            for (let i = currentRooms; i < roomCount; i++) {
                this.addNewRoom();
            }
        } else if (roomCount < currentRooms) {
            // Remove excess rooms (except essential ones)
            const essentialRooms = ['entrance', 'study', 'vault'];
            const removableRooms = Object.keys(this.palaceStructure)
                .filter(id => !essentialRooms.includes(id));
            
            for (let i = 0; i < removableRooms.length && Object.keys(this.palaceStructure).length > roomCount; i++) {
                const roomId = removableRooms[i];
                // Move files to entrance before removing
                this.palaceStructure.entrance.files.push(...this.palaceStructure[roomId].files);
                delete this.palaceStructure[roomId];
            }
        }
        
        this.updateRoomDisplays();
        this.drawPalaceVisualization();
    }

    setPreset(presetName) {
        switch (presetName) {
            case 'simple':
                this.setSimplePreset();
                break;
            case 'complex':
                this.setComplexPreset();
                break;
            case 'minimal':
                this.setMinimalPreset();
                break;
            case 'visual':
                this.setVisualPreset();
                break;
        }
    }

    setSimplePreset() {
        document.getElementById('palace-complexity').value = 3;
        document.getElementById('association-strength').value = 50;
        document.getElementById('retrieval-speed').value = 70;
        document.getElementById('method-of-loci').checked = true;
        document.getElementById('spatial-chunking').checked = true;
        document.getElementById('visual-encoding').checked = false;
        document.getElementById('emotional-tagging').checked = false;
        this.updateControlSetting('palace-complexity', 3);
        this.updateControlSetting('association-strength', 50);
        this.updateControlSetting('retrieval-speed', 70);
        this.updateFeatureSetting('method-of-loci', true);
        this.updateFeatureSetting('spatial-chunking', true);
        this.updateFeatureSetting('visual-encoding', false);
        this.updateFeatureSetting('emotional-tagging', false);
    }

    setComplexPreset() {
        document.getElementById('palace-complexity').value = 8;
        document.getElementById('association-strength').value = 90;
        document.getElementById('retrieval-speed').value = 40;
        document.getElementById('method-of-loci').checked = true;
        document.getElementById('spatial-chunking').checked = true;
        document.getElementById('visual-encoding').checked = true;
        document.getElementById('emotional-tagging').checked = true;
        this.updateControlSetting('palace-complexity', 8);
        this.updateControlSetting('association-strength', 90);
        this.updateControlSetting('retrieval-speed', 40);
        this.updateFeatureSetting('method-of-loci', true);
        this.updateFeatureSetting('spatial-chunking', true);
        this.updateFeatureSetting('visual-encoding', true);
        this.updateFeatureSetting('emotional-tagging', true);
    }

    setMinimalPreset() {
        document.getElementById('palace-complexity').value = 2;
        document.getElementById('association-strength').value = 30;
        document.getElementById('retrieval-speed').value = 90;
        document.getElementById('method-of-loci').checked = false;
        document.getElementById('spatial-chunking').checked = false;
        document.getElementById('visual-encoding').checked = false;
        document.getElementById('emotional-tagging').checked = false;
        this.updateControlSetting('palace-complexity', 2);
        this.updateControlSetting('association-strength', 30);
        this.updateControlSetting('retrieval-speed', 90);
        this.updateFeatureSetting('method-of-loci', false);
        this.updateFeatureSetting('spatial-chunking', false);
        this.updateFeatureSetting('visual-encoding', false);
        this.updateFeatureSetting('emotional-tagging', false);
    }

    setVisualPreset() {
        document.getElementById('palace-complexity').value = 5;
        document.getElementById('association-strength').value = 80;
        document.getElementById('retrieval-speed').value = 60;
        document.getElementById('method-of-loci').checked = true;
        document.getElementById('spatial-chunking').checked = true;
        document.getElementById('visual-encoding').checked = true;
        document.getElementById('emotional-tagging').checked = true;
        this.updateControlSetting('palace-complexity', 5);
        this.updateControlSetting('association-strength', 80);
        this.updateControlSetting('retrieval-speed', 60);
        this.updateFeatureSetting('method-of-loci', true);
        this.updateFeatureSetting('spatial-chunking', true);
        this.updateFeatureSetting('visual-encoding', true);
        this.updateFeatureSetting('emotional-tagging', true);
    }

    trainMemory() {
        // Memory training exercises based on palace structure
        const trainingExercises = [
            {
                name: 'Palace Navigation',
                description: 'Navigate through your memory palace to improve retrieval',
                action: () => this.trainNavigation()
            },
            {
                name: 'Association Strengthening',
                description: 'Strengthen weak associations between files',
                action: () => this.trainAssociations()
            },
            {
                name: 'Room Reorganization',
                description: 'Practice reorganizing files between rooms',
                action: () => this.trainReorganization()
            }
        ];
        
        const randomExercise = trainingExercises[Math.floor(Math.random() * trainingExercises.length)];
        
        console.log(`🧠 Memory training: ${randomExercise.name}`);
        randomExercise.action();
        
        // Show training feedback
        this.showTrainingFeedback(randomExercise.name);
    }

    trainNavigation() {
        // Training exercise for navigating through memory palace
        const rooms = Object.keys(this.palaceStructure);
        const sequence = [];
        
        // Generate navigation sequence
        for (let i = 0; i < Math.min(3, rooms.length); i++) {
            sequence.push(rooms[Math.floor(Math.random() * rooms.length)]);
        }
        
        // Simulate navigation training
        setTimeout(() => {
            console.log(`🧠 Completed navigation training: ${sequence.join(' → ')}`);
        }, 1000);
    }

    trainAssociations() {
        // Training exercise for strengthening weak associations
        const weakAssociations = [];
        this.associationMap.forEach((data, fileName) => {
            if (data.memoryStrength < 0.5) {
                weakAssociations.push(fileName);
            }
        });
        
        if (weakAssociations.length > 0) {
            console.log(`🧠 Strengthening ${weakAssociations.length} weak associations`);
            // Simulate association strengthening
            weakAssociations.forEach(fileName => {
                const data = this.associationMap.get(fileName);
                data.memoryStrength = Math.min(1.0, data.memoryStrength + 0.1);
            });
        }
    }

    trainReorganization() {
        // Training exercise for reorganizing files between rooms
        const filesToMove = [];
        this.palaceStructure.entrance.files.forEach(fileName => {
            if (Math.random() < 0.3) { // 30% chance to move
                filesToMove.push(fileName);
            }
        });
        
        if (filesToMove.length > 0) {
            console.log(`🧠 Reorganizing ${filesToMove.length} files`);
            // Simulate reorganization
            filesToMove.forEach(fileName => {
                const room = this.findOptimalRoom(fileName);
                if (room !== 'entrance') {
                    this.palaceStructure.entrance.files = this.palaceStructure.entrance.files.filter(f => f !== fileName);
                    this.palaceStructure[room].files.push(fileName);
                    
                    const data = this.associationMap.get(fileName);
                    if (data) {
                        data.primaryRoom = room;
                    }
                }
            });
        }
        
        this.updateRoomDisplays();
    }

    showTrainingFeedback(exerciseName) {
        const feedback = document.createElement('div');
        feedback.className = 'training-feedback';
        feedback.innerHTML = `
            <div class="feedback-icon">🧠</div>
            <div class="feedback-text">Memory training completed: ${exerciseName}</div>
            <div class="feedback-benefit">Palace organization improved!</div>
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }

    exportPalace() {
        const palaceData = {
            structure: this.palaceStructure,
            associations: Object.fromEntries(this.associationMap),
            techniques: this.memoryTechniques,
            settings: {
                complexity: this.palaceComplexity,
                strength: this.associationStrength,
                efficiency: this.retrievalEfficiency
            },
            subconsciousFiles: Array.from(this.subconsciousFiles),
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(palaceData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `memory-palace-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    resetPalace() {
        this.palaceStructure = {};
        this.associationMap.clear();
        this.subconsciousFiles.clear();
        
        this.initializeDefaultPalace();
        this.drawPalaceVisualization();
        this.updateRoomDisplays();
        
        console.log('🏛️ Memory palace reset');
    }

    savePalaceStructure() {
        localStorage.setItem('memory-palace-structure', JSON.stringify({
            structure: this.palaceStructure,
            associations: Object.fromEntries(this.associationMap),
            techniques: this.memoryTechniques,
            settings: {
                complexity: this.palaceComplexity,
                strength: this.associationStrength,
                efficiency: this.retrievalEfficiency
            }
        }));
    }

    loadPalaceStructure() {
        const saved = localStorage.getItem('memory-palace-structure');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.palaceStructure = data.structure || {};
                this.associationMap = new Map(Object.entries(data.associations || {}));
                this.memoryTechniques = { ...this.memoryTechniques, ...data.techniques };
                this.palaceComplexity = data.settings?.complexity || 3;
                this.associationStrength = data.settings?.strength || 0.7;
                this.retrievalEfficiency = data.settings?.efficiency || 0.5;
            } catch (e) {
                console.warn('Failed to load palace structure:', e);
            }
        }
    }

    show() {
        const panel = document.getElementById('memory-palace-panel');
        if (panel) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.opacity = '1';
            }, 10);
        }
    }

    hide() {
        const panel = document.getElementById('memory-palace-panel');
        if (panel) {
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }

    adaptComplexity(level) {
        // Method called by other systems to adapt memory palace complexity
        this.palaceComplexity = Math.min(Math.max(level, 1), 10);
        this.updatePalaceComplexity();
    }
}

// Initialize Memory Palace Integration
const memoryPalace = new MemoryPalaceIntegration();

// Auto-save palace data periodically
setInterval(() => {
    memoryPalace.savePalaceStructure();
}, 30000); // Every 30 seconds

// Add CSS styles
const memoryStyles = `
<style>
.mpi-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10004;
    background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
    border: 2px solid #e91e63;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
    width: 600px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    color: #e0e0e0;
}

.mpi-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid #e91e63;
    border-radius: 13px 13px 0 0;
}

.mpi-title {
    font-size: 18px;
    font-weight: bold;
    color: #e91e63;
}

.mpi-level {
    background: #e91e63;
    color: #fff;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
}

.mpi-close {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: background 0.2s;
}

.mpi-close:hover {
    background: rgba(255, 107, 107, 0.1);
}

.mpi-display {
    padding: 20px;
}

.mpi-palace-overview {
    margin-bottom: 25px;
}

.palace-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}

.stat-item {
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 12px;
    border: 1px solid #e91e63;
}

.stat-label {
    display: block;
    font-size: 11px;
    color: #888;
    margin-bottom: 4px;
}

.stat-value {
    font-size: 18px;
    font-weight: bold;
    color: #e91e63;
}

.mpi-palace-visualization {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #e91e63;
}

.palace-canvas {
    width: 100%;
    height: 300px;
    position: relative;
}

.palace-canvas svg {
    background: #111;
}

.palace-room {
    cursor: pointer;
    transition: all 0.2s;
}

.palace-room:hover {
    fill-opacity: 0.3;
    stroke-width: 3;
}

.palace-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
}

.palace-view-btn {
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #e91e63;
    color: #e91e63;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.palace-view-btn:hover,
.palace-view-btn.active {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #e91e63;
}

.mpi-rooms-section {
    margin-bottom: 25px;
}

.rooms-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.rooms-header h4 {
    color: #e91e63;
    font-size: 16px;
    margin: 0;
}

.add-room-btn {
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #e91e63;
    color: #e91e63;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.add-room-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #e91e63;
}

.rooms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;
}

.room-card {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid #e91e63;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.room-card:hover {
    background: rgba(233, 30, 99, 0.1);
    border-color: #e91e63;
    box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
}

.room-card.active {
    background: rgba(233, 30, 99, 0.2);
    border-color: #e91e63;
    box-shadow: 0 0 20px rgba(233, 30, 99, 0.5);
}

.room-icon {
    font-size: 24px;
    text-align: center;
    margin-bottom: 8px;
}

.room-name {
    font-size: 14px;
    font-weight: bold;
    color: #e91e63;
    text-align: center;
    margin-bottom: 6px;
}

.room-description {
    font-size: 11px;
    color: #ccc;
    text-align: center;
    margin-bottom: 8px;
    line-height: 1.3;
}

.room-files {
    font-size: 10px;
    color: #888;
    text-align: center;
}

.mpi-association-map {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 25px;
}

.association-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.association-header h4 {
    color: #e91e63;
    font-size: 14px;
    margin: 0;
}

.association-controls {
    display: flex;
    gap: 15px;
}

.mpi-checkbox {
    display: flex;
    align-items: center;
    font-size: 11px;
    cursor: pointer;
}

.mpi-checkbox input {
    margin-right: 6px;
}

.association-network {
    min-height: 120px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.network-placeholder {
    text-align: center;
    color: #666;
}

.network-icon {
    font-size: 32px;
    margin-bottom: 8px;
    opacity: 0.5;
}

.network-text {
    font-size: 14px;
    margin-bottom: 4px;
}

.network-subtext {
    font-size: 11px;
    opacity: 0.7;
}

.association-network-visual {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    width: 100%;
}

.association-node {
    background: rgba(233, 30, 99, 0.1);
    border: 1px solid #e91e63;
    border-radius: 6px;
    padding: 8px;
    text-align: center;
    font-size: 10px;
}

.node-file {
    color: #e91e63;
    font-weight: bold;
    margin-bottom: 4px;
    word-break: break-word;
}

.node-room {
    color: #ccc;
    margin-bottom: 2px;
}

.node-strength {
    color: #888;
}

.mpi-subconscious-discovery {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 25px;
}

.subconscious-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.subconscious-header h4 {
    color: #e91e63;
    font-size: 14px;
    margin: 0;
}

.scan-btn {
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #e91e63;
    color: #e91e63;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.scan-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #e91e63;
}

.subconscious-results {
    min-height: 80px;
}

.subconscious-placeholder {
    text-align: center;
    color: #666;
    padding: 20px;
}

.subconscious-icon {
    font-size: 32px;
    margin-bottom: 8px;
    opacity: 0.5;
}

.subconscious-text {
    font-size: 14px;
    margin-bottom: 4px;
}

.subconscious-subtext {
    font-size: 11px;
    opacity: 0.7;
}

.subconscious-pattern {
    background: rgba(233, 30, 99, 0.1);
    border: 1px solid #e91e63;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 8px;
    position: relative;
}

.pattern-confidence {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: #e91e63;
    border-radius: 6px 0 0 0;
}

.pattern-text {
    font-size: 12px;
    color: #e0e0e0;
    margin-bottom: 4px;
    padding-right: 40px;
}

.pattern-type {
    font-size: 10px;
    color: #888;
    text-transform: uppercase;
}

.mpi-controls {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.mpi-control-group {
    margin-bottom: 15px;
}

.mpi-control-group h4 {
    color: #e91e63;
    margin-bottom: 10px;
    font-size: 14px;
}

.mpi-checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
}

.mpi-checkbox input {
    margin-right: 8px;
}

.mpi-slider {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
}

.mpi-slider label {
    min-width: 120px;
    font-size: 12px;
}

.mpi-slider input[type="range"] {
    flex: 1;
}

.mpi-slider span {
    min-width: 40px;
    text-align: right;
    font-size: 12px;
    color: #e91e63;
}

.mpi-presets {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.mpi-preset-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #e91e63;
    color: #e91e63;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.mpi-preset-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #e91e63;
}

.mpi-actions {
    display: flex;
    gap: 8px;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0 0 13px 13px;
}

.mpi-action-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #e91e63;
    color: #e91e63;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.mpi-action-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 5px #e91e63;
}

.room-detail-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
    border: 2px solid #e91e63;
    border-radius: 10px;
    padding: 20px;
    z-index: 10005;
    max-width: 400px;
    width: 90vw;
}

.room-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid #e91e63;
    padding-bottom: 10px;
}

.room-detail-title {
    font-size: 16px;
    font-weight: bold;
    color: #e91e63;
}

.close-detail {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 16px;
    cursor: pointer;
}

.room-detail-content {
    color: #e0e0e0;
}

.room-description {
    font-size: 12px;
    color: #ccc;
    margin-bottom: 15px;
}

.room-files-list h5 {
    color: #e91e63;
    margin-bottom: 10px;
    font-size: 13px;
}

.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid rgba(233, 30, 99, 0.2);
}

.file-name {
    font-size: 11px;
    color: #ccc;
    flex: 1;
}

.file-association {
    font-size: 10px;
    color: #e91e63;
    cursor: pointer;
}

.file-association:hover {
    text-decoration: underline;
}

.training-feedback {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid #e91e63;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    z-index: 10006;
    animation: trainingFeedback 3s ease-in-out;
}

@keyframes trainingFeedback {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
}

.feedback-icon {
    font-size: 48px;
    margin-bottom: 10px;
    color: #e91e63;
}

.feedback-text {
    font-size: 16px;
    color: #e91e63;
    margin-bottom: 8px;
}

.feedback-benefit {
    font-size: 12px;
    color: #ccc;
}

@media (max-width: 600px) {
    .mpi-container {
        width: 95vw;
    }
    
    .rooms-grid {
        grid-template-columns: 1fr;
    }
    
    .mpi-presets {
        flex-wrap: wrap;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', memoryStyles);