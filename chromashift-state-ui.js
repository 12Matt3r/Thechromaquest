// Core game state and shared UI utilities for ChromaShift.

import { setBubbleAnchors } from './threeScene.js';
import { triggerFinalNarrativeSequence } from './chromashift-engine.js';
// import { startDreamAudio } from './chromashift-audio.js';

// --- Global Game State ---
export const gameState = {
    currentScene: null,
    stats: {
        lucidity: 50,
        coherence: 30,
        perception: 75
    },
    statBoosts: {
        lucidity: 0,
        coherence: 0,
        perception: 0
    },
    chromaKeysCollected: [],
    startTime: Date.now(),
    conversationHistory: [],
    gameHistory: [],
    gameStatus: 'PLAYING',
    hasStarted: false,
    lastSceneShownAt: null,
    isProcessing: false,
    // Reduced minimum display time so manifest/choices feel more responsive
    minDisplayTimeMs: 10000,
    sceneIdCounter: 0
};

// --- NEW: Intro click gate setup ---
// Full-screen overlay using Chromashift.gif that must be clicked once;
// the click will also trigger the background music via startDreamAudio().
// export function initIntroClickGate() {
//     const gate = document.getElementById('intro-click-gate');
//     if (!gate) return;

//     const handleClick = () => {
//         // Hide the gate permanently
//         gate.classList.add('hidden');
//         gate.removeEventListener('click', handleClick);

//         // Directly start dream audio from this user gesture
//         startDreamAudio();
//     };

//     gate.addEventListener('click', handleClick);
// }

// --- Utility Helpers ---
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simple global loading & interaction helpers
export function showLoading() {
    document.body.classList.add('loading');

    const loader = document.getElementById('global-loading');
    if (loader) {
        loader.setAttribute('aria-hidden', 'false');
        loader.classList.add('visible');
    }
}

export function hideLoading() {
    document.body.classList.remove('loading');

    const loader = document.getElementById('global-loading');
    if (loader) {
        loader.setAttribute('aria-hidden', 'true');
        loader.classList.remove('visible');
    }
}

export function setInteractionEnabled(enabled) {
    const cmdInput = document.getElementById('command-input');
    const cmdButton = document.getElementById('command-submit');
    const musicControls = document.querySelectorAll('#music-controls button');
    const choiceContainer = document.getElementById('choice-bubbles');

    // KEEP MANIFEST INPUT ALWAYS AVAILABLE:
    // Previously we disabled the command input and button here, which could
    // leave the player "locked out" of manifesting after sequences.
    // if (cmdInput) cmdInput.disabled = !enabled;
    // if (cmdButton) cmdButton.disabled = !enabled;

    musicControls.forEach((btn) => { btn.disabled = !enabled; });

    if (choiceContainer) {
        choiceContainer.querySelectorAll('.choice-bubble').forEach((bubble) => {
            bubble.style.pointerEvents = enabled ? 'auto' : 'none';
            bubble.style.opacity = enabled ? '' : '0.4';
        });
    }
}

// Lightweight toast helper for quick UX feedback
export function showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    // Clear any existing timeout stored on the element
    if (toast._hideTimeout) {
        clearTimeout(toast._hideTimeout);
    }
    toast._hideTimeout = setTimeout(() => {
        toast.classList.remove('visible');
    }, duration);
}

export function showSceneLockFeedback() {
    const container = document.getElementById('choice-bubbles');
    if (!container) return;
    container.querySelectorAll('.choice-bubble').forEach((bubble) => {
        bubble.classList.add('locked-feedback');
        setTimeout(() => bubble.classList.remove('locked-feedback'), 450);
    });
    // New: give the player a clear explanation when the scene is still stabilizing
    // Calculate and surface the remaining stabilization time for better UX feedback.
    const now = Date.now();
    const elapsed = gameState.lastSceneShownAt ? (now - gameState.lastSceneShownAt) : 0;
    const remainingMs = Math.max(0, (gameState.minDisplayTimeMs || 0) - elapsed);
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    if (remainingSeconds > 0) {
        showToast(`Reality is still stabilizing — try again in ~${remainingSeconds}s.`);
    } else {
        showToast('Reality is still stabilizing — wait a moment before manifesting again.');
    }
}

