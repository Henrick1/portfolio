import { useEffect, useRef } from "react";

// Hero background: a perspective grid floor with a blue glow on the horizon.
// Drawn on a 2D canvas at the screen's real resolution: each line is projected
// and stroked once, so it stays crisp (a huge CSS-3D-transformed gradient gets
// rasterized at reduced scale and its thin lines alias into doubled pairs).

const LINE = "rgba(59, 130, 246, 0.65)";
const DEPTH_STEP = 0.25; // distance between horizontal lines, in "z" units
const FAR = 40; // stop drawing once lines are this far away
const SPEED = 0.08; // z units per second moving towards the viewer

const draw = (ctx, w, h, dpr, t) => {
  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 1.5 * dpr;
  ctx.strokeStyle = LINE;
  ctx.shadowColor = "rgba(59, 130, 246, 0.9)";
  ctx.shadowBlur = 6 * dpr;

  const cx = w / 2;
  const gap = Math.max(h * 0.2, 48 * dpr); // spacing of vertical lines at the bottom edge

  // Horizontal lines: y = h / z, sliding towards the viewer over time.
  const phase = (t * SPEED) % DEPTH_STEP;
  ctx.beginPath();
  for (let z = 1 + DEPTH_STEP - phase; z < FAR; z += DEPTH_STEP) {
    const y = Math.round(h / z) + 0.5;
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  // Vertical lines: straight rays from the vanishing point on the horizon.
  const n = Math.ceil((cx / gap) * 8);
  for (let i = -n; i <= n; i++) {
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx + i * gap, h);
  }
  ctx.stroke();

  // Fade towards the horizon and into the page below.
  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = "destination-in";
  const fade = ctx.createLinearGradient(0, 0, 0, h);
  fade.addColorStop(0, "rgba(0,0,0,0)");
  fade.addColorStop(0.3, "rgba(0,0,0,1)");
  fade.addColorStop(0.75, "rgba(0,0,0,1)");
  fade.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";
};

const GridCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let size = { w: 0, h: 0, dpr: 1 };
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      size = { w: canvas.width, h: canvas.height, dpr };
      draw(ctx, size.w, size.h, dpr, 0);
    };

    const frame = (now) => {
      draw(ctx, size.w, size.h, size.dpr, (now - start) / 1000);
      raf = requestAnimationFrame(frame);
    };
    const play = () => {
      if (!reduced && visible && !document.hidden && !raf) raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? play() : pause();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);
    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className='absolute left-0 right-0 bottom-0 top-[52%] w-full h-[48%]' />;
};

const HeroGrid = () => (
  <div aria-hidden='true' className='absolute inset-0 pointer-events-none'>
    <div className='hero-glow' />
    <GridCanvas />
  </div>
);

export default HeroGrid;
