# EkJap — Hill-Station Cottages, Kasauli
## Build plan for Claude Code

**What this is:** the full plan for a one-page, Awwwards-grade marketing site for **EkJap**, a builder of cottages in Kasauli, Himachal Pradesh. Hand this file (plus `CLAUDE.md` and the `/assets` folder) to Claude Code and build phase by phase (section 14).

**Built from:** the earlier `PLAN.md` (section flow, motion rules, content ground rules) and the hero mockup (dark pine palette, giant serif "EkJap" with mist rolling across the letters, a lit cottage on the hill, amber CTA). Where this plan differs from `PLAN.md`, this plan wins.

**Stack:** React + TypeScript + Tailwind CSS v4, with GSAP, Lenis and a small WebGL mist shader (section 3).

---

## 0. The big idea: one day in the hills

The page is a single day in Kasauli, told by scrolling. The background and light change as you go down, so the site feels like time passing rather than a stack of sections.

| Time of day | Sections | Base colour | Feeling |
|---|---|---|---|
| **Pre-dawn** | Preloader, Hero | Deep pine (dark) | Mist on the ridge, one window lit |
| **Morning mist** | Intro, At a glance | Mist paper (light) | You've walked up through the cloud |
| **Daylight** | The town (Kasauli), Cottages | Paper / warm white | Clear, factual, bright |
| **Afternoon** | Inside, Materials | Warm linen | Timber, texture, comfort |
| **Evening fire** | Why here, Life here | Dark with ember glow | Fireplace, lit rooms |
| **Golden hour** | Site plan, Builder, FAQ | Soft stone | Practical, trustworthy |
| **Dusk → night** | Enquire, Footer | Dusk blue-green → pine | Come up and see it |

Background colour cross-fades between these themes as each section reaches the middle of the viewport (section 6.3). Section edges are softened with a **mist band** (a soft blurred fog strip) so changes feel like weather, not hard cuts.

**Restraint rule (from PLAN.md, kept):** the hero is the one elaborate moment. One supporting "wow" is allowed (the Kasauli town gallery). Everything else uses a small, consistent set of reveals.

---

## 1. Brief

| | |
|---|---|
| Brand | **EkJap** (wordmark set in the display serif, as in the mockup) |
| Business | Real-estate builder: cottages and holiday homes |
| Location | Kasauli, Himachal Pradesh (confirm the exact site / village) |
| Product | ~14 cottages in 3 types (**sample numbers** until the client confirms) |
| Audience | Families and professionals from Chandigarh, Delhi NCR and Punjab buying a second or holiday home; investors wanting rental income. **Mostly on mobile.** |
| Goal | Make people want to visit, then capture a **site-visit enquiry** (form + WhatsApp) |
| Scope | Frontend only, static hosting, no backend yet |
| Media | Photos only, no video. All motion comes from code |

### Content ground rules (keep these: they protect the client legally)
- Cottage **exterior images are representative** until real renders exist. Each carries a small "Representative image" caption.
- **Don't show what isn't there.** No AI-added snow, views, buildings or amenities the real site doesn't have. Misleading property advertising is a RERA problem.
- **Town photos must be of Kasauli** (or clearly labelled otherwise).
- Show the **RERA registration number** in the builder section and footer once provided.
- Every figure (altitude, drive time, sizes, counts) is a **sample** until confirmed. Keep all of them in one data file so they are easy to replace.

---

## 2. Awwwards references and what to borrow

Study these for pace and craft. Borrow ideas, never visuals or copy.

| Reference | Why it's relevant | Borrow |
|---|---|---|
| **Springs residence** by Vide Infra (Awwwards Site of the Day) — https://videinfra.com/work/springs | A residence site built around calm nature, using WebGL motion and subtle water animations as the brand metaphor | Our equivalent is **mist**: a WebGL fog layer as the signature motif, kept subtle |
| **Ever residential** by Vide Infra (Awwwards SOTD) — https://videinfra.com/work/ever | Magazine-like homepage, visual apartment selection with filters | Editorial pacing; the **interactive site plan** with filter chips |
| **Cozy Lake Cabin Rental** — https://www.awwwards.com/inspiration/mobile-cozy-lake-cabin-rental | Cabin rental; has a day/night gallery toggle, scroll-revealed phrases with synced images, one-page progress navigation | Day → dusk idea, phrase reveals, the **altitude progress gauge** |
| **Røros Hotel** — https://www.awwwards.com/inspiration/hotel-pages-roeros-hotel-roroshotellene | Scandinavian mountain-town hotel; dynamic nav + booking bar, experience sections | Sticky "Book a site visit" bar on mobile; town-as-experience storytelling |
| **Naka Lodge** — https://www.awwwards.com/inspiration/events-naka-lodge | Lodge site with sticky + parallax sections and an interactive carousel | Sticky "Life here" layout |
| **Mira Real Estate** — https://www.awwwards.com/inspiration/project-page-mira-real-estate | Property selection, company history, client roadmap | Builder timeline / roadmap |
| **Elyse Residence** (Webflow template the client liked) | Structure of the original plan | Big-name hero, scattered numbers, cards over full-bleed interior, numbered FAQ |

Browse more under Awwwards → Real Estate and Hotel / Restaurant categories, and the "Scrolling" and "GSAP" technology filters.

---

## 3. Tech stack

