// Audio systems for ChromaShift: TTS narration and music player.
import { sleep, triggerRealityFlash, triggerEyeBlink } from './chromashift-state-ui.js';

// --- Global TTS toggle state ---
let ttsEnabled = true;

/**
 * Checks if Text-to-Speech (TTS) is currently enabled.
 * @returns {boolean} True if TTS is enabled, false otherwise.
 */
export const isTTSEnabled = () => ttsEnabled;

// --- Music Player State and Playlist ---
let backgroundMusic = null;
let audioIsReady = false;
let currentTrackIndex = 0;
let shuffledPlaylist = [];

// --- NEW: Audio Preloading Cache ---
let preloadedAudioUrl = null;
let preloadedTrackPath = null;
let lastPreloadedObjectUrl = null;


export const musicPlaylist = [
    'Journey to the interweb.mp3',
    'Rhythm of the Reef.mp3',
    'WhoIsThisDiva.mp3',
    'BratSummer.mp3',
    'Portal of Peace.mp3',
    'Midnight at the Virtual Mall.mp3',
    'Vaporwave Sunset Cruise.mp3',
    'Lost Signals on Windows 95.mp3',
    '1-800-dreamscape.mp3',
    'Where the Ocean Ends.mp3',
    'Slow Burn Waves.mp3',
    'You Were Never Really Here.mp3',
    'VeryDemure.mp3',
    'Timeless Analog Tides.mp3',
    'The Quiet Space.mp3',
    'Supermarket Nostalgia.mp3',
    'Subliminal Drift.mp3',
    'Sleepwalk Through the Stars.mp3',
    'Shimmering Shores.mp3',
    'Palm Trees & Neon Reflections.mp3',
    'GoblinMode.mp3',
    'turned up on this one.mp3',
    'Dreamcatcher Beats.mp3',
    'Coral Chords.mp3',
    'BananaForScale.mp3',
    'Ａｆｔｅｒｈｏｕｒｓ Ａｅｒｏｂｉｃｓ.mp3',
    '(  D--- S a V e Y o U R T e a R S---b  ).mp3',
    'Vintage Currents.mp3',
    'Oceanfront Oldies.mp3',
    'Lost Wave Loops.mp3',
    'Lost in the Algorithm.mp3',
    'Kaleidoscope Dreams.mp3',
    'Golden Clouds.mp3',
    'Wavelengths of Yesterday.mp3',
    'WaterTok.mp3',
    'Sand Between the Bars.mp3',
    'Relaxing on Another Plane.mp3',
    'Pier to Nowhere.mp3',
    'Nostalgia for a Future That Never Was.mp3',
    'Late Night Online Shopping.mp3',
    'journey through stillness.mp3',
    'infinite Peace.mp3',
    'Floating Through Sound.mp3',
    'FairyGrunge.mp3',
    'Echoes of the Unseen.mp3',
    'Dial-up Dreams.mp3',
    'Datastream Sunset.mp3',
    '1Tales from the Womp.mp3',
    'sofa king sad boi-smile .mp3',
    'Voices in the Datacloud.mp3',
    'Weirdcore.mp3',
    'The Sound of Abandoned Websites.mp3',
    'Simulated Emotions.mp3',
    'Saltwater Echoes.mp3',
    'Rizz.mp3',
    'QuietLuxury.mp3',
    'Pretty Anime Girl.mp3',
    'Old Film Filters.mp3',
    'Nostalgic Currents.mp3',
    'MootUp.mp3',
    'Geeeee Wiz.mp3',
    'Endless Summer on Betamax.mp3',
    'DopamineDecor.mp3',
    'DAYDREAMERS SURF.mp3',
    'Beyond the Ordinary.mp3',
    'AñoNuevo.mp3'
];

/**
 * Shuffles the music playlist using the Fisher-Yates algorithm.
 * @private
 */
const shufflePlaylist = () => {
    shuffledPlaylist = [...musicPlaylist];
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
    }
};

/**
 * Selects the next track from the shuffled playlist.
 * @returns {number} The new track index.
 * @private
 */
const getNextTrackIndex = () => {
    if (shuffledPlaylist.length === 0) {
        shufflePlaylist();
    }
    const nextTrack = shuffledPlaylist.pop();
    return musicPlaylist.indexOf(nextTrack);
};

