import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { techGroups } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// Plain image tiles instead of one WebGL canvas per technology: with this many
// skills the 3D balls would exceed the browser's limit of ~16 WebGL contexts.
const TechTile = ({ name, icon }) => (
  <li className='group flex items-center gap-3 rounded-xl border border-white/5 bg-primary/60 px-3 py-2.5 transition-colors hover:border-[#3B82F6]/50'>
    <span className='grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/95 shadow-md shadow-black/30 transition-transform group-hover:-translate-y-0.5'>
      <img src={icon} alt='' loading='lazy' className='h-6 w-6 object-contain' />
    </span>
    <span className='text-white-100 text-[14px] font-medium'>{name}</span>
  </li>
);

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I work with</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className='mt-12 grid gap-6 md:grid-cols-2'>
        {techGroups.map((group, i) => (
          <motion.div
            key={group.title}
            variants={fadeIn("up", "spring", i * 0.15, 0.75)}
            className='bg-tertiary/70 border border-white/5 rounded-2xl p-6'
          >
            <h3 className='text-white font-semibold text-[18px]'>{group.title}</h3>
            <ul className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-3'>
              {group.items.map((tech) => (
                <TechTile key={tech.name} {...tech} />
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
