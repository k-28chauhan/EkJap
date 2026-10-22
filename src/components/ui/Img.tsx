import type { ImageRef } from '@/data/types'
import { cn } from '@/lib/cn'
import { getPicture, MIME } from '@/lib/images'

interface ImgProps {
  image: ImageRef
  /** CSS aspect-ratio of the frame, e.g. '4/5'. Omit when the parent sizes the frame. */
  ratio?: string
  sizes?: string
  /** Above-the-fold image: loads eagerly with high fetch priority */
  priority?: boolean
  /** Show image.caption as a small pill over the bottom-left corner */
  showCaption?: boolean
  className?: string
  imgClassName?: string
  /** e.g. 'center 70%' */
  position?: string
  /** For decorative backgrounds: while the photo is missing, show nothing instead of the labelled placeholder */
  quiet?: boolean
}

/**
 * Responsive picture inside a clipped frame. When the photo has not been supplied
 * yet it renders a labelled placeholder, so layouts can be judged before the
 * art arrives.
 */
export function Img({
  image,
  ratio,
  sizes = '100vw',
  priority = false,
  showCaption = false,
  className,
  imgClassName,
  position,
  quiet = false,
}: ImgProps) {
  const picture = getPicture(image.src)
  const frame = cn('relative overflow-hidden', className)
  const style = ratio ? { aspectRatio: ratio } : undefined

  return (
    <div className={frame} style={style}>
      {picture ? (
        <picture>
          {Object.entries(picture.sources).map(([format, srcSet]) => (
            <source key={format} type={MIME[format]} srcSet={srcSet} sizes={sizes} />
          ))}
          <img
            src={picture.img.src}
            width={picture.img.w}
            height={picture.img.h}
            alt={image.alt}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding={priority ? 'sync' : 'async'}
            style={position ? { objectPosition: position } : undefined}
            className={cn('h-full w-full object-cover', imgClassName)}
          />
        </picture>
      ) : quiet ? null : (
        <div
          role="img"
          aria-label={image.alt}
          className="flex h-full min-h-40 w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-fg/10 to-fg/5 p-4 text-center"
        >
          <span className="label text-muted">Photo to come</span>
          <span className="max-w-[28ch] font-display text-lg leading-snug text-fg/70 italic">
            {image.caption ?? image.alt}
          </span>
        </div>
      )}
      {showCaption && image.caption && picture && (
        <span className="absolute bottom-3 left-3 rounded-full px-3 py-1.5 label text-cream glass">
          {image.caption}
        </span>
      )}
    </div>
  )
}
