// The hero illustration: a small circuit with the "H" chip in the middle and
// copper traces running out to the tools Henrique works with. Traces draw
// themselves once on load (see .trace / .pad in index.css).

const LEFT = [
  { label: "Python", d: "M200 185 H150 L110 145 V80 H56", pad: [56, 80] },
  { label: "Flask", d: "M200 220 H56", pad: [56, 220] },
  { label: "SQL", d: "M200 255 H150 L110 295 V360 H56", pad: [56, 360] },
];

const RIGHT = [
  { label: "ESP32", d: "M320 185 H370 L410 145 V80 H464", pad: [464, 80] },
  { label: "Java", d: "M320 220 H464", pad: [464, 220] },
  { label: "C", d: "M320 255 H370 L410 295 V360 H464", pad: [464, 360] },
];

const Pad = ({ x, y, delay }) => (
  <g className="pad" style={{ "--delay": `${delay}s` }}>
    <circle cx={x} cy={y} r="9" fill="#E3A857" />
    <circle cx={x} cy={y} r="3.5" fill="#0F1B2D" />
  </g>
);

const Trace = ({ d, delay }) => (
  <path
    d={d}
    pathLength="1"
    className="trace"
    style={{ "--len": 1, "--delay": `${delay}s` }}
    fill="none"
    stroke="#E3A857"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const Schematic = () => {
  const pins = [185, 220, 255];

  return (
    <svg
      viewBox="0 0 520 450"
      className="w-full h-auto max-w-[560px]"
      role="img"
      aria-label="Circuit diagram connecting Henrique to Python, Flask, SQL, ESP32, Java and C"
    >
      {/* traces */}
      {[...LEFT, ...RIGHT].map((t, i) => (
        <Trace key={t.label} d={t.d} delay={0.2 + i * 0.12} />
      ))}
      <Trace d="M260 160 V70" delay={0.15} />
      <Trace d="M260 280 V380" delay={0.15} />

      {/* pads + labels */}
      {LEFT.map((t, i) => (
        <g key={t.label}>
          <Pad x={t.pad[0]} y={t.pad[1]} delay={1.2 + i * 0.12} />
          <text x={t.pad[0] - 9} y={t.pad[1] - 20} className="fill-white-100 text-[16px] font-semibold">
            {t.label}
          </text>
        </g>
      ))}
      {RIGHT.map((t, i) => (
        <g key={t.label}>
          <Pad x={t.pad[0]} y={t.pad[1]} delay={1.5 + i * 0.12} />
          <text
            x={t.pad[0] + 9}
            y={t.pad[1] - 20}
            textAnchor="end"
            className="fill-white-100 text-[16px] font-semibold"
          >
            {t.label}
          </text>
        </g>
      ))}

      {/* status LED */}
      <g className="pad" style={{ "--delay": "1.9s" }}>
        <circle cx="260" cy="56" r="22" fill="#5FD4C4" opacity="0.18" />
        <circle cx="260" cy="56" r="11" fill="#5FD4C4" />
        <text x="284" y="30" className="fill-led text-[14px] font-medium">
          Open to internships
        </text>
      </g>

      {/* ground symbol */}
      <g stroke="#E3A857" strokeWidth="3" strokeLinecap="round" className="pad" style={{ "--delay": "1.3s" }}>
        <line x1="236" y1="384" x2="284" y2="384" />
        <line x1="245" y1="394" x2="275" y2="394" />
        <line x1="254" y1="404" x2="266" y2="404" />
      </g>

      {/* the chip */}
      {pins.map((y) => (
        <g key={y} fill="#93A6BF">
          <rect x="188" y={y - 4} width="14" height="8" rx="1" />
          <rect x="318" y={y - 4} width="14" height="8" rx="1" />
        </g>
      ))}
      <rect x="200" y="160" width="120" height="120" rx="10" fill="#16263C" stroke="#93A6BF" strokeWidth="2" />
      <circle cx="216" cy="176" r="4" fill="#26405F" />
      <text
        x="260"
        y="238"
        textAnchor="middle"
        className="fill-white font-display text-[56px]"
      >
        H
      </text>
    </svg>
  );
};

export default Schematic;
