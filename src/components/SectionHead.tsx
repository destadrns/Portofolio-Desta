import { sectionHead } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import { useReveal } from './motion';

// Every section opens the same way: a divider, then label, title, one purpose sentence.
// The head rises once, as one block, the first time it enters the viewport.
export function SectionHead({ id }: { id: string }) {
  const { t } = useLang();
  const head = sectionHead(id);
  const ref = useReveal<HTMLElement>();

  return (
    <header ref={ref} className="section-head" data-reveal="rise">
      <div className="divider" aria-hidden="true" />
      <p className="section-head__label">
        <span className="section-head__dash" aria-hidden="true" />
        {t(head.label)}
      </p>
      <h2 id={`${id}-title`} className="section-head__title">
        {t(head.title)}
      </h2>
      <p className="section-head__purpose">{t(head.purpose)}</p>
    </header>
  );
}
