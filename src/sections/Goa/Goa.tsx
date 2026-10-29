import { FadeUp } from '@/components/motion/FadeUp'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Button } from '@/components/ui/Button'
import { Img } from '@/components/ui/Img'
import { RichTitle } from '@/components/ui/RichTitle'
import { PhotoGrid, type PhotoSlot } from '@/components/ui/PhotoGrid'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { goa } from '@/data/goa'
import { prefillEnquiry } from '@/lib/enquiryStore'

/** The Goa project's opening screen: EkJap Paradise Palms, a completed project, over its entrance photograph. */
export function GoaHero() {
  return (
    <Section id="goa" theme="night" local flush labelledBy="goa-title" className="overflow-hidden">
      <Img image={goa.image} priority sizes="100vw" className="absolute inset-0 h-full" />
      {/* Scrims keep the copy legible over the bright photograph */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/10 to-pine-950/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-pine-950/35 via-transparent to-transparent"
      />

      <div className="relative wrap flex min-h-[88svh] flex-col justify-end gap-4 pt-[calc(var(--nav-h)+3rem)] pb-12 md:pb-16">
        <FadeUp className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-cream/40 px-4 py-2 label text-cream">
            <span aria-hidden className="size-2 rounded-full bg-cream" />
            {goa.status}
          </span>
          <p className="label text-cream/85">{goa.eyebrow}</p>
        </FadeUp>
        <SplitHeading
          as="h1"
          id="goa-title"
          className="font-display text-[clamp(1.75rem,3.2vw,3.25rem)] leading-[1.05] tracking-[-0.015em] text-balance text-cream"
        >
          <RichTitle text={goa.heading} />
        </SplitHeading>
        <FadeUp delay={0.2} className="flex max-w-[40rem] flex-col items-start gap-6">
          <p className="max-w-[44ch] text-cream/85">{goa.paragraph}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="#enquire" onClick={() => prefillEnquiry({ topic: goa.title })}>
              {goa.ask}
            </Button>
            <Button href={goa.back.href} variant="outline" className="text-cream">
              {goa.back.label}
            </Button>
          </div>
        </FadeUp>
      </div>
    </Section>
  )
}

/** Landscape-friendly slots: the pairs are sized to the same height (7 : 5 columns at 16/10 : 8/7). */
const galleryLayout: PhotoSlot[] = [
  { span: 'md:col-span-12', ratio: '2/1' },
  { span: 'md:col-span-6', ratio: '4/3' },
  { span: 'md:col-span-6', ratio: '4/3' },
  { span: 'md:col-span-7', ratio: '16/10' },
  { span: 'md:col-span-5', ratio: '8/7' },
  { span: 'md:col-span-5', ratio: '8/7' },
  { span: 'md:col-span-7', ratio: '16/10' },
  { span: 'md:col-span-6', ratio: '4/3' },
  { span: 'md:col-span-6', ratio: '4/3' },
  { span: 'md:col-span-7', ratio: '16/10' },
  { span: 'md:col-span-5', ratio: '8/7' },
]

/** Photographs of the finished building, in the order: building, pool, open spaces, rooms, the rest. */
export function GoaGallery() {
  const { gallery } = goa
  return (
    <Section id="goa-gallery" theme="linen" labelledBy="goa-gallery-title">
      <div className="wrap">
        <SectionHeader
          id="goa-gallery-title"
          label={gallery.label}
          title={gallery.title}
          copy={gallery.copy}
        />
        <PhotoGrid
          photos={gallery.photos}
          layout={galleryLayout}
          className="mt-14 md:mt-24 md:items-start"
        />
      </div>
    </Section>
  )
}
