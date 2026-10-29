import type { CottageType } from '@/data/types'

/**
 * PLACEHOLDER floor plans, drawn to suggest the layout only. They are replaced
 * by the architect's drawings when the client supplies them.
 */

const plans: Record<CottageType, string> = {
  cottage:
    'M140 100 H460 V300 H140 Z M140 200 H300 M300 100 V300 M300 220 H460 M380 220 V300 M120 300 H480 V330 H120 Z',
  apartment:
    'M70 90 H530 V310 H70 Z M70 185 H530 M70 215 H530 M200 90 V185 M330 90 V185 M430 90 V185 M170 215 V310 M300 215 V310 M420 215 V310',
  farmhouse:
    'M80 120 H400 V210 H520 V300 H80 Z M200 120 V300 M320 120 V210 M360 210 V300 M80 210 H200 M60 300 H540 V330 H60 Z',
}

export function FloorPlan({ id, className }: { id: CottageType; className?: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      aria-hidden
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    >
      <path d={plans[id]} />
    </svg>
  )
}
