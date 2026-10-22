import { useEffect, useRef } from 'react'
import { enquire } from '@/data/site'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * Shown in place of the form once an enquiry is sent: a lit cottage window, the
 * same motif as the hero's, and a short thank-you. Focus moves to the heading so
 * screen readers announce it.
 */
export function SuccessCard() {
  const root = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => heading.current?.focus(), [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const el = root.current
        if (!el) return
        const glow = el.querySelector('[data-glow]')
        const timeline = gsap.timeline()
        timeline
          .from(el.querySelectorAll('[data-rise]'), {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          })
          .from(glow, { opacity: 0, duration: 0.1 }, 0.3)
          .to(glow, { opacity: 0.4, duration: 0.08 })
          .to(glow, { opacity: 1, duration: 0.12 })
          .to(glow, { opacity: 0.7, duration: 0.08 })
          .to(glow, { opacity: 1, duration: 0.5 })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      role="status"
      className="flex min-h-[28rem] flex-col items-center justify-center gap-6 rounded-card-lg p-8 text-center glass md:p-12"
    >
      <svg data-rise viewBox="0 0 120 140" aria-hidden className="w-24">
        <defs>
          <radialGradient id="window-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4C07D" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#E9A35C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E9A35C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle data-glow cx="60" cy="70" r="62" fill="url(#window-glow)" />
        <rect x="32" y="34" width="56" height="72" rx="3" fill="#E9A35C" />
        <path d="M60 34 V106 M32 70 H88" stroke="#121813" strokeWidth="3" />
        <rect
          x="32"
          y="34"
          width="56"
          height="72"
          rx="3"
          fill="none"
          stroke="#121813"
          strokeWidth="4"
        />
      </svg>
      <h3 ref={heading} tabIndex={-1} data-rise className="font-display text-h3 outline-none">
        {enquire.success.title}
      </h3>
      <p data-rise className="max-w-[34ch] measure text-muted">
        {enquire.success.text}
      </p>
    </div>
  )
}
