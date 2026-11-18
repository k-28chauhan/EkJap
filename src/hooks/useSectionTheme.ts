import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

type RGBA = [number, number, number, number]

const KEYS = ['--bg', '--fg', '--muted', '--line'] as const

const isColor = (color: RGBA) => color.every((channel) => Number.isFinite(channel))

/**
 * Parses the colour forms our theme variables use: #rrggbb, rgb(r g b / a), rgba(r, g, b, a).
 * Returns null for anything else (an empty or unresolved value), so a bad read can never
 * become a black palette.
 */
function parseColor(input: string): RGBA | null {
  const value = input.trim()
  if (!value || value.includes('var(')) return null
  let color: RGBA
  if (value.startsWith('#')) {
    const hex = value.length === 4 ? [...value.slice(1)].map((c) => c + c).join('') : value.slice(1)
    color = [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
    ]
  } else {
    const numbers = value.match(/[\d.]+/g)?.map(Number)
    if (!numbers || numbers.length < 3) return null
    color = [numbers[0], numbers[1], numbers[2], numbers[3] ?? 1]
  }
  return isColor(color) ? color : null
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
      const read = sections.map((section) => {
        const style = getComputedStyle(section)
        return KEYS.map((key) => parseColor(style.getPropertyValue(key)))
      })
      // If any colour could not be read, leave the sections on their own static themes
      // rather than risk a wrong palette (a black page) while scrolling
      if (read.some((palette) => palette.some((color) => !color))) return
      const palettes = read as RGBA[][]

      const current = palettes[0].map((color) => [...color]) as RGBA[]
      const write = () => {
        if (!current.every(isColor)) return
        KEYS.forEach((key, i) => root.style.setProperty(key, toCss(current[i])))
      }
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

      // Each section's theme begins at its trigger's start. The page shows the palette of the
      // LAST section whose start has been passed, worked out from the scroll position itself.
      // (Toggling on enter and leave is not enough: the Intro starts early, while the hero is
      // still on screen, so scrolling back up could hand the page back to the hero's dark
      // palette with the Intro in view.)
      const starts = sections.map((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: section.dataset.themeStart ?? 'top 50%',
          end: 'bottom 50%',
        }),
      )

      const reconcile = () => {
        const y = window.scrollY
        let index = 0
        starts.forEach((trigger, i) => {
          if (y >= trigger.start) index = i
        })
        apply(index)
      }
      reconcile()

      const watcher = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: reconcile,
        onRefresh: reconcile,
      })

      return () => {
        watcher.kill()
        starts.forEach((trigger) => trigger.kill())
        tween?.kill()
        root.removeAttribute('data-theme-sync')
        KEYS.forEach((key) => root.style.removeProperty(key))
      }
    })

    return () => mm.revert()
  })
}
