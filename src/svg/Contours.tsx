import { useMemo } from 'react'

interface ContoursProps {
  className?: string
  /** Number of nested contour lines */
  levels?: number
  /** Shift the "peak" so each use looks different (0-1) */
  seed?: number
}

function buildPaths(levels: number, seed: number) {
  const cx = 500 + seed * 120
  const cy = 340
  return Array.from({ length: levels }, (_, i) => {
    const radius = 36 + i * 30
    const points = Array.from({ length: 72 }, (_, k) => {
      const a = (k / 72) * Math.PI * 2
      const wobble =
        1 +
        0.16 * Math.sin(3 * a + i * 0.45 + seed * 4) +
        0.09 * Math.sin(5 * a + i * 0.9) +
        0.05 * Math.sin(8 * a + i * 1.7)
      const x = cx + Math.cos(a) * radius * 1.7 * wobble
      const y = cy + Math.sin(a) * radius * 1.05 * wobble
      return `${x.toFixed(1)} ${y.toFixed(1)}`
    })
    return `M${points.join(' L')}Z`
  })
}

/** The contour lines as a <g>, for use inside another SVG (the site plan). 1000 x 700 space. */
export function ContourLines({ levels = 16, seed = 0 }: Omit<ContoursProps, 'className'>) {
  const paths = useMemo(() => buildPaths(levels, seed), [levels, seed])
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1} strokeLinejoin="round">
      {paths.map((d, i) => (
        <path key={i} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  )
}

/**
 * Faint topographic contour lines, generated in code (EKJAP_PLAN.md §9.2).
 * Decorative only. Strokes use currentColor, so the parent sets the colour and opacity.
 */
export function Contours({ className, levels, seed }: ContoursProps) {
  return (
    <svg
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
      className={className}
    >
      <ContourLines levels={levels} seed={seed} />
    </svg>
  )
}
