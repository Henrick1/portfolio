import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

// Rendering budget shared by every 3D canvas on the page.
//
// Canvases use frameloop="demand" and <FrameLimiter/> asks for frames, so:
// - nothing renders while the canvas is off screen, the tab is hidden or the
//   caller says it isn't active (e.g. the pet while it is faded out);
// - frames are capped (60 fps, 30 on software rendering) instead of running at
//   the monitor's refresh rate, which is 144-240 Hz on gaming screens;
// - pixel ratio is capped, lower on very large / 4K screens.

const detectSoftwareGL = () => {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const name = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /swiftshader|llvmpipe|software|basic render/i.test(String(name));
  } catch {
    return false;
  }
};

export const LITE = typeof window !== "undefined" && detectSoftwareGL();

const pixels = typeof window !== "undefined" ? window.screen.width * window.screen.height : 0;
const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

// Max device pixel ratio for 3D canvases.
export const MAX_DPR = LITE ? 1 : pixels * dpr * dpr > 2560 * 1440 ? 1 : 1.5;
export const DPR = [1, MAX_DPR];

export const TARGET_FPS = LITE ? 30 : 60;

export const FrameLimiter = ({ active = true, fps = TARGET_FPS }) => {
  const invalidate = useThree((s) => s.invalidate);
  const el = useThree((s) => s.gl.domElement);

  useEffect(() => {
    if (!active) return undefined;
    let raf = 0;
    let last = 0;
    let onScreen = true;
    const interval = 1000 / fps;

    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting));
    io.observe(el);

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (!onScreen || document.hidden) return;
      if (t - last >= interval - 1) {
        last = t;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [active, fps, el, invalidate]);

  return null;
};
