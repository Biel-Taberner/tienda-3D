import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader, TrackballControls } from "three/examples/jsm/Addons.js";
import { ShoeController } from "./controller/ShoeController";
import { loadMaterials } from "./helpers/MaterialFunctions";
import VectorPointsController from "./controller/VectorPointsController";
import { updateVectorPoints, drawVectorsToHTML, displayShoeWhenClickedPoint } from "./helpers/VectorPointsFunctions";
import { Timer } from 'three/addons/misc/Timer.js';


const shoeController = new ShoeController();

const shoes = await shoeController.getAllShoes();

const vectorPointsController = new VectorPointsController();

const vectorPoints = await vectorPointsController.getAllVectorPoints();

const filteredExpositorShoes = await shoeController.findAllShoesByType("Expositor");

const width = window.innerWidth;
const height = window.innerHeight;

const loader = new GLTFLoader();

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const canvasElement = document.querySelector(`#canvas-model-shoe-expositor-renderer`);

if (canvasElement && canvasElement.parentNode) {
  // Reemplazar el canvas actual con renderer.domElement
  canvasElement.parentNode.replaceChild(renderer.domElement, canvasElement);

  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.id = canvasElement.id;
}

scene.add(camera);

camera.position.z = 1;
camera.position.y = 0.5;
camera.lookAt(0, 0, 0);

const shoeGFXPosition = [
  0.1,
  -0.1
]

const shoeGFXRotation = [
  -Math.PI / 6,
  Math.PI / 6
]

// let i = 0;

// for (const expositor of filteredExpositorShoes) {

  const shoeGFXObject = new THREE.Object3D();

  loader.load(`/Models/${filteredExpositorShoes[0].getName()}/${filteredExpositorShoes[0].getMesh()}`, (gltf) => {
    const model = gltf.scene;
  
    loadMaterials(model, filteredExpositorShoes[0]);
  
    shoeGFXObject.add(model)

    shoeGFXObject.scale.set(0.1, 0.1, 0.1);
    shoeGFXObject.rotation.y = -Math.PI / 6;
    shoeGFXObject.position.y = 0.1;
    shoeGFXObject.position.x = 0.1;

    /* shoeGFXObject.rotation.y = shoeGFXRotation[i];
    shoeGFXObject.position.y = shoeGFXPosition[i];
    shoeGFXObject.position.x = shoeGFXPosition[i]; */

    scene.add(shoeGFXObject);

  });

  // i++;

// }

// const controls = new OrbitControls(camera, renderer.domElement);

const ambientalLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientalLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.y = 1;
scene.add(directionalLight);


// Variables del mouse
const mouse = new THREE.Vector2();
const targetRotation = new THREE.Vector2(); // Rotación objetivo
const rotationSpeed = 0.05; // Velocidad de suavizado

// Actualizar las coordenadas del mouse
window.addEventListener("mousemove", (event) => {
  // Normalizar las coordenadas del mouse al rango [-1, 1]
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Establecer la rotación objetivo basado en las coordenadas del mouse
  // targetRotation.x = mouse.y * Math.PI / 8; // Máximo de ±22.5° en X
  targetRotation.y = -mouse.x * Math.PI / 4; // Máximo de ±45° en Y
});


const timer = new Timer();

drawVectorsToHTML(vectorPoints)

displayShoeWhenClickedPoint(vectorPoints, shoes, scene, camera, renderer)

document.getElementById("go-back").addEventListener("click", (e) => {

  e.currentTarget.style.visibility = "hidden";

  document.getElementById("canvas-model-shoe-expositor-renderer-info").style.display = "none"

  camera.position.set(0, 0.5, 1);

})

const tick = () => {
  updateVectorPoints(vectorPoints, camera, renderer)
}

function animate(timestamp) {
  tick()
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  // Interpolar la rotación de la cámara hacia la rotación objetivo
  camera.rotation.x += (targetRotation.x - camera.rotation.x) * rotationSpeed;
  camera.rotation.y += (targetRotation.y - camera.rotation.y) * rotationSpeed;

  timer.update(timestamp);
}


window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
});

animate();