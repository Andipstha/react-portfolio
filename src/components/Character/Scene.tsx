import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../utils/progressUtils";
import { cleanupScrollTimelines, setCharTimeline, setAllTimeline } from "../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();
  useEffect(() => {
    const containerEl = canvasDiv.current;
    if (containerEl) {
      let rect = containerEl.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      containerEl.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.lookAt(1.5, 13.1, 0); // look right of origin to center the character in viewport
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter();

      let isCancelled = false;
      let onResize: (() => void) | null = null;
      let cleanupHover: (() => void) | null = null;
      let introTimeout: any = null;

      loadCharacter().then(async (gltf) => {
        if (isCancelled) return;
        if (gltf) {
          const characterObj = gltf.scene;

          // 1. Traverse and set shadows/frustum culling
          characterObj.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              child.castShadow = true;
              child.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });

          // 2. Adjust foot positions
          const footR = characterObj.getObjectByName("footR");
          const footL = characterObj.getObjectByName("footL");
          if (footR) footR.position.y = 3.36;
          if (footL) footL.position.y = 3.36;

          // 3. Compile shaders asynchronously
          await renderer.compileAsync(characterObj, camera, scene);
          if (isCancelled) return;

          // 4. Setup scroll timelines
          setCharTimeline(characterObj, camera);
          setAllTimeline();

          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            cleanupHover = animations.hover(gltf, hoverDivRef.current) || null;
          }
          mixer = animations.mixer;
          scene.add(characterObj);
          headBone = characterObj.getObjectByName("spine006") || null;
          screenLight = characterObj.getObjectByName("screenlight") || null;
          progress.loaded().then(() => {
            if (isCancelled) return;
            introTimeout = setTimeout(() => {
              if (isCancelled) return;
              light.turnOnLights();
              animations.startIntro();
            }, 2500) as any;
          });
          onResize = () => {
            handleResize(renderer, camera, canvasDiv, characterObj);
          };
          window.addEventListener("resize", onResize);
        } else {
          // gltf was null — force loading to complete so the screen doesn't hang
          if (!isCancelled) progress.clear();
        }
      }).catch((err) => {
        console.error("Failed to load character model:", err);
        // Force loading bar to 100% so the app isn't stuck on the loading screen
        if (!isCancelled) progress.clear();
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };

      let activeTouchElement: HTMLElement | null = null;
      let touchDebounce: any = null;

      const onTouchMove = (e: TouchEvent) => {
        handleTouchMove(e, (x, y) => (mouse = { x, y }));
      };

      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        activeTouchElement = element;
        touchDebounce = setTimeout(() => {
          if (activeTouchElement) {
            activeTouchElement.addEventListener("touchmove", onTouchMove);
          }
        }, 200) as any;
      };

      const onTouchEnd = () => {
        if (touchDebounce) clearTimeout(touchDebounce);
        if (activeTouchElement) {
          activeTouchElement.removeEventListener("touchmove", onTouchMove);
          activeTouchElement = null;
        }
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);

      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        isCancelled = true;
        if (touchDebounce) clearTimeout(touchDebounce);
        if (introTimeout) clearTimeout(introTimeout);
        cancelAnimationFrame(animationFrameId);

        scene.clear();
        renderer.dispose();
        cleanupScrollTimelines();

        if (onResize) {
          window.removeEventListener("resize", onResize);
        }
        if (cleanupHover) {
          cleanupHover();
        }
        if (containerEl && renderer.domElement.parentNode === containerEl) {
          containerEl.removeChild(renderer.domElement);
        }

        document.removeEventListener("mousemove", onMouseMove);

        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        if (activeTouchElement) {
          activeTouchElement.removeEventListener("touchmove", onTouchMove);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
