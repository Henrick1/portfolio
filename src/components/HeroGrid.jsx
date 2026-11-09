// Hero background: a perspective grid floor with a blue glow on the horizon.
// Pure CSS (see .hero-grid / .hero-glow in index.css), no image download.
const HeroGrid = () => (
  <div aria-hidden='true' className='absolute inset-0 pointer-events-none'>
    <div className='hero-glow' />
    <div className='hero-grid-wrap'>
      <div className='hero-grid' />
    </div>
  </div>
);

export default HeroGrid;
