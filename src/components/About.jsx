import React from 'react';
import { Tilt } from "react-tilt";
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services, profile } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, description, icon }) => (
  <Tilt className='w-full h-full' options={{ max: 25, scale: 1, speed: 450 }}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.3, 0.75)}
      className='w-full h-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div className='bg-tertiary rounded-[20px] h-full py-8 px-6 min-h-[240px] flex justify-evenly items-center flex-col gap-4'>
        <img src={icon} alt='' className='w-14 h-14 object-contain' />
        <div className='text-center'>
          <h3 className='text-white text-[19px] font-bold'>{title}</h3>
          <p className='mt-2 text-secondary text-[14px] leading-[20px]'>{description}</p>
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const ProfileCard = () => (
  <motion.aside
    variants={fadeIn("left", "spring", 0.2, 0.75)}
    className='bg-tertiary/80 border border-[#3B82F6]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-card'
    aria-label='Profile summary'
  >
    <div className='flex items-center gap-3'>
      <span className='relative flex h-3 w-3'>
        <span className='absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-60 motion-safe:animate-ping' />
        <span className='relative inline-flex h-3 w-3 rounded-full bg-[#22D3EE]' />
      </span>
      <p className='text-white font-semibold text-[17px]'>Henrique</p>
    </div>
    <dl className='mt-6 flex flex-col gap-4'>
      {profile.map(({ label, value }) => (
        <div key={label} className='border-b border-white/5 pb-4 last:border-0 last:pb-0'>
          <dt className='text-secondary text-[13px]'>{label}</dt>
          <dd className='text-white text-[16px] font-medium mt-0.5'>{value}</dd>
        </div>
      ))}
    </dl>
  </motion.aside>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <div className='mt-8 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start'>
        <motion.div variants={fadeIn("", "", 0.1, 1)} className='text-secondary text-[17px] leading-[30px] flex flex-col gap-5'>
          <p>
            I'm a Computer Scientist from Brazil who likes building complete projects, from the hardware
            to the web page. I've connected ESP32 sensors to a Flask website over MQTT, written a detective
            game in Java with Swing and built an online store with PHP and SQL.
          </p>
          <p>
            I work mainly with Python, Java, C, JavaScript and SQL, and I used Three.js for the 3D in this
            portfolio. My degree covered front-end and back-end development, assembly, discrete mathematics
            and cyber security, and I also have computer technician skills.
          </p>
          <p>
            I speak English fluently and I'm looking for opportunities as a software developer.
          </p>
        </motion.div>

        <ProfileCard />
      </div>

      <div className='mt-16 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")
