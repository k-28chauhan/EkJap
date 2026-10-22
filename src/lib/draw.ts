import { gsap, motion as tokens } from './gsap'

const SHAPES = 'path, line, polyline, polygon, circle, rect'

/**
 * Adds a "draw every stroke" sequence to a timeline (EKJAP_PLAN.md §6.2). Strokes
 * inside a `.glazing` group (the lit windows) draw last and brighten as they land.
 */
export function addDraw(
  timeline: gsap.core.Timeline,
  root: Element,
  { duration = tokens.draw.duration, stagger = 0.12 }: { duration?: number; stagger?: number } = {},
  at: gsap.Position = 0,
) {
  const shapes = gsap.utils.toArray<SVGGeometryElement>(SHAPES, root)
  const accent = shapes.filter((shape) => shape.closest('.glazing'))
  const base = shapes.filter((shape) => !shape.closest('.glazing'))

  timeline.from(base, { drawSVG: '0%', duration, ease: tokens.draw.ease, stagger }, at)
  if (accent.length) {
    timeline.from(
      accent,
      { drawSVG: '0%', duration: duration * 0.5, ease: tokens.draw.ease, stagger: 0.08 },
      '>-0.3',
    )
    timeline.from(accent, { opacity: 0.35, duration: 0.8, ease: 'power2.out' }, '<')
  }
  return timeline
}
