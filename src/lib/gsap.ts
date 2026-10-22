import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

/**
 * Plugins are registered once, here. Every other file imports `gsap` and the
 * plugins from this module, never from 'gsap' directly, so registration is
 * guaranteed to have run (and stays safe under pre-rendering).
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, ScrollToPlugin)

  gsap.defaults({ ease: 'power3.out', duration: 0.9 })

  // Mobile browser bars resize the viewport while scrolling; don't refresh on that.
  ScrollTrigger.config({ ignoreMobileResize: true })

  // Web fonts change line breaks and heights: re-measure every trigger once loaded.
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
}

/** Durations and eases from EKJAP_PLAN.md §6.2, so primitives stay consistent. */
export const motion = {
  heading: { duration: 1.0, ease: 'power4.out', stagger: 0.08 },
  fadeUp: { duration: 0.9, ease: 'power3.out', y: 32, start: 'top 85%' },
  image: { duration: 1.2, ease: 'expo.out', scaleFrom: 1.15 },
  draw: { duration: 1.6, ease: 'power2.inOut' },
  count: { duration: 1.6, ease: 'power2.out' },
  /** Reduced motion: simple opacity fades only */
  reduced: { duration: 0.3, ease: 'none' },
} as const

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, ScrollToPlugin }
export { useGSAP } from '@gsap/react'
