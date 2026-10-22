/**
 * Shared, mutable state between the hero timelines (which tween it) and the mist
 * renderer (which reads it every frame). Plain numbers, so GSAP can tween them
 * directly with no React re-renders.
 */
export interface MistState {
  /** Resting density of the fog: 0.9 at first, easing to 0.55 as the letters are revealed */
  density: number
  /** 0 -> 1 as the intro fades the mist in */
  fade: number
  /** 0 -> 1 across the scroll-out: fog thickens, spreads over the screen and turns pale */
  out: number
  /** Cursor, -1..1 on each axis (desktop) */
  mouseX: number
  mouseY: number
  /** Where the band sits over the wordmark's lower half: centre and half-height, 0..1 up from the bottom */
  bandCenter: number
  bandWidth: number
}

export const createMistState = (): MistState => ({
  density: 0.55,
  fade: 1,
  out: 0,
  mouseX: 0,
  mouseY: 0,
  bandCenter: 0.3,
  bandWidth: 0.28,
})
