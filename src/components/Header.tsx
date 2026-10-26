import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { sections, ui } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import type { Lang } from '../types';
import { ExternalLink } from './ExternalLink';
import { CloseIcon, MenuIcon } from './Icons';
import { useMedia } from './motion';

// The inline nav needs about 1280px at default text size. In em it grows with the reader's text
// size, so at 200% text the menu panel takes over instead of the bar overflowing. Matches sections.css.
const WIDE_NAV = '(min-width: 80em)';

const langs: Lang[] = ['id', 'en'];

// Marks the section crossing the middle band of the viewport; the hero clears the mark.
function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = ['top', ...sections.map((s) => s.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === 'top' ? null : entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

// Places the desktop nav's single underline under the active link; CSS slides it between links.
function useIndicator(active: string | null, lang: string) {
  const listRef = useRef<HTMLUListElement>(null);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const place = () => {
      const link = active ? list.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
      list.toggleAttribute('data-indicator', Boolean(link));
      if (!link) return;
      list.style.setProperty('--ind-x', `${link.offsetLeft + 8}px`);
      list.style.setProperty('--ind-w', `${Math.max(0, link.offsetWidth - 16)}`);
    };
    place();
    document.fonts.ready.then(place); // label widths change once Archivo loads
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active, lang]);
  return listRef;
}

export function Header() {
  const { lang, setLang, t } = useLang();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const listRef = useIndicator(active, lang);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wide = useMedia(WIDE_NAV);
  const headerRef = useRef<HTMLElement>(null);

  // The header's real height (it grows when enlarged text wraps it) feeds scroll-padding-top, so
  // in-page links never land a heading under the bar.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() =>
      root.style.setProperty('--header-live', `${Math.round(header.getBoundingClientRect().height)}px`),
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // The menu panel closes when the inline nav takes over, and on Escape, which hands focus back to
  // the Menu button so it never falls onto a link that just disappeared.
  useEffect(() => {
    if (wide) setOpen(false);
  }, [wide]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // One switch, placed in the DOM where it sits on screen so Tab follows what the eye reads:
  // name, language, Menu, then the menu itself on narrow screens; name, links, language on wide ones.
  const langSwitch = (
    <div className="lang-switch" role="group" aria-label={t(ui.languageLabel)}>
      {langs.map((code) => (
        <button
          key={code}
          type="button"
          className="lang-switch__button"
          lang={code}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <header
      ref={headerRef}
      className="site-header"
      data-open={open ? '' : undefined}
      // Focus leaving the header closes the menu, so the next control is never under the panel.
      onBlur={(e) => {
        if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <a className="skip-link" href="#main">
        {t(ui.skipToContent)}
      </a>
      <div className="site-header__inner wrap">
        <a className="site-header__name" href="#top">
          {profile.name}
        </a>
        {!wide && langSwitch}
        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          {t(open ? ui.closeMenu : ui.menu)}
        </button>
        <nav id="site-nav" className="site-nav" aria-label={t(ui.navLabel)}>
          <ul ref={listRef} className="site-nav__list">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  className="site-nav__link"
                  href={`#${section.id}`}
                  aria-current={active === section.id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {t(section.title)}
                </a>
              </li>
            ))}
          </ul>
          <ExternalLink className="button button--ghost button--sm site-nav__cv" href={profile.cv}>
            {t(ui.downloadCv)}
          </ExternalLink>
        </nav>
        {wide && langSwitch}
      </div>
      <div className="site-header__progress" aria-hidden="true" />
    </header>
  );
}
