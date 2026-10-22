# CLAUDE.md — EkJap website

Project: one-page marketing site for **EkJap**, a builder of cottages in Kasauli, Himachal Pradesh. The full spec is in `EKJAP_PLAN.md`. Read it before doing anything, and build one phase at a time (section 14).

## Stack (don't add to it without asking)
- Vite + React + TypeScript, Tailwind CSS v4 (tokens in `@theme` in `src/styles/index.css`)
- GSAP 3 + `@gsap/react` (`useGSAP`): ScrollTrigger, SplitText, DrawSVGPlugin, ScrollToPlugin
- Lenis via `lenis/react`, desktop only, synced to ScrollTrigger through `gsap.ticker`
- OGL for the single hero mist shader (with PNG fallback)
- vite-imagetools for images, @fontsource-variable fonts (Newsreader + Inter Tight)
- react-hook-form + zod for the enquiry form; yet-another-react-lightbox
- Do NOT add Framer Motion/Motion, Three.js/R3F, GSAP ScrollSmoother or a UI kit.

## Rules
- All copy, figures, contacts and image alt text live in `src/data/`. Never hard-code content in components.
- Sample figures stay flagged `sample: true` and show "sample" small print until the client confirms them.
- Cottage exterior images always show a "Representative image" caption. Never add AI snow, views or amenities that aren't real.
- Content is visible by default; animation only enhances. Every section must work with `prefers-reduced-motion` and with JS disabled.
- Animate only transform, opacity, clip-path. Wrap every GSAP setup in `useGSAP` with a scope ref; use `gsap.matchMedia` for desktop/mobile/reduced-motion branches.
- One elaborate moment (the hero) plus the Kasauli postcard gallery. Everything else uses the motion primitives in `src/components/motion/`.
- Mobile-first. Check every change at 390px and 1440px.
- Colours come from the section theme CSS variables (`--bg`, `--fg`, `--muted`, `--line`), not hard-coded per component.
- Run `npm run build` and `npm run lint` before saying a phase is done.
- If the plan looks wrong or a requirement can't be met, say so before changing it.
