import { styles } from "../styles";
import { github, logo } from "../assets";

// Wave on top echoes the capsule-render footer of the GitHub README.
const Footer = () => (
  <footer className="relative bg-primary">
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="block w-full h-[70px] sm:h-[100px]"
    >
      <defs>
        <linearGradient id="footer-wave" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#1E90FF" />
          <stop offset="100%" stopColor="#0d1117" />
        </linearGradient>
      </defs>
      <path
        fill="url(#footer-wave)"
        d="M0,64 C180,10 360,10 540,48 C720,86 900,110 1080,84 C1260,58 1350,30 1440,40 L1440,120 L0,120 Z"
      />
    </svg>

    <div className="bg-gradient-to-r from-[#1E90FF] to-[#0d1117]">
      <div
        className={`${styles.paddingX} max-w-7xl mx-auto pb-8 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary/80">
            <img src={logo} alt="" className="w-8 h-8 object-contain" />
          </span>
          <div>
            <p className="font-mono text-white text-[14px]">made with coffee &amp; three.js by henrick</p>
            <p className="font-mono text-white/70 text-[12px]">probably playing something rn</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[14px] font-mono">
          <a
            href="https://github.com/Henrick1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <img src={github} alt="" className="w-4 h-4 object-contain" />
            github
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            back to top
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
