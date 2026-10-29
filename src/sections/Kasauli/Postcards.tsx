import { useRef } from 'react'
import { Img } from '@/components/ui/Img'
import { postcards, postcardsLabel } from '@/data/town'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'
import { useMotion } from '@/lib/useMotion'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Part B (EKJAP_PLAN.md §9.3). Desktop with motion: the block pins and vertical
 * scroll carries a strip of tall "postcards" sideways. Cards start with a slight
 * tilt that straightens as they reach the middle, each photo drifts inside its
 * frame, and a road line beneath carries a dot that travels with the scroll.
 * Everywhere else it is the plain swipeable scroll-snap row.
 */
export function PostcardRow() {
  const block = useRef<HTMLDivElement>(null)

  useMotion(block, ({ motion, desktop }) => {
    const el = block.current
    if (!el || !motion || !desktop) return

    const q = <T extends HTMLElement>(name: string) =>
      el.querySelector<T>(`[data-gallery="${name}"]`)
    const scroller = q('scroller')
    const track = q('track')
    const road = q('road')
    const fill = q('fill')
    const dot = q('dot')
    const counter = q('counter')
    const hairline = q('hairline')
    if (!scroller || !track || !road || !fill || !dot || !counter || !hairline) return

    const cards = gsap.utils.toArray<HTMLElement>('[data-gallery="card"]', el)
    const layers = gsap.utils.toArray<HTMLElement>('[data-gallery="layer"]', el)
    const ticks = gsap.utils.toArray<HTMLElement>('[data-gallery="tick"]', el)

    // Pinned layout: one screen tall, the strip clipped and driven by transform
    gsap.set(el, {
      height: '100svh',
      paddingTop: 'var(--nav-h)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    })
    gsap.set(scroller, { overflow: 'hidden', scrollSnapType: 'none' })
    gsap.set(track, { paddingLeft: '45vw', paddingRight: '20vw' })
    gsap.set(road, { display: 'block' })
    gsap.set(hairline, { display: 'none' })

    const distance = () => Math.max(1, track.scrollWidth - scroller.clientWidth)
    const dotTravel = () => road.clientWidth - dot.offsetWidth
    // Scroll progress at which each card sits centred, for the road's stop marks
    const centred = cards.map(
      (card) => () =>
        gsap.utils.clamp(
          0,
          1,
          (card.offsetLeft + card.offsetWidth / 2 - scroller.clientWidth / 2) / distance(),
        ),
    )

    const setDot = gsap.quickSetter(dot, 'x', 'px')
    const setFill = gsap.quickSetter(fill, 'scaleX')

    const slide = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        // A longer run than the strip is wide: three cards need room to be read
        end: () => `+=${Math.round(distance() * 1.6)}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onRefresh: () => {
          ticks.forEach((tick, i) => {
            tick.style.left = `calc(${centred[i]()} * (100% - 12px) + 6px)`
          })
        },
      },
      onUpdate(this: gsap.core.Tween) {
        const progress = this.progress()
        setDot(progress * dotTravel())
        setFill(progress)
        const nearest = centred.reduce(
          (best, at, i) =>
            Math.abs(at() - progress) < Math.abs(centred[best]() - progress) ? i : best,
          0,
        )
        counter.textContent = `${pad(nearest + 1)} / ${pad(cards.length)}`
      },
    })

    // Tilt straightens as each card reaches the middle of the screen
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { rotation: i % 2 === 0 ? -1.5 : 1.5 },
        {
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: slide,
            start: 'left 80%',
            end: 'left 38%',
            scrub: true,
          },
        },
      )
    })

    // Each photograph drifts inside its frame as it crosses the screen
    layers.forEach((layer) => {
      gsap.fromTo(
        layer,
        { xPercent: -6 },
        {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: layer.parentElement,
            containerAnimation: slide,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        },
      )
    })
  })

  return (
    <div ref={block} className="mt-20 md:mt-32">
      <div
        data-gallery="scroller"
        tabIndex={0}
        role="region"
        aria-label={postcardsLabel}
        className="snap-x snap-mandatory [scrollbar-width:thin] overflow-x-auto py-6 md:py-10"
      >
        <div data-gallery="track" className="relative flex w-max gap-5 px-(--gutter) md:gap-8">
          {postcards.map((card, i) => (
            <figure
              key={card.id}
              data-gallery="card"
              className={cn(
                'w-[74vw] shrink-0 snap-center sm:w-[22rem] md:w-[min(28rem,38svh)]',
                i % 2 === 1 && 'md:mt-10',
              )}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                {/* Wider than the frame, so it has room to drift */}
                <div data-gallery="layer" className="absolute -inset-x-[8%] inset-y-0">
                  <Img
                    image={card.image}
                    sizes="(min-width: 900px) 34rem, 80vw"
                    className="size-full"
                  />
                </div>
              </div>
              <figcaption className="mt-5 flex flex-col gap-2">
                <span className="label text-muted">{card.distance}</span>
                <span className="font-display text-h3">{card.name}</span>
                <span className="text-muted">{card.line}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="wrap">
        {/* Desktop with motion: the road, a dot travelling along it, and a mark at each postcard */}
        <div data-gallery="road" aria-hidden className="relative mt-4 hidden h-6">
          <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
          <span
            data-gallery="fill"
            className="absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-fg"
          />
          {postcards.map((card) => (
            <span
              key={card.id}
              data-gallery="tick"
              className="absolute top-1/2 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-fg/50"
            />
          ))}
          <span
            data-gallery="dot"
            className="absolute top-1/2 left-0 size-3 -translate-y-1/2 rounded-full bg-ember-400 shadow-ember"
          />
          <span
            data-gallery="counter"
            className="absolute right-0 -bottom-6 label text-muted tabular"
          >
            01 / {pad(postcards.length)}
          </span>
        </div>
        <div data-gallery="hairline" aria-hidden className="mt-6 hairline-t md:mt-10" />
      </div>
    </div>
  )
}
