import {
  CanvasTexture,
  Group,
  LinearSRGBColorSpace,
  Mesh,
  MeshBasicMaterial,
  NoColorSpace,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  TextureLoader,
  WebGLRenderer,
  type Texture,
} from 'three';

// The WebGL version of the hero stack, loaded on demand by HeroStack.tsx (its own chunk). It repeats
// the CSS stack in sections.css: world units are the stack's width (CSS cqw / 100), the camera sits
// where `perspective: 150cqw` puts the eye, and the plates use the same steps and screenshots.

const DISTANCE = 1.5;
const PLATE_W = 0.56;
const PLATE_H = (PLATE_W * 518) / 1024;
const SHIFT_X = 0.03; // left: calc(50% + 3cqw)
const STEP = new Vector3(0.08, 0.05, -0.1); // per plate: right, up, back (y points up here)
const ENTER_DEPTH = -0.3; // the CSS stack-depth keyframe: translateZ(-30cqw)
const STAGGER = 70; // ms between plates, back plate first
const BAND_CYCLE = 8000; // a 5 s sweep, then 3 s of rest
const BAND_SWEEP = 5000;
// Unattended motion (the sway, new band sweeps) dies out within 5 s of the pointer leaving the hero,
// so nothing moves on its own for longer than WCAG 2.2.2 allows. With the pointer over the hero the
// visitor is driving it.
const AMBIENT = 5000;
const BAND_DIR = new Vector2(0.8, 0.6); // bottom left to top right

// Shadow sprite: a blurred rounded rectangle with the plate's proportions, drawn once and shared.
const SHADOW = { w: 256, pad: 36 };
const SHADOW_INNER_W = SHADOW.w - 2 * SHADOW.pad;
const SHADOW_INNER_H = Math.round((SHADOW_INNER_W * 518) / 1024);
const SHADOW_H = SHADOW_INNER_H + 2 * SHADOW.pad;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec2 vWorld;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xy;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

// The screenshot texel goes out unchanged (no color-space conversion anywhere), so a plate at rest
// shows the same pixels as the <img> in the CSS stack. Rounded corners and the 1px frost edge come
// from a signed distance; the brass band is placed in world space, so it crosses all five plates.
const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uHalf;
  uniform float uRadius;
  uniform float uOpacity;
  uniform float uDim;
  uniform float uBand;
  uniform float uBandOn;
  uniform vec2 uDir;
  uniform vec3 uBrass;
  uniform vec3 uFrost;
  varying vec2 vUv;
  varying vec2 vWorld;
  void main() {
    vec2 p = (vUv - 0.5) * 2.0 * uHalf;
    vec2 q = abs(p) - uHalf + uRadius;
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
    float aa = fwidth(d);
    float inside = 1.0 - smoothstep(-aa, 0.0, d);
    vec3 color = texture2D(uMap, vUv).rgb;
    float s = dot(vWorld, uDir) - uBand;
    float band = uBandOn * exp(-s * s / 0.005);
    color = 1.0 - (1.0 - color) * (1.0 - uBrass * band * 0.35);
    color *= 1.0 - 0.45 * uDim;
    float edge = 1.0 - smoothstep(aa, 2.0 * aa, abs(d + aa));
    color = mix(color, uFrost, edge * 0.35);
    gl_FragColor = vec4(color, inside * uOpacity);
  }
