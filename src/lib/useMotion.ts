import type { RefObject } from 'react'
import { gsap, useGSAP } from './gsap'

export interface MotionConditions {
  /** User has not asked for reduced motion: full animation */
  motion: boolean
  /** User prefers reduced motion: opacity fades only, no parallax, no pinning */
  reduce: boolean
  /** Viewport is md (900px) or wider */
  desktop: boolean
}

/**
 * Runs GSAP setup inside useGSAP (scoped to `scope`, cleaned up on unmount) and
 * branches through gsap.matchMedia, as CLAUDE.md requires. The callback may
 * return a cleanup function.
 */
export function useMotion(
  scope: RefObject<Element | null>,
  setup: (conditions: MotionConditions) => void | (() => void),
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
          desktop: '(min-width: 900px)',
        },
        (context) => setup(context.conditions as unknown as MotionConditions),
      )
      return () => mm.revert()
    },
    { scope },
  )
}

/** The default scroll trigger for a one-off reveal: fires once when the element is 85% down the viewport. */
export const revealTrigger = (trigger: Element, start = 'top 85%') => ({
  trigger,
  start,
  once: true,
})
