import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, View } from "@react-three/drei";

// 3D versions of the four "about" card icons, all in ONE shared canvas (each
// <View> draws inside a tracked slot). meshNormalMaterial + flat shading gives
// the same iridescent cyan/purple facets as the original flat images.

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Iridescent = () => <meshNormalMaterial flatShading />;

// Front-end: faceted icosahedron
const Gem = () => (
  <mesh scale={1.55}>
    <icosahedronGeometry args={[1, 0]} />
    <Iridescent />
  </mesh>
);

// Back-end: faceted geodesic sphere
const Geo = () => (
  <mesh scale={1.5}>
    <icosahedronGeometry args={[1, 2]} />
    <Iridescent />
  </mesh>
);

// Cloud & DevOps: interlocked cubes
const Cubes = () => (
  <group scale={1.45}>
    {[
      [0.45, 0.45, 0],
      [-0.45, 0, 0.45],
      [0, -0.45, -0.45],
    ].map((p, i) => (
      <mesh key={i} position={p}>
        <boxGeometry args={[1, 1, 1]} />
        <Iridescent />
      </mesh>
    ))}
  </group>
);

// IoT & Hardware: cluster of hexagonal prisms
const Hexes = () => (
  <group scale={1.25} rotation={[Math.PI / 2, 0, 0]}>
    {[
      [0, 0, 0],
      [0.9, 0, 0.52],
      [-0.9, 0, 0.52],
      [0, 0, -1.04],
    ].map((p, i) => (
      <mesh key={i} position={p} rotation={[0, Math.PI / 6, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.7, 6]} />
        <Iridescent />
      </mesh>
    ))}
  </group>
);

const SHAPES = { gem: Gem, geo: Geo, cubes: Cubes, hexes: Hexes };

const Spinner = ({ shape }) => {
  const ref = useRef();
  const Shape = SHAPES[shape];
  useFrame((_, delta) => {
    if (reducedMotion) return;
    ref.current.rotation.y += delta * 0.6;
    ref.current.rotation.x += delta * 0.2;
  });
  return (
    <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={ref} rotation={[0.4, 0.6, 0]}>
        <Shape />
      </group>
    </Float>
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
