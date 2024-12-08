import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader, TrackballControls } from "three/examples/jsm/Addons.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const textureLoader = new THREE.TextureLoader();

loader.load("/Models/Elegant Shoes Shelf/shoe_shelf_2.gltf", (gltf) => {
  const model = gltf.scene;

  model.traverse( function( object ) {

    if ( object.material ) console.log(object.material)

  } );

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


// Crear los controles de órbita
/* const controls = new OrbitControls(camera, renderer.domElement);

// Establecer los límites de rotación
controls.maxPolarAngle = Math.PI / 2; // Límite superior (90 grados)
controls.minPolarAngle = 0; // Límite inferior (0 grados)

// (Opcional) Limitar la rotación horizontal (azimuthal angle, eje Y)
controls.maxAzimuthAngle = Math.PI / 2; // Límite derecho (90 grados)
controls.minAzimuthAngle = -Math.PI / 2; // Límite izquierdo (-90 grados)

// Controlar el comportamiento del clic izquierdo
let isLeftMouseDown = false;

controls.enableDamping = true;

// Detectar cuando se presiona el clic izquierdo
window.addEventListener("mousedown", (event) => {
  if (event.button === 0) { // Botón izquierdo del mouse
    isLeftMouseDown = true;
    controls.enablePan = false;
  }
});

// Render loop
function animate() {
  controls.update(); // Asegurarte de que OrbitControls funcione correctamente
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate(); */



// Variables para almacenar la posición del mouse
const mouse = new THREE.Vector2();

const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

// Escucha el movimiento del mouse
window.addEventListener("mousemove", (event) => {

  mouse.x = ( event.clientX - windowHalf.x );
	mouse.y = ( event.clientY - windowHalf.x );

});

const target = new THREE.Vector2();

// Velocidad de movimiento de la cámara
const cameraFollowSpeed = 0.05;

// Definir el rango permitido para la rotación en el eje Y
const maxRotationY = Math.PI / 9;  // 45 grados
const minRotationY = -Math.PI / 9; // -45 grados */

// Render loop
function animate() {
  tick();
	/* target.x = ( 1 - mouse.x ) * 0.002;
  target.y = ( 1 - mouse.y ) * 0.002;
  
  camera.rotation.y += cameraFollowSpeed * ( target.x - camera.rotation.y );

  camera.rotation.y = Math.max(minRotationY, Math.min(maxRotationY, camera.rotation.y)); */

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