/**
 * Updates the play/pause button icon and body class based on the music player's state.
 * @private
 */
const updatePlayPauseIcon = () => {
    const playPauseBtn = document.getElementById('music-play-pause');
    if (!playPauseBtn || !backgroundMusic) return;
    const isPlaying = !backgroundMusic.paused;
    playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
    document.body.classList.toggle('music-playing', isPlaying);
};

/**
 * Formats and displays the current song title.
 * @private
 */
const updateSongTitle = () => {
    const titleEl = document.getElementById('song-title');
    if (!titleEl || !backgroundMusic || !backgroundMusic.src) return;

    try {
        const url = new URL(backgroundMusic.src);
        const filename = decodeURIComponent(url.pathname.split('/').pop());
        titleEl.textContent = filename.replace(/\.mp3$/i, '');
    } catch (e) {
        console.warn('Could not parse song title from src:', backgroundMusic.src, e);
        titleEl.textContent = 'Unknown Track';
    }
};

/**
 * Plays the track at the current index.
 * @returns {Promise<void>} A promise that resolves when playback starts or rejects on error.
 * @private
 */
const playCurrentTrack = async () => {
    if (!audioIsReady || !backgroundMusic || musicPlaylist.length === 0) return;

    const trackPath = musicPlaylist[currentTrackIndex];

    if (preloadedTrackPath === trackPath && preloadedAudioUrl) {
        backgroundMusic.src = preloadedAudioUrl;
        preloadedAudioUrl = null;
        preloadedTrackPath = null;
    } else {
        backgroundMusic.src = trackPath;
    }

    updateSongTitle();
    backgroundMusic.currentTime = 0;
    try {
        await backgroundMusic.play();
        updatePlayPauseIcon();
        preloadNextTrack(); // Preload the next track
    } catch (error) {
        console.error('Failed to start track playback:', error);
        throw error;
    }
};

/**
 * Advances to the next track in the playlist.
 * @param {boolean} [autoPlay=true] - Whether to automatically play the next track.
 * @returns {Promise<void>} A promise that resolves when the track is changed.
 * @private
 */
const goToNextTrack = async (autoPlay = true) => {
    if (!audioIsReady || !backgroundMusic || musicPlaylist.length === 0) return;
    currentTrackIndex = getNextTrackIndex();

    const trackPath = musicPlaylist[currentTrackIndex];

    if (preloadedTrackPath === trackPath && preloadedAudioUrl) {
        backgroundMusic.src = preloadedAudioUrl;
        preloadedAudioUrl = null;
        preloadedTrackPath = null;
    } else {
        backgroundMusic.src = trackPath;
    }

    updateSongTitle();
    backgroundMusic.currentTime = 0;
    if (autoPlay) {
        try {
            await backgroundMusic.play();
            preloadNextTrack(); // Preload the next track
        } catch (error) {
            // Ignore auto-play errors (likely due to user interaction policies or missing file)
            console.warn('Failed to auto-play next track (ignoring):', error);
        }
    }
    updatePlayPauseIcon();
};

/**
 * Asynchronously fetches the next track's audio data and caches it as a blob URL.
 * Manages the cache to ensure only one track is preloaded at a time.
 * @private
 */
