import { useRef } from "react";
import { DPR, FrameLimiter } from "./perf";
import { Canvas, useFrame } from "@react-three/fiber";
import { useToadModel } from "./toadModel";

// The virtual pet. The model has no rig or animation, so all motion is
// procedural: breathing, a squash-and-hop when the page scrolls, and turning
// towards the mouse.

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HOP_MS = 520;

const ToadModel = ({ hopAt, pointer, facing }) => {
  const body = useRef();

  const model = useToadModel(1.45);

  useFrame(({ clock }) => {
    const g = body.current;
    if (!g) return;
    const t = clock.elapsedTime;

    // turn towards the mouse; positive y turns the head to the screen right
    const targetY = Math.max(-1.2, Math.min(0.5, facing + pointer.current.x * 0.5));
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
    <group position-y={-0.8}>
      <group ref={body}>
        <primitive object={model} />
      </group>
    </group>
  );
};

const Toad = ({ hopAt, pointer, facing = 0, onClick, active = true }) => (
  <Canvas
    frameloop="demand"
    dpr={DPR}
    camera={{ position: [0, 0.6, 4.2], fov: 38 }}
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <ambientLight intensity={0.5} color="#9FB0D0" />
    {/* cold storm key light + warm fire rim from behind */}
    <directionalLight position={[2, 3, 4]} intensity={1.4} color="#C9D6F0" />
    <pointLight position={[-2.5, 1, -2]} intensity={8} distance={8} color="#E8ECF4" />
    <ToadModel hopAt={hopAt} pointer={pointer} facing={facing} />
    <FrameLimiter active={active} />
  </Canvas>
);


export default Toad;
