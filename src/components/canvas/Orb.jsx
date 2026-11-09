import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";

// Hero 3D: a distorting blue core inside a cyan wireframe shell, circled by a
// ring of particles. Generated in code, so there is no model to download.

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Ring = ({ count = 1500, radius = 3.1, spread = 0.35 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * spread;
      p[i * 3] = Math.cos(a) * r;
      p[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.4;
      p[i * 3 + 2] = Math.sin(a) * r;
    }
    return p;
  }, [count, radius, spread]);

  useFrame((_, delta) => {
    if (!reducedMotion) ref.current.rotation.y += delta * 0.12;
  });

  return (
    <group rotation={[0.35, 0, -0.25]}>
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial transparent color="#60A5FA" size={0.035} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

const Core = ({ isMobile }) => {
  const shell = useRef();

  useFrame((_, delta) => {
    if (reducedMotion) return;
    shell.current.rotation.y += delta * 0.15;
    shell.current.rotation.x += delta * 0.05;
  });

  return (
    <group scale={isMobile ? 0.75 : 1}>
      <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh scale={1.35}>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color="#1D4ED8"
            emissive="#0B2A7A"
            emissiveIntensity={0.35}
            roughness={0.12}
            metalness={0.9}
            distort={0.32}
            speed={reducedMotion ? 0 : 1.6}
          />
        </mesh>
        <mesh ref={shell} scale={2.1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>
      <Ring />
    </group>
  );
};

const OrbCanvas = () => {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22D3EE" />
      <pointLight position={[-5, -3, 2]} intensity={1} color="#3B82F6" />
      {/* Reflections built from in-scene light panels: no HDR file to download */}
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={4} color="#22D3EE" position={[4, 3, 4]} scale={[4, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={3} color="#3B82F6" position={[-5, 1, 3]} scale={[3, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 5, -4]} scale={2} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.5} color="#1E3A8A" position={[0, -5, 2]} scale={[8, 2, 1]} target={[0, 0, 0]} />
      </Environment>
      <Core isMobile={isMobile} />
    </Canvas>
  );
};

export default OrbCanvas;
