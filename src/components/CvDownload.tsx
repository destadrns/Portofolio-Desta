import { profile } from '../data/profile';
import { ui } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import type { Lang } from '../types';
import { DownloadIcon } from './Icons';

type Props = {
  className: string; // the main link's look in its spot: button, small button, or text link
  place: string; // modifier for the wrapper, e.g. "hero"
};

const fileName = (path: string) => path.slice(path.lastIndexOf('/') + 1);

// Every CV link on the page: the main link downloads the CV in the active language, and a quiet
// link beside or below it offers the other language. Both are plain links, so they work by keyboard.
export function CvDownload({ className, place }: Props) {
  const { lang, t } = useLang();
  const other: Lang = lang === 'id' ? 'en' : 'id';

  return (
    <span className={`cv cv--${place}`}>
      <a className={className} href={profile.cv[lang]} download={fileName(profile.cv[lang])} aria-label={t(ui.downloadCvLabel)}>
        {t(ui.downloadCv)}
        <DownloadIcon />
      </a>
      <a className="cv__other" href={profile.cv[other]} download={fileName(profile.cv[other])} lang={other}>
        {t(ui.cvOtherVersion)}
      </a>
    </span>
  );
}
