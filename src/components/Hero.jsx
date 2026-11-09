import { motion } from 'framer-motion';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Henrique</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Computer Science student <br className='sm:block hidden' />
            and Software Developer.
          </p>
          <div className='sm:mt-8 mt-5 flex flex-wrap sm:gap-4 gap-3 pointer-events-auto'>
            <a
              href='#work'
              className='bg-[#915EFF] hover:bg-[#7f45ff] text-white font-semibold sm:py-3 sm:px-6 py-2.5 px-4 sm:text-[16px] text-[14px] rounded-xl shadow-lg shadow-[#915EFF]/30 transition-colors'
            >
              View my projects
            </a>
            <a
              href='#contact'
              className='border border-white/30 hover:border-white text-white font-semibold sm:py-3 sm:px-6 py-2.5 px-4 sm:text-[16px] text-[14px] rounded-xl backdrop-blur-sm transition-colors'
            >
              Contact me
            </a>
          </div>
        </div>
      </div>
      <ComputersCanvas/>
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href='#about' aria-label='Scroll to About section'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className='w-3 h-3 rounded-full bg-secondary mb-1'
              />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero