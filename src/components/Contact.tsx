import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { ui } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import { CvDownload } from './CvDownload';
import { ExternalLink } from './ExternalLink';
import { CheckIcon, CopyIcon, GithubIcon, InstagramIcon, LinkedInIcon, MailIcon } from './Icons';
import { useReveal } from './motion';
import { SectionHead } from './SectionHead';

// Clipboard API first; in-app browsers that block it fall back to a selected textarea + copy command.
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const focused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    try {
      document.body.appendChild(area);
      area.focus();
      area.select();
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      area.remove();
      focused?.focus({ preventScroll: true });
    }
  }
}

export function Contact() {
  const { t } = useLang();
  const panelRef = useReveal<HTMLDivElement>();
  const [copied, setCopied] = useState<boolean | null>(null);
  const { contact } = profile;

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const social = [
    { href: contact.github, label: 'GitHub', Icon: GithubIcon },
    { href: contact.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    { href: contact.instagram, label: 'Instagram', Icon: InstagramIcon },
  ];

  return (
    <section id="contact" className="section section--dark" aria-labelledby="contact-title">
      <div className="wrap">
        <div ref={panelRef} className="contact-panel">
          <div className="contact-panel__intro">
            <SectionHead id="contact" />
            <p className="contact-panel__note" data-reveal="rise">{t(contact.note)}</p>
          </div>
          <div className="contact-panel__actions" data-reveal="rise">
            <p className="contact-panel__email">
              <MailIcon />
              <span className="contact-panel__address">{contact.email}</span>
            </p>
            <div className="contact-panel__buttons">
              <a className="button button--primary" href={`mailto:${contact.email}`}>
                <MailIcon />
                {t(ui.sendEmail)}
              </a>
              <button
                type="button"
                className="button button--ghost copy-button"
                data-copied={copied ? '' : undefined}
                onClick={() => copyText(contact.email).then(setCopied)}
              >
                <span className="copy-button__icon" key={copied ? 'check' : 'copy'}>
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </span>
                {t(copied ? ui.copied : ui.copyEmail)}
              </button>
            </div>
            <p className="contact-panel__status" role="status">
              {copied === false ? t(ui.copyFailed) : copied ? t(ui.copiedStatus) : ''}
            </p>
            <ul className="social" aria-label={t(ui.socialLabel)}>
              {social.map(({ href, label, Icon }) => (
                <li key={label}>
                  <ExternalLink className="social__link" href={href}>
                    <Icon />
                    {label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
            <CvDownload className="contact-panel__cv link" place="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
