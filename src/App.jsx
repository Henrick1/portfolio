import { HeroGrid, Footer, About, Contact, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <div className='relative z-0 bg-primary'>
      <div className='relative overflow-hidden'>
        <HeroGrid />
        <Navbar />
        <Hero />
      </div>
      <About />
      <Tech />
      <Works />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
      <Footer />
    </div>
  );
}

export default App;
