import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SmallPrint } from '@/components/ui/SmallPrint'
import { goa } from '@/data/goa'
import { prefillEnquiry } from '@/lib/enquiryStore'

/** The Goa project's opening screen. A typographic hero for now: there are no Goa photographs yet. */
export function GoaHero() {
  return (
    <Section id="goa" theme="night" local flush labelledBy="goa-title" className="overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-pine-950 via-pine-900 to-pine-950"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(ellipse_at_30%_100%,rgb(233_163_92/0.16),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[4%] h-[42%] overflow-hidden opacity-70 [--fog:rgb(185_189_180/0.28)]"
      >
        <div className="mist-layer" />
        <div className="mist-layer" data-slow />
      </div>

      <div className="relative wrap flex min-h-[88svh] flex-col justify-end gap-6 pt-[calc(var(--nav-h)+3rem)] pb-16 md:pb-24">
        <FadeUp as="p" className="label text-cream/80">
          {goa.eyebrow}
        </FadeUp>
        <SplitHeading
          as="h1"
          id="goa-title"
          className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.9] tracking-[-0.03em] text-cream"
        >
          {goa.title}
        </SplitHeading>
        <FadeUp delay={0.2} className="flex max-w-[40rem] flex-col items-start gap-6">
          <p className="font-display text-h3 text-cream italic">{goa.tagline}</p>
          <p className="max-w-[44ch] text-cream/80">{goa.paragraph}</p>
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

/** Placeholder photograph slots and a "coming soon" note. */
export function GoaDetails() {
  const { details } = goa
  return (
    <Section id="goa-details" theme="mist" labelledBy="goa-details-title">
      <div className="wrap">
        <SectionHeader
          id="goa-details-title"
          label={details.label}
          title={details.title}
          copy={details.copy}
        />
        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
          {details.photos.map((photo) => (
            <figure key={photo.src}>
              <RevealImage
                image={photo}
                ratio="4/5"
                sizes="(min-width: 900px) 30vw, 100vw"
                parallax
                className="rounded-xl"
              />
              <figcaption className="mt-3 label text-muted">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        <SmallPrint className="mt-12">{details.smallPrint}</SmallPrint>
      </div>
    </Section>
  )
}
