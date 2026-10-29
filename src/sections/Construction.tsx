import { FadeUp } from '@/components/motion/FadeUp'
import { Button } from '@/components/ui/Button'
import { RichTitle } from '@/components/ui/RichTitle'
import { RevealImage } from '@/components/motion/RevealImage'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { construction, projects } from '@/data/site'

/**
 * The client's message, set out plainly: the project is under construction, and it
 * can be customised however the buyer wants. The left card is the project itself,
 * named properly; no build stages are shown because none are confirmed.
 */
export function Construction() {
  return (
    <Section id="custom" theme="linen" labelledBy="custom-title">
      <div className="wrap">
        <SectionHeader
          id="custom-title"
          label={construction.label}
          title={construction.title}
          copy={construction.copy}
        />

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          <FadeUp className="flex flex-col rounded-card border border-line p-7 md:p-10">
            <p className="label text-muted">{construction.kicker}</p>
            <p className="mt-4 font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
              <RichTitle text={projects.current.display} />
            </p>
            <p className="mt-3 text-muted">{projects.current.place}</p>
            <span className="mt-8 inline-flex items-center gap-2.5 self-start rounded-full border border-ember-600/60 px-4 py-2 label">
              <span
                aria-hidden
                className="pulse-ring relative size-2.5 shrink-0 rounded-full bg-ember-400"
              />
              {construction.statusTitle}
            </span>
            <p className="mt-6 max-w-[34ch] text-muted">{construction.line}</p>
            <div className="mt-auto pt-10">
              <p className="label text-muted">{construction.typesLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {construction.types.map((type) => (
                  <li key={type} className="rounded-full border border-line px-4 py-2">
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp
            delay={0.1}
            className="flex flex-col rounded-card bg-ink-900 p-7 text-cream md:p-10"
          >
            <p className="label text-cream/60">{construction.customiseLabel}</p>
            <p className="mt-4 font-display text-h3">{construction.customiseTitle}</p>
            <ol className="mt-8 divide-y divide-cream/15 border-y border-cream/15">
              {construction.customiseItems.map((item, i) => (
                <li key={item.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-5">
                  <span className="pt-1.5 label text-ember-300 tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display text-[1.5rem] leading-tight">{item.title}</p>
                    <p className="mt-1 text-cream/70">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-auto pt-10">
              <Button href="#enquire">{construction.cta}</Button>
            </div>
          </FadeUp>
        </div>

        <div className="mt-14 md:mt-20">
          <p className="label text-muted">{construction.siteLabel}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-[1.78fr_0.8fr_0.8fr] md:items-start md:gap-8">
            {construction.photos.map((photo, i) => (
              <figure key={photo.src}>
                <RevealImage
                  image={photo}
                  ratio={i === 0 ? '16/9' : '4/5'}
                  position={'position' in photo ? photo.position : undefined}
                  sizes={
                    i === 0 ? '(min-width: 900px) 54vw, 100vw' : '(min-width: 900px) 24vw, 100vw'
                  }
                  className="rounded-card"
                />
                <figcaption className="mt-3 label text-muted">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
