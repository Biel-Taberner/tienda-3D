import { ShoeController } from "./controller/ShoeController.js";
import { setupCanvasScenesByNumberOfShoes } from "./helpers/CanvasFunctions.js";

const shoeController = new ShoeController();

const filteredShoesByType = await shoeController.findAllShoesByType("Shoe");

const filteredIconicShoes = await shoeController.findAllShoesByType("Iconic");

// Cridam al métode que s'encarregará de crear tantes escenes com sebates hi hagi
setupCanvasScenesByNumberOfShoes(filteredShoesByType, "#canvas-model-shoe-renderer");

setupCanvasScenesByNumberOfShoes(filteredIconicShoes, "#canvas-model-icon-renderer", true);