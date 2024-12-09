import { Shoe } from "../model/Shoe";

export class ShoeService {

    async getAllShoes() {

        const fetchedShoes = await fetch("shoes.json");

        const shoesJSON = await fetchedShoes.json();

        return shoesJSON.map(shoeJSON => this.#jsonToObject(shoeJSON))

    }

    #jsonToObject(shoeJSON) {

        return new Shoe(shoeJSON.id, shoeJSON.type, shoeJSON.name, shoeJSON.mesh);

    }

}