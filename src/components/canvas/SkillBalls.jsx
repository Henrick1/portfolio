import { Canvas } from "@react-three/fiber";
import { Decal, Float, View, useTexture } from "@react-three/drei";

// All skill balls share ONE WebGL canvas: each <View> draws its ball inside the
// rectangle of a tracked <div> in the page. One context instead of one per skill
// (browsers drop contexts beyond ~16, which 19 separate canvases would exceed).

const Ball = ({ icon }) => {
  const [decal] = useTexture([icon]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1} map={decal} flatShading />
      </mesh>
    </Float>
  );
};

const SkillBalls = ({ items }) => (
  <Canvas
    dpr={[1, 1.5]}
    style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }}
  >
    {items.map(({ icon, track }, i) => (
      <View key={i} track={track}>
        <Ball icon={icon} />
      </View>
    ))}
  </Canvas>
);

export default SkillBalls;
