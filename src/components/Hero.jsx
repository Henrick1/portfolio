import { HeroCanvas } from './canvas';
import TypingLine from './TypingLine';
import NowPlaying from './NowPlaying';

const LINES = [
  'full stack dev',
  'ships code & breaks prod (sometimes)',
  'building 3D stuff for fun',
  'probably playing something rn',
];

// Poster-style hero: the name runs huge across the screen, the 3D laptop (with
// the frog sitting on it) stands in front of the letters, and the intro sits
// underneath.
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

      <div className='relative z-20 mt-auto pb-10 sm:pb-12 px-6 sm:px-16 max-w-[1400px] w-full mx-auto flex flex-col gap-5'>
        <div>
          <TypingLine
            lines={LINES}
            className='font-mono font-medium text-white lg:text-[24px] sm:text-[20px] text-[16px] min-h-[1.6em]'
          />
          <p className='mt-2 max-w-[44ch] text-white-100/80 sm:text-[17px] text-[14px] leading-relaxed'>
            I build web apps end to end with React, Next.js, Node.js and Google Cloud.
          </p>
          <NowPlaying className='mt-4' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
