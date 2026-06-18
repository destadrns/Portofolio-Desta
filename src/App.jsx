import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Journey from './components/sections/Journey';
import Education from './components/sections/Education';
import Activities from './components/sections/Activities';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <>
      <a href="#beranda" className="sr-only">
        Langsung ke konten utama
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Education />
        <Activities />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
