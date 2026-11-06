import assert from 'node:assert/strict';
import { after, afterEach, before, beforeEach, test } from 'node:test';
import { chromium } from 'playwright';
import { preview } from 'vite';

let server, browser, context, page;
let errors;
const origin = 'http://127.0.0.1:4175';

before(async () => {
  server = await preview({ preview: { host: '127.0.0.1', port: 4175, strictPort: true } });
  browser = await chromium.launch();
});

beforeEach(async () => {
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();
  errors = [];
  page.on('pageerror', error => errors.push(error.message));
});

afterEach(async () => {
  await context?.close();
  assert.deepEqual(errors, [], 'No unhandled browser errors');
});

after(async () => {
  await browser?.close();
  await new Promise(resolve => server?.httpServer.close(resolve) ?? resolve());
});

// Waits until a project card's title sits in the viewport below the sticky header.
const waitForCard = id => page.waitForFunction(id => {
  const box = document.getElementById(id + '-title').getBoundingClientRect();
  return box.top >= document.querySelector('.site-header').getBoundingClientRect().bottom && box.bottom < innerHeight;
}, id);

// The WebGL stack's chunk (heroScene.ts with three.js bundled in).
const isSceneChunk = url => /\/assets\/[^/]*(heroScene|three)[^/]*\.js$/.test(new URL(url).pathname);

for (const width of [390, 1440]) {
  test(`Direct links reach their target at ${width}px`, async () => {
    await page.setViewportSize({ width, height: 900 });
    for (const id of ['contact', 'nest']) {
      await page.goto('about:blank');
      await page.goto(`${origin}/?lang=id#${id}`);
      await page.evaluate(() => document.fonts.ready);
      await waitForCard(id);
      // Time-based animations only: scroll-driven ones never finish.
      await page.evaluate(() => Promise.allSettled(document.getAnimations().filter(animation => animation.timeline === document.timeline).map(animation => animation.finished)));
      const title = await page.locator(`#${id}-title`).boundingBox();
      const header = await page.locator('.site-header').boundingBox();
      assert(title.y >= header.y + header.height, 'Heading clears the sticky header');
      assert(title.y + title.height < 900, 'Linked heading is in the viewport');
    }
  });
}

test('Landscape menu scrolls to its last action and Escape restores focus', async () => {
  await page.setViewportSize({ width: 740, height: 360 });
  await page.goto(`${origin}/?lang=id`);
  const toggle = page.getByRole('button', { name: 'Menu', exact: true });
  await toggle.click();
  const cv = page.locator('.site-nav__cv');
  await cv.scrollIntoViewIfNeeded();
  const box = await cv.boundingBox();
  assert(box.y >= 0 && box.y + box.height <= 360, 'CV is fully reachable');
  assert(await page.locator('.site-nav').evaluate(el => el.scrollTop > 0));
  await page.keyboard.press('Escape');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
  assert(await toggle.evaluate(el => el === document.activeElement));
});

test('An invalid URL fragment leaves the portfolio usable', async () => {
  await page.goto(`${origin}/?lang=en#%E0%A4%A`);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.getByRole('heading', { level: 1, name: "Hi, I'm Desta" }).count(), 1);
});

test('Language changes keep the scroll position with Lenis active', async () => {
  await page.goto(`${origin}/?lang=id#nest`);
  await page.waitForFunction(() => scrollY > 0 && document.documentElement.classList.contains('lenis'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => !document.documentElement.classList.contains('lenis-smooth'));
  for (const language of ['en', 'id']) {
    const y = await page.evaluate(() => scrollY);
    // Use pointer input: Chromium's automatic scrollIntoView can move sticky controls before a locator click.
    const button = await page.locator(`.lang-switch__button[lang="${language}"]`).boundingBox();
    assert(button);
    await page.mouse.click(button.x + button.width / 2, button.y + button.height / 2);
    await page.waitForFunction(language => document.documentElement.lang === language, language);
    await page.waitForFunction(() => !document.documentElement.classList.contains('lenis-smooth'));
    const after = await page.evaluate(() => scrollY);
    assert(Math.abs(after - y) <= 2, `${language}: scroll position changed from ${y} to ${after}`);
    assert.equal(new URL(page.url()).searchParams.get('lang'), language);
  }
});

test('Copy confirms a successful Clipboard API write', async () => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
      writeText: async text => { window.copiedEmail = text; },
    } });
  });
  await page.goto(`${origin}/?lang=id#contact`);
  await page.getByRole('button', { name: 'Salin Email', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('[role="status"]').textContent.includes('berhasil'));
  assert.equal(await page.evaluate(() => window.copiedEmail), 'dstaasptra@gmail.com');
});

