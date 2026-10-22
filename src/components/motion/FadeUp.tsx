import { useRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { gsap, motion as tokens } from '@/lib/gsap'
import { useMotionInert } from '@/lib/motionContext'
import { revealTrigger, useMotion } from '@/lib/useMotion'

interface FadeUpProps extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'> {
  as?: ElementType
  className?: string
  children: ReactNode
  delay?: number
  /** Animate the direct children one after another instead of the element itself */
  stagger?: number
  start?: string
}

/** y 32 -> 0 and opacity 0 -> 1 once the element is 85% down the viewport (§6.2). */
export function FadeUp({
  as: Tag = 'div',
  className,
  children,
  delay = 0,
  stagger,
  start = tokens.fadeUp.start,
  ...rest
}: FadeUpProps) {
  const ref = useRef<HTMLElement>(null)

  const inert = useMotionInert()
  useMotion(ref, ({ motion, reduce }) => {
    if (inert) return
    const el = ref.current
    if (!el) return
    const targets = stagger ? Array.from(el.children) : el
    if (!motion && !reduce) return

    if (reduce) {
      gsap.from(targets, {
        opacity: 0,
        duration: tokens.reduced.duration,
        ease: tokens.reduced.ease,
        stagger: stagger ? 0.05 : 0,
        scrollTrigger: revealTrigger(el, start),
      })
      return
    }

    gsap.from(targets, {
      y: tokens.fadeUp.y,
      opacity: 0,
      duration: tokens.fadeUp.duration,
      ease: tokens.fadeUp.ease,
      delay,
      stagger: stagger ?? 0,
      scrollTrigger: revealTrigger(el, start),
    })
  })

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
