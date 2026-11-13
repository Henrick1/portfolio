import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, View } from "@react-three/drei";

// 3D versions of the four "about" card icons, all in ONE shared canvas (each
// <View> draws inside a tracked slot). Holographic chrome: a metallic physical
// material with thin-film iridescence, reflecting coloured light panels.

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Holo = ({ color = "#ffffff", ...props }) => (
  <meshPhysicalMaterial
    color={color}
    metalness={1}
    roughness={0.22}
    iridescence={1}
    iridescenceIOR={1.6}
    iridescenceThicknessRange={[200, 900]}
    clearcoat={1}
    clearcoatRoughness={0.1}
    {...props}
  />
);

// Front-end: faceted icosahedron
const Gem = () => (
  <mesh scale={1.7}>
    <icosahedronGeometry args={[1, 0]} />
    <Holo flatShading />
  </mesh>
);

// Back-end: a ball covered in overlapping petals (discs facing outwards)
const Petals = () => {
  const discs = useMemo(() => {
    const pos = new THREE.IcosahedronGeometry(1, 1).getAttribute("position");
    const seen = new Set();
    const out = [];
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i).normalize();
      const key = v.toArray().map((n) => n.toFixed(3)).join();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ p: v.clone().multiplyScalar(0.9), q: new THREE.Quaternion().setFromUnitVectors(up, v) });
    }
    return out;
  }, []);

  return (
    <group scale={1.5}>
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <Holo color="#3B4BB0" />
      </mesh>
      {discs.map(({ p, q }, i) => (
        <mesh key={i} position={p} quaternion={q}>
          <cylinderGeometry args={[0.5, 0.5, 0.05, 28]} />
          <Holo />
        </mesh>
      ))}
    </group>
  );
};

// Cloud & DevOps: three long bars crossing, with a glassy cube in the middle
const Jack = () => (
  <group scale={1.25} rotation={[0.3, 0.6, 0.2]}>
    {[
      [2.4, 0.6, 0.6],
      [0.6, 2.4, 0.6],
      [0.6, 0.6, 2.4],
    ].map((size, i) => (
      <mesh key={i}>
        <boxGeometry args={size} />
        <Holo color="#5EEAD4" />
      </mesh>
    ))}
    <mesh>
      <boxGeometry args={[1.05, 1.05, 1.05]} />
      <Holo color="#A5F3FC" transparent opacity={0.35} roughness={0.05} />
    </mesh>
  </group>
);

// IoT & Hardware: a chunky 3D cross made of cubes (stepped silhouette)
const Voxels = () => {
  const cells = useMemo(() => {
    const out = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) if (Math.abs(x) + Math.abs(y) + Math.abs(z) <= 1) out.push([x, y, z]);
    return out;
  }, []);
  return (
    <group scale={0.78}>
      {cells.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[1, 1, 1]} />
          <Holo color={p[1] > 0 || p[0] < 0 ? "#E9D5FF" : "#7DD3FC"} />
        </mesh>
      ))}
    </group>
  );
};

const SHAPES = { gem: Gem, geo: Petals, cubes: Jack, hexes: Voxels };

const Lights = () => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[3, 4, 5]} intensity={1.2} />
    {/* Coloured panels give the holographic reflections; rendered once per view. */}
    <Environment resolution={64} frames={1}>
      <color attach="background" args={["#1E2A6E"]} />
      <Lightformer form="rect" intensity={6} color="#22D3EE" position={[4, 2, 3]} scale={[5, 4, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={6} color="#E879F9" position={[-4, 1, 3]} scale={[5, 4, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={5} color="#60A5FA" position={[0, -4, 2]} scale={[8, 3, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={4} color="#BEF264" position={[0, 5, -2]} scale={[6, 3, 1]} target={[0, 0, 0]} />
      <Lightformer form="ring" intensity={2} color="#ffffff" position={[2, 3, 5]} scale={1.5} target={[0, 0, 0]} />
    </Environment>
  </>
);

const Spinner = ({ shape }) => {
  const ref = useRef();
  const Shape = SHAPES[shape];
  useFrame((_, delta) => {
    if (reducedMotion) return;
    ref.current.rotation.y += delta * 0.5;
    ref.current.rotation.x += delta * 0.15;
  });
  return (
    <>
      <Lights />
      <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <group ref={ref} rotation={[0.5, 0.7, 0]}>
          <Shape />
        </group>
      </Float>
    </>
  );
};

const ServiceIcons = ({ items }) => (
  <Canvas
    dpr={[1, 2]}
    camera={{ position: [0, 0, 5], fov: 45 }}
    style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }}
  >
    {items.map(({ shape, track }, i) => (
      <View key={i} track={track}>
        <Spinner shape={shape} />
      </View>
    ))}
  </Canvas>
);

export default ServiceIcons;
