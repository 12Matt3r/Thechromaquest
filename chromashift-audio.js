// Audio systems for ChromaShift: TTS narration and music player.
import { sleep, triggerRealityFlash, triggerEyeBlink } from './chromashift-state-ui.js';
// import { ensureWebsimAvailable } from './chromashift-engine-helpers.js';

// --- Global TTS toggle state (default: ON) ---
let ttsEnabled = true;
export function isTTSEnabled() {
    return ttsEnabled;
}

// --- Simplified Background Music System ---

let backgroundMusic = null;
let audioIsReady = false;

// FULL PLAYLIST: All confirmed MP3 files are included here.
const musicPlaylist = [
    '/Journey to the interweb.mp3',                // primary intro track
    '/Rhythm of the Reef.mp3',
    '/WhoIsThisDiva.mp3',
    '/BratSummer.mp3',
    '/Portal of Peace.mp3',
    '/Midnight at the Virtual Mall.mp3',
    '/Vaporwave Sunset Cruise.mp3',
    '/Lost Signals on Windows 95.mp3',
    '/1-800-dreamscape.mp3',
    '/Where the Ocean Ends.mp3',
    '/Slow Burn Waves.mp3',
    '/You Were Never Really Here.mp3',
    '/VeryDemure.mp3',
    '/Timeless Analog Tides.mp3',
    '/The Quiet Space.mp3',
    '/Supermarket Nostalgia.mp3',
    '/Subliminal Drift.mp3',
    '/Sleepwalk Through the Stars.mp3',
    '/Shimmering Shores.mp3',
    '/Palm Trees & Neon Reflections.mp3',
    '/GoblinMode.mp3',
    '/turned up on this one.mp3',
    '/Dreamcatcher Beats.mp3',
    '/Coral Chords.mp3',
    '/BananaForScale.mp3',
    '/Ａｆｔｅｒｈｏｕｒｓ Ａｅｒｏｂｉｃｓ.mp3',
    '/(  D--- S a V e Y o U R T e a R S---b  ).mp3',
    '/Vintage Currents.mp3',
    '/Oceanfront Oldies.mp3',
    '/Lost Wave Loops.mp3',
    '/Lost in the Algorithm.mp3',
    '/Kaleidoscope Dreams.mp3',
    '/Golden Clouds.mp3',
    '/Wavelengths of Yesterday.mp3',
    '/WaterTok.mp3',
    '/Sand Between the Bars.mp3',
    '/Relaxing on Another Plane.mp3',
    '/Pier to Nowhere.mp3',
    '/Nostalgia for a Future That Never Was.mp3',
    '/Late Night Online Shopping.mp3',
    '/journey through stillness.mp3',
    '/infinite Peace.mp3',
    '/Floating Through Sound.mp3',
    '/FairyGrunge.mp3',
    '/Echoes of the Unseen.mp3',
    '/Dial-up Dreams.mp3',
    '/Datastream Sunset.mp3',
    '/1Tales from the Womp.mp3',
    '/sofa king sad boi-smile .mp3',
    '/Voices in the Datacloud.mp3',
    '/Weirdcore.mp3',
    '/The Sound of Abandoned Websites.mp3',
    '/Simulated Emotions.mp3',
    '/Saltwater Echoes.mp3',
    '/Rizz.mp3',
    '/QuietLuxury.mp3',
    '/Pretty Anime Girl.mp3',
    '/Old Film Filters.mp3',
    '/Nostalgic Currents.mp3',
    '/MootUp.mp3',
    '/Geeeee Wiz.mp3',
    '/Endless Summer on Betamax.mp3',
    '/DopamineDecor.mp3',
    '/DAYDREAMERS SURF.mp3',
    '/Beyond the Ordinary.mp3',
    '/AñoNuevo.mp3'
];
let currentTrackIndex = 0;

/**
 * Generates a random integer between 0 (inclusive) and max (exclusive).
 * @param {number} max The maximum value (exclusive).
 * @returns {number} A random integer.
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Selects a new, random track index that is NOT the current track index.
 * @returns {number} The new random track index.
 */
function getNewRandomTrackIndex() {
    if (musicPlaylist.length <= 1) {
        return 0; // Only one song, so keep playing it.
    }
    
    let newIndex;
    do {
        newIndex = getRandomInt(musicPlaylist.length);
    } while (newIndex === currentTrackIndex); // Keep generating until the index is different
    
    return newIndex;
}

// Shared helper to update play/pause button + body class (Unchanged)
function updatePlayPauseIcon() {
    const playPauseBtn = document.getElementById('music-play-pause');
    if (!playPauseBtn || !backgroundMusic) return;
    const isPlaying = !backgroundMusic.paused;
    playPauseBtn.textContent = isPlaying ? '⏸' : '▶';

    const body = document.body;
    if (isPlaying) {
        body.classList.add('music-playing');
    } else {
        body.classList.remove('music-playing');
    }
}

