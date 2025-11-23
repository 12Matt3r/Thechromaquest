// Time-Travel Interface - Windows version selector and timeline visualization
// Chronological Windows versions from 95 to 2050+ with retro-future hybrid themes

class TimeTravelInterface {
    constructor() {
        this.windowsVersions = [
            { year: 1995, name: 'Windows 95', theme: 'classic-blue', status: 'available' },
            { year: 1998, name: 'Windows 98', theme: 'classic-blue', status: 'available' },
            { year: 2000, name: 'Windows ME', theme: 'millennium', status: 'available' },
            { year: 2001, name: 'Windows XP', theme: 'luna', status: 'available' },
            { year: 2007, name: 'Windows Vista', theme: 'aero', status: 'available' },
            { year: 2009, name: 'Windows 7', theme: 'aero-refined', status: 'available' },
            { year: 2012, name: 'Windows 8', theme: 'metro', status: 'available' },
            { year: 2015, name: 'Windows 10', theme: 'fluent', status: 'available' },
            { year: 2021, name: 'Windows 11', theme: 'fluent-design', status: 'available' },
            { year: 2025, name: 'Windows 25', theme: 'quantum-fluent', status: 'beta' },
            { year: 2030, name: 'Windows 30', theme: 'neural-interface', status: 'development' },
            { year: 2040, name: 'Windows 40', theme: 'consciousness-os', status: 'concept' },
            { year: 2050, name: 'Windows 50', theme: 'reality-interface', status: 'dream' },
            { year: 2075, name: 'Windows 75', theme: 'post-human', status: 'speculation' },
            { year: 2100, name: 'Windows 100', theme: 'transcendent', status: 'legend' }
        ];
        this.currentTimelinePosition = 11; // Windows 11
        this.timelineMode = 'chronological'; // chronological, thematic, functional
        this.retroFutureBlend = 0.5;
        this.timeTravelEffects = true;
        this.temporalStability = 1.0;
        this.quantumCoherence = 0.8;
        this.init();
    }

    init() {
        console.log('⏰ Time-Travel Interface initialized');
        this.createTimeTravelInterface();
        this.setupEventListeners();
        this.loadTimelinePreferences();
        this.startTemporalMonitoring();
    }

