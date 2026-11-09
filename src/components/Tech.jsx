import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

// Previously 10 separate WebGL canvases (one per icon), which is heavy and
// exceeds the browser's context limit on some phones. Plain images instead.
const Tech = () => {
  return (
    <>
      <h2 className={styles.sectionHeadText}>Tools</h2>
      <ul className="mt-10 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-3">
        {technologies.map((technology) => (
          <li
            key={technology.name}
            className="flex items-center gap-3 border border-line rounded-lg px-4 py-3 bg-primary/60"
          >
            {/* light tile so dark logos (SQL, Three.js) stay visible */}
            <span className="w-9 h-9 shrink-0 rounded-md bg-white-100 grid place-items-center">
              <img
                src={technology.icon}
                alt=""
                width="24"
                height="24"
                loading="lazy"
                className="w-6 h-6 object-contain"
              />
            </span>
            <span className="text-white-100 font-medium">{technology.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SectionWrapper(Tech, "tools");
