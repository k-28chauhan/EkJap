import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText } from '@/lib/gsap'
import { useMotionInert } from '@/lib/motionContext'
import { revealTrigger, useMotion } from '@/lib/useMotion'

interface SplitHeadingProps {
  as?: ElementType
  id?: string
  className?: string
  children: ReactNode
  delay?: number
}

/**
 * Line-by-line heading reveal (EKJAP_PLAN.md §6.2): SplitText lines, each in a
 * mask, slide up from 110% with a stagger. Re-splits itself when the font loads
 * or the width changes. Reduced motion: a 0.3s fade.
 */
export function SplitHeading({
  as: Tag = 'h2',
  id,
  className,
  children,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null)

  const inert = useMotionInert()
  useMotion(ref, ({ motion, reduce }) => {
    if (inert) return
    const el = ref.current
    if (!el) return

    if (reduce) {
      gsap.from(el, { opacity: 0, duration: 0.3, ease: 'none', scrollTrigger: revealTrigger(el) })
      return
    }
    if (!motion) return

    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        // Masks clip to the line box: pad them so descenders and ascenders are not cut off
        gsap.set(self.masks, { paddingBlock: '0.12em', marginBlock: '-0.12em' })
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.0,
          ease: 'power4.out',
          stagger: 0.08,
          delay,
          scrollTrigger: revealTrigger(el),
        })
      },
    })
  })

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  )
}
