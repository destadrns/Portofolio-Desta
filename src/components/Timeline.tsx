import { useLang } from '../i18n/LanguageContext';
import type { TimelineItem } from '../types';
import { SectionHead } from './SectionHead';

type Props = { id: string; items: TimelineItem[] };

// Shared by Experience and Education. A rail on the left fills as the reader scrolls (motion.ts
// writes --line-fill); each entry's dot lights when the fill reaches it. Without motion the rail is
// full and every dot is lit.
export function Timeline({ id, items }: Props) {
  const { t } = useLang();

  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <SectionHead id={id} />
        <ol className="timeline" role="list">
          {items.map((item) => (
            <li key={item.title.en + item.period.en} className="timeline__row">
              <span className="timeline__dot" aria-hidden="true" />
              <p className="timeline__period">{t(item.period)}</p>
              <div className="timeline__body">
                <h3 className="timeline__title">{t(item.title)}</h3>
                <p className="timeline__role">{t(item.role)}</p>
                <p className="timeline__text">{t(item.text)}</p>
                {item.details && (
                  <ul className="timeline__details">
                    {item.details.map((detail) => (
                      <li key={detail.en}>{t(detail)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
