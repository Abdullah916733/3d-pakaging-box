function initializeScene() {



    // Get the container element
    const container = document.getElementById('cube-container');


    // Create a scene, camera, and renderer using Three.js
    const scene = new THREE.Scene();   //A scene in Three.js represents a container or environment where you can place and manipulate objects, lights, cameras, and other elements of a 3D scene.
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x808080);
    renderer.shadowMap.enabled = true; // Enable shadow mapping
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Set shadow map type for smoother shadows

    container.appendChild(renderer.domElement);




    // Add a click event listener to the button

    let widthInput = document.getElementById('width');
    let heightInput = document.getElementById('height');
    let depthInput = document.getElementById('depth');
    const colorInput = document.getElementById('color');
    const updateButton = document.getElementById('updateColorButton');

    updateButton.addEventListener('click', function () {
        updateCube();
    });
    colorInput.addEventListener('change', function () {
        const colorValue = colorInput.value;
        updateCube(colorValue);
    });
    const saveButton = document.getElementById('saveButton');

    // Disable all inputs initially
    widthInput.disabled = true;
    heightInput.disabled = true;
    depthInput.disabled = true;
    // colorInput.disabled = true;
    saveButton.disabled = true;

    // Add a click event listener to the "Choose custom style" button
    const customChoiceButton = document.getElementById('custom-choice');
    customChoiceButton.addEventListener('click', () => {
        // Enable all inputs
        widthInput.disabled = false;
        heightInput.disabled = false;
        depthInput.disabled = false;
        colorInput.disabled = false;
        saveButton.disabled = false;
    });

    const selectElement = document.querySelector('.form-select');

    const button1 = document.getElementById('myButton');
    const button2 = document.getElementById('myButton2');
    const button3 = document.getElementById('myButton3');

    selectElement.addEventListener('change', function () {
        const selectedOption = selectElement.selectedIndex;

        if (selectedOption === 1) {
            button1.click();
        } else if (selectedOption === 2) {
            button2.click();
        } else if (selectedOption === 3) {
            button3.click();
        } else if (selectedOption === 4) {
            customChoiceButton.click();
        }
    });



    button1.addEventListener('click', () => {
        // Display the dimensions

        // Set button values to 100
        widthValue = 250;
        heightValue = 250;
        depthValue = 150;

        // Update the form inputs with button values
        widthInput.value = widthValue;
        heightInput.value = heightValue;
        depthInput.value = depthValue;
    });
    button2.addEventListener('click', () => {
        // Display the dimensions

        // Set button values to 100
        widthValue = 325;
        heightValue = 325;
        depthValue = 125;

        // Update the form inputs with button values
        widthInput.value = widthValue;
        heightInput.value = heightValue;
        depthInput.value = depthValue;
    });
    button3.addEventListener('click', () => {
        // Display the dimensions

        // Set button values to 100
        widthValue = 400;
        heightValue = 400;
        depthValue = 150;

        // Update the form inputs with button values
        widthInput.value = widthValue;
        heightInput.value = heightValue;
        depthInput.value = depthValue;
    });

    // Update the cube's dimensions and form inputs when the save button is clicked
    document.getElementById('saveButton').addEventListener('click', () => {
        // Update the cube's dimensions based on the form inputs
        widthValue = Number(widthInput.value);
        heightValue = Number(heightInput.value);
        depthValue = Number(depthInput.value);

        // Update the form inputs with the cube dimensions
        widthInput.value = widthValue;
        heightInput.value = heightValue;
        depthInput.value = depthValue;
    });




    // Set default values for the inputs
    widthInput.value = '200';
    heightInput.value = '200';
    depthInput.value = '200';
    colorInput.value = '#e7e7e7'; // Set the default color to black



    // Update the cube's dimensions and color when the form is submitted
    document.getElementById('saveButton').addEventListener('click', () => {
        // Update the cube's dimensions based on the form inputs
        const widthValue = Number(widthInput.value);
        const heightValue = Number(heightInput.value);
        const depthValue = Number(depthInput.value);

        // Update the cube with form input values
        updateCube(widthValue, heightValue, depthValue);
    });

    document.getElementById('myButton').addEventListener('click', () => {
        // Set button values to 100
        const widthValue = 250;
        const heightValue = 250;
        const depthValue = 150;

        // Update the cube with button values
        updateCube(widthValue, heightValue, depthValue);
    });
    document.getElementById('myButton2').addEventListener('click', () => {
        // Set button values to 325,325,125
        const widthValue = 325;
        const heightValue = 325;
        const depthValue = 125;

        // Update the cube with button values
        updateCube(widthValue, heightValue, depthValue);
    });
    document.getElementById('myButton3').addEventListener('click', () => {
        // Set button values to 325,325,125
        const widthValue = 400;
        const heightValue = 400;
        const depthValue = 150;

        // Update the cube with button values
        updateCube(widthValue, heightValue, depthValue);
    });

    const faceButtons = document.querySelectorAll('.face-button');

    faceButtons.forEach((button) => {
        button.addEventListener('click', (event) => {

            const face = event.target.dataset.face;

            // Remove active class from all buttons
            faceButtons.forEach((btn) => btn.classList.remove('active'));

            // Add active class to the selected button
            button.classList.add('active');

            // Rotate the cube to bring the selected face to the front
            const rotation = getRotationByFace(face);
            cube.rotation.x = rotation.x;
            cube.rotation.y = rotation.y;

        });
    });

    // Define rotation values for each face
    // Define rotation values for each face
    function getRotationByFace(face) {
        const duration = 1000; // Duration of the rotation animation in milliseconds
        const startRotation = { x: cube.rotation.x, y: cube.rotation.y }; // Initial rotation values
        const targetRotation = getTargetRotation(face); // Get the target rotation values based on the selected face

        let startTime = null;

        function animateRotation(timestamp) {
            if (!startTime) startTime = timestamp;

            const progress = timestamp - startTime;
            const t = Math.min(progress / duration, 1); // Calculate the progress of the animation as a value between 0 and 1

            cube.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * t;
            cube.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * t;

            if (progress < duration) {
                requestAnimationFrame(animateRotation);
            }

        }

        requestAnimationFrame(animateRotation);
        return targetRotation;
    }

    // Helper function to get the target rotation values based on the selected face
    function getTargetRotation(face) {
        switch (face) {
            case 'top':
                const rotationTY = THREE.MathUtils.degToRad(30);
                const rotationTX = THREE.MathUtils.degToRad(-30);
                console.log(face)
                return { x: Math.PI / 2 + rotationTX, y: rotationTY };

            case 'bottom':
                const rotation = THREE.MathUtils.degToRad(30);
                return { x: -Math.PI / 2 + rotation, y: rotation };

            case 'front':
                return { x: 0.1745, y: 0.3491 }; // 20 degrees in radians (Math.PI / 9)
            case 'back':
                return { x: 0.1745, y: Math.PI - 0.3491 }; // -20 degrees in radians (Math.PI - Math.PI / 9)
            case 'left':
                return { x: 0.1745, y: Math.PI / 9 * 4 }; // 20 degrees in radians (Math.PI / 9 * 4)
            case 'right':
                return { x: 0.1745, y: -Math.PI / 9 * 4 }; // -20 degrees in radians (-Math.PI / 9 * 4)
            default:
                return { x: 0, y: 0 };
        }
    }



    //   change face color 
    // Get the color picker input element and the change color button



    // Create a cube geometry with default values
    const cubeGeometry = new THREE.BoxGeometry(
        Number(widthInput.value),
        Number(heightInput.value),
        Number(depthInput.value)
    );

    // Create an array of materials for each face
    const faceMaterials = [
        new THREE.MeshLambertMaterial({ color: 0xe7e7e7 }), // Red material for the front face   0
        new THREE.MeshLambertMaterial({ color: 0xe7e7e7 }), // Green material for the back face   1 
        new THREE.MeshLambertMaterial({ color: 0xe7e7e7 }), // Blue material for the top face  2
        new THREE.MeshLambertMaterial({ color: 0xe7e7e7 }), // Yellow material for the bottom face  3
        new THREE.MeshLambertMaterial({ color: 0xe7e7e7 }), // Magenta material for the right face  4 
        new THREE.MeshLambertMaterial({ color: 0xe7e7e7 }) // Cyan material for the left face   5
    ];

    // Create a cube mesh with different materials for each face
    const cube = new THREE.Mesh(cubeGeometry, faceMaterials);

    cube.castShadow = true; // Enable the cube to cast shadows
    cube.receiveShadow = true; // Allow the cube's material to receive shadows
    scene.add(cube); // Add cube to the scene

    // Set camera position and add it to the scene
    camera.position.z = 550; // Top right and back position
    camera.lookAt(scene.position);
    scene.add(camera);


    //this is the function to animate the generated cube by rotating it a bit at the start
    // Set the initial rotation of the cube
    const targetRotationY = Math.PI / 4; // 45 degrees in radians
    const targetRotationX = Math.PI / 6; // 20 degrees in radians

    const startRotation = { x: 0, y: 0 };
    const targetRotation = { x: targetRotationX, y: targetRotationY };
    const duration = 1000; // Animation duration in milliseconds

    let startTime = null;

    function animateInitialRotation(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = timestamp - startTime;
        const t = Math.min(progress / duration, 1); // Calculate the progress of the animation as a value between 0 and 1

        cube.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * t;
        cube.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * t;

        if (progress < duration) {
            requestAnimationFrame(animateInitialRotation);
        }
    }

    requestAnimationFrame(animateInitialRotation);



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
        const newCubeGeometry = new THREE.BoxGeometry(
            Number(widthInput.value),
            Number(heightInput.value),
            Number(depthInput.value)
        );

        cube.geometry.dispose(); // Dispose of the old geometry
        cube.geometry = newCubeGeometry;

        const newMaterial = new THREE.MeshLambertMaterial({
            color: colorInput.value
        });

        // Update the material for all faces of the cube
        cube.material = newMaterial;


        ////this is the function to animate the generated cube by rotating it a bit, everytime it is generated
        // Set the initial and target rotation values
        const startRotation = { x: 0, y: 0 };
        const targetRotation = { x: Math.PI / 6, y: Math.PI / 4 };

        const duration = 1000; // Animation duration in milliseconds
        let startTime = null;

        function animateInitialRotation(timestamp) {
            if (!startTime) startTime = timestamp;

            const progress = timestamp - startTime;
            const t = Math.min(progress / duration, 1); // Calculate the progress of the animation as a value between 0 and 1

            cube.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * t;
            cube.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * t;

            if (progress < duration) {
                requestAnimationFrame(animateInitialRotation);
            }
        }

        requestAnimationFrame(animateInitialRotation);

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

            // Restrict rotation to top and bottom faces
            const rotationSpeed = 0.01; // Adjust this value to control the rotation speed
            cube.rotation.x += mouseDelta.y * rotationSpeed;
            cube.rotation.x = Math.max(Math.min(cube.rotation.x, Math.PI / 2), -Math.PI / 2); // Restrict rotation to -90 to 90 degrees

            // Restrict rotation to less than 360 degrees
            cube.rotation.y += mouseDelta.x * rotationSpeed;
            cube.rotation.y = cube.rotation.y % (Math.PI * 2); // Keep rotation within 0 to 2*pi range

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
