import { RevealImage } from '@/components/motion/RevealImage'
import { FadeUp } from '@/components/motion/FadeUp'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SmallPrint } from '@/components/ui/SmallPrint'
import { inside } from '@/data/site'
import { cn } from '@/lib/cn'

/** How each of the six photos sits in the asymmetric desktop grid. Layout only. */
const layout = [
  { span: 'md:col-span-8', ratio: '16/10' },
  { span: 'md:col-span-4 md:mt-28', ratio: '3/4' },
  { span: 'md:col-span-4', ratio: '1/1' },
  { span: 'md:col-span-4 md:mt-16', ratio: '1/1' },
  { span: 'md:col-span-4 md:-mt-8', ratio: '4/5' },
  { span: 'md:col-span-7 md:col-start-1', ratio: '16/10' },
]

const zoom = 'transition-transform duration-700 ease-out group-hover/photo:scale-[1.04]'

function Photo({ index }: { index: number }) {
  const photo = inside.photos[index]
  return (
    <figure className={cn('group/photo', layout[index].span)}>
      <RevealImage
        image={photo}
        ratio={layout[index].ratio}
        sizes="(min-width: 900px) 60vw, 100vw"
        parallax
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

        <div className="mt-14 grid gap-x-6 gap-y-10 md:mt-24 md:grid-cols-12 md:gap-y-16">
          {[0, 1, 2, 3, 4].map((i) => (
            <Photo key={i} index={i} />
          ))}

          <FadeUp
            as="blockquote"
            className="font-display text-h3 text-balance italic md:col-span-5 md:col-start-8 md:self-center"
          >
            “{inside.quote}”
          </FadeUp>

          <Photo index={5} />
        </div>

        <SmallPrint className="mt-12">{inside.smallPrint}</SmallPrint>
      </div>
    </Section>
  )
}
