import { useEffect, useRef, useState } from 'react';

// Motion lives in CSS. JS only (1) flags <html class="motion"> so hidden start states exist at all,
// and <html class="sda"> where CSS scroll-driven animations run the scroll-linked 3D on the
// compositor, (2) marks [data-reveal] elements once as they enter, and elements already on screen
// when the page opens as [data-settled] (final pose), and (3) writes scroll-linked CSS variables from
// one rAF loop, driven by Lenis on wide fine-pointer screens and by native scroll elsewhere. Without
// scroll-driven animations that loop also writes the 3D progress, eased with --ease. With reduced
// motion none of this runs, so everything renders in its final state.

const REDUCE = '(prefers-reduced-motion: reduce)';
export const SMOOTH_SCROLL = '(min-width: 768px) and (pointer: fine)';

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCE).matches;
}

// Set before React's first paint so in-view content never flashes visible, then hidden, then in.
document.documentElement.classList.toggle('motion', !prefersReducedMotion());

export const scrollDriven = () => typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');

// cubic-bezier(x1, y1, x2, y2) as a function of progress, solved with Newton steps.
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const at = (t: number, a: number, b: number) => ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t;
  const slope = (t: number, a: number, b: number) => 3 * (1 - 3 * b + 3 * a) * t * t + 2 * (3 * b - 6 * a) * t + 3 * a;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const error = at(t, x1, x2) - x;
      if (Math.abs(error) < 1e-5) break;
      t = Math.min(1, Math.max(0, t - error / slope(t, x1, x2)));
    }
    return at(t, y1, y2);
  };
}

// The --ease token as a function, for motion that JS drives (the 3D fallback, the hero scene).
let curve: ((x: number) => number) | null = null;
export function ease(x: number) {
  if (!curve) {
    const token = getComputedStyle(document.documentElement).getPropertyValue('--ease');
    const [x1, y1, x2, y2] = (token.match(/-?[\d.]+/g) ?? ['0', '0', '1', '1']).map(Number);
    curve = bezier(x1, y1, x2, y2);
  }
  return curve(x);
}

// Elements with scroll-linked 3D (sections.css). Those on screen when the page opens, or when it
// lands on a #fragment, take their final pose at once and keep it.
const SCROLL_3D = '.pcard, .profile-card, .skill-card, .others__item, .certs';
export function settleVisible() {
  if (!document.documentElement.classList.contains('motion')) return;
  for (const el of document.querySelectorAll<HTMLElement>(SCROLL_3D)) {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.setAttribute('data-settled', '');
  }
  window.dispatchEvent(new Event('portfolio:settled'));
}

export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMedia(REDUCE);

