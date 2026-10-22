import type { JSX } from 'react'
import type { CottageType } from '@/data/types'

/**
 * Line-drawn elevations of the three cottage types (EKJAP_PLAN.md §9.4).
 * Main strokes use currentColor, secondary strokes are halved in opacity
 * (the `soft` group) and glazing / lit windows use the ember accent. Phase 3
 * draws the paths in with DrawSVG, so every stroke is a plain <path> or <line>.
 */

const ground = 'M20 330 H580'

function Pine() {
  return (
    <>
      <g className="soft" opacity={0.45}>
        <path d={ground} />
        <path d="M500 330 L520 250 L540 330 M505 300 L520 235 L535 300 M510 270 L520 215 L530 270" />
        <path d="M545 330 L558 280 L571 330 M549 308 L558 262 L567 308" />
        <path d="M232 262 H368" />
      </g>
      <path d="M150 330 L300 60 L450 330" />
      <path d="M176 330 L300 100 L424 330" />
      <path d="M350 118 V48 H368 V130" />
      <path d="M345 48 H373" />
      <g className="glazing" stroke="var(--color-ember-400)">
        <path d="M200 330 L300 150 L400 330" />
        <path d="M300 150 V330" />
        <path d="M241 240 H359" />
        <path d="M222 290 H378" />
      </g>
      <path d="M50 312 H156 M50 312 V338 M150 312 V330 M50 288 H156 M50 288 V312 M85 288 V312 M120 288 V312 M156 288 V312" />
    </>
  )
}

function Ridge() {
  return (
    <>
      <g opacity={0.45}>
        <path d="M20 215 L150 235 M460 235 L580 292" />
        <path d={ground} />
        <path d="M150 255 H460 M150 276 H460 M150 297 H460 M150 316 H460" />
        <path d="M190 255 V276 M262 255 V276 M338 255 V276 M410 255 V276 M222 276 V297 M300 276 V297 M372 276 V297 M436 276 V297 M180 297 V316 M258 297 V316 M334 297 V316 M416 297 V316" />
      </g>
      <path d="M150 330 V235 H460 V330" />
      <path d="M180 235 V150 H430 V235" />
      <path d="M165 150 H445 M165 143 H445" />
      <path
        d="M180 143 V136 M205 143 V133 M232 143 V137 M262 143 V132 M300 143 V136 M338 143 V131 M372 143 V137 M402 143 V133"
        opacity={0.45}
      />
      <g className="glazing" stroke="var(--color-ember-400)">
        <path d="M200 170 H410 V235 H200 Z" />
        <path d="M252 170 V235 M305 170 V235 M357 170 V235" />
      </g>
      <path d="M60 330 H100 V313 H140 V296 H150" opacity={0.6} />
    </>
  )
}

function Deodar() {
  return (
    <>
      <g opacity={0.45}>
        <path d={ground} />
        <path d="M30 330 L48 250 L66 330 M34 300 L48 232 L62 300 M38 270 L48 210 L58 270" />
        <path d="M555 330 L572 262 L589 330 M560 300 L572 244 L584 300" />
      </g>
      <path d="M150 330 V270 M250 330 V270 M350 330 V270 M450 330 V270" />
      <path d="M120 270 H500 M120 258 H500" />
      <path
        d="M120 232 H500 M120 232 V258 M170 232 V258 M220 232 V258 M270 232 V258 M320 232 V258 M370 232 V258 M420 232 V258 M470 232 V258 M500 232 V258"
        opacity={0.55}
      />
      <path d="M200 258 V180 H400 V258" />
      <path d="M180 180 L300 118 L420 180" />
      <g className="glazing" stroke="var(--color-ember-400)">
        <path d="M225 205 H275 V245 H225 Z M250 205 V245" />
        <path d="M330 205 H380 V245 H330 Z" />
      </g>
      <path
        d="M500 270 L548 330 M500 282 H520 M520 282 V294 H532 M532 294 V306 H544 M544 306 V318 H556"
        opacity={0.6}
      />
    </>
  )
}

const drawings: Record<CottageType, () => JSX.Element> = {
  pine: Pine,
  ridge: Ridge,
  deodar: Deodar,
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
