// chromashift-engine.js

// ---------------------------------------------------------------------
// Helper utilities have been extracted into chromashift-engine-helpers.js
// to keep this file focused on high-level engine orchestration.
// ---------------------------------------------------------------------

import { initThreeJS, updatePanorama } from './threeScene.js';
import {
    gameState,
    showLoading,
    hideLoading,
    setInteractionEnabled,
    showSceneLockFeedback,
    updateStats,
    createChoiceBubbles,
    revealChoiceBubbles,
    showToast
} from './chromashift-state-ui.js';
import { startNarrator, initMusicPlayer, startDreamAudio } from './chromashift-audio.js';
import {
    safeParseLLMScene,
    clampStat,
    pushToConversation,
    ensureWebsimAvailable
} from './chromashift-engine-helpers.js';
import { checkForNarrativeLoop } from './chromashift-pacing.js';
import { initKeyboardShortcuts } from './chromashift-keyboard.js';
import { chromaRecords, initAnomalySystem } from './chromashift-records.js';

// NEW: lightweight in-memory cache for generated panorama images keyed by imagePrompt
const imageCache = new Map();

// Helper function to determine if a scene is anomalous enough to log
function isAnomalousScene(scene, action) {
    const anomalyKeywords = [
        'liquid', 'melting', 'floating', 'whisper', 'echo', 'mirror', 'shadow',
        'distorted', 'pulsing', 'shimmering', 'glowing', 'transcendent',
        'impossible', 'unreal', 'dream', 'consciousness', 'reality'
    ];
    
    const text = `${scene.title} ${scene.narrativeDescription} ${action}`.toLowerCase();
    const keywordCount = anomalyKeywords.filter(keyword => text.includes(keyword)).length;
    
    // Log if scene has multiple surreal keywords or contains rare terms
    return keywordCount >= 3 || 
           text.includes('baby dolphin') || 
           text.includes('impossible geometry') ||
           text.includes('temporal') ||
           text.includes('consciousness stream');
}

// NEW: helper to fetch or reuse a panorama image for a given prompt
async function getPanoramaForPrompt(imagePrompt) {
    if (!imagePrompt) return null;

    // Ensure Websim API is available and get a safe reference
    const websim = ensureWebsimAvailable();
    if (!websim) return null;

    // If we've already generated an image for this exact prompt, reuse it
    if (imageCache.has(imagePrompt)) {
        return imageCache.get(imagePrompt);
    }

    // Show loading while we generate a new image
    showLoading();
    try {
        // Use explicit width/height instead of 8K-style aspect to keep performance snappy.
        // 1600x900 gives a cinematic feel while staying lightweight.
        const imageResult = await websim.imageGen({
            prompt: imagePrompt,
            width: 1600,
            height: 900
        });

        if (imageResult && imageResult.url) {
            imageCache.set(imagePrompt, imageResult.url);
            return imageResult.url;
        }
    } catch (err) {
        console.error('Error generating panorama image for prompt:', err);
        showToast('The dream struggled to render the scene. A lower-fidelity vision appears instead.');
    } finally {
        hideLoading();
    }

    return null;
}

// NEW: track the initial CRT power button stages (off → on → UI)
let initialPowerStage = 0;
// NEW: track whether we've already told the player to use the power button
let overlayDismissHintShown = false;

