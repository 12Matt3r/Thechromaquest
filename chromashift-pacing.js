// chromashift-pacing.js

/**
 * Analyzes the game history to detect if the player is stuck in a narrative loop.
 * A loop is detected if the same sequence of 3 scene IDs appears twice in the last 10 entries.
 *
 * @param {Array<Object>} history - The gameState.gameHistory array.
 * @returns {boolean} - True if a loop is detected, false otherwise.
 */
export function checkForNarrativeLoop(history) {
    // A loop is impossible if the history is too short.
    if (history.length < 10) {
        return false;
    }

    const recentHistory = history.slice(-10);
    const sceneIds = recentHistory.map(entry => entry.sceneId);

    // Look for a sequence of 3 identical scene IDs.
    for (let i = 0; i < sceneIds.length - 5; i++) {
        const sequence = sceneIds.slice(i, i + 3).join(',');
        const restOfHistory = sceneIds.slice(i + 3).join(',');
        if (restOfHistory.includes(sequence)) {
            console.warn(`Narrative loop detected! Sequence: ${sequence}`);
            return true;
        }
    }

    return false;
}