### Core
| Concern | Choice | Notes |
|---|---|---|
| Build tool | **Vite** + React + **TypeScript** | Fast, simple, static output |
| Styling | **Tailwind CSS v4** | Design tokens defined in `@theme` in `src/styles/index.css` |
| Pre-rendering / SEO | **vite-react-ssg** (or equivalent prerender) | Ship real HTML so Google and WhatsApp link previews see content. If Phase 2 adds many pages, consider Next.js with static export instead |
| Animation | **GSAP** (latest 3.x) + **@gsap/react** (`useGSAP`) | All plugins are free now, including SplitText and DrawSVG. Use ScrollTrigger, SplitText, DrawSVGPlugin, ScrollToPlugin |
| Smooth scroll | **Lenis** via `lenis/react` (`ReactLenis`) | Desktop only; native scroll on touch. Sync with ScrollTrigger (section 6.1) |
| WebGL mist | **OGL** (tiny WebGL library, ~25 KB) | One full-screen fragment shader for the hero fog. Falls back to CSS/PNG mist |
| Images | **vite-imagetools** | Generates AVIF/WebP `srcset`s and tiny blur placeholders at build time |
| Fonts | **@fontsource-variable/** packages (self-hosted) | No layout shift, no Google request |
| Forms | **react-hook-form** + **zod** | Validation; submit to Formspree / Web3Forms / Google Apps Script (decide later) |
| Lightbox | **yet-another-react-lightbox** | "See all" photos on mobile |
| Utilities | `clsx`, `tailwind-merge` | Class composition |
| Icons | `lucide-react` (very few) | Arrow, menu, close, WhatsApp handled as inline SVG |

### Deliberately *not* used
- **No Framer Motion / Motion alongside GSAP.** One animation system only.
- **No Three.js / React Three Fiber.** OGL is enough for one shader; keeps the first screen light.
- **No GSAP ScrollSmoother.** Lenis does smooth scrolling and leaves native scroll intact.
- No UI kit. Every component is bespoke.

### Hosting & tooling
- Vercel, Netlify or Cloudflare Pages.
- ESLint + Prettier (with `prettier-plugin-tailwindcss`).
- Optional: Playwright smoke test (page loads, form validates, reduced-motion renders all content) and Lighthouse CI.

---

## 4. Design system (from the hero mockup)

### 4.1 Palette — Tailwind v4 `@theme` tokens

```css
@theme {
  /* Night / pine */
  --color-pine-950: #121813;   /* hero background, footer */
  --color-pine-900: #1A221C;
  --color-pine-800: #243026;
  --color-pine-700: #344236;
  --color-moss-500: #66705C;   /* muted foliage, secondary strokes */

  /* Mist / paper */
  --color-mist-50:  #F3F0E9;   /* light section background */
  --color-mist-100: #ECE8E0;   /* the beige seen around the mockup */
  --color-mist-200: #DCD7CC;   /* borders on light */
  --color-fog-300:  #B9BDB4;   /* mist tint in the shader */
  --color-cream:    #F1ECE2;   /* text on dark: the "EkJap" letter colour */
  --color-stone-500:#8B877D;   /* muted text */
  --color-ink-900:  #1C1F1A;   /* body text on light */

  /* Ember / light in windows */
  --color-ember-400:#E9A35C;   /* primary CTA (the "Book a site visit" pill) */
  --color-ember-300:#F4C07D;   /* window glow highlight */
  --color-ember-600:#C27A35;   /* hover / pressed */

  /* Dusk */
  --color-dusk-800: #1E2A2E;   /* enquiry section base */

  /* Site plan status */
  --color-status-available: #7E9B6A;
  --color-status-hold:      #D9A441;
  --color-status-sold:      #9C5E52;
}
```

Text on dark is always `cream` (not pure white). Text on light is `ink-900`. The amber `ember-400` is used **only** for the main CTA, lit windows and the active state on the site plan, so it always means "this is where the warmth / action is".

### 4.2 Typography

| Role | Font (free, self-hosted) | Usage |
|---|---|---|
| **Display** | **Newsreader Variable** (has optical sizes and a beautiful italic). Paid alternative closer to the mockup: Tiempos Headline or Canela | "EkJap" wordmark, section titles, the italic tagline "Cottages above the mist" |
| **Sans / UI** | **Inter Tight Variable** (alt: Barlow) | Body, nav, buttons, labels |
| **Labels** | Inter Tight, uppercase, tracking 0.14em, 11–13px | Eyebrows ("COTTAGES · KASAULI, HIMACHAL PRADESH"), captions, metres, plot numbers |

**Type scale (fluid with `clamp`):**
- Wordmark: `clamp(5.5rem, 22vw, 22rem)`, tracking −0.035em, line-height 0.85
- H2 section title: `clamp(2.6rem, 6vw, 6rem)`, line-height 0.95, mixing regular + *italic* words (e.g. "A window *above* the clouds")
- H3: `clamp(1.6rem, 2.6vw, 2.4rem)`
- Body: 17–18px, line-height 1.6, max 60ch
- Label: 12px uppercase tracked

### 4.3 Shape, spacing, components
- **Buttons:** pill shape (full radius). Primary = filled `ember-400` with `pine-950` text and a soft amber glow (`box-shadow: 0 0 24px rgb(233 163 92 / .35)`). Secondary = 1px cream outline, transparent fill (the "See the cottages" button).
- **Cards:** 20–28px radius; glass cards over photos use `backdrop-filter: blur(14px)` with a 1px cream border at 15% opacity.
- **Hairlines:** 1px lines at 15% opacity (like the line under the nav in the mockup) are a recurring motif.
- **Grid:** 12 cols desktop / 6 tablet / 4 mobile. Max content width 1320px. Side gutter 16px mobile → 48px desktop.
- **Section spacing:** 140–180px desktop, 80–100px mobile.
- **Breakpoints:** mobile-first; `sm 480`, `md 900`, `lg 1280`, `xl 1440`.
- **Film grain:** a very subtle animated noise overlay (2–3% opacity, fixed, `pointer-events: none`) on dark sections only. Adds the analogue, premium feel common on award sites.

---

## 5. Site flow (one long page)

Order logic: **feel it → understand it → see the place → see the homes → believe the builder → ask.**

| # | Section | Anchor | Theme | Signature motion |
|---|---|---|---|---|
| 0 | Preloader | — | night | Altitude counter + ridge line draws |
| 1 | Navigation | — | adapts | Transparent → solid on scroll |
| 2 | **Hero** | `#top` | night | **Layered parallax + WebGL mist over the wordmark** |
| 3 | Intro | `#intro` | mist | Rise through the fog; heading line reveal |
| 4 | At a glance | `#glance` | mist | Count-up numbers, contour lines draw |
| 5 | **Kasauli — the town** | `#kasauli` | day | **Pinned horizontal postcard gallery + route map** |
| 6 | The cottages | `#cottages` | day | Elevation line drawings draw in |
| 7 | Inside | `#inside` | linen | Editorial grid, image reveals |
| 8 | Materials (optional) | `#materials` | linen | Swatches fade up |
| 9 | Why here | `#why` | ember | Pinned fireplace photo, glass cards rise |
| 10 | Life here | `#life` | ember | Sticky title + image wipe swaps |
| 11 | Site plan | `#siteplan` | stone | Road draws, plots drop in; interactive |
| 12 | The builder | `#builder` | stone | Timeline progress line |
| 13 | FAQ | `#faq` | stone | Accordion |
| 14 | Enquire | `#enquire` | dusk | Form card over dusk photo |
| 15 | Footer | — | night | Giant "EkJap" wordmark with mist drifting across it (echo of the hero) |

