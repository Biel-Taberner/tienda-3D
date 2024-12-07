import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

export function loadTextures(texture) {

    return texture.getNormalTexture() === null
        ? [ 
            textureLoader.load(`/Textures/Elegant Shoes Shelf/${texture.getDiffTexture()}`), 
            textureLoader.load(`/Textures/Elegant Shoes Shelf/${texture.getNormalTexture()}`), 
        ]
        : [
            textureLoader.load(`/Textures/Elegant Shoes Shelf/${texture.getDiffTexture()}`), 
        ];
}