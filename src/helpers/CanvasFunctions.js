import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Timer } from 'three/addons/misc/Timer.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadMaterials } from "./MaterialFunctions";

export function setupCanvasScenesByNumberOfShoes(shoes = [], canvasToTarget, setCanvasPositionToAbsolute = false) {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const loader = new GLTFLoader();

    for (let i = 0; i < shoes.length; i++) {
        
        const renderer = new THREE.WebGLRenderer({
            alpha: true
        });

        renderer.setSize(width, height);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        const canvasElement = document.querySelector(`${canvasToTarget}-${i}`);

        if (canvasElement && canvasElement.parentNode) {
            // Reemplazar el canvas actual con renderer.domElement
            canvasElement.parentNode.replaceChild(renderer.domElement, canvasElement);

            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";

            if (setCanvasPositionToAbsolute) {
                renderer.domElement.style.position = "absolute";
            }
        }

        scene.add(camera);

        camera.position.z = 1.665;


        const shoeGFXObject = new THREE.Object3D();

        loader.load(`/Models/${shoes[i].getName()}/${shoes[i].getMesh()}`, (gltf) => {

            const model = gltf.scene;

            model.renderOrder = 0;

            loadMaterials(model, shoes[i]);
        
            shoeGFXObject.add(model)
        })
        
        shoeGFXObject.scale.set(1, 1, 1);

        scene.add(shoeGFXObject);

        const controls = new OrbitControls(camera, renderer.domElement);

        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;

        const ambientalLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientalLight);
        ambientalLight.position.y = 0;

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.y = 1;
        scene.add(directionalLight)

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

    }

}