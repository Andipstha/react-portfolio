import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
// Dynamically import @react-three/rapier inside the component to code-split physics

const textureLoader = new THREE.TextureLoader();
const baseUrl = import.meta.env.BASE_URL;
const imageUrls = [
  "images/react2.webp",
  "images/next2.webp",
  "images/node2.webp",
  "images/express.webp",
  "images/mongo.webp",
  "images/mysql.webp",
  "images/typescript.webp",
  "images/javascript.webp",
  "images/photoshop.webp",
  "images/illustrator.webp",
  "images/blender.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(`${baseUrl}${url}`));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const MATERIAL_COUNT = imageUrls.length;
const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
  r: THREE.MathUtils.randFloatSpread,
  // Pre-assign a stable material index so it doesn't change on every render
  materialIndex: Math.floor(Math.random() * MATERIAL_COUNT),
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  apiRef?: { current: any } | null;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  material,
  isActive,
  apiRef,
}: SphereProps) {
  const localApi = useRef<any | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const targetApi = apiRef?.current ?? localApi.current;
    const translation = (typeof targetApi?.translation === "function"
      ? targetApi.translation()
      : new THREE.Vector3()) as THREE.Vector3;
    const impulse = vec.copy(translation).normalize().multiply(
      new THREE.Vector3(
        -50 * delta * scale,
        -150 * delta * scale,
        -50 * delta * scale
      )
    );

    targetApi?.applyImpulse?.(impulse, true);
  });

  // Return only the visual mesh here; physics wrappers are applied by the parent
  return (
    <mesh
      castShadow
      receiveShadow
      scale={scale}
      geometry={sphereGeometry}
      material={material}
      rotation={[0.3, 1, 1]}
    />
  );
}

// Kinematic pointer body tracking the mouse cursor for interactive playability
type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
  RapierModule: any;
};

function Pointer({ vec = new THREE.Vector3(), isActive, RapierModule }: PointerProps) {
  const ref = useRef<any>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RapierModule.RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <RapierModule.BallCollider args={[2]} />
    </RapierModule.RigidBody>
  );
}

const TechStackScene = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [RapierModule, setRapierModule] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    import("@react-three/rapier").then((m) => {
      if (mounted) setRapierModule(m);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Performance optimization: IntersectionObserver disables WebGL rendering loops when TechStack is off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const workEl = document.getElementById("work");
      const threshold = workEl ? workEl.offsetTop : 0;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsActive(scrollY > threshold);
    };

    const navLinks = document.querySelectorAll(".header a");
    const navClickHandlers = new Map<Element, () => void>();
    navLinks.forEach((elem) => {
      const clickHandler = () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      };
      navClickHandlers.set(elem, clickHandler);
      elem.addEventListener("click", clickHandler);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      navClickHandlers.forEach((handler, elem) => {
        elem.removeEventListener("click", handler);
      });
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);
  const sphereRefs = useRef<any[]>([]);

  return (
    <div className="techstack" ref={containerRef}>
      <h2> My Techstack</h2>

      <Canvas
        shadows="percentage"
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        dpr={[1, 2]}
        frameloop={isInViewport ? "always" : "never"}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        {RapierModule ? (
          <RapierModule.Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} RapierModule={RapierModule} />
            {spheres.map((props, i) => {
              if (!sphereRefs.current[i]) sphereRefs.current[i] = { current: null };
              const pos = [props.r!(20), props.r!(20) - 25, props.r!(20) - 10];
              return (
                <RapierModule.RigidBody
                  key={i}
                  colliders={false}
                  linearDamping={0.75}
                  angularDamping={0.15}
                  friction={0.2}
                  position={pos}
                  ref={sphereRefs.current[i]}
                >
                  <RapierModule.BallCollider args={[props.scale]} />
                  <RapierModule.CylinderCollider
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[0, 0, 1.2 * props.scale]}
                    args={[0.15 * props.scale, 0.275 * props.scale]}
                  />
                  <SphereGeo
                    {...props}
                    material={materials[props.materialIndex]}
                    isActive={isActive}
                    apiRef={sphereRefs.current[i]}
                  />
                </RapierModule.RigidBody>
              );
            })}
          </RapierModule.Physics>
        ) : null}
        <Environment
          files={`${baseUrl}models/char_enviorment.hdr`}
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStackScene;
