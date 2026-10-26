import { skills } from '../data/profile';
import { useLang } from '../i18n/LanguageContext';
import { useReveal } from './motion';
import { SectionHead } from './SectionHead';

export function Skills() {
  const { t } = useLang();
  const ref = useReveal<HTMLUListElement>();

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead id="skills" />
        <ul ref={ref} className="skill-cards" role="list">
          {skills.map((group) => (
            <li key={group.name.en} className="card skill-card" data-reveal="rise">
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
