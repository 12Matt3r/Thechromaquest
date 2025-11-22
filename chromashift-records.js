// chromashift-records.js
// Persistent Anomaly System for ChromaShift Dreamscape

// Simple localStorage-based anomaly storage
// In a production environment, this could be replaced with a real database
export class ChromaRecords {
    constructor() {
        this.storageKey = 'chromashift_anomalies';
        this.loadAnomalies();
    }

    loadAnomalies() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.anomalies = stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.warn('Failed to load anomalies from localStorage:', e);
            this.anomalies = [];
        }
    }

    saveAnomalies() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.anomalies));
        } catch (e) {
            console.warn('Failed to save anomalies to localStorage:', e);
        }
    }

    async createAnomaly({ title, text, image_url = null, audio_url = null, anomaly_type = 'discovery' }) {
        const anomaly = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            title,
            text,
            image_url,
            audio_url,
            anomaly_type, // 'discovery', 'injection', 'shared'
            influence_count: 0,
            last_seen: Date.now(),
            tags: this.extractTags(text),
            // Influence probability (0.0 to 1.0) - increases as more players encounter it
            influence_strength: 0.1 + (Math.random() * 0.3), // Start with 10-40% influence
            status: 'active'
        };

        this.anomalies.unshift(anomaly);
        this.saveAnomalies();
        return anomaly;
    }

    async injectAnomaly({ title, text, image_url = null, audio_url = null }) {
        // Create a stronger anomaly for player-injected content
        const anomaly = await this.createAnomaly({
            title,
            text,
            image_url,
            audio_url,
            anomaly_type: 'injection'
        });
        
        // Injected anomalies have higher initial influence
        anomaly.influence_strength = 0.6 + (Math.random() * 0.3); // 60-90% influence
        this.saveAnomalies();
        
        return anomaly;
    }

    getAnomalies(filter = 'all') {
        switch (filter) {
            case 'recent':
                return this.anomalies.filter(a => Date.now() - a.timestamp < 3600000); // Last hour
            case 'injections':
                return this.anomalies.filter(a => a.anomaly_type === 'injection');
            case 'discoveries':
                return this.anomalies.filter(a => a.anomaly_type === 'discovery');
            case 'active':
                return this.anomalies.filter(a => a.status === 'active');
            default:
                return this.anomalies;
        }
    }

    getRandomInfluencingAnomaly() {
        const activeAnomalies = this.getAnomalies('active');
        if (activeAnomalies.length === 0) return null;

        // Weight anomalies by their influence strength
        const weighted = activeAnomalies.map(a => ({
            anomaly: a,
            weight: a.influence_strength
        }));

        const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
        let random = Math.random() * totalWeight;

        for (const { anomaly, weight } of weighted) {
            random -= weight;
            if (random <= 0) {
                // Mark as seen to increase influence
                anomaly.last_seen = Date.now();
                anomaly.influence_count++;
                anomaly.influence_strength = Math.min(1.0, anomaly.influence_strength + 0.02);
                this.saveAnomalies();
                return anomaly;
            }
        }

        return weighted[weighted.length - 1].anomaly;
    }

    extractTags(text) {
        // Extract potential tags from text (words that might trigger influences)
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 3);
        
        // Focus on surreal/anomaly-related terms
        const surrealWords = ['liquid', 'melting', 'floating', 'glowing', 'whisper', 'echo', 
                             'mirror', 'shadow', 'distorted', 'pulsing', 'shimmering'];
        
        return words.filter(word => surrealWords.includes(word));
    }

    // Check if text contains anomalies that should be influenced
    checkForInfluences(sceneText) {
        const influences = [];
        const activeAnomalies = this.getAnomalies('active');
        
        for (const anomaly of activeAnomalies) {
            // Simple text matching - in production this could be more sophisticated
            const hasInfluence = anomaly.tags.some(tag => 
                sceneText.toLowerCase().includes(tag)
            );
            
            if (hasInfluence && Math.random() < anomaly.influence_strength) {
                influences.push({
                    type: 'anomaly_influence',
                    anomaly,
                    suggestion: this.generateInfluence(anomaly, sceneText)
                });
            }
        }
        
        return influences;
    }

    generateInfluence(anomaly, sceneText) {
        // Generate how the anomaly might influence the current scene
        const influenceTypes = [
            `You notice the ${anomaly.title.toLowerCase()} emerging from the peripheral vision`,
            `The air shimmers with memories of ${anomaly.title.toLowerCase()}`,
            `Your fingers tingle with the residual essence of ${anomaly.title.toLowerCase()}`,
            `The light bends around something that reminds you of ${anomaly.title.toLowerCase()}`
        ];
        
        return influenceTypes[Math.floor(Math.random() * influenceTypes.length)];
    }
}

// Singleton instance
export const chromaRecords = new ChromaRecords();

