# Abdelmouhaimen Sarhane — interactive portfolio

A continuous 3D field guide to computer vision, physical AI, spatial intelligence, machine learning, and voice agents. Electric blue / graphite / cantaloupe-orange art direction, custom geometry, GLSL shaders, scroll-driven scenes, and an editorial project library.

## Run

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
npm test
```

`npm test` runs Playwright browser and axe accessibility checks against the production build. Run `npm run build` first. Tests use installed Google Chrome on Windows when available; otherwise install Playwright Chromium with `npx playwright install chromium`. Set `CHROME_PATH` for another local Chrome executable.

## Site structure

- `/` — new interactive experience.
- `/#work` — four featured case studies and the complete project library.
- `/#experience` — experience and education.
- `/#about` — personal story, skills, and publication.
- `/?project=manysight` — directly open a case study.
- `/?filter=Agents#work` — filtered project library.
- `/files/Abdelmouhaimen-Sarhane-CV.pdf` — user-approved current CV.
- `/legacy/*` — redirects to the current homepage; the original site is no longer published.

The original source and assets remain in `src/`. Its pre-redesign commit is preserved on `archive/pre-redesign-2026-10-30`; the old package manifest and lockfile are also retained in `legacy/`. Compatibility changes to the original are limited to its routing base, home link, and three pre-existing CSS syntax errors.

## Edit

- `experience/data.js` — project case studies, career timeline, skill groups, and chapter copy.
- `experience/main.jsx` — page structure, filters, accessible dialogs, motion preference, and scroll coordination.
- `experience/scene.js` — continuous scene, custom shaders, learning core, and radial voice waveform.
- `experience/drone.js` — bevelled airframe, carbon spars, compact motors, stereo sensors, and gimbal camera.
- `experience/style.css` — design system and responsive layouts.
- `docs/DESIGN.md` — art direction, content safeguards, and interaction design.
- `docs/RESEARCH.md` — portfolio/UI guidance consulted before implementation and installed skills.

No remote 3D model, microphone access, server account, or tracking script is needed. Fonts are bundled locally. The canvas has a static fallback; content and projects remain available when WebGL fails. Animations run automatically with no playback button. OS reduced motion disables autonomous animation, mouse parallax, and smooth scrolling. Old saved playback overrides are ignored. The renderer pauses outside the journey and stops redrawing static paused frames.

## Deploy

The existing domain is hosted on Netlify. The tracked `netlify.toml` builds with `npm run build` and publishes `dist/`. `public/_redirects` redirects `/legacy/*` to the homepage and old root-level portfolio routes to their new equivalents. The archived site and portrait are excluded from the production build. No hosting account or audience is changed by this repository configuration.

Source synchronization uses the existing SSH remote:

```sh
git remote -v
# git@github.com:Abdelmouhaimen/ePortfolio.git
```

## Attribution

The retained original portfolio was based on [Soumyajit4419/Portfolio](https://github.com/soumyajit4419/Portfolio). That attribution is preserved here and in `legacy/original-README.md`. The new experience, procedural scenes, and interface were created for this redesign. Manrope and Instrument Serif are distributed through Fontsource under their respective open font licences.
