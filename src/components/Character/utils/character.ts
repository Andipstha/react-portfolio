import { DRACOLoader, GLTFLoader } from "three-stdlib";
import type { GLTF } from "three-stdlib";
import { decryptFile } from "./decrypt";

let characterLoadPromise: Promise<GLTF | null> | null = null;

const setCharacter = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(`${baseUrl}draco/`);
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    if (characterLoadPromise) {
      return characterLoadPromise;
    }

    characterLoadPromise = (async () => {
      try {
        const encryptedBlob = await decryptFile(
          `${baseUrl}models/character.enc`,
          "Character3D#@"
        );
        const blob = new Blob([encryptedBlob]);
        const blobUrl = URL.createObjectURL(blob);

        return await new Promise<GLTF | null>((resolve, reject) => {
          loader.load(
            blobUrl,
            (gltf) => {
              dracoLoader.dispose();
              resolve(gltf);
            },
            undefined,
            (error) => {
              console.error("Error loading GLTF model:", error);
              dracoLoader.dispose();
              reject(error);
            }
          );
        });
      } catch (err) {
        console.error(err);
        characterLoadPromise = null;
        throw err;
      }
    })().catch((error) => {
      characterLoadPromise = null;
      throw error;
    });

    return characterLoadPromise;
  };

  return { loadCharacter };
};

export default setCharacter;
