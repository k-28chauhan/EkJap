import type { CottageType } from '@/data/types'

/**
 * PLACEHOLDER floor plans, drawn to suggest the layout only. They are replaced
 * by the architect's drawings when the client supplies them.
 */

const plans: Record<CottageType, string> = {
  pine: 'M120 80 H480 V320 H120 Z M120 200 H300 M300 80 V320 M300 200 H480 M200 80 V200 M380 200 V320 M120 80 L120 40 H480 V80',
  ridge:
    'M70 70 H530 V330 H70 Z M70 190 H250 M250 70 V330 M250 190 H400 M400 70 V330 M400 200 H530 M160 70 V190 M330 190 V330 M470 70 V200',
  deodar: 'M150 110 H450 V260 H150 Z M150 185 H300 M300 110 V260 M110 90 H490 V290 H110 Z',
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
