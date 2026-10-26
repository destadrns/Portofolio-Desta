import { useEffect } from 'react';
import { otherProjects, projects } from '../data/projects';
import { ui } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import type { Project } from '../types';
import { ExternalLink } from './ExternalLink';
import { readHighlight } from './figures';
import { useReveal } from './motion';
import { SectionHead } from './SectionHead';

// Screenshot copies sit beside the 1760 px original as name-640.webp and so on.
const WIDTHS = [640, 1024, 1600];
const sized = (src: string, w: number) => src.replace(/\.webp$/, `-${w}.webp`);
// The shot column: 7/12 of the card on 1024px+ (640px at most), the card's inner width below.
const SHOT_SIZES =
  '(min-width: 1024px) min(640px, calc((100vw - 160px) * 0.58)), (min-width: 768px) calc(100vw - 128px), calc(100vw - 80px)';

function HighlightBlock({ text }: { text: string }) {
  const highlight = readHighlight(text);

  if (highlight.kind === 'metrics') {
    return (
      <ul className="metrics">
        {highlight.items.map((m) => (
          <li key={m.before} className="metric">
            <span className="metric__value">{m.value}</span>
            <span className="metric__label">
              {m.before}
              {m.after && ` (${m.after})`}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if (highlight.kind === 'figure') {
    return (
      <p className="figure">
        <span className="figure__value">{highlight.figure.value}</span>
        <span className="figure__label">{highlight.figure.after}</span>
      </p>
    );
  }
  return <p className="pcard__highlight">{highlight.text}</p>;
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang();
  const ref = useReveal<HTMLElement>();

  // The curtain keeps the screenshot clipped until the card enters, and a lazy image inside a
  // clipped box would wait for the reveal; start the download a screen ahead instead.
  useEffect(() => {
    const card = ref.current;
    const img = card?.querySelector('img');
    if (!card || !img) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        img.loading = 'eager';
        observer.disconnect();
      },
      { rootMargin: '100% 0px' },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [ref]);

  const blocks = [
    { label: ui.problem, body: <p>{t(project.problem)}</p> },
    { label: ui.solution, body: <p>{t(project.solution)}</p> },
    { label: ui.highlight, body: <HighlightBlock text={t(project.highlight)} />, highlight: true },
  ];

  return (
    <article
      ref={ref}
      className="card pcard"
      data-reveal=""
      id={project.id}
      aria-labelledby={`${project.id}-title`}
    >
      <header className="pcard__head">
        <span className="pcard__num" aria-hidden="true">
          {project.number}
        </span>
        <div className="pcard__title">
          <h3 id={`${project.id}-title`}>{project.name}</h3>
          <p>{t(project.tagline)}</p>
        </div>
        <ul className="pcard__meta">
          <li>{t(project.kind)}</li>
          <li className="mono">{project.year}</li>
          <li>{t(project.role)}</li>
        </ul>
      </header>
      <figure className="pcard__shot">
        <ExternalLink
          className="pcard__image-link"
          href={sized(project.image, 1600)}
          label={`${t(ui.viewScreenshot)}: ${project.name}`}
        >
          <div className="pcard__frame">
            <img
              src={sized(project.image, 1600)}
              srcSet={WIDTHS.map((w) => `${sized(project.image, w)} ${w}w`).join(', ')}
              sizes={SHOT_SIZES}
              alt={t(project.imageAlt)}
              width={1760}
              height={890}
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="pcard__image-label">{t(ui.viewScreenshot)}</span>
        </ExternalLink>
      </figure>
      <div className="pcard__blocks">
        {blocks.map((block) => (
          <div
            key={block.label.en}
            className={block.highlight ? 'block block--highlight' : 'block'}
          >
            <h4 className="block__label">{t(block.label)}</h4>
            {block.body}
            {block.highlight && <p className="pcard__evidence">{t(project.evidence)}</p>}
          </div>
        ))}
      </div>
      <details className="pcard__details">
        <summary>{t(ui.projectDetails)}</summary>
        <h4 className="block__label">{t(ui.contribution)}</h4>
        <p className="pcard__contribution">{t(project.contribution)}</p>
        <h4 className="block__label">{t(ui.workflow)}</h4>
        <p className="pcard__flow-note">{t(ui.workflowNote)}</p>
        <ol className="project-flow">
          {project.flow.map((step) => <li key={step.en}>{t(step)}</li>)}
        </ol>
        <ExternalLink className="link" href={project.evidenceLink} label={`${t(ui.viewEvidence)}: ${project.name}`}>
          {t(ui.viewEvidence)}
        </ExternalLink>
      </details>
      <footer className="pcard__foot">
        <ul className="chips" aria-label={t(ui.stack)}>
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
        <ExternalLink
          className="button button--ghost button--sm"
          href={project.link}
          label={`${t(ui.viewRepo)}: ${project.name}`}
        >
          {t(ui.viewRepo)}
        </ExternalLink>
      </footer>
    </article>
  );
}

export function Projects() {
  const { t } = useLang();

  return (
    <section id="projects" className="section section--dark" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHead id="projects" />
        <nav className="project-index" aria-label={t(ui.projectIndex)}>
          <ul>
            {projects.map((project) => <li key={project.id}><a href={`#${project.id}`}>{project.name}</a></li>)}
          </ul>
        </nav>
        <ol className="pcards" role="list">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ol>
        <div className="others">
          <h3 className="others__title">{t(ui.otherProjects)}</h3>
          <ul className="others__list">
            {otherProjects.map((project) => (
              <li key={project.name} className="others__item">
                <h4 className="others__name">{project.name}</h4>
                <p>{t(project.description)}</p>
                <p className="others__stack">{project.stack.join(' · ')}</p>
                <ExternalLink
                  className="link others__link"
                  href={project.link}
                  label={`${t(ui.viewRepo)}: ${project.name}`}
                >
                  {t(ui.viewRepo)}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
