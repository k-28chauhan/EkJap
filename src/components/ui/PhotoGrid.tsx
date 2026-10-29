import { Fragment } from 'react'
import { FadeUp } from '@/components/motion/FadeUp'
import { RevealImage } from '@/components/motion/RevealImage'
import type { ImageRef } from '@/data/types'
import { cn } from '@/lib/cn'

/** How one photograph sits in the 12-column desktop grid. Layout only. */
export interface PhotoSlot {
  span: string
  ratio: string
}

interface PhotoGridProps {
  photos: readonly ImageRef[]
  /** Slots are used in order and repeat, so the grid takes however many photographs it is given */
  layout: readonly PhotoSlot[]
  /** A pull-quote set after this many photographs (optional) */
  quote?: { text: string; after: number }
  className?: string
}

const zoom = 'transition-transform duration-700 ease-out group-hover/photo:scale-[1.04]'

/** An asymmetric photo grid: each photograph reveals as it arrives, with its caption below. */
export function PhotoGrid({ photos, layout, quote, className }: PhotoGridProps) {
  return (
    <div className={cn('grid gap-x-6 gap-y-10 md:grid-cols-12 md:gap-y-16', className)}>
      {photos.map((photo, i) => {
        const slot = layout[i % layout.length]
        return (
          <Fragment key={photo.src}>
            <figure className={cn('group/photo', slot.span)}>
              <RevealImage
                image={photo}
                ratio={slot.ratio}
                sizes="(min-width: 900px) 60vw, 100vw"
                parallax
                position={photo.position}
                imgClassName={zoom}
                className="rounded-xl"
              />
              <FadeUp as="figcaption" className="mt-3 label text-muted">
                {photo.caption}
              </FadeUp>
            </figure>
            {quote && i === quote.after - 1 && photos.length > quote.after && (
              <FadeUp
                as="blockquote"
                className="font-display text-h3 text-balance italic md:col-span-5 md:col-start-8 md:self-center"
              >
                “{quote.text}”
              </FadeUp>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
