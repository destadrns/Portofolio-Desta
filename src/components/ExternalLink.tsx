import type { ReactNode } from 'react';
import { ui } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import { ExternalIcon } from './Icons';

type Props = {
  href: string;
  className?: string;
  label?: string; // accessible name when the visible text alone is ambiguous
  children: ReactNode;
};

// Opens in a new tab and says so to screen readers.
export function ExternalLink({ href, className, label, children }: Props) {
  const { t } = useLang();
  return (
    <a className={className} href={href} target="_blank" rel="noopener" aria-label={label ? `${label} ${t(ui.newTab)}` : undefined}>
      {children}
      <ExternalIcon />
      {!label && <span className="sr-only"> {t(ui.newTab)}</span>}
    </a>
  );
}
