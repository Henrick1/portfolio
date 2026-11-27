import { useEffect, useRef } from "react";

// Hero background: a stormy night sky with smoke, a fire glow in the corner,
// embers drifting up (2D canvas, additive blending) and the odd lightning
// flash. Sky, smoke, glow and flash are CSS (see .storm-* in index.css).

const COUNT = 140;

const spawn = (w, h, dpr, initial) => {
  // most embers start near the fire on the left
  const fromFire = Math.random() < 0.7;
  return {
    x: fromFire ? Math.random() * w * 0.45 : Math.random() * w,
    y: initial ? Math.random() * h : h + Math.random() * 40 * dpr,
    r: (0.6 + Math.random() * 1.8) * dpr,
    vy: (18 + Math.random() * 45) * dpr, // px per second, upwards
    vx: (Math.random() * 14 - 4) * dpr,
    phase: Math.random() * Math.PI * 2,
    life: 0,
    max: 5 + Math.random() * 7,
    hue: 22 + Math.random() * 22,
  };
};

const Embers = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts = [];
    let last = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = canvas.width = Math.round(r.width * dpr);
      h = canvas.height = Math.round(r.height * dpr);
      parts = Array.from({ length: COUNT }, () => spawn(w, h, dpr, true));
      draw(0);
    };

    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.life += dt;
        p.y -= p.vy * dt;
        p.x += (p.vx + Math.sin(p.life * 1.7 + p.phase) * 12 * dpr) * dt;
        if (p.y < -10 || p.life > p.max) {
          parts[i] = spawn(w, h, dpr, false);
          continue;
        }
        const fade = Math.min(1, p.life / 0.6) * Math.max(0, 1 - p.life / p.max);
        const flicker = 0.65 + 0.35 * Math.sin(p.life * 9 + p.phase);
        const a = fade * flicker;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `hsla(${p.hue}, 0%, 70%, ${a})`);
        g.addColorStop(0.35, `hsla(${p.hue}, 0%, 55%, ${a * 0.5})`);
        g.addColorStop(1, `hsla(${p.hue}, 0%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(frame);
    };
    const play = () => {
      if (!reduced && visible && !document.hidden && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
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
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);
    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className='absolute inset-0 w-full h-full' />;
};

const HeroGrid = () => (
  <div aria-hidden='true' className='absolute inset-0 pointer-events-none'>
    <div className='storm-sky' />
    <div className='storm-smoke' />
    <div className='storm-fire' />
    <div className='storm-flash' />
    <Embers />
    <div className='storm-ground' />
  </div>
);

export default HeroGrid;
