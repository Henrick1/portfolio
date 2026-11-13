import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { techGroups } from "../constants";
import { SkillBallsCanvas } from "./canvas";
import { fadeIn, textVariant } from "../utils/motion";

// True while the element is on (or near) the screen.
const useOnScreen = (ref) => {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) return setOn(true);
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "200px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return on;
};

const Tech = () => {
  const section = useRef(null);
  const onScreen = useOnScreen(section);

  // One tracked slot per skill; the shared canvas draws a 3D ball inside each.
  const items = useMemo(
    () => techGroups.flatMap((g) => g.items).map((t) => ({ ...t, track: createRef() })),
    []
  );
  const slotFor = (name) => items.find((i) => i.name === name).track;

  return (
    <div ref={section}>
      <motion.div variants={textVariant()}>
        <p className={styles.prompt}>&gt; stack</p>
        <h2 className={styles.sectionHeadText}>my toolbox.</h2>
      </motion.div>

      <div className='mt-12 grid gap-6 md:grid-cols-2'>
        {techGroups.map((group, i) => (
          <motion.div
            key={group.title}
            variants={fadeIn("up", "spring", i * 0.15, 0.75)}
            className='bg-tertiary/70 border border-white/5 rounded-2xl p-4 sm:p-6'
          >
            <h3 className='font-mono text-white font-medium text-[16px]'><span className='text-[#3B82F6]'>./</span>{group.title}</h3>
            <ul className='mt-4 grid grid-cols-3 xs:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-3'>
              {group.items.map((tech) => (
                <li key={tech.name} className='flex flex-col items-center text-center'>
                  <div ref={slotFor(tech.name)} className='w-20 h-20' aria-hidden='true' />
                  <span className='mt-1 text-secondary text-[13px] font-medium leading-tight'>{tech.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <SkillBallsCanvas items={items} active={onScreen} />
    </div>
  );
};

export default SectionWrapper(Tech, "skills");
