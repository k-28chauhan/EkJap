import { useRef } from 'react'
import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SmallPrint } from '@/components/ui/SmallPrint'
import { brand, builder, rera } from '@/data/site'
import { timeline, timelineSample } from '@/data/timeline'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'
import { useMotion } from '@/lib/useMotion'

/**
 * The progress line fills down to the "Now" stage as the timeline scrolls
 * through (scrubbed). Reduced motion shows it already filled; without
 * JavaScript there is no fill, and the dots alone mark the stages.
 */
function Timeline() {
  const list = useRef<HTMLOListElement>(null)
  const fill = useRef<HTMLSpanElement>(null)

  useMotion(list, ({ motion, reduce }) => {
    const ol = list.current
    const line = fill.current
    const now = ol?.querySelector<HTMLElement>('[data-state="now"]')
    if (!ol || !line || !now || (!motion && !reduce)) return

    // Land the fill on the centre of the "Now" dot
    const target = Math.min(1, (now.offsetTop + 14) / ol.offsetHeight)
    if (reduce) {
      gsap.set(line, { scaleY: target })
      return
    }
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: target,
        ease: 'none',
        scrollTrigger: { trigger: ol, start: 'top 70%', end: 'bottom 55%', scrub: 0.6 },
      },
    )
  })

  return (
    <ol ref={list} className="relative ml-2 border-l border-line pl-8">
      <span
        ref={fill}
        aria-hidden
        className="absolute top-0 -left-px h-full w-px origin-top scale-y-0 bg-fg"
      />
      {timeline.map((stage) => (
        <li key={stage.id} data-state={stage.state} className="relative pb-9 last:pb-0">
          <span
            aria-hidden
            className={cn(
              'absolute top-1.5 -left-[2.5rem] size-3.5 rounded-full border',
              stage.state === 'done' && 'border-fg bg-fg',
              stage.state === 'now' && 'pulse-ring border-ember-600 bg-ember-400',
              stage.state === 'next' && 'border-fg/50 bg-bg',
            )}
          />
          <p className="label text-muted">
            {String(stage.index).padStart(2, '0')} · {stage.status}
          </p>
          <p className="mt-1 font-display text-h3">{stage.title}</p>
        </li>
      ))}
    </ol>
  )
}

export function Builder() {
  return (
    <Section id="builder" theme="stone" labelledBy="builder-title" className="pt-0 md:pt-0">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-5">
          <RevealImage
            image={builder.image}
            ratio="4/5"
            sizes="(min-width: 900px) 40vw, 100vw"
            className="rounded-card md:sticky md:top-[calc(var(--nav-h)+2rem)]"
          />
        </div>

        <div className="flex flex-col gap-12 md:col-span-7 md:pt-4">
          <SectionHeader
            id="builder-title"
            label={builder.label}
            title={builder.title}
            copy={builder.copy}
          />

          <FadeUp
            as="dl"
            stagger={0.1}
            className="grid grid-cols-3 gap-4 border-y border-line py-6"
          >
            {builder.numbers.map((item) => (
              <div key={item.id}>
                <dd className="font-display text-5xl leading-none tabular">
                  {item.value.value || '—'}
                </dd>
                <dt className="mt-3 label text-muted">{item.label}</dt>
              </div>
            ))}
          </FadeUp>

          <Timeline />

          <FadeUp className="flex flex-col gap-2">
            <p className="label text-muted">{builder.reraLabel}</p>
            <p>{rera.value ?? builder.reraMissing}</p>
            <p className="text-muted">{brand.legalName.value}</p>
          </FadeUp>

          {(timelineSample || builder.copySample) && <SmallPrint>{builder.smallPrint}</SmallPrint>}
        </div>
      </div>
    </Section>
  )
}
