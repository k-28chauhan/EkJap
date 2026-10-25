import { Fragment } from 'react'
import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { RichTitle } from '@/components/ui/RichTitle'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SmallPrint } from '@/components/ui/SmallPrint'
import { inside, projects } from '@/data/site'
import { cn } from '@/lib/cn'

/**
 * How photos sit in the asymmetric desktop grid. Layout only. The pattern repeats,
 * so the section takes however many photographs the client's last project supplies:
 * add them to `inside.photos` in src/data/site.ts.
 */
const layout = [
  { span: 'md:col-span-8', ratio: '16/10' },
  { span: 'md:col-span-4 md:mt-28', ratio: '3/4' },
  { span: 'md:col-span-4', ratio: '1/1' },
  { span: 'md:col-span-4 md:mt-16', ratio: '1/1' },
  { span: 'md:col-span-4 md:-mt-8', ratio: '4/5' },
  { span: 'md:col-span-7 md:col-start-1', ratio: '16/10' },
  { span: 'md:col-span-4 md:col-start-1 md:self-center', ratio: '1/1' },
  { span: 'md:col-span-8 md:col-start-5', ratio: '16/10' },
]

/** The pull-quote sits after this many photographs */
const QUOTE_AFTER = 6

const zoom = 'transition-transform duration-700 ease-out group-hover/photo:scale-[1.04]'

function Photo({ index }: { index: number }) {
  const photo = inside.photos[index]
  const place = layout[index % layout.length]
  return (
    <figure className={cn('group/photo', place.span)}>
      <RevealImage
        image={photo}
        ratio={place.ratio}
        sizes="(min-width: 900px) 60vw, 100vw"
        parallax
        position={photo.position}
        imgClassName={zoom}
        className="rounded-xl"
      />
      <FadeUp as="figcaption" className="mt-3 label text-muted">
        {photo.caption}
      </FadeUp>
    </figure>
  )
}

export function Inside() {
  return (
    <Section id="inside" theme="linen" labelledBy="inside-title">
      <div className="wrap">
        <SectionHeader
          id="inside-title"
          label={inside.label}
          title={inside.title}
          copy={inside.copy}
        />

        <FadeUp className="mt-12 flex flex-col gap-8 rounded-card bg-ink-900 p-8 text-cream md:mt-16 md:flex-row md:items-end md:justify-between md:gap-12 md:p-14">
          <div>
            <p className="label text-cream/60">{inside.project.kicker}</p>
            <p className="mt-4 font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
              <RichTitle text={projects.built.display} />
            </p>
            <p className="mt-5 label text-cream/75">{projects.built.facts.join(' · ')}</p>
          </div>
          <div className="flex flex-col items-start gap-6 md:max-w-[26rem] md:items-end md:text-right">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-4 py-2 label">
              <span aria-hidden className="size-2 rounded-full bg-cream" />
              {inside.project.status}
            </span>
            <p className="text-cream/75">{inside.project.line}</p>
            <Button href={inside.project.cta.href} className="md:self-end">
              {inside.project.cta.label}
            </Button>
          </div>
        </FadeUp>

        <div className="mt-14 grid gap-x-6 gap-y-10 md:mt-24 md:grid-cols-12 md:gap-y-16">
          {inside.photos.map((photo, i) => (
            <Fragment key={photo.src}>
              <Photo index={i} />
              {i === QUOTE_AFTER - 1 && inside.photos.length > QUOTE_AFTER && (
                <FadeUp
                  as="blockquote"
                  className="font-display text-h3 text-balance italic md:col-span-5 md:col-start-8 md:self-center"
                >
                  “{inside.quote}”
                </FadeUp>
              )}
            </Fragment>
          ))}
        </div>

        <SmallPrint className="mt-12">{inside.smallPrint}</SmallPrint>
      </div>
    </Section>
  )
}
