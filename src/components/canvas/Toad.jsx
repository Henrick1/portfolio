import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// The virtual pet. The model has no rig or animation, so all motion is
// procedural: breathing, a squash-and-hop when the page scrolls, and turning
// towards the mouse.
const MODEL = `${import.meta.env.BASE_URL}toad/toad.glb`;

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HOP_MS = 520;

const ToadModel = ({ hopAt, pointer, facing }) => {
  const { scene } = useGLTF(MODEL);
  const body = useRef();

  // Center, normalize size and give it a material (the textures are not in
  // this copy of the model yet).
  const model = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((o) => {
      if (!o.isMesh) return;
      o.geometry = o.geometry.clone();
      o.geometry.computeVertexNormals();
      o.material = new THREE.MeshStandardMaterial({ color: "#6B7F45", roughness: 0.5, metalness: 0.05 });
    });
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    root.position.sub(box.getCenter(new THREE.Vector3()));
    const group = new THREE.Group();
    group.add(root);
    group.scale.setScalar(2.1 / Math.max(size.x, size.y, size.z));
    return group;
  }, [scene]);

  useFrame(({ clock }) => {
    const g = body.current;
    if (!g) return;
    const t = clock.elapsedTime;

    // turn towards the mouse; positive y turns the head to the screen right
    const targetY = Math.max(-1.2, Math.min(0.5, facing + pointer.current.x * 0.8));
    g.rotation.y += (targetY - g.rotation.y) * 0.08;
    g.rotation.x += (pointer.current.y * 0.18 - g.rotation.x) * 0.08;

    if (reducedMotion) return;

    const p = (performance.now() - hopAt.current) / HOP_MS;
    if (p >= 0 && p < 1) {
      // crouch, jump, land
      const air = Math.sin(Math.PI * Math.min(1, Math.max(0, (p - 0.15) / 0.85)));
      g.position.y = air * 0.45;
      const squash = p < 0.15 ? 1 - p * 1.2 : 1 + air * 0.08;
      g.scale.set(2 - squash, squash, 2 - squash);
    } else {
      g.position.y = 0;
      const breathe = 1 + Math.sin(t * 2.2) * 0.025;
      g.scale.set(1, breathe, 1);
    }
  });

  return (
    <group ref={body}>
      <primitive object={model} />
    </group>
  );
};

const Toad = ({ hopAt, pointer, facing = 0, onClick }) => (
  <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 0.6, 4.2], fov: 38 }}
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <ambientLight intensity={0.5} color="#9FB0D0" />
    {/* cold storm key light + warm fire rim from behind */}
    <directionalLight position={[2, 3, 4]} intensity={1.4} color="#C9D6F0" />
    <pointLight position={[-2.5, 1, -2]} intensity={8} distance={8} color="#FF7A1A" />
    <ToadModel hopAt={hopAt} pointer={pointer} facing={facing} />
  </Canvas>
);

useGLTF.preload(MODEL);

export default Toad;