for (const fallback of ['success', 'false', 'throw']) {
  test(`Clipboard fallback handles ${fallback} and restores focus`, async () => {
    await page.addInitScript(outcome => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
        writeText: async () => { throw new DOMException('Blocked', 'NotAllowedError'); },
      } });
      document.execCommand = () => {
        if (outcome === 'throw') throw new Error('Copy unavailable');
        return outcome === 'success';
      };
    }, fallback);
    await page.goto(`${origin}/?lang=id#contact`);
    const button = page.locator('.copy-button');
    await button.click();
    await page.waitForFunction(() => document.querySelector('[role="status"]').textContent.length > 0);
    const status = await page.getByRole('status').textContent();
    assert(status.includes(fallback === 'success' ? 'berhasil' : 'gagal'));
    assert.equal(await page.locator('textarea').count(), 0, 'Temporary copy field is removed');
    assert(await button.evaluate(el => el === document.activeElement));
  });
}

test('Full screenshots and documented workflows are available for every project', async () => {
  await page.goto(`${origin}/?lang=id#projects`);
  const cards = page.locator('.pcard');
  assert.equal(await cards.count(), 5);
  for (const card of await cards.all()) {
    const image = card.locator('.pcard__image-link');
    const response = await page.request.get(new URL(await image.getAttribute('href'), origin).href);
    assert.equal(response.status(), 200);
    assert.match(response.headers()['content-type'], /image\/webp/);
    assert.equal(await image.getAttribute('target'), '_blank');
    await card.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await card.locator('details').getAttribute('open'), '');
    assert.equal(await card.locator('.project-flow li').count(), 3);
    assert.match(await card.locator('details a').getAttribute('href'), /^https:\/\/github\.com\//);
  }
});

test('Layouts and education labels fit at small, medium and large sizes', async () => {
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/?lang=id#about`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#novae summary').click();
    const result = await page.evaluate(() => ({
      fits: document.documentElement.scrollWidth <= innerWidth,
      labelsFit: [...document.querySelectorAll('.facts__label')].every(el => el.scrollWidth <= el.clientWidth + 1),
      detailsFit: document.querySelector('#novae details').scrollWidth <= document.querySelector('#novae details').clientWidth + 1,
      indexTargetsFit: [...document.querySelectorAll('.project-index a')].every(el => el.getBoundingClientRect().width >= 44 && el.getBoundingClientRect().height >= 44),
    }));
    assert(result.fits, `No horizontal overflow at ${width}px`);
    assert(result.labelsFit, `Fact labels fit at ${width}px`);
    assert(result.detailsFit, `Expanded workflow fits at ${width}px`);
    assert(result.indexTargetsFit, `Project links meet the touch target at ${width}px`);
  }
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Layout fits with enlarged text');
});

test('Reduced motion keeps content visible and direct links functional', async () => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${origin}/?lang=en#nest`);
  await page.waitForFunction(() => scrollY > 0);
  assert(await page.locator('html').evaluate(el => !el.classList.contains('motion')));
  assert.equal(await page.locator('#nest .pcard__blocks').evaluate(el => getComputedStyle(el).opacity), '1');
});

test('Identity, email and CV remain available without JavaScript', async () => {
  await context.close();
  context = await browser.newContext({ javaScriptEnabled: false });
  page = await context.newPage();
  await page.goto(origin);
  assert.equal(await page.getByRole('heading', { name: 'Desta Adriyan Saputra' }).count(), 1);
  assert.equal(await page.locator('a[href="mailto:dstaasptra@gmail.com"]').count(), 1);
  for (const name of ['CV Bahasa Indonesia (PDF)', 'CV English (PDF)']) {
    const pdf = await page.request.get(new URL(await page.getByRole('link', { name }).getAttribute('href'), origin).href);
    assert.equal(pdf.status(), 200);
    assert.match(pdf.headers()['content-type'], /application\/pdf/);
  }
});