export function updateStats(lucidity, coherence, perception) {
    gameState.stats.lucidity = lucidity;
    gameState.stats.coherence = coherence;
    gameState.stats.perception = perception;

    const finalLucidity = Math.min(100, gameState.stats.lucidity + gameState.statBoosts.lucidity);
    const finalCoherence = Math.min(100, gameState.stats.coherence + gameState.statBoosts.coherence);
    const finalPerception = Math.min(100, gameState.stats.perception + gameState.statBoosts.perception);

    const lucBar = document.getElementById('lucidity-bar');
    const lucVal = document.getElementById('lucidity-value');
    const cohBar = document.getElementById('coherence-bar');
    const cohVal = document.getElementById('coherence-value');
    const perBar = document.getElementById('perception-bar');
    const perVal = document.getElementById('perception-value');

    if (lucBar) lucBar.style.width = finalLucidity + '%';
    if (lucVal) lucVal.textContent = finalLucidity + '%';
    if (cohBar) cohBar.style.width = finalCoherence + '%';
    if (cohVal) cohVal.textContent = finalCoherence + '%';
    if (perBar) perBar.style.width = finalPerception + '%';
    if (perVal) perVal.textContent = finalPerception + '%';

    const chromaProgress = Math.min(5, gameState.chromaKeysCollected.length);
    const chromaPercent = (chromaProgress / 5) * 100;
    const chromaBar = document.getElementById('chroma-bar');
    const chromaValue = document.getElementById('chroma-value');
    if (chromaBar && chromaValue) {
        chromaBar.style.width = chromaPercent + '%';
        chromaValue.textContent = `${chromaProgress} / 5`;
    }
}

export function applyChromaKeyStatBoost(keyCount) {
    // Reset boosts to ensure idempotency if this function were ever re-run
    gameState.statBoosts.lucidity = 0;
    gameState.statBoosts.coherence = 0;
    gameState.statBoosts.perception = 0;

    for (let i = 1; i <= keyCount; i++) {
        const boostAmount = 5;
        // This rotation ensures the first key boosts Lucidity, the second Perception, the third Coherence, and so on.
        const statToBoost = ['lucidity', 'perception', 'coherence'][(i - 1) % 3];
        gameState.statBoosts[statToBoost] += boostAmount;
    }
}

/**
 * Acquires a new Chroma-Key, ensuring it is unique, and updates the game state.
 * This is the central function for managing the player's progress towards the win condition.
 * @param {string} keyId - A unique identifier for the Chroma-Key being acquired.
 */
export function acquireChromaKey(keyId) {
    if (!keyId) {
        console.warn('acquireChromaKey called with an invalid keyId.');
        return;
    }

    // Prevent duplicate keys from being added.
    if (gameState.chromaKeysCollected.includes(keyId)) {
        showToast('Duplicate Chroma-Key found and ignored.');
        return;
    }

    gameState.chromaKeysCollected.push(keyId);
    const keyCount = gameState.chromaKeysCollected.length;

    // Provide immediate feedback to the player.
    showToast(`Chroma-Key Acquired! [${keyCount}/5]`);

    // Apply the permanent stat boosts associated with collecting a key.
    applyChromaKeyStatBoost(keyCount);

    // Manually trigger a stat update to refresh the UI with the new boost.
    updateStats(gameState.stats.lucidity, gameState.stats.coherence, gameState.stats.perception);

    // Check for the win condition.
    if (keyCount >= 5 && gameState.gameStatus !== 'WON') {
        gameState.gameStatus = 'WON';
        // This function will be implemented in a subsequent step.
        // For now, this serves as a placeholder for the final narrative trigger.
        if (typeof triggerFinalNarrativeSequence === 'function') {
            triggerFinalNarrativeSequence();
        } else {
            console.log('Win condition met, but triggerFinalNarrativeSequence is not yet defined.');
            // Fallback for now: reveal the save button directly.
            const saveButton = document.getElementById('save-story-button');
            if (saveButton) {
                saveButton.classList.remove('hidden');
            }
        }
    }
}

export function updateDreamTime() {
    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    const dt = document.getElementById('dream-time');
    if (dt) {
        dt.textContent = `${minutes}:${seconds}`;
    }
}

// start dream-time updater
setInterval(updateDreamTime, 1000);

export function triggerRealityFlash() {
    const flash = document.getElementById('reality-flash');
    if (!flash) return;
    flash.classList.add('flash');
    setTimeout(() => flash.classList.remove('flash'), 100);
}

export function triggerEyeBlink() {
    const eye = document.getElementById('eye-blink');
    if (!eye) return;
    eye.classList.add('blink');
    setTimeout(() => eye.classList.remove('blink'), 600);
}

// Create Choice Bubbles (UI helper, engine provides click handler)
export function createChoiceBubbles(choices, onChoiceClick, hidden = false) {
    const container = document.getElementById('choice-bubbles');
    if (!container) return;

    container.innerHTML = '';

    // NEW: generate new 3D anchors for this set of choices so they are
    // randomly placed around the panorama with minimum separation.
    setBubbleAnchors(choices.length);

    choices.forEach((choice, index) => {
        const bubble = document.createElement('div');
        bubble.className = 'choice-bubble';
        if (hidden) {
            bubble.classList.add('choices-hidden');
        }
        bubble.textContent = choice.text;
        bubble.style.animationDelay = `${index * 0.2}s`;

        if (typeof onChoiceClick === 'function') {
            bubble.addEventListener('click', () => onChoiceClick(choice));
        }

        container.appendChild(bubble);
    });
}

export function revealChoiceBubbles() {
    const container = document.getElementById('choice-bubbles');
    if (!container) return;
    container.querySelectorAll('.choice-bubble').forEach((bubble) => {
        bubble.classList.remove('choices-hidden');
    });
}