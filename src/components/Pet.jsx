import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import SceneBoundary from "./canvas/SceneBoundary";

const Toad = lazy(() => import("./canvas/Toad"));

// What the toad says about each part of the page. It comments on whatever
// the visitor has been looking at for a few seconds, and on a project card
// when the mouse rests on it (cards dispatch a "pet:look" event).
const LINES = {
  hero: [
    "I jumped off the laptop to follow you. scroll on.",
    "that laptop never stops typing. I tried unplugging it.",
  ],
  about: [
    "full stack dev, B.Sc. in Computer Science. I just sit here and croak.",
    "he says 'if it works, don't touch it'. I live by that.",
  ],
  skills: [
    "19 tools. I only know one move: jump.",
    "you can spin those balls. go on, nobody's watching.",
  ],
  work: [
    "every project here has a story. the finance one has the best plot twist.",
    "real projects, real code. click one, I'll wait.",
  ],
  contact: [
    "go on, say hi. he answers. I just ribbit.",
    "send a message. no spam, I eat flies, not spam.",
  ],
  "project:Conta-Gotas": ["his own finance app. it counts every drop of money, hence the name."],
  "project:IoT Parking": ["sensors that find free parking spots. I just hop over the cars."],
  "project:Tabfolio": ["a browser extension for tab hoarders. he has 40 tabs open right now."],
  "project:3D Developer Portfolio": ["you're inside this one. I'm the side quest."],
  poke: ["ribbit.", "careful, I bite. no I don't.", "achievement unlocked: poked the toad.", "this site runs on React and stubbornness."],
};

const SECTIONS = ["hero", "about", "skills", "work", "contact"];
const DWELL_S = 4; // seconds on a section before commenting
const COOLDOWN_MS = 14000; // minimum gap between unprompted comments
const SHOW_MS = 5500;
// The toad sits in the bottom-right corner, so by default it faces left, into the page.
const FACING = -0.55;

const Pet = () => {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const hopAt = useRef(-1e9);
  const pointer = useRef({ x: 0, y: 0 });
  const said = useRef({}); // per-key rotation index
  const lastSpoke = useRef(0);
  const hideTimer = useRef(0);
  const box = useRef(null);
  const [out, setOut] = useState(false); // false while the hero (where the toad sits on the laptop) is visible

  const say = useCallback((key) => {
    const lines = LINES[key];
    if (!lines) return;
    const i = said.current[key] ?? 0;
    said.current[key] = i + 1;
    setText(lines[i % lines.length]);
    setVisible(true);
    lastSpoke.current = Date.now();
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), SHOW_MS);
  }, []);

  // which section is the visitor looking at, and for how long
  useEffect(() => {
    const ratios = {};
    const els = SECTIONS.map((id) =>
      id === "hero" ? document.querySelector("section") : document.getElementById(id)?.closest("section")
    );
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (ratios[e.target.dataset.petKey] = e.intersectionRatio)),
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );
    els.forEach((el, i) => {
      if (!el) return;
      el.dataset.petKey = SECTIONS[i];
      io.observe(el);
    });

    let current = null;
    let dwell = 0;
    let hovering = null;
    let hoverDwell = 0;
    const onLook = (e) => {
      hovering = e.detail;
      hoverDwell = 0;
    };
    window.addEventListener("pet:look", onLook);

    const tick = setInterval(() => {
      if (document.hidden) return;
      if (hovering) {
        hoverDwell += 1;
        if (hoverDwell === 2 && !said.current[hovering]) say(hovering);
        return;
      }
      const top = Object.entries(ratios).sort((a, b) => b[1] - a[1])[0];
      const key = top && top[1] > 0 ? top[0] : null;
      if (key !== current) {
        current = key;
        dwell = 0;
        return;
      }
      dwell += 1;
      if (key && key !== "hero" && dwell >= DWELL_S && Date.now() - lastSpoke.current > COOLDOWN_MS) {
        dwell = -DWELL_S * 2; // don't repeat right away on the same section
        say(key);
      }
    }, 1000);

    const first = setTimeout(() => {}, 0);

    return () => {
      io.disconnect();
      clearInterval(tick);
      clearTimeout(first);
      window.removeEventListener("pet:look", onLook);
    };
  }, [say]);

  // the toad lives on the laptop in the hero; it comes down here once you scroll past it
  useEffect(() => {
    const hero = document.querySelector("section");
    if (!hero) return setOut(true);
    const io = new IntersectionObserver(([e]) => setOut(e.intersectionRatio < 0.35), { threshold: [0, 0.35, 1] });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (out && !said.current.hero) {
      const t = setTimeout(() => say("hero"), 700);
      return () => clearTimeout(t);
    }
  }, [out, say]);

  // hop when the page scrolls, look in the scroll direction
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const d = window.scrollY - lastY;
      lastY = window.scrollY;
      if (Math.abs(d) < 4) return;
      if (performance.now() - hopAt.current > 650) hopAt.current = performance.now();
    };
    const onMove = (e) => {
      // relative to the toad itself (bottom-right corner), so it looks at the cursor
      const r = box.current?.getBoundingClientRect();
      const cx = r ? r.left + r.width / 2 : window.innerWidth;
      const cy = r ? r.top + r.height / 2 : window.innerHeight;
      pointer.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.6))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.6))),
      };
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  return (
    <div
      ref={box}
      className={`fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-40 w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] transition-all duration-500 ${
        out ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <div
        role="status"
        aria-live="polite"
        className={`pet-bubble absolute bottom-[88%] right-[40%] w-max max-w-[220px] sm:max-w-[260px] font-mono text-[12px] sm:text-[13px] leading-snug transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {text}
      </div>
      <SceneBoundary>
        <Suspense fallback={null}>
          <Toad hopAt={hopAt} pointer={pointer} facing={FACING} onClick={() => say("poke")} />
        </Suspense>
      </SceneBoundary>
    </div>
  );
};

export default Pet;
