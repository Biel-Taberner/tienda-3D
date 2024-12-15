import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Object3D } from "three";
import { Timer } from 'three/addons/misc/Timer.js';

export function updateVectorPoints(points = [], camera, renderer) {

  // Recorrer cada punt de l’array points
  for(const point of points) {

    const position = new Vector3(point.getX(), point.getY(), point.getZ());

    const screenPosition = position.clone();
    screenPosition.project(camera);

    const translateX = screenPosition.x * renderer.domElement.width * 0.5
    const translateY = -screenPosition.y * renderer.domElement.height * 0.5

    const domElement = document.querySelector(`.${point.getElement()}`);
    domElement.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;

  }

}

export function drawVectorsToHTML(vectorPoints = []) {

    for (const vectorPoint of vectorPoints) {

        // Cream el div pare amb les classes: "point", "point-0" i "visible"
        const divPointTag = document.createElement("div");
        divPointTag.classList.add("point", `${vectorPoint.getElement()}`, "visible");

        divPointTag.id = "shoe_model_" + vectorPoint.getModelID();

        // Ara, crearem altres dos divs fills, un tindrà la classe "label" i l'altre la classe "text",
        // en aquest darrer, afeguirem el contingut que volem mostrar quan es passi amb el ratolí per damunt
        const divLabelTag = document.createElement("div");
        divLabelTag.classList.add("label");

        const divTextTag = document.createElement("div");
        divTextTag.classList.add("text");
        divTextTag.innerHTML = vectorPoint.getText();

        
        // Per acabar, afeguirem els dos divs fills al div pare i aquest, l'afeguirem al "body" del html
        divPointTag.appendChild(divLabelTag);
        divPointTag.appendChild(divTextTag);

        document.querySelector("#expositor").appendChild(divPointTag)

    }

}

export function displayShoeWhenClickedPoint(vectorPoints = [], shoes = [], scene, camera, renderer) {

  const loader = new GLTFLoader();

  let shoeGFXObject = new Object3D();

  const timer = new Timer();

  for (const vectorPoint of vectorPoints) {

    document.getElementById(`shoe_model_${vectorPoint.getModelID()}`).addEventListener("click", (e) => {

      document.getElementById("go-back").style.visibility = "visible";

      const idNumber = Number(getIDNumber(e.currentTarget.id));
      const modelToDisplay = findShoeByID(shoes, idNumber);

      document.getElementById("canvas-model-shoe-expositor-renderer-info").style.display = "block";

      document.getElementById("canvas-model-shoe-expositor-renderer-info").innerHTML = `
        <div class="slide-canvas-info-subcontainer">
          <div class="slide-canvas-info-title-content">
            <h2>${modelToDisplay.getName()}</h2>
          </div>
          <div class="slide-canvas-info-subcontent">
            <p>${modelToDisplay.getDescription()}</p>
          </div>
        </div>`

      loader.load(`/Models/${modelToDisplay.getName()}/${modelToDisplay.getMesh()}`, (gltf) => {

        const existingModel = shoeGFXObject.getObjectByName('shoe_to_display');
        
        if (existingModel) {
          shoeGFXObject.remove(existingModel);
          scene.remove(existingModel);
        }

        const model = gltf.scene;
        model.renderOrder = 0;
        model.name = 'shoe_to_display';

        shoeGFXObject.add(model);
        shoeGFXObject.position.set(0, 10, -0.5);
        shoeGFXObject.scale.set(1, 1, 1);
        scene.add(shoeGFXObject);

      });

      camera.position.set(0, 10, 1.665);

    });

  }

  const animate = (timestamp) => {

    const delta = timer.getDelta();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    // Actualitzarem el timer amb cada timestamp
    timer.update(timestamp);

    shoeGFXObject.rotateY(delta * 0.35);

  };

  animate();

}

function findShoeByID(shoes = [], id) {

  return shoes.find(shoe => shoe.getID() === id);

}

function getIDNumber(idText) {

  return idText.split("shoe_model_")[1];

}