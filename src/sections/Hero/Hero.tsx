import { useCallback, useRef, useState } from 'react'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { altitude, brand, hero } from '@/data/site'
import { gsap } from '@/lib/gsap'
import { useMotion } from '@/lib/useMotion'
import { HeroLayers } from './HeroLayers'
import { setupIntro, setupMouse, setupScrollOut } from './heroTimeline'
import { MistCanvas } from './MistCanvas'
import { createMistState, type MistState } from './mistState'
import { useMistCapable } from './useMistCapable'

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Offset of `el` from the top of `ancestor`, unaffected by CSS transforms. */
function offsetTopWithin(el: HTMLElement, ancestor: HTMLElement) {
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== ancestor) {
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return y
}

/**
 * The hero (EKJAP_PLAN.md §7): layered plate, WebGL mist (CSS fog as the fallback),
 * the intro timeline, a pinned scroll-out that fogs into the Intro, and mouse
 * parallax. Without motion it is the static, readable layout.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)
  const mist = useRef<MistState>(createMistState())
  const capable = useMistCapable()
  const [failed, setFailed] = useState(false)
  const onUnavailable = useCallback(() => setFailed(true), [])
  const phone = !useMediaQuery('(min-width: 900px)')
  const mode = capable && !failed ? 'webgl' : 'css'

  useMotion(root, ({ motion, desktop }) => {
    const el = root.current
    const wordmark = el?.querySelector<HTMLElement>('[data-hero="wordmark"]')
    if (!el || !wordmark || !motion) return

    const state = mist.current

    // Keep the fog band over the lower half of the letters
    const measure = () => {
      const top = offsetTopWithin(wordmark, el)
      const height = wordmark.offsetHeight
      const total = el.offsetHeight
      state.bandCenter = 1 - (top + height * 0.68) / total
      state.bandWidth = (height * 0.62) / total
    }
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(el)

    // When the shader is not running, the CSS fog follows the same state
    const followFallback = () => {
      const fog = el.querySelector<HTMLElement>('[data-hero="css-mist"]')
      if (!fog) return
      gsap.set(fog, {
        opacity: state.fade * lerp(state.density, 1, state.out),
        scaleY: lerp(1, 2.1, state.out),
      })
    }
    gsap.ticker.add(followFallback)

    const cleanups = [setupIntro(el, state), setupScrollOut(el, state, desktop)]
    if (desktop && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      cleanups.push(setupMouse(el, state))
    }

    return () => {
      resizeObserver.disconnect()
      gsap.ticker.remove(followFallback)
      cleanups.forEach((cleanup) => cleanup?.())
    }
  })

  return (
    <Section
      ref={root}
      id="top"
      theme="night"
      local
      flush
      labelledBy="hero-title"
      className="overflow-hidden"
    >
      <HeroLayers mist={mode} />

      {mode === 'webgl' && (
        <div className="absolute inset-0 z-20">
          <MistCanvas
            state={mist}
            watch={root}
            scale={phone ? 0.4 : 0.6}
            onUnavailable={onUnavailable}
          />
        </div>
      )}

      <div className="relative wrap flex min-h-svh flex-col pt-[calc(var(--nav-h)+1.75rem)] pb-8 md:grid md:grid-cols-12 md:grid-rows-[auto_1fr_auto] md:gap-x-6 md:pt-[calc(var(--nav-h)+3rem)]">
        <div data-hero="copy" className="relative z-30 md:col-span-4 md:col-start-9 md:row-start-1">
          <p data-hero="eyebrow" className="label text-cream/80">
            {hero.eyebrow}
          </p>
        </div>

        <h1
          id="hero-title"
          data-hero="wordmark"
          className="wordmark-lift relative z-10 my-auto font-display text-wordmark md:col-span-9 md:col-start-1 md:row-start-2 md:mt-auto md:mb-0 md:self-end"
        >
          {brand.name}
        </h1>

        <div
          data-hero="copy"
          className="relative z-30 mt-auto flex flex-col items-start gap-5 md:col-span-4 md:col-start-9 md:row-start-2 md:mt-6 md:self-start"
        >
          <p data-hero="tagline" className="font-display text-h3 text-cream italic">
            {hero.tagline}
          </p>
          <p data-hero="paragraph" className="max-w-[34ch] text-cream/80">
            {hero.paragraph}
          </p>
          <p
            data-hero="badge"
            className="inline-flex items-center gap-2.5 rounded-full border border-ember-400/50 bg-pine-950/40 px-4 py-2 label text-ember-300 backdrop-blur-sm"
          >
            <span aria-hidden className="pulse-ring relative size-2 rounded-full bg-ember-400" />
            {hero.badge}
          </p>
          <div data-hero="cta">
            <Button href={hero.secondaryCta.href} variant="outline" className="text-cream">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <AnchorLink
            href={hero.builtHref}
            data-hero="badge"
            className="group inline-flex items-center gap-2 label text-cream/85 underline decoration-cream/30 underline-offset-[6px] transition-colors hover:text-cream hover:decoration-cream"
          >
            {hero.builtLine}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </AnchorLink>
        </div>

        <div
          data-hero="bottom"
          className="relative z-30 mt-10 grid grid-cols-3 items-end text-cream/80 md:col-span-12 md:row-start-3 md:mt-12"
        >
          <span aria-hidden />
          <a data-hero="scroll" href="#intro" className="flex flex-col items-center gap-3 label">
            {hero.scroll}
            <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-cream/40">
              <span data-hero="scroll-line" className="absolute inset-0 origin-top bg-cream/40" />
              <span
                data-hero="scroll-light"
                className="absolute top-0 left-0 h-3 w-px bg-ember-300"
              />
            </span>
          </a>
          <p data-hero="altitude" className="text-right label">
            <span data-hero="altitude-value" className="tabular">
              {altitude.ridge.value.toLocaleString('en-IN')}
            </span>{' '}
            m {hero.altitudeLabel}
            <span className="ml-1.5 opacity-60">· sample</span>
          </p>
        </div>
      </div>

      {/* Ends the scroll-out: the Intro's own background, so the Intro appears out of the cloud */}
      <div
        data-hero="wash"
        aria-hidden
        className="pointer-events-none absolute inset-0 z-40 bg-mist-50 opacity-0"
      />
    </Section>
  )
}
