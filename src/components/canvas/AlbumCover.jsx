import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Hero "album cover": a cold night field, a server rack on fire in the back
// ("breaks prod sometimes") and the toad standing in front like a frontman.
const MODEL = `${import.meta.env.BASE_URL}toad/toad.glb`;
const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const glowTexture = (() => {
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(0.4, "rgba(255,255,255,0.5)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();

// Flames and smoke as additive / normal sprites rising from a point.
const Fire = ({ position, count = 160 }) => {
  const group = useRef();
  const parts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        smoke: i % 4 === 0,
        life: Math.random(),
        speed: 0.5 + Math.random() * 0.6,
        x: (Math.random() - 0.5) * 0.9,
        z: (Math.random() - 0.5) * 0.6,
        size: 0.18 + Math.random() * 0.32,
      })),
    [count]
  );
  useFrame((_, dt) => {
    const step = reducedMotion ? 0 : dt;
    group.current.children.forEach((s, i) => {
      const p = parts[i];
      p.life += step * p.speed * (p.smoke ? 0.35 : 1);
      if (p.life > 1) p.life -= 1;
      const l = p.life;
      const h = p.smoke ? 0.9 + l * 4 : l * 1.6;
      s.position.set(p.x * (1 - l * 0.5) + Math.sin(l * 6 + i) * 0.15 + (p.smoke ? l * 1.2 : 0), h, p.z);
      const sc = p.smoke ? p.size * (3 + l * 6) : p.size * (1 - l * 0.75);
      s.scale.set(sc, sc * (p.smoke ? 1 : 1.5), 1);
      s.material.opacity = p.smoke ? 0.5 * Math.sin(Math.PI * l) : Math.sin(Math.PI * Math.min(1, l * 1.4)) * 0.55;
      if (!p.smoke) s.material.color.setHSL(0.02 + (1 - l) * 0.08, 1, 0.38 + (1 - l) * 0.17);
    });
  });
  return (
    <group ref={group} position={position}>
      {parts.map((p, i) => (
        <sprite key={i}>
          <spriteMaterial
            map={glowTexture}
            transparent
            depthWrite={false}
            blending={p.smoke ? THREE.NormalBlending : THREE.AdditiveBlending}
            color={p.smoke ? "#0b0d12" : "#ff8a2a"}
          />
        </sprite>
      ))}
    </group>
  );
};

const FlickerLight = (props) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.elapsedTime;
    ref.current.intensity = props.intensity * (0.8 + Math.sin(t * 13) * 0.08 + Math.sin(t * 7.3) * 0.1 + Math.random() * 0.06);
  });
  return <pointLight ref={ref} {...props} />;
};

const Rack = (props) => (
  <group {...props}>
    <mesh position={[0, 1.2, 0]}>
      <boxGeometry args={[1.3, 2.4, 1]} />
      <meshStandardMaterial color="#14161b" roughness={0.6} metalness={0.6} />
    </mesh>
    {Array.from({ length: 7 }, (_, i) => (
      <group key={i} position={[0, 0.3 + i * 0.3, 0.51]}>
        <mesh>
          <boxGeometry args={[1.15, 0.22, 0.02]} />
          <meshStandardMaterial color="#1d2027" roughness={0.5} metalness={0.7} />
        </mesh>
        <mesh position={[-0.45, 0, 0.02]}>
          <boxGeometry args={[0.05, 0.05, 0.01]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#ff3b2f" : "#5cff9b"} toneMapped={false} />
        </mesh>
      </group>
    ))}
  </group>
);

const Frontman = () => {
  const { scene } = useGLTF(MODEL);
  const ref = useRef();
  const model = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((o) => {
      if (!o.isMesh) return;
      o.geometry = o.geometry.clone();
      o.geometry.computeVertexNormals();
      o.material = new THREE.MeshStandardMaterial({ color: "#4f5d3a", roughness: 0.55 });
    });
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const c = box.getCenter(new THREE.Vector3());
    root.position.set(-c.x, -box.min.y, -c.z);
    const g = new THREE.Group();
    g.add(root);
    g.scale.setScalar(1.15 / size.y);
    return g;
  }, [scene]);
  useFrame(({ clock, pointer }) => {
    if (reducedMotion) return;
    ref.current.rotation.y += (pointer.x * 0.35 - ref.current.rotation.y) * 0.05;
    ref.current.scale.y = 1 + Math.sin(clock.elapsedTime * 2) * 0.012;
  });
  return (
    <group ref={ref} position={[0.7, 0, 1.4]}>
      <primitive object={model} />
    </group>
  );
};

const Rig = () => {
  useFrame(({ camera, pointer }) => {
    if (reducedMotion) return;
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (1.3 + pointer.y * 0.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0.9, 0);
  });
  return null;
};

const AlbumCover = () => (
  <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.3, 9], fov: 30 }} gl={{ alpha: true }}>
    <fog attach="fog" args={["#1c2433", 9, 30]} />
    <hemisphereLight args={["#6d7f9f", "#0a0c10", 0.6]} />
    <directionalLight position={[3, 6, 4]} intensity={0.9} color="#a9b8d4" />
    <FlickerLight position={[-3.6, 1.8, -3.4]} intensity={22} distance={9} decay={2} color="#ff6a14" />
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#0c0f14" roughness={0.85} metalness={0.15} />
    </mesh>
    <Rack position={[-3.6, 0, -4.2]} rotation-y={0.5} scale={0.75} />
    <Fire position={[-3.6, 1.75, -4.2]} />
    {/* distant hills on the horizon */}
    {[[-14, -22, 9, 2.2], [-3, -26, 12, 1.6], [10, -24, 11, 2.6], [22, -28, 10, 1.8]].map(([x, z, w, h], i) => (
      <mesh key={i} position={[x, 0, z]} scale={[w, h, 4]}>
        <sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#0d1118" roughness={1} />
      </mesh>
    ))}
    <Frontman />
    <Rig />
  </Canvas>
);

useGLTF.preload(MODEL);

export default AlbumCover;