// Shared helper to play the current track index (Unchanged)
async function playCurrentTrack() {
    if (!audioIsReady || !backgroundMusic || musicPlaylist.length === 0) return;

    backgroundMusic.src = musicPlaylist[currentTrackIndex];
    backgroundMusic.currentTime = 0; // ensure track restarts cleanly
    try {
        await backgroundMusic.play();
        updatePlayPauseIcon();
    } catch (e) {
        console.warn('Failed to start track playback:', e);
    }
}

// NEW: helper to advance to the next track in sequence (with optional autoplay)
async function goToNextTrack(autoPlay = true) {
    if (!audioIsReady || !backgroundMusic || musicPlaylist.length === 0) return;

    // pick a new random track that is not the current one
    currentTrackIndex = getNewRandomTrackIndex();
    backgroundMusic.src = musicPlaylist[currentTrackIndex];
    backgroundMusic.currentTime = 0;

    if (autoPlay) {
        try {
            await backgroundMusic.play();
        } catch (e) {
            console.warn('Failed to auto-play next track:', e);
        }
    }
    updatePlayPauseIcon();
}

// NEW: helper to make sure music is running whenever narration happens
async function ensureMusicForNarration() {
    if (!audioIsReady || !backgroundMusic) return;
    if (!backgroundMusic.paused) return;
    try {
        await backgroundMusic.play();
        updatePlayPauseIcon();
    } catch (e) {
        console.warn('[Music] Could not resume background music for narration:', e);
    }
}

// Initialize the audio element
export function initMusicPlayer() {
    if (backgroundMusic) return;

    backgroundMusic = document.getElementById('main-audio');

    if (backgroundMusic) {
        backgroundMusic.loop = false;
        backgroundMusic.volume = 0.5;
        audioIsReady = true;
        console.log('Audio Player initialized and ready.');
        
        // --- FIX: Ensure 'Journey to the interweb.mp3' is played first ---
        const firstTrackName = '/Journey to the interweb.mp3';
        const index = musicPlaylist.indexOf(firstTrackName);
        if (index !== -1) {
            currentTrackIndex = index;
        } else {
            // Fallback to the very first song in the list if the desired one isn't found.
            currentTrackIndex = 0; 
        }
        // -----------------------------------------------------------------

        if (musicPlaylist.length > 0) {
            backgroundMusic.src = musicPlaylist[currentTrackIndex];
        }

        const playPauseBtn = document.getElementById('music-play-pause');
        const volDownBtn = document.getElementById('music-vol-down');
        const volUpBtn = document.getElementById('music-vol-up');
        const nextBtn = document.getElementById('music-next');
        const ttsToggleBtn = document.getElementById('tts-toggle');

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', async () => {
                if (!audioIsReady || !backgroundMusic) return;
                if (backgroundMusic.paused) {
                    await playCurrentTrack();
                } else {
                    backgroundMusic.pause();
                    updatePlayPauseIcon();
                }
            });
        }

        if (volDownBtn) {
            volDownBtn.addEventListener('click', () => {
                if (!audioIsReady || !backgroundMusic) return;
                backgroundMusic.volume = Math.max(0, backgroundMusic.volume - 0.1);
            });
        }

        if (volUpBtn) {
            volUpBtn.addEventListener('click', () => {
                if (!audioIsReady || !backgroundMusic) return;
                backgroundMusic.volume = Math.min(1, backgroundMusic.volume + 0.1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', async () => {
                if (!audioIsReady || !backgroundMusic || musicPlaylist.length === 0) return;
                // UPDATED: Skip to a different random track and start playing it
                await goToNextTrack(true);
            });
        }

        // NEW: TTS toggle handler
        if (ttsToggleBtn) {
            // Set initial label
            ttsToggleBtn.textContent = '🔊 TTS';
            document.body.classList.remove('tts-muted');

            ttsToggleBtn.addEventListener('click', () => {
                ttsEnabled = !ttsEnabled;
                if (ttsEnabled) {
                    ttsToggleBtn.textContent = '🔊 TTS';
                    document.body.classList.remove('tts-muted');
                } else {
                    ttsToggleBtn.textContent = '🔇 TTS';
                    document.body.classList.add('tts-muted');
                }
            });
        }

        // Auto-advance to the next track when one finishes.
        backgroundMusic.addEventListener('ended', async () => {
            if (!audioIsReady || !backgroundMusic || musicPlaylist.length === 0) return;
            // UPDATED: Move to a different random track when the current one ends
            await goToNextTrack(true);
        });

        backgroundMusic.addEventListener('play', updatePlayPauseIcon);
        backgroundMusic.addEventListener('pause', updatePlayPauseIcon);
    } else {
        console.error('Audio element with ID "main-audio" not found.');
    }
}

// Dedicated, user-initiated function to start playback. (Unchanged)
export function startDreamAudio() {
    if (!backgroundMusic) {
        initMusicPlayer();
    }

    if (!audioIsReady || !backgroundMusic) {
        console.error("Audio not initialized or ready.");
        return;
    }

    playCurrentTrack()
        .then(() => {
            console.log("Audio playback successfully started by user action.");
        })
        .catch(error => {
            console.warn("Audio playback was blocked by the browser. User intervention may be required.", error);
        });
}

