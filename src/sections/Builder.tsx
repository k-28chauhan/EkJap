import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SmallPrint } from '@/components/ui/SmallPrint'
import { brand, builder } from '@/data/site'

export function Builder() {
  return (
    <Section id="builder" theme="stone" labelledBy="builder-title">
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

          <FadeUp>
            <p className="text-muted">{brand.legalName.value}</p>
          </FadeUp>

          {builder.copySample && <SmallPrint>{builder.smallPrint}</SmallPrint>}
        </div>
      </div>
    </Section>
  )
}
