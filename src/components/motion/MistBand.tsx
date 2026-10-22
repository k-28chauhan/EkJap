import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'
import { useMotion } from '@/lib/useMotion'

/**
 * A soft fog strip laid over the join between two sections, so a change of
 * theme reads as weather rather than a cut (EKJAP_PLAN.md §0, §6.2). Two layers
 * drift sideways in CSS at different speeds; scroll moves the band at a third
 * speed. Place it as a sibling between two sections. Reduced motion: still.
 */
export function MistBand({ className }: { className?: string }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const band = useRef<HTMLDivElement>(null)

  useMotion(wrapper, ({ motion }) => {
    if (!motion || !wrapper.current || !band.current) return
    gsap.fromTo(
      band.current,
      { yPercent: -28 },
      {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      },
    )
  })

  return (
    <div
      ref={wrapper}
      aria-hidden
      className={cn(
        'pointer-events-none relative z-10 h-0 [--fog:rgb(241_236_226/0.3)]',
        className,
      )}
    >
      <div ref={band} className="absolute inset-x-0 -top-28 h-56 overflow-hidden">
        <div className="mist-layer" />
        <div className="mist-layer" data-slow />
      </div>
    </div>
  )
}
