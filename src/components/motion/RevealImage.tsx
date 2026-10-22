import { useRef } from 'react'
import type { ImageRef } from '@/data/types'
import { cn } from '@/lib/cn'
import { gsap, motion as tokens } from '@/lib/gsap'
import { useMotionInert } from '@/lib/motionContext'
import { revealTrigger, useMotion } from '@/lib/useMotion'
import { Img } from '../ui/Img'
import { Parallax } from './Parallax'

interface RevealImageProps {
  image: ImageRef
  ratio: string
  sizes?: string
  /** Slow scrubbed drift inside the frame (desktop) */
  parallax?: boolean
  /** Small caption pill over the bottom-left corner */
  showCaption?: boolean
  position?: string
  className?: string
  imgClassName?: string
}

/**
 * Wipes up from the bottom (clip-path) while the picture settles from 1.15x to
 * 1x (§6.2). Reduced motion: a 0.3s fade.
 */
export function RevealImage({
  image,
  ratio,
  sizes,
  parallax = false,
  showCaption = false,
  position,
  className,
  imgClassName,
}: RevealImageProps) {
  const frame = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  const inert = useMotionInert()
  useMotion(frame, ({ motion, reduce }) => {
    if (inert) return
    const el = frame.current
    if (!el) return

    if (reduce) {
      gsap.from(el, {
        opacity: 0,
        duration: tokens.reduced.duration,
        ease: tokens.reduced.ease,
        scrollTrigger: revealTrigger(el),
      })
      return
    }
    if (!motion) return

    const timeline = gsap.timeline({
      scrollTrigger: revealTrigger(el),
      defaults: { duration: tokens.image.duration, ease: tokens.image.ease },
    })
    timeline
      .fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', clearProps: 'clipPath' },
        0,
      )
      .from(inner.current, { scale: tokens.image.scaleFrom }, 0)
  })

  const picture = (
    <Img
      image={image}
      sizes={sizes}
      position={position}
      className="size-full"
      imgClassName={imgClassName}
    />
  )

  return (
    <div
      ref={frame}
      className={cn('relative overflow-hidden', className)}
      style={{ aspectRatio: ratio }}
    >
      <div ref={inner} className="absolute inset-0">
        {parallax ? <Parallax>{picture}</Parallax> : picture}
      </div>
      {showCaption && image.caption && (
        <span className="absolute bottom-3 left-3 rounded-full px-3 py-1.5 label text-cream glass">
          {image.caption}
        </span>
      )}
    </div>
  )
}
