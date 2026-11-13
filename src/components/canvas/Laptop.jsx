import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

// Hero 3D: a laptop whose screen types out a short Python "about me".
// Built in code: no model download.

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- screen: syntax-highlighted code drawn on a canvas -------------
const C = {
  kw: "#C084FC", // keywords
  cls: "#22D3EE", // class names
  str: "#86EFAC", // strings
  attr: "#93C5FD", // attributes
  txt: "#E2E8F0",
  dim: "#475569",
};

// Each line is a list of [text, colour] tokens.
const CODE = [
  [["class ", C.kw], ["Henrique", C.cls], [":", C.txt]],
  [["    role ", C.attr], ["= ", C.txt], ['"Software Developer"', C.str]],
  [["    studying ", C.attr], ["= ", C.txt], ['"Computer Science"', C.str]],
  [["    based_in ", C.attr], ["= ", C.txt], ['"Brazil"', C.str]],
  [],
  [["    stack ", C.attr], ["= [", C.txt], ['"Python"', C.str], [", ", C.txt], ['"Java"', C.str], [", ", C.txt], ['"C"', C.str], [",", C.txt]],
  [["             ", C.txt], ['"SQL"', C.str], [", ", C.txt], ['"JavaScript"', C.str], [", ", C.txt], ['"ESP32"', C.str], ["]", C.txt]],
  [],
  [["    def ", C.kw], ["projects", C.cls], ["(self):", C.txt]],
  [["        return ", C.kw], ["[", C.txt], ['"IoT Parking"', C.str], [",", C.txt]],
  [["                ", C.txt], ['"Puzzle Game"', C.str], [",", C.txt]],
  [["                ", C.txt], ['"Computer Store"', C.str], ["]", C.txt]],
];
const TOTAL_CHARS = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

const W = 1024;
const H = 660;

const drawScreen = (ctx, chars, cursorOn) => {
  ctx.fillStyle = "#0B1224";
  ctx.fillRect(0, 0, W, H);

  // editor title bar
  ctx.fillStyle = "#111A33";
  ctx.fillRect(0, 0, W, 54);
  ["#F87171", "#FBBF24", "#34D399"].forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(30 + i * 28, 27, 9, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#0B1224";
  ctx.fillRect(130, 10, 190, 44);
  ctx.fillStyle = "#3B82F6";
  ctx.fillRect(130, 10, 190, 3);
  ctx.font = "500 22px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillStyle = C.txt;
  ctx.fillText("henrique.py", 155, 40);

  // code
  ctx.font = "500 27px ui-monospace, Menlo, Consolas, monospace";
  const lineH = 44;
  const x0 = 78;
  let y = 104;
  let left = chars;
  let cursor = null;

  CODE.forEach((line, i) => {
    ctx.fillStyle = C.dim;
    ctx.fillText(String(i + 1).padStart(2, " "), 18, y);
    let x = x0;
    for (const [text, colour] of line) {
      if (left <= 0) break;
      const shown = text.slice(0, left);
      left -= shown.length;
      ctx.fillStyle = colour;
      ctx.fillText(shown, x, y);
      x += ctx.measureText(shown).width;
    }
    if (left > 0) left -= 1; // newline
    if (cursor === null && left <= 0) cursor = [x, y];
    y += lineH;
  });

  if (cursorOn && cursor) {
    ctx.fillStyle = "#3B82F6";
    ctx.fillRect(cursor[0] + 2, cursor[1] - 26, 13, 32);
  }
};

const useCodeTexture = () => {
  const { canvas, texture } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return { canvas, texture };
  }, []);

  const state = useRef({ chars: reducedMotion ? TOTAL_CHARS : 0, acc: 0, hold: 0, last: "" });

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((clock, delta) => {
    const s = state.current;
    s.acc += delta;
    if (!reducedMotion) {
      if (s.chars < TOTAL_CHARS) {
        // type ~45 chars per second
        while (s.acc > 0.022 && s.chars < TOTAL_CHARS) {
          s.chars += 1;
          s.acc -= 0.022;
        }
      } else {
        s.hold += delta;
        if (s.hold > 6) {
          s.chars = 0;
          s.hold = 0;
        }
        s.acc = 0;
      }
    }
    const cursorOn = Math.floor(clock.clock.elapsedTime * 2) % 2 === 0;
    const key = `${s.chars}-${cursorOn}`;
    if (key !== s.last) {
      drawScreen(canvas.getContext("2d"), s.chars, cursorOn);
      texture.needsUpdate = true;
      s.last = key;
    }
  });

  return texture;
};

