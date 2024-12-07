import { MaterialService } from "../service/MaterialService";
import { ShoeService } from "../service/ShoeService";

export class ShoeController {

    #shoeService;
    #materialService;

    constructor() {
        this.#shoeService = new ShoeService();
        this.#materialService = new MaterialService();
    }

    async getAllShoes() {

        const shoes = await this.#shoeService.getAllShoes();

        const materials = await this.#materialService.loadAllMaterials();

        for (const shoe of shoes) {

            const materialsShoe = [];

            for (const material of materials[0]) {

                if (material.getModel() === shoe.getID()) {

                    materialsShoe.push(material);

                }

            }

            shoe.setMaterials(materialsShoe);

        }

        return shoes;

    }

}