const preloadNextTrack = async () => {
    if (shuffledPlaylist.length === 0) {
        shufflePlaylist();
    }
    const nextTrackPath = shuffledPlaylist[shuffledPlaylist.length - 1];

    try {
        const response = await fetch(nextTrackPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();

        if (lastPreloadedObjectUrl) {
            URL.revokeObjectURL(lastPreloadedObjectUrl);
        }

        preloadedAudioUrl = URL.createObjectURL(blob);
        preloadedTrackPath = nextTrackPath;
        lastPreloadedObjectUrl = preloadedAudioUrl;

        console.log(`[Preload] Successfully preloaded: ${nextTrackPath}`);
    } catch (error) {
        console.error(`[Preload] Failed to preload track ${nextTrackPath}:`, error);
        preloadedAudioUrl = null;
        preloadedTrackPath = null;
    }
};

/**
 * Ensures background music is playing, primarily for accompanying narration.
 * @returns {Promise<void>}
 * @private
 */
const ensureMusicForNarration = async () => {
    if (!audioIsReady || !backgroundMusic || !backgroundMusic.paused) return;
    try {
        await backgroundMusic.play();
        updatePlayPauseIcon();
    } catch (error) {
        console.warn('[Music] Could not resume background music for narration:', error);
    }
};

/**
 * Attaches event listeners to the music player controls.
 * @private
 */
const setupMusicControls = () => {
    const playPauseBtn = document.getElementById('music-play-pause');
    const volDownBtn = document.getElementById('music-vol-down');
    const volUpBtn = document.getElementById('music-vol-up');
    const nextBtn = document.getElementById('music-next');

    playPauseBtn?.addEventListener('click', async () => {
        if (!audioIsReady || !backgroundMusic) return;
        if (backgroundMusic.paused) {
            await playCurrentTrack();
        } else {
            backgroundMusic.pause();
            updatePlayPauseIcon();
        }
    });

    volDownBtn?.addEventListener('click', () => {
        if (!audioIsReady || !backgroundMusic) return;
        backgroundMusic.volume = Math.max(0, backgroundMusic.volume - 0.1);
    });

    volUpBtn?.addEventListener('click', () => {
        if (!audioIsReady || !backgroundMusic) return;
        backgroundMusic.volume = Math.min(1, backgroundMusic.volume + 0.1);
    });

    nextBtn?.addEventListener('click', () => goToNextTrack(true));
};

/**
 * Attaches event listeners to the TTS toggle button.
 * @private
 */
const setupTTSControls = () => {
    const ttsToggleBtn = document.getElementById('tts-toggle');
    if (!ttsToggleBtn) return;

    const updateButtonState = () => {
        ttsToggleBtn.textContent = ttsEnabled ? '🔊 TTS' : '🔇 TTS';
        document.body.classList.toggle('tts-muted', !ttsEnabled);
    };

    updateButtonState();

    ttsToggleBtn.addEventListener('click', () => {
        ttsEnabled = !ttsEnabled;
        updateButtonState();
    });
};

/**
 * Initializes the music player, sets up controls, and attaches event listeners.
 * @export
 */
export const initMusicPlayer = () => {
    if (backgroundMusic) return;
    backgroundMusic = document.getElementById('main-audio');
    if (!backgroundMusic) {
        console.error('Audio element with ID "main-audio" not found.');
        return;
    }

    backgroundMusic.loop = false;
    backgroundMusic.volume = 0.5;
    audioIsReady = true;

    const firstTrackName = 'Journey to the interweb.mp3';
    const firstTrackIndex = musicPlaylist.indexOf(firstTrackName);
    currentTrackIndex = firstTrackIndex !== -1 ? firstTrackIndex : 0;
    if (musicPlaylist.length > 0) {
        backgroundMusic.src = musicPlaylist[currentTrackIndex];
    }

    setupMusicControls();
    setupTTSControls();

    backgroundMusic.addEventListener('ended', () => goToNextTrack(true));
    backgroundMusic.addEventListener('play', updatePlayPauseIcon);
    backgroundMusic.addEventListener('pause', updatePlayPauseIcon);

    console.log('Audio Player initialized and ready.');
    preloadNextTrack();
};

/**
 * Starts the background music, initiating it if necessary.
 * This function is intended to be called by a user gesture.
 * @export
 */
export const startDreamAudio = () => {
    if (!backgroundMusic) {
        initMusicPlayer();
    }
    if (!audioIsReady) {
        console.error("Audio not initialized or ready.");
        return;
    }
    playCurrentTrack()
        .then(() => console.log("Audio playback successfully started by user action."))
        .catch(error => console.warn("Audio playback was blocked by the browser.", error));
};

// --- TTS System ---
let ttsAudio = null;

/**
 * Sanitizes text for TTS by removing HTML and collapsing whitespace.
 * @param {string} text - The text to sanitize.
 * @returns {string} The sanitized text.
 * @private
 */
const sanitizeTextForTTS = (text) => {
    return String(text)
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/^Narrative Description:\s*/i, '')
        .trim();
};

/**
 * Shows or hides the TTS loading indicator.
 * @param {boolean} visible - Whether the indicator should be visible.
 * @private
 */
const setTTSIndicatorVisible = (visible) => {
    const indicator = document.getElementById('tts-indicator');
    if (indicator) {
        indicator.hidden = !visible;
    }
};