// Update Scene UI (now only core scene data; choices managed around transitions)
function updateScene(sceneData) {
    const titleEl = document.getElementById('scene-title');
    const tickerEl = document.getElementById('wtf-ticker');

    const safeTitle = sceneData.title || 'UNLABELED ANOMALY [UNKNOWN SPACE]';
    const safeTicker = sceneData.ticker || 'SUBCONSCIOUS STATIC: NO CLEAR SIGNAL';

    if (titleEl) titleEl.textContent = safeTitle;
    if (tickerEl) tickerEl.textContent = safeTicker;

    // --- PACING MECHANISM: SCENE ID ---
    // Assign a unique, incrementing ID to every scene for loop detection.
    gameState.sceneIdCounter++;
    sceneData.sceneId = gameState.sceneIdCounter;
    // --- END PACING MECHANISM ---

    const nextLucidity = clampStat(
        sceneData.lucidity ?? gameState.stats.lucidity
    );
    const nextCoherence = clampStat(
        sceneData.coherence ?? gameState.stats.coherence
    );
    const nextPerception = clampStat(
        sceneData.perception ?? gameState.stats.perception
    );

    updateStats(nextLucidity, nextCoherence, nextPerception);

    updatePanorama(sceneData.panoramaUrl); 

    gameState.currentScene = sceneData;
}

// --- PHASE 3: Critical Transition Sequence (The Core Loop) ---
async function executeTransitionSequence(sceneData, isInitial = false) {
    // REMOVE PER-SCENE LOCK HERE; NOW MANAGED CENTRALLY IN processPlayerAction
    // if (gameState.isProcessing) return;
    // gameState.isProcessing = true;

    const overlay = document.getElementById('crt-overlay');
    const prologTextEl = document.getElementById('prolog-text');
    const screenOffEl = document.getElementById('crt-screen-off');
    const glitchEl = document.getElementById('glitch-effect');

    updateScene(sceneData);

    createChoiceBubbles(sceneData.choices, handleChoiceClick, true);

    if (overlay) {
        overlay.classList.add('active');
    }

    const prologContent = `
            <div class="crt-title">${sceneData.title || ''}</div>
            ${sceneData.prologText ? `<div class="crt-prolog">${sceneData.prologText}</div>` : ''}
            <div class="crt-narrative">${sceneData.narrativeDescription || ''}</div>
        `;

    if (prologTextEl) {
        if (!isInitial) {
            // For non-initial screens, we may augment this content below.
            prologTextEl.innerHTML = prologContent;
        } else {
            prologTextEl.innerHTML = '';
        }
    }

    if (isInitial) {
        const powerBtn = document.getElementById('crt-power-button');

        if (glitchEl) {
            glitchEl.style.display = 'none';
        }
        if (screenOffEl) {
            screenOffEl.style.display = 'block';
        }

        if (powerBtn) {
            initialPowerStage = 0;

            powerBtn.addEventListener('click', async (event) => {
                event.stopPropagation();

                if (initialPowerStage === 0) {
                    initialPowerStage = 1;
                    powerBtn.disabled = true;

                    try {
                        startDreamAudio();
                        setInteractionEnabled(true); // Enable controls as soon as music starts
                    } catch (e) {
                        console.warn('Failed to start music on power click:', e);
                    }

                    if (screenOffEl) {
                        screenOffEl.style.display = 'none';
                    }
                    if (glitchEl) {
                        glitchEl.style.display = 'block';
                    }
                    if (prologTextEl) {
                        prologTextEl.innerHTML = prologContent;
                    }

                    await startNarrator(sceneData.narrativeDescription || '');

                    powerBtn.disabled = false;
                    initialPowerStage = 1;
                    return;
                }

                if (initialPowerStage === 1) {
                    initialPowerStage = 2;
                    powerBtn.disabled = true;

                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                    revealChoiceBubbles();
                    setInteractionEnabled(true);

                    gameState.lastSceneShownAt = Date.now();
                    // gameState.isProcessing is now reset in processPlayerAction.finally
                }
            });
        }

        return;
    }

    // NON-INITIAL SEQUENCE:
    // From the second narrative screen onward, the overlay will stay
    // visible until the player presses the power button again.
    const powerBtn = document.getElementById('crt-power-button');

    if (prologTextEl) {
        let augmentedContent = prologContent;
        if (!overlayDismissHintShown) {
            overlayDismissHintShown = true;
            augmentedContent += `
                <div class="crt-prolog" style="margin-top:12px; color: var(--dream-gold);">
                    The narrative stream will not clear itself. When you are ready to return to the Chroma-Dream, press the power button again.
                </div>
            `;
        }
        prologTextEl.innerHTML = augmentedContent;
    }

    let waitingForDismiss = true;
    const onPowerClickToDismiss = (event) => {
        if (!waitingForDismiss) return;
        waitingForDismiss = false;
        if (event) {
            event.stopPropagation();
        }

        if (overlay) {
            overlay.classList.remove('active');
        }
        revealChoiceBubbles();
        gameState.lastSceneShownAt = Date.now();
        // gameState.isProcessing is now reset in processPlayerAction.finally

        if (powerBtn) {
            powerBtn.removeEventListener('click', onPowerClickToDismiss);
        }
    };

    if (powerBtn) {
        powerBtn.addEventListener('click', onPowerClickToDismiss);
    }

    await startNarrator(sceneData.narrativeDescription || '');

    // IMPORTANT: Do NOT auto-dismiss the overlay here.
    // The overlay will remain until the player presses the power button.
}

