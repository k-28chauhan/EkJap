import { useRef, type ReactNode } from 'react'
import { gsap, motion as tokens } from '@/lib/gsap'
import { addDraw } from '@/lib/draw'
import { useMotionInert } from '@/lib/motionContext'
import { revealTrigger, useMotion } from '@/lib/useMotion'

interface DrawSvgProps {
  children: ReactNode
  className?: string
  duration?: number
  stagger?: number
  start?: string
}

/**
 * Draws every stroke in the child SVG from 0% to 100% (§6.2). Strokes inside a
 * `.glazing` group (the lit windows) draw last and brighten as they land.
 * With reduced motion the drawing is simply shown.
 */
export function DrawSvg({
  children,
  className,
  duration = tokens.draw.duration,
  stagger = 0.12,
  start = 'top 80%',
}: DrawSvgProps) {
  const ref = useRef<HTMLDivElement>(null)

  const inert = useMotionInert()
  useMotion(ref, ({ motion }) => {
    if (inert) return
    const el = ref.current
    if (!el || !motion) return

    const timeline = gsap.timeline({ scrollTrigger: revealTrigger(el, start) })
    addDraw(timeline, el, { duration, stagger })
  })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