Navigation links: **Cottages · Kasauli · Site plan · Builder** + **Book a site visit** (amber pill), matching the mockup.

---

## 6. Global motion system

### 6.1 Setup
- `src/lib/gsap.ts` registers `ScrollTrigger, SplitText, DrawSVGPlugin, ScrollToPlugin` once.
- `src/lib/SmoothScroll.tsx` wraps the app in `<ReactLenis root>` **on pointer-fine devices only** and syncs it with GSAP:
  - `lenis.on('scroll', ScrollTrigger.update)`
  - drive Lenis from `gsap.ticker` (`lenis.raf(time * 1000)`), `gsap.ticker.lagSmoothing(0)`, and set `autoRaf: false` on Lenis.
- All anchor links scroll via `lenis.scrollTo('#id', { offset: -navHeight, duration: 1.4 })`.
- Lenis `lerp` ≈ 0.08–0.1 (calm, not floaty). Add `data-lenis-prevent` to the site-plan scroller and mobile menu.
- Every animation lives inside `useGSAP()` with a scope ref so it cleans up on unmount.
- Use `gsap.matchMedia()` to split desktop / mobile / `prefers-reduced-motion` behaviour.

### 6.2 Motion primitives (build these as reusable components first)

| Component | Behaviour | Defaults |
|---|---|---|
| `<SplitHeading>` | SplitText by lines (masked), lines slide up from 110% with stagger | 1.0s, `power4.out`, stagger 0.08 |
| `<FadeUp>` | y 32 → 0, opacity 0 → 1 | 0.9s, `power3.out`, starts at 85% viewport |
| `<RevealImage>` | `clip-path: inset(100% 0 0 0)` → `inset(0)` while the inner image scales 1.15 → 1 | 1.2s, `expo.out` |
| `<Parallax>` | Inner image moves −8% → 8% inside an `overflow:hidden` frame, scrubbed | `scrub: true` |
| `<DrawSvg>` | DrawSVG 0% → 100% on each path, staggered | 1.6s, `power2.inOut` |
| `<CountUp>` | Number tweens 0 → value once, tabular figures to avoid jitter | 1.6s, `power2.out` |
| `<MistBand>` | Soft fog strip at section boundaries, drifts sideways slowly and moves at a different scroll speed | CSS transform loop + scrub |
| `<Magnetic>` | Buttons pull a few px toward the cursor (desktop only) | `quickTo`, 0.4s |

### 6.3 Section themes
Each section has `data-theme="night | mist | day | linen | ember | stone | dusk"`. One ScrollTrigger per section (`start: 'top 50%'`, `end: 'bottom 50%'`) tweens CSS variables on `<html>` (`--bg`, `--fg`, `--muted`, `--line`) over 0.8s. Components only ever use these variables, so colours flow automatically.

### 6.4 Rules
- **Content is visible by default.** Animations only add on top. With JS off or `prefers-reduced-motion`, everything is readable and static (reduced motion = simple 0.3s opacity fades, no parallax, no pinning, no shader animation).
- Max ~1.2s for any animation except the hero intro.
- **About one motion idea per section.** Don't animate every element.
- Only animate `transform`, `opacity` and `clip-path`. Never layout properties.
- Call `ScrollTrigger.refresh()` after fonts load (`document.fonts.ready`) and after images in pinned sections load.

### 6.5 Small extras (desktop only, optional)
- **Custom cursor:** a small cream dot that grows into a ring with a label ("View", "Drag", "Plot 07") over interactive items.
- **Altitude gauge:** a thin vertical line on the right edge with a tick moving from "1,790 m" (gate) to "1,850 m" (ridge) as you scroll, plus the current section name. Hidden on mobile.
- **Film grain** on dark sections (section 4.3).

---

## 7. The hero (the captivating moment)

### 7.1 Composition (matches the mockup)
```
┌───────────────────────────────────────────────────────────────────────┐
│ EkJap        Cottages  Kasauli  Site plan  Builder   ( Book a site visit )│
│ ───────────────────────────────────────────────────────────────────── │
│                                         COTTAGES · KASAULI, HIMACHAL PRADESH
│                                         Cottages above the mist  (italic)
│   E k J a p     ← giant cream serif     Fourteen cottages on a pine ridge…
│   ~~~~ mist drifting across the         ( See the cottages )
│        lower half of the letters ~~~~                                │
│   forested hills fading into fog            ▲ pines   ⌂ lit cottage  │
│                          Scroll                                      │
│   pines (foreground)       │              1,850 m above sea level    │
└───────────────────────────────────────────────────────────────────────┘
```