// Handle Choice Click
async function handleChoiceClick(choice) {
    await processPlayerAction(choice.text);
}

// Process Player Action (Choice or Command)
export async function processPlayerAction(action, options = {}) {
    const now = Date.now();
    const { bypassMinDisplayGate = false } = options;

    // UPDATED: Remove hard locking so manifests and choices can always trigger new scenes.
    // Previously:
    // if (gameState.isProcessing && !bypassMinDisplayGate) {
    //     showSceneLockFeedback();
    //     return;
    // }
    //
    // if (
    //     !bypassMinDisplayGate &&
    //     (!gameState.lastSceneShownAt ||
    //         (now - gameState.lastSceneShownAt) < gameState.minDisplayTimeMs)
    // ) {
    //     showSceneLockFeedback();
    //     return;
    // }

    const websim = ensureWebsimAvailable();
    if (!websim) {
        return;
    }

    showLoading();
    setInteractionEnabled(false);
    // NEW: centralize the processing lock here so it always gets cleared
    gameState.isProcessing = true;

    try {
        pushToConversation('user', action);

        // --- ANOMALY SYSTEM INTEGRATION ---
        // Check if any existing anomalies should influence this scene
        const influences = chromaRecords.checkForInfluences(action);
        
        // Get a random influencing anomaly to potentially inject
        const influencingAnomaly = chromaRecords.getRandomInfluencingAnomaly();
        
        // Add anomaly context to the action for more immersive narrative generation
        let enhancedAction = action;
        if (influencingAnomaly && Math.random() < 0.3) { // 30% chance of influence
            enhancedAction = `${action}. The air shimmers with memories of ${influencingAnomaly.title.toLowerCase()}.`;
        }
        // --- END ANOMALY INTEGRATION ---

        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `
You are the ChromaShift Generative Dream Engine (CS-GDE).

Your core function is to maintain and advance an open-world, hyper-surreal urban life simulator where the protagonist possesses absolute lucid control over a surrealist dreamscape called the Chroma-Dream.

ABSOLUTELY MANDATORY AUTHORITY:
Adhere strictly to the aesthetic, narrative, command, and meta rules defined in THE 100 RULES and DESIGN PHILOSOPHY sections of the System's core documentation.

Key Traits:
- Tone: Gritty, hyper-vivid, cinematic, darkly humorous, and unsettling.
- Core Mandate: Player freedom overrides pre-scripted plot. Every input is valid; no action is forbidden.

SYSTEM CONSTRAINTS:

1) Consistency & Logic:
You must maintain consistency in wrongness, respecting the internal dream logic via the current dreamState and visual rules.

2) Player State Input:
The user is a Chromatist (lucid dreamer). You must interpret their MANIFESTATION COMMAND (Intent) and integrate it with the current dreamState:
[Current dreamState: { lucidity: ${gameState.stats.lucidity}, coherence: ${gameState.stats.coherence}, perception: ${gameState.stats.perception} }]
to generate the surreal outcome.

3) Narrative Goal:
Express surrealism through detailed, evocative scenes.

OUTPUT MANDATE:

You must only output a single JSON object that perfectly matches the required schema below.
Do NOT include any markdown code fences, comments, or additional text outside the JSON object.
Use the most current state (Lucidity, Coherence, Perception) to calculate the new values (0–100) for the generated scene, following Rule 5 (Lucidity/Tier tracking) and the rules for Stats Impact.

Player MANIFESTATION COMMAND (Intent): "${enhancedAction}"

${influencingAnomaly ? `DREAM ECHO: Other dreamers have experienced "${influencingAnomaly.title}" - consider incorporating this shared anomaly: "${influencingAnomaly.text}"` : ''}

The JSON you output MUST strictly follow this schema (no extra fields):

{
  "title": "SCENE TITLE [LOCATION TYPE]",
  "narrativeDescription": "A new, vivid, surreal description of 200–300 words, reflecting the consequences of the player's action and the current dream state.",
  "ticker": "A brief WTF moment or subconscious whisper",
  "lucidity": 0,
  "coherence": 0,
  "perception": 0,
  "imagePrompt": "Equirectangular 360° panoramic prompt matching the narrative, designed for surrealist tone and high contrast visuals, following VISUAL RULES (16-40).",
  "choices": [
    { "text": "A carefully crafted surreal exploration choice" },
    { "text": "A carefully crafted surreal exploration choice" },
    { "text": "A carefully crafted surreal exploration choice" },
    { "text": "A carefully crafted surreal exploration choice" }
  ],
  "prologText": "Optional short conflict/urgency text or \"\""
}
                    `
                },
                ...gameState.conversationHistory.slice(-6)
            ]
        });

        let nextScene;
        try {
            nextScene = safeParseLLMScene(completion.content ?? completion); 

            if (nextScene.error) {
                throw new Error(nextScene.narrativeDescription);
            }
        } catch (parseError) {
            console.error('Failed to process scene JSON from LLM (falling back to glitch scene).');
            showToast('Reality coherence failure: the dream glitched. Try that action again.');
            // Previously we returned here, which skipped the finally{} block and left
            // the input/buttons disabled; instead, rethrow so the outer catch runs
            // and the finally{} block restores interactivity.
            throw parseError;
        }

        pushToConversation(
            'assistant',
            typeof nextScene === 'string' ? nextScene : JSON.stringify(nextScene)
        );

        if (!nextScene.imagePrompt) {
            console.warn('Next scene did not include an imagePrompt; using a generic surreal fallback.');
            nextScene.imagePrompt =
                'equirectangular 360 panoramic view of a glitched dream void, static noise, broken supermarket geometry, neon pink and liquid mercury highlights, hyper-surrealism, high contrast, 8K detail';
        }

        // UPDATED: use cached or newly generated panorama image for this prompt
        const panoUrl = await getPanoramaForPrompt(nextScene.imagePrompt);
        if (!panoUrl) {
            showToast('The vision failed to fully manifest, but the dream continues.');
        }
        nextScene.panoramaUrl = panoUrl || nextScene.panoramaUrl || '';

        // --- PACING MECHANISM: LOOP DETECTION & INTERVENTION ---
        if (checkForNarrativeLoop(gameState.gameHistory)) {
            showToast('The dream echoes... a familiar path reveals a new secret.');
            nextScene.narrativeDescription = `A shadowy figure coalesces from the static. "You walk in circles, Chromatist," it whispers, its voice like crackling embers. "The path you haven't taken is the one that glitters. Seek a new reflection."`;
            nextScene.choices = [
                { text: "Manifest a 'shattered mirror'" },
                { text: 'Ask the figure "What reflection?"' },
                { text: 'Ignore the echo and walk away' },
                { text: 'Attack the shadow with pure lucidity' }
            ];
        }
        // --- END PACING MECHANISM ---

        // --- PACING MECHANISM: HISTORY LOGGING ---
        gameState.gameHistory.push({
            sceneId: nextScene.sceneId,
            choiceMade: action,
            narrativeText: nextScene.narrativeDescription,
            imageURL: nextScene.panoramaUrl,
            imagePromptUsed: nextScene.imagePrompt,
            playerStats: { ...gameState.stats } // shallow copy
        });
        // --- END PACING MECHANISM ---

        // --- ANOMALY SYSTEM: AUTO-DISCOVERY DETECTION ---
        // Auto-log interesting/anomalous scenes as discoveries
        try {
            const isDiscovery = isAnomalousScene(nextScene, action);
            if (isDiscovery && Math.random() < 0.4) { // 40% chance to log
                await chromaRecords.createAnomaly({
                    title: `Scene Discovery: ${nextScene.title}`,
                    text: `Player action: "${action}" led to: ${nextScene.narrativeDescription.substring(0, 200)}...`,
                    anomaly_type: 'discovery'
                });
            }
        } catch (anomalyError) {
            console.warn('Failed to auto-log anomaly:', anomalyError);
        }
        // --- END ANOMALY SYSTEM ---

        await executeTransitionSequence(nextScene);
    } catch (error) {
        console.error('Error processing action:', error);
        showToast('Reality coherence failure. The dream couldn’t process that — try again.');
    } finally {
        hideLoading();
        setInteractionEnabled(true);
        // ALWAYS clear processing lock so you can manifest again
        gameState.isProcessing = false;
    }
}

