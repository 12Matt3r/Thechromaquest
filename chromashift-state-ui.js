// Core game state and shared UI utilities for ChromaShift.

import { setBubbleAnchors } from './threeScene.js';
// import { startDreamAudio } from './chromashift-audio.js';

// --- Global Game State ---
export const gameState = {
    currentScene: null,
    stats: {
        lucidity: 50,
        coherence: 30,
        perception: 75
    },
    chromaKeys: 0,
    startTime: Date.now(),
    conversationHistory: [],
    gameHistory: [],
    hasStarted: false,
    lastSceneShownAt: null,
    isProcessing: false,
    // Reduced minimum display time so manifest/choices feel more responsive
    minDisplayTimeMs: 10000
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

export function updateStats(lucidity, coherence, perception, chromaKeys) {
    gameState.stats.lucidity = lucidity;
    gameState.stats.coherence = coherence;
    gameState.stats.perception = perception;
    gameState.chromaKeys = chromaKeys;

    const lucBar = document.getElementById('lucidity-bar');
    const lucVal = document.getElementById('lucidity-value');
    const cohBar = document.getElementById('coherence-bar');
    const cohVal = document.getElementById('coherence-value');
    const perBar = document.getElementById('perception-bar');
    const perVal = document.getElementById('perception-value');

    if (lucBar) lucBar.style.width = lucidity + '%';
    if (lucVal) lucVal.textContent = lucidity + '%';
    if (cohBar) cohBar.style.width = coherence + '%';
    if (cohVal) cohVal.textContent = coherence + '%';
    if (perBar) perBar.style.width = perception + '%';
    if (perVal) perVal.textContent = perception + '%';

    const chromaProgress = Math.min(5, gameState.chromaKeys);
    const chromaPercent = (chromaProgress / 5) * 100;
    const chromaBar = document.getElementById('chroma-bar');
    const chromaValue = document.getElementById('chroma-value');
    if (chromaBar && chromaValue) {
        chromaBar.style.width = chromaPercent + '%';
        chromaValue.textContent = `${chromaProgress} / 5`;
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