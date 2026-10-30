# Portfolio and interface research

Reviewed 30 October 2026, before implementation.

## Portfolio structure

[Nielsen Norman Group — 5 Steps to Creating a UX-Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/)

Their research concerns UX hiring, not a controlled study of engineering portfolios. Transferable principles applied here: make the portfolio scannable, select a few detailed case studies, explain the problem and personal contribution, and give visitors an immediate route to relevant work. Four featured projects sit above the broader library; the original work is retained rather than removed.

## Motion and access

[W3C — Understanding SC 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)

Nonessential motion can be disabled. This site respects `prefers-reduced-motion`, animates by default without playback controls (per the later user request), freezes autonomous movement and cursor parallax, and removes smooth scrolling when motion is off. Scroll still selects the illustrative chapter without an animated transition.

[Vercel — Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)

Applied semantic navigation, focus-visible states, explicit image dimensions, local fonts, native dialog behaviour, touch alternatives, descriptive button names, and URL-reflected filter/detail state. Accessible text remains in the DOM independently of the canvas.

## Rendering

[Three.js — Responsive Design](https://threejs.org/manual/pages/responsive.html)

CSS determines the canvas display dimensions. A ResizeObserver updates the drawing buffer and camera aspect. Drawing resolution is capped at 1.6× device-independent resolution, and mobile scenes use a smaller model scale and a dedicated composition.

[Three.js — ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)

Custom GLSL materials provide a flowing iridescent learning/voice core and camera-scan fields. PMREM lighting is generated locally from RoomEnvironment. No remote 3D assets are required.

## Installed skills

- `vercel-labs/agent-skills`: web-design-guidelines.
- `cloudai-x/threejs-skills`: threejs-shaders, threejs-animation, threejs-interaction.

Installed for Codex at user scope. The repository itself contains no runtime dependency on these skills.