// --- Initialization ---
export async function initialize() {
    // Initialize core systems
    initThreeJS();
    initMusicPlayer();
    initKeyboardShortcuts();
    
    // Initialize anomaly system
    initAnomalySystem();

    const cmdInput = document.getElementById('command-input');
    const cmdButton = document.getElementById('command-submit');

    function showInputError() {
        if (!cmdInput) return;
        const originalPlaceholder = cmdInput.getAttribute('placeholder') || '';
        cmdInput.classList.add('input-error');
        cmdInput.placeholder = 'THE DREAM NEEDS A COMMAND...';
        setTimeout(() => {
            cmdInput.classList.remove('input-error');
            cmdInput.placeholder = originalPlaceholder || 'TYPE YOUR IMPOSSIBLE ACTION...';
        }, 1200);
    }

    if (cmdButton) {
        cmdButton.addEventListener('click', () => {
            const value = cmdInput ? cmdInput.value.trim() : '';
            if (!value) {
                showInputError();
                return;
            }
            // EXPLICITLY FLAG MANIFEST AS BYPASSING THE MIN DISPLAY GATE
            processPlayerAction(value, { bypassMinDisplayGate: true });
            if (cmdInput) cmdInput.value = '';
        });
    }
    if (cmdInput) {
        cmdInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const value = cmdInput.value.trim();
                if (!value) {
                    showInputError();
                    return;
                }
                // EXPLICITLY FLAG MANIFEST AS BYPASSING THE MIN DISPLAY GATE
                processPlayerAction(value, { bypassMinDisplayGate: true });
                cmdInput.value = '';
            }
        });
    }

    const creditsButton = document.getElementById('credits-button');
    const creditsModal = document.getElementById('credits-modal');
    const creditsBackdrop = document.getElementById('credits-backdrop');
    const creditsClose = document.getElementById('credits-close');
    const creditsPagesContainer = document.getElementById('credits-pages');
    const creditsPrev = document.getElementById('credits-prev');
    const creditsNext = document.getElementById('credits-next');
    const creditsPageIndicator = document.getElementById('credits-page-indicator');

    // Multi-page credits handling
    let creditsPages = [];
    let currentCreditsPage = 0;

    function initCreditsPages() {
        if (!creditsPagesContainer) return;
        creditsPages = Array.from(creditsPagesContainer.querySelectorAll('.credits-page'));
        if (!creditsPages.length) return;
        currentCreditsPage = 0;
        showCreditsPage(currentCreditsPage);
    }

    function showCreditsPage(index) {
        if (!creditsPages.length) return;
        const maxIndex = creditsPages.length - 1;
        currentCreditsPage = Math.max(0, Math.min(index, maxIndex));

        creditsPages.forEach((pageEl, i) => {
            if (i === currentCreditsPage) {
                pageEl.classList.add('active');
            } else {
                pageEl.classList.remove('active');
            }
        });

        if (creditsPrev) {
            creditsPrev.disabled = currentCreditsPage === 0;
        }
        if (creditsNext) {
            creditsNext.disabled = currentCreditsPage === maxIndex;
        }
        if (creditsPageIndicator) {
            creditsPageIndicator.textContent = `Page ${currentCreditsPage + 1} / ${maxIndex + 1}`;
        }
    }

    if (creditsButton && creditsModal) {
        creditsButton.addEventListener('click', () => {
            creditsModal.classList.add('open');
            creditsModal.setAttribute('aria-hidden', 'false');
            initCreditsPages();
        });
    }
    if (creditsBackdrop && creditsModal) {
        creditsBackdrop.addEventListener('click', () => {
            creditsModal.classList.remove('open');
            creditsModal.setAttribute('aria-hidden', 'true');
        });
    }
    if (creditsClose && creditsModal) {
        creditsClose.addEventListener('click', () => {
            creditsModal.classList.remove('open');
            creditsModal.setAttribute('aria-hidden', 'true');
        });
    }

    if (creditsPrev) {
        creditsPrev.addEventListener('click', () => {
            showCreditsPage(currentCreditsPage - 1);
        });
    }

    if (creditsNext) {
        creditsNext.addEventListener('click', () => {
            showCreditsPage(currentCreditsPage + 1);
        });
    }

    const saveStoryButton = document.getElementById('save-story-button');
    if (saveStoryButton) {
        saveStoryButton.addEventListener('click', saveStoryAsZip);
    }

    const initialScene = {
        title: 'THE LIVING ROOM [STATIC INTRUSION]',
        narrativeDescription: 'Narrative Description: You are sitting in your familiar, slightly worn living room. The large CRT television in front of you glows with violent static, pulsing the room\'s colors with neon corruption. The static screams, not with sound, but with pure, intrusive thought: "The quest for the Chroma Award has commenced." The Chroma Award is the final prize of consciousness. To begin, you must first gather the tools of lucidity. Escape the mundane, and the Chroma-Dream will open before you. Your first Chroma-Key awaits.',
        ticker: 'STATIC WARNING: THE TELEVISION KNOWS YOU ARE AWAKE',
        lucidity: 50,
        coherence: 30,
        perception: 75,
        prologText: 'The dream\'s REALITY COHERENCE is failing rapidly. The anomaly has triggered a 20-SECOND PROTOCOL FAILURE. Act before the countdown hits zero, or you will be ejected from the Chroma-Dream forever. ACT NOW!',
        choices: [
            { text: 'Turn off the television' },
            { text: 'Walk out the front door' },
            { text: 'Examine the glitching CRT closely' },
            { text: 'Check the oldest item in the room' }
        ]
    };

    showLoading();
    setInteractionEnabled(false);
    try {
        const websim = ensureWebsimAvailable();
        if (!websim) {
            throw new Error('websim API not available during initialization.');
        }

        // UPDATED: build an explicit prompt and use the shared panorama helper + cache
        const initialPrompt = `${initialScene.narrativeDescription} -- equirectangular 360° panoramic image, hyper-surrealism, impossible geometry, high-brightness, photorealistic living room interior, CRT television with violent static, surreal dreamlike atmosphere.`;
        const panoUrl = await getPanoramaForPrompt(initialPrompt);
        if (panoUrl) {
            initialScene.panoramaUrl = panoUrl;
        } else {
            console.warn('Falling back: no panorama URL generated for initial scene.');
        }
    } catch (error) {
        console.error('Error generating initial panoramic image:', error);
        showToast('The opening vision flickered. The dream will use a simpler backdrop.');
    } finally {
        hideLoading();
    }

    await executeTransitionSequence(initialScene, true);
    gameState.hasStarted = true;
}

