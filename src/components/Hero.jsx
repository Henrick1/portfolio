import { styles } from "../styles";
import { github } from "../assets";
import Schematic from "./Schematic";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden">
      {/* background: perfboard grid, faded towards the edges */}
      <div aria-hidden="true" className="absolute inset-0 perfboard perfboard-fade" />

      <div
        className={`relative max-w-7xl mx-auto ${styles.paddingX} pt-32 pb-16 min-h-[100svh] grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center`}
      >
        <div>
          <h1 className={styles.heroHeadText}>Henrique</h1>
          <p className={`${styles.heroSubText} mt-6 max-w-[34ch]`}>
            Computer Science student in Brazil. I write software that talks to hardware: Flask sites,
            ESP32 sensors and Java games.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="bg-copper text-primary font-bold px-6 py-3 rounded-lg hover:bg-[#EDB872] transition-colors"
            >
              See projects
            </a>
            <a
              href="#contact"
              className="border border-secondary/60 text-white font-semibold px-6 py-3 rounded-lg hover:border-white transition-colors"
            >
              Get in touch
            </a>
            <a
              href="https://github.com/Henrick1"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-white transition-colors px-2 py-3"
            >
              <img src={github} alt="" width="20" height="20" className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Schematic />
        </div>
      </div>
    </section>
  );
};

export default Hero;
