import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, type ReactNode } from 'react'
import { usePointerFine } from '@/hooks/usePointerFine'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, ScrollTrigger } from './gsap'
import { registerLenis } from './scrollTo'

/** Keeps ScrollTrigger and the GSAP ticker in step with Lenis (EKJAP_PLAN.md §6.1). */
function LenisSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    registerLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      registerLenis(null)
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33) // GSAP defaults
    }
  }, [lenis])

  return null
}

/**
 * Smooth scrolling on pointer-fine devices only. Touch devices and users who
 * prefer reduced motion keep native scroll. Elements that must scroll on
 * their own (site plan map, mobile menu) carry `data-lenis-prevent`.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pointerFine = usePointerFine()
  const reducedMotion = useReducedMotion()

  if (!pointerFine || reducedMotion) return <>{children}</>

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.09 }}>
      <LenisSync />
      {children}
    </ReactLenis>
  )
}
