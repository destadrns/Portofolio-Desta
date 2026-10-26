import { profile } from '../data/profile';
import { useLang } from '../i18n/LanguageContext';
import { PinIcon } from './Icons';
import { useReveal } from './motion';
import { SectionHead } from './SectionHead';

export function About() {
  const { t } = useLang();
  const { about } = profile;
  const cardRef = useReveal<HTMLElement>();

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead id="about" />
        <div className="about">
          <div className="about__text">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.en}>{t(paragraph)}</p>
            ))}
          </div>
          {/* Slides in from the right once, with everything inside it. */}
          <aside ref={cardRef} className="card profile-card" aria-label={profile.name} data-reveal="right">
            <div className="profile-card__id">
              <img
                className="profile-card__photo"
                src={profile.photo}
                alt={profile.name}
                width={480}
                height={640}
                loading="lazy"
              />
              <div>
                <p className="profile-card__name">{profile.name}</p>
                <p className="profile-card__role">{about.cardRole}</p>
                <p className="profile-card__location">
                  <PinIcon />
                  {profile.location}
                </p>
              </div>
            </div>
            <dl className="facts">
              {about.facts.map((fact) => (
                <div key={fact.label.en} className="facts__item">
                  <dt className="facts__label">{t(fact.label)}</dt>
                  <dd className="facts__value">
                    {t(fact.value)}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="chips">
              {about.focus.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
