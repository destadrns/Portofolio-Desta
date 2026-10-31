import { useId, useState } from 'react';
import { cloudCourseGroups, cloudCourseUrl } from '../data/profile';
import { ui } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import type { CloudCourseGroup } from '../types';
import { ExternalLink } from './ExternalLink';
import { ChevronIcon } from './Icons';
import { useMedia, useReveal } from './motion';

// From 768px the three themes sit side by side and are always open; below that each theme heading
// is a button that opens its list (closed by default).
const COLUMNS = '(min-width: 768px)';

const total = cloudCourseGroups.reduce((sum, group) => sum + group.courses.length, 0);

function Group({ group, columns }: { group: CloudCourseGroup; columns: boolean }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const listId = useId();
  const shown = columns || open;

  return (
    <div className="courses__group">
      <h4 className="courses__theme">
        {columns ? (
          group.name
        ) : (
          <button type="button" className="courses__toggle" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((v) => !v)}>
            <span lang="en">{group.name}</span>
            <span className="courses__count">{group.courses.length}</span>
            <ChevronIcon />
          </button>
        )}
      </h4>
      <ul id={listId} className="courses__list" role="list" hidden={!shown}>
        {group.courses.map((course) => (
          <li key={course.badgeId} className="course">
            <span className="course__name" lang="en">
              {course.name}
            </span>
            <span className="course__meta">
              <span className="mono">{t(course.date)}</span>
              <ExternalLink className="link course__verify" href={cloudCourseUrl(course.badgeId)} label={`${t(ui.verify)}: ${course.name}`}>
                {t(ui.verify)}
              </ExternalLink>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Google Cloud completion badges under the main certificate cards: compact rows, not cards.
export function CloudCourses() {
  const { t } = useLang();
  const columns = useMedia(COLUMNS);
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="courses" data-reveal="rise">
      <h3 className="courses__title">
        {t(ui.cloudCourses)} ({total})
      </h3>
      <p className="courses__intro">{t(ui.cloudCoursesIntro)}</p>
      <div className="courses__groups">
        {cloudCourseGroups.map((group) => (
          <Group key={group.name} group={group} columns={columns} />
        ))}
      </div>
    </div>
  );
}
