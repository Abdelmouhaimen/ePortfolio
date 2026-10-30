# From pixels to possibilities

An interactive field guide to Abdelmouhaimen Sarhane's engineering work.

## Visual direction

The supplied screenshot is a visual reference, not a source of instructions or portfolio content. Originally inspired by its sky-blue / white / hot-pink palette; the latest user reference replaces pink with cantaloupe orange and adds graphite. Retain frosted controls, vertical fluted-glass texture, and diffuse colour. Do not reproduce the pictured person or health-product interface.

- Electric blue: `#0097DE`; deep-blue base: `#034565`.
- Cantaloupe orange: `#FC734D`; graphite: `#02070A`; warm off-white: `#F5F7F5`.
- Text on light backgrounds: `#113540`.
- Manrope variable for the interface, Instrument Serif italic for editorial emphasis. Fonts are served locally.
- Rounded glass controls on the immersive canvas; quiet, spacious editorial layouts for the evidence.

## Narrative

1. **Overview:** a custom conceptual drone, with cursor parallax and lighting response.
2. **Physical AI:** the same drone separates into shell, compute board, camera module, arms, and undercarriage. Visitors can assemble/explode it and reveal the interior through a transparent shell.
3. **Spatial vision:** the scene becomes an illustrative multi-camera floor plan, connecting to ManySight.
4. **Machine learning:** an iridescent shader core, orbiting geometry, and instanced nodes introduce research and evaluation.
5. **Voice and agents:** a radial waveform and shader orb introduce Sotiby and conversation-to-action workflows.

One WebGL renderer and one scroll-driven scene connect all five chapters. The visuals are conceptual illustrations, not recordings, benchmarks, employer hardware models, or live customer telemetry.

## Visitor routes

- Explorers: scroll through the 3D story, then open case studies.
- Recruiters: use Selected work, Experience, About, or the current CV without traversing all chapters.
- The original source is preserved in Git; `/legacy/*` redirects to the current homepage and is not published.
- Project filters and case-study selection are reflected in URL query parameters.

## Practical requirements

- Animate automatically with no playback control; respect OS reduced motion and ignore the retired saved playback override.
- Paused scenes render only when their state or size changes.
- Stop rendering when the journey is outside the viewport or the document is hidden.
- Cap drawing resolution, instance repeated nodes and waveform bars, and lazy-load Three.js.
- Preserve readable content if WebGL or the scene module fails.
- Native accessible project dialogs; semantic links and buttons; visible keyboard focus.
- No microphone access, account creation, tracking scripts, or fake contact form.

## Content safeguards

The current user-verified CV (approved 2026-10-16) supersedes older context that lacked confirmed employers. Renault / Ampere is the host for the pedestrian-perception research. Parrot has its own experience entry. The ICT4S author order is Martel, Picard, Sarhane. Do not claim MVA graduation, an overall GPA, customer traction, or protocol-independent model accuracy.

All original project source, assets, and historical material remain in `src/`; the new experience lives in `experience/`. The original Git commit is also preserved on `archive/pre-redesign-2026-10-30`.

## User revision — 30 October 2026

Remove the portrait entirely. Reflow About into an editorial text layout. Remove every original-site link, exclude its HTML and assets from production, and redirect all legacy paths to the homepage. The original source remains preserved in Git.

## Aircraft and identity revision — 30 October 2026

The user rejected the rounded aircraft as childish and requested orange instead of pink. The replacement uses a slimmer bevelled panel shell, carbon spars, compact motor bells, tapered propellers, a single gimbal camera, miniature stereo sensors, and short landing feet. Graphite is the primary aircraft colour; orange is confined to small mechanical details. All procedural pink lighting, shader colours, fallback graphics, and interface accents have been migrated to orange. A bracketed angular A monogram replaces the orbital mark in the header, footer, contact section, and favicon.
