# Verification — 30 October 2026

`npm run build` succeeds with Vite 8.3.5.

`npm test`: **6 passed** against the production build, using installed Chrome with software WebGL:

1. All five 3D chapters render without JavaScript or shader errors.
2. Drone assembly/transparency controls, project filters, project deep links, dialog keyboard dismissal, and focus restoration work. Chapter anchors align within three CSS pixels of the viewport edge.
3. Animation starts automatically, ignores the retired saved override, and respects the OS motion preference; disabled WebGL presents a useful static fallback; the current CV is available as a PDF.
4. Layouts fit 320, 390, 768, and 1440 CSS-pixel widths. Mobile navigation and project dialogs work.
5. Axe reports no automated WCAG 2 A/AA or 2.1 AA violations on the new homepage and a representative project dialog. This is an automated check, not a claim of a complete accessibility audit.
6. Portrait and legacy links are absent; all legacy paths redirect to the homepage. The original site is excluded from the production build.

Production-preview tests cover the new WebGL experience and redirects for the retired legacy routes.

Visual review covered desktop hero, exploded drone, spatial scene, learning and voice scenes, selected projects, the About layout, and mobile hero/exploded views. It caught and corrected oversized mobile geometry, chapter-anchor offsets, and low-contrast text.

## Remaining practical limits

- Real-device GPU performance and Safari/iOS rendering were not measured.
- Original source and dependencies are retained for archival purposes and are excluded from the production build.
- Three.js produces a bundle-size advisory and is lazy-loaded. The archived site no longer has a production entry point.
- Netlify publication must be verified separately from a successful local build or Git push.
