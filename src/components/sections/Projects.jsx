import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';
import { projects } from '../../data/projects';
import SectionWrapper from '../common/SectionWrapper';
import Button from '../common/Button';
import './Projects.css';

const filters = [
  { label: 'Semua', value: 'all' },
  { label: 'Web', value: 'Web' },
  { label: 'Data', value: 'Data' },
  { label: 'Big Data', value: 'Big Data' },
  { label: 'AI / Modeling', value: 'AI / Modeling' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

/* Custom mini preview visuals for each project */
function DashboardVisual() {
  return (
    <div className="project-visual project-visual--dashboard">
      <div className="pv-dashboard__cards">
        <div className="pv-dashboard__card">
          <div className="pv-dashboard__card-bar pv-dashboard__card-bar--1" />
          <div className="pv-dashboard__card-label" />
        </div>
        <div className="pv-dashboard__card">
          <div className="pv-dashboard__card-bar pv-dashboard__card-bar--2" />
          <div className="pv-dashboard__card-label" />
        </div>
        <div className="pv-dashboard__card">
          <div className="pv-dashboard__card-bar pv-dashboard__card-bar--3" />
          <div className="pv-dashboard__card-label" />
        </div>
      </div>
      <div className="pv-dashboard__chart">
        <div className="pv-dashboard__bar" style={{ height: '60%' }} />
        <div className="pv-dashboard__bar" style={{ height: '85%' }} />
        <div className="pv-dashboard__bar" style={{ height: '45%' }} />
        <div className="pv-dashboard__bar" style={{ height: '70%' }} />
        <div className="pv-dashboard__bar" style={{ height: '55%' }} />
      </div>
      <div className="pv-dashboard__table">
        <div className="pv-dashboard__row" />
        <div className="pv-dashboard__row" />
        <div className="pv-dashboard__row" />
      </div>
    </div>
  );
}

function PortfolioVisual() {
  return (
    <div className="project-visual project-visual--portfolio">
      <div className="pv-portfolio__hero">
        <div className="pv-portfolio__circle" />
        <div className="pv-portfolio__lines">
          <div className="pv-portfolio__line pv-portfolio__line--long" />
          <div className="pv-portfolio__line pv-portfolio__line--short" />
        </div>
      </div>
      <div className="pv-portfolio__sections">
        <div className="pv-portfolio__section-block" />
        <div className="pv-portfolio__section-block" />
      </div>
      <div className="pv-portfolio__nav">
        <div className="pv-portfolio__dot pv-portfolio__dot--active" />
        <div className="pv-portfolio__dot" />
        <div className="pv-portfolio__dot" />
      </div>
    </div>
  );
}

function UIExperimentVisual() {
  return (
    <div className="project-visual project-visual--ui">
      <div className="pv-ui__grid">
        <div className="pv-ui__btn pv-ui__btn--primary" />
        <div className="pv-ui__btn pv-ui__btn--secondary" />
        <div className="pv-ui__chip" />
        <div className="pv-ui__chip" />
        <div className="pv-ui__chip" />
      </div>
      <div className="pv-ui__row">
        <div className="pv-ui__minicard" />
        <div className="pv-ui__toggle">
          <div className="pv-ui__toggle-dot" />
        </div>
      </div>
      <div className="pv-ui__layout">
        <div className="pv-ui__block pv-ui__block--wide" />
        <div className="pv-ui__block pv-ui__block--narrow" />
      </div>
    </div>
  );
}

const visualComponents = {
  1: PortfolioVisual,
  2: DashboardVisual,
  3: DashboardVisual,
  4: DashboardVisual,
  5: UIExperimentVisual,
  6: DashboardVisual,
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="proyek" alt>
      <div className="section-header">
        <span className="section-label">Selected Works</span>
        <h2 className="section-title">Proyek</h2>
        <p className="section-subtitle">
          Beberapa project yang saya gunakan untuk belajar membangun web,
          mengolah data, membuat pipeline analisis, dan mencoba pendekatan
          modeling berbasis machine learning.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="projects__filters" role="tablist" aria-label="Filter proyek">
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={activeFilter === f.value}
            className={`projects__filter ${activeFilter === f.value ? 'projects__filter--active' : ''}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="projects__grid" role="tabpanel">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const VisualComponent = visualComponents[project.id];

            return (
              <motion.article
                key={project.id}
                className="projects__card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                {/* Custom visual per project */}
                <div
                  className="projects__card-visual"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}18, ${project.color}06)`,
                    borderBottom: `1px solid var(--color-border)`,
                  }}
                >
                  {VisualComponent ? <VisualComponent /> : null}
                </div>

                <div className="projects__card-body">
                  <div className="projects__card-top">
                    <h3 className="projects__card-title">{project.name}</h3>
                    <span className="projects__card-status">{project.status}</span>
                  </div>

                  <p className="projects__card-desc">{project.description}</p>

                  <div className="projects__card-detail">
                    <h4>Masalah</h4>
                    <p>{project.problem}</p>
                  </div>

                  <div className="projects__card-detail">
                    <h4>Solusi</h4>
                    <p>{project.solution}</p>
                  </div>

                  <div className="projects__card-tech">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="projects__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="projects__card-links">
                    <Button
                      variant="secondary"
                      size="sm"
                      href={project.github}
                      icon={FolderGit2}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat Repository
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
