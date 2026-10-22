import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { RichTitle } from '@/components/ui/RichTitle'
import { townIntro } from '@/data/town'

/** Part A: a large town photograph with the title overlapping its right edge. */
export function TownIntro() {
  return (
    <div className="wrap grid gap-8 md:grid-cols-12 md:gap-x-6">
      <RevealImage
        image={townIntro.image}
        ratio="4/3"
        sizes="(min-width: 900px) 55vw, 100vw"
        parallax
        className="rounded-2xl md:col-span-7 md:col-start-1 md:row-span-2 md:row-start-1"
      />
      <header className="flex flex-col gap-5 md:z-10 md:col-span-7 md:col-start-6 md:row-start-1 md:mt-16">
        <FadeUp as="p" className="label text-muted">
          {townIntro.label}
        </FadeUp>
        <SplitHeading id="town-title" className="font-display text-h2 text-balance">
          <RichTitle text={townIntro.title} />
        </SplitHeading>
      </header>
      <FadeUp
        as="p"
        delay={0.15}
        className="measure text-muted md:col-span-4 md:col-start-9 md:row-start-2 md:self-end"
      >
        {townIntro.copy}
      </FadeUp>
    </div>
  )
}
