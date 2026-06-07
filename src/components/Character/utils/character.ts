import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import type { GLTF } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

let characterLoadPromise: Promise<GLTF | null> | null = null;

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
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
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        return await new Promise<GLTF | null>((resolve, reject) => {
          loader.load(
            blobUrl,
            async (gltf) => {
              const character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              character.traverse((child: any) => {
                if (child.isMesh) {
                  const mesh = child as THREE.Mesh;
                  child.castShadow = true;
                  child.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });
              setCharTimeline(character, camera);
              setAllTimeline();
              character.getObjectByName("footR")!.position.y = 3.36;
              character.getObjectByName("footL")!.position.y = 3.36;
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
