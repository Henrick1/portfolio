import { styles } from "../styles";
import { github, logo } from "../assets";

const Footer = () => (
  <footer className="border-t border-white/10 bg-primary">
    <div className={`${styles.paddingX} max-w-7xl mx-auto py-8 flex flex-col sm:flex-row items-center justify-between gap-4`}>
      <div className="flex items-center gap-3">
        <img src={logo} alt="" className="w-8 h-8 object-contain" />
        <p className="text-secondary text-[14px]">
          © {new Date().getFullYear()} Henrique · Computer Scientist & Software Developer
        </p>
      </div>
      <div className="flex items-center gap-6 text-[14px]">
        <a
          href="https://github.com/Henrick1"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
        >
          <img src={github} alt="" className="w-4 h-4 object-contain" />
          GitHub
        </a>
        <a href="#" className="text-secondary hover:text-white transition-colors">
          Back to top
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
