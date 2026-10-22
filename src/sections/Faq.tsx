import { useRef, type MouseEvent } from 'react'
import { FadeUp } from '@/components/motion/FadeUp'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SmallPrint } from '@/components/ui/SmallPrint'
import { faqs } from '@/data/faq'
import { faqSection } from '@/data/site'
import { useGSAP, gsap } from '@/lib/gsap'

const panelOf = (details: HTMLDetailsElement) =>
  details.querySelector<HTMLElement>('[data-faq-panel]')

/** schema.org FAQPage for search results (EKJAP_PLAN.md §9.11). Answers are drafts until confirmed. */
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})

/**
 * Native <details> elements, so the list works with no JavaScript. With JavaScript
 * (and motion allowed) it becomes a one-at-a-time accordion whose panels animate
 * their height with GSAP: the plan asks for this here, so it is the one place
 * height is tweened rather than transform. Reduced motion toggles instantly.
 */
export function Faq() {
  const list = useRef<HTMLDivElement>(null)
  const motion = useRef(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        motion.current = true
        const items = list.current?.querySelectorAll<HTMLDetailsElement>('details') ?? []
        // The shared `name` closes siblings instantly; we close them ourselves, with a tween
        items.forEach((item) => item.removeAttribute('name'))
        return () => {
          motion.current = false
        }
      })
      return () => mm.revert()
    },
    { scope: list },
  )

  const open = (details: HTMLDetailsElement) => {
    const panel = panelOf(details)
    details.open = true
    if (panel) {
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          clearProps: 'height,opacity',
        },
      )
    }
  }

  const close = (details: HTMLDetailsElement) => {
    const panel = panelOf(details)
    if (!panel) {
      details.open = false
      return
    }
    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => {
        details.open = false
        gsap.set(panel, { clearProps: 'height,opacity' })
      },
    })
  }

  const onToggle = (event: MouseEvent<HTMLElement>) => {
    if (!motion.current) return // reduced motion or no GSAP yet: the browser handles it
    event.preventDefault()
    const details = event.currentTarget.parentElement as HTMLDetailsElement
    if (details.open) {
      close(details)
      return
    }
    list.current
      ?.querySelectorAll<HTMLDetailsElement>('details[open]')
      .forEach((other) => other !== details && close(other))
    open(details)
  }

  return (
    <Section id="faq" theme="stone" labelledBy="faq-title" className="pt-0 md:pt-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--nav-h)+3rem)]">
            <SectionHeader id="faq-title" label={faqSection.label} title={faqSection.title} />
          </div>
        </div>

        <div className="md:col-span-7">
          <div ref={list}>
            <FadeUp stagger={0.06} className="hairline-t">
              {faqs.map((item, i) => (
                <details key={item.id} name="faq" open={i === 0} className="group hairline-b">
                  <summary
                    onClick={onToggle}
                    className="flex cursor-pointer list-none items-baseline gap-5 py-6 marker:hidden [&::-webkit-details-marker]:hidden"
                  >
                    <span className="w-8 shrink-0 label text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display text-h3">{item.question}</span>
                    <span
                      aria-hidden
                      className="text-2xl leading-none transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div data-faq-panel className="overflow-hidden">
                    <p className="measure pr-10 pb-7 pl-[3.25rem] text-muted">{item.answer}</p>
                  </div>
                </details>
              ))}
            </FadeUp>
          </div>
          <SmallPrint className="mt-6">{faqSection.smallPrint}</SmallPrint>
        </div>
      </div>
    </Section>
  )
}
