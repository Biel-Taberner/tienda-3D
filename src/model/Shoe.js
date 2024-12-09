export class Shoe {

    #id;
    #type;
    #name;
    #mesh;
    #materials;

    constructor(id, type, name, mesh) {
        this.#id = id;
        this.#type = type;
        this.#name = name;
        this.#mesh = mesh;
    }

    getID() {
        return this.#id;
    }

    setID(id) {
        this.#id = id;
    }

    getType() {
        return this.#type;
    }

    setType(type) {
        this.#type = type;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getMesh() {
        return this.#mesh;
    }

    setMesh(mesh) {
        this.#mesh = mesh;
    }

    getMaterials() {
        return this.#materials;
    }

    setMaterials(materials) {
        this.#materials = materials;
    }
}