test('New visitors get Indonesian; the toggle choice persists and drives the CV download', async () => {
  await context.close();
  context = await browser.newContext({ locale: 'en-US', viewport: { width: 1440, height: 900 } });
  page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(origin);
  assert.equal(await page.locator('html').getAttribute('lang'), 'id');
  assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Halo, saya Desta');
  const main = page.locator('.cv--hero a').first();
  assert.equal(await main.getAttribute('href'), './cv/CV_Desta_Adriyan_Saputra_ID.pdf');
  assert.equal(await main.getAttribute('download'), 'CV_Desta_Adriyan_Saputra_ID.pdf');
  assert.equal(await page.locator('.cv--hero .cv__other').getAttribute('href'), './cv/CV_Desta_Adriyan_Saputra_EN.pdf');
  await page.locator('.lang-switch__button[lang="en"]').click();
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.equal(await page.locator('.cv--hero a').first().getAttribute('download'), 'CV_Desta_Adriyan_Saputra_EN.pdf');
  assert.equal(await page.locator('#experience .timeline__row').count(), 1);
  assert.equal(await page.locator('.cert').count(), 6);
  for (const file of ['ID', 'EN']) {
    const pdf = await page.request.get(`${origin}/cv/CV_Desta_Adriyan_Saputra_${file}.pdf`);
    assert.equal(pdf.status(), 200);
  }
});

test('The WebGL stack fades in over the CSS stack on a wide screen with a mouse', async () => {
  const consoleErrors = [];
  const requested = [];
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('request', request => requested.push(request.url()));
  await page.goto(`${origin}/?lang=id`);
  await page.waitForSelector('.stack[data-gl] .stack__canvas', { timeout: 15000 });
  assert.equal(requested.filter(isSceneChunk).length, 1, 'three.js arrives as one separate chunk');
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.stack__canvas')).opacity === '1');
  assert.equal(await page.locator('canvas').count(), 1, 'One WebGL canvas');
  assert.equal(await page.locator('.stack__canvas').getAttribute('aria-hidden'), 'true');
  assert.equal(await page.locator('.stack__plate').count(), 5, 'The CSS stack stays in the DOM');
  const plates = await page.locator('.stack__plate').evaluateAll(imgs => imgs.map(img => img.currentSrc));
  const stackImages = new Set(requested.filter(url => new URL(url).pathname.startsWith('/img/stack/')));
  assert.deepEqual([...stackImages].sort(), [...new Set(plates)].sort(), 'The scene reuses the CSS plate files, no other sizes');
  assert.deepEqual(consoleErrors, [], 'No console errors');
});

test('A lost WebGL context fades the CSS stack back and keeps 3D off for the visit', async () => {
  const consoleErrors = [];
  const requested = [];
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  await page.goto(`${origin}/?lang=id`);
  await page.waitForSelector('.stack[data-gl]', { timeout: 15000 });
  const stage = page.locator('.stack__stage');
  const fadeIn = await stage.evaluate(el => getComputedStyle(el).transition);
  await page.evaluate(() => document.querySelector('.stack__canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
  await page.waitForSelector('.stack:not([data-gl])');
  assert.equal(await page.locator('canvas').count(), 0, 'The canvas is gone');
  assert.equal(await stage.evaluate(el => getComputedStyle(el).transition), fadeIn, 'Fades back with the transition it left with');
  assert.equal(fadeIn, 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)', 'The --dur-3 and --ease fade');
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.stack__stage')).opacity === '1');

  page.on('request', request => requested.push(request.url()));
  await page.setViewportSize({ width: 900, height: 900 });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(2500);
  assert.equal(await page.locator('canvas').count(), 0, 'The 3D stack is not loaded again');
  assert.equal(await page.locator('.stack[data-gl]').count(), 0);
  assert.deepEqual(requested.filter(isSceneChunk), []);
  assert.deepEqual(consoleErrors, [], 'No console errors');
});

for (const [name, options] of [
  ['a 390px touch screen', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }],
  ['reduced motion', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }],
]) {
  test(`No three.js request and no canvas on ${name}`, async () => {
    await context.close();
    context = await browser.newContext(options);
    page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    const requested = [];
    page.on('request', request => requested.push(request.url()));
    await page.goto(`${origin}/?lang=id`, { waitUntil: 'load' });
    // Past the idle callback's 2 s timeout, when the scene would have been requested.
    await page.waitForTimeout(2500);
    assert.deepEqual(requested.filter(isSceneChunk), [], 'three.js is never requested');
    assert.equal(await page.locator('canvas').count(), 0);
  });
}

