import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader, TrackballControls } from "three/examples/jsm/Addons.js";
import { ShoeController } from "./controller/ShoeController";
import { loadMaterials } from "./helpers/MaterialFunctions";
import VectorPointsController from "./controller/VectorPointsController";
import { updateVectorPoints, drawVectorsToHTML } from "./helpers/VectorPointsFunctions";


const shoeController = new ShoeController();

const shoes = await shoeController.getAllShoes();

const vectorPointsController = new VectorPointsController();

const vectorPoints = await vectorPointsController.getAllVectorPoints();


const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  alpha: true
});

renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

document.body.appendChild(renderer.domElement);

scene.add(camera);

const loader = new GLTFLoader();


for (const shoe of shoes) {

  loader.load(`/Models/Elegant Shoes Shelf/${shoe.getMesh()}`, (gltf) => {

    const model = gltf.scene;

    loadMaterials(model, shoe);

    model.rotation.y = Math.PI / 1;

    scene.add(model)

  })

}


const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

camera.position.z = 5;

const ambientalLight = new THREE.AmbientLight(0xffffff, 1);

scene.add(ambientalLight)


const controls = new OrbitControls(camera, renderer.domElement);

drawVectorsToHTML(vectorPoints);

const tick = () => {

  controls.update()

  updateVectorPoints(vectorPoints, camera, renderer)

}

// Render loop
function animate() {
  tick();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Aquesta EventListener s'encarregarà d'actualitzar l'aspecte de la càmara i les dimensions del canvas de renderitzat
window.addEventListener('resize', () => {

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize( width, height );

});