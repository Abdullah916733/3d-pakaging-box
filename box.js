function initializeScene() {
  // Get the container element
  const container = document.getElementById("cube-container");

  // Create a scene, camera, and renderer using Three.js
  const scene = new THREE.Scene(); //A scene in Three.js represents a container or environment where you can place and manipulate objects, lights, cameras, and other elements of a 3D scene.
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x808080);
  renderer.shadowMap.enabled = true; // Enable shadow mapping
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Set shadow map type for smoother shadows

  container.appendChild(renderer.domElement);

  let initialColor = "#e7e7e7";

  let colorsOfFace = [
    initialColor,
    initialColor,
    initialColor,
    initialColor,
    initialColor,
    initialColor,
  ];
  // Add a click event listener to the button

  let widthInput = document.getElementById("width");
  let heightInput = document.getElementById("height");
  let depthInput = document.getElementById("depth");
  const colorInput = document.getElementById("color");
  const updateButton = document.getElementById("updateColorButton");

  updateButton.addEventListener("click", function () {
    updateCube();
  });
  colorInput.addEventListener("change", function () {
    const colorValue = colorInput.value;

    // Update colorsOfFace array for elements with initial color
    colorsOfFace = colorsOfFace.map((color) =>
      color === initialColor ? colorValue : color
    );

    // Update initialColor value
    initialColor = colorValue;

    shouldRotateCube = false;
    updateCube();

    // Reset the rotation flag
    shouldRotateCube = true;
  });
  const saveButton = document.getElementById("saveButton");

  // Disable all inputs initially
  widthInput.disabled = true;
  heightInput.disabled = true;
  depthInput.disabled = true;
  // colorInput.disabled = true;
  saveButton.disabled = true;

  // Add a click event listener to the "Choose custom style" button
  const customChoiceButton = document.getElementById("custom-choice");
  customChoiceButton.addEventListener("click", () => {
    // Enable all inputs
    widthInput.disabled = false;
    heightInput.disabled = false;
    depthInput.disabled = false;
    colorInput.disabled = false;
    saveButton.disabled = false;
  });

  const selectElement = document.querySelector(".form-select");

  const button1 = document.getElementById("myButton");
  const button2 = document.getElementById("myButton2");
  const button3 = document.getElementById("myButton3");

  selectElement.addEventListener("change", function () {
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

  button1.addEventListener("click", () => {
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
  button2.addEventListener("click", () => {
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
  button3.addEventListener("click", () => {
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
  document.getElementById("saveButton").addEventListener("click", () => {
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
  widthInput.value = "200";
  heightInput.value = "200";
  depthInput.value = "200";
  colorInput.value = "#e7e7e7"; // Set the default color to black

  // Update the cube's dimensions and color when the form is submitted
  document.getElementById("saveButton").addEventListener("click", () => {
    // Update the cube's dimensions based on the form inputs
    const widthValue = Number(widthInput.value);
    const heightValue = Number(heightInput.value);
    const depthValue = Number(depthInput.value);

    // Update the cube with form input values
    updateCube(widthValue, heightValue, depthValue);
  });

  document.getElementById("myButton").addEventListener("click", () => {
    // Set button values to 100
    const widthValue = 250;
    const heightValue = 250;
    const depthValue = 150;

    // Update the cube with button values
    updateCube(widthValue, heightValue, depthValue);
  });
  document.getElementById("myButton2").addEventListener("click", () => {
    // Set button values to 325,325,125
    const widthValue = 325;
    const heightValue = 325;
    const depthValue = 125;

    // Update the cube with button values
    updateCube(widthValue, heightValue, depthValue);
  });
  document.getElementById("myButton3").addEventListener("click", () => {
    // Set button values to 325,325,125
    const widthValue = 400;
    const heightValue = 400;
    const depthValue = 150;

    // Update the cube with button values
    updateCube(widthValue, heightValue, depthValue);
  });

  //Handle face buttons

  const faceButtons = document.querySelectorAll(".face-button");
  const colorPicker = document.getElementById("colorPicker");
  const changeColorButton = document.getElementById("changeColorButton");

  colorPicker.addEventListener("input", function () {
    // Trigger the click event on the changeColorButton
    changeColorButton.click();
  });

  changeColorButton.addEventListener("click", (event) => {
    const newColor = colorPicker.value;

    // Update the cube with the new material
    colorsOfFace[activeFaceIndex] = newColor;

    shouldRotateCube = false;
    updateCube();

    // Reset the rotation flag
    shouldRotateCube = true;
  });

  let activeFaceIndex = 0;
  let activeFace = "";
  const setActiveFaceIndex = (val) => {
    activeFaceIndex = val;
    return;
  };
  const setActiveFace = (valFace) => {
    activeFace = valFace;
    return;
  };

  var selectedFace;

  faceButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const face = event.target.dataset.face;
      selectedFace = face;
      setActiveFaceIndex(event.target.dataset.index);
      setActiveFace(event.target.dataset.face);
      // activeFaceIndex = event.target.dataset.index;

      // Remove active class from all buttons
      faceButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the selected button
      button.classList.add("active");

      // Rotate the cube to bring the selected face to the front
      const rotation = getRotationByFace(face);
      cube.rotation.x = rotation.x;
      cube.rotation.y = rotation.y;
    });

    // setActiveFaceIndex();
  });

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

      cube.rotation.x =
        startRotation.x + (targetRotation.x - startRotation.x) * t;
      cube.rotation.y =
        startRotation.y + (targetRotation.y - startRotation.y) * t;

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
      case "front":
        return { x: 0.1745, y: 0.3491 }; // 20 degrees in radians (Math.PI / 9)
      case "back":
        return { x: 0.1745, y: Math.PI - 0.3491 }; // -20 degrees in radians (Math.PI - Math.PI / 9)

      case "top":
        const rotationTY = THREE.MathUtils.degToRad(30);
        const rotationTX = THREE.MathUtils.degToRad(-30);
        return { x: Math.PI / 2 + rotationTX, y: 0 };

      case "bottom":
        const rotation = THREE.MathUtils.degToRad(30);
        return { x: -Math.PI / 2 + rotation, y: 0 };

      case "left":
        return { x: 0.1745, y: (Math.PI / 9) * 3 + (Math.PI / 180) * 10 }; // 20 degrees + 10 degrees in radians
      case "right":
        return { x: 0.1745, y: (-Math.PI / 9) * 5 - (Math.PI / 180) * 10 }; // -20 degrees - 10 degrees in radians
      default:
        return { x: 0, y: 0 };
    }
  }

  // Add event listeners to the alignment buttons
  const alignLeftButton = document.getElementById("alignLeft");
  const alignTopButton = document.getElementById("alignTop");
  const alignCenterButton = document.getElementById("alignCenter");
  const alignRightButton = document.getElementById("alignRight");
  const alignBottomButton = document.getElementById("alignBottom");

  alignLeftButton.addEventListener("click", handleAlignmentButtonClick);
  alignTopButton.addEventListener("click", handleAlignmentButtonClick);
  alignCenterButton.addEventListener("click", handleAlignmentButtonClick);
  alignRightButton.addEventListener("click", handleAlignmentButtonClick);
  alignBottomButton.addEventListener("click", handleAlignmentButtonClick);

  function handleAlignmentButtonClick(event) {
    const alignment = event.target.id; // Get the alignment from the clicked button's id
    const reader = new FileReader();

    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Get the desired canvas dimensions from the input fields
        const inputHeight = parseInt(
          document.getElementById("imageHeight").value
        );
        const inputWidth = parseInt(
          document.getElementById("imageWidth").value
        );

        // Set the canvas dimensions to the desired size
        canvas.width = inputWidth || 200; // Use the input value or default to 200 if empty
        canvas.height = inputHeight || 200; // Use the input value or default to 200 if empty

        // Calculate the position based on the alignment
        let x, y;

        switch (alignment) {
          case "alignLeft":
            x = 0;
            y = (canvas.height - image.height) / 2;
            break;
          case "alignTop":
            x = (canvas.width - image.width) / 2;
            y = 0;
            break;
          case "alignCenter":
            x = (canvas.width - image.width) / 2;
            y = (canvas.height - image.height) / 2;
            break;
          case "alignRight":
            x = canvas.width - image.width;
            y = (canvas.height - image.height) / 2;
            break;
          case "alignBottom":
            x = (canvas.width - image.width) / 2;
            y = canvas.height - image.height;
            break;
          default:
            x = (canvas.width - image.width) / 2;
            y = (canvas.height - image.height) / 2;
            break;
        }

        // Draw the active face color
        context.fillStyle = "#e7e7e7";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the image onto the canvas at the desired position
        context.drawImage(image, x, y, image.width, image.height);

        // Convert the canvas back to a data URL
        const resizedDataURL = canvas.toDataURL();

        const texture = new THREE.Texture();
        texture.image = new Image();
        texture.image.onload = function () {
          texture.needsUpdate = true;
          texture.premultiplyAlpha = true;

          texture.repeat.set(1, 1);

          const material = new THREE.MeshLambertMaterial({
            map: texture,
            color: colorsOfFace[activeFaceIndex],
          });
          cube.material[activeFaceIndex] = material; // Set the material to the desired cube face
        };

        texture.image.src = resizedDataURL;
      };
    };
  }

  // Create a cube geometry with default values
  const cubeGeometry = new THREE.BoxGeometry(
    Number(widthInput.value),
    Number(heightInput.value),
    Number(depthInput.value)
  );

  // var loaderValue = new THREE.TextureLoader().load("https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg");

  // Create an array of materials for each face
  const faceMaterials = [
    new THREE.MeshStandardMaterial({
      color: 0xe7e7e7,
    }), // Red material for the right face   0
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Green material for the left face   1
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Blue material for the top face  2
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Yellow material for the bottom face  3
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Magenta material for the front face  4
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Cyan material for the bakc face   5
  ];

  // Create a cube mesh with different materials for each face
  const cube = new THREE.Mesh(cubeGeometry, faceMaterials);

  cube.castShadow = true; // Enable the cube to cast shadows
  cube.receiveShadow = true; // Allow the cube's material to receive shadows
  scene.add(cube); // Add cube to the scene

  document.addEventListener("mousewheel", onMouseWheel, false);
  document.addEventListener("DOMMouseScroll", onMouseWheel, false); // For Firefox compatibility

  function onMouseWheel(event) {
    var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));

    // Calculate the new camera position
    var newCameraZ = camera.position.z - delta * 10; // Adjust the zoom speed if desired

    // Restrict the camera position between z = 700 and z = 50
    if (newCameraZ <= 800 && newCameraZ >= 300) {
      camera.position.z = newCameraZ;
    }

    // Make the camera always look at the scene's center
    camera.lookAt(scene.position);
  }
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

    cube.rotation.x =
      startRotation.x + (targetRotation.x - startRotation.x) * t;
    cube.rotation.y =
      startRotation.y + (targetRotation.y - startRotation.y) * t;

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

  // Define a boolean variable to track whether the cube rotation should occur
  let shouldRotateCube = true;
  function updateCube() {
    const newCubeGeometry = new THREE.BoxGeometry(
      Number(widthInput.value),
      Number(heightInput.value),
      Number(depthInput.value)
    );

    cube.geometry.dispose(); // Dispose of the old geometry
    cube.geometry = newCubeGeometry;

    let newMaterial = [
      new THREE.MeshStandardMaterial({
        color: colorsOfFace[0],
      }), // Red material for the front face   0
      new THREE.MeshStandardMaterial({ color: colorsOfFace[1] }), // Green material for the back face   1
      new THREE.MeshStandardMaterial({ color: colorsOfFace[2] }), // Blue material for the top face  2
      new THREE.MeshStandardMaterial({ color: colorsOfFace[3] }), // Yellow material for the bottom face  3
      new THREE.MeshStandardMaterial({ color: colorsOfFace[4] }), // Magenta material for the right face  4
      new THREE.MeshStandardMaterial({ color: colorsOfFace[5] }), // Cyan material for the left face   5
    ];

    // Update the material for all faces of the cube
    cube.material = newMaterial;

    if (shouldRotateCube) {
      // Perform cube rotation logic here

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

        cube.rotation.x =
          startRotation.x + (targetRotation.x - startRotation.x) * t;
        cube.rotation.y =
          startRotation.y + (targetRotation.y - startRotation.y) * t;

        if (progress < duration) {
          requestAnimationFrame(animateInitialRotation);
        }
      }

      requestAnimationFrame(animateInitialRotation);
    }
  }

  // Rotate the cube on mouse click and drag
  let isDragging = false;
  let previousMousePosition = {
    x: 0,
    y: 0,
  };

  container.addEventListener("mousedown", function (event) {
    isDragging = true;
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  });

  container.addEventListener("mousemove", function (event) {
    if (isDragging) {
      const mouseDelta = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      // Restrict rotation to top and bottom faces
      const rotationSpeed = 0.01; // Adjust this value to control the rotation speed
      cube.rotation.x += mouseDelta.y * rotationSpeed;
      cube.rotation.x = Math.max(
        Math.min(cube.rotation.x, Math.PI / 2),
        -Math.PI / 2
      ); // Restrict rotation to -90 to 90 degrees

      // Restrict rotation to less than 360 degrees
      cube.rotation.y += mouseDelta.x * rotationSpeed;
      cube.rotation.y = cube.rotation.y % (Math.PI * 2); // Keep rotation within 0 to 2*pi range

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    }
  });

  container.addEventListener("mouseup", function () {
    isDragging = false;
  });

  // Disable context menu on right-click to prevent interference with mouse drag
  container.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  //  image upload functionality section start
  // var textureLoader = new THREE.TextureLoader();
  var faceMaterialsDefualt = [
    new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
    new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
    new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
    new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
    new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
    new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
  ];
  
  
  const imageInput = document.getElementById("imageInput");
  imageInput.addEventListener("change", (event) => {
    imageCube(event.target.files[0]);
  });

  function imageCube(imageValue) {
    const file = imageValue;
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;
      image.onload =  function () {
        const texture = new THREE.Texture();
        texture.image = image;
        texture.needsUpdate = true;

console.log("activeFaceIndex ",activeFaceIndex)
        switch (selectedFace) {
            case "top":
                console.log("selectedFace ",selectedFace)
                faceMaterialsDefualt[2].map = texture
                faceMaterialsDefualt[2].needsUpdate = true
                cube.material = faceMaterialsDefualt
                break;
                
            case "bottom":
              console.log("selectedFace ",selectedFace)
              faceMaterialsDefualt[3].map = texture
              faceMaterialsDefualt[3].needsUpdate = true
              cube.material = faceMaterialsDefualt
              break;
              
            case "right":
              console.log("selectedFace ",selectedFace)
              faceMaterialsDefualt[0].map = texture
              faceMaterialsDefualt[0].needsUpdate = true
              cube.material = faceMaterialsDefualt
              break;
              
            case "left":
              console.log("selectedFace ",selectedFace)
              faceMaterialsDefualt[1].map = texture
              faceMaterialsDefualt[1].needsUpdate = true
              cube.material = faceMaterialsDefualt
              break;
              
            case "front":
              console.log("selectedFace ",selectedFace)
              faceMaterialsDefualt[4].map = texture
              faceMaterialsDefualt[4].needsUpdate = true
              cube.material = faceMaterialsDefualt
              break;
                          
            case "back":
              console.log("selectedFace ",selectedFace)
              faceMaterialsDefualt[5].map = texture
              faceMaterialsDefualt[5].needsUpdate = true
              cube.material = faceMaterialsDefualt
              break;

            default:
              console.log("faceMaterialsDefualt ",faceMaterialsDefualt)
              faceMaterialsDefualt.map = texture
              faceMaterialsDefualt.needsUpdate = true
              cube.material = faceMaterialsDefualt
              break;
           }

        cube.material = faceMaterialsDefualt
        console.log("faceMaterialsDefualt ",faceMaterialsDefualt)
      };
    };
    reader.readAsDataURL(file);
    requestAnimationFrame(animateInitialRotation);
  }


  // const addText = document.getElementById("addTextButton");
  // const inputText = document.getElementById("text-input");
  // addText.addEventListener("click", (event) => {
  //   console.log("inputText ",inputText.value)
  // });



  // var textforSelectedFace = [
  //   new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
  //   new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
  //   new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
  //   new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
  //   new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
  //   new THREE.MeshBasicMaterial({ color: 0xe7e7e7}),
  // ];
  // function addTextOnSelectedFace(){

  // }
}

//  image upload functionality section end

// Attempt to initialize the scene immediately
if (typeof THREE === "undefined") {
  loadFallbackThreeJS();
} else {
  initializeScene();
}
