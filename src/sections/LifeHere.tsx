import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SmallPrint } from '@/components/ui/SmallPrint'
import { amenities, amenitiesSmallPrint } from '@/data/amenities'
import { life } from '@/data/site'

/**
 * Static list (Phase 2). The title column is sticky on desktop; Phase 3 swaps
 * the images with a horizontal-slice wipe as each amenity reaches the middle.
 */
export function LifeHere() {
  return (
    <Section id="life" theme="ember" labelledBy="life-title" className="pt-0 md:pt-0">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--nav-h)+3rem)]">
            <SectionHeader id="life-title" label={life.label} title={life.title} />
            <SmallPrint className="mt-8">{amenitiesSmallPrint}</SmallPrint>
          </div>
        </div>

        <ol className="flex flex-col gap-16 md:col-span-8 md:gap-28">
          {amenities.map((item, i) => (
            <FadeUp
              as="li"
              key={item.id}
              className="grid gap-6 md:grid-cols-2 md:items-end md:gap-8"
            >
              <RevealImage
                image={item.image}
                ratio="4/3"
                sizes="(min-width: 900px) 30vw, 100vw"
                className="rounded-xl md:order-2"
              />
              <div className="flex flex-col gap-3 md:order-1">
                <span className="label text-ember-300">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-h3">{item.title}</h3>
                <p className="text-muted">{item.text}</p>
              </div>
            </FadeUp>
          ))}
        </ol>
      </div>
    </Section>
  )
}
