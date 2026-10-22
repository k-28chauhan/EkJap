import type Lenis from 'lenis'
import { gsap } from './gsap'

let lenis: Lenis | null = null

/** SmoothScroll registers its Lenis instance here so any link can scroll without a hook. */
export function registerLenis(instance: Lenis | null) {
  lenis = instance
}

/** The fixed nav's rendered height in px (--nav-h is in rem, so measure instead of parsing it). */
function navHeight() {
  return document.querySelector('header')?.getBoundingClientRect().height ?? 0
}

/**
 * Anchor scrolling (EKJAP_PLAN.md §6.1): Lenis when it is running (desktop),
 * GSAP ScrollToPlugin otherwise (touch devices, reduced motion).
 */
export function scrollToTarget(target: string | HTMLElement, { instant = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  const offset = -navHeight()

  if (instant) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset })
  } else if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.4 })
  } else {
    gsap.to(window, { scrollTo: { y: el, offsetY: -offset }, duration: 1.2, ease: 'power3.inOut' })
  }
}

/** Freezes page scrolling while a modal is open (Lenis on desktop, overflow elsewhere). */
export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
