import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import SceneBoundary from "./canvas/SceneBoundary";

const Toad = lazy(() => import("./canvas/Toad"));

// What the frog says. A line is either a string or a "bit": a list of steps
// the bubble plays in order. A step is text, plus optionally `scramble` (that
// many ms of random characters standing in for a value being "looked up") and
// `wait` (ms to hold it). Nothing is ever really looked up: it is all a joke.
const rnd = (n) => Math.floor(Math.random() * n);
const fakeIp = () => `${rnd(200) + 10}.${rnd(256)}.${rnd(256)}.${rnd(254) + 1}`;

const LINES = {
  hero: [
    "I jumped off the laptop to follow you. scroll on.",
    [
      { text: "scanning visitor...", wait: 900 },
      { text: "locating your IP: ", scramble: 1800, value: "---.---.---.---" },
      { text: "just kidding. I'm a frog. I can't even use a mouse." },
    ],
  ],
  about: [
    "full stack dev, B.Sc. in Computer Science. I just sit here and croak.",
    "he says 'if it works, don't touch it'. I live by that. I haven't moved in 3 days.",
    [
      { text: "reading your mind...", wait: 1200 },
      { text: "you're thinking 'why is there a frog'. correct." },
    ],
  ],
  skills: [
    "26 tools. I only know one move: jump.",
    "you can spin those balls. go on, nobody's watching.",
    [
      { text: "calculating your skill level: ", scramble: 1600, digits: 2, suffix: "%" },
      { text: "ok that number was random. you seem great though." },
    ],
  ],
  work: [
    "every project here has a story. the finance one has the best plot twist.",
    "real projects, real code. click one, I'll wait.",
  ],
  contact: [
    "go on, say hi. he answers. I just ribbit.",
    "send a message. no spam, I eat flies, not spam.",
    [
      { text: "estimating your reply time: ", scramble: 1400, digits: 2, suffix: " min" },
      { text: "too slow. I already wrote the email myself. it just says ribbit." },
    ],
  ],
  idle: [
    [
      { text: "checking if you're still there", wait: 500 },
      { text: "checking if you're still there.", wait: 500 },
      { text: "checking if you're still there..", wait: 500 },
      { text: "checking if you're still there...", wait: 700 },
      { text: "oh hi. I was totally not asleep." },
    ],
    [
      { text: "downloading more RAM: ", scramble: 1600, digits: 3, suffix: "%" },
      { text: "done. you now have 0.5 frogs of memory." },
    ],
  ],
  "project:Conta-Gotas": [
    "his own finance app. it counts every drop of money, hence the name.",
    [
      { text: "checking your bank balance: R$ ", scramble: 1600, digits: 5 },
      { text: "relax. I don't have Open Finance access. yet." },
    ],
  ],
  "project:IoT Parking": ["sensors that find free parking spots. I just hop over the cars."],
  "project:Tabfolio": [
    [
      { text: "counting your open tabs: ", scramble: 1500, digits: 2 },
      { text: "that many? you need Tabfolio. he built it for people like you." },
    ],
  ],
  "project:3D Developer Portfolio": ["you're inside this one. I'm the side quest."],
  poke: [
    "ribbit.",
    "careful, I bite. no I don't.",
    "achievement unlocked: poked the frog.",
    "this site runs on React and stubbornness.",
    [
      { text: "hacking the mainframe", wait: 700 },
      { text: "hacking the mainframe: ", scramble: 1500, value: "0x--------" },
      { text: "access denied. I pressed the wrong key. I don't have fingers." },
    ],
  ],
};

const SECTIONS = ["hero", "about", "skills", "work", "contact"];
const DWELL_S = 4; // seconds on a section before commenting
const COOLDOWN_MS = 14000; // minimum gap between unprompted comments
const SHOW_MS = 5500;
const IDLE_MS = 45000; // say something random after this long without talking
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

  const runId = useRef(0);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Play one line: a plain string, or a bit made of steps.
  const play = useCallback(async (line) => {
    const id = ++runId.current;
    const alive = () => runId.current === id;
    clearTimeout(hideTimer.current);
    setVisible(true);
    lastSpoke.current = Date.now();
    const steps = typeof line === "string" ? [{ text: line }] : line;
    for (const step of steps) {
      if (!alive()) return;
      if (step.scramble) {
        const end = performance.now() + step.scramble;
        const final = step.value
          ? fakeIp()
          : String(rnd(10 ** (step.digits || 2))).padStart(step.digits || 2, "0");
        while (performance.now() < end) {
          if (!alive()) return;
          const noise = step.value
            ? fakeIp()
            : String(rnd(10 ** (step.digits || 2))).padStart(step.digits || 2, "0");
          setText(`${step.text}${noise}${step.suffix || ""}`);
          await sleep(70);
        }
        // IPs never resolve to a real value: they end as dashes
        setText(`${step.text}${step.value ? step.value : final}${step.suffix || ""}`);
        await sleep(step.wait ?? 900);
      } else {
        setText(step.text);
        if (step.wait) await sleep(step.wait);
      }
      lastSpoke.current = Date.now();
    }
    if (!alive()) return;
    hideTimer.current = setTimeout(() => setVisible(false), SHOW_MS);
  }, []);

  const say = useCallback(
    (key) => {
      const lines = LINES[key];
      if (!lines) return;
      const i = said.current[key] ?? 0;
      said.current[key] = i + 1;
      play(lines[i % lines.length]);
    },
    [play]
  );

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
      if (Date.now() - lastSpoke.current > IDLE_MS && key !== "hero") {
        say("idle");
        return;
      }
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
