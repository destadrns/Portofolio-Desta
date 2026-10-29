# Portofolio Desta

One-page CV and portfolio of Desta Adriyan Saputra, in Indonesian and English. Built with React, TypeScript, and Vite.

Live: https://destadrns.vercel.app

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

The dev server prints a local address (by default http://localhost:5173). The site opens in Indonesian for every new visitor; the ID/EN toggle switches to English and the choice is remembered. Add `?lang=en` or `?lang=id` to the URL to open a specific language.

## Build

```bash
npm run build     # type check, then production build into dist/
npm run preview   # serve the production build locally
```

## Browser checks

Install the test browser once, then run the production-build smoke tests:

```bash
npx playwright install chromium
npm test
```

The checks cover direct links, the landscape menu, language changes, clipboard failures, image links,
project workflows, responsive layouts, reduced motion, and the no-JavaScript contact fallback.
CI runs the same checks after building.

The public site address used in link previews and the canonical URL comes from `VITE_SITE_URL` in `.env.production`.

## Editing content

All text lives in `src/data/`, with each string stored in both languages as `{ id, en }`:

- `profile.ts`: profile, experience, education, skills, contact
- `projects.ts`: featured and other projects
- `ui.ts`: navigation, buttons, labels, page title, and meta description

Project screenshots are in `public/img/`. The CV comes in two files in `public/cv/`, `CV_Desta_Adriyan_Saputra_ID.pdf` and `CV_Desta_Adriyan_Saputra_EN.pdf`; the Download CV button serves the one matching the active language.