// ---------- keyboard: a backlit key grid drawn once -----------------------
const useKeyboardTexture = () =>
  useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0A0F1E";
    ctx.fillRect(0, 0, 1024, 400);
    const rows = [14, 14, 13, 12];
    rows.forEach((n, r) => {
      const keyW = 1000 / 14.6;
      const offset = (1024 - n * keyW) / 2;
      for (let k = 0; k < n; k++) {
        ctx.fillStyle = "#1E293B";
        ctx.fillRect(offset + k * keyW + 4, 14 + r * 78, keyW - 8, 66);
        ctx.fillStyle = "rgba(59,130,246,0.55)";
        ctx.fillRect(offset + k * keyW + 4, 14 + r * 78 + 62, keyW - 8, 4);
      }
    });
    // space bar row
    ctx.fillStyle = "#1E293B";
    ctx.fillRect(300, 14 + 4 * 78, 424, 66);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

// ---------- laptop ---------------------------------------------------------
const Laptop = () => {
  const screen = useCodeTexture();
  const keyboard = useKeyboardTexture();
  const shell = { color: "#1E293B", metalness: 0.85, roughness: 0.28 };

  return (
    <group rotation={[0.18, -0.28, 0]} position={[0, -0.75, 0]} scale={0.88}>
      {/* base */}
      <RoundedBox args={[3.4, 0.12, 2.3]} radius={0.05} smoothness={4}>
        <meshStandardMaterial {...shell} />
      </RoundedBox>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.062, -0.35]}>
        <planeGeometry args={[3.0, 1.17]} />
        <meshBasicMaterial map={keyboard} toneMapped={false} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.062, 0.7]}>
        <planeGeometry args={[1.1, 0.6]} />
        <meshStandardMaterial color="#0F172A" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* lid, hinged at the back edge */}
      <group position={[0, 0.06, -1.13]} rotation-x={-0.22}>
        <RoundedBox args={[3.4, 2.2, 0.08]} radius={0.04} smoothness={4} position={[0, 1.1, 0]}>
          <meshStandardMaterial {...shell} />
        </RoundedBox>
        <mesh position={[0, 1.12, 0.042]}>
          <planeGeometry args={[3.2, 2.06]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
        {/* soft blue light spilling from the screen */}
        <pointLight position={[0, 1.1, 1.2]} intensity={1.2} distance={4} color="#3B82F6" />
      </group>
    </group>
  );
};

const Scene = ({ isMobile }) => (
  <group scale={isMobile ? 1.15 : 1.25} position={[isMobile ? 0 : -0.1, isMobile ? 0.1 : 0.2, 0]}>
    <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <Laptop />
    </Float>
  </group>
);

const LaptopCanvas = () => {
  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.4, 8], fov: 42 }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1} />
      <pointLight position={[-5, 2, 3]} intensity={1} color="#22D3EE" />
      {/* Reflections from in-scene light panels: no HDR file to download */}
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} color="#3B82F6" position={[-4, 2, 4]} scale={[4, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.5} color="#22D3EE" position={[4, 3, 3]} scale={[3, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[0, 6, -2]} scale={[6, 1, 1]} target={[0, 0, 0]} />
      </Environment>
      <Scene isMobile={isMobile} />
    </Canvas>
  );
};

export default LaptopCanvas;
