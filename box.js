function initializeScene() {
  // custom state start
  function useState(initialValue) {
    let state = initialValue;

    function setState(newState) {
      state = newState;
      return state;
    }

    return [state, setState];
  }
  // custom state end

  const [boxValue, setBoxValue] = useState({
    width: 200,
    height: 200,
    depthInput: 200,
    color: ["", "", "", "", "", ""],
    image: ["", "", "", "", "", ""],
    text: [],
    positionX: 200,
    positionY: 200,
  });

  // Create a scene, camera, and renderer using Three.js start

  const container = document.getElementById("cube-container");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x808080);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Create a scene, camera, and renderer using Three.js end

  // Add a click event listener to the button start

  const colorInput = document.getElementById("color");
  const saveButton = document.getElementById("saveButton");
  let widthInput = document.getElementById("width");
  let heightInput = document.getElementById("height");
  let depthInput = document.getElementById("depth");
  const size_select = document.querySelector("#size-form");

  widthInput.value = boxValue.width;
  heightInput.value = boxValue.height;
  depthInput.value = boxValue.depthInput;
  colorInput.value = "#e7e7e7";
  widthInput.disabled = true;
  heightInput.disabled = true;
  depthInput.disabled = true;
  saveButton.disabled = true;

  // Add a click event listener to the button end

  // box geometry start

  const cubeGeometry = new THREE.BoxGeometry(
    Number(widthInput.value),
    Number(heightInput.value),
    Number(depthInput.value)
  );

  const faceMaterials = [
    new THREE.MeshStandardMaterial({
      color: 0xe7e7e7,
    }), // Red material for the right face   0
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Green material for the left face   1
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Blue material for the top face  2
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Yellow material for the bottom face  3
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Magenta material for the front face  4
    new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Cyan material for the back face   5
  ];

  const cube = new THREE.Mesh(cubeGeometry, faceMaterials);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);

  // box geometry end

  // add size functionality start

  size_select.addEventListener("change", () => {
    const sizeValue = size_select.value;
    if (sizeValue != "custom") {
      const sizeSplit = sizeValue.split(",");
      let width = sizeSplit[0];
      let height = sizeSplit[1];
      let depth = sizeSplit[2];
      widthValue = width;
      heightValue = height;
      depthValue = depth;
      widthInput.value = widthValue;
      heightInput.value = heightValue;
      depthInput.value = depthValue;
      setBoxValue((boxValue.width = widthInput.value));
      setBoxValue((boxValue.height = heightInput.value));
      setBoxValue((boxValue.depth = depthInput.value));
      updateCube(widthValue, heightValue, depthValue);
    } else {
      widthInput.disabled = false;
      heightInput.disabled = false;
      depthInput.disabled = false;
      saveButton.disabled = false;
    }
  });

  document.getElementById("saveButton").addEventListener("click", () => {
    const widthValue = Number(widthInput.value);
    const heightValue = Number(heightInput.value);
    const depthValue = Number(depthInput.value);
    updateCube(widthValue, heightValue, depthValue);
  });

  // add size functionality end

  //  face index functionality start

  let activeFaceIndex = 0;
  const setActiveFaceIndex = (val) => {
    activeFaceIndex = val;
    return;
  };
  const setActiveFace = (valFace) => {
    activeFace = valFace;
    return;
  };

  // face index functionality end

  // color functionality start

  let colorsOfFace = [];

  let shouldRotateCube = true;

  function updateCube() {
    const newCubeGeometry = new THREE.BoxGeometry(
      Number(widthInput.value),
      Number(heightInput.value),
      Number(depthInput.value)
    );

    cube.geometry.dispose();
    cube.geometry = newCubeGeometry;

    let newMaterial = [
      new THREE.MeshStandardMaterial({
        color: boxValue.color[0],
        map: boxValue.image[0],
      }),
      new THREE.MeshStandardMaterial({
        color: boxValue.color[1],
        map: boxValue.image[1],
      }),
      new THREE.MeshStandardMaterial({
        color: boxValue.color[2],
        map: boxValue.image[2],
      }),
      new THREE.MeshStandardMaterial({
        color: boxValue.color[3],
        map: boxValue.image[3],
      }),
      new THREE.MeshStandardMaterial({
        color: boxValue.color[4],
        map: boxValue.image[4],
      }),
      new THREE.MeshStandardMaterial({
        color: boxValue.color[5],
        map: boxValue.image[5],
      }),
    ];

    cube.material = newMaterial;

    if (shouldRotateCube) {
      const startRotation = { x: 0, y: 0 };
      const targetRotation = { x: Math.PI / 6, y: Math.PI / 4 };

      const duration = 1000;
      let startTime = null;

      function animateInitialRotation(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = timestamp - startTime;
        const t = Math.min(progress / duration, 1);

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

  boxValue.color.map((value) => {
    colorsOfFace.push(value);
  });

  const colorPicker = document.getElementById("colorPicker");
  const changeColorButton = document.getElementById("changeColorButton");

  colorInput.addEventListener("change", function () {
    const colorValue = colorInput.value;

    for (let i = 0; i < colorsOfFace.length; i++) {
      colorsOfFace[i] = colorValue;
      setBoxValue((boxValue.color[i] = colorValue));
    }
    shouldRotateCube = false;
    updateCube();
    shouldRotateCube = true;
  });

  colorPicker.addEventListener("input", function () {
    changeColorButton.click();
  });

  changeColorButton.addEventListener("click", () => {
    const newColor = colorPicker.value;
    setBoxValue((boxValue.color[activeFaceIndex] = newColor));
    colorsOfFace[activeFaceIndex] = newColor;
    shouldRotateCube = false;
    updateCube();
    shouldRotateCube = true;
  });

  // color functionality end

  //  face position functionality start

  const faceButtons = document.querySelectorAll(".face-button");

  var selectedFace;

  function getTargetRotation(face) {
    switch (face) {
      case "front":
        return { x: 0.1745, y: 0.3491 };
      case "back":
        return { x: 0.1745, y: Math.PI - 0.3491 };
      case "top":
        const rotationTY = THREE.MathUtils.degToRad(30);
        const rotationTX = THREE.MathUtils.degToRad(-30);
        return { x: Math.PI / 2 + rotationTX, y: 0 };
      case "bottom":
        const rotation = THREE.MathUtils.degToRad(30);
        return { x: -Math.PI / 2 + rotation, y: 0 };
      case "left":
        return { x: 0.1745, y: (Math.PI / 9) * 3 + (Math.PI / 180) * 10 };
      case "right":
        return { x: 0.1745, y: (-Math.PI / 9) * 5 - (Math.PI / 180) * 10 };
      default:
        return { x: 0, y: 0 };
    }
  }

  function getRotationByFace(face) {
    const duration = 1000;
    const startRotation = { x: cube.rotation.x, y: cube.rotation.y };
    const targetRotation = getTargetRotation(face);

    let startTime = null;

    function animateRotation(timestamp) {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const t = Math.min(progress / duration, 1);

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

  faceButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const face = event.target.dataset.face;
      selectedFace = face;
      setActiveFaceIndex(event.target.dataset.index);
      setActiveFace(event.target.dataset.face);
      faceButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const rotation = getRotationByFace(face);
      cube.rotation.x = rotation.x;
      cube.rotation.y = rotation.y;
    });
  });

  //  face position functionality end

  document.addEventListener("mousewheel", onMouseWheel, false);
  document.addEventListener("DOMMouseScroll", onMouseWheel, false); // For Firefox compatibility

  function onMouseWheel(event) {
    var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
    var newCameraZ = camera.position.z - delta * 10; // Adjust the zoom speed if desired
    // Restrict the camera position between z = 700 and z = 50
    if (newCameraZ <= 800 && newCameraZ >= 300) {
      camera.position.z = newCameraZ;
    }
    // Make the camera always look at the scene's center
    camera.lookAt(scene.position);
  }
  camera.position.z = 550;
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

  const image_show_modal = document.querySelector(".image_show_modal img");
  const save_design = document.querySelector(".save_design");
  const imageInput = document.getElementById("imageInput");
  const image_cancel = document.querySelectorAll(".image_cancel");

  save_design.addEventListener("click", function () {
    var faceMaterialsDefault = [
      new THREE.MeshBasicMaterial({
        color: boxValue.color[0],
        map: boxValue.image[0],
      }),
      new THREE.MeshBasicMaterial({
        color: boxValue.color[1],
        map: boxValue.image[1],
      }),
      new THREE.MeshBasicMaterial({
        color: boxValue.color[2],
        map: boxValue.image[2],
      }),
      new THREE.MeshBasicMaterial({
        color: boxValue.color[3],
        map: boxValue.image[3],
      }),
      new THREE.MeshBasicMaterial({
        color: boxValue.color[4],
        map: boxValue.image[4],
      }),
      new THREE.MeshBasicMaterial({
        color: boxValue.color[5],
        map: boxValue.image[5],
      }),
    ];

    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        const texture = new THREE.Texture();
        texture.image = image;
        texture.needsUpdate = true;

        switch (selectedFace) {
          case "top":
            faceMaterialsDefault[2].map = texture;
            faceMaterialsDefault[2].needsUpdate = true;
            faceMaterialsDefault[2].color.set("white");
            setBoxValue((boxValue.image[2] = texture));
            setBoxValue((boxValue.color[2] = "white"));
            cube.material = faceMaterialsDefault;
            break;

          case "bottom":
            faceMaterialsDefault[3].map = texture;
            faceMaterialsDefault[3].needsUpdate = true;
            faceMaterialsDefault[3].color.set("white");
            setBoxValue((boxValue.image[3] = texture));
            setBoxValue((boxValue.color[3] = "white"));

            cube.material = faceMaterialsDefault;
            break;

          case "right":
            faceMaterialsDefault[0].map = texture;
            faceMaterialsDefault[0].needsUpdate = true;
            faceMaterialsDefault[0].color.set("white");
            setBoxValue((boxValue.image[0] = texture));
            setBoxValue((boxValue.color[0] = "white"));

            cube.material = faceMaterialsDefault;
            break;

          case "left":
            faceMaterialsDefault[1].map = texture;
            faceMaterialsDefault[1].needsUpdate = true;
            faceMaterialsDefault[1].color.set("white");
            setBoxValue((boxValue.image[1] = texture));
            setBoxValue((boxValue.color[1] = "white"));

            cube.material = faceMaterialsDefault;
            break;

          case "front":
            faceMaterialsDefault[4].map = texture;
            faceMaterialsDefault[4].needsUpdate = true;
            faceMaterialsDefault[4].color.set("white");
            setBoxValue((boxValue.image[4] = texture));
            setBoxValue((boxValue.color[4] = "white"));

            cube.material = faceMaterialsDefault;
            break;

          case "back":
            faceMaterialsDefault[5].map = texture;
            faceMaterialsDefault[5].needsUpdate = true;
            faceMaterialsDefault[5].color.set("white");
            setBoxValue((boxValue.image[5] = texture));
            setBoxValue((boxValue.color[5] = "white"));

            cube.material = faceMaterialsDefault;
            break;

          default:
            faceMaterialsDefault.map((value, i) => {
              value.map = texture;
              value.needsUpdate = true;
              faceMaterialsDefault[i].color.set("white");
              setBoxValue((boxValue.image[i] = texture));
              setBoxValue((boxValue.color[i] = "white"));
            });
            cube.material = faceMaterialsDefault;
            break;
        }
        cube.material = faceMaterialsDefault;
      };
    };
    reader.readAsDataURL(file);
    image_show_modal.src = null;
    requestAnimationFrame(animateInitialRotation);
  });

  function imageCube(imageValue) {
    image_show_modal.src = URL.createObjectURL(imageValue);
  }

  image_cancel.forEach((value) => {
    value.addEventListener("click", function () {
      return (image_show_modal.src = null);
    });
  });

  imageInput.addEventListener("change", (event) => {
    imageCube(event.target.files[0]);
  });
}

//  image upload functionality section end

// Attempt to initialize the scene immediately
if (typeof THREE === "undefined") {
  loadFallbackThreeJS();
} else {
  initializeScene();
}
