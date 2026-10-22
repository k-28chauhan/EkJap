/**
 * Image pipeline (EKJAP_PLAN.md §10, §12). Every file under /assets/images is
 * run through vite-imagetools at build time into responsive WebP + JPEG
 * srcsets. (AVIF is added in Phase 8 once the final art is in.)
 * Data files refer to images by their path inside /assets/images.
 */

export interface PictureData {
  /** format -> srcset string, e.g. { webp: '/a.webp 480w, /b.webp 800w' } */
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

const modules = import.meta.glob<PictureData>('/assets/images/**/*.{jpg,jpeg,png,webp}', {
  query: { w: '480;800;1280;1920;2560', format: 'webp;jpg', as: 'picture' },
  import: 'default',
  eager: true,
})

export function getPicture(src: string): PictureData | undefined {
  return modules[`/assets/images/${src}`]
}

export const MIME: Record<string, string> = {
  avif: 'image/avif',
  webp: 'image/webp',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
}
