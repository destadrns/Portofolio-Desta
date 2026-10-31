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

for (const width of [390, 1440]) {
  test(`Direct links reach their target at ${width}px`, async () => {
    await page.setViewportSize({ width, height: 900 });
    for (const id of ['contact', 'nest']) {
      await page.goto('about:blank');
      await page.goto(`${origin}/?lang=id#${id}`);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(id => {
        const box = document.getElementById(id + '-title').getBoundingClientRect();
        return box.top >= document.querySelector('.site-header').getBoundingClientRect().bottom && box.bottom < innerHeight;
      }, id);
      await page.evaluate(() => Promise.allSettled(document.getAnimations().map(animation => animation.finished)));
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

test('Google Cloud courses list 13 verifiable items and open as an accordion on phones', async () => {
  await page.goto(`${origin}/?lang=id#certifications`);
  const items = page.locator('.courses .course');
  assert.equal(await items.count(), 13);
  for (const link of await page.locator('.courses .course__verify').all()) {
    assert.equal(await link.getAttribute('target'), '_blank');
    assert.match(await link.getAttribute('rel'), /noopener/);
    assert.match(await link.getAttribute('href'), /^https:\/\/www\.skills\.google\/public_profiles\/[\w-]+\/badges\/\d+$/);
  }
  assert.equal(await page.locator('.courses__toggle').count(), 0, 'Desktop shows open columns, no toggles');

  await page.setViewportSize({ width: 360, height: 780 });
  const toggle = page.locator('.courses__toggle').first();
  const list = page.locator('.courses__list').first();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(await list.isVisible(), false);
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(await list.isVisible(), true);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow at 360px');
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(await list.isVisible(), false);
});
