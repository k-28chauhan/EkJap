import { Img } from '@/components/ui/Img'
import { hero } from '@/data/site'

/**
 * The hero's image stack, back to front (EKJAP_PLAN.md §7.2). Each layer has a
 * data-hero hook the timelines grab:
 *   plate-mouse > plate-scroll > plate-intro > the photograph, with the window glow
 *   inside it, so the glow stays on the cottage however the frame crops or scales.
 * The plate is a cover-fit box that keeps the photo's own aspect ratio, which is
 * what lets the glow sit at fixed percentages of the picture.
 */
export function HeroLayers({ mist }: { mist: 'webgl' | 'css' }) {
  const { plate } = hero

  return (
    <>
      {/* 0: sky */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-pine-950 to-pine-900" />

      {/* 1: the photograph (far ridges, hills, the cottage and the pines in one plate for now) */}
      <div data-hero="plate-mouse" aria-hidden className="absolute -inset-[2.5%]">
        <div data-hero="plate-scroll" className="absolute inset-0 origin-[28%_100%]">
          <div data-hero="plate-intro" className="[container-type:size] absolute inset-0">
            <div
              className="absolute"
              style={{
                aspectRatio: plate.ratio,
                width: `max(100cqw, calc(100cqh * ${plate.ratio}))`,
                left: `${plate.anchor.x}%`,
                top: `${plate.anchor.y}%`,
                translate: `-${plate.anchor.x}% -${plate.anchor.y}%`,
              }}
            >
              <Img image={hero.image} priority sizes="100vw" className="size-full" />
              {/* The lit window: a warm glow, screen-blended, with a gentle flicker */}
              <div
                data-hero="glow"
                className="pointer-events-none absolute aspect-square w-[5%] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
                style={{
                  left: `${plate.window.x}%`,
                  top: `${plate.window.y}%`,
                  background:
                    'radial-gradient(closest-side, rgb(244 192 125 / 0.85), rgb(233 163 92 / 0.32) 42%, transparent 72%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrims keep the copy and wordmark readable over the photograph */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-pine-950/70 via-pine-950/20 to-pine-950/85"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-pine-950/70 via-pine-950/15 to-transparent md:via-transparent"
      />
      {/* A soft dark pool behind the copy column, where the photograph is brightest (fog and sky) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_24%,rgb(18_24_19/0.6),transparent_58%)]"
      />

      {/* 2: back mist, drifting behind the letters (CSS) */}
      <div
        data-hero="back-mist"
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[6%] h-[46%] overflow-hidden opacity-60 [--fog:rgb(185_189_180/0.3)]"
      >
        <div className="mist-layer" data-slow />
      </div>

      {/* The CSS front mist: only rendered when the shader is not running */}
      {mist === 'css' && (
        <div
          data-hero="css-mist"
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[2%] h-[56%] origin-bottom overflow-hidden [--fog:rgb(185_189_180/0.5)]"
        >
          <div className="mist-layer" />
          <div className="mist-layer" data-slow />
        </div>
      )}
    </>
  )
}
