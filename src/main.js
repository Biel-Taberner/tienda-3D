import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader, TrackballControls } from "three/examples/jsm/Addons.js";

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

loader.load("/Models/Elegant Shoes Shelf/shoe_shelf_2.gltf", (gltf) => {
  const model = gltf.scene;

  model.rotation.y = Math.PI / 1;

  scene.add(model)
})

const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

camera.position.z = 5;

const ambientalLight = new THREE.AmbientLight(0xffffff, 1);

scene.add(ambientalLight)


const points = [
  {
    position: new THREE.Vector3(0, 1.75, 0),
    element: document.querySelector('.point-0')
  }
]

const controls = new OrbitControls(camera, renderer.domElement);

const tick = () => {

  controls.update()

  // Recorrer cada punt de l’array points
  for(const point of points)   {
    const screenPosition = point.position.clone();
    screenPosition.project(camera);

    const translateX = screenPosition.x * renderer.domElement.width * 0.5
    const translateY = -screenPosition.y * renderer.domElement.height * 0.5
    point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
  }
}

// Render loop
function animate() {
  tick();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

