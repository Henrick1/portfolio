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

// Big flat faces reflect a single (mostly dark) direction as chrome, so the
// cube shapes use a satin version: lit colour plus an iridescent clearcoat.
const Satin = ({ color, ...props }) => (
  <meshPhysicalMaterial
    color={color}
    emissive={color}
    emissiveIntensity={0.1}
    metalness={0.35}
    roughness={0.32}
    iridescence={0.45}
    iridescenceIOR={1.5}
    iridescenceThicknessRange={[200, 700]}
    clearcoat={1}
    clearcoatRoughness={0.15}
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

// Cloud & DevOps: an endless torus knot (the build -> deploy loop)
const Knot = () => (
  <mesh scale={1.1}>
    <torusKnotGeometry args={[0.8, 0.26, 200, 32, 2, 3]} />
    <Holo color="#A5F3FC" />
  </mesh>
);

// IoT & Hardware: a 3x3x3 block of cubes without its 8 corners, seen in
// isometric view (gives the original's stepped hexagon outline), purple on
// one side and blue on the other.
const Voxels = () => {
  const cells = useMemo(() => {
    const out = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) if (Math.abs(x) + Math.abs(y) + Math.abs(z) <= 2) out.push([x, y, z]);
    return out;
  }, []);
  return (
    <group scale={0.74}>
      {cells.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.96, 0.96, 0.96]} />
          <Satin color={p[0] + p[2] < 0 ? "#A855F7" : p[0] + p[2] > 0 ? "#3B82F6" : "#818CF8"} />
        </mesh>
      ))}
    </group>
  );
};

const SHAPES = { gem: Gem, geo: Petals, cubes: Knot, hexes: Voxels };

// Isometric pose for the voxel block: it sways instead of tumbling so the
// hexagon silhouette stays readable.
const ISO_X = Math.atan(1 / Math.SQRT2);

const Lights = () => (
  <>
    <ambientLight intensity={0.45} />
    <directionalLight position={[3, 4, 5]} intensity={1.6} />
    <directionalLight position={[-4, -2, 3]} intensity={0.7} color="#E879F9" />
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
  const sway = shape === "hexes";
  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;
    if (sway) {
      ref.current.rotation.y = Math.PI / 4 + Math.sin(clock.elapsedTime * 0.7) * 0.45;
      return;
    }
    ref.current.rotation.y += delta * 0.5;
    ref.current.rotation.x += delta * 0.15;
  });
  return (
    <>
      <Lights />
      <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        {sway ? (
          <group rotation={[ISO_X, 0, 0]}>
            <group ref={ref} rotation={[0, Math.PI / 4, 0]}>
              <Shape />
            </group>
          </group>
        ) : (
          <group ref={ref} rotation={[0.5, 0.7, 0]}>
            <Shape />
          </group>
        )}
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
