/** Section themes (EKJAP_PLAN.md §0, §6.3). Each maps to a [data-theme] block in index.css. */
export type Theme = 'night' | 'mist' | 'day' | 'linen' | 'ember' | 'stone' | 'dusk'

export type CottageType = 'pine' | 'ridge' | 'deodar'

/**
 * A source image under /assets/images. `src` is the path relative to that folder
 * (e.g. 'town/town-01-mall-road.jpg'); the `Img` component resolves it through
 * vite-imagetools. Alt text is written here, never in components.
 */
export interface ImageRef {
  src: string
  alt: string
  /** Shown as a small caption, e.g. 'Representative image' on cottage exteriors */
  caption?: string
}

/**
 * A figure or fact the client has not confirmed. While `sample` is true the UI
 * shows "sample" small print next to it (CLAUDE.md rules).
 */
export interface Sampled<T> {
  value: T
  sample: boolean
}

export const sample = <T>(value: T): Sampled<T> => ({ value, sample: true })
export const confirmed = <T>(value: T): Sampled<T> => ({ value, sample: false })