test('Clicking the middle plate, or its skip link, lands on that project card', async () => {
  await page.goto(`${origin}/?lang=id`);
  await page.waitForSelector('.stack[data-gl]', { timeout: 15000 });
  const stack = await page.locator('.stack').boundingBox();
  // NEST, the middle plate, shows to the right of the two plates in front of it.
  const x = stack.x + stack.width * 0.78;
  const y = stack.y + stack.height / 2;
  await page.mouse.move(x, y);
  await page.waitForFunction(() => document.querySelector('.stack__label[data-on]')?.textContent.includes('NEST'));
  assert(await page.locator('.hero').evaluate(el => getComputedStyle(el).cursor === 'pointer'));
  await page.mouse.click(x, y);
  await waitForCard('nest');
  assert.equal(new URL(page.url()).hash, '#nest');

  await page.goto('about:blank');
  await page.goto(`${origin}/?lang=id`);
  await page.waitForSelector('.stack[data-gl]', { timeout: 15000 });
  const link = page.locator('.stack__links a[href="#nest"]');
  assert.equal(await link.evaluate(el => el.getBoundingClientRect().width), 1, 'Hidden until focused');
  await link.focus();
  const focused = await link.boundingBox();
  assert(focused.width > 44 && focused.height >= 44, 'Visible once focused, at least 44px tall');
  assert.equal(await page.locator('.hero nav').count(), 0, 'Not a second project navigation landmark');
  await page.waitForFunction(() => document.querySelector('.stack__label[data-on]')?.textContent.includes('NEST'));
  await page.keyboard.press('Enter');
  await waitForCard('nest');
  assert(await page.evaluate(() => document.activeElement?.id === 'nest'), 'Focus moves to the card');
});

// Forces the JavaScript fallback: the page then sees no CSS scroll-driven animations.
const withoutScrollTimelines = () => {
  const supports = CSS.supports.bind(CSS);
  CSS.supports = (...args) => (args.join(' ').includes('animation-timeline') ? false : supports(...args));
};

// Each moving element, with the element whose scroll position drives it.
const MOVING = [
  ['#nest .pcard__frame', '#nest'],
  ['.profile-card', '.profile-card'],
  ['.skill-card:nth-child(2)', '.skill-card:nth-child(2)'],
  ['.others__item:nth-child(2)', '.others__item:nth-child(2)'],
  ['.cert:nth-child(3)', '.certs'],
];

// Scrolls the driving element to a spot, then reads the moving element's pose.
const poseAt = async (element, anchor, place) => {
  await page.evaluate(([anchor, place]) => {
    const box = document.querySelector(anchor).getBoundingClientRect();
    // 'entering': top edge just inside the bottom of the viewport; 'passed': bottom edge above it.
    const top = place === 'entering' ? box.top + scrollY - innerHeight + 8 : box.bottom + scrollY + 50;
    scrollTo({ top, behavior: 'instant' });
  }, [anchor, place]);
  await page.waitForTimeout(250);
  return page.locator(element).evaluate(el => {
    const style = getComputedStyle(el);
    return { identity: new DOMMatrix(style.transform).isIdentity && style.rotate === 'none', opacity: Number(style.opacity) };
  });
};

for (const path of ['scroll-driven', 'fallback']) {
  for (const width of [390, 1440]) {
    test(`3D scroll motion (${path}) starts posed and ends upright at ${width}px`, async () => {
      await page.setViewportSize({ width, height: 900 });
      if (path === 'fallback') await page.addInitScript(withoutScrollTimelines);
      // Opens below the moving elements' starting points, so none of them is settled on load.
      await page.goto(`${origin}/?lang=id#experience`);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      assert.equal(await page.evaluate(() => document.documentElement.classList.contains('sda')), path === 'scroll-driven');
      for (const [element, anchor] of MOVING) {
        const entering = await poseAt(element, anchor, 'entering');
        assert(!entering.identity, `${element} starts posed as it enters (${path}, ${width}px)`);
        const passed = await poseAt(element, anchor, 'passed');
        assert(passed.identity && passed.opacity === 1, `${element} is upright once passed (${path}, ${width}px)`);
      }
    });
  }
}

