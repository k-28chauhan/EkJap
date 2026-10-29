import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { PhotoGrid, type PhotoSlot } from '@/components/ui/PhotoGrid'
import { RichTitle } from '@/components/ui/RichTitle'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { inside, projects } from '@/data/site'

/**
 * How photos sit in the asymmetric desktop grid. Layout only. The pattern repeats,
 * so the section takes however many photographs the client's last project supplies:
 * add them to `inside.photos` in src/data/site.ts.
 */
const layout: PhotoSlot[] = [
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

        <PhotoGrid
          photos={inside.photos}
          layout={layout}
          quote={{ text: inside.quote, after: QUOTE_AFTER }}
          className="mt-14 md:mt-24"
        />

        <div className="mt-24 md:mt-40">
          <SectionHeader
            id="customers-title"
            label={inside.customers.label}
            title={inside.customers.title}
            copy={inside.customers.copy}
          />
          {/* Columns, not a grid: people photographs keep their own shape, uncropped */}
          <div className="mt-12 gap-6 sm:columns-2 md:mt-16 md:columns-3 md:gap-8">
            {inside.customers.photos.map((photo) => (
              <RevealImage
                key={photo.src}
                image={photo}
                ratio={photo.ratio}
                sizes="(min-width: 900px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="mb-6 break-inside-avoid rounded-xl md:mb-8"
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
