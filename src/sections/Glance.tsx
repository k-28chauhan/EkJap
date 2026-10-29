import { CountUp } from '@/components/motion/CountUp'
import { DrawSvg } from '@/components/motion/DrawSvg'
import { FadeUp } from '@/components/motion/FadeUp'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { glance } from '@/data/site'
import { cn } from '@/lib/cn'
import { Contours } from '@/svg/Contours'

/** Where each figure sits on the desktop grid, and how large it is set. Layout only: the numbers live in data. */
const placement: Record<string, { grid: string; size: string }> = {
  altitude: {
    grid: 'col-span-2 md:col-span-6 md:col-start-1 md:row-start-1',
    size: 'text-[clamp(5rem,12vw,11rem)]',
  },
  drive: {
    grid: 'md:col-span-4 md:col-start-8 md:row-start-1 md:mt-28',
    size: 'text-[clamp(2.75rem,5.5vw,5.5rem)]',
  },
  cottages: {
    grid: 'md:col-span-4 md:col-start-2 md:row-start-2 md:mt-10',
    size: 'text-[clamp(4rem,8vw,8rem)]',
  },
  forest: {
    grid: 'md:col-span-4 md:col-start-7 md:row-start-2 md:mt-36',
    size: 'text-[clamp(3rem,6vw,6rem)]',
  },
  temp: {
    grid: 'col-span-2 md:col-span-3 md:col-start-10 md:row-start-3 md:-mt-8',
    size: 'text-[clamp(2.5rem,4.5vw,4.5rem)]',
  },
}

export function Glance() {
  return (
    <Section id="glance" theme="mist" labelledBy="glance-title" className="overflow-hidden">
      {/* The contour lines draw themselves in slowly as the section arrives */}
      <DrawSvg
        className="pointer-events-none absolute inset-0 text-fg opacity-[0.12]"
        duration={2.6}
        stagger={0.09}
        start="top 70%"
      >
        <Contours className="size-full" />
      </DrawSvg>

      <div className="relative wrap">
        <SectionHeader id="glance-title" label={glance.label} title={glance.title} />

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-24 md:grid-cols-12 md:gap-y-0">
          {glance.stats.map((stat) => {
            const { grid, size } = placement[stat.id]
            return (
              <FadeUp key={stat.id} className={cn('flex flex-col-reverse gap-2', grid)}>
                <dt className="label text-muted">{stat.label}</dt>
                <dd className={cn('font-display leading-[0.9] tracking-[-0.03em] tabular', size)}>
                  <CountUp value={stat.value} display={stat.display} format={stat.format} />
                  {stat.unit && (
                    <span className="ml-1 text-[0.4em] tracking-normal italic">{stat.unit}</span>
                  )}
                </dd>
              </FadeUp>
            )
          })}
        </dl>
      </div>
    </Section>
  )
}
