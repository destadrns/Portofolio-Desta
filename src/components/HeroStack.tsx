import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { projects } from '../data/projects';
import { ui } from '../data/ui';
import { useLang } from '../i18n/LanguageContext';
import type { HeroScene } from './heroScene';
import { useMedia } from './motion';

// Hero copies of the screenshots at 320, 640, and 1024 px. A plate is 56cqw of the stack (the column
// width, up to 520px); perspective draws the front plate about 15% larger, so it shows 212px wide on
// a 360 screen and up to about 336px.
const stackImage = (src: string, w?: number) => {
  const path = src.replace('./img/', './img/stack/');
  return w ? path.replace(/\.webp$/, `-${w}.webp`) : path;
};
const PLATE_SIZES = '(min-width: 1024px) 310px, min(340px, calc((100vw - 32px) * 0.65))';

// The WebGL stack is an upgrade for wide screens with a mouse and full motion. Anywhere else
// three.js is never requested and the CSS stack is all there is.
const SCENE_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)';

// Set once the GPU drops the WebGL context; the 3D stack then stays off until the page reloads.
let contextLost = false;

// Runs fn once the page has loaded and the browser is idle.
function afterLoadIdle(fn: () => void) {
  let cancelIdle = () => {};
  const idle = () => {
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(fn, { timeout: 2000 });
      cancelIdle = () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(fn, 200);
      cancelIdle = () => clearTimeout(id);
    }
  };
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
  return () => {
    window.removeEventListener('load', idle);
    cancelIdle();
  };
}

// Five project plates facing the viewer, stacked into depth: NOVAÉ in front, each later plate a
// step right, up, and back. CSS animates the entrance; the scroll loop in motion.ts writes --out on
// .hero, which spreads and recedes the stack as the hero scrolls away. On wide mouse screens a
// WebGL copy (heroScene.ts) fades in over it: hover lifts a plate and shows its label, and a click
// follows the matching hidden link below, so in-page navigation stays the one in motion.ts.
export function HeroStack() {
  const { t } = useLang();
  const middle = (projects.length - 1) / 2;
  const sceneOn = useMedia(SCENE_QUERY);
  const stackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const scene = useRef<HeroScene | null>(null);
  const [ready, setReady] = useState(false);
  const [lit, setLit] = useState<number | null>(null);
  // The label keeps the last plate's text while it fades out.
  const [shown, setShown] = useState(0);

  // Loads heroScene.ts (three.js, its own chunk) into one canvas over the CSS stack. Until it is
  // ready, and whenever loading or WebGL fails, the CSS stack stays as it is. If the GPU drops the
  // context later, the scene goes and the CSS stack fades back in (sections.css).
  useEffect(() => {
    const stack = stackRef.current;
    const hero = stack?.closest<HTMLElement>('.hero');
    const label = labelRef.current;
    if (!sceneOn || contextLost || !stack || !hero || !label) return;

    let cancelled = false;
    let pending = false;
    let canvas: HTMLCanvasElement | null = null;
    let context: WebGL2RenderingContext | null = null;
    const release = () => {
      scene.current?.dispose(contextLost);
      scene.current = null;
      if (!contextLost) context?.getExtension('WEBGL_lose_context')?.loseContext();
      canvas?.remove();
      context = null;
      canvas = null;
    };
    // Registered before three.js adds its own handler, which this one stops: no restore attempt.
    const onLost = (e: Event) => {
      e.stopImmediatePropagation();
      contextLost = true;
      cancelled = true;
      release();
      setReady(false);
      setLit(null);
    };

    const stopWaiting = afterLoadIdle(() => {
      canvas = document.createElement('canvas');
      context = canvas.getContext('webgl2', { alpha: true, antialias: false, powerPreference: 'low-power' });
      if (!context) {
        canvas = null;
        return;
      }
      canvas.className = 'stack__canvas';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.addEventListener('webglcontextlost', onLost);
      stack.append(canvas);
      const gl = { canvas, context };
      pending = true;
      import('./heroScene')
        .then(({ createHeroScene }) =>
          cancelled
            ? null
            : createHeroScene({
                ...gl,
                hero,
                stack,
                label,
                images: [...stack.querySelectorAll<HTMLImageElement>('.stack__plate')].map((img) => img.currentSrc || img.src),
                onHighlight: (index) => {
                  setLit(index);
                  if (index !== null) setShown(index);
                },
                onSelect: (index) => links.current[index]?.click(),
              }),
        )
        .then((created) => {
          scene.current = created;
          if (cancelled) release();
          else setReady(true);
        })
        .catch(() => release())
        .finally(() => {
          pending = false;
        });
    });

    return () => {
      cancelled = true;
      stopWaiting();
      if (!pending) release();
      setReady(false);
    };
  }, [sceneOn]);

  const labelled = projects[shown];

  return (
    <div ref={stackRef} className="stack" data-gl={ready || undefined}>
      <div className="stack__stage" aria-hidden="true">
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
      {sceneOn && (
        <div ref={labelRef} className="stack__label" data-on={(ready && lit !== null) || undefined} aria-hidden="true">
          <p className="stack__label-name">
            <span className="stack__label-num">{labelled.number}</span> {labelled.name}
          </p>
          <p>{t(labelled.tagline)}</p>
          <p className="stack__label-hint">{t(ui.stackHint)}</p>
        </div>
      )}
      <ul className="stack__links" aria-label={t(ui.stackLinks)}>
        {projects.map((project, i) => (
          <li key={project.id}>
            <a
              ref={(el) => {
                links.current[i] = el;
              }}
              href={`#${project.id}`}
              onFocus={() => scene.current?.setFocus(i)}
              onBlur={() => scene.current?.setFocus(null)}
            >
              {project.number} {project.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
