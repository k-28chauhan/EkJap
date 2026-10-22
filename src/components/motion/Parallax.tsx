import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'
import { useMotionInert } from '@/lib/motionContext'
import { useMotion } from '@/lib/useMotion'

/**
 * Fills its (positioned) parent. The inner layer is 20% taller than the frame
 * and drifts -8% -> 8% of its own height as the frame crosses the viewport,
 * scrubbed (§6.2). Desktop with motion allowed only; elsewhere it is a plain,
 * slightly cropped frame.
 */
export function Parallax({ children, className }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)

  const inert = useMotionInert()
  useMotion(frame, ({ motion, desktop }) => {
    if (inert) return
    if (!motion || !desktop || !frame.current || !layer.current) return
    gsap.fromTo(
      layer.current,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: frame.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })

  return (
    <div ref={frame} className={cn('absolute inset-0 overflow-hidden', className)}>
      <div ref={layer} className="absolute inset-x-0 -inset-y-[10%]">
        {children}
      </div>
    </div>
  )
}
