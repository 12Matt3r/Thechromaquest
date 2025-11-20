// chromashift-keyboard.js

/**
 * Initializes application-wide keyboard shortcuts for audio controls.
 */
export function initKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
        // Ignore shortcuts if the user is typing in an input field.
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            return;
        }

        let handled = false;

        switch (event.code) {
            case 'Space':
                document.getElementById('music-play-pause')?.click();
                handled = true;
                break;
            case 'ArrowUp':
                document.getElementById('music-vol-up')?.click();
                handled = true;
                break;
            case 'ArrowDown':
                document.getElementById('music-vol-down')?.click();
                handled = true;
                break;
            case 'ArrowRight':
                document.getElementById('music-next')?.click();
                handled = true;
                break;
        }

        if (handled) {
            event.preventDefault();
        }
    });
}