// --- TTS and Countdown Logic (UPDATED) ---
export async function playTTS(text) {
    if (!text) return;

    // Respect player TTS mute preference
    if (!ttsEnabled) {
        console.log('[TTS] Skipped: player has muted narration.');
        return;
    }

    // Ensure background music is running alongside narration
    await ensureMusicForNarration();

    // Sanitize: strip any HTML/markup so TTS reads only the visible white narrative text
    let plainText = String(text)
        .replace(/<[^>]*>/g, ' ')   // remove HTML tags
        .replace(/\s+/g, ' ')       // collapse whitespace
        .trim();

    // Special-case: strip any "Narrative Description:" prefix if present
    plainText = plainText.replace(/^Narrative Description:\s*/i, '').trim();

    if (!plainText) return;

    // Helper: fallback to browser SpeechSynthesis if ElevenLabs/Websim fails
    const fallbackWithSpeechSynthesis = async () => {
        try {
            if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
                console.error('[TTS] Browser speechSynthesis API not available.');
                return;
            }
            const utterance = new SpeechSynthesisUtterance(plainText);
            const voices = window.speechSynthesis.getVoices();
            const femaleVoice = voices.find(v =>
                /female|woman|zira|allison|susan|salli|amy|emma/i.test(v.name)
            );
            if (femaleVoice) utterance.voice = femaleVoice;

            return new Promise((resolve) => {
                utterance.onend = () => resolve();
                utterance.onerror = () => resolve();
                // Start visual rhythm when speech starts
                triggerRealityFlash();
                triggerEyeBlink();
                window.speechSynthesis.speak(utterance);
            });
        } catch (e) {
            console.error('[TTS] SpeechSynthesis fallback failed:', e);
        }
    };

    try {
        // DIRECT WEBISM/ELEVENLABS ACCESS (NO HELPER):
        // Try both `websim` and `window.websim` to maximize compatibility.
        const websimRef =
            (typeof websim !== 'undefined' && websim) ||
            (typeof window !== 'undefined' && window.websim) ||
            null;

        if (!websimRef || typeof websimRef.textToSpeech !== 'function') {
            console.error('[TTS] websim.textToSpeech is not available, using SpeechSynthesis fallback.');
            await fallbackWithSpeechSynthesis();
            return;
        }

        console.log('[TTS] Requesting speech for:', plainText);

        // Call Websim/ElevenLabs exactly as in the documentation
        const result = await websimRef.textToSpeech({
            text: plainText,
            voice: 'en-female'
        });

        // Support multiple possible return shapes:
        // - string URL
        // - { url: "..." }
        // - { audioUrl: "..." }
        let audioUrl = null;
        if (typeof result === 'string') {
            audioUrl = result;
        } else if (result && typeof result === 'object') {
            audioUrl = result.url || result.audioUrl || null;
        }

        if (!audioUrl) {
            console.error('[TTS] No audio URL returned from textToSpeech, using SpeechSynthesis fallback:', result);
            await fallbackWithSpeechSynthesis();
            return;
        }

        const audio = new Audio();
        audio.src = audioUrl;
        audio.preload = 'auto';

        let finalResolve;
        const sequencePromise = new Promise((resolve) => {
            finalResolve = resolve;
        });

        let nextStepTimeout = null;

        function stepEffects() {
            // Visual rhythm: flash + blink in a gentle beat during narration
            triggerRealityFlash();
            triggerEyeBlink();
            nextStepTimeout = setTimeout(stepEffects, 1500);
        }

        const handleAudioEnd = () => {
            if (nextStepTimeout) clearTimeout(nextStepTimeout);
            console.log('[TTS] Playback ended.');
            // small buffer so visuals can settle
            setTimeout(() => {
                finalResolve();
            }, 500);
        };

        audio.onended = handleAudioEnd;
        audio.onerror = async (err) => {
            console.error('[TTS] Audio playback error, using SpeechSynthesis fallback:', err);
            if (nextStepTimeout) clearTimeout(nextStepTimeout);
            await fallbackWithSpeechSynthesis();
            handleAudioEnd();
        };

        audio.addEventListener('loadeddata', () => {
            audio.play()
                .then(() => {
                    console.log('[TTS] Playback started.');
                    // Kick off the flashing/blinking loop
                    stepEffects();
                })
                .catch(async (e) => {
                    console.warn('[TTS] Playback was blocked by the browser, using SpeechSynthesis fallback:', e);
                    if (nextStepTimeout) clearTimeout(nextStepTimeout);
                    await fallbackWithSpeechSynthesis();
                    handleAudioEnd();
                });
        });

        audio.load();

        await sequencePromise;
    } catch (error) {
        console.error('TTS execution failed (Websim/ElevenLabs error), using SpeechSynthesis fallback:', error);
        await fallbackWithSpeechSynthesis();
        // Brief pause so the rest of the sequence timing isn't broken completely
        await sleep(500);
    }
}

export async function startNarrator(narrativeText) {
    const sourceEl = document.getElementById('narrative-audio-source');
    if (sourceEl) {
        sourceEl.textContent = narrativeText || '';
    }
    await playTTS(narrativeText);
}
