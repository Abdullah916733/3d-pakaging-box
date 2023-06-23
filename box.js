function initializeScene() {
    // Get the container element
    const container = document.getElementById('cube-container');

    // Create a scene, camera, and renderer using Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xf7f7f7);

    container.appendChild(renderer.domElement);

    // Get the form inputs
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const depthInput = document.getElementById('depth');
    const colorInput = document.getElementById('color');

    // Set default values for the inputs
    widthInput.value = '100';
    heightInput.value = '100';
    depthInput.value = '100';
    colorInput.value = '#1d1d1d'; // Set the default color to black

    // Update the cube's dimensions and color when the form is submitted
    document.getElementById('saveButton').addEventListener('click', updateCube);

    // Create a cube geometry with default values
    const cubeGeometry = new THREE.BoxGeometry(Number(widthInput.value), Number(heightInput.value), Number(depthInput.value));

    // Create a face material using MeshBasicMaterial with input color
    const faceMaterial = new THREE.MeshBasicMaterial({
        color: colorInput.value
    });

    // Create a wireframe material using LineBasicMaterial with white color
    const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    // Create a cube mesh with face material
    const cube = new THREE.Mesh(cubeGeometry, faceMaterial);

    // Create a wireframe geometry using EdgesGeometry and cube geometry
    const wireframeGeometry = new THREE.EdgesGeometry(cubeGeometry);

    // Create a wireframe mesh using wireframe geometry and wireframe material
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube.add(wireframe); // Add wireframe as a child of the cube

    scene.add(cube); // Add cube to the scene

    // Set camera position and add it to the scene
    camera.position.z = 300;
    scene.add(camera);

    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    function updateCube() {
        cube.geometry = new THREE.BoxGeometry(Number(widthInput.value), Number(heightInput.value), Number(depthInput.value));
        cube.material.color.set(colorInput.value);
    }

    // Render the scene with the camera
    function render() {
        requestAnimationFrame(render);

        renderer.render(scene, camera);
    }
    render();

    // Rotate the cube on mouse click and drag
    container.addEventListener('mousedown', function(event) {
        isDragging = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    container.addEventListener('mousemove', function(event) {
        if (isDragging) {
            const mouseDelta = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            };

            cube.rotation.x += mouseDelta.y * 0.01;
            cube.rotation.y += mouseDelta.x * 0.01;

            previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    });

    container.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Disable context menu on right-click to prevent interference with mouse drag
    container.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
}

// Attempt to initialize the scene immediately
if (typeof THREE === 'undefined') {
    loadFallbackThreeJS();
} else {
    initializeScene();
}
