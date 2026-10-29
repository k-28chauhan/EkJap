import type { JSX } from 'react'
import type { CottageType } from '@/data/types'

/**
 * Line-drawn elevations of the three designs: a cottage, an apartment block and a farmhouse (EKJAP_PLAN.md §9.4).
 * Main strokes use currentColor, secondary strokes are halved in opacity
 * (the `soft` group) and glazing / lit windows use the ember accent. Phase 3
 * draws the paths in with DrawSVG, so every stroke is a plain <path> or <line>.
 */

const ground = 'M20 330 H580'

function Cottage() {
  return (
    <>
      <g opacity={0.45}>
        <path d={ground} />
        <path d="M486 330 L504 250 L522 330 M491 300 L504 232 L517 300 M496 270 L504 212 L512 270" />
        <path d="M535 330 L550 282 L565 330 M540 308 L550 264 L560 308" />
        <path d="M40 330 V304 M70 330 V304 M100 330 V304 M130 330 V304 M40 312 H130" />
      </g>
      <path d="M190 330 V215 H410 V330" />
      <path d="M165 215 L300 120 L435 215 H165" />
      <path d="M355 150 V108 H385 V178 M350 108 H390" />
      <path d="M285 330 V262 H320 V330" />
      <path d="M270 330 H335" opacity={0.6} />
      <g className="glazing" stroke="var(--color-ember-400)">
        <path d="M215 245 H260 V290 H215 Z M237 245 V290" />
        <path d="M345 245 H390 V290 H345 Z M367 245 V290" />
        <path d="M286 168 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0" />
      </g>
    </>
  )
}

function Apartment() {
  return (
    <>
      <g opacity={0.45}>
        <path d={ground} />
        <path d="M60 330 L78 250 L96 330 M65 300 L78 232 L91 300" />
        <path d="M505 330 L523 250 L541 330 M510 300 L523 232 L536 300" />
      </g>
      <path d="M160 330 V80 H440 V330" />
      <path d="M150 80 H450 M170 80 V66 H430 V80" />
      <path d="M160 142 H440 M160 204 H440 M160 266 H440" opacity={0.6} />
      <path
        d="M172 142 H252 M172 128 H252 M172 128 V142 M252 128 V142 M348 142 H428 M348 128 H428 M348 128 V142 M428 128 V142 M172 204 H252 M172 190 H252 M172 190 V204 M252 190 V204 M348 204 H428 M348 190 H428 M348 190 V204 M428 190 V204 M172 266 H252 M172 252 H252 M172 252 V266 M252 252 V266 M348 266 H428 M348 252 H428 M348 252 V266 M428 252 V266"
        opacity={0.6}
      />
      <path d="M280 330 V286 H320 V330 M300 286 V330" />
      <g className="glazing" stroke="var(--color-ember-400)">
        <path d="M185 94 H235 V126 H185 Z M345 94 H395 V126 H345 Z M265 94 H315 V126 H265 Z M185 156 H235 V188 H185 Z M345 156 H395 V188 H345 Z M265 156 H315 V188 H265 Z M185 218 H235 V250 H185 Z M345 218 H395 V250 H345 Z M265 218 H315 V250 H265 Z" />
        <path d="M185 280 H235 V310 H185 Z M365 280 H415 V310 H365 Z" />
      </g>
    </>
  )
}

function Farmhouse() {
  return (
    <>
      <g opacity={0.45}>
        <path d={ground} />
        <path d="M30 330 V302 M58 330 V302 M30 310 H58" />
        <path d="M540 330 L558 250 L576 330 M545 300 L558 232 L571 300" />
        <path d="M130 305 H450" />
      </g>
      <path d="M110 330 V240 H490 V330" />
      <path d="M80 240 L150 170 H450 L520 240 H80" />
      <path d="M260 170 L300 130 L340 170" />
      <path d="M420 170 V125 H448 V170 M415 125 H453" />
      <path d="M100 262 H500" />
      <path d="M130 330 V262 M210 330 V262 M290 330 V262 M370 330 V262 M450 330 V262" />
      <path d="M235 330 V285 H265 V330" />
      <g className="glazing" stroke="var(--color-ember-400)">
        <path d="M285 146 H315 V168 H285 Z M300 146 V168" />
        <path d="M150 285 H190 V315 H150 Z M310 285 H350 V315 H310 Z M390 285 H430 V315 H390 Z" />
      </g>
    </>
  )
}

const drawings: Record<CottageType, () => JSX.Element> = {
  cottage: Cottage,
  apartment: Apartment,
  farmhouse: Farmhouse,
}

export function Elevation({
  id,
  label,
  className,
}: {
  id: CottageType
  label: string
  className?: string
}) {
  const Drawing = drawings[id]
  return (
    <svg
      viewBox="0 0 600 360"
      preserveAspectRatio="xMinYMid meet"
      role="img"
      aria-label={label}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Drawing />
    </svg>
  )
}
