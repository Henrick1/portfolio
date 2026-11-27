import { HeroGrid, Footer, Pet, Tape, About, Contact, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <div className='relative z-0 bg-primary'>
      <div className='relative overflow-hidden'>
        <HeroGrid />
        <Navbar />
        <Hero />
      </div>
      <Tape />
      <div className='storm-page'>
        <About />
        <Tech />
        <Works />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
      <Footer />
      <Pet />
    </div>
  );
}

export default App;
