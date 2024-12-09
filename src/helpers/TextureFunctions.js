import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

export function loadTextures(textureFolder, texture) {

    return texture.getNormalTexture() === null
        ? [ 
            textureLoader.load(`/Textures/${textureFolder}/${texture.getDiffTexture()}`), 
            textureLoader.load(`/Textures/${textureFolder}/${texture.getNormalTexture()}`), 
        ]
        : [
            textureLoader.load(`/Textures/${textureFolder}/${texture.getDiffTexture()}`), 
        ];
}