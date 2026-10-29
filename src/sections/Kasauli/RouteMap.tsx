import { Fragment, useRef } from 'react'
import { FadeUp } from '@/components/motion/FadeUp'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { RichTitle } from '@/components/ui/RichTitle'
import { route } from '@/data/town'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'
import { useMotion } from '@/lib/useMotion'

/** 95 -> "1 h 35 m", 30 -> "30 min", 0 -> "Start" */
function formatMinutes(total: number) {
  if (total === 0) return 'Start'
  const h = Math.floor(total / 60)
  const m = total % 60
  if (h === 0) return `${m} min`
  return m === 0 ? `${h} h` : `${h} h ${m} m`
}

const W = 1200
const H = 340
const PAD = 90
/** Hand-set heights give the route its wandering line; x comes from the drive time. */
const heights = [200, 150, 190, 110, 150, 80]

const maxMinutes = route.stops[route.stops.length - 1].minutes
const points = route.stops.map((stop, i) => ({
  ...stop,
  x: PAD + (stop.minutes / maxMinutes) * (W - 2 * PAD),
  y: heights[i],
}))

/** Smooth path through the points (Catmull-Rom converted to cubic Béziers). */
const pathData = points
  .map((p, i, all) => {
    if (i === 0) return `M${p.x} ${p.y}`
    const p0 = all[i - 2] ?? all[i - 1]
    const p1 = all[i - 1]
    const p3 = all[i + 1] ?? p
    const c1x = p1.x + (p.x - p0.x) / 6
    const c1y = p1.y + (p.y - p0.y) / 6
    const c2x = p.x - (p3.x - p1.x) / 6
    const c2y = p.y - (p3.y - p1.y) / 6
    return `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p.x.toFixed(1)} ${p.y}`
  })
  .join(' ')

/** The turn-off: leaves the main road at its `from` stop and drops away to the lower right. */
const branchStart = points.find((p) => p.id === route.branch.from) ?? points[0]
const branchEnd = { x: branchStart.x + 66, y: 252 }
const branchPath = `M${branchStart.x} ${branchStart.y} C${branchStart.x} ${branchStart.y + 62} ${branchEnd.x - 36} ${branchEnd.y - 34} ${branchEnd.x} ${branchEnd.y}`

/** The fraction of the path's length at which it reaches `x` (the path only ever moves right). */
function fractionAtX(path: SVGPathElement, x: number) {
  const length = path.getTotalLength()
  let low = 0
  let high = length
  for (let i = 0; i < 24; i++) {
    const mid = (low + high) / 2
    if (path.getPointAtLength(mid).x < x) low = mid
    else high = mid
  }
  return high / length
}

/**
 * Part C: the drive up from Chandigarh. A line map on desktop, a vertical list on
 * phones. On desktop with motion the route draws itself as you scroll, each town's
 * dot popping in as the line reaches it, and the EkJap dot glows amber.
 */
