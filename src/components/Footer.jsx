import { styles } from "../styles";
import { github, logo } from "../assets";

// White wave footer. It overlaps the bottom of the contact section (negative
// top margin, transparent background) so there is no gap between the two.
const Footer = () => (
  <footer className="relative z-10 -mt-[70px] sm:-mt-[100px] bg-transparent">
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="block w-full h-[70px] sm:h-[100px]"
    >
      <defs>
        <linearGradient id="footer-wave" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D9DCE3" />
        </linearGradient>
      </defs>
      <path
        fill="url(#footer-wave)"
        d="M0,64 C180,10 360,10 540,48 C720,86 900,110 1080,84 C1260,58 1350,30 1440,40 L1440,120 L0,120 Z"
      />
    </svg>

    <div className="bg-gradient-to-r from-[#FFFFFF] to-[#D9DCE3] -mt-px">
      <div
        className={`${styles.paddingX} max-w-7xl mx-auto pb-8 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#0E131B]">
            <img src={logo} alt="" className="w-8 h-8 object-contain" />
          </span>
          <div>
            <p className="font-mono text-[#0B0E14] text-[14px]">made with react &amp; three.js by henrick</p>
            <p className="font-mono text-[#0B0E14]/60 text-[12px]">probably playing something rn</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[14px] font-mono">
          <a
            href="https://github.com/Henrick1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[#0B0E14]/75 hover:text-[#0B0E14] transition-colors"
          >
            <img src={github} alt="" className="w-4 h-4 object-contain invert" />
            github
          </a>
          <a href="#" className="text-[#0B0E14]/75 hover:text-[#0B0E14] transition-colors">
            back to top
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
