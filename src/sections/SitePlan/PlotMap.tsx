import { useRef } from 'react'
import { cottageById } from '@/data/cottages'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'
import { useMotion } from '@/lib/useMotion'
import { ContourLines } from '@/svg/Contours'
import { plotLabel, type Filter, type Plot, type PlotData } from './types'

interface PlotMapProps {
  data: PlotData
  selectedId: number
  filter: Filter
  onSelect: (id: number) => void
}

const fills = {
  available: 'fill-status-available',
  hold: 'fill-status-hold',
  sold: 'fill-status-sold',
} as const

/** One icon per cottage type: a gable, a stepped block, a round cabin. */
function PlotShape({ plot }: { plot: Plot }) {
  const cls = cn(fills[plot.status])
  if (plot.type === 'pine') return <path d="M0 -17 L16 11 H-16 Z" className={cls} />
  if (plot.type === 'ridge')
    return <rect x={-15} y={-13} width={30} height={26} rx={3} className={cls} />
  return <circle r={15} className={cls} />
}

/** Site plan drawn from the plots data: contours, road, gate and deck, and one button per plot. */
export function PlotMap({ data, selectedId, filter, onSelect }: PlotMapProps) {
  const { width, height } = data.viewBox
  const svg = useRef<SVGSVGElement>(null)

  // The road draws in, then the plots drop onto it one after another
  useMotion(svg, ({ motion }) => {
    const el = svg.current
    if (!el || !motion) return
    const q = (name: string) => gsap.utils.toArray<SVGElement>(`[data-plan="${name}"]`, el)

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 75%', once: true },
    })
    timeline
      .from(q('road'), { drawSVG: '0%', duration: 1.5, ease: 'power2.inOut' }, 0)
      .from(q('road-dash'), { opacity: 0, duration: 0.8 }, 1.1)
      .from(q('marker'), { opacity: 0, duration: 0.6, stagger: 0.4 }, 0.3)
      .from(
        q('plot'),
        {
          y: '-=26',
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.7)',
          stagger: 0.07,
          clearProps: 'opacity',
        },
        0.9,
      )
  })

  return (
    <svg
      ref={svg}
      viewBox={`0 0 ${width} ${height}`}
      role="group"
      aria-label="Site plan"
      className="block h-auto w-full min-w-[640px] text-fg"
    >
      <g opacity={0.12} aria-hidden>
        <ContourLines levels={14} seed={0.4} />
      </g>

      <path
        data-plan="road"
        d={data.road}
        fill="none"
        stroke="currentColor"
        strokeWidth={14}
        strokeLinecap="round"
        opacity={0.12}
      />
      <path
        data-plan="road-dash"
        d={data.road}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray="3 8"
        strokeLinecap="round"
        opacity={0.6}
      />

      {[data.gate, data.deck].map((point) => (
        <g data-plan="marker" key={point.label} transform={`translate(${point.x} ${point.y})`}>
          <circle r={6} className="fill-bg" stroke="currentColor" strokeWidth={1.5} />
          <text
            y={point.y > height / 2 ? 28 : -16}
            textAnchor="middle"
            fill="currentColor"
            className="label"
            style={{ fontSize: 12 }}
          >
            {point.label} · {point.elevation.toLocaleString('en-IN')} m
          </text>
        </g>
      ))}

      {data.plots.map((plot) => {
        const selected = plot.id === selectedId
        const dimmed = filter !== 'all' && plot.type !== filter
        return (
          <g
            key={plot.id}
            data-plan="plot"
            transform={`translate(${plot.x} ${plot.y})`}
            role="button"
            tabIndex={0}
            aria-pressed={selected}
            aria-label={`Plot ${plotLabel(plot.id)}, ${cottageById[plot.type].name}, ${plot.status}`}
            className={cn('group cursor-pointer outline-none', dimmed && 'opacity-25')}
            onClick={() => onSelect(plot.id)}
            onFocus={() => onSelect(plot.id)}
            onPointerEnter={(event) => event.pointerType === 'mouse' && onSelect(plot.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(plot.id)
              }
            }}
          >
            {/* Keyboard focus: a dashed ring, so it never relies on the pointer */}
            <circle
              r={26}
              fill="none"
              stroke="var(--color-ember-300)"
              strokeWidth={2}
              strokeDasharray="4 4"
              className="opacity-0 group-focus-visible:opacity-100"
            />
            {selected && (
              <>
                <circle r={30} fill="none" stroke="var(--color-ember-400)" strokeWidth={2.5} />
                <circle
                  r={30}
                  fill="none"
                  stroke="var(--color-ember-400)"
                  strokeWidth={2}
                  className="plot-pulse"
                />
              </>
            )}
            <PlotShape plot={plot} />
            <text
              y={5}
              textAnchor="middle"
              className="fill-pine-950"
              style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-sans)' }}
            >
              {plotLabel(plot.id)}
            </text>
          </g>
        )
      })}

      {/* North arrow */}
      <g transform="translate(950 640)" fill="currentColor" aria-hidden>
        <path d="M0 -24 L9 6 L0 0 L-9 6 Z" opacity={0.8} />
        <text y={26} textAnchor="middle" style={{ fontSize: 13, fontFamily: 'var(--font-sans)' }}>
          N
        </text>
      </g>
    </svg>
  )
}
