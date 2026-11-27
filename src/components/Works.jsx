import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// Each project is a wide row: screenshot on one side, details on the other,
// alternating sides on large screens. Projects without public code (no
// source_code_link) simply have no code button.
const ProjectRow = ({ index, name, description, tags, image, source_code_link }) => {
  const reversed = index % 2 === 1;
  const Frame = source_code_link ? "a" : "div";
  const frameProps = source_code_link
    ? { href: source_code_link, target: "_blank", rel: "noreferrer", "aria-label": `Open ${name} on GitHub` }
    : {};

  return (
    <motion.article
      onMouseEnter={() => window.dispatchEvent(new CustomEvent("pet:look", { detail: `project:${name}` }))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent("pet:look", { detail: null }))}
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className='panel'
    >
      <div
        className={`p-5 sm:p-8 flex flex-col gap-8 items-center ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <Frame
          {...frameProps}
          className='group relative w-full lg:w-[55%] shrink-0 overflow-hidden rounded-[4px] border border-white/10'
        >
          <img
            src={image}
            alt={`Screenshot of ${name}`}
            loading='lazy'
            className='w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.03]'
          />
        </Frame>

        <div className='flex-1 w-full'>
          <h3 className='font-display text-white text-[40px] sm:text-[52px] leading-[0.95]'>{name}</h3>
          <p className='mt-4 text-secondary text-[16px] leading-[27px]'>{description}</p>

          <ul className='mt-6 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <li
                key={tag.name}
                className='font-mono text-[12px] text-[#F1E4D6] border border-white/15 rounded-[3px] px-2.5 py-1'
              >
                {tag.name}
              </li>
            ))}
          </ul>

          {source_code_link && (
            <a
              href={source_code_link}
              target='_blank'
              rel='noreferrer'
              className='mt-8 inline-flex items-center gap-2 bg-[#F4F4F5] hover:bg-[#D4D4D8] text-[#0B0E14] font-bold py-2.5 px-5 rounded-md transition-colors'
            >
              <img src={github} alt='' className='w-5 h-5 object-contain invert' />
              view the code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.prompt}>&gt; ls ./projects</p>
        <h2 className={styles.sectionHeadText}>stuff I've built.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        from my own finance app and browser extension to the stuff I built in college. most of the code is open, go ahead and peek.
      </motion.p>

      <div className='mt-14 flex flex-col gap-10'>
        {projects.map((project, index) => (
          <ProjectRow key={project.name} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");