export function RouteMap() {
  const map = useRef<SVGSVGElement>(null)

  useMotion(map, ({ motion, desktop }) => {
    const svg = map.current
    const line = svg?.querySelector<SVGPathElement>('[data-route="line"]')
    if (!svg || !line || !motion || !desktop) return

    const stops = gsap.utils.toArray<SVGGElement>('[data-route="stop"]', svg)
    const glow = svg.querySelector<SVGCircleElement>('[data-route="glow"]')

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: svg, start: 'top 75%', end: 'bottom 45%', scrub: 0.8 },
    })
    timeline.from(line, { drawSVG: '0%', duration: 1 }, 0)
    stops.forEach((stop, i) => {
      const at = Math.max(0, fractionAtX(line, points[i].x) - 0.05)
      timeline.from(
        stop,
        {
          opacity: 0,
          scale: 0.3,
          svgOrigin: `${points[i].x} ${points[i].y}`,
          duration: 0.07,
          ease: 'back.out(2.2)',
        },
        at,
      )
    })

    // The turn-off draws once the route has reached its junction
    const branch = svg.querySelector<SVGPathElement>('[data-route="branch"]')
    const branchStop = svg.querySelector<SVGGElement>('[data-route="branch-stop"]')
    if (branch && branchStop) {
      const junction = fractionAtX(line, branchStart.x)
      timeline.from(branch, { drawSVG: '0%', duration: 0.14 }, junction)
      timeline.from(
        branchStop,
        {
          opacity: 0,
          scale: 0.3,
          svgOrigin: `${branchEnd.x} ${branchEnd.y}`,
          duration: 0.07,
          ease: 'back.out(2.2)',
        },
        junction + 0.1,
      )
    }

    // The EkJap dot keeps a slow amber halo going once it has appeared
    if (glow) {
      gsap.fromTo(
        glow,
        { scale: 1, opacity: 0.35 },
        {
          scale: 1.9,
          opacity: 0,
          svgOrigin: `${points[points.length - 1].x} ${points[points.length - 1].y}`,
          duration: 2,
          ease: 'sine.out',
          repeat: -1,
        },
      )
    }
  })

  return (
    <div className="wrap mt-24 md:mt-40">
      <header className="mb-12 flex flex-col gap-4 md:mb-16">
        <FadeUp as="p" className="label text-muted">
          {route.label}
        </FadeUp>
        <SplitHeading as="h3" className="font-display text-h2 text-balance">
          <RichTitle text={route.title} />
        </SplitHeading>
      </header>

      {/* Phones: vertical list */}
      <FadeUp as="ol" stagger={0.1} className="relative ml-2 border-l border-line pl-8 md:hidden">
        {route.stops.map((stop, i) => {
          const last = i === route.stops.length - 1
          return (
            <Fragment key={stop.id}>
              <li className="relative pb-9 last:pb-0">
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-2 -left-[2.5rem] size-3 rounded-full border',
                    last ? 'border-ember-400 bg-ember-400 shadow-ember' : 'border-fg/60 bg-bg',
                  )}
                />
                <span className="font-display text-3xl">{stop.name}</span>
                <span className="mt-1 block label text-muted">{formatMinutes(stop.minutes)}</span>
              </li>
              {stop.id === route.branch.from && (
                <li className="relative -mt-3 pb-9 pl-6">
                  <span
                    aria-hidden
                    className="absolute top-2 -left-[2.5rem] h-px w-[2.5rem] [translate:0_0.25rem] bg-fg/40"
                  />
                  <span className="font-display text-2xl">{route.branch.name}</span>
                  <span className="mt-1 block label text-muted">{route.branch.note}</span>
                </li>
              )}
            </Fragment>
          )
        })}
      </FadeUp>

      {/* Tablet and up: line map */}
      <svg
        ref={map}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Route from ${route.stops[0].name} to ${route.stops[route.stops.length - 1].name}, about ${formatMinutes(maxMinutes)}`}
        className="hidden w-full md:block"
      >
        {/* The road, faint and dotted, always there */}
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray="2 7"
          strokeLinecap="round"
          opacity={0.4}
        />
        {/* The drive, drawn over it as you scroll */}
        <path
          data-route="line"
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* The turn-off to the finished project */}
        <path
          d={branchPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray="2 7"
          strokeLinecap="round"
          opacity={0.4}
        />
        <path
          data-route="branch"
          d={branchPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <g data-route="branch-stop">
          <circle
            cx={branchEnd.x}
            cy={branchEnd.y}
            r={6.5}
            fill="var(--bg)"
            stroke="currentColor"
            strokeWidth={2}
          />
          <text
            x={branchEnd.x}
            y={branchEnd.y + 40}
            textAnchor="middle"
            fill="currentColor"
            style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}
          >
            {route.branch.name}
          </text>
          <text
            x={branchEnd.x}
            y={branchEnd.y + 62}
            textAnchor="middle"
            fill="var(--muted)"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {route.branch.note}
          </text>
        </g>
        {points.map((p, i) => {
          const last = i === points.length - 1
          const above = i % 2 === 1
          const anchor = i === 0 ? 'start' : last ? 'end' : 'middle'
          const dx = i === 0 ? -6 : last ? 6 : 0
          return (
            <g key={p.id} data-route="stop">
              {last && (
                <circle
                  data-route="glow"
                  cx={p.x}
                  cy={p.y}
                  r={18}
                  fill="var(--color-ember-400)"
                  opacity={0.25}
                />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={last ? 8 : 5.5}
                fill={last ? 'var(--color-ember-400)' : 'var(--bg)'}
                stroke={last ? 'var(--color-ember-400)' : 'currentColor'}
                strokeWidth={1.5}
              />
              <text
                x={p.x}
                y={above ? p.y - 30 : p.y + 40}
                textAnchor={anchor}
                dx={dx}
                fill="currentColor"
                style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}
              >
                {p.name}
              </text>
              <text
                x={p.x}
                y={above ? p.y - 54 : p.y + 62}
                textAnchor={anchor}
                dx={dx}
                fill="var(--muted)"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {formatMinutes(p.minutes)}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