    createTimeTravelInterface() {
        const timePanel = document.createElement('div');
        timePanel.id = 'time-travel-panel';
        timePanel.innerHTML = `
            <div class="tti-container">
                <div class="tti-header">
                    <div class="tti-title">⏰ Time-Travel OS</div>
                    <div class="tti-position" id="tti-position">Windows 11 (2021)</div>
                    <div class="tti-close" onclick="timeTravel.hide()">✕</div>
                </div>
                
                <div class="tti-display">
                    <div class="tti-timeline-visualization">
                        <div class="timeline-header">
                            <h4>Temporal Timeline</h4>
                            <div class="timeline-controls">
                                <button class="timeline-mode-btn active" onclick="timeTravel.setTimelineMode('chronological')">Chronological</button>
                                <button class="timeline-mode-btn" onclick="timeTravel.setTimelineMode('thematic')">Thematic</button>
                                <button class="timeline-mode-btn" onclick="timeTravel.setTimelineMode('functional')">Functional</button>
                            </div>
                        </div>
                        <div class="timeline-canvas" id="timeline-canvas">
                            <svg width="100%" height="200" id="timeline-svg">
                                <defs>
                                    <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color:#1e3c72;stop-opacity:1" />
                                        <stop offset="50%" style="stop-color:#2a5298;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#4facfe;stop-opacity:1" />
                                    </linearGradient>
                                    <pattern id="timeWaves" width="100" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#4facfe" stroke-width="1" opacity="0.3"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#timeWaves)" opacity="0.1"/>
                                <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="url(#timelineGradient)" stroke-width="4"/>
                                <!-- Timeline markers will be added here -->
                            </svg>
                        </div>
                        <div class="timeline-info">
                            <div class="temporal-status" id="temporal-status">
                                <span class="status-label">Temporal Stability:</span>
                                <span class="status-value">100%</span>
                            </div>
                            <div class="quantum-coherence" id="quantum-coherence">
                                <span class="coherence-label">Quantum Coherence:</span>
                                <span class="coherence-value">80%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tti-version-selector">
                        <div class="selector-header">
                            <h4>Windows Time Periods</h4>
                            <div class="version-filters">
                                <button class="filter-btn active" onclick="timeTravel.filterVersions('all')">All</button>
                                <button class="filter-btn" onclick="timeTravel.filterVersions('classic')">Classic (95-XP)</button>
                                <button class="filter-btn" onclick="timeTravel.filterVersions('modern')">Modern (Vista+)</button>
                                <button class="filter-btn" onclick="timeTravel.filterVersions('future')">Future (2025+)</button>
                            </div>
                        </div>
                        <div class="versions-grid" id="versions-grid">
                            <!-- Version cards will be generated here -->
                        </div>
                    </div>
                    
                    <div class="tti-theme-preview">
                        <div class="preview-header">
                            <h4>Retro-Future Hybrid Themes</h4>
                            <button class="theme-toggle-btn" onclick="timeTravel.toggleThemeBlend()">Blend: 50%</button>
                        </div>
                        <div class="theme-showcase" id="theme-showcase">
                            <div class="theme-sample" id="theme-sample">
                                <div class="theme-desktop">
                                    <div class="theme-taskbar">
                                        <div class="theme-start-btn">Start</div>
                                        <div class="theme-window-controls">
                                            <div class="control-btn min">−</div>
                                            <div class="control-btn max">□</div>
                                            <div class="control-btn close">×</div>
                                        </div>
                                        <div class="theme-clock">12:00</div>
                                    </div>
                                    <div class="theme-content">
                                        <div class="theme-window">
                                            <div class="theme-titlebar">
                                                <div class="theme-title">Time Travel Interface</div>
                                            </div>
                                            <div class="theme-body">
                                                <div class="theme-text">Exploring Windows across time</div>
                                                <div class="theme-elements">
                                                    <div class="theme-button">Temporal Jump</div>
                                                    <div class="theme-checkbox">✓ Retro Aesthetics</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tti-features-matrix">
                        <div class="matrix-header">
                            <h4>Temporal Feature Matrix</h4>
                            <div class="matrix-legend">
                                <div class="legend-item"><span class="legend-color available"></span>Available</div>
                                <div class="legend-item"><span class="legend-color beta"></span>Beta</div>
                                <div class="legend-item"><span class="legend-color concept"></span>Concept</div>
                                <div class="legend-item"><span class="legend-color dream"></span>Dream</div>
                            </div>
                        </div>
                        <div class="features-table" id="features-table">
                            <div class="table-header">
                                <div class="feature-name">Feature</div>
                                <div class="feature-columns" id="feature-columns">
                                    <!-- Feature columns will be generated -->
                                </div>
                            </div>
                            <div class="table-body" id="table-body">
                                <!-- Feature rows will be generated -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tti-controls">
                    <div class="tti-control-group">
                        <h4>Time Travel Controls</h4>
                        <div class="time-nav">
                            <button class="nav-btn" onclick="timeTravel.jumpToPrevious()">◀ Previous</button>
                            <button class="nav-btn" onclick="timeTravel.jumpToNext()">Next ▶</button>
                            <button class="nav-btn" onclick="timeTravel.temporalScan()">⏰ Scan Timeline</button>
                        </div>
                        <div class="tti-slider">
                            <label>Retro-Future Blend:</label>
                            <input type="range" id="retro-blend" min="0" max="100" value="50">
                            <span id="blend-value">50%</span>
                        </div>
                        <div class="tti-slider">
                            <label>Temporal Stability:</label>
                            <input type="range" id="temporal-stability" min="50" max="100" value="100">
                            <span id="stability-value">100%</span>
                        </div>
                    </div>
                    
                    <div class="tti-control-group">
                        <h4>Interface Effects</h4>
                        <label class="tti-checkbox">
                            <input type="checkbox" id="time-travel-effects" checked>
                            <span>Temporal transition effects</span>
                        </label>
                        <label class="tti-checkbox">
                            <input type="checkbox" id="quantum-coherence" checked>
                            <span>Quantum coherence monitoring</span>
                        </label>
                        <label class="tti-checkbox">
                            <input type="checkbox" id="temporal-stability-check" checked>
                            <span>Auto-stabilize timeline</span>
                        </label>
                        <label class="tti-checkbox">
                            <input type="checkbox" id="future-predictions" checked>
                            <span>Future feature predictions</span>
                        </label>
                    </div>
                    
                    <div class="tti-presets">
                        <button class="tti-preset-btn" onclick="timeTravel.setPreset('classic')">Classic Era</button>
                        <button class="tti-preset-btn" onclick="timeTravel.setPreset('modern')">Modern Era</button>
                        <button class="tti-preset-btn" onclick="timeTravel.setPreset('future')">Future Era</button>
                        <button class="tti-preset-btn" onclick="timeTravel.setPreset('blend')">Time Blend</button>
                    </div>
                </div>
                
                <div class="tti-actions">
                    <button class="tti-action-btn" onclick="timeTravel.temporalJump()">Temporal Jump</button>
                    <button class="tti-action-btn" onclick="timeTravel.exportTimeline()">Export Timeline</button>
                    <button class="tti-action-btn" onclick="timeTravel.resetTimeline()">Reset Timeline</button>
                    <button class="tti-action-btn" onclick="timeTravel.emergencyStabilize()">⚠️ Stabilize</button>
                </div>
            </div>
        `;
        document.body.appendChild(timePanel);
        
        this.generateVersionCards();
        this.drawTimelineVisualization();
        this.generateFeatureMatrix();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Timeline mode buttons
        document.querySelectorAll('.timeline-mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.timeline-mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // Version filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // Control sliders
        const sliders = ['retro-blend', 'temporal-stability'];
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                slider.addEventListener('input', (e) => {
                    this.updateControlSetting(id, e.target.value);
                });
            }
        });
        
        // Feature toggles
        const toggles = ['time-travel-effects', 'quantum-coherence', 'temporal-stability-check', 'future-predictions'];
        toggles.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.updateFeatureSetting(id, checkbox.checked);
                });
            }
        });
    }

    startTemporalMonitoring() {
        // Monitor temporal stability and coherence
        setInterval(() => {
            this.updateTemporalStatus();
        }, 2000);
        
        // Monitor for temporal anomalies
        setInterval(() => {
            this.detectTemporalAnomalies();
        }, 5000);
        
        // Update timeline visualization periodically
        setInterval(() => {
            this.drawTimelineVisualization();
        }, 30000);
    }

    updateTemporalStatus() {
        // Simulate temporal stability fluctuations
        const stabilityVariation = (Math.random() - 0.5) * 0.02;
        this.temporalStability = Math.max(0.8, Math.min(1.0, this.temporalStability + stabilityVariation));
        
        // Update quantum coherence based on time travel activity
        const coherenceVariation = (Math.random() - 0.5) * 0.01;
        this.quantumCoherence = Math.max(0.7, Math.min(0.9, this.quantumCoherence + coherenceVariation));
        
        // Update display
        const stabilityElement = document.querySelector('.status-value');
        const coherenceElement = document.querySelector('.coherence-value');
        
        if (stabilityElement) {
            stabilityElement.textContent = `${Math.round(this.temporalStability * 100)}%`;
            stabilityElement.style.color = this.getStabilityColor(this.temporalStability);
        }
        
        if (coherenceElement) {
            coherenceElement.textContent = `${Math.round(this.quantumCoherence * 100)}%`;
            coherenceElement.style.color = this.getCoherenceColor(this.quantumCoherence);
        }
    }

    detectTemporalAnomalies() {
        // Detect temporal anomalies that might affect time travel
        const anomalies = [];
        
        // Check for timeline drift
        if (Math.abs(this.temporalStability - 1.0) > 0.1) {
            anomalies.push({
                type: 'timeline-drift',
                severity: 'medium',
                description: 'Timeline stability decreased',
                recommendation: 'Consider temporal stabilization'
            });
        }
        
        // Check for coherence degradation
        if (this.quantumCoherence < 0.75) {
            anomalies.push({
                type: 'coherence-loss',
                severity: 'high',
                description: 'Quantum coherence below threshold',
                recommendation: 'Emergency temporal re-alignment required'
            });
        }
        
        // Check for version conflicts
        const conflicts = this.detectVersionConflicts();
        if (conflicts.length > 0) {
            anomalies.push({
                type: 'version-conflict',
                severity: 'low',
                description: `Version conflicts detected: ${conflicts.join(', ')}`,
                recommendation: 'Timeline negotiation recommended'
            });
        }
        
        if (anomalies.length > 0) {
            this.handleTemporalAnomalies(anomalies);
        }
    }

    detectVersionConflicts() {
        // Detect conflicts between different Windows versions
        const conflicts = [];
        const activeVersions = this.getActiveVersions();
        
        // Check for incompatible features between versions
        if (activeVersions.includes('windows-95') && activeVersions.includes('windows-11')) {
            conflicts.push('Classic/Modern interface conflict');
        }
        
        if (activeVersions.includes('future') && activeVersions.includes('classic')) {
            conflicts.push('Retro/Future theme conflict');
        }
        
        return conflicts;
    }

    getActiveVersions() {
        // Get currently active Windows versions
        return ['windows-11']; // Simplified for demo
    }

    handleTemporalAnomalies(anomalies) {
        // Handle detected temporal anomalies
        anomalies.forEach(anomaly => {
            console.warn(`⏰ Temporal Anomaly: ${anomaly.description}`);
            
            // Auto-stabilize if enabled
            if (document.getElementById('temporal-stability-check')?.checked) {
                this.performAutoStabilization(anomaly);
            }
        });
        
        // Show anomaly notifications
        this.showTemporalAnomalyNotifications(anomalies);
    }

    performAutoStabilization(anomaly) {
        switch (anomaly.type) {
            case 'timeline-drift':
                this.temporalStability = Math.min(1.0, this.temporalStability + 0.05);
                break;
            case 'coherence-loss':
                this.quantumCoherence = Math.min(0.9, this.quantumCoherence + 0.03);
                break;
            case 'version-conflict':
                this.resolveVersionConflicts();
                break;
        }
    }

    resolveVersionConflicts() {
        // Auto-resolve version conflicts by adjusting blend ratios
        this.retroFutureBlend = 0.5; // Reset to balanced state
        document.getElementById('retro-blend').value = 50;
        this.updateControlSetting('retro-blend', 50);
    }

    showTemporalAnomalyNotifications(anomalies) {
        // Show notifications for temporal anomalies
        anomalies.forEach(anomaly => {
            // Create temporary notification
            const notification = document.createElement('div');
            notification.className = 'temporal-anomaly-notification';
            notification.innerHTML = `
                <div class="anomaly-icon">⏰</div>
                <div class="anomaly-content">
                    <div class="anomaly-title">${anomaly.type.replace('-', ' ').toUpperCase()}</div>
                    <div class="anomaly-description">${anomaly.description}</div>
                    <div class="anomaly-action">${anomaly.recommendation}</div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 5000);
        });
    }

    generateVersionCards() {
        const versionsGrid = document.getElementById('versions-grid');
        if (!versionsGrid) return;
        
        versionsGrid.innerHTML = '';
        
        this.windowsVersions.forEach((version, index) => {
            const versionCard = document.createElement('div');
            versionCard.className = `version-card status-${version.status}`;
            versionCard.innerHTML = `
                <div class="version-header">
                    <div class="version-year">${version.year}</div>
                    <div class="version-status">${version.status}</div>
                </div>
                <div class="version-name">${version.name}</div>
                <div class="version-theme">${version.theme.replace('-', ' ')}</div>
                <div class="version-preview">
                    <div class="preview-desktop">
                        <div class="preview-taskbar" style="background: ${this.getThemeColor(version.theme)}"></div>
                    </div>
                </div>
                <button class="version-activate-btn" onclick="timeTravel.activateVersion('${version.name.toLowerCase().replace(/\s+/g, '-')}')">
                    ${this.getActivationText(version.status)}
                </button>
            `;
            
            versionsGrid.appendChild(versionCard);
        });
    }

    getThemeColor(theme) {
        const themeColors = {
            'classic-blue': '#008080',
            'luna': '#4682b4',
            'aero': '#4682b4',
            'metro': '#00bcf2',
            'fluent': '#0078d4',
            'quantum-fluent': '#00d4ff',
            'neural-interface': '#8a2be2',
            'consciousness-os': '#ff69b4',
            'reality-interface': '#00ff7f',
            'post-human': '#ffd700',
            'transcendent': '#ff1493'
        };
        
        return themeColors[theme] || '#0078d4';
    }

    getActivationText(status) {
        switch (status) {
            case 'available': return 'Activate';
            case 'beta': return 'Beta Test';
            case 'development': return 'Preview';
            case 'concept': return 'Concept';
            case 'dream': return 'Dream';
            case 'speculation': return 'Speculate';
            case 'legend': return 'Legend';
            default: return 'Activate';
        }
    }

    drawTimelineVisualization() {
        const svg = document.getElementById('timeline-svg');
        if (!svg) return;
        
        // Clear existing markers except the first defs and background elements
        while (svg.children.length > 3) {
            svg.removeChild(svg.lastChild);
        }
        
        // Draw timeline markers
        this.windowsVersions.forEach((version, index) => {
            const x = 5 + (index * 6); // Distribute across 90% width
            const y = 50;
            
            // Draw marker
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            marker.setAttribute('cx', `${x}%`);
            marker.setAttribute('cy', `${y}%`);
            marker.setAttribute('r', '6');
            marker.setAttribute('fill', this.getStatusColor(version.status));
            marker.setAttribute('stroke', '#fff');
            marker.setAttribute('stroke-width', '2');
            marker.setAttribute('class', 'timeline-marker');
            marker.setAttribute('data-version', index);
            marker.addEventListener('click', () => this.jumpToVersion(index));
            svg.appendChild(marker);
            
            // Draw version label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', `${x}%`);
            text.setAttribute('y', `${y + 20}%`);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', '#fff');
            text.setAttribute('font-size', '10');
            text.textContent = version.year;
            svg.appendChild(text);
            
            // Draw connecting lines for active versions
            if (version.status === 'available') {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', `${x}%`);
                line.setAttribute('y1', `${y}%`);
                line.setAttribute('x2', `${x}%`);
                line.setAttribute('y1', '80%');
                line.setAttribute('stroke', this.getStatusColor(version.status));
                line.setAttribute('stroke-width', '2');
                line.setAttribute('stroke-dasharray', '5,5');
                svg.appendChild(line);
            }
        });
        
        // Draw current position indicator
        const currentX = 5 + (this.currentTimelinePosition * 6);
        const indicator = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        indicator.setAttribute('cx', `${currentX}%`);
        indicator.setAttribute('cy', '50%');
        indicator.setAttribute('r', '12');
        indicator.setAttribute('fill', 'none');
        indicator.setAttribute('stroke', '#ffd700');
        indicator.setAttribute('stroke-width', '3');
        indicator.setAttribute('class', 'current-position-indicator');
        svg.appendChild(indicator);
        
        // Add temporal effects if enabled
        if (this.timeTravelEffects) {
            this.addTemporalEffects(svg);
        }
    }

    getStatusColor(status) {
        const statusColors = {
            'available': '#4a90e2',
            'beta': '#f5a623',
            'development': '#e91e63',
            'concept': '#9c27b0',
            'dream': '#673ab7',
            'speculation': '#3f51b5',
            'legend': '#2196f3'
        };
        
        return statusColors[status] || '#4a90e2';
    }

    addTemporalEffects(svg) {
        // Add visual effects indicating temporal energy
        for (let i = 0; i < 5; i++) {
            const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const x = Math.random() * 90 + 5;
            const y = Math.random() * 40 + 30;
            particle.setAttribute('cx', `${x}%`);
            particle.setAttribute('cy', `${y}%`);
            particle.setAttribute('r', '2');
            particle.setAttribute('fill', '#00d4ff');
            particle.setAttribute('opacity', '0.3');
            particle.setAttribute('class', 'temporal-particle');
            svg.appendChild(particle);
            
            // Animate particle
            setTimeout(() => {
                particle.remove();
            }, 3000 + Math.random() * 2000);
        }
    }

    generateFeatureMatrix() {
        const features = [
            { name: 'Start Menu', classic: '✓', modern: '✓', future: '✓', ai: '✓' },
            { name: 'Taskbar', classic: 'Basic', modern: 'Enhanced', future: 'Quantum', ai: 'Conscious' },
            { name: 'Window Management', classic: 'Simple', modern: 'Aero Snap', future: 'Neural', ai: 'Telepathic' },
            { name: 'File Explorer', classic: 'Basic', modern: 'Ribbon', future: 'Holographic', ai: 'Thought-File' },
            { name: 'Search', classic: '✗', modern: 'Basic', future: 'Predictive', ai: 'Omniscient' },
            { name: 'Cortana', classic: '✗', modern: '✗', future: 'Quantum AI', ai: 'Conscious AI' },
            { name: 'Virtual Desktop', classic: '✗', modern: '✓', future: 'Reality Layer', ai: 'Dimension Hop' },
            { name: 'Security', classic: 'Basic', modern: 'WDAG', future: 'Quantum Enc', ai: 'Conscious Auth' }
        ];
        
        const featureColumns = document.getElementById('feature-columns');
        const tableBody = document.getElementById('table-body');
        
        if (!featureColumns || !tableBody) return;
        
        // Generate columns
        const columnNames = ['Classic (95-XP)', 'Modern (Vista+)', 'Future (2025+)', 'AI Era'];
        featureColumns.innerHTML = columnNames.map(name => 
            `<div class="feature-column">${name}</div>`
        ).join('');
        
        // Generate rows
        tableBody.innerHTML = features.map(feature => `
            <div class="feature-row">
                <div class="feature-name">${feature.name}</div>
                <div class="feature-cell">${feature.classic}</div>
                <div class="feature-cell">${feature.modern}</div>
                <div class="feature-cell">${feature.future}</div>
                <div class="feature-cell">${feature.ai}</div>
            </div>
        `).join('');
    }

    setTimelineMode(mode) {
        this.timelineMode = mode;
        
        // Reorder versions based on mode
        switch (mode) {
            case 'thematic':
                this.reorderByTheme();
                break;
            case 'functional':
                this.reorderByFunction();
                break;
            default:
                this.reorderByChronological();
        }
        
        this.drawTimelineVisualization();
        this.generateVersionCards();
    }

    reorderByTheme() {
        // Group by theme families
        this.windowsVersions.sort((a, b) => {
            const themeOrder = {
                'classic-blue': 1,
                'luna': 2,
                'aero': 3,
                'metro': 4,
                'fluent': 5,
                'quantum-fluent': 6,
                'neural-interface': 7,
                'consciousness-os': 8,
                'reality-interface': 9,
                'post-human': 10,
                'transcendent': 11
            };
            return (themeOrder[a.theme] || 99) - (themeOrder[b.theme] || 99);
        });
    }

    reorderByFunction() {
        // Group by functional capability
        this.windowsVersions.sort((a, b) => {
            const functionalOrder = {
                'basic': 1,
                'enhanced': 2,
                'advanced': 3,
                'quantum': 4,
                'neural': 5,
                'conscious': 6,
                'transcendent': 7
            };
            
            const aFunc = this.getFunctionalLevel(a.theme);
            const bFunc = this.getFunctionalLevel(b.theme);
            return (functionalOrder[aFunc] || 99) - (functionalOrder[bFunc] || 99);
        });
    }

    getFunctionalLevel(theme) {
        if (theme.includes('classic') || theme === 'luna') return 'basic';
        if (theme.includes('aero') || theme === 'metro') return 'enhanced';
        if (theme === 'fluent' || theme === 'fluent-design') return 'advanced';
        if (theme === 'quantum-fluent') return 'quantum';
        if (theme.includes('neural') || theme.includes('consciousness')) return 'neural';
        if (theme.includes('reality') || theme.includes('transcendent')) return 'conscious';
        return 'transcendent';
    }

    reorderByChronological() {
        // Default chronological order
        this.windowsVersions.sort((a, b) => a.year - b.year);
    }

    filterVersions(filter) {
        const versionCards = document.querySelectorAll('.version-card');
        
        versionCards.forEach((card, index) => {
            const version = this.windowsVersions[index];
            let show = true;
            
            switch (filter) {
                case 'classic':
                    show = version.year <= 2001;
                    break;
                case 'modern':
                    show = version.year >= 2007 && version.year <= 2021;
                    break;
                case 'future':
                    show = version.year >= 2025;
                    break;
                default:
                    show = true;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }

    activateVersion(versionName) {
        const version = this.windowsVersions.find(v => 
            v.name.toLowerCase().replace(/\s+/g, '-') === versionName
        );
        
        if (!version) return;
        
        // Check if version is available
        if (version.status !== 'available' && version.status !== 'beta') {
            this.showVersionActivationError(version);
            return;
        }
        
        // Perform temporal jump
        this.performTemporalJump(version);
        
        console.log(`⏰ Activated ${version.name} (${version.year})`);
    }

    showVersionActivationError(version) {
        const error = document.createElement('div');
        error.className = 'version-activation-error';
        error.innerHTML = `
            <div class="error-icon">⏰</div>
            <div class="error-content">
                <div class="error-title">Temporal Restriction</div>
                <div class="error-description">${version.name} (${version.year}) is currently in ${version.status} status</div>
                <div class="error-suggestion">Please wait for temporal stabilization or use a different timeline</div>
            </div>
        `;
        
        document.body.appendChild(error);
        
        setTimeout(() => {
            error.remove();
        }, 4000);
    }

    performTemporalJump(version) {
        // Find the version index for positioning
        const versionIndex = this.windowsVersions.indexOf(version);
        
        // Update current position
        this.currentTimelinePosition = versionIndex;
        
        // Update display
        const positionElement = document.getElementById('tti-position');
        if (positionElement) {
            positionElement.textContent = `${version.name} (${version.year})`;
        }
        
        // Apply temporal effects
        if (this.timeTravelEffects) {
            this.showTemporalTransitionEffect(version);
        }
        
        // Update theme sample
        this.updateThemeSample(version);
        
        // Update temporal status
        this.temporalStability *= 0.95; // Slight decrease in stability after jump
        this.quantumCoherence *= 0.98; // Slight decrease in coherence
        
        // Auto-stabilize after delay
        setTimeout(() => {
            this.autoStabilize();
        }, 2000);
    }

    showTemporalTransitionEffect(version) {
        const transition = document.createElement('div');
        transition.className = 'temporal-transition';
        transition.innerHTML = `
            <div class="transition-content">
                <div class="temporal-swirl"></div>
                <div class="transition-text">Jumping to ${version.name}...</div>
                <div class="transition-year">${version.year}</div>
            </div>
        `;
        
        document.body.appendChild(transition);
        
        setTimeout(() => {
            transition.remove();
        }, 3000);
    }

    updateThemeSample(version) {
        const themeSample = document.getElementById('theme-sample');
        if (!themeSample) return;
        
        const themeColor = this.getThemeColor(version.theme);
        const retroBlend = this.retroFutureBlend / 100;
        
        // Update theme sample with version's characteristics
        themeSample.style.background = this.generateThemeBackground(themeColor, retroBlend);
    }

    generateThemeBackground(primaryColor, retroBlend) {
        const classicColors = ['#008080', '#4682b4', '#2f4f4f'];
        const futureColors = ['#00d4ff', '#8a2be2', '#ff69b4'];
        
        const classicColor = classicColors[Math.floor(Math.random() * classicColors.length)];
        const futureColor = futureColors[Math.floor(Math.random() * futureColors.length)];
        
        return `linear-gradient(45deg, 
            ${classicColor} ${(1 - retroBlend) * 100}%, 
            ${primaryColor} 50%, 
            ${futureColor} ${retroBlend * 100}%)`;
    }

    toggleThemeBlend() {
        // Cycle through different blend ratios
        const blends = [0, 25, 50, 75, 100];
        const currentIndex = blends.indexOf(this.retroFutureBlend);
        const nextIndex = (currentIndex + 1) % blends.length;
        
        this.retroFutureBlend = blends[nextIndex];
        document.getElementById('retro-blend').value = this.retroFutureBlend;
        this.updateControlSetting('retro-blend', this.retroFutureBlend);
        
        // Update button text
        const button = document.querySelector('.theme-toggle-btn');
        if (button) {
            button.textContent = `Blend: ${this.retroFutureBlend}%`;
        }
    }

    jumpToVersion(versionIndex) {
        if (versionIndex < 0 || versionIndex >= this.windowsVersions.length) return;
        
        const version = this.windowsVersions[versionIndex];
        this.performTemporalJump(version);
    }

    jumpToPrevious() {
        const prevIndex = Math.max(0, this.currentTimelinePosition - 1);
        this.jumpToVersion(prevIndex);
    }

    jumpToNext() {
        const nextIndex = Math.min(this.windowsVersions.length - 1, this.currentTimelinePosition + 1);
        this.jumpToVersion(nextIndex);
    }

    temporalScan() {
        // Perform a scan of the timeline for anomalies and opportunities
        const scan = {
            anomalies: this.detectTimelineAnomalies(),
            opportunities: this.detectTemporalOpportunities(),
            stability: this.temporalStability,
            coherence: this.quantumCoherence
        };
        
        this.showTemporalScanResults(scan);
        console.log('⏰ Temporal scan completed:', scan);
    }

    detectTimelineAnomalies() {
        const anomalies = [];
        
        // Check for instability in recent versions
        const recentVersions = this.windowsVersions.slice(-3);
        recentVersions.forEach(version => {
            if (version.status === 'development' || version.status === 'concept') {
                anomalies.push({
                    type: 'unstable-version',
                    version: version.name,
                    year: version.year,
                    severity: 'medium'
                });
            }
        });
        
        // Check for timeline gaps
        const years = this.windowsVersions.map(v => v.year);
        for (let i = 1; i < years.length; i++) {
            if (years[i] - years[i-1] > 5) {
                anomalies.push({
                    type: 'timeline-gap',
                    from: years[i-1],
                    to: years[i],
                    severity: 'low'
                });
            }
        }
        
        return anomalies;
    }

    detectTemporalOpportunities() {
        const opportunities = [];
        
        // Check for underutilized versions
        this.windowsVersions.forEach(version => {
            if (version.status === 'beta' && this.temporalStability > 0.9) {
                opportunities.push({
                    type: 'beta-testing',
                    version: version.name,
                    potential: 'high'
                });
            }
        });
        
        // Check for theme blending opportunities
        if (this.retroFutureBlend !== 50) {
            opportunities.push({
                type: 'theme-optimization',
                current: this.retroFutureBlend,
                suggestion: 'Try balanced 50% blend for optimal experience'
            });
        }
        
        return opportunities;
    }

    showTemporalScanResults(scan) {
        const results = document.createElement('div');
        results.className = 'temporal-scan-results';
        results.innerHTML = `
            <div class="scan-header">
                <div class="scan-icon">⏰</div>
                <div class="scan-title">Temporal Scan Results</div>
                <button class="scan-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="scan-content">
                <div class="scan-stats">
                    <div class="stat">
                        <span class="stat-label">Timeline Stability:</span>
                        <span class="stat-value">${Math.round(scan.stability * 100)}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Quantum Coherence:</span>
                        <span class="stat-value">${Math.round(scan.coherence * 100)}%</span>
                    </div>
                </div>
                ${scan.anomalies.length > 0 ? `
                    <div class="scan-section">
                        <h5>Anomalies Detected (${scan.anomalies.length})</h5>
                        ${scan.anomalies.map(a => `
                            <div class="scan-item anomaly">
                                <span class="item-type">${a.type}</span>
                                <span class="item-description">${this.formatAnomalyDescription(a)}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${scan.opportunities.length > 0 ? `
                    <div class="scan-section">
                        <h5>Opportunities Found (${scan.opportunities.length})</h5>
                        ${scan.opportunities.map(o => `
                            <div class="scan-item opportunity">
                                <span class="item-type">${o.type}</span>
                                <span class="item-description">${this.formatOpportunityDescription(o)}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(results);
        
        setTimeout(() => {
            results.remove();
        }, 8000);
    }

    formatAnomalyDescription(anomaly) {
        switch (anomaly.type) {
            case 'unstable-version':
                return `${anomaly.version} (${anomaly.year}) is currently unstable`;
            case 'timeline-gap':
                return `Gap detected between ${anomaly.from} and ${anomaly.to}`;
            default:
                return 'Unknown anomaly detected';
        }
    }

    formatOpportunityDescription(opportunity) {
        switch (opportunity.type) {
            case 'beta-testing':
                return `${opportunity.version} is available for beta testing`;
            case 'theme-optimization':
                return `Current blend: ${opportunity.current}%, ${opportunity.suggestion}`;
            default:
                return 'Opportunity detected';
        }
    }

    temporalJump() {
        // Perform a random temporal jump
        const availableVersions = this.windowsVersions.filter(v => 
            v.status === 'available' || v.status === 'beta'
        );
        
        if (availableVersions.length > 0) {
            const randomVersion = availableVersions[Math.floor(Math.random() * availableVersions.length)];
            this.performTemporalJump(randomVersion);
        }
    }

    emergencyStabilize() {
        // Emergency temporal stabilization
        this.temporalStability = 1.0;
        this.quantumCoherence = 0.9;
        
        // Reset to a stable version (Windows 11)
        const stableVersion = this.windowsVersions.find(v => v.name === 'Windows 11');
        if (stableVersion) {
            this.currentTimelinePosition = this.windowsVersions.indexOf(stableVersion);
            this.updatePositionDisplay();
        }
        
        console.log('⚠️ Emergency temporal stabilization completed');
        
        // Show stabilization effect
        this.showStabilizationEffect();
    }

    showStabilizationEffect() {
        const effect = document.createElement('div');
        effect.className = 'stabilization-effect';
        effect.innerHTML = `
            <div class="effect-content">
                <div class="stabilization-icon">⚠️</div>
                <div class="stabilization-text">Emergency Temporal Stabilization</div>
                <div class="stabilization-status">Timeline Stabilized</div>
            </div>
        `;
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 4000);
    }

    autoStabilize() {
        // Automatic stabilization after temporal operations
        const stabilizationRate = 0.02;
        this.temporalStability = Math.min(1.0, this.temporalStability + stabilizationRate);
        this.quantumCoherence = Math.min(0.9, this.quantumCoherence + stabilizationRate * 0.5);
    }

    updatePositionDisplay() {
        const positionElement = document.getElementById('tti-position');
        if (positionElement && this.windowsVersions[this.currentTimelinePosition]) {
            const version = this.windowsVersions[this.currentTimelinePosition];
            positionElement.textContent = `${version.name} (${version.year})`;
        }
    }

    getStabilityColor(stability) {
        if (stability > 0.95) return '#4caf50';
        if (stability > 0.85) return '#ff9800';
        return '#f44336';
    }

    getCoherenceColor(coherence) {
        if (coherence > 0.85) return '#2196f3';
        if (coherence > 0.75) return '#ff9800';
        return '#f44336';
    }

    updateControlSetting(id, value) {
        const valueSpan = document.getElementById(id).nextElementSibling;
        if (valueSpan) {
            if (id === 'retro-blend') {
                valueSpan.textContent = value + '%';
            } else {
                valueSpan.textContent = value + '%';
            }
        }
        
        // Update internal settings
        switch (id) {
            case 'retro-blend':
                this.retroFutureBlend = parseInt(value);
                break;
            case 'temporal-stability':
                this.temporalStability = parseInt(value) / 100;
                break;
        }
    }

    updateFeatureSetting(id, checked) {
        switch (id) {
            case 'time-travel-effects':
                this.timeTravelEffects = checked;
                break;
            case 'quantum-coherence':
                this.quantumCoherenceMonitoring = checked;
                break;
            case 'temporal-stability-check':
                this.autoStabilizationEnabled = checked;
                break;
            case 'future-predictions':
                this.futurePredictionsEnabled = checked;
                break;
        }
    }

    setPreset(presetName) {
        switch (presetName) {
            case 'classic':
                this.setClassicPreset();
                break;
            case 'modern':
                this.setModernPreset();
                break;
            case 'future':
                this.setFuturePreset();
                break;
            case 'blend':
                this.setBlendPreset();
                break;
        }
    }

    setClassicPreset() {
        document.getElementById('retro-blend').value = 90;
        document.getElementById('temporal-stability').value = 95;
        document.getElementById('time-travel-effects').checked = true;
        document.getElementById('quantum-coherence').checked = false;
        document.getElementById('future-predictions').checked = false;
        this.updateControlSetting('retro-blend', 90);
        this.updateControlSetting('temporal-stability', 95);
        this.updateFeatureSetting('time-travel-effects', true);
        this.updateFeatureSetting('quantum-coherence', false);
        this.updateFeatureSetting('future-predictions', false);
    }

    setModernPreset() {
        document.getElementById('retro-blend').value = 50;
        document.getElementById('temporal-stability').value = 100;
        document.getElementById('time-travel-effects').checked = true;
        document.getElementById('quantum-coherence').checked = true;
        document.getElementById('future-predictions').checked = true;
        this.updateControlSetting('retro-blend', 50);
        this.updateControlSetting('temporal-stability', 100);
        this.updateFeatureSetting('time-travel-effects', true);
        this.updateFeatureSetting('quantum-coherence', true);
        this.updateFeatureSetting('future-predictions', true);
    }

    setFuturePreset() {
        document.getElementById('retro-blend').value = 10;
        document.getElementById('temporal-stability').value = 85;
        document.getElementById('time-travel-effects').checked = true;
        document.getElementById('quantum-coherence').checked = true;
        document.getElementById('future-predictions').checked = true;
        this.updateControlSetting('retro-blend', 10);
        this.updateControlSetting('temporal-stability', 85);
        this.updateFeatureSetting('time-travel-effects', true);
        this.updateFeatureSetting('quantum-coherence', true);
        this.updateFeatureSetting('future-predictions', true);
    }

    setBlendPreset() {
        document.getElementById('retro-blend').value = 50;
        document.getElementById('temporal-stability').value = 90;
        document.getElementById('time-travel-effects').checked = true;
        document.getElementById('quantum-coherence').checked = true;
        document.getElementById('future-predictions').checked = true;
        document.getElementById('temporal-stability-check').checked = true;
        this.updateControlSetting('retro-blend', 50);
        this.updateControlSetting('temporal-stability', 90);
        this.updateFeatureSetting('time-travel-effects', true);
        this.updateFeatureSetting('quantum-coherence', true);
        this.updateFeatureSetting('future-predictions', true);
        this.updateFeatureSetting('temporal-stability-check', true);
    }

    exportTimeline() {
        const timelineData = {
            windowsVersions: this.windowsVersions,
            currentPosition: this.currentTimelinePosition,
            settings: {
                timelineMode: this.timelineMode,
                retroFutureBlend: this.retroFutureBlend,
                temporalStability: this.temporalStability,
                quantumCoherence: this.quantumCoherence,
                timeTravelEffects: this.timeTravelEffects
            },
            temporalData: {
                stabilityHistory: [], // Would track stability over time
                coherenceHistory: [],
                jumpHistory: [] // Would track temporal jumps
            },
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(timelineData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `time-travel-timeline-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    resetTimeline() {
        this.currentTimelinePosition = 11; // Windows 11
        this.retroFutureBlend = 50;
        this.temporalStability = 1.0;
        this.quantumCoherence = 0.8;
        this.timelineMode = 'chronological';
        
        // Reset UI
        document.getElementById('retro-blend').value = 50;
        document.getElementById('temporal-stability').value = 100;
        this.updateControlSetting('retro-blend', 50);
        this.updateControlSetting('temporal-stability', 100);
        
        this.updatePositionDisplay();
        this.drawTimelineVisualization();
        
        console.log('⏰ Timeline reset to default state');
    }

    saveTimelinePreferences() {
        const preferences = {
            currentPosition: this.currentTimelinePosition,
            retroFutureBlend: this.retroFutureBlend,
            temporalStability: this.temporalStability,
            quantumCoherence: this.quantumCoherence,
            timelineMode: this.timelineMode,
            timeTravelEffects: this.timeTravelEffects,
            autoStabilizationEnabled: this.autoStabilizationEnabled
        };
        localStorage.setItem('time-travel-preferences', JSON.stringify(preferences));
    }

    loadTimelinePreferences() {
        const saved = localStorage.getItem('time-travel-preferences');
        if (saved) {
            try {
                const prefs = JSON.parse(saved);
                this.currentTimelinePosition = prefs.currentPosition || 11;
                this.retroFutureBlend = prefs.retroFutureBlend || 50;
                this.temporalStability = prefs.temporalStability || 1.0;
                this.quantumCoherence = prefs.quantumCoherence || 0.8;
                this.timelineMode = prefs.timelineMode || 'chronological';
                this.timeTravelEffects = prefs.timeTravelEffects !== false;
                this.autoStabilizationEnabled = prefs.autoStabilizationEnabled !== false;
                
                // Update UI with loaded preferences
                document.getElementById('retro-blend').value = this.retroFutureBlend;
                document.getElementById('temporal-stability').value = this.temporalStability * 100;
                this.updatePositionDisplay();
            } catch (e) {
                console.warn('Failed to load timeline preferences:', e);
            }
        }
    }

    show() {
        const panel = document.getElementById('time-travel-panel');
        if (panel) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.opacity = '1';
            }, 10);
        }
    }

    hide() {
        const panel = document.getElementById('time-travel-panel');
        if (panel) {
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }

    adaptComplexity(level) {
        // Method called by other systems to adapt time travel interface complexity
        const complexityMap = {
            1: 'minimal',
            2: 'basic',
            3: 'standard',
            4: 'enhanced',
            5: 'advanced',
            6: 'temporal',
            7: 'quantum',
            8: 'neural',
            9: 'conscious',
            10: 'transcendent'
        };
        
        const interfaceLevel = complexityMap[level] || 'standard';
        // Apply complexity adaptations to interface
    }
}

// Initialize Time-Travel Interface
const timeTravel = new TimeTravelInterface();

// Auto-save preferences periodically
setInterval(() => {
    timeTravel.saveTimelinePreferences();
}, 30000);

// Add CSS styles
const timeStyles = `
<style>
.tti-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10005;
    background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
    border: 2px solid #00d4ff;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
    width: 700px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    color: #e0e0e0;
}

.tti-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid #00d4ff;
    border-radius: 13px 13px 0 0;
}

.tti-title {
    font-size: 18px;
    font-weight: bold;
    color: #00d4ff;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.tti-position {
    background: #00d4ff;
    color: #000;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
}

.tti-close {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: background 0.2s;
}

.tti-close:hover {
    background: rgba(255, 107, 107, 0.1);
}

.tti-display {
    padding: 20px;
}

.tti-timeline-visualization {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #00d4ff;
}

.timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.timeline-header h4 {
    color: #00d4ff;
    font-size: 16px;
    margin: 0;
}

.timeline-controls {
    display: flex;
    gap: 8px;
}

.timeline-mode-btn {
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #00d4ff;
    color: #00d4ff;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.timeline-mode-btn:hover,
.timeline-mode-btn.active {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #00d4ff;
}

.timeline-canvas {
    background: #000;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #00d4ff;
    margin-bottom: 15px;
}

.timeline-canvas svg {
    width: 100%;
    height: 200px;
}

.timeline-marker {
    cursor: pointer;
    transition: all 0.2s;
}

.timeline-marker:hover {
    r: 8;
    filter: drop-shadow(0 0 5px currentColor);
}

.current-position-indicator {
    animation: temporalPulse 2s infinite;
}

@keyframes temporalPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

.temporal-particle {
    animation: particleFloat 3s linear infinite;
}

@keyframes particleFloat {
    0% { transform: translateY(0px); opacity: 0.3; }
    50% { transform: translateY(-10px); opacity: 0.8; }
    100% { transform: translateY(0px); opacity: 0.3; }
}

.timeline-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
}

.temporal-status, .quantum-coherence {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-label, .coherence-label {
    color: #888;
}

.status-value, .coherence-value {
    font-weight: bold;
    color: #00d4ff;
}

.tti-version-selector {
    margin-bottom: 20px;
}

.selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.selector-header h4 {
    color: #00d4ff;
    font-size: 16px;
    margin: 0;
}

.version-filters {
    display: flex;
    gap: 5px;
}

.filter-btn {
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #00d4ff;
    color: #00d4ff;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 10px;
    transition: all 0.2s;
}

.filter-btn:hover,
.filter-btn.active {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 5px #00d4ff;
}

.versions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
}

.version-card {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid #00d4ff;
    border-radius: 8px;
    padding: 12px;
    transition: all 0.3s ease;
    position: relative;
}

.version-card:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: #00d4ff;
    box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
}

.version-card.status-beta {
    border-color: #f5a623;
}

.version-card.status-development {
    border-color: #e91e63;
}

.version-card.status-concept {
    border-color: #9c27b0;
}

.version-card.status-dream {
    border-color: #673ab7;
}

.version-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.version-year {
    font-size: 12px;
    font-weight: bold;
    color: #00d4ff;
}

.version-status {
    font-size: 9px;
    color: #888;
    text-transform: uppercase;
}

.version-name {
    font-size: 13px;
    font-weight: bold;
    color: #e0e0e0;
    margin-bottom: 4px;
}

.version-theme {
    font-size: 10px;
    color: #888;
    margin-bottom: 8px;
}

.version-preview {
    height: 40px;
    margin-bottom: 8px;
    border-radius: 4px;
    overflow: hidden;
}

.preview-desktop {
    height: 100%;
    position: relative;
}

.preview-taskbar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: #0078d4;
}

.version-activate-btn {
    width: 100%;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #00d4ff;
    color: #00d4ff;
    padding: 6px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 10px;
    transition: all 0.2s;
}

.version-activate-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 5px #00d4ff;
}

.tti-theme-preview {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.preview-header h4 {
    color: #00d4ff;
    font-size: 14px;
    margin: 0;
}

.theme-toggle-btn {
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #00d4ff;
    color: #00d4ff;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.theme-toggle-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #00d4ff;
}

.theme-showcase {
    background: #000;
    border-radius: 6px;
    padding: 10px;
    border: 1px solid #00d4ff;
}

.theme-sample {
    height: 150px;
    background: linear-gradient(45deg, #2a2a2a 0%, #1a1a1a 50%, #00d4ff 100%);
    border-radius: 4px;
    overflow: hidden;
}

.theme-desktop {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.theme-taskbar {
    height: 20px;
    background: #0078d4;
    display: flex;
    align-items: center;
    padding: 0 8px;
    font-size: 8px;
    color: white;
    position: relative;
}

.theme-start-btn {
    background: linear-gradient(145deg, #4a90e2, #2a5298);
    padding: 2px 6px;
    border-radius: 2px;
    margin-right: 8px;
}

.theme-window-controls {
    margin-left: auto;
    display: flex;
    gap: 2px;
}

.control-btn {
    width: 10px;
    height: 10px;
    background: #ccc;
    border-radius: 1px;
    font-size: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
}

.control-btn.close {
    background: #f44336;
    color: white;
}

.theme-clock {
    margin-left: 8px;
    font-size: 8px;
}

.theme-content {
    flex: 1;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.theme-window {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 2px;
    overflow: hidden;
    width: 80px;
}

.theme-titlebar {
    background: linear-gradient(145deg, #0078d4, #106ebe);
    height: 12px;
    display: flex;
    align-items: center;
    padding: 0 4px;
}

.theme-title {
    color: white;
    font-size: 7px;
    font-weight: bold;
}

.theme-body {
    padding: 3px;
}

.theme-text {
    color: #000;
    font-size: 6px;
    margin-bottom: 2px;
}

.theme-elements {
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.theme-button {
    background: #e0e0e0;
    border: 1px solid #999;
    color: #000;
    padding: 1px 3px;
    font-size: 5px;
    text-align: center;
    border-radius: 2px;
}

.theme-checkbox {
    color: #000;
    font-size: 5px;
}

.tti-features-matrix {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.matrix-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.matrix-header h4 {
    color: #00d4ff;
    font-size: 14px;
    margin: 0;
}

.matrix-legend {
    display: flex;
    gap: 10px;
    font-size: 10px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.legend-color {
    width: 8px;
    height: 8px;
    border-radius: 2px;
}

.legend-color.available { background: #4a90e2; }
.legend-color.beta { background: #f5a623; }
.legend-color.concept { background: #9c27b0; }
.legend-color.dream { background: #673ab7; }

.features-table {
    border: 1px solid #00d4ff;
    border-radius: 4px;
    overflow: hidden;
}

.table-header {
    display: flex;
    background: rgba(0, 212, 255, 0.1);
    border-bottom: 1px solid #00d4ff;
}

.feature-name {
    flex: 1;
    padding: 8px;
    font-weight: bold;
    color: #00d4ff;
    font-size: 11px;
}

.feature-columns {
    display: flex;
    flex: 2;
}

.feature-column {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-weight: bold;
    color: #00d4ff;
    font-size: 10px;
    border-left: 1px solid rgba(0, 212, 255, 0.3);
}

.table-body {
    max-height: 200px;
    overflow-y: auto;
}

.feature-row {
    display: flex;
    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
}

.feature-row:nth-child(even) {
    background: rgba(0, 0, 0, 0.2);
}

.feature-row:hover {
    background: rgba(0, 212, 255, 0.1);
}

.feature-row .feature-name {
    font-size: 10px;
    color: #ccc;
}

.feature-cell {
    flex: 1;
    padding: 6px;
    text-align: center;
    font-size: 9px;
    color: #e0e0e0;
    border-left: 1px solid rgba(0, 212, 255, 0.2);
}

.tti-controls {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.tti-control-group {
    margin-bottom: 15px;
}

.tti-control-group h4 {
    color: #00d4ff;
    margin-bottom: 10px;
    font-size: 14px;
}

.time-nav {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
}

.nav-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #00d4ff;
    color: #00d4ff;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.nav-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #00d4ff;
}

.tti-slider {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
}

.tti-slider label {
    min-width: 120px;
    font-size: 12px;
}

.tti-slider input[type="range"] {
    flex: 1;
}

.tti-slider span {
    min-width: 40px;
    text-align: right;
    font-size: 12px;
    color: #00d4ff;
}

.tti-checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
}

.tti-checkbox input {
    margin-right: 8px;
}

.tti-presets {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.tti-preset-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #00d4ff;
    color: #00d4ff;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.tti-preset-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 10px #00d4ff;
}

.tti-actions {
    display: flex;
    gap: 8px;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0 0 13px 13px;
}

.tti-action-btn {
    flex: 1;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #00d4ff;
    color: #00d4ff;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.tti-action-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    box-shadow: 0 0 5px #00d4ff;
}

/* Overlay effects */
.temporal-transition {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid #00d4ff;
    border-radius: 15px;
    padding: 30px;
    z-index: 10007;
    text-align: center;
    animation: temporalTransition 3s ease-in-out;
}

@keyframes temporalTransition {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
}

.transition-content {
    position: relative;
}

.temporal-swirl {
    width: 60px;
    height: 60px;
    border: 3px solid #00d4ff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: temporalSwirl 2s linear infinite;
    margin: 0 auto 15px;
}

@keyframes temporalSwirl {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.transition-text {
    font-size: 18px;
    color: #00d4ff;
    margin-bottom: 8px;
}

.transition-year {
    font-size: 14px;
    color: #888;
}

.stabilization-effect {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 69, 0, 0.9);
    border: 2px solid #ff4500;
    border-radius: 10px;
    padding: 20px;
    z-index: 10006;
    text-align: center;
    animation: stabilizationPulse 4s ease-in-out;
}

@keyframes stabilizationPulse {
    0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    25%, 75% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

.stabilization-icon {
    font-size: 48px;
    margin-bottom: 10px;
    color: #fff;
}

.stabilization-text {
    font-size: 16px;
    color: #fff;
    margin-bottom: 8px;
}

.stabilization-status {
    font-size: 12px;
    color: #ffd700;
}

.temporal-anomaly-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    border: 1px solid #ff4500;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    z-index: 10008;
    animation: anomalySlideIn 0.3s ease-out;
}

@keyframes anomalySlideIn {
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
}

.anomaly-icon {
    font-size: 20px;
    color: #ff4500;
}

.anomaly-content {
    flex: 1;
}

.anomaly-title {
    font-size: 12px;
    color: #ff4500;
    font-weight: bold;
    margin-bottom: 4px;
}

.anomaly-description {
    font-size: 11px;
    color: #ccc;
    margin-bottom: 4px;
}

.anomaly-action {
    font-size: 10px;
    color: #888;
}

.version-activation-error {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid #ff4500;
    border-radius: 10px;
    padding: 20px;
    z-index: 10009;
    text-align: center;
    animation: errorPulse 4s ease-in-out;
}

@keyframes errorPulse {
    0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

.error-icon {
    font-size: 48px;
    margin-bottom: 10px;
    color: #ff4500;
}

.error-title {
    font-size: 16px;
    color: #ff4500;
    margin-bottom: 8px;
}

.error-description {
    font-size: 12px;
    color: #ccc;
    margin-bottom: 8px;
}

.error-suggestion {
    font-size: 11px;
    color: #888;
}

.temporal-scan-results {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.95);
    border: 2px solid #00d4ff;
    border-radius: 10px;
    padding: 20px;
    z-index: 10010;
    max-width: 500px;
    width: 90vw;
    max-height: 80vh;
    overflow: auto;
}

.scan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid #00d4ff;
    padding-bottom: 10px;
}

.scan-icon {
    font-size: 24px;
    color: #00d4ff;
}

.scan-title {
    font-size: 16px;
    color: #00d4ff;
    font-weight: bold;
    flex: 1;
    text-align: center;
}

.scan-close {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 16px;
    cursor: pointer;
}

.scan-content {
    color: #e0e0e0;
}

.scan-stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    padding: 10px;
    background: rgba(0, 212, 255, 0.1);
    border-radius: 6px;
}

.stat {
    text-align: center;
}

.stat-label {
    display: block;
    font-size: 10px;
    color: #888;
    margin-bottom: 4px;
}

.stat-value {
    font-size: 14px;
    font-weight: bold;
    color: #00d4ff;
}

.scan-section {
    margin-bottom: 15px;
}

.scan-section h5 {
    color: #00d4ff;
    font-size: 13px;
    margin-bottom: 8px;
}

.scan-item {
    padding: 6px;
    margin-bottom: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
}

.scan-item.anomaly {
    background: rgba(255, 69, 0, 0.2);
    border-left: 3px solid #ff4500;
}

.scan-item.opportunity {
    background: rgba(0, 212, 255, 0.2);
    border-left: 3px solid #00d4ff;
}

.item-type {
    font-weight: bold;
    min-width: 60px;
}

.item-description {
    flex: 1;
    color: #ccc;
}

@media (max-width: 600px) {
    .tti-container {
        width: 95vw;
    }
    
    .versions-grid {
        grid-template-columns: 1fr;
    }
    
    .tti-presets {
        flex-wrap: wrap;
    }
    
    .scan-stats {
        flex-direction: column;
        gap: 5px;
    }
    
    .timeline-controls {
        flex-wrap: wrap;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', timeStyles);