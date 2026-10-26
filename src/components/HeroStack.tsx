import type { CSSProperties } from 'react';
import { projects } from '../data/projects';

// Hero copies of the screenshots at 320, 640, and 1024 px. A plate is 56cqw of the stack (the column
// width, up to 520px); perspective draws the front plate about 15% larger, so it shows 212px wide on
// a 360 screen and up to about 336px.
const stackImage = (src: string, w?: number) => {
  const path = src.replace('./img/', './img/stack/');
  return w ? path.replace(/\.webp$/, `-${w}.webp`) : path;
};
const PLATE_SIZES = '(min-width: 1024px) 310px, min(340px, calc((100vw - 32px) * 0.65))';

// Five project plates facing the viewer, stacked into depth: NOVAÉ in front, each later plate a
// step right, up, and back. No rotation. Depth comes from CSS perspective and the plate edges only.
// CSS animates the entrance; the scroll loop in motion.ts writes --out on .hero, which spreads
// and recedes the stack as the hero scrolls away.
export function HeroStack() {
  const middle = (projects.length - 1) / 2;

  return (
    <div className="stack" aria-hidden="true">
      <div className="stack__stage">
        <div className="stack__group">
          {projects.map((project, i) => (
            <img
              key={project.id}
              className="stack__plate"
              src={stackImage(project.image)}
              srcSet={`${stackImage(project.image, 320)} 320w, ${stackImage(project.image, 640)} 640w, ${stackImage(project.image)} 1024w`}
              sizes={PLATE_SIZES}
              alt=""
              width={1024}
              height={518}
              style={{ '--k': i - middle, zIndex: projects.length - i } as CSSProperties}
              fetchPriority={i === 0 ? 'auto' : 'low'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
