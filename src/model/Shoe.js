export class Shoe {

    #id;
    #name;
    #mesh;
    #materials;

    constructor(id, name, mesh) {
        this.#id = id;
        this.#name = name;
        this.#mesh = mesh;
    }

    getID() {
        return this.#id;
    }

    setID(id) {
        this.#id = id;
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