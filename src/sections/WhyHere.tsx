import { FadeUp } from '@/components/motion/FadeUp'
import { Img } from '@/components/ui/Img'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SmallPrint } from '@/components/ui/SmallPrint'
import { why } from '@/data/site'

/**
 * Evening by the fire: a full-bleed photograph under a warm scrim, with four
 * glass cards whose arched tops echo cottage windows. Phase 3 pins the
 * background and raises the cards one by one.
 */
export function WhyHere() {
  return (
    <Section id="why" theme="ember" local labelledBy="why-title" className="overflow-hidden">
      <Img image={why.background} sizes="100vw" quiet className="absolute inset-0 h-full" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ember-950 via-ember-950/70 to-ember-950"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[60%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgb(233_163_92/0.22),transparent_65%)]"
      />

      <div className="relative wrap">
        <SectionHeader id="why-title" label={why.label} title={why.title} />

        <FadeUp
          as="ul"
          stagger={0.14}
          className="mt-14 grid gap-6 sm:grid-cols-2 md:mt-24 lg:grid-cols-4"
        >
          {why.cards.map((card, i) => (
            <li
              key={card.id}
              className="flex min-h-72 flex-col justify-end gap-3 rounded-t-[12rem] rounded-b-card px-7 pt-24 pb-8 glass sm:min-h-80"
            >
              <span className="label text-ember-300">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-h3">{card.title}</h3>
              <p className="text-fg/75">{card.text}</p>
            </li>
          ))}
        </FadeUp>

        <SmallPrint className="mt-10">{why.smallPrint}</SmallPrint>
      </div>
    </Section>
  )
}
