import { Button } from '@/components/ui/Button'
import { cottageById } from '@/data/cottages'
import { siteplan } from '@/data/site'
import { prefillEnquiry } from '@/lib/enquiryStore'
import { cn } from '@/lib/cn'
import { plotLabel, type Plot } from './types'

const statusText = siteplan.legend
const card = siteplan.card
const dot = {
  available: 'bg-status-available',
  hold: 'bg-status-hold',
  sold: 'bg-status-sold',
} as const

export function PlotCard({ plot }: { plot: Plot }) {
  const cottage = cottageById[plot.type]
  const rows: [string, string][] = [
    [card.layout, `${cottage.layout} · ${plot.beds} ${card.bed}`],
    [card.area, `${plot.area.toLocaleString('en-IN')} ${card.unit}`],
    [card.elevation, `${plot.elevation.toLocaleString('en-IN')} m`],
    [card.facing, plot.facing],
    [card.view, plot.view],
  ]

  return (
    <div aria-live="polite" className="rounded-card border border-line bg-bg p-7 md:p-8">
      <p className="label text-muted">
        {card.plot} {plotLabel(plot.id)}
      </p>
      <h3 className="mt-2 font-display text-h3">{cottage.name}</h3>
      <p className="mt-3 inline-flex items-center gap-2 text-[0.95rem]">
        <span aria-hidden className={cn('size-2.5 rounded-full', dot[plot.status])} />
        {statusText[plot.status]}
      </p>

      <dl className="mt-6 divide-y divide-line border-y border-line">
        {rows.map(([term, detail]) => (
          <div key={term} className="flex justify-between gap-6 py-3 text-[0.95rem]">
            <dt className="text-muted">{term}</dt>
            <dd className="text-right tabular">{detail}</dd>
          </div>
        ))}
      </dl>

      <Button
        href="#enquire"
        className="mt-7 w-full"
        magnetic={false}
        onClick={() => prefillEnquiry({ interest: plot.type, plot: plotLabel(plot.id) })}
      >
        {siteplan.ask} {plotLabel(plot.id)}
      </Button>
    </div>
  )
}
