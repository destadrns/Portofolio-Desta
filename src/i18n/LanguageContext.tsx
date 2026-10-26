import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ui } from '../data/ui';
import type { Lang, Localized } from '../types';

const STORAGE_KEY = 'lang';

const isLang = (value: string | null): value is Lang => value === 'id' || value === 'en';

// Order: ?lang= link, then saved choice, then browser language (Indonesian -> id, else en).
function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // Storage blocked: fall through to browser language.
  }
  return navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en';
}

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: Localized) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, updateLang] = useState<Lang>(initialLang);
  const scrollRef = useRef<number | null>(null);
  const setLang = (next: Lang) => {
    if (next === lang) return;
    scrollRef.current = window.scrollY;
    updateLang(next);
  };

  useLayoutEffect(() => {
    if (scrollRef.current === null) return;
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: Math.min(scrollRef.current, max), behavior: 'instant' });
    scrollRef.current = null;
    window.dispatchEvent(new Event('portfolio:language-change'));
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = ui.pageTitle[lang];
    document.querySelector('meta[name="description"]')?.setAttribute('content', ui.metaDescription[lang]);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage blocked: choice lasts for this visit only.
    }
    // Keep an existing ?lang= in sync so a reload does not switch back.
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', lang);
      history.replaceState(history.state, '', url);
    }
  }, [lang]);

  const t = (text: Localized) => text[lang];

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLang must be used inside LanguageProvider');
  return value;
}