test('Elements on screen when the page opens are already in their final pose', async () => {
  for (const id of ['about', 'skills', 'certifications']) {
    await page.goto('about:blank');
    await page.goto(`${origin}/?lang=id#${id}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const posed = await page.evaluate(() => [...document.querySelectorAll('.profile-card, .skill-card, .cert')]
      .filter(el => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; })
      .filter(el => !new DOMMatrix(getComputedStyle(el).transform).isIdentity || getComputedStyle(el).opacity !== '1')
      .map(el => el.className));
    assert.deepEqual(posed, [], `Visible cards rest at #${id}`);
  }
});

test('Reduced motion leaves every moving element untransformed', async () => {
  await context.close();
  context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${origin}/?lang=id#experience`);
  for (const offset of [0, 0.5]) {
    await page.evaluate(offset => scrollTo({ top: document.documentElement.scrollHeight * offset, behavior: 'instant' }), offset);
    const moved = await page.evaluate(() => [...document.querySelectorAll('.pcard__frame, .pcard__frame img, .profile-card, .skill-card, .others__item, .cert')]
      .filter(el => { const s = getComputedStyle(el); return s.transform !== 'none' || s.rotate !== 'none' || s.translate !== 'none' || s.opacity !== '1'; })
      .map(el => el.className));
    assert.deepEqual(moved, []);
  }
});

test('No sideways scroll at 360px and 390px anywhere along the page, and dealt certificates never overlap', async () => {
  for (const width of [360, 390]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(`${origin}/?lang=id`);
    const wide = await page.evaluate(async () => {
      const hits = [];
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 3) {
        scrollTo({ top: y, behavior: 'instant' });
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        if (document.documentElement.scrollWidth > innerWidth) hits.push(Math.round(y));
      }
      return hits;
    });
    assert.deepEqual(wide, [], `No horizontal overflow at ${width}px`);
  }
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('about:blank');
    await page.goto(`${origin}/?lang=id#contact`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const overlaps = await page.evaluate(() => {
      const boxes = [...document.querySelectorAll('.cert')].map(el => el.getBoundingClientRect());
      const hits = [];
      boxes.forEach((a, i) => boxes.slice(i + 1).forEach((b, j) => {
        if (a.left < b.right - 0.5 && b.left < a.right - 0.5 && a.top < b.bottom - 0.5 && b.top < a.bottom - 0.5) hits.push([i, i + j + 1]);
      }));
      return hits;
    });
    assert.deepEqual(overlaps, [], `No overlapping certificates at ${width}px`);
  }
});

test('The WebGL stack stops moving on its own within 5 s of the pointer leaving', async () => {
  // Counts animation frames from here on; motion.ts and Lenis only ask for frames on input.
  await page.addInitScript(() => {
    window.frames$ = 0;
    const request = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = callback => request(time => { window.frames$++; callback(time); });
  });
  await page.goto(`${origin}/?lang=id`);
  await page.waitForSelector('.stack[data-gl]', { timeout: 15000 });
  await page.waitForTimeout(6500);
  const before = await page.evaluate(() => window.frames$);
  await page.waitForTimeout(1000);
  assert.equal(await page.evaluate(() => window.frames$) - before, 0, 'No frames while nothing moves');

  // At rest the camera is back home, so the front plate lines up with the CSS one: same pixels, read
  // from a screenshot of a patch of NOVAÉ, first in WebGL, then with the CSS stack shown instead.
  const box = await page.locator('.stack').boundingBox();
  const clip = { x: box.x + box.width * 0.35 - 15, y: box.y + box.height / 2 + box.width * 0.115 - 15, width: 30, height: 30 };
  const mean = async () => page.evaluate(async src => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const ctx = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height }).getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, img.width, img.height).data;
    const sum = [0, 0, 0];
    for (let i = 0; i < data.length; i += 4) for (let c = 0; c < 3; c++) sum[c] += data[i + c];
    return sum.map(v => v / (data.length / 4));
  }, 'data:image/png;base64,' + (await page.screenshot({ clip })).toString('base64'));
  const webgl = await mean();
  await page.evaluate(() => {
    document.querySelector('.stack__canvas').style.visibility = 'hidden';
    Object.assign(document.querySelector('.stack__stage').style, { transition: 'none', opacity: '1' });
  });
  const css = await mean();
  assert(webgl.some(v => v > 12), `The plate shows its screenshot, not black (${webgl.map(Math.round)})`);
  assert(webgl.every((v, c) => Math.abs(v - css[c]) < 6), `WebGL ${webgl.map(Math.round)} matches CSS ${css.map(Math.round)}`);
  await page.evaluate(() => {
    document.querySelector('.stack__canvas').style.visibility = '';
    document.querySelector('.stack__stage').removeAttribute('style');
  });

  const stack = await page.locator('.stack').boundingBox();
  await page.mouse.move(stack.x + stack.width * 0.78, stack.y + stack.height / 2);
  await page.waitForFunction(() => document.querySelector('.stack__label[data-on]') !== null);
});

