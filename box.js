function initializeScene() {



    // Get the container element
    const container = document.getElementById('cube-container');

    // Create a scene, camera, and renderer using Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xf7f7f7);
    renderer.shadowMap.enabled = true; // Enable shadow mapping
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Set shadow map type for smoother shadows

    container.appendChild(renderer.domElement);

    const button1 = document.getElementById('myButton');

    // Add a click event listener to the button
    button1.addEventListener('click', () => {
        // Display the dimensions
        console.log('Height: 100');
        console.log('Width: 100');
        console.log('Depth: 100');
    });


    // Get the form inputs
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const depthInput = document.getElementById('depth');
    const colorInput = document.getElementById('color');

    // Set default values for the inputs
    widthInput.value = '100';
    heightInput.value = '100';
    depthInput.value = '100';
    colorInput.value = '#e7e7e7'; // Set the default color to black

    // Update the cube's dimensions and color when the form is submitted
    document.getElementById('saveButton').addEventListener('click', updateCube);

    // Create a cube geometry with default values
    const cubeGeometry = new THREE.BoxGeometry(Number(widthInput.value), Number(heightInput.value), Number(depthInput.value));

    // Create a face material using MeshLambertMaterial with input color
    const faceMaterial = new THREE.MeshLambertMaterial({
        color: colorInput.value
    });

    // Create a cube mesh with face material
    const cube = new THREE.Mesh(cubeGeometry, faceMaterial);
    cube.castShadow = true; // Enable the cube to cast shadows
    cube.receiveShadow = true; // Allow the cube's material to receive shadows
    scene.add(cube); // Add cube to the scene

    // Set camera position and add it to the scene
    camera.position.z = 200; // Top right and back position
    camera.lookAt(scene.position);
    scene.add(camera);

    // Set the initial rotation of the cube
    cube.rotation.y = Math.PI / 4; // 45 degrees in radians
    cube.rotation.x = Math.PI / 6; // 20 degrees in radians


    // Create a directional light from top right and back position
    const light = new THREE.DirectionalLight(0xffffff, 1.4);
    light.position.set(150, 300, 900);
    // light.castShadow = true; // Enable shadow casting for the light
    light.shadow.mapSize.width = 2048; // Shadow map width for shadow quality
    light.shadow.mapSize.height = 2048; // Shadow map height for shadow quality
    scene.add(light);

    // Set up shadow properties for the light
    light.shadow.bias = -0.001; // Shadow bias to reduce self-shadowing artifacts
    light.shadow.camera.near = 0.1; // Near plane of the light's shadow camera
    light.shadow.camera.far = 500; // Far plane of the light's shadow camera
    light.shadow.camera.left = -100; // Left plane of the light's shadow camera
    light.shadow.camera.right = 100; // Right plane of the light's shadow camera
    light.shadow.camera.top = 100; // Top plane of the light's shadow camera
    light.shadow.camera.bottom = -100; // Bottom plane of the light's shadow camera


    // Render the scene with the camera
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();

    function updateCube() {
        const newCubeGeometry = new THREE.BoxGeometry(Number(widthInput.value), Number(heightInput.value), Number(depthInput.value));
        cube.geometry.dispose(); // Dispose of the old geometry
        cube.geometry = newCubeGeometry;
        cube.material.color.set(colorInput.value);
    }

    // Rotate the cube on mouse click and drag
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    container.addEventListener('mousedown', function (event) {
        isDragging = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    container.addEventListener('mousemove', function (event) {
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

    container.addEventListener('mouseup', function () {
        isDragging = false;
    });

    // Disable context menu on right-click to prevent interference with mouse drag
    container.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
}

// Attempt to initialize the scene immediately
if (typeof THREE === 'undefined') {
    loadFallbackThreeJS();
} else {
    initializeScene();
}