/**
 * A fallback TTS implementation using the browser's SpeechSynthesis API.
 * @param {string} text - The text to speak.
 * @returns {Promise<void>} A promise that resolves when the speech is finished.
 * @private
 */
const fallbackWithSpeechSynthesis = (text) => {
    return new Promise((resolve) => {
        try {
            if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
                console.error('[TTS] Browser speechSynthesis API not available.');
                setTTSIndicatorVisible(false);
                resolve();
                return;
            }
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            const femaleVoice = voices.find(v => /female|woman|zira|allison|susan|salli|amy|emma/i.test(v.name));
            if (femaleVoice) utterance.voice = femaleVoice;

            utterance.onstart = () => setTTSIndicatorVisible(false);
            utterance.onend = resolve;
            utterance.onerror = (e) => {
                console.error('[TTS] SpeechSynthesis error:', e);
                setTTSIndicatorVisible(false);
                resolve();
            };

            triggerRealityFlash();
            triggerEyeBlink();
            window.speechSynthesis.speak(utterance);
        } catch(e) {
             console.error('[TTS] SpeechSynthesis failed catastrophically:', e);
             setTTSIndicatorVisible(false);
             resolve();
        }
    });
};

/**
 * Plays the given text as audio using a TTS service (e.g., ElevenLabs via Websim).
 * @param {string} text - The text to be converted to speech.
 * @returns {Promise<void>} A promise that resolves when TTS playback is complete.
 * @export
 */
export const playTTS = async (text) => {
    const plainText = sanitizeTextForTTS(text);
    if (!plainText || !ttsEnabled) {
        if (!ttsEnabled) console.log('[TTS] Skipped: player has muted narration.');
        return;
    }

    await ensureMusicForNarration();
    setTTSIndicatorVisible(true);

    try {
        const websimRef = (typeof websim !== 'undefined' && websim) || (typeof window !== 'undefined' && window.websim);
        if (!websimRef?.textToSpeech) {
            console.error('[TTS] websim.textToSpeech is not available, using SpeechSynthesis fallback.');
            await fallbackWithSpeechSynthesis(plainText);
            return;
        }

        const result = await websimRef.textToSpeech({ text: plainText, voice: 'en-female' });
        const audioUrl = typeof result === 'string' ? result : result?.url || result?.audioUrl;

        if (!audioUrl) {
            console.error('[TTS] No audio URL returned, using fallback.', result);
            await fallbackWithSpeechSynthesis(plainText);
            return;
        }

        if (!ttsAudio) ttsAudio = new Audio();
        ttsAudio.src = audioUrl;

        let stepEffectsTimeout;
        const stepEffects = () => {
            triggerRealityFlash();
            triggerEyeBlink();
            stepEffectsTimeout = setTimeout(stepEffects, 1500);
        };

        const audioPromise = new Promise((resolve) => {
            // Add a safety timeout to prevent hanging forever
            const safetyTimeout = setTimeout(() => {
                console.warn('[TTS] Playback timed out, forcing progress.');
                clearTimeout(stepEffectsTimeout);
                resolve();
            }, 10000); // 10 second max for TTS

            ttsAudio.onplaying = () => {
                setTTSIndicatorVisible(false);
                console.log('[TTS] Playback started.');
                stepEffects();
            };
            ttsAudio.onended = () => {
                clearTimeout(stepEffectsTimeout);
                clearTimeout(safetyTimeout);
                resolve();
            };
            ttsAudio.onerror = (err) => {
                console.warn('[TTS] Audio playback error:', err);
                clearTimeout(stepEffectsTimeout);
                clearTimeout(safetyTimeout);
                resolve(); // Resolve anyway to not block the game
            };
        });

        ttsAudio.load();
        await audioPromise;

    } catch (error) {
        console.error('TTS execution failed, using fallback:', error);
        await fallbackWithSpeechSynthesis(plainText);
    }
};


/**
 * Sets the narrative text in a hidden element and starts TTS playback.
 * @param {string} narrativeText - The text to be spoken.
 * @returns {Promise<void>}
 * @export
 */
export const startNarrator = async (narrativeText) => {
    const sourceEl = document.getElementById('narrative-audio-source');
    if (sourceEl) {
        sourceEl.textContent = narrativeText || '';
    }
    await playTTS(narrativeText);
};
