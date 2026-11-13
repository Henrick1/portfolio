import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { techGroups } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I work with</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className='mt-12 grid gap-6 lg:grid-cols-[5fr_3fr_2.2fr]'>
        {techGroups.map((group, i) => (
          <motion.div
            key={group.title}
            variants={fadeIn("up", "spring", i * 0.2, 0.75)}
            className='bg-tertiary/70 border border-white/5 rounded-2xl p-6'
          >
            <h3 className='text-white font-semibold text-[18px]'>{group.title}</h3>
            <ul className='mt-4 flex flex-wrap gap-x-3 gap-y-2'>
              {group.items.map((tech) => (
                <li key={tech.name} className='w-20 flex flex-col items-center'>
                  <div className='w-20 h-20'>
                    <BallCanvas icon={tech.icon} />
                  </div>
                  <span className='text-secondary text-[13px] font-medium whitespace-nowrap'>{tech.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
