import { FadeUp } from '@/components/motion/FadeUp'
import { Img } from '@/components/ui/Img'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { materials } from '@/data/site'

export function Materials() {
  return (
    <Section id="materials" theme="linen" labelledBy="materials-title" className="pt-0 md:pt-0">
      <div className="wrap">
        <SectionHeader id="materials-title" label={materials.label} title={materials.title} />

        <FadeUp
          as="ul"
          stagger={0.12}
          className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-x-10"
        >
          {materials.items.map((item) => (
            <li key={item.id} className="flex flex-col items-center text-center">
              <Img
                image={item.image}
                ratio="1/1"
                sizes="(min-width: 900px) 20vw, 45vw"
                className="w-full max-w-[16rem] rounded-full transition-transform duration-500 hover:rotate-6"
              />
              <h3 className="mt-6 font-display text-2xl">{item.name}</h3>
              <p className="mt-2 max-w-[22ch] text-muted">{item.line}</p>
            </li>
          ))}
        </FadeUp>
      </div>
    </Section>
  )
}