for (const path of ['scroll-driven', 'fallback']) {
  test(`Keyboard focus in a moving list shows its final pose and keeps the link in view (${path})`, async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    if (path === 'fallback') await page.addInitScript(withoutScrollTimelines);
    await page.goto(`${origin}/?lang=id`);
    for (const [list, links] of [['.others__list', '.others__link'], ['.certs', '.cert__verify']]) {
      await page.evaluate(list => {
        const grid = document.querySelector(list);
        scrollTo({ top: grid.getBoundingClientRect().top + scrollY - innerHeight * 0.85, behavior: 'instant' });
      }, list);
      await page.waitForTimeout(250);
      for (const link of await page.locator(links).all()) {
        await link.focus();
        // Waits out the smooth scroll that brings the link in; fails if it stays covered or off screen.
        await link.evaluate(el => new Promise((resolve, reject) => {
          const until = performance.now() + 3000;
          const check = () => {
            const box = el.getBoundingClientRect();
            const header = document.querySelector('.site-header').getBoundingClientRect().bottom;
            const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
            if (box.top >= header - 1 && box.bottom <= innerHeight + 1 && el.contains(hit)) resolve();
            else if (performance.now() > until) reject(new Error(`${el.getAttribute('aria-label')} stays covered or off screen`));
            else requestAnimationFrame(check);
          };
          check();
        }));
      }
    }
  });
}

test('The profile photo loads at 480 × 640', async () => {
  await page.goto(`${origin}/?lang=id#about`);
  const photo = page.locator('.profile-card__photo');
  await photo.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.profile-card__photo').complete);
  const size = await photo.evaluate(img => [img.naturalWidth, img.naturalHeight]);
  assert.deepEqual(size, [480, 640]);
  const response = await page.request.get(new URL(await photo.getAttribute('src'), origin).href);
  assert.equal(response.status(), 200);
  assert.match(response.headers()['content-type'], /image\/webp/);
});

test('Scroll-linked motion eases with --ease-scroll in both paths; time-based motion keeps --ease', async () => {
  await page.goto(`${origin}/?lang=id#experience`);
  const curves = await page.evaluate(() => ({
    scroll: [...document.querySelectorAll('.pcard__frame, .pcard__frame::after, .profile-card, .skill-card, .others__item, .cert')]
      .map(el => getComputedStyle(el).animationTimingFunction.split(/,\s*(?=[a-z])/)[0]),
    time: getComputedStyle(document.querySelector('.hero__title')).animationTimingFunction,
  }));
  assert.deepEqual([...new Set(curves.scroll)], ['cubic-bezier(0.4, 0, 0.2, 1)'], 'Scroll-driven animations use --ease-scroll');
  assert.equal(curves.time, 'cubic-bezier(0.16, 1, 0.3, 1)', 'The hero entrance keeps --ease');

  // Fallback: halfway through its stand-up range, --ease-scroll gives about 0.77; --ease would give
  // about 0.97.
  await context.close();
  context = await browser.newContext({ viewport: { width: 390, height: 900 } });
  page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(withoutScrollTimelines);
  await page.goto(`${origin}/?lang=id#experience`);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    const card = document.querySelector('.profile-card');
    scrollTo({ top: card.getBoundingClientRect().top + scrollY - innerHeight * 0.7, behavior: 'instant' });
  });
  await page.waitForTimeout(250);
  const enter = await page.locator('.profile-card').evaluate(el => parseFloat(el.style.getPropertyValue('--enter')));
  assert(enter > 0.72 && enter < 0.82, `Fallback progress follows --ease-scroll (${enter})`);
});
