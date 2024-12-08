import { Vector3 } from "three";

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

        document.body.appendChild(divPointTag);

    }

}