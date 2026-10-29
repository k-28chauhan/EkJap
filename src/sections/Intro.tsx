import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { RichTitle } from '@/components/ui/RichTitle'
import { Section } from '@/components/ui/Section'
import { intro } from '@/data/site'

/**
 * "A window above the clouds". On desktop the three heading lines are spread
 * over a portrait photo so the middle word sits on the glass, in white; the other
 * two lines sit just clear of the photo, so dark type never lands on the dark
 * image. On mobile the heading is one block above the photo.
 */
export function Intro() {
  const [top, middle, bottom] = intro.titleLines

  return (
    <Section id="intro" theme="mist" themeStart="top 100%" labelledBy="intro-title">
      <div className="wrap">
        <FadeUp as="p" className="mb-6 label text-muted md:text-center">
          {intro.label}
        </FadeUp>

        <div className="relative mx-auto flex max-w-[64rem] flex-col md:grid md:place-items-center md:py-[1.1em] md:text-[clamp(4rem,8.6vw,9rem)]">
          <SplitHeading
            id="intro-title"
            className="font-display text-h2 text-balance md:z-10 md:col-start-1 md:row-start-1 md:flex md:h-[calc(100%+2.2em)] md:w-full md:flex-col md:items-center md:justify-between md:py-0 md:text-[1em] md:leading-[0.9]"
          >
            <span className="md:block">
              <RichTitle text={top} />{' '}
            </span>
            <span className="md:block md:text-[#fff]">
              <RichTitle text={middle} />{' '}
            </span>
            <span className="md:block">
              <RichTitle text={bottom} />
            </span>
          </SplitHeading>

          <RevealImage
            image={intro.image}
            ratio="3/4"
            sizes="(min-width: 900px) 28rem, 100vw"
            position="center 55%"
            parallax
            className="mt-10 w-full rounded-t-[12rem] rounded-b-2xl md:col-start-1 md:row-start-1 md:mt-0 md:w-[min(28rem,42vw)]"
          />
        </div>

        <FadeUp as="p" className="mt-12 measure text-muted md:mt-28 md:ml-auto md:max-w-[34ch]">
          {intro.copy}
        </FadeUp>
      </div>
    </Section>
  )
}