// Marks [data-reveal] (the root and its descendants) with data-inview the first time it enters;
// never undone.
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = [root, ...root.querySelectorAll<HTMLElement>('[data-reveal]')].filter((el) =>
      el.hasAttribute('data-reveal'),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-inview', '');
          observer.unobserve(entry.target);
        }
      },
      // 64px is below every section's bottom padding, so the last element on the page still crosses.
      { rootMargin: '0px 0px -64px 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const clamp = (v: number, min = 0) => Math.min(1, Math.max(min, v));

// Skips the write when the value is unchanged, so still elements are never restyled.
function setVar(el: HTMLElement, name: string, value: number) {
  const v = value.toFixed(4);
  if (el.style.getPropertyValue(name) !== v) el.style.setProperty(name, v);
}

function fragmentTarget() {
  try {
    return document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  } catch {
    return null; // Malformed URL fragments must not prevent the portfolio from opening.
  }
}

// One loop for every scroll-linked value: reading progress, header state, the hero's exit (--out),
// each project card's curtain and stand-up (--enter) and image drift (--pass), the certificates'
// deal (--deal), and the timelines' fill, lit dots, and one-time entries. All layout reads happen first, then all writes, on the element that uses
// the value.
export function useScrollMotion(enabled: boolean, smooth: boolean) {
  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (!active) return;
      if (window.location.hash) fragmentTarget()?.scrollIntoView({ behavior: 'instant' });
      settleVisible();
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('motion', enabled);
    if (!enabled) html.classList.remove('sda');
    const progress = document.querySelector<HTMLElement>('.site-header__progress');
    const readProgress = () => {
      const max = html.scrollHeight - window.innerHeight;
      return max > 0 ? clamp(window.scrollY / max) : 0;
    };

    // Reduced motion: nothing moves, but the progress line is state, so it still tracks the reading
    // position (no transition; the bar simply jumps to each value).
    if (!enabled) {
      html.removeAttribute('data-scrolled');
      if (!progress) return;
      let pending = 0;
      const write = () => {
        pending = 0;
        setVar(progress, '--read', readProgress());
      };
      const onScroll = () => {
        if (!pending) pending = requestAnimationFrame(write);
      };
      write();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      return () => {
        cancelAnimationFrame(pending);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }

    const hero = document.querySelector<HTMLElement>('.hero');
    // The 3D fallback: progress for each moving element, only where CSS cannot follow the scroll.
    const sda = scrollDriven();
    html.classList.toggle('sda', sda);
    const all = (selector: string) => (sda ? [] : [...document.querySelectorAll<HTMLElement>(selector)]);
    const cards = all('.pcard');
    const stands = all('.profile-card');
    const flips = all('.skill-card, .others__item');
    const certs = sda ? null : document.querySelector<HTMLElement>('.certs');
    const dealt = all('.cert');
    // Share of the viewport scrolled since the top edge entered at the bottom, after `start` and over
    // `length` (both in viewport heights), eased. sections.css uses the same ranges.
    const travel = (top: number, vh: number, start: number, length: number) =>
      ease(clamp((vh - top - start * vh) / (length * vh)));
    const settled = (el: Element) => el.hasAttribute('data-settled');
    // With a #fragment the page is not where it will open yet; the fragment jump settles instead.
    if (!window.location.hash) settleVisible();
    const lines = [...document.querySelectorAll<HTMLElement>('.timeline')].map((line) => ({
      line,
      rows: [...line.querySelectorAll<HTMLElement>('.timeline__row')].map((row) => ({
        row,
        dot: row.querySelector<HTMLElement>('.timeline__dot'),
      })),
    }));

    const update = () => {
      // Reads.
      const vh = window.innerHeight;
      const y = window.scrollY;
      const max = html.scrollHeight - vh;
      const heroRect = hero?.getBoundingClientRect();
      const cardRects = cards.map((card) => card.getBoundingClientRect());
      const standTops = stands.map((el) => el.getBoundingClientRect().top);
      const flipTops = flips.map((el) => el.getBoundingClientRect().top);
      const certsTop = certs?.getBoundingClientRect().top ?? 0;
      const measured = lines.map(({ line, rows }) => {
        const r = line.getBoundingClientRect();
        const reach = vh * 0.6 - r.top;
        return {
          line,
          rows,
          fill: clamp(reach / r.height),
          lit: rows.map(({ dot }) => {
            const d = dot?.getBoundingClientRect();
            return d ? d.top + d.height / 2 - r.top <= reach : true;
          }),
        };
      });

      // Writes.
      if (progress) setVar(progress, '--read', max > 0 ? clamp(y / max) : 0);
      html.toggleAttribute('data-scrolled', y > 8);
      if (hero && heroRect) setVar(hero, '--out', clamp(-heroRect.top / heroRect.height));
      cards.forEach((card, i) => {
        const r = cardRects[i];
        const rest = settled(card);
        if (sda) return;
        // Stands up over 60% of a viewport; tilts +6° → 0° → -4° while the card crosses the screen.
        const cover = (vh - r.top) / (vh + r.height);
        const tilt = cover <= 0 || cover >= 1 ? 0 : cover < 0.5 ? 6 * (1 - ease(cover * 2)) : -4 * ease(cover * 2 - 1);
        setVar(card, '--enter', rest ? 1 : travel(r.top, vh, 0, 0.6));
        setVar(card, '--tilt', rest ? 0 : tilt);
        setVar(card, '--pass', rest ? 0 : clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1));
      });
      stands.forEach((el, i) => setVar(el, '--enter', settled(el) ? 1 : travel(standTops[i], vh, 0, 0.6)));
      flips.forEach((el, i) => {
        const index = parseFloat(el.style.getPropertyValue('--i')) || 0;
        setVar(el, '--flip', settled(el) ? 1 : travel(flipTops[i], vh, index * 0.03, 0.4));
      });
      const dealDone = certs ? settled(certs) : true;
      dealt.forEach((el, i) => setVar(el, '--p', dealDone ? 1 : travel(certsTop, vh, 0.05 + i * 0.04, 0.4)));
      for (const { line, rows, fill, lit } of measured) {
        setVar(line, '--line-fill', fill);
        rows.forEach(({ row, dot }, i) => {
          dot?.toggleAttribute('data-lit', lit[i]);
          if (lit[i] && !row.hasAttribute('data-inview')) row.setAttribute('data-inview', '');
        });
      }
    };

    let frame = 0;
    let dirty = true;
    const cleanup: (() => void)[] = [];
    const listen = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void) => {
      window.addEventListener(type, fn, { passive: true });
      cleanup.push(() => window.removeEventListener(type, fn));
    };

    // Native scroll drives the loop until (and unless) Lenis takes over.
    let lenisOn = false;
    const schedule = () => {
      if (lenisOn || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    listen('scroll', schedule);
    // Settling after a fragment jump changes the fallback values too.
    const resettle = () => {
      if (lenisOn) {
        dirty = true;
        wake();
      } else schedule();
    };
    window.addEventListener('portfolio:settled', resettle);
    cleanup.push(() => window.removeEventListener('portfolio:settled', resettle));

    // Wakes the Lenis loop; replaced once Lenis is in.
    let wake = () => {};

    // Page height changes too (resize, language switch, late images): re-measure on any of them.
    const resized = new ResizeObserver(() => {
      if (lenisOn) {
        dirty = true;
        wake();
      } else schedule();
    });
    resized.observe(document.body);
    cleanup.push(() => resized.disconnect());

    if (smooth) {
      // Lenis loads on demand (its own chunk, never on touch or narrow screens). Once it is in, it
      // smooths wheel input and its tick and the scroll writes share one rAF. The loop runs only
      // while something moves: input wakes it, and it stops once Lenis is idle and nothing changed
      // for 150 ms.
      let stopped = false;
      cleanup.push(() => {
        stopped = true;
      });
      import('lenis').then(({ default: Lenis }) => {
        if (stopped) return;
        const lenis = new Lenis({ lerp: 0.1 });
        lenisOn = true;
        cancelAnimationFrame(frame);
        frame = 0;
        let quietUntil = 0;
        let resync = true;
        const tick = (time: number) => {
          // After a pause Lenis would see the whole idle gap as one frame and jump straight to its
          // target; restart its clock so the first frame of a new glide has no elapsed time.
          if (resync) {
            lenis.time = time;
            resync = false;
          }
          lenis.raf(time);
          if (dirty) {
            dirty = false;
            update();
            quietUntil = time + 150;
          }
          frame = lenis.isScrolling === 'smooth' || time < quietUntil ? requestAnimationFrame(tick) : 0;
        };
        wake = () => {
          quietUntil = performance.now() + 150;
          if (frame) return;
          resync = true;
          frame = requestAnimationFrame(tick);
        };
        lenis.on('scroll', () => {
          dirty = true;
          wake();
        });
        wake();
        listen('wheel', wake);
        listen('keydown', wake);
        listen('pointerdown', wake);

        // Native jumps and translation can invalidate Lenis's running animation and cached height.
        const syncScroll = () => {
          lenis.stop();
          lenis.resize();
          lenis.start();
          dirty = true;
          wake();
        };
        window.addEventListener('portfolio:language-change', syncScroll);
        cleanup.push(() => window.removeEventListener('portfolio:language-change', syncScroll));

        const restoreFragment = () => {
          const target = fragmentTarget();
          if (!target) return;
          syncScroll();
          lenis.scrollTo(target, { immediate: true, force: true });
          settleVisible();
        };
        document.fonts.ready.then(() => { if (!stopped) restoreFragment(); });
        window.addEventListener('hashchange', restoreFragment);
        cleanup.push(() => window.removeEventListener('hashchange', restoreFragment));

        // In-page links glide through Lenis (it honors scroll-padding-top). Focus moves to the
        // target as a native fragment jump would, so the skip link and keyboard users land in place.
        const onClick = (e: MouseEvent) => {
          const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
          const id = link?.getAttribute('href')?.slice(1);
          const target = id ? document.getElementById(id) : null;
          if (!target || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
          e.preventDefault();
          lenis.scrollTo(target);
          wake();
          history.pushState(null, '', `#${id}`);
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        };
        document.addEventListener('click', onClick);
        cleanup.push(() => document.removeEventListener('click', onClick), () => lenis.destroy());
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      cleanup.forEach((fn) => fn());
      html.classList.remove('motion', 'sda');
    };
  }, [enabled, smooth]);
}
