
function loadFallbackThreeJS() {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.130.0/build/three.min.js';
    script.onload = function() {
        initializeScene();
    };
    document.head.appendChild(script);
}

function initializeScene() {
    // Get the container element
    const container = document.getElementById('cube-container');

    // Create a scene, camera, and renderer using Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xf7f7f7);

    container.appendChild(renderer.domElement);

    // Get the form inputs
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const depthInput = document.getElementById('depth');
    const colorInput = document.getElementById('color');

    // Create a cube geometry and material
    const cubeGeometry = new THREE.BoxGeometry(Number(widthInput.value), Number(heightInput.value), Number(
        depthInput.value));
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: colorInput.value
    });

    // Create a cube mesh and add it to the scene
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // Set camera position and add it to the scene
    camera.position.z = 300;
    scene.add(camera);

    // Update the cube's dimensions and color when the form is submitted
    document.getElementById('saveButton').addEventListener('click', updateCube);

    function updateCube() {
        cube.geometry = new THREE.BoxGeometry(Number(widthInput.value), Number(heightInput.value), Number(depthInput
            .value));
        cube.material.color.set(colorInput.value);
    }

    // Render the scene with the camera
    function render() {
        requestAnimationFrame(render);
      
        renderer.render(scene, camera);
    }
    render();

    // Update the cube's dimensions and color when the form is submitted
    function updateCube() {
        cube.geometry = new THREE.BoxGeometry(Number(widthInput.value), Number(heightInput.value), Number(depthInput
            .value));
        cube.material.color.set(colorInput.value);
    }

    // Rotate the cube on mouseover
    container.addEventListener('mousemove', function(event) {
        const mouseX = event.clientX - container.offsetLeft;
        const mouseY = event.clientY - container.offsetTop;

        cube.rotation.x = (mouseY - container.clientHeight / 2) * 0.001;
        cube.rotation.y = (mouseX - container.clientWidth / 2) * 0.001;
    });
}

// Attempt to initialize the scene immediately
if (typeof THREE === 'undefined') {
    loadFallbackThreeJS();
} else {
    initializeScene();
}