`;

export type HeroSceneOptions = {
  canvas: HTMLCanvasElement;
  context: WebGL2RenderingContext;
  hero: HTMLElement;
  stack: HTMLElement;
  label: HTMLElement;
  images: string[]; // the CSS stack plates' currentSrc, already in the browser cache
  onHighlight: (index: number | null) => void;
  onSelect: (index: number) => void;
};

export type HeroScene = {
  setFocus: (index: number | null) => void;
  // contextLost: the GPU already freed everything, so only the loop and listeners need stopping.
  dispose: (contextLost?: boolean) => void;
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// cubic-bezier(x1, y1, x2, y2) as a function of time, solved with Newton steps.
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
      t = clamp(t - error / slope(t, x1, x2));
    }
    return at(t, y1, y2);
  };
}

// Colors and motion come from the tokens in tokens.css.
function readTokens() {
  const style = getComputedStyle(document.documentElement);
  const token = (name: string) => style.getPropertyValue(name).trim();
  const rgb = (name: string) => {
    const n = parseInt(token(name).slice(1), 16);
    return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
  };
  const [x1, y1, x2, y2] = (token('--ease').match(/-?[\d.]+/g) ?? []).map(Number);
  return {
    brass: rgb('--brass'),
    frost: rgb('--frost'),
    midnight: token('--midnight'),
    ease: bezier(x1, y1, x2, y2),
    duration: parseFloat(token('--dur-3')),
    radius: parseFloat(token('--radius-card')),
  };
}

function shadowTexture(color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = SHADOW.w;
  canvas.height = SHADOW_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');
  // Draw the shape off-canvas and keep only its blurred shadow.
  ctx.shadowColor = color;
  ctx.shadowBlur = 22;
  ctx.shadowOffsetX = SHADOW.w;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(SHADOW.pad - SHADOW.w, SHADOW.pad, SHADOW_INNER_W, SHADOW_INNER_H, 10);
  ctx.fill();
  return new CanvasTexture(canvas);
}

export async function createHeroScene(o: HeroSceneOptions): Promise<HeroScene> {
  const tokens = readTokens();
  // The files the CSS stack already chose from its srcset come back from the browser cache, so the
  // scene downloads no images of its own. Not the <img> elements themselves: a srcset image reports
  // a density-corrected size that differs from its pixels, which breaks the texture upload.
  const loader = new TextureLoader();
  const maps = await Promise.all(o.images.map((src) => loader.loadAsync(src)));
  const textures: Texture[] = [...maps];

  try {
    const renderer = new WebGLRenderer({ canvas: o.canvas, context: o.context, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = LinearSRGBColorSpace; // no output conversion either
    const anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 10);
    const stackGroup = new Group();
    scene.add(stackGroup);

    const shadowMap = shadowTexture(tokens.midnight);
    textures.push(shadowMap);
    const plateGeometry = new PlaneGeometry(PLATE_W, PLATE_H);
    const shadowGeometry = new PlaneGeometry(
      (PLATE_W * SHADOW.w) / SHADOW_INNER_W,
      (PLATE_H * SHADOW_H) / SHADOW_INNER_H,
    );

    // Uniform objects shared by all five plate materials: one write moves the band everywhere.
    const shared = {
      uHalf: { value: new Vector2(PLATE_W / 2, PLATE_H / 2) },
      uRadius: { value: 0 }, // --radius-card in stack widths, set on resize
      uBand: { value: -1 },
      uBandOn: { value: 0 },
      uDir: { value: BAND_DIR },
      uBrass: { value: tokens.brass },
      uFrost: { value: tokens.frost },
    };

    const middle = (maps.length - 1) / 2;
    const plates = maps.map((map, i) => {
      map.colorSpace = NoColorSpace;
      map.anisotropy = anisotropy;
      const material = new ShaderMaterial({
        uniforms: { ...shared, uMap: { value: map }, uOpacity: { value: 0 }, uDim: { value: 0 } },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      });
      const shadowMaterial = new MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false, opacity: 0 });
      const mesh = new Mesh(plateGeometry, material);
      const shadow = new Mesh(shadowGeometry, shadowMaterial);
      shadow.position.set(0.006, -0.014, -0.012);
      const group = new Group();
      group.add(shadow, mesh);
      stackGroup.add(group);
      return { k: i - middle, delay: (maps.length - 1 - i) * STAGGER, group, mesh, material, shadowMaterial, lift: 0, dim: 0 };
    });
    const meshes = plates.map((p) => p.mesh);

    // Size: the canvas overhangs the stack (sections.css), centred on it, so one world unit is the
    // stack's width at the z = 0 plane.
    let width = 1;
    let height = 1;
    let left = 0;
    let top = 0;
    const resize = () => {
      width = o.canvas.clientWidth || 1;
      height = o.canvas.clientHeight || 1;
      left = o.canvas.offsetLeft;
      top = o.canvas.offsetTop;
      const unit = o.stack.clientWidth || 1;
      shared.uRadius.value = tokens.radius / unit;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = (2 * Math.atan(height / unit / 2 / DISTANCE) * 180) / Math.PI;
      camera.updateProjectionMatrix();
      pointer.stale = true;
    };

    // Pointer: anywhere over the hero moves the camera; over a plate it highlights that plate.
    const pointer = { x: 0, y: 0, inside: false, stale: true, nx: 0, ny: 0, ndc: new Vector2(2, 2) };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
      pointer.stale = true;
      wake();
    };
    const onLeave = () => {
      pointer.inside = false;
      pointer.stale = true;
      wake();
    };
    const onScroll = () => {
      pointer.stale = true;
      wake();
    };
    let hover: number | null = null;
    let focus: number | null = null;
    let highlight: number | null = null;
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (hover !== null && !target?.closest('a, button')) o.onSelect(hover);
    };

    const raycaster = new Raycaster();
    const corner = new Vector3();
    const cam = { x: 0, y: 0 };
    let labelAt = '';
    let start = -1;
    let last = 0;
    let frame = 0;
    let lastOut = -1;
    let active = 0; // when the pointer was last over the hero, on the scene clock
    const entrance = (maps.length - 1) * STAGGER + tokens.duration;

    const tick = (now: number) => {
      frame = 0;
      if (start < 0) start = now;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      const t = now - start;
      if (pointer.inside) active = t;
      const ambient = clamp(1 - (t - active) / AMBIENT);
      // --out is written by motion.ts as an inline style; reading it back costs no style recalc.
      const out = parseFloat(o.hero.style.getPropertyValue('--out')) || 0;
      // The largest step any damped value took this frame; the loop sleeps once everything rests.
      let moved = 0;
      const approach = (from: number, to: number, k: number) => {
        const next = from + (to - from) * k;
        moved = Math.max(moved, Math.abs(next - from));
        return next;
      };

      if (pointer.stale) {
        pointer.stale = false;
        if (pointer.inside) {
          const h = o.hero.getBoundingClientRect();
          const c = o.canvas.getBoundingClientRect();
          pointer.nx = ((pointer.x - h.left) / h.width) * 2 - 1;
          pointer.ny = ((pointer.y - h.top) / h.height) * 2 - 1;
          pointer.ndc.set(((pointer.x - c.left) / c.width) * 2 - 1, -(((pointer.y - c.top) / c.height) * 2 - 1));
        }
      }

      // Damped parallax; with the pointer away, a very slow sway that fades out.
      const tx = pointer.inside ? pointer.nx * 0.06 : Math.sin(t / 2000) * 0.02 * ambient;
      const ty = pointer.inside ? -pointer.ny * 0.04 : Math.sin(t / 2700) * 0.012 * ambient;
      const follow = 1 - Math.exp(-dt * 3);
      cam.x = approach(cam.x, tx, follow);
      cam.y = approach(cam.y, ty, follow);
      camera.position.set(cam.x, cam.y, DISTANCE);
      camera.lookAt(0, 0, 0);

      // Exit: the steps spread from 1 to 1.6 and the stack turns a little, recedes, and fades.
      const spread = 1 + 0.6 * out;
      const fade = 1 - 0.85 * out;
      stackGroup.position.set(0, -0.04 * out, -0.12 * out);
      stackGroup.rotation.y = 0.18 * out;

      const settle = 1 - Math.exp(-dt * 10);
      for (const [i, p] of plates.entries()) {
        const enter = tokens.ease(clamp((t - p.delay) / tokens.duration));
        p.lift = approach(p.lift, highlight === i ? 1 : 0, settle);
        p.dim = approach(p.dim, highlight !== null && highlight !== i ? 1 : 0, settle);
        p.group.position.set(
          SHIFT_X + p.k * STEP.x * spread,
          p.k * STEP.y * spread + p.lift * 0.03,
          p.k * STEP.z * spread + (1 - enter) * ENTER_DEPTH + p.lift * 0.05,
        );
        p.material.uniforms.uOpacity.value = enter * fade;
        p.material.uniforms.uDim.value = p.dim;
        p.shadowMaterial.opacity = enter * fade * 0.6;
      }

      // A sweep starts only while the pointer is over the hero (or in the first cycle); one already
      // under way finishes.
      const phase = t % BAND_CYCLE;
      const sweeping = phase < BAND_SWEEP && (pointer.inside || t - phase <= active);
      shared.uBandOn.value = sweeping ? 1 : 0;
      shared.uBand.value = -0.7 + 1.45 * (phase / BAND_SWEEP) + cam.x * 0.8;

      scene.updateMatrixWorld();
      camera.updateMatrixWorld();

      // Hover: the first plate under the pointer that is drawn solidly enough to see.
      let next: number | null = null;
      if (pointer.inside && Math.abs(pointer.ndc.x) <= 1 && Math.abs(pointer.ndc.y) <= 1) {
        raycaster.setFromCamera(pointer.ndc, camera);
        const hit = raycaster
          .intersectObjects(meshes, false)
          .find((h) => (h.object as Mesh<PlaneGeometry, ShaderMaterial>).material.uniforms.uOpacity.value > 0.5);
        next = hit ? meshes.indexOf(hit.object as (typeof meshes)[number]) : null;
      }
      if (next !== hover) {
        hover = next;
        o.hero.toggleAttribute('data-stack-hover', hover !== null);
      }
      const lit = hover ?? focus;
      if (lit !== highlight) {
        highlight = lit;
        o.onHighlight(lit);
      }

      // The HTML label follows the highlighted plate's top-left corner.
      if (highlight !== null) {
        corner.set(-PLATE_W / 2, PLATE_H / 2, 0);
        plates[highlight].mesh.localToWorld(corner).project(camera);
        const x = left + ((corner.x + 1) / 2) * width + 12;
        const y = top + ((1 - corner.y) / 2) * height + 12;
        const at = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        if (at !== labelAt) {
          labelAt = at;
          o.label.style.transform = at;
        }
      }

      renderer.render(scene, camera);

      const busy = pointer.inside || sweeping || ambient > 0 || t < entrance || out !== lastOut || moved > 1e-5;
      lastOut = out;
      if (busy) frame = requestAnimationFrame(tick);
    };

    // The loop runs only while something moves, the hero is on screen, and the tab is visible.
    // Pointer, scroll, focus, and resize wake it.
    let onScreen = true;
    const shown = () => onScreen && document.visibilityState === 'visible';
    const wake = () => {
      if (frame || !shown()) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const run = () => {
      if (shown()) wake();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const seen = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      run();
    });
    const resized = new ResizeObserver(() => {
      resize();
      wake();
    });

    resize();
    resized.observe(o.stack);
    seen.observe(o.hero);
    o.hero.addEventListener('pointermove', onMove, { passive: true });
    o.hero.addEventListener('pointerleave', onLeave, { passive: true });
    o.hero.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', run);
    run();

    return {
      setFocus(index) {
        focus = index;
        wake();
      },
      dispose(contextLost = false) {
        cancelAnimationFrame(frame);
        frame = 0;
        seen.disconnect();
        resized.disconnect();
        o.hero.removeEventListener('pointermove', onMove);
        o.hero.removeEventListener('pointerleave', onLeave);
        o.hero.removeEventListener('click', onClick);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', run);
        o.hero.removeAttribute('data-stack-hover');
        o.label.style.removeProperty('transform');
        if (contextLost) return;
        plateGeometry.dispose();
        shadowGeometry.dispose();
        for (const p of plates) {
          p.material.dispose();
          p.shadowMaterial.dispose();
        }
        textures.forEach((texture) => texture.dispose());
        renderer.dispose();
      },
    };
  } catch (error) {
    textures.forEach((texture) => texture.dispose());
    throw error;
  }
}
