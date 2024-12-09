import { MeshPhongMaterial, MeshStandardMaterial } from "three";
import { loadTextures } from "./TextureFunctions";
import { Texture } from "../model/Texture";

export function loadMaterials(gltfModel, shoeModel) {

    gltfModel.traverse((model) => {
        if (model.material) {

            if (Array.isArray(model.material)) {

                model.material.map(() => new MeshStandardMaterial({ color: 0x505050 }))

            } else {

                for (const shoeModelMaterial of shoeModel.getMaterials()) {

                    if (shoeModelMaterial.getName() == model.material.name) {

                        if (shoeModelMaterial.getTextures() instanceof Texture) {

                            const textures = loadTextures(shoeModel.getName(), shoeModelMaterial.getTextures())

                            model.material = new MeshPhongMaterial({
                                color: shoeModelMaterial.getColor(),
                                map: textures[0],
                                normalMap: textures.length === 2 ? textures[1] : null,
                            });

                        } else {

                            model.material = new MeshStandardMaterial({
                                color: shoeModelMaterial.getColor(),
                            });

                        }
                        

                    }

                }

            }
        }
    })

}