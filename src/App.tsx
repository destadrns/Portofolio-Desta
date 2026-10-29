import { useEffect, useRef } from 'react';
import { About } from './components/About';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SMOOTH_SCROLL, useMedia, useReducedMotion, useScrollMotion } from './components/motion';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { education, experience } from './data/profile';
import { useLang } from './i18n/LanguageContext';

// A short opacity-only fade on <main> when the language changes; layout does not move.
function useLanguageFade() {
  const { lang } = useLang();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const main = document.getElementById('main');
    if (!main) return;
    main.classList.remove('lang-fade');
    void main.offsetWidth; // restart the animation on quick repeated switches
    main.classList.add('lang-fade');
  }, [lang]);
}

export function App() {
  const reduced = useReducedMotion();
  const smooth = useMedia(SMOOTH_SCROLL);
  useScrollMotion(!reduced, smooth && !reduced);
  useLanguageFade();

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Timeline id="experience" items={experience} />
        <Timeline id="education" items={education} />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
