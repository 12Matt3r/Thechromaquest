// CRT Emulation System - Hyper-Realistic Monitor Simulation
// Authentic scan lines, phosphor decay, screen curvature, and bloom effects

class CRTEmulationSystem {
    constructor() {
        this.isActive = false;
        this.scanLinesVisible = true;
        this.phosphorDecay = true;
        this.curvatureEnabled = true;
        this.bloomEnabled = true;
        this.flickerIntensity = 0.1;
        this.bezelColor = '#2a2a2a';
        this.screenTint = 'rgba(0, 255, 0, 0.05)'; // Green tint
        this.init();
    }

    init() {
        console.log('🖥️ CRT Emulation System initialized');
        this.createCRTInterface();
        this.setupEventListeners();
        this.loadPreferences();
    }

    createCRTInterface() {
        const crtPanel = document.createElement('div');
        crtPanel.id = 'crt-emulation-panel';
        crtPanel.innerHTML = `
            <div class="crt-container">
                <div class="crt-monitor">
                    <div class="crt-bezel">
                        <div class="crt-brand">IBM PS/2</div>
                        <div class="crt-controls">
                            <div class="crt-power-light"></div>
                            <div class="crt-control-knob brightness">
                                <div class="knob-label">BRIGHT</div>
                            </div>
                            <div class="crt-control-knob contrast">
                                <div class="knob-label">CONTRAST</div>
                            </div>
                        </div>
                    </div>
                    <div class="crt-screen-container">
                        <div class="crt-screen" id="crt-screen">
                            <div class="crt-overlay" id="crt-overlay">
                                <div class="scan-lines" id="scan-lines"></div>
                                <div class="phosphor-glow" id="phosphor-glow"></div>
                                <div class="screen-curvature" id="screen-curvature"></div>
                                <div class="bloom-effect" id="bloom-effect"></div>
                                <div class="flicker-overlay" id="flicker-overlay"></div>
                            </div>
                        </div>
                    </div>
                    <div class="crt-stand">
                        <div class="crt-stand-neck"></div>
                        <div class="crt-stand-base"></div>
                    </div>
                </div>
                <div class="crt-controls-panel">
                    <div class="crt-control-group">
                        <h3>CRT Effects</h3>
                        <div class="crt-toggle-group">
                            <label class="crt-checkbox">
                                <input type="checkbox" id="toggle-scan-lines" checked>
                                <span>Scan Lines</span>
                            </label>
                            <label class="crt-checkbox">
                                <input type="checkbox" id="toggle-phosphor" checked>
                                <span>Phosphor Glow</span>
                            </label>
                            <label class="crt-checkbox">
                                <input type="checkbox" id="toggle-curvature" checked>
                                <span>Screen Curvature</span>
                            </label>
                            <label class="crt-checkbox">
                                <input type="checkbox" id="toggle-bloom" checked>
                                <span>Bloom Effect</span>
                            </label>
                            <label class="crt-checkbox">
                                <input type="checkbox" id="toggle-flicker">
                                <span>Screen Flicker</span>
                            </label>
                        </div>
                    </div>
                    <div class="crt-control-group">
                        <h3>Monitor Settings</h3>
                        <div class="crt-slider-group">
                            <label>Phosphor Decay:</label>
                            <input type="range" id="phosphor-decay-slider" min="0" max="100" value="50">
                            <span id="phosphor-decay-value">50%</span>
                        </div>
                        <div class="crt-slider-group">
                            <label>Bloom Intensity:</label>
                            <input type="range" id="bloom-intensity-slider" min="0" max="100" value="30">
                            <span id="bloom-intensity-value">30%</span>
                        </div>
                        <div class="crt-slider-group">
                            <label>Flicker Level:</label>
                            <input type="range" id="flicker-level-slider" min="0" max="50" value="10">
                            <span id="flicker-level-value">10%</span>
                        </div>
                    </div>
                    <div class="crt-control-group">
                        <h3>Preset Modes</h3>
                        <button class="crt-preset-btn" onclick="crtEmulation.setPreset('authentic')">Authentic 1987</button>
                        <button class="crt-preset-btn" onclick="crtEmulation.setPreset('enhanced')">Enhanced Visual</button>
                        <button class="crt-preset-btn" onclick="crtEmulation.setPreset('minimal')">Minimal Effects</button>
                        <button class="crt-preset-btn" onclick="crtEmulation.setPreset('vintage')">Vintage Gaming</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(crtPanel);
        
        this.createScanLines();
        this.startPhosphorDecay();
        this.startFlicker();
    }

    createScanLines() {
        const scanLinesContainer = document.getElementById('scan-lines');
        if (!scanLinesContainer) return;
        
        scanLinesContainer.innerHTML = '';
        
        // Create authentic scan line pattern
        const lineHeight = 2;
        const gapHeight = 1;
        const totalLines = Math.ceil(window.innerHeight / (lineHeight + gapHeight));
        
        for (let i = 0; i < totalLines; i++) {
            const line = document.createElement('div');
            line.className = 'scan-line';
            line.style.top = `${i * (lineHeight + gapHeight)}px`;
            line.style.height = `${lineHeight}px`;
            line.style.background = 'rgba(0, 0, 0, 0.3)';
            scanLinesContainer.appendChild(line);
        }
        
        // Add horizontal sync lines
        for (let i = 0; i < 20; i++) {
            const syncLine = document.createElement('div');
            syncLine.className = 'sync-line';
            syncLine.style.top = `${Math.random() * window.innerHeight}px`;
            syncLine.style.height = '1px';
            syncLine.style.background = 'rgba(255, 255, 255, 0.1)';
            syncLine.style.animationDelay = `${Math.random() * 2}s`;
            scanLinesContainer.appendChild(syncLine);
        }
    }

    startPhosphorDecay() {
        if (!this.phosphorDecay) return;
        
        setInterval(() => {
            this.updatePhosphorGlow();
        }, 50); // Update every 50ms for smooth decay
        
        setInterval(() => {
            this.createPhosphorBurst();
        }, 2000 + Math.random() * 3000); // Random phosphor bursts
    }

    updatePhosphorGlow() {
        const phosphorGlow = document.getElementById('phosphor-glow');
        if (!phosphorGlow) return;
        
        const decayLevel = Math.random() * 0.1 + 0.95; // Slight random decay
        phosphorGlow.style.opacity = decayLevel;
        
        // Green phosphor effect
        phosphorGlow.style.background = `radial-gradient(ellipse at center, 
            rgba(0, 255, 0, ${decayLevel * 0.1}) 0%, 
            rgba(0, 255, 0, ${decayLevel * 0.05}) 50%, 
            transparent 100%)`;
    }

    createPhosphorBurst() {
        const phosphorGlow = document.getElementById('phosphor-glow');
        if (!phosphorGlow) return;
        
        const burst = document.createElement('div');
        burst.className = 'phosphor-burst';
        burst.style.left = `${Math.random() * 100}%`;
        burst.style.top = `${Math.random() * 100}%`;
        burst.style.width = `${Math.random() * 50 + 20}px`;
        burst.style.height = burst.style.width;
        burst.style.background = `radial-gradient(circle, 
            rgba(0, 255, 0, 0.3) 0%, 
            rgba(0, 255, 0, 0.1) 50%, 
            transparent 100%)`;
        
        phosphorGlow.appendChild(burst);
        
        setTimeout(() => {
            burst.remove();
        }, 500 + Math.random() * 1000);
    }

    startFlicker() {
        if (!this.flickerIntensity) return;
        
        setInterval(() => {
            this.updateFlicker();
        }, 100); // Update flicker 10 times per second
    }

    updateFlicker() {
        const flickerOverlay = document.getElementById('flicker-overlay');
        if (!flickerOverlay) return;
        
        // Simulate authentic CRT flicker
        const flickerIntensity = (Math.random() - 0.5) * this.flickerIntensity * 0.1;
        flickerOverlay.style.opacity = Math.abs(flickerIntensity);
        flickerOverlay.style.background = `linear-gradient(${flickerIntensity > 0 ? 'to bottom' : 'to top'}, 
            rgba(255, 255, 255, ${Math.abs(flickerIntensity)}) 0%, 
            transparent 50%, 
            rgba(0, 0, 0, ${Math.abs(flickerIntensity)}) 100%)`;
    }

    setupEventListeners() {
        // Toggle switches
        document.getElementById('toggle-scan-lines')?.addEventListener('change', (e) => {
            this.scanLinesVisible = e.target.checked;
            this.toggleScanLines(e.target.checked);
        });

        document.getElementById('toggle-phosphor')?.addEventListener('change', (e) => {
            this.phosphorDecay = e.target.checked;
            this.togglePhosphor(e.target.checked);
        });

        document.getElementById('toggle-curvature')?.addEventListener('change', (e) => {
            this.curvatureEnabled = e.target.checked;
            this.toggleCurvature(e.target.checked);
        });

        document.getElementById('toggle-bloom')?.addEventListener('change', (e) => {
            this.bloomEnabled = e.target.checked;
            this.toggleBloom(e.target.checked);
        });

        document.getElementById('toggle-flicker')?.addEventListener('change', (e) => {
            this.flickerEnabled = e.target.checked;
            this.toggleFlicker(e.target.checked);
        });

        // Sliders
        document.getElementById('phosphor-decay-slider')?.addEventListener('input', (e) => {
            this.phosphorDecayIntensity = e.target.value / 100;
            document.getElementById('phosphor-decay-value').textContent = `${e.target.value}%`;
        });

        document.getElementById('bloom-intensity-slider')?.addEventListener('input', (e) => {
            this.bloomIntensity = e.target.value / 100;
            document.getElementById('bloom-intensity-value').textContent = `${e.target.value}%`;
            this.updateBloomIntensity();
        });

        document.getElementById('flicker-level-slider')?.addEventListener('input', (e) => {
            this.flickerIntensity = e.target.value / 100;
            document.getElementById('flicker-level-value').textContent = `${e.target.value}%`;
        });
    }

    toggleScanLines(enabled) {
        const scanLines = document.getElementById('scan-lines');
        if (scanLines) {
            scanLines.style.opacity = enabled ? '1' : '0';
        }
    }

    togglePhosphor(enabled) {
        const phosphorGlow = document.getElementById('phosphor-glow');
        if (phosphorGlow) {
            phosphorGlow.style.opacity = enabled ? '1' : '0';
        }
    }

    toggleCurvature(enabled) {
        const screenCurvature = document.getElementById('screen-curvature');
        if (screenCurvature) {
            if (enabled) {
                screenCurvature.style.background = `
                    radial-gradient(ellipse at center, 
                        transparent 60%, 
                        rgba(0, 0, 0, 0.1) 70%, 
                        rgba(0, 0, 0, 0.3) 80%, 
                        rgba(0, 0, 0, 0.5) 90%, 
                        rgba(0, 0, 0, 0.8) 100%)
                `;
            } else {
                screenCurvature.style.background = 'transparent';
            }
        }
    }

    toggleBloom(enabled) {
        const bloomEffect = document.getElementById('bloom-effect');
        if (bloomEffect) {
            bloomEffect.style.opacity = enabled ? '0.3' : '0';
        }
    }

    toggleFlicker(enabled) {
        if (!enabled) {
            const flickerOverlay = document.getElementById('flicker-overlay');
            if (flickerOverlay) {
                flickerOverlay.style.opacity = '0';
            }
        }
    }

    updateBloomIntensity() {
        const bloomEffect = document.getElementById('bloom-effect');
        if (bloomEffect) {
            const intensity = this.bloomIntensity || 0.3;
            bloomEffect.style.background = `
                radial-gradient(ellipse at center, 
                    rgba(255, 255, 255, ${intensity * 0.2}) 0%, 
                    rgba(255, 255, 255, ${intensity * 0.1}) 30%, 
                    transparent 70%)
            `;
        }
    }

    setPreset(presetName) {
        switch (presetName) {
            case 'authentic':
                this.setAuthentic();
                break;
            case 'enhanced':
                this.setEnhanced();
                break;
            case 'minimal':
                this.setMinimal();
                break;
            case 'vintage':
                this.setVintage();
                break;
        }
        
        this.savePreferences();
    }

    setAuthentic() {
        // 1987 IBM PS/2 authentic settings
        document.getElementById('toggle-scan-lines').checked = true;
        document.getElementById('toggle-phosphor').checked = true;
        document.getElementById('toggle-curvature').checked = true;
        document.getElementById('toggle-bloom').checked = false;
        document.getElementById('toggle-flicker').checked = true;
        
        document.getElementById('phosphor-decay-slider').value = 70;
        document.getElementById('bloom-intensity-slider').value = 0;
        document.getElementById('flicker-level-slider').value = 20;
        
        this.applySettings();
    }

    setEnhanced() {
        // Enhanced visual effects for modern displays
        document.getElementById('toggle-scan-lines').checked = true;
        document.getElementById('toggle-phosphor').checked = true;
        document.getElementById('toggle-curvature').checked = true;
        document.getElementById('toggle-bloom').checked = true;
        document.getElementById('toggle-flicker').checked = false;
        
        document.getElementById('phosphor-decay-slider').value = 50;
        document.getElementById('bloom-intensity-slider').value = 30;
        document.getElementById('flicker-level-slider').value = 5;
        
        this.applySettings();
    }

    setMinimal() {
        // Minimal effects for performance
        document.getElementById('toggle-scan-lines').checked = false;
        document.getElementById('toggle-phosphor').checked = false;
        document.getElementById('toggle-curvature').checked = false;
        document.getElementById('toggle-bloom').checked = false;
        document.getElementById('toggle-flicker').checked = false;
        
        this.applySettings();
    }

    setVintage() {
        // Gaming-focused vintage settings
        document.getElementById('toggle-scan-lines').checked = true;
        document.getElementById('toggle-phosphor').checked = true;
        document.getElementById('toggle-curvature').checked = true;
        document.getElementById('toggle-bloom').checked = true;
        document.getElementById('toggle-flicker').checked = true;
        
        document.getElementById('phosphor-decay-slider').value = 30;
        document.getElementById('bloom-intensity-slider').value = 50;
        document.getElementById('flicker-level-slider').value = 30;
        
        this.applySettings();
    }

    applySettings() {
        this.scanLinesVisible = document.getElementById('toggle-scan-lines').checked;
        this.phosphorDecay = document.getElementById('toggle-phosphor').checked;
        this.curvatureEnabled = document.getElementById('toggle-curvature').checked;
        this.bloomEnabled = document.getElementById('toggle-bloom').checked;
        this.flickerEnabled = document.getElementById('toggle-flicker').checked;
        
        this.phosphorDecayIntensity = document.getElementById('phosphor-decay-slider').value / 100;
        this.bloomIntensity = document.getElementById('bloom-intensity-slider').value / 100;
        this.flickerIntensity = document.getElementById('flicker-level-slider').value / 100;
        
        document.getElementById('phosphor-decay-value').textContent = `${document.getElementById('phosphor-decay-slider').value}%`;
        document.getElementById('bloom-intensity-value').textContent = `${document.getElementById('bloom-intensity-slider').value}%`;
        document.getElementById('flicker-level-value').textContent = `${document.getElementById('flicker-level-slider').value}%`;
        
        this.toggleScanLines(this.scanLinesVisible);
        this.togglePhosphor(this.phosphorDecay);
        this.toggleCurvature(this.curvatureEnabled);
        this.toggleBloom(this.bloomEnabled);
        this.toggleFlicker(this.flickerEnabled);
        this.updateBloomIntensity();
    }

    savePreferences() {
        const preferences = {
            scanLinesVisible: this.scanLinesVisible,
            phosphorDecay: this.phosphorDecay,
            curvatureEnabled: this.curvatureEnabled,
            bloomEnabled: this.bloomEnabled,
            flickerEnabled: this.flickerEnabled,
            phosphorDecayIntensity: this.phosphorDecayIntensity,
            bloomIntensity: this.bloomIntensity,
            flickerIntensity: this.flickerIntensity
        };
        localStorage.setItem('crt-emulation-prefs', JSON.stringify(preferences));
    }

    loadPreferences() {
        const saved = localStorage.getItem('crt-emulation-prefs');
        if (saved) {
            const prefs = JSON.parse(saved);
            Object.assign(this, prefs);
            this.applySettings();
        }
    }

    show() {
        const panel = document.getElementById('crt-emulation-panel');
        if (panel) {
            panel.style.display = 'block';
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.opacity = '1';
            }, 10);
        }
    }

    hide() {
        const panel = document.getElementById('crt-emulation-panel');
        if (panel) {
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }
}

// Initialize CRT Emulation System
const crtEmulation = new CRTEmulationSystem();

// Auto-apply CRT effects to DreamOS interface
window.addEventListener('load', () => {
    setTimeout(() => {
        crtEmulation.setPreset('enhanced');
    }, 1000);
});

// Add CSS styles for CRT effects
const crtStyles = `
<style>
.crt-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    background: #1a1a1a;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
}

.crt-monitor {
    background: ${'#2a2a2a'};
    border-radius: 15px;
    padding: 20px;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
    margin-bottom: 20px;
}

.crt-bezel {
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.crt-brand {
    color: #00ff00;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    font-size: 14px;
}

.crt-controls {
    display: flex;
    align-items: center;
    gap: 15px;
}

.crt-power-light {
    width: 8px;
    height: 8px;
    background: #00ff00;
    border-radius: 50%;
    box-shadow: 0 0 10px #00ff00;
    animation: powerPulse 2s infinite;
}

@keyframes powerPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.crt-control-knob {
    position: relative;
    width: 30px;
    height: 30px;
    background: radial-gradient(circle, #555, #333);
    border-radius: 50%;
    border: 2px solid #000;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.8);
}

.knob-label {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: #ccc;
    font-size: 10px;
    font-weight: bold;
    white-space: nowrap;
}

.crt-screen-container {
    background: #000;
    border-radius: 10px;
    padding: 10px;
    box-shadow: inset 0 0 10px rgba(0, 255, 0, 0.2);
}

.crt-screen {
    width: 100%;
    height: 400px;
    background: #000;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
}

.crt-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
}

.scan-lines, .phosphor-glow, .screen-curvature, 
.bloom-effect, .flicker-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
}

.scan-line {
    position: absolute;
    width: 100%;
    pointer-events: none;
}

.sync-line {
    position: absolute;
    width: 100%;
    animation: syncBlink 3s infinite;
    pointer-events: none;
}

@keyframes syncBlink {
    0%, 90%, 100% { opacity: 0; }
    5%, 10% { opacity: 0.3; }
}

.phosphor-burst {
    position: absolute;
    border-radius: 50%;
    animation: phosphorDecay 1s ease-out forwards;
}

@keyframes phosphorDecay {
    0% { opacity: 0.8; transform: scale(0); }
    50% { opacity: 0.4; transform: scale(1); }
    100% { opacity: 0; transform: scale(2); }
}

.crt-stand {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
}

.crt-stand-neck {
    width: 30px;
    height: 60px;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border-radius: 5px;
}

.crt-stand-base {
    width: 200px;
    height: 20px;
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.crt-controls-panel {
    background: #222;
    border-radius: 10px;
    padding: 20px;
    color: #ccc;
    min-width: 400px;
}

.crt-control-group {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #333;
}

.crt-control-group:last-child {
    border-bottom: none;
}

.crt-control-group h3 {
    color: #00ff00;
    margin-bottom: 10px;
    font-size: 14px;
}

.crt-checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;
}

.crt-checkbox input {
    margin-right: 8px;
    transform: scale(1.2);
}

.crt-slider-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
}

.crt-slider-group label {
    min-width: 120px;
    font-size: 12px;
}

.crt-slider-group input[type="range"] {
    flex: 1;
    height: 5px;
    background: #333;
    border-radius: 2px;
    outline: none;
}

.crt-slider-group span {
    min-width: 40px;
    text-align: right;
    font-size: 12px;
    color: #00ff00;
}

.crt-preset-btn {
    background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
    border: 1px solid #555;
    color: #ccc;
    padding: 8px 12px;
    margin: 2px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
}

.crt-preset-btn:hover {
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    border-color: #00ff00;
    color: #00ff00;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', crtStyles);