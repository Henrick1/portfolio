import React from 'react';
import { Tilt } from "react-tilt";
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, description, icon }) => (
  <Tilt className='xs:w-[250px] w-full' options={{ max: 45, scale: 1, speed: 450 }}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-6 px-8 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt=''
          className='w-16 h-16 object-contain'
        />

        <div className='text-center'>
          <h3 className='text-white text-[20px] font-bold'>
            {title}
          </h3>
          <p className='mt-2 text-secondary text-[14px] leading-[20px]'>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a Computer Science student from Brazil who likes building complete projects, from the hardware
        to the web page. I've connected ESP32 sensors to a Flask website over MQTT, written a detective game
        in Java with Swing and built an online store with PHP and SQL. I work mainly with Python, Java, C,
        JavaScript and SQL, and I used Three.js for the 3D in this portfolio. At university I study front-end
        and back-end development, assembly, discrete mathematics and cyber security. I also work as a computer
        technician, I speak English fluently, and I'm looking for my first internship or junior developer role.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-12'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")