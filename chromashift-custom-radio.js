// ChromaShift Custom Radio Station System
// Allow users to create and manage their own radio stations

import { musicPlaylist } from './chromashift-audio.js';
import { playerTracker } from './chromashift-player-tracker.js';

class CustomRadioManager {
    constructor() {
        this.customStations = this.loadCustomStations();
        this.currentCustomStation = null;
        this.audioContext = null;
        this.currentAudio = null;
        this.isPlaying = false;
        this.stationUpdateInterval = null;
    }

    // Initialize the custom radio system
    async init() {
        this.setupEventListeners();
        this.updateStationDisplay();
        
        console.log('Custom Radio Manager initialized:', {
            customStations: this.customStations.length,
            stations: this.customStations.map(s => ({ name: s.name, tracks: s.tracks.length }))
        });
    }

    // Load custom stations from localStorage
    loadCustomStations() {
        try {
            const saved = localStorage.getItem('chromashift-custom-stations');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.warn('Failed to load custom stations:', error);
            return [];
        }
    }

    // Save custom stations to localStorage
    saveCustomStations() {
        try {
            localStorage.setItem('chromashift-custom-stations', JSON.stringify(this.customStations));
        } catch (error) {
            console.warn('Failed to save custom stations:', error);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Create radio manager UI
        this.createRadioManagerUI();
        
        // Listen for file uploads
        document.addEventListener('change', (e) => {
            if (e.target && e.target.id === 'audio-file-input') {
                this.handleAudioFileUpload(e.target.files);
            }
        });
    }

    // Create radio manager UI
    createRadioManagerUI() {
        const radioManager = document.createElement('div');
        radioManager.id = 'radio-manager';
        radioManager.className = 'radio-manager';
        radioManager.innerHTML = `
            <button class="modal-close" onclick="closeRadioManager()">&times;</button>
            <div class="radio-header">
                <div class="radio-title">🎵 Custom Radio Station Creator</div>
                <div class="radio-subtitle">Design your own broadcast experience</div>
            </div>
            
            <div class="radio-section">
                <div class="section-title">Create New Station</div>
                <div class="form-group">
                    <label class="form-label">Station Name</label>
                    <input type="text" id="station-name" class="form-input" placeholder="My Dream Radio Station">
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea id="station-description" class="form-textarea" placeholder="Describe your station's atmosphere..."></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Genre</label>
                    <select id="station-genre" class="form-select">
                        <option value="ambient">Ambient</option>
                        <option value="electronic">Electronic</option>
                        <option value="lofi">Lo-Fi</option>
                        <option value="vaporwave">Vaporwave</option>
                        <option value="experimental">Experimental</option>
                        <option value="dreamwave">Dreamwave</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Upload Audio Files</label>
                    <input type="file" id="audio-file-input" class="form-file" multiple accept="audio/*">
                    <small style="color: #888; font-size: 10px;">Support: MP3, WAV, OGG (max 10MB per file)</small>
                </div>
            </div>
            
            <div class="radio-section">
                <div class="section-title">Your Custom Stations</div>
                <div id="custom-stations-list">
                    ${this.renderStationsList()}
                </div>
            </div>
            
            <div class="radio-actions">
                <button class="radio-btn primary" onclick="createCustomStation()">Create Station</button>
                <button class="radio-btn" onclick="closeRadioManager()">Close</button>
            </div>
        `;
        
        document.body.appendChild(radioManager);
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'modal-overlay';
        overlay.className = 'modal-overlay';
        overlay.onclick = () => closeRadioManager();
        document.body.appendChild(overlay);
    }

    // Render stations list
    renderStationsList() {
        if (this.customStations.length === 0) {
            return '<p style="color: #888; font-size: 12px; text-align: center;">No custom stations created yet</p>';
        }
        
        return this.customStations.map(station => `
            <div class="station-item" data-station-id="${station.id}">
                <div class="station-info">
                    <div class="station-name">${station.name}</div>
                    <div class="station-meta">
                        <span class="station-genre">${station.genre}</span>
                        <span class="station-tracks">${station.tracks.length} tracks</span>
                    </div>
                    <div class="station-description">${station.description}</div>
                </div>
                <div class="station-controls">
                    <button class="station-btn" onclick="playCustomStation('${station.id}')">▶️ Play</button>
                    <button class="station-btn" onclick="editCustomStation('${station.id}')">✏️ Edit</button>
                    <button class="station-btn danger" onclick="deleteCustomStation('${station.id}')">🗑️ Delete</button>
                </div>
            </div>
        `).join('');
    }

    // Handle audio file upload
    async handleAudioFileUpload(files) {
        const fileList = Array.from(files);
        const audioFiles = fileList.filter(file => file.type.startsWith('audio/'));
        
        if (audioFiles.length === 0) {
            this.showNotification('No valid audio files selected', 'warning');
            return;
        }
        
        // Validate file sizes
        const maxSize = 10 * 1024 * 1024; // 10MB
        const validFiles = audioFiles.filter(file => file.size <= maxSize);
        
        if (validFiles.length < audioFiles.length) {
            this.showNotification('Some files were too large (max 10MB each)', 'warning');
        }
        
        // Process files
        const processedFiles = [];
        for (const file of validFiles) {
            try {
                const audioData = await this.processAudioFile(file);
                processedFiles.push({
                    name: file.name,
                    size: file.size,
                    duration: audioData.duration,
                    url: audioData.url,
                    metadata: audioData.metadata
                });
            } catch (error) {
                console.warn('Failed to process audio file:', file.name, error);
                this.showNotification(`Failed to process ${file.name}`, 'error');
            }
        }
        
        if (processedFiles.length > 0) {
            this.showNotification(`${processedFiles.length} audio file(s) ready for station`, 'success');
            return processedFiles;
        }
        
        return [];
    }

    // Process audio file and extract metadata
    processAudioFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const url = URL.createObjectURL(file);
            
            const audio = new Audio();
            audio.onloadedmetadata = () => {
                const metadata = {
                    duration: audio.duration,
                    title: this.extractTitleFromFilename(file.name),
                    artist: 'Unknown Artist',
                    album: 'Custom Station'
                };
                
                resolve({
                    url,
                    duration: audio.duration,
                    metadata
                });
            };
            
            audio.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load audio'));
            };
            
