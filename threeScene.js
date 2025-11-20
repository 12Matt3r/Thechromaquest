import * as THREE from 'three';

let scene, camera, renderer, sphere;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotation = { x: 0, y: 0 };
let touchStartPos = { x: 0, y: 0 };

// Use a single shared texture loader and track the current texture for cleanup
const textureLoader = new THREE.TextureLoader();
let currentTexture = null;

// NEW: world-space anchors for choice bubbles (inside the panorama sphere)
let bubbleAnchors = [];

// NEW: generate N random, well-separated points on the inner surface of the sphere
function generateSeparatedBubbleAnchors(count) {
    const anchors = [];
    const radius = 400; // slightly inside the sphere radius (500)
    const minAngle = Math.PI / 4; // minimum angular separation (~45 degrees)
    const maxAttempts = 200;

    function randomPointOnSphere() {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);
        return new THREE.Vector3(x, y, z).multiplyScalar(radius);
    }

    function isFarEnough(candidate) {
        if (anchors.length === 0) return true;
        const cNorm = candidate.clone().normalize();
        return anchors.every((existing) => {
            const eNorm = existing.clone().normalize();
            const dot = THREE.MathUtils.clamp(cNorm.dot(eNorm), -1, 1);
            const angle = Math.acos(dot);
            return angle >= minAngle;
        });
    }

    let attempts = 0;
    while (anchors.length < count && attempts < maxAttempts) {
        const candidate = randomPointOnSphere();
        if (isFarEnough(candidate)) {
            anchors.push(candidate);
        }
        attempts++;
    }

    // Fallback: if we couldn't place enough with separation, just fill remaining randomly
    while (anchors.length < count) {
        anchors.push(randomPointOnSphere());
    }

    return anchors;
}

// NEW: called by UI layer when new choice bubbles are created
export function setBubbleAnchors(count) {
    bubbleAnchors = generateSeparatedBubbleAnchors(count);
}

// NEW: helper to reposition choice bubbles every frame so they stay anchored in the panorama
function updateChoiceBubblePositions() {
    const container = document.getElementById('choice-bubbles');
    if (!container || !camera || !renderer || !bubbleAnchors.length) return;

    const bubbles = container.querySelectorAll('.choice-bubble');
    if (!bubbles.length) return;

    const canvas = renderer.domElement;
    const canvasWidth = canvas.clientWidth || window.innerWidth;
    const canvasHeight = canvas.clientHeight || window.innerHeight;

    bubbles.forEach((bubble, index) => {
        const anchor = bubbleAnchors[index % bubbleAnchors.length];
        if (!anchor) return;

        const projected = anchor.clone().project(camera);

        // If the point is behind the camera, hide this bubble
        if (projected.z > 1) {
            bubble.style.opacity = '0';
            bubble.style.pointerEvents = 'none';
            return;
        } else {
            bubble.style.opacity = '';
            bubble.style.pointerEvents = '';
        }

        // Convert normalized device coordinates to viewport percentages
        const ndcX = projected.x;
        const ndcY = projected.y;

        const xPx = (ndcX * 0.5 + 0.5) * canvasWidth;
        const yPx = (-ndcY * 0.5 + 0.5) * canvasHeight;

        const xPercent = (xPx / window.innerWidth) * 100;
        const yPercent = (yPx / window.innerHeight) * 100;

        bubble.style.left = `${xPercent}vw`;
        bubble.style.top = `${yPercent}vh`;
    });
}

export function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 0.1);

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('scene-canvas'),
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false
    });

    // NEW: size the renderer to match the visible canvas area (between top and bottom bars)
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const geometry = new THREE.SphereGeometry(500, 40, 30);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
        map: null,
        side: THREE.DoubleSide
    });

    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Use the existing canvas reference for input events
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    // FIX: listen for mousedown instead of an extra mousemove listener
    canvas.addEventListener('mousemove', onMouseDown);

    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('touchstart', onTouchStart);

    window.addEventListener('resize', onWindowResize);

    animate();
}

export function updatePanorama(imageUrl) {
    if (!imageUrl || !sphere) return;

    textureLoader.load(
        imageUrl,
        (newTexture) => {
            // Dispose of the old texture to free GPU memory
            if (currentTexture) {
                currentTexture.dispose();
            }
            currentTexture = newTexture;
            sphere.material.map = newTexture;
            sphere.material.needsUpdate = true;
        },
        undefined,
        (err) => {
            console.warn('Failed to load panorama texture:', err);
        }
    );
}

function onMouseDown(e) {
    isDragging = true;
    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
}

function onMouseMove(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    // NEW: skip needless work if there was effectively no movement
    if (deltaX === 0 && deltaY === 0) return;

    rotation.y += deltaX * 0.005;
    rotation.x += deltaY * 0.005;
    rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));

    previousMousePosition = { x: e.clientX, y: e.clientY };
}

function onMouseUp() {
    isDragging = false;
}

function onTouchStart(e) {
    isDragging = true;
    touchStartPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    previousMousePosition = { ...touchStartPos };
}

function onTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    // NEW: skip needless work if there was effectively no movement
    if (deltaX === 0 && deltaY === 0) return;

    rotation.y += deltaX * 0.005;
    rotation.x += deltaY * 0.005;
    rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));

    previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
}

function onTouchEnd() {
    isDragging = false;
}

function onWindowResize() {
    if (!camera || !renderer) return;

    // NEW: recompute size based on the actual canvas area, not the full window
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    // Re-apply pixel ratio clamp on resize to keep performance stable
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
}

function animate() {
    requestAnimationFrame(animate);

    // NEW: Skip rendering work when the tab is hidden to save GPU/CPU
    if (typeof document !== 'undefined' && document.hidden) {
        return;
    }

    if (camera && renderer) {
        camera.rotation.order = 'YXZ';
        camera.rotation.y = rotation.y;
        camera.rotation.x = rotation.x;
        renderer.render(scene, camera);

        // NEW: keep choice bubbles anchored at their 3D positions as the camera moves
        updateChoiceBubblePositions();
    }
}