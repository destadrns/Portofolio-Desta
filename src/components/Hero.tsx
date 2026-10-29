import { profile } from '../data/profile';
import { ui } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import { CvDownload } from './CvDownload';
import { HeroStack } from './HeroStack';
import { PinIcon } from './Icons';

// Load sequence (CSS, under 1.2 s): greeting, role, intro, status and location, buttons,
// then the stack arrives from depth.
export function Hero() {
  const { t } = useLang();
  const { hero } = profile;

  return (
    <section id="top" className="hero">
      <div className="hero__inner wrap">
        <div className="hero__text">
          <h1 className="hero__title">{t(hero.greeting)}</h1>
          <p className="hero__role">{hero.role}</p>
          <p className="hero__intro">{t(hero.intro)}</p>
          <ul className="hero__meta">
            <li>
              <span className="hero__status-dot" aria-hidden="true" />
              {t(hero.openTo)}
            </li>
            <li>
              <PinIcon />
              {profile.location}
            </li>
          </ul>
          <div className="hero__actions">
            <a className="button button--primary" href="#projects">
              {t(ui.viewProjects)}
            </a>
            <CvDownload className="button button--ghost" place="hero" />
          </div>
        </div>
        <HeroStack />
      </div>
    </section>
  );
}
