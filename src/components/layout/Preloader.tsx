import { useEffect, useRef, useState } from 'react'
import { brand, preloader } from '@/data/site'
import { gsap, useGSAP } from '@/lib/gsap'
import { getPicture } from '@/lib/images'
import { openIntroGate } from '@/lib/introGate'

const SEEN = 'ekjap-intro-seen'
const MIN_MS = 1600
const MAX_MS = 3000

/** Skipped for reduced motion and for repeat visits in the same session (EKJAP_PLAN.md §8). */
function shouldShow() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !window.sessionStorage.getItem(SEEN)
  } catch {
    return true
  }
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

/** Fonts, plus the hero photograph decoded, so the hero never pops in after the loader lifts. */
async function assetsReady() {
  const tasks: Promise<unknown>[] = [document.fonts?.ready ?? Promise.resolve()]
  const hero = getPicture('hero/hero-00-bg-night.webp')
  if (hero) {
    const image = new Image()
    image.src = hero.img.src
    tasks.push(image.decode().catch(() => undefined))
  }
  await Promise.all(tasks)
}

/**
 * Pine-950 screen: a ridge line draws left to right while an altitude counter climbs
 * to 1,850 m. It leaves once fonts and the hero photo are ready and at least 1.6s
 * have passed (never later than 3s), lifting away like fog with a feathered edge,
 * and opens the intro gate so the hero starts as it rises. A CSS failsafe hides it
 * if JavaScript never runs.
 */
export function Preloader() {
  const [show] = useState(shouldShow)
  const [done, setDone] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!show) openIntroGate()
  }, [show])

  useGSAP(
    (_, contextSafe) => {
      const el = root.current
      const counter = label.current
      if (!show || !el || !counter || !contextSafe) return

      const html = document.documentElement
      html.style.overflow = 'hidden'
      const unlock = () => (html.style.overflow = '')

      const progress = { n: preloader.from }
      const format = (n: number) => String(Math.round(n)).padStart(4, '0')
      counter.textContent = format(0)

      gsap.set(el.querySelectorAll('[data-loader="brand"]'), { opacity: 0, y: 12 })
      gsap
        .timeline()
        .to(el.querySelector('[data-loader="brand"]'), { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .from(
          el.querySelectorAll('[data-loader="ridge"] path'),
          { drawSVG: '0%', duration: 1.4, ease: 'power2.inOut' },
          0,
        )
        .to(
          progress,
          {
            n: preloader.to,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => (counter.textContent = format(progress.n)),
          },
          0,
        )

      let cancelled = false
      const exit = contextSafe(() => {
        gsap
          .timeline({
            onComplete: () => {
              try {
                sessionStorage.setItem(SEEN, '1')
              } catch {
                /* private mode: the loader simply plays again next visit */
              }
              unlock()
              setDone(true)
            },
          })
          .to(
            el.querySelector('[data-loader="content"]'),
            { opacity: 0, y: -16, duration: 0.5, ease: 'power2.in' },
            0,
          )
          .call(openIntroGate, [], 0.35)
          .to(el, { yPercent: -100, duration: 1.1, ease: 'power3.inOut' }, 0.2)
      })

      Promise.race([Promise.all([wait(MIN_MS), assetsReady()]), wait(MAX_MS)]).then(
        () => !cancelled && exit(),
      )

      return () => {
        cancelled = true
        unlock()
      }
    },
    { scope: root },
  )

  if (!show || done) return null

  return (
    <div
      ref={root}
      data-theme="night"
      role="status"
      aria-label="Loading"
      className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-pine-950 text-cream"
    >
      <div data-loader="content" className="flex w-[min(28rem,80vw)] flex-col items-center gap-8">
        <span data-loader="brand" className="font-display text-4xl tracking-tight">
          {brand.name}
        </span>
        <svg
          data-loader="ridge"
          viewBox="0 0 400 70"
          aria-hidden
          className="w-full"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 62 L38 46 L62 54 L104 22 L132 40 L158 30 L204 8 L240 36 L268 24 L310 48 L338 38 L372 56 L400 50" />
        </svg>
        <p className="label text-cream/70 tabular">
          <span ref={label}>0000</span> {preloader.unit}
        </p>
      </div>
      {/* Feathered lower edge: the loader lifts away like fog */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-[38vh] bg-gradient-to-b from-pine-950 to-transparent"
      />
    </div>
  )
}
