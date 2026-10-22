import { useRef } from 'react'
import { gsap, motion as tokens } from '@/lib/gsap'
import { useMotionInert } from '@/lib/motionContext'
import { revealTrigger, useMotion } from '@/lib/useMotion'

export type CountFormat = 'number' | 'duration'

interface CountUpProps {
  value: number
  /** The final text, shown as-is without JavaScript and once the count finishes */
  display: string
  format?: CountFormat
  className?: string
}

function format(value: number, kind: CountFormat) {
  const n = Math.round(value)
  if (kind === 'duration') {
    const h = Math.floor(n / 60)
    const m = n % 60
    return h === 0 ? `${m} m` : `${h} h ${m} m`
  }
  return n.toLocaleString('en-IN')
}

/** Tweens a number from 0 to `value` once, in tabular figures so nothing jitters (§6.2). */
export function CountUp({ value, display, format: kind = 'number', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  const inert = useMotionInert()
  useMotion(ref, ({ motion }) => {
    if (inert) return
    const el = ref.current
    const node = el?.firstChild
    if (!el || !node || !motion) return

    const counter = { n: 0 }
    gsap.from(el, {
      filter: 'blur(8px)',
      duration: tokens.count.duration,
      ease: 'power2.out',
      clearProps: 'filter',
      scrollTrigger: revealTrigger(el),
    })
    node.nodeValue = format(0, kind)
    gsap.to(counter, {
      n: value,
      duration: tokens.count.duration,
      ease: tokens.count.ease,
      scrollTrigger: revealTrigger(el),
      onUpdate: () => {
        node.nodeValue = format(counter.n, kind)
      },
      onComplete: () => {
        node.nodeValue = display
      },
    })
    return () => {
      node.nodeValue = display
    }
  })

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
