import { ShoeController } from "./controller/ShoeController";
import { setupCanvasScenesByNumberOfShoes } from "./helpers/CanvasFunctions";

const shoeController = new ShoeController();

const filteredShoesByType = await shoeController.findAllShoesByType("Shoe");

console.log(filteredShoesByType)

// Cridam al métode que s'encarregará de crear tantes escenes com sebates hi hagi
setupCanvasScenesByNumberOfShoes(filteredShoesByType);