import React, { createRef, useMemo, useRef } from 'react';
import { Tilt } from "react-tilt";
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services, profile } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { ServiceIconsCanvas } from './canvas';
import useOnScreen from '../hooks/useOnScreen';

const ServiceCard = ({ index, title, description, track }) => (
  <Tilt className='w-full h-full' options={{ max: 25, scale: 1, speed: 450 }}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.3, 0.75)}
      className='w-full h-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div className='bg-tertiary rounded-[20px] h-full py-8 px-6 min-h-[240px] flex justify-evenly items-center flex-col gap-4'>
        <div ref={track} className='w-20 h-20' aria-hidden='true' />
        <div className='text-center'>
          <h3 className='text-white text-[19px] font-bold'>{title}</h3>
          <p className='mt-2 text-secondary text-[14px] leading-[20px]'>{description}</p>
        </div>
      </div>
    </motion.div>
  </Tilt>
);

// Profile as a little code-editor window, same spirit as the README's whoami.
const ProfileCard = () => (
  <motion.aside
    variants={fadeIn("left", "spring", 0.2, 0.75)}
    className='bg-[#0B1224] border border-[#3B82F6]/30 rounded-2xl overflow-hidden shadow-card'
    aria-label='Profile summary'
  >
    <div className='flex items-center gap-2 px-4 py-3 bg-[#111A33] border-b border-white/5'>
      <span className='w-3 h-3 rounded-full bg-[#F87171]' />
      <span className='w-3 h-3 rounded-full bg-[#FBBF24]' />
      <span className='w-3 h-3 rounded-full bg-[#34D399]' />
      <span className='ml-3 font-mono text-[13px] text-secondary'>henrick.json</span>
    </div>
    <pre className='p-5 sm:p-6 font-mono text-[13px] sm:text-[14px] leading-[1.9] whitespace-pre-wrap break-words'>
      <span className='text-white'>{"{"}</span>
      {"\n"}
      {profile.map(({ key, value }, i) => (
        <span key={key}>
          {"  "}
          <span className='text-[#93C5FD]'>"{key}"</span>
          <span className='text-white'>: </span>
          <span className='text-[#86EFAC]'>{value}</span>
          <span className='text-white'>{i < profile.length - 1 ? "," : ""}</span>
          {"\n"}
        </span>
      ))}
      <span className='text-white'>{"}"}</span>
    </pre>
  </motion.aside>
);

const About = () => {
  const cardsRef = useRef(null);
  const onScreen = useOnScreen(cardsRef);
  // One tracked slot per card; the shared canvas draws a 3D icon inside each.
  const cards = useMemo(() => services.map((s) => ({ ...s, track: createRef() })), []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.prompt}>&gt; whoami</p>
        <h2 className={styles.sectionHeadText}>about me.</h2>
      </motion.div>

      <div className='mt-8 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start'>
        <motion.div variants={fadeIn("", "", 0.1, 1)} className='text-secondary text-[17px] leading-[30px] flex flex-col gap-5'>
          <p>
            hey! I'm henrick, a full stack dev from Brazil. I build web apps from the pixels to the
            database: React, Next.js and TypeScript on the front, Node.js and Express on the back, all
            shipped to Google Cloud and Firebase inside Docker containers.
          </p>
          <p>
            I have a B.Sc. in Computer Science (yes, I survived discrete math and assembly). I also like
            poking at hardware: I once wired ESP32 sensors to a web app over MQTT just to track free parking
            spots in real time.
          </p>
          <p>
            when I'm not coding I'm probably playing something or solving a puzzle. house rule:
            if it works, don't touch it.
          </p>
        </motion.div>

        <ProfileCard />
      </div>

      <div ref={cardsRef} className='mt-16 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6'>
        {cards.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <ServiceIconsCanvas items={cards} active={onScreen} />
    </>
  )
}

export default SectionWrapper(About, "about")
