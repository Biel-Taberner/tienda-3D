import Transform from "./Transform";

export default class Position extends Transform {

    #text;
    #element;

    getText() {
        return this.#text;
    }

    setText(text) {
        this.#text = text;
    }

    getElement() {
        return this.#element;
    }

    setElement(element) {
        this.#element = element;
    }

}