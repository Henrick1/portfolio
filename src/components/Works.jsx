import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// Each project is a wide row: screenshot on one side, details on the other,
// alternating sides on large screens.
const ProjectRow = ({ index, name, description, tags, image, source_code_link }) => {
  const reversed = index % 2 === 1;

  return (
    <motion.article
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className='green-pink-gradient p-[1px] rounded-3xl shadow-card'
    >
      <div
        className={`bg-tertiary rounded-3xl p-5 sm:p-8 flex flex-col gap-8 items-center ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <a
          href={source_code_link}
          target='_blank'
          rel='noreferrer'
          className='group relative w-full lg:w-[55%] shrink-0 overflow-hidden rounded-2xl border border-white/5'
          aria-label={`Open ${name} on GitHub`}
        >
          <img
            src={image}
            alt={`Screenshot of ${name}`}
            loading='lazy'
            className='w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.03]'
          />
        </a>

        <div className='flex-1 w-full'>
          <h3 className='text-white font-bold text-[24px] sm:text-[28px] leading-tight'>{name}</h3>
          <p className='mt-4 text-secondary text-[16px] leading-[27px]'>{description}</p>

          <ul className='mt-6 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <li
                key={tag.name}
                className='text-[13px] font-medium text-[#BFDBFE] bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-full px-3 py-1'
              >
                {tag.name}
              </li>
            ))}
          </ul>

          <a
            href={source_code_link}
            target='_blank'
            rel='noreferrer'
            className='mt-8 inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2.5 px-5 rounded-xl transition-colors'
          >
            <img src={github} alt='' className='w-5 h-5 object-contain' />
            View source code
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My projects</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        Web applications from front-end to back-end, plus a few projects in IoT and object-oriented
        programming. Each one links to its source code on GitHub.
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
