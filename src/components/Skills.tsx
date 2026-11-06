import type { CSSProperties } from 'react';
import { skills } from '../data/profile';
import { useLang } from '../i18n/LanguageContext';
import { SectionHead } from './SectionHead';

export function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead id="skills" />
        {/* Each card flips in as it enters, --i steps after the one before (sections.css). */}
        <ul className="skill-cards" role="list">
          {skills.map((group, i) => (
            <li key={group.name.en} className="card skill-card" style={{ '--i': i } as CSSProperties}>
              <h3 className="skill-card__name">{t(group.name)}</h3>
              <p className="skill-card__text">{t(group.description)}</p>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
