import { certifications } from '../data/profile';
import { ui } from '../data/ui';
import { CloudCourses } from './CloudCourses';
import { useLang } from '../i18n/LanguageContext';
import { ExternalLink } from './ExternalLink';
import { useReveal } from './motion';
import { SectionHead } from './SectionHead';

// Six certificates as quiet cards, revealed like the Skill cards. Names stay in English; issuer and
// date sit on one meta line; each has a Verify link that opens in a new tab. The Google Cloud
// courses follow as a compact list (CloudCourses).
export function Certifications() {
  const { t } = useLang();
  const ref = useReveal<HTMLUListElement>();

  return (
    <section id="certifications" className="section" aria-labelledby="certifications-title">
      <div className="wrap">
        <SectionHead id="certifications" />
        <ul ref={ref} className="certs" role="list">
          {certifications.map((cert) => (
            <li key={cert.name} className="card cert" data-reveal="rise">
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
        <CloudCourses />
      </div>
    </section>
  );
}