            reader.onload = () => {
                audio.src = reader.result;
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsArrayBuffer(file);
        });
    }

    // Extract title from filename
    extractTitleFromFilename(filename) {
        return filename
            .replace(/\.[^/.]+$/, '') // Remove extension
            .replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
            .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
    }

    // Create new custom station
    async createCustomStation() {
        const nameInput = document.getElementById('station-name');
        const descInput = document.getElementById('station-description');
        const genreSelect = document.getElementById('station-genre');
        const fileInput = document.getElementById('audio-file-input');
        
        const name = nameInput.value.trim();
        const description = descInput.value.trim();
        const genre = genreSelect.value;
        const audioFiles = fileInput.files;
        
        if (!name) {
            this.showNotification('Please enter a station name', 'warning');
            return;
        }
        
        // Check if name already exists
        if (this.customStations.some(station => station.name.toLowerCase() === name.toLowerCase())) {
            this.showNotification('A station with this name already exists', 'warning');
            return;
        }
        
        // Process uploaded files
        let tracks = [];
        if (audioFiles && audioFiles.length > 0) {
            try {
                const processedFiles = await this.handleAudioFileUpload(audioFiles);
                tracks = processedFiles.map((fileData, index) => ({
                    id: `track_${Date.now()}_${index}`,
                    ...fileData
                }));
            } catch (error) {
                this.showNotification('Failed to process audio files', 'error');
                return;
            }
        }
        
        // Create station
        const station = {
            id: `station_${Date.now()}`,
            name,
            description,
            genre,
            tracks,
            created: Date.now(),
            playCount: 0,
            lastPlayed: null,
            settings: {
                shuffle: false,
                repeat: 'none', // 'none', 'one', 'all'
                volume: 0.8,
                crossfade: 0
            }
        };
        
        this.customStations.push(station);
        this.saveCustomStations();
        this.updateStationDisplay();
        playerTracker.recordRadioStationCreation();
        
        // Clear form
        nameInput.value = '';
        descInput.value = '';
        genreSelect.value = 'ambient';
        fileInput.value = '';
        
        this.showNotification(`Station "${name}" created successfully!`, 'success');
    }

    // Play custom station
    async playCustomStation(stationId) {
        const station = this.customStations.find(s => s.id === stationId);
        if (!station) {
            this.showNotification('Station not found', 'error');
            return;
        }
        
        if (station.tracks.length === 0) {
            this.showNotification('This station has no tracks', 'warning');
            return;
        }
        
        this.currentCustomStation = station;
        station.playCount++;
        station.lastPlayed = Date.now();
        this.saveCustomStations();
        this.updateStationDisplay();
        
        // Stop any currently playing audio
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        
        // Shuffle tracks if needed
        let tracks = [...station.tracks];
        if (station.settings.shuffle) {
            tracks = this.shuffleArray(tracks);
        }
        
        this.playNextTrack(tracks, 0, station.settings);
        
        console.log(`Playing custom station: ${station.name}`);
        this.showNotification(`Now playing: ${station.name}`, 'info');
    }

    // Play next track in station
    playNextTrack(tracks, index, settings) {
        if (index >= tracks.length) {
            if (settings.repeat === 'all') {
                this.playNextTrack(tracks, 0, settings);
            } else {
                this.isPlaying = false;
                this.currentCustomStation = null;
                this.showNotification('Station playback ended', 'info');
            }
            return;
        }
        
        const track = tracks[index];
        this.playTrack(track, () => {
            setTimeout(() => {
                this.playNextTrack(tracks, index + 1, settings);
            }, settings.crossfade * 1000);
        });
    }

    // Play individual track
    playTrack(track, onEnd) {
        this.currentAudio = new Audio(track.url);
        this.currentAudio.volume = this.currentCustomStation.settings.volume;
        this.isPlaying = true;
        
        this.currentAudio.onended = () => {
            if (onEnd) onEnd();
        };
        
        this.currentAudio.onerror = () => {
            console.error('Failed to play track:', track.name);
            this.showNotification(`Failed to play ${track.name}`, 'error');
            if (onEnd) onEnd();
        };
        
        this.currentAudio.play().catch(error => {
            console.error('Failed to play audio:', error);
            this.showNotification('Failed to start playback', 'error');
        });
    }

    // Stop current station
    stopCustomStation() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        
        this.isPlaying = false;
        this.currentCustomStation = null;
        this.showNotification('Station stopped', 'info');
    }

    // Edit custom station
    editCustomStation(stationId) {
        const station = this.customStations.find(s => s.id === stationId);
        if (!station) return;
        
        // Populate form with station data
        document.getElementById('station-name').value = station.name;
        document.getElementById('station-description').value = station.description;
        document.getElementById('station-genre').value = station.genre;
        
        // Add edit functionality to the create button
        const createBtn = document.querySelector('.radio-btn.primary');
        createBtn.textContent = 'Update Station';
        createBtn.onclick = () => this.updateCustomStation(stationId);
        
        this.showNotification('Station data loaded for editing', 'info');
    }

    // Update custom station
    updateCustomStation(stationId) {
        const station = this.customStations.find(s => s.id === stationId);
        if (!station) return;
        
        const nameInput = document.getElementById('station-name');
        const descInput = document.getElementById('station-description');
        const genreSelect = document.getElementById('station-genre');
        
        station.name = nameInput.value.trim() || station.name;
        station.description = descInput.value.trim() || station.description;
        station.genre = genreSelect.value;
        station.lastModified = Date.now();
        
        this.saveCustomStations();
        this.updateStationDisplay();
        
        // Reset create button
        const createBtn = document.querySelector('.radio-btn.primary');
        createBtn.textContent = 'Create Station';
        createBtn.onclick = () => this.createCustomStation();
        
        this.showNotification(`Station "${station.name}" updated!`, 'success');
    }

    // Delete custom station
    deleteCustomStation(stationId) {
        if (!confirm('Are you sure you want to delete this station?')) {
            return;
        }
        
        const stationIndex = this.customStations.findIndex(s => s.id === stationId);
        if (stationIndex === -1) return;
        
        const station = this.customStations[stationIndex];
        this.customStations.splice(stationIndex, 1);
        this.saveCustomStations();
        
        // Stop if this station is playing
        if (this.currentCustomStation && this.currentCustomStation.id === stationId) {
            this.stopCustomStation();
        }
        
        this.updateStationDisplay();
        this.showNotification(`Station "${station.name}" deleted`, 'success');
    }

    // Update station display
    updateStationDisplay() {
        const stationsList = document.getElementById('custom-stations-list');
        if (stationsList) {
            stationsList.innerHTML = this.renderStationsList();
        }
    }

    // Shuffle array utility
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 15px;
            background: ${type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 
                        type === 'error' ? 'rgba(255, 0, 136, 0.9)' : 
                        type === 'warning' ? 'rgba(255, 255, 0, 0.9)' : 
                        'rgba(255, 0, 255, 0.9)'};
            color: #000;
            border-radius: 5px;
            z-index: 2000;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            font-weight: bold;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Get all custom stations
    getCustomStations() {
        return [...this.customStations];
    }

    // Get currently playing station
    getCurrentStation() {
        return this.currentCustomStation;
    }

    // Export stations data
    exportStations() {
        return {
            stations: this.customStations,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }
}

// Global functions for UI events
window.createCustomStation = () => {
    if (window.customRadioManager) {
        window.customRadioManager.createCustomStation();
    }
};

window.closeRadioManager = () => {
    const manager = document.getElementById('radio-manager');
    const overlay = document.getElementById('modal-overlay');
    
    if (manager) manager.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
};

window.playCustomStation = (stationId) => {
    if (window.customRadioManager) {
        window.customRadioManager.playCustomStation(stationId);
    }
};

window.editCustomStation = (stationId) => {
    if (window.customRadioManager) {
        window.customRadioManager.editCustomStation(stationId);
    }
};

window.deleteCustomStation = (stationId) => {
    if (window.customRadioManager) {
        window.customRadioManager.deleteCustomStation(stationId);
    }
};

window.openRadioManager = () => {
    const manager = document.getElementById('radio-manager');
    const overlay = document.getElementById('modal-overlay');
    
    if (manager) manager.classList.add('show');
    if (overlay) overlay.classList.add('show');
    
    if (window.customRadioManager) {
        window.customRadioManager.updateStationDisplay();
    }
};

// Export singleton instance
export const customRadioManager = new CustomRadioManager();

// Export for global access
if (typeof window !== 'undefined') {
    window.customRadioManager = customRadioManager;
}