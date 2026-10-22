import { gsap, SplitText } from '@/lib/gsap'
import { introGate } from '@/lib/introGate'
import type { MistState } from './mistState'

/**
 * The hero's three motion systems (EKJAP_PLAN.md §7.4 to §7.6). Each is called
 * from inside useMotion, so everything is reverted on unmount and per media query.
 */

const pick = <T extends HTMLElement>(root: HTMLElement, name: string) =>
  root.querySelector<T>(`[data-hero="${name}"]`)

const pickAll = (root: HTMLElement, name: string) =>
  Array.from(root.querySelectorAll<HTMLElement>(`[data-hero="${name}"]`))

/** Mask the glyph boxes generously: the wordmark's line-height is 0.85 and its letters overhang. */
const padMasks = (masks: Element[]) =>
  gsap.set(masks, {
    paddingBlock: '0.25em',
    marginBlock: '-0.25em',
    paddingInline: '0.06em',
    marginInline: '-0.06em',
  })

/** §7.4, plus blur as asked. Starts when the preloader opens the gate. */
export function setupIntro(root: HTMLElement, mist: MistState) {
  const plate = pick(root, 'plate-intro')
  const wordmark = pick(root, 'wordmark')
  const eyebrow = pick(root, 'eyebrow')
  const tagline = pick(root, 'tagline')
  const paragraph = pick(root, 'paragraph')
  const cta = pick(root, 'cta')
  const scroll = pick(root, 'scroll')
  const scrollLine = pick(root, 'scroll-line')
  const scrollLight = pick(root, 'scroll-light')
  const altitude = pick(root, 'altitude')
  const altitudeValue = pick(root, 'altitude-value')
  const glow = pick(root, 'glow')
  if (
    !plate ||
    !wordmark ||
    !eyebrow ||
    !tagline ||
    !paragraph ||
    !cta ||
    !scroll ||
    !scrollLine ||
    !scrollLight ||
    !altitude ||
    !altitudeValue ||
    !glow
  )
    return

  const finalAltitude = altitudeValue.textContent ?? ''
  const target = Number((finalAltitude.match(/[\d,]+/)?.[0] ?? '0').replace(/,/g, ''))

  // Starting states, set before the first paint so nothing flashes
  gsap.set(plate, { opacity: 0, scale: 1.08, filter: 'blur(12px)' })
  mist.fade = 0
  mist.density = 0.9
  gsap.set([eyebrow, paragraph], { opacity: 0, y: 20 })
  gsap.set(cta, { opacity: 0, scale: 0.9 })
  gsap.set(glow, { opacity: 0 })
  gsap.set(scroll, { opacity: 0 })
  gsap.set(scrollLine, { scaleY: 0 })
  gsap.set(scrollLight, { opacity: 0 })
  gsap.set(altitude, { opacity: 0 })
  altitudeValue.textContent = '0'

  const letters = SplitText.create(wordmark, { type: 'chars', mask: 'chars' })
  padMasks(letters.masks)
  gsap.set(letters.chars, { yPercent: 110 })

  const lines = SplitText.create(tagline, { type: 'lines', mask: 'lines' })
  gsap.set(lines.masks, { paddingBlock: '0.14em', marginBlock: '-0.14em' })
  gsap.set(lines.lines, { yPercent: 110 })

  const count = { n: 0 }
  const timeline = gsap.timeline({
    paused: true,
    onComplete: () => {
      // The masks only existed for the reveal; give the type back its natural overhang
      letters.revert()
      lines.revert()
      gsap.set(plate, { clearProps: 'filter' })
      idle()
    },
  })

  timeline
    // 0.0 the scenery comes into focus
    .to(plate, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out' }, 0)
    // 0.3 the front mist arrives thick, covering the lower screen
    .to(mist, { fade: 1, duration: 1.2, ease: 'power2.out' }, 0.3)
    // 0.5 the letters rise one by one
    .to(letters.chars, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.07 }, 0.5)
    // 0.9 the fog thins and reveals them
    .to(mist, { density: 0.55, duration: 2, ease: 'power2.inOut' }, 0.9)
    // 1.3 eyebrow, tagline lines, paragraph
    .to(eyebrow, { opacity: 1, y: 0, duration: 0.8 }, 1.3)
    .to(lines.lines, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }, 1.4)
    .to(paragraph, { opacity: 1, y: 0, duration: 0.9 }, 1.6)
    // 1.7 the button
    .to(cta, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 1.7)
    // 1.9 someone's home: the window lights with a quick flicker
    .to(glow, { opacity: 1, duration: 0.12, ease: 'none' }, 1.9)
    .to(glow, { opacity: 0.35, duration: 0.09, ease: 'none' })
    .to(glow, { opacity: 1, duration: 0.14, ease: 'none' })
    .to(glow, { opacity: 0.6, duration: 0.08, ease: 'none' })
    .to(glow, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    // 2.1 scroll cue, then the altitude counts up
    .to(scroll, { opacity: 1, duration: 0.6 }, 2.1)
    .to(scrollLine, { scaleY: 1, duration: 0.9, ease: 'power2.out' }, 2.1)
    .to(altitude, { opacity: 1, duration: 0.6 }, 2.1)
    .to(
      count,
      {
        n: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => (altitudeValue.textContent = Math.round(count.n).toLocaleString('en-IN')),
        onComplete: () => (altitudeValue.textContent = finalAltitude),
      },
      2.1,
    )

  // After the intro: a light travels down the scroll line, and the window flickers now and then
  let flickerCall: gsap.core.Tween | undefined
  const idle = () => {
    gsap.fromTo(
      scrollLight,
      { y: -14, opacity: 0 },
      {
        keyframes: [
          { opacity: 1, duration: 0.2, ease: 'none' },
          { y: 48, duration: 1.1, ease: 'power1.inOut' },
          { opacity: 0, duration: 0.2, ease: 'none' },
        ],
        repeat: -1,
        repeatDelay: 1,
      },
    )
    const flicker = () => {
      gsap.to(glow, {
        opacity: gsap.utils.random(0.82, 1),
        duration: gsap.utils.random(0.12, 0.3),
        ease: 'sine.inOut',
      })
      flickerCall = gsap.delayedCall(gsap.utils.random(2, 4), flicker)
    }
    flickerCall = gsap.delayedCall(gsap.utils.random(2, 4), flicker)
  }

  const start = () => timeline.play()
  introGate.then(start)

  return () => {
    flickerCall?.kill()
    letters.revert()
    lines.revert()
    altitudeValue.textContent = finalAltitude
  }
}

