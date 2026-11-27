import { HeroCanvas } from './canvas';
import TypingLine from './TypingLine';

const LINES = [
  'full stack dev',
  'ships code & breaks prod (sometimes)',
  'building 3D stuff for fun',
  'probably playing something rn',
];

// Poster-style hero: the name runs huge across the screen, the 3D laptop (with
// the toad sitting on it) stands in front of the letters, and the intro plus
// the two actions sit clearly underneath.
const Hero = () => {
  return (
    <section className='relative z-10 w-full min-h-[100svh] overflow-hidden flex flex-col'>
      <div className='relative z-20 pt-24 sm:pt-28 px-6 sm:px-16 max-w-[1400px] w-full mx-auto flex justify-between font-mono text-[12px] sm:text-[14px] text-white-100/80'>
        <span>full stack developer</span>
        <span className='text-right'><span className='hidden sm:inline'>B.Sc. Computer Science &middot; </span>Brazil</span>
      </div>

      {/* the name, behind the 3D scene */}
      <h1
        aria-label="henrick"
        className='hero-name relative z-0 select-none text-center font-display leading-[0.8] mt-4 sm:mt-6'
      >
        henrick
      </h1>

      {/* 3D laptop + toad in front of the letters */}
      <div className='absolute inset-x-0 top-[22%] sm:top-[14%] bottom-[24%] sm:bottom-[10%] z-10'>
        <HeroCanvas />
      </div>

      <div className='relative z-20 mt-auto pb-10 sm:pb-12 px-6 sm:px-16 max-w-[1400px] w-full mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6'>
        <div>
          <TypingLine
            lines={LINES}
            className='font-mono font-medium text-white lg:text-[24px] sm:text-[20px] text-[16px] min-h-[1.6em]'
          />
          <p className='mt-2 max-w-[44ch] text-white-100/80 sm:text-[17px] text-[14px] leading-relaxed'>
            I build web apps end to end with React, Next.js, Node.js and Google Cloud.
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <a
            href='#work'
            className='bg-[#FF6B1A] hover:bg-[#FF8A3D] text-[#140a04] font-bold py-3 px-6 sm:text-[16px] text-[14px] rounded-md transition-colors'
          >
            see what I built
          </a>
          <a
            href='#contact'
            className='border-2 border-white/80 hover:bg-white hover:text-[#0b0e14] text-white font-bold py-3 px-6 sm:text-[16px] text-[14px] rounded-md transition-colors'
          >
            say hi
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