### 7.2 Layers (back → front)
| z | Layer | Asset | Notes |
|---|---|---|---|
| 0 | Sky / night gradient | CSS gradient `pine-950 → pine-900` + faint noise | No image needed |
| 1 | Far ridges | `hero-01-ridges-far.webp` | Low-contrast silhouettes, mostly hidden in fog |
| 2 | **Back mist** | CSS: 2 tiling fog PNGs drifting at different speeds | Sits *behind* the letters, between ridges |
| 3 | **Wordmark "EkJap"** | Real `<h1>` text (SEO + accessibility), cream | Bottom-left, ~60% width on desktop |
| 4 | **Front mist (WebGL)** | `<MistCanvas>` (OGL shader) | Concentrated in a band over the lower half of the letters, exactly like the mockup |
| 5 | Mid hills + cottage | `hero-02-hills-cottage.png` (transparent) | Right side; cottage window is a separate glow element |
| 6 | Window glow | CSS radial gradient div positioned over the cottage windows, `ember-300`, blend `screen` | Gentle flicker (opacity 0.85–1, random every 2–4s) |
| 7 | Foreground pines | `hero-03-pines-fg.png` (transparent) | Bottom-left and bottom edge, darkest layer |
| 8 | UI | Eyebrow, italic tagline, paragraph, CTA, "Scroll" + line, altitude label | |