/**
 * §7.5. The hero pins (desktop) and, over about 120% of a viewport of scrolling, the
 * pines and photograph swell toward the viewer, the wordmark grows and drifts up, the
 * copy lifts away, and the fog thickens into mist-50, the Intro's own background, so
 * the Intro appears out of the cloud. On phones there is no pin: the same tween is
 * scrubbed across the hero scrolling off.
 */
export function setupScrollOut(root: HTMLElement, mist: MistState, pinned: boolean) {
  const plate = pick(root, 'plate-scroll')
  const wordmark = pick(root, 'wordmark')
  const copy = pickAll(root, 'copy')
  const bottom = pick(root, 'bottom')
  const wash = pick(root, 'wash')
  if (!plate || !wordmark || !bottom || !wash) return

  gsap.set(wash, { opacity: 0 })

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: pinned ? '+=120%' : 'bottom top',
      pin: pinned,
      scrub: 1,
      anticipatePin: 1,
    },
  })

  timeline
    .to(plate, { scale: pinned ? 1.22 : 1.1, yPercent: pinned ? -2 : 0, duration: 1 }, 0)
    .to(wordmark, { scale: 1.12, yPercent: -12, transformOrigin: '0% 100%', duration: 1 }, 0)
    .to(copy, { opacity: 0, y: -40, duration: 0.3 }, 0)
    .to(bottom, { opacity: 0, duration: 0.2 }, 0)
    .to(mist, { out: 1, duration: 1 }, 0)
    // The last third: a wash of the Intro's colour makes the match exact
    .to(wash, { opacity: 1, duration: 0.35 }, 0.65)
}

/** §7.6. Layers drift a few pixels toward the cursor; the mist is nudged through its uniform. Desktop pointers only. */
export function setupMouse(root: HTMLElement, mist: MistState) {
  const plate = pick(root, 'plate-mouse')
  const wordmark = pick(root, 'wordmark')
  if (!plate || !wordmark) return

  const plateX = gsap.quickTo(plate, 'x', { duration: 0.8, ease: 'power3.out' })
  const plateY = gsap.quickTo(plate, 'y', { duration: 0.8, ease: 'power3.out' })
  const wordX = gsap.quickTo(wordmark, 'x', { duration: 0.8, ease: 'power3.out' })
  const wordY = gsap.quickTo(wordmark, 'y', { duration: 0.8, ease: 'power3.out' })
  const mouseX = gsap.quickTo(mist, 'mouseX', { duration: 0.8, ease: 'power3.out' })
  const mouseY = gsap.quickTo(mist, 'mouseY', { duration: 0.8, ease: 'power3.out' })

  const move = (event: PointerEvent) => {
    const box = root.getBoundingClientRect()
    const nx = ((event.clientX - box.left) / box.width) * 2 - 1
    const ny = ((event.clientY - box.top) / box.height) * 2 - 1
    plateX(nx * 10)
    plateY(ny * 10)
    wordX(nx * 6)
    wordY(ny * 6)
    mouseX(nx)
    mouseY(-ny)
  }
  root.addEventListener('pointermove', move)
  return () => root.removeEventListener('pointermove', move)
}