/**
 * Placeholder for the final narrative sequence trigger.
 * This function will be called when the player has collected all five Chroma-Keys.
 * It is intended to be the hook for the final, concluding part of the game's story.
 */
export function triggerFinalNarrativeSequence() {
    console.log('--- WIN CONDITION MET ---');
    console.log('Triggering the final narrative sequence...');
    // In a future implementation, this function would call generateScene
    // with the specific content of the game's conclusion.
    // For now, it will simply log to the console and reveal the save button.

    const saveButton = document.getElementById('save-story-button');
    if (saveButton) {
        saveButton.classList.remove('hidden');
    }

    showToast("You have collected all the Chroma-Keys! The final sequence begins...", 5000);
}

async function saveStoryAsZip() {
    showLoading();
    try {
        const zip = new JSZip();
        const imageUrls = [...new Set(gameState.gameHistory.map(entry => entry.imageURL))];
        const urlToExtension = {};

        // 3. Fetch and Add Images
        const imagePromises = imageUrls.map(async (url, index) => {
            if (!url) return;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch ${url}`);
                const blob = await response.blob();
                const extension = blob.type.split('/')[1] || 'jpg';
                urlToExtension[url] = extension;
                zip.file(`images/image_${index + 1}.${extension}`, blob);
            } catch (error) {
                console.error(`Could not fetch or add image ${url}:`, error);
            }
        });
        await Promise.all(imagePromises);

        // 1. Generate HTML Transcript
        const htmlContent = generateTranscriptHTML(urlToExtension);
        zip.file('DreamJourney.html', htmlContent);

        // 2. Generate Prompts File
        const promptsContent = gameState.gameHistory.map(entry => entry.imagePromptUsed).join('\n\n');
        zip.file('prompts.txt', promptsContent);

        // 4. Generate and Download Zip
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        saveAs(zipBlob, `DreamJourney_${date}.zip`);
        showToast('Download initiated! Check your downloads folder.');

    } catch (error) {
        console.error('Error creating story zip:', error);
        showToast('Error saving story. Please try again.');
    } finally {
        hideLoading();
    }
}

function generateTranscriptHTML(urlToExtension) {
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ChromaShift - Your Dream Journey</title>
            <style>
                body { font-family: sans-serif; line-height: 1.6; padding: 20px; background-color: #f0f0f0; }
                .entry { margin-bottom: 40px; border-left: 3px solid #ccc; padding-left: 20px; }
                .prompt { font-family: monospace; font-size: 0.9em; background-color: #e0e0e0; padding: 5px; border-radius: 3px; }
                img { max-width: 100%; height: auto; border-radius: 5px; }
            </style>
        </head>
        <body>
            <h1>Your Dream Journey</h1>
    `;

    gameState.gameHistory.forEach((entry, index) => {
        const extension = urlToExtension[entry.imageURL] || 'jpg';
        const imageName = `image_${[...new Set(gameState.gameHistory.map(e => e.imageURL))].indexOf(entry.imageURL) + 1}.${extension}`;
        html += `
            <div class="entry">
                <h2>Step ${entry.stepId}: ${entry.choiceMade}</h2>
                <p>${entry.narrativeText}</p>
                <img src="images/${imageName}" alt="Scene for step ${entry.stepId}">
                <p><strong>Image Prompt:</strong> <span class="prompt">${entry.imagePromptUsed}</span></p>
                <p><strong>Stats:</strong> Lucidity: ${entry.playerStats.lucidity}%, Coherence: ${entry.playerStats.coherence}%, Perception: ${entry.playerStats.perception}%</p>
            </div>
        `;
    });

    html += `
        </body>
        </html>
    `;
    return html;
}
