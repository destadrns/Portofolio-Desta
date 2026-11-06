import { useEffect, useRef, type CSSProperties } from 'react';
import { certifications } from '../data/profile';
import { ui } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import { ExternalLink } from './ExternalLink';
import { SectionHead } from './SectionHead';

// Where the deal starts (sections.css): each card's offset from its own top centre to the grid's
// top centre, written as --dx and --dy. Measured only when the layout changes, never per frame.
function usePileOffsets() {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const items = [...grid.children] as HTMLElement[];
    const measure = () => {
      const centre = grid.clientWidth / 2;
      for (const item of items) {
        item.style.setProperty('--dx', `${(centre - item.offsetLeft - item.offsetWidth / 2).toFixed(1)}px`);
        item.style.setProperty('--dy', `${(-item.offsetTop).toFixed(1)}px`);
      }
    };
    const observer = new ResizeObserver(measure);
    [grid, ...items].forEach((el) => observer.observe(el));
    // Focus deals the pile at once (sections.css); the focused link may now sit lower, so bring it in.
    const onFocus = (e: FocusEvent) => {
      if (e.target instanceof Element) e.target.scrollIntoView({ block: 'nearest' });
    };
    grid.addEventListener('focusin', onFocus);
    return () => {
      observer.disconnect();
      grid.removeEventListener('focusin', onFocus);
    };
  }, []);
  return ref;
}

// Six certificates as quiet cards. Names stay in English; issuer and date sit on one meta line;
// each has a Verify link that opens in a new tab. With motion the cards are dealt out of one pile
// as the grid scrolls in (--deal from motion.ts, --i per card).
export function Certifications() {
  const { t } = useLang();
  const ref = usePileOffsets();

  return (
    <section id="certifications" className="section" aria-labelledby="certifications-title">
      <div className="wrap">
        <SectionHead id="certifications" />
        <ul ref={ref} className="certs" role="list">
          {certifications.map((cert, i) => (
            <li key={cert.name} className="card cert" style={{ '--i': i } as CSSProperties}>
              <h3 className="cert__name" lang="en">
                {cert.name}
              </h3>
              <p className="cert__meta">
                <span>{cert.issuer}</span>
                <span className="mono">{t(cert.date)}</span>
              </p>
              {cert.description && <p className="cert__text">{t(cert.description)}</p>}
              {cert.verifyUrl && (
                <ExternalLink className="link cert__verify" href={cert.verifyUrl} label={`${t(ui.verify)}: ${cert.name}`}>
                  {t(ui.verify)}
                </ExternalLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
