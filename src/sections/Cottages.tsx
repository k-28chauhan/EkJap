import { useRef, useState } from 'react'
import { DrawSvg } from '@/components/motion/DrawSvg'
import { CountUp } from '@/components/motion/CountUp'
import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cottageById, cottages, cottagesSection } from '@/data/cottages'
import { common } from '@/data/site'
import type { CottageType } from '@/data/types'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { addDraw } from '@/lib/draw'
import { prefillEnquiry } from '@/lib/enquiryStore'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { MotionInertContext } from '@/lib/motionContext'
import { useMotion } from '@/lib/useMotion'
import { Elevation } from '@/svg/Elevation'
import { FloorPlan } from '@/svg/FloorPlan'

const { specLabels } = cottagesSection

/**
 * The three cottage types (EKJAP_PLAN.md §9.4). Desktop with motion: the block pins
 * and vertical scroll slides three full-width panels sideways; as each one arrives its
 * text rises, its elevation draws (the lit windows last) and its photograph wipes up.
 * Everywhere else: three stacked cards, each revealing as it scrolls into view.
 */
export function Cottages() {
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [planOf, setPlanOf] = useState<CottageType | null>(null)

  const wide = useMediaQuery('(min-width: 900px)')
  const reduced = useReducedMotion()
  const pinned = wide && !reduced

  useMotion(pin, ({ motion, desktop }) => {
    const el = pin.current
    const strip = track.current
    if (!el || !strip || !motion || !desktop) return

    const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', strip)
    const n = panels.length

    // Pinned layout: one screen tall, the panels laid side by side
    gsap.set(el, { height: '100svh', overflow: 'hidden' })
    gsap.set(strip, { display: 'flex', width: `${n * 100}vw` })
    gsap.set(panels, { width: '100vw', height: '100svh', flexShrink: 0 })
    gsap.set(gsap.utils.toArray('[data-panel-inner]', strip), {
      height: '100%',
      paddingTop: 'calc(var(--nav-h) + 1rem)',
      paddingBottom: '2rem',
      borderTopWidth: 0,
    })

    const slide = gsap.to(strip, {
      xPercent: (-100 * (n - 1)) / n,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${(n - 1) * window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })

    // Each panel's reveal plays once, as the panel arrives
    panels.forEach((panel, i) => {
      const text = panel.querySelector('[data-panel-text]')
      const drawing = panel.querySelector('[data-panel-draw]')
      const frame = panel.querySelector<HTMLElement>('[data-panel-image] > div')
      const settle = frame?.firstElementChild

      const timeline = gsap.timeline({ paused: true })
      if (text) {
        timeline.from(
          Array.from(text.children),
          { y: 32, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 },
          0,
        )
      }
      if (drawing) addDraw(timeline, drawing, { duration: 1.4, stagger: 0.1 }, 0.3)
      if (frame) {
        timeline.fromTo(
          frame,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'expo.out',
            clearProps: 'clipPath',
          },
          0,
        )
        if (settle) timeline.from(settle, { scale: 1.15, duration: 1.2, ease: 'expo.out' }, 0)
      }

      ScrollTrigger.create(
        i === 0
          ? { trigger: el, start: 'top 70%', once: true, onEnter: () => timeline.play() }
          : {
              trigger: panel,
              containerAnimation: slide,
              start: 'left 75%',
              once: true,
              onEnter: () => timeline.play(),
            },
      )
    })

    // Tabbing into an off-screen panel must scroll the page, not the clipped strip
    const onFocus = (event: FocusEvent) => {
      const panel = (event.target as HTMLElement).closest<HTMLElement>('[data-panel]')
      const index = panel ? panels.indexOf(panel) : -1
      const trigger = slide.scrollTrigger
      if (index < 0 || !trigger) return
      el.scrollLeft = 0
      window.scrollTo({ top: trigger.start + ((trigger.end - trigger.start) * index) / (n - 1) })
    }
    el.addEventListener('focusin', onFocus)
    return () => el.removeEventListener('focusin', onFocus)
  })

  const planCottage = planOf ? cottageById[planOf] : null

  return (
    <Section id="cottages" theme="day" labelledBy="cottages-title">
      <div className="wrap">
        <SectionHeader
          id="cottages-title"
          label={cottagesSection.label}
          title={cottagesSection.title}
          copy={cottagesSection.copy}
        />
      </div>

      <MotionInertContext.Provider value={pinned}>
        <div ref={pin} className="mt-16 md:mt-28">
          <div ref={track}>
            {cottages.map((cottage) => (
              <article key={cottage.id} data-panel aria-labelledby={`cottage-${cottage.id}`}>
                <div
                  data-panel-inner
                  className="relative wrap grid gap-10 py-14 hairline-t md:grid-cols-2 md:items-center md:gap-16 md:py-24"
                >
                  {/* Placeholder plan, faint, behind the text (§9.4) */}
                  <FloorPlan
                    id={cottage.id}
                    className="pointer-events-none absolute top-1/2 left-0 w-[46%] -translate-y-1/2 text-fg opacity-[0.07]"
                  />

                  <FadeUp
                    data-panel-text
                    stagger={0.08}
                    className="relative flex flex-col gap-6 md:gap-5"
                  >
                    <p className="label text-muted">{cottage.index}</p>
                    <div>
                      <SplitHeading
                        as="h3"
                        id={`cottage-${cottage.id}`}
                        className="font-display text-h2"
                      >
                        {cottage.name}
                      </SplitHeading>
                      <p className="mt-3 label text-muted">{cottage.form}</p>
                    </div>

                    <div data-panel-draw className="my-2 w-full max-w-[34rem]">
                      <DrawSvg start="top 75%">
                        <Elevation
                          id={cottage.id}
                          label={`Elevation drawing of ${cottage.name}`}
                          className="w-full md:max-h-[26svh]"
                        />
                      </DrawSvg>
                    </div>

                    <dl className="grid grid-cols-3 gap-4 border-y border-line py-5">
                      <div>
                        <dt className="label text-muted">{specLabels.layout}</dt>
                        <dd className="mt-1.5">{cottage.layout}</dd>
                      </div>
                      <div>
                        <dt className="label text-muted">{specLabels.area}</dt>
                        <dd className="mt-1.5 tabular">
                          <CountUp
                            value={cottage.builtUpSqFt}
                            display={cottage.builtUpSqFt.toLocaleString('en-IN')}
                          />{' '}
                          {specLabels.unit}
                        </dd>
                      </div>
                      <div>
                        <dt className="label text-muted">{specLabels.price}</dt>
                        <dd className="mt-1.5">{cottage.price}</dd>
                      </div>
                    </dl>

                    <p className="measure text-muted">{cottage.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        href="#enquire"
                        variant="outline"
                        onClick={() => prefillEnquiry({ topic: cottage.topic })}
                      >
                        {cottage.askLabel}
                      </Button>
                      <button
                        type="button"
                        onClick={() => setPlanOf(cottage.id)}
                        className="rounded-full px-5 py-3 text-[0.95rem] font-medium underline decoration-current/40 underline-offset-4 transition-colors hover:decoration-current"
                      >
                        {cottagesSection.viewPlan}
                      </button>
                    </div>
                  </FadeUp>

                  <div data-panel-image className="md:h-[min(66svh,38rem)] md:justify-self-end">
                    <RevealImage
                      image={{ ...cottage.image, caption: common.representative }}
                      ratio="4/5"
                      position={cottage.image.position}
                      sizes="(min-width: 900px) 46vw, 100vw"
                      parallax
                      showCaption
                      className="rounded-card max-md:w-full md:h-full md:w-auto"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </MotionInertContext.Provider>

      <Modal
        open={planOf !== null}
        onClose={() => setPlanOf(null)}
        title={planCottage ? `${planCottage.name} · ${cottagesSection.planModalTitle}` : ''}
        closeLabel={cottagesSection.closeModal}
      >
        {planCottage && (
          <>
            <FloorPlan id={planCottage.id} className="w-full text-ink-900" />
          </>
        )}
      </Modal>
    </Section>
  )
}
