import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader, TrackballControls } from "three/examples/jsm/Addons.js";
import { Timer } from 'three/addons/misc/Timer.js';
import { TextureLoader } from "three";

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  alpha: true
});

renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

document.querySelector(".slide-canvas-wrapper").appendChild(renderer.domElement)

renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";

scene.add(camera);

camera.position.z = 1.665;

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;


const shoeGFXObject = new THREE.Object3D();

const loader = new GLTFLoader();


const textureLoader = new TextureLoader();

const normalTexture = textureLoader.load("/Textures/Old Oxford Shoe/sh_oldOxfordShoe_normal.jpg");
const diffTexture = textureLoader.load("/Textures/Old Oxford Shoe/sh_oldOxfordShoe_diffuse.jpg");
const aoTexture = textureLoader.load("/Textures/Old Oxford Shoe/sh_oldOxfordShoe_occlusion-sh_oldOxfordShoe_specularGlossiness_png.png");
const glossinessTexture = textureLoader.load("/Textures/Old Oxford Shoe/sh_oldOxfordShoe_specularGlossiness.png");

loader.load("/Models/Old Oxford Shoe/old_oxford_shoe.gltf", (gltf) => {

    const model = gltf.scene;
    
    model.traverse((child) => {
        if (child.isMesh) { // Asegúrate de que sea una malla
            child.material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                normalMap: normalTexture,
                map: diffTexture,
                aoMap: aoTexture,
                specularMap: glossinessTexture,
                specular: new THREE.Color(0xffffff), // Color del brillo especular
                shininess: 50, // Controla la intensidad del brillo especular
            });
        }
    });

    shoeGFXObject.add(model)
})

shoeGFXObject.scale.set(1, 1, 1)

scene.add(shoeGFXObject);

const directionalLightTop = new THREE.AmbientLight(0xffffff, 1);
scene.add(directionalLightTop);

const directionalLightBottom = new THREE.DirectionalLight(0xffffff, 0.1);
// scene.add(directionalLightBottom);

directionalLightTop.position.y = 1;
// directionalLightBottom.position.y = -1;

// Definim un timer
const timer = new Timer();

// Render loop
function animate(timestamp) {
    const delta = timer.getDelta();

    controls.update();
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    // Actualitzarem el timer amb cada timestamp
    timer.update(timestamp);

    shoeGFXObject.rotateY(delta * 0.35);
}

animate();