### 7.3 Mist shader spec (`src/sections/Hero/MistCanvas.tsx`)
- OGL `Renderer` (alpha: true, `dpr: Math.min(devicePixelRatio, 1.25)`), full-screen `Triangle`, one `Program`.
- Fragment shader: **fractal noise (fbm, 5 octaves)** sampled twice at different scales and speeds (domain-warped) to make rolling, wispy fog.
- Uniforms: `uTime`, `uResolution`, `uMouse` (eased, desktop only, pushes fog slightly), `uDensity` (0.55 at rest → 1.0 when scrolling out), `uColor` (`fog-300`), `uBandCenter` / `uBandWidth` (vertical band over the letters' lower half), `uFadeIn`.
- Output: `vec4(uColor, alpha)` where alpha = noise × band mask × density. Keep max alpha around 0.75 so letters stay legible.
- Performance: render at reduced resolution (scale the canvas by 0.6 and stretch with CSS), pause the RAF loop when the hero is off-screen (IntersectionObserver) or the tab is hidden, target 60fps on a mid laptop.
- **Fallback** (no WebGL, low-end device via `navigator.hardwareConcurrency <= 4`, or reduced motion): two fog PNGs (`mist-01.webp`, `mist-02.webp`) with CSS `translateX` loops at 90s and 140s, same band position.

### 7.4 Intro timeline (on load, after the preloader)
| t (s) | What happens |
|---|---|
| 0.0 | Screen is pine-950. Ridges, hills and pines fade in from `blur(12px)` and `scale(1.08)` to sharp and `scale(1)` (1.6s, `expo.out`), back layers slightly earlier |
| 0.3 | Front mist fades in at high density, covering the lower screen |
| 0.5 | **"EkJap" letters rise** from a mask one by one (SplitText chars, y 100% → 0, stagger 0.07, 1.2s `power4.out`) |
| 0.9 | Mist density eases from 0.9 → 0.55 over 2s, so the fog *thins and reveals* the letters |
| 1.1 | Nav slides down (opacity + y −20 → 0), hairline under nav draws left → right |
| 1.3 | Eyebrow, then tagline lines (line reveal), then paragraph fade up |
| 1.7 | CTA scales 0.9 → 1 with fade; amber glow breathes once |
| 1.9 | **Cottage window lights up** (opacity 0 → 1 with a quick flicker). "Someone's home." |
| 2.1 | "Scroll" label + the vertical line draws down, then loops a light travelling down the line every 2.5s |
| 2.1 | "1,850 m above sea level" counts up from 0000 |

### 7.5 Scroll-out (desktop: hero pinned for ~120% of viewport height, `scrub: 1`)
- Foreground pines scale 1 → 1.35 and move down/out (fastest layer).
- Mid hills move up slightly slower; far ridges barely move (depth).
- Wordmark scales 1 → 1.12 and drifts up; letter-spacing opens a little.
- Mist `uDensity` rises 0.55 → 1.0 and the band widens to fill the screen. The fog colour shifts from `fog-300` toward `mist-50`.
- At the end the screen is fully fogged in `mist-50`, which is exactly the background of the Intro section. **You've walked up through the cloud.** The Intro heading then reveals out of the fog.
- Copy column fades and lifts out in the first 30% of the scroll.

### 7.6 Mouse (desktop)
Each layer offsets a few px toward the cursor (far 2px, letters 6px, mid 10px, pines 16px) with `gsap.quickTo`, 0.8s ease. Mist reacts subtly via `uMouse`.

### 7.7 Mobile hero
- No pinning, no mouse effects. Still layered for depth (CSS parallax only on scroll start).
- Shader runs at very low resolution, or falls back to PNG mist.
- Layout: eyebrow at top under the nav → wordmark spanning full width in the middle with mist over it → tagline (italic) + short paragraph + "Book a site visit" button at the bottom → small "Scroll".
- Height: `100svh` (avoid mobile browser bar jumps).

### 7.8 Hero copy
- **Eyebrow:** COTTAGES · KASAULI, HIMACHAL PRADESH
- **H1:** EkJap
- **Tagline (italic):** Cottages above the mist
- **Paragraph:** Fourteen cottages on a pine ridge, at the height where the clouds come to rest. Under two hours from Chandigarh. *(sample, confirm drive time)*
- **CTAs:** Book a site visit (amber, in nav) · See the cottages (outline, in hero)
- **Corner label:** 1,850 m above sea level *(sample)*

> Note: the paragraph in the mockup image is placeholder gibberish from the image generator. Use the copy above.

---

## 8. Preloader (≤ 1.6s)
- Pine-950 screen. A thin ridge-line SVG (`loader-ridge-line.svg`) draws left → right (DrawSVG).
- A small counter in label style climbs `0000 → 1850 m`.
- The "EkJap" wordmark appears small in the centre, then the whole loader **lifts away like fog** (`clip-path` from the bottom with a soft mist edge image) to reveal the hero, which starts its own intro timeline.
- Skip on repeat visits in the same session (`sessionStorage`, wrapped in try/catch) and when reduced motion is on.
- CSS fallback hides it after 3s if JS fails. Never block content.
- Preload the hero layers and fonts while it plays; leave only when they're ready or 1.6s passed (whichever is later, max 3s).

---

## 9. Sections in detail

Every section uses the same header pattern: **small label → large title (regular + italic words) → one paragraph of 40–60 words.**

### 9.1 Intro — "A window *above* the clouds"
- **Theme:** mist (light).
- **Layout (desktop):** a centred portrait image framed like a window; the 3-line heading overlaps the image edges ("A WINDOW" above, "*above*" over the image, "THE CLOUDS" below); paragraph bottom-right. Mobile: stacked.
- **Image:** `intro-01-window-dusk` — a window looking out over misty hills at dusk, two chairs and two cups of tea on the sill. *(Clean up: remove headphones/cables, fix moiré on the window screens.)*
- **Motion:** heading line reveal emerging from the hero fog; image reveal (clip from bottom); slow parallax inside the window frame.
- **Copy:** "Morning comes in slowly here. Mist fills the valley, the pines drip, and by ten the whole range is out. EkJap is built for that slow morning, and for the fire you light at six."

### 9.2 At a glance
- **Theme:** mist.
- **Content:** 5 numbers scattered across the grid at different sizes (not in a row), each with a small label:
  - **1,850 m** above sea level
  - **1 h 45 m** from Chandigarh *(sample; verify actual drive)*
  - **14** cottages in 3 designs
  - **62%** of the land left as forest
  - **22°** average June afternoon
- **Background:** faint topographic contour lines generated in code (SVG), ideally from the real site terrain. They draw in slowly.
- **Motion:** numbers fade from `blur(8px)` to sharp while counting up; contours draw.
- **Small print:** "Sample figures, to be replaced with surveyed numbers."

### 9.3 Kasauli — the town (second "wow" moment; uses the client's city photos)

**Purpose:** sell the hill station itself. Buyers are buying Kasauli as much as a cottage.

**Part A — intro block**
- Label: THE TOWN · Title: "A town that kept its *old pace*"
- Paragraph: "Colonial lanes, stone churches and pine forest, a short drive from the plains. Close enough for weekends, quiet enough to stay longer."
- Layout: large town photo left (~55%) with the title overlapping its right edge; paragraph right.

**Part B — pinned horizontal "postcards" (desktop)**
- The section pins; vertical scroll moves a strip of 5–6 tall photo "postcards" sideways.
- Each postcard: photo with inner parallax, place name in display serif, a label like "8 MIN FROM EKJAP", and one line of description. Cards have slight random rotation (±1.5°) that straightens as they reach the centre.
- A thin "road" line runs under the cards with a small dot travelling along it as you scroll (progress).
- Mobile: a native horizontal swipe row with `scroll-snap`, no pinning.

**Part C — the drive (route map)**
- A simple line map in the brand style: **Chandigarh → Pinjore → Parwanoo → Dharampur → Kasauli → EkJap**, with drive times at each stop.
- The route path draws itself as you scroll (DrawSVG); town dots pop in as the line reaches them; the EkJap dot glows amber.
- Make the SVG by hand-simplifying the real route (trace from a map screenshot). Mark times as approximate.

**Town photo slots** (map the client's photos to these; rename files accordingly):

| File | Ideal subject | Used where | Description line (draft) |
|---|---|---|---|
| `town-01-mall-road.jpg` | Mall Road / market lane | Postcard | The old market, still shut by nine |
| `town-02-christ-church.jpg` | Christ Church, stone tower | Part A main image or postcard | A stone church from 1853 |
| `town-03-sunset-point.jpg` | Sunset over layered hills | Postcard; enquiry background alternative | Where the town gathers at six |
| `town-04-forest-trail.jpg` | Gilbert Trail / pine path | Postcard | A cliffside walk through pine |
| `town-05-heritage-lane.jpg` | Colonial cottages, lanes, rooftops | Postcard | Tin roofs and wooden verandas |
| `town-06-mist-valley.jpg` | Valley filled with cloud | Postcard; a different crop from the hero | When the clouds sit below you |

Nearby places to **verify locally** before publishing: Christ Church, Mall Road, Sunset Point, Gilbert Trail, Monkey Point (in an Air Force area; check access rules), Baptist Church, Kasauli Brewery heritage area. Distances are placeholders.

If the client has fewer photos, use 4 postcards. If a photo isn't from Kasauli, don't use it here.

### 9.4 The cottages — three types
- **Theme:** day.
- **Layout (desktop):** pinned horizontal panels, one per type (≈100vw each). Left half: label "01 / 03", name, line-drawn elevation (SVG), 3 specs, 2–3 sentence description, buttons. Right half: large image with "Representative image" caption. Placeholder floor plan sits faintly (8% opacity) behind the text.
- **Mobile:** vertical stack of three cards, elevation above the image.
- **Motion:** elevation strokes draw in as each panel arrives (lit-window strokes in `ember-400` draw last and glow); image reveal; spec numbers count up.

| Type | Count (sample) | Layout | Size (sample) | Description (draft) | Image |
|---|---|---|---|---|---|
| **The Pine** (A-frame) | 6 | 2 bed + loft | 1,150 sq ft | An A-frame with a double-height glass gable facing the valley. A sleeping loft under the ridge beam, and a deck that fits six chairs and a fire bowl. | `cottage-01-pine-aframe` — pair of A-frame cottages among pines |
| **The Ridge** (stone + timber, set into the slope) | 5 | 3–4 bed | 1,850 sq ft | A family home set into the slope, with a dry-laid stone base and a planted roof. Floor-to-ceiling glass on the south face. | `cottage-02-ridge-stone` — stepped stone and timber homes on terraces |
| **The Deodar** (cabin on posts) | 3 | 1–2 bed | 780 sq ft | A compact cabin raised among the trees, with a wraparound deck nearly half its floor area. Built for two. | `cottage-03-deodar-cabin` — small deck cabins on a hillside |

- **Specs row:** Layout · Built-up area · Price "On request".
- **Buttons:** "Ask about The Pine" (pre-fills the form) · "View plan" (opens a modal with the floor plan).
- SVGs: `elevation-the-pine.svg`, `elevation-the-ridge.svg`, `elevation-the-deodar.svg`, `floorplan-*-PLACEHOLDER.svg` (all use `currentColor`; secondary strokes via `--svg-soft`, glazing via `--svg-accent`).

### 9.5 Inside
- **Theme:** linen.
- **Title:** "Inside, it's *warm*" · Paragraph: "These rooms are from homes EkJap has finished in the hills: timber walls, pine ceilings, painted cabinets worn back by hand. The cottages will be fitted in the same spirit." *(Confirm with client these are their own homes.)*
- **Layout:** asymmetric editorial grid of 6 images (one large landscape, one tall portrait set lower, two small, etc.), with one pull-quote between rows. Each image caption: room · key material.
- **Mobile:** single column, 4 images + "See all photos" (lightbox).
- **Motion:** image reveals with slight stagger; inner parallax; on hover the image zooms 1.04 and the caption slides up.

| File | Description | Caption |
|---|---|---|
| `inside-01-lounge-fireplace` | Living room with fireplace and live-edge timber wall | Lounge · live-edge timber |
| `inside-02-reading-corner` | Armchair by a window, distressed painted cabinet | Reading corner · hand-worn paint |
| `inside-03-guest-room` | Bedroom with a glazed door to the garden | Guest room · garden door |
| `inside-04-kitchen-dining` | Long dining table for eight, open kitchen | Kitchen · seats eight |
| `inside-05-main-bedroom` | Bedroom with timber-panelled wall | Main bedroom · timber panelling |
| `inside-06-attic-studio` | Attic room under a vaulted pine ceiling | Attic studio · pine ceiling |

### 9.6 Materials (optional, short)
- 4 round swatches cut from the interior photos, each with a name and one line: **Live-edge timber** (bark line left on) · **Pine boarding** (tongue-and-groove ceilings) · **Worn paint** (painted, then rubbed back by hand) · **Dry-laid stone** (local stone for plinths and terraces).
- 4 columns desktop, 2×2 mobile. Staggered fade up; swatch rotates slightly on hover.
- Files: `texture-timber`, `texture-pine`, `texture-paint`, `texture-stone`.

### 9.7 Why here (evening, by the fire)
- **Theme:** ember (dark, warm).
- **Background:** `inside-01-lounge-fireplace`, full-bleed, darkened with a gradient; the fireplace area gets a soft animated warm glow overlay.
- **Cards:** 4 glass cards with an arched top edge (a nod to cottage windows): **Privacy by design** (no two windows face each other) · **Built from the hill** (local stone, timber and slate) · **Looked after while you're away** (optional management and rentals) · **A view from every plan** (each plot oriented to the valley).
- **Desktop:** background pinned; cards rise one by one with scroll. **Mobile:** stacked cards over a static background.

### 9.8 Life here (amenities)
- **Theme:** ember.
- **Desktop:** left column sticky with the current item's number, title and two lines, plus a thin vertical progress line. Right: two overlapping images that swap with a **horizontal-slice wipe** as you scroll.
- **Mobile:** simple list of image + title + text.
- **Items (confirm with client):** Fireplace lounge & clubhouse · Viewing deck at the ridge · Forest trails · 24×7 caretaker & security · Power and water backup · Rental management.
- **Images:** a mix of interiors and town/place photos until real amenity photos exist (caption accordingly).

### 9.9 Site plan (interactive)
- **Theme:** stone.
- **Data:** `src/data/plots.sample.json` — road path, 14 plots `{ id, type, beds, area, elevation, facing, view, status, x, y }`. Replace with the architect's layout later.
- **Map (SVG generated from data):** faint contours with elevation labels, the road from the gate to the viewing deck, small tree marks, plot icons (shape per cottage type) with numbers, north arrow, legend (Available / On hold / Sold).
- **Desktop:** map ~2/3 width; sticky details card on the right. **Mobile:** map scrolls sideways inside its frame (`data-lenis-prevent`); card below.
- **Interaction:** hover, tap or keyboard-focus a plot → card updates (plot no., type, layout, area, elevation, facing "S · 175°", main view, status). Button "Ask about plot 07" scrolls to the form and pre-fills type + plot. Filter chips (All / The Pine / The Ridge / The Deodar) dim other plots. One plot selected on load so the card is never empty. Selected plot pulses with an amber ring.
- **Motion:** road draws in, then plots drop in with a stagger.
- **Label:** "Sample availability" until connected to real data.

### 9.10 The builder
- **Theme:** stone.
- **Layout:** past-project photo left (`builder-01-past-project`); right: title, short paragraph, numbers row (years active, homes delivered, towns), progress timeline, RERA line.
- **Timeline (samples):** 1 Land & approvals — **Done** · 2 Roads, water, retaining walls — **Now** · 3 First six cottages — **2027** · 4 Handover, phase one — **2028**. A vertical line fills up to "Now" as you scroll; the "Now" dot pulses amber.
- **Optional:** row of 3–4 past-project thumbnails.
- Placeholders: builder legal name, years, projects, RERA number.

### 9.11 FAQ
- **Theme:** stone.
- **Layout:** large title left ("Questions, *answered*"), numbered accordion right; one open at a time; height animates with GSAP; `+` rotates to `×`.
- **Questions (answers from client):** Is the project RERA registered? · When is possession? · Can I rent my cottage out when I'm not there? · Water, power backup and road access in winter? · Does it snow at the site? · How far from Chandigarh and from Kasauli Mall Road? · Payment plans and home loans? · Can I customise the interiors?
- Add `FAQPage` structured data (JSON-LD).

### 9.12 Enquire — "Come up and see the *ridge*"
- **Theme:** dusk.
- **Background:** full-bleed `town-03-sunset-point` (or `intro-01-window-dusk`) with slow parallax; a mist band rolls across the bottom.
- **Form card** (glass, cream text):
  - Name (required)
  - Mobile (required, 10 digits, +91 prefix shown)
  - Interested in: Not sure / The Pine / The Ridge / The Deodar
  - When could you visit? (This weekend / Next weekend / Later / Pick a date)
  - Plot (optional, pre-filled from the site plan)
  - Checkbox: "Send me the brochure and price list on WhatsApp"
- **Beside the form:** big WhatsApp button (deep link `https://wa.me/91XXXXXXXXXX?text=…` with the selected cottage/plot in the message), the number as text with a copy button, sales office address, "Site visits every weekend, pickup from the highway turn-off" *(confirm)*.
- **Behaviour:** inline validation messages that say what to fix; on success the card flips to a thank-you message with the window-glow motif. Submit handler chosen later (Formspree / Web3Forms / Google Apps Script) — keep it behind one `submitEnquiry()` function.
- **Mobile:** image becomes a header band; form full width. A **sticky bottom bar** on mobile (after the hero) with "Book a visit" + WhatsApp icon.

### 9.13 Footer (night)
- Giant "EkJap" wordmark across the full width, with a slow CSS mist band drifting across it (echo of the hero).
- Three columns: contact (phone, WhatsApp, email) · address · links.
- RERA number.
- **Disclaimer:** "Exterior images are representative and will be replaced with renders of the final design. Interiors are from the builder's completed homes. Specifications and figures are indicative."
- © year · Privacy policy.

---

## 10. Image inventory

Put everything under `/assets/images/` (source) and import through vite-imagetools.

| Folder / file | What it shows | Section | Treatment needed |
|---|---|---|---|
| `hero/hero-01-ridges-far.webp` | Far mountain ridges at night/pre-dawn, low contrast | Hero layer 1 | Cut from a mist-valley photo; extend sides with AI fill; 2400px |
| `hero/hero-02-hills-cottage.png` | Forested mid hills, right side, with one small cottage | Hero layer 5 | Transparent cut-out. **Cottage must be representative or a real photo of the site** (caption small) |
| `hero/hero-03-pines-fg.png` | Dark pine silhouettes, bottom-left and bottom edge | Hero layer 7 | Transparent cut-out |
| `hero/mist-01.webp`, `mist-02.webp` | Seamless tileable fog textures on transparent | Hero fallback, mist bands, footer | Make tileable horizontally |
| `hero/hero-poster-mobile.webp` | Flattened hero composition (portrait) | Mobile/low-end fallback + Open Graph image base | Export from layered file |
| `intro/intro-01-window-dusk.jpg` | Window view at dusk, two chairs, two cups | Intro | Remove headphones, add cups, fix moiré |
| `town/town-01…06` | Client's Kasauli photos (section 9.3 table) | Kasauli, enquiry | Colour-grade to match (slightly cool shadows, warm highlights) |
| `cottages/cottage-01…03` | Representative exteriors (A-frame, stone terraces, deck cabins) | Cottages | "Representative image" caption; replace with renders ASAP |
| `inside/inside-01…06` | Builder's finished interiors | Inside, Why here, Life here | Already cleaned; get originals if possible |
| `textures/texture-*` | Close crops of timber, pine, paint, stone | Materials | Square, 1000px |
| `builder/builder-01-past-project.jpg` | Builder's earlier project | Builder | Confirm it's theirs |
| `og/og-image.jpg` | 1200×630 share image: wordmark over misty hills | Meta / WhatsApp preview | Important: most traffic will come via WhatsApp shares |

**Making the hero layers:** start from one strong mist-valley photo of the area (or the mockup composition re-generated at high resolution without text). Separate foreground pines, mid hills and far ridges with Photoshop "Select Subject"/background removal; AI-fill the gaps behind each cut; export each at 2400px. Keep the mist *out* of the plates — the shader provides it.

**Export specs:** AVIF + WebP with JPEG fallback; widths 2400 / 1600 / 1000 / 600; lazy-load everything below the hero; preload hero layers; always set width/height or `aspect-ratio` (zero layout shift); grade all photos together so the site feels like one shoot.

---

## 11. Folder structure

```
ekjap/
├─ CLAUDE.md
├─ EKJAP_PLAN.md
├─ index.html
├─ assets/images/...            # source images (section 10)
├─ public/
│  ├─ fonts/ (if not using @fontsource)
│  └─ favicon.svg
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ styles/
   │  └─ index.css               # @import "tailwindcss"; @theme tokens; base styles; section theme vars
   ├─ lib/
   │  ├─ gsap.ts                 # plugin registration, defaults, eases
   │  ├─ SmoothScroll.tsx        # ReactLenis + ScrollTrigger sync (desktop only)
   │  └─ cn.ts                   # clsx + tailwind-merge
   ├─ hooks/
   │  ├─ useReducedMotion.ts
   │  ├─ usePointerFine.ts
   │  └─ useSectionTheme.ts
   ├─ components/
   │  ├─ motion/  SplitHeading, FadeUp, RevealImage, Parallax, DrawSvg, CountUp, MistBand, Magnetic
   │  ├─ ui/      Button, Eyebrow, SectionHeader, Caption, Img (responsive picture), Modal
   │  └─ layout/  Nav, MobileMenu, MobileStickyBar, AltitudeGauge, Cursor, Grain, Preloader, Footer
   ├─ sections/
   │  ├─ Hero/    Hero.tsx, HeroLayers.tsx, MistCanvas.tsx, mist.frag.glsl, heroTimeline.ts
   │  ├─ Intro.tsx  Glance.tsx  Kasauli/ (TownIntro, Postcards, RouteMap)
   │  ├─ Cottages.tsx  Inside.tsx  Materials.tsx  WhyHere.tsx  LifeHere.tsx
   │  ├─ SitePlan/ (SitePlan.tsx, PlotMap.tsx, PlotCard.tsx, Filters.tsx)
   │  └─ Builder.tsx  Faq.tsx  Enquire.tsx
   ├─ svg/                       # elevations, floor plans, loader ridge, route map
   └─ data/
      ├─ site.ts                 # ALL copy, figures, contacts, RERA, flags (sample: true)
      ├─ cottages.ts  town.ts  amenities.ts  faq.ts  timeline.ts
      └─ plots.sample.json
```

**Rule:** no copy or figures hard-coded in components. Everything comes from `src/data/`, so the client's real content is a data swap.

---

## 12. Performance, SEO, accessibility

**Performance budget**
- First screen ≤ 1.5 MB (hero layers ≈ 600 KB total in AVIF; shader JS small).
- LCP < 2.5s on 4G (LCP element = the wordmark text, so fonts must be preloaded and `font-display: swap` with a metric-matched fallback).
- CLS ≈ 0. INP < 200ms.
- Code-split the site plan and lightbox (`React.lazy`). Load OGL only on capable devices.
- Pause all RAF loops (shader, grain, cursor) when off-screen or tab hidden.

**SEO**
- Pre-rendered HTML. One `h1` ("EkJap"). Title: "EkJap — Cottages in Kasauli, Himachal Pradesh". Meta description, canonical, Open Graph + Twitter tags with `og-image.jpg`.
- JSON-LD: `RealEstateAgent`/`Organization` (builder), `Residence` for the project, `FAQPage`. Add `geo` coordinates once the site is confirmed.
- Descriptive `alt` text on every image (write them in the data files).

**Accessibility**
- Semantic landmarks; skip link; visible focus rings (amber).
- WCAG AA contrast, including text over photos (use gradients/scrims).
- Site plan plots are focusable buttons with `aria-label` ("Plot 07, The Pine, available").
- Accordion uses proper `button` + `aria-expanded`.
- Full experience works with reduced motion and with JS disabled (content visible, links work).

---

## 13. Open questions for the client
1. Is there a meaning behind "EkJap" we should express in copy (e.g. a line in the footer or intro)?
2. Exact site location (village/road), real altitude, plot count, sizes, prices or "on request".
3. Which town photos are theirs and cleared for use; any more of Kasauli (especially Mall Road, Christ Church, sunset)?
4. Real drive time from Chandigarh and distance to Mall Road.
5. Architect's site plan, floor plans and renders (timeline).
6. Builder details, past projects, RERA number.
7. WhatsApp number, sales office address, site-visit/pickup arrangements.
8. Final amenities list and FAQ answers.
9. Logo: is the serif wordmark the logo, or is there a mark?

---

## 14. Build phases for Claude Code

Work one phase at a time. At the end of each phase, run `npm run build`, check the page at 390px and 1440px widths, and check with reduced motion on.

| Phase | Deliverable | Done when |
|---|---|---|
| **1. Scaffold** | Vite + React + TS + Tailwind v4; fonts; tokens; `lib/gsap.ts`; `SmoothScroll`; ESLint/Prettier; folder structure; data files with sample content | Blank page builds; tokens usable as Tailwind classes |
| **2. Static structure** | Every section with real copy and placeholder images, laid out responsively. No animation | Whole page readable and correct at 390 / 900 / 1440 px |
| **3. Motion primitives** | `SplitHeading`, `FadeUp`, `RevealImage`, `Parallax`, `DrawSvg`, `CountUp`, `MistBand`, section theme switching | Primitives applied across sections; reduced motion shows static content |
| **4. Hero** | Layers, `MistCanvas` shader + fallback, intro timeline, pinned scroll-out into the fog, mouse parallax, mobile version, preloader | Matches the mockup; 60fps on a laptop; mobile fallback works |
| **5. Kasauli section** | Town intro, pinned postcard gallery, route map draw | Smooth on desktop; swipeable on mobile |
| **6. Interactive pieces** | Cottage panels + plan modal, site plan from JSON, FAQ, enquiry form (validation, pre-fill, WhatsApp link, success state) | Keyboard-usable; form pre-fills from plot and cottage buttons |
| **7. Polish** | Nav states, mobile menu, sticky mobile bar, cursor, altitude gauge, grain, footer wordmark mist | Feels finished; no jank |
| **8. Quality pass** | Image pipeline (AVIF/WebP srcsets), lazy loading, pre-rendering, meta/OG/JSON-LD, accessibility audit, Lighthouse | Lighthouse ≥ 90 performance (mobile), 100 accessibility/SEO |

### Starter prompt (paste into Claude Code)
> Read `CLAUDE.md` and `EKJAP_PLAN.md` fully. We're building the EkJap site described there. Start with **Phase 1** only: scaffold the project with the exact stack and folder structure in sections 3 and 11, set up the design tokens from section 4 in Tailwind v4, register GSAP plugins, add the Lenis + ScrollTrigger sync, and create the data files in `src/data/` with all sample copy from section 9. Show me the result and wait before Phase 2.

### Per-phase prompt pattern
> Continue with **Phase N** of `EKJAP_PLAN.md`. Follow the section specs exactly; if something in the plan seems wrong or impossible, tell me before changing it. When done, list what you built, anything you couldn't do, and what assets you still need from me.

### Hero-specific prompt (Phase 4)
> Build the hero per section 7 of `EKJAP_PLAN.md`, matching the attached mockup `hero-mockup.png` (dark pine background, giant cream serif "EkJap" bottom-left, mist rolling over the lower half of the letters, lit cottage on the right hill, eyebrow + italic tagline + paragraph + outline button on the right, amber "Book a site visit" pill in the nav, "Scroll" with a vertical line at the bottom centre, "1,850 m above sea level" bottom-right). Implement the OGL mist shader (7.3) with the PNG fallback, the intro timeline (7.4), the pinned scroll-out that fogs into the Intro section (7.5), mouse parallax (7.6) and the mobile version (7.7). Use placeholder layer images if the real ones aren't in `assets/images/hero/` yet, and tell me exactly which layer files to produce.