// UI Functions
export function renderAnomaliesUI(anomalies) {
    const container = document.getElementById('anomaly-feed');
    if (!container) return;

    container.innerHTML = '';
    
    anomalies.slice(0, 10).forEach(anomaly => {
        const element = document.createElement('div');
        element.className = `anomaly-card ${anomaly.anomaly_type}`;
        
        const timeAgo = Math.floor((Date.now() - anomaly.timestamp) / 60000);
        const timeStr = timeAgo < 1 ? 'just now' : `${timeAgo}m ago`;
        
        element.innerHTML = `
            <div class="anomaly-header">
                <h4>${anomaly.title}</h4>
                <span class="anomaly-time">${timeStr}</span>
            </div>
            <div class="anomaly-content">
                <p>${anomaly.text}</p>
                ${anomaly.image_url ? `<img src="${anomaly.image_url}" alt="anomaly evidence" class="anomaly-image">` : ''}
                ${anomaly.audio_url ? `<audio controls src="${anomaly.audio_url}" class="anomaly-audio"></audio>` : ''}
            </div>
            <div class="anomaly-meta">
                <span class="anomaly-type">${anomaly.anomaly_type}</span>
                <span class="influence-count">🔄 ${anomaly.influence_count}</span>
            </div>
        `;
        
        container.appendChild(element);
    });
}

export function createAnomalyForm() {
    return `
        <form id="anomaly-form" class="anomaly-form">
            <h3>Log Dream Anomaly</h3>
            <div class="form-group">
                <label for="anomaly-title">Title</label>
                <input type="text" id="anomaly-title" placeholder="e.g., 'Baby Dolphins in the Meat Cooler'" required>
            </div>
            <div class="form-group">
                <label for="anomaly-description">Description</label>
                <textarea id="anomaly-description" rows="3" placeholder="Describe what you witnessed in the dream..." required></textarea>
            </div>
            <div class="form-group">
                <label for="anomaly-image">Evidence (optional)</label>
                <input type="file" id="anomaly-image" accept="image/*">
            </div>
            <div class="form-group">
                <label for="anomaly-audio">Audio Log (optional)</label>
                <input type="file" id="anomaly-audio" accept="audio/*">
            </div>
            <button type="submit" class="anomaly-submit">Inject into Dreamscape</button>
            <div id="anomaly-feedback"></div>
        </form>
    `;
}

// Initialize anomaly system
export function initAnomalySystem() {
    // Create anomaly feed container if it doesn't exist
    if (!document.getElementById('anomaly-feed')) {
        const feed = document.createElement('div');
        feed.id = 'anomaly-feed';
        feed.className = 'anomaly-feed';
        
        // Add to bottom bar (integrate seamlessly)
        const bottomBar = document.getElementById('bottom-bar');
        if (bottomBar) {
            bottomBar.appendChild(feed);
        }
    }

    // Add anomaly form to command interface
    const commandInterface = document.getElementById('command-interface');
    if (commandInterface) {
        const anomalyToggle = document.createElement('button');
        anomalyToggle.id = 'anomaly-toggle';
        anomalyToggle.textContent = '📋 Log Anomaly';
        anomalyToggle.title = 'Log anomalies for other dreamers to discover';
        commandInterface.appendChild(anomalyToggle);

        anomalyToggle.addEventListener('click', () => {
            showAnomalyModal();
        });
    }

    // Setup form submission
    setupAnomalyForm();
    
    // Auto-refresh anomaly feed
    setInterval(() => {
        const anomalies = chromaRecords.getAnomalies('recent');
        renderAnomaliesUI(anomalies);
    }, 30000); // Update every 30 seconds
}

function showAnomalyModal() {
    // Create modal for anomaly logging
    const modal = document.createElement('div');
    modal.id = 'anomaly-modal';
    modal.className = 'anomaly-modal';
    
    modal.innerHTML = `
        <div class="anomaly-modal-content">
            <div class="anomaly-modal-header">
                <h3>Inject Dream Anomaly</h3>
                <button class="anomaly-modal-close">&times;</button>
            </div>
            ${createAnomalyForm()}
            <div class="anomaly-info">
                <p><strong>How it works:</strong> Your logged anomaly becomes part of the shared dreamscape. Other players may encounter your creation when the dream logic finds it relevant. Inject baby dolphins, floating clocks, or any surreal element you imagine!</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    modal.querySelector('.anomaly-modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function setupAnomalyForm() {
    document.addEventListener('submit', async (e) => {
        if (e.target.id === 'anomaly-form') {
            e.preventDefault();
            
            const title = document.getElementById('anomaly-title').value.trim();
            const description = document.getElementById('anomaly-description').value.trim();
            const imageFile = document.getElementById('anomaly-image').files[0];
            const audioFile = document.getElementById('anomaly-audio').files[0];
            
            let image_url = null, audio_url = null;
            
            try {
                // In a real implementation, you'd upload to a server
                // For now, we'll use data URLs for images
                if (imageFile) {
                    image_url = await fileToDataURL(imageFile);
                }
                
                if (audioFile) {
                    audio_url = await fileToDataURL(audioFile);
                }
                
                await chromaRecords.injectAnomaly({
                    title,
                    text: description,
                    image_url,
                    audio_url
                });
                
                document.getElementById('anomaly-feedback').textContent = 
                    '✅ Anomaly injected! Other dreamers may encounter your creation.';
                document.getElementById('anomaly-feedback').className = 'success';
                
                setTimeout(() => {
                    document.getElementById('anomaly-modal').remove();
                }, 2000);
                
            } catch (error) {
                console.error('Failed to create anomaly:', error);
                document.getElementById('anomaly-feedback').textContent = 
                    '❌ Failed to inject anomaly. Please try again.';
                document.getElementById('anomaly-feedback').className = 'error';
            }
        }
    });
}

function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}