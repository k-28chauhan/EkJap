import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

type RGBA = [number, number, number, number]

const KEYS = ['--bg', '--fg', '--muted', '--line'] as const

/** Parses the colour forms our theme variables use: #rrggbb, rgb(r g b / a), rgba(r, g, b, a). */
function parseColor(input: string): RGBA {
  const value = input.trim()
  if (value.startsWith('#')) {
    const hex = value.length === 4 ? [...value.slice(1)].map((c) => c + c).join('') : value.slice(1)
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
    ]
  }
  const numbers = value.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0]
  return [numbers[0], numbers[1], numbers[2], numbers[3] ?? 1]
}

const toCss = ([r, g, b, a]: RGBA) =>
  `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)} / ${a.toFixed(3)})`

/**
 * Section theme cross-fade (EKJAP_PLAN.md §0, §6.3). Each <section data-theme>
 * is a ScrollTrigger; when it crosses mid-viewport the four theme variables on
 * <html> tween to that section's palette over 0.8s. While this is active
 * `data-theme-sync` on <html> makes the sections inherit those variables and
 * drop their own background (see index.css). Reduced motion keeps the static
 * per-section themes, as does a visitor without JavaScript.
 */
export function useSectionTheme() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const root = document.documentElement
      const sections = gsap.utils.toArray<HTMLElement>('section[data-theme]')
      if (!sections.length) return

      // Read each palette from the static CSS before sync mode switches it off
      const palettes = sections.map((section) => {
        const style = getComputedStyle(section)
        return KEYS.map((key) => parseColor(style.getPropertyValue(key))) as RGBA[]
      })

      const current = palettes[0].map((color) => [...color]) as RGBA[]
      const write = () => KEYS.forEach((key, i) => root.style.setProperty(key, toCss(current[i])))
      write()
      root.setAttribute('data-theme-sync', '')

      let tween: gsap.core.Tween | undefined
      let applied = -1

      const apply = (index: number) => {
        if (index === applied) return
        const first = applied === -1
        applied = index
        tween?.kill()

        const from = current.map((color) => [...color]) as RGBA[]
        const to = palettes[index]
        if (first) {
          to.forEach((color, i) => (current[i] = [...color]))
          write()
          return
        }
        const progress = { p: 0 }
        tween = gsap.to(progress, {
          p: 1,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: () => {
            to.forEach((target, i) => {
              current[i] = target.map(
                (channel, c) => from[i][c] + (channel - from[i][c]) * progress.p,
              ) as RGBA
            })
            write()
          },
        })
      }

      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: section.dataset.themeStart ?? 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => self.isActive && apply(index),
        })
      })

      return () => {
        tween?.kill()
        root.removeAttribute('data-theme-sync')
        KEYS.forEach((key) => root.style.removeProperty(key))
      }
    })

    return () => mm.revert()
  })
}
