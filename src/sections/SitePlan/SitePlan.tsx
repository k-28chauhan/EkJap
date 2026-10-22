import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { siteplan } from '@/data/site'
import plotData from '@/data/plots.sample.json'
import { Filters } from './Filters'
import { PlotCard } from './PlotCard'
import { PlotMap } from './PlotMap'
import type { Filter, PlotData } from './types'

const data = plotData as PlotData
const legendDots = {
  available: 'bg-status-available',
  hold: 'bg-status-hold',
  sold: 'bg-status-sold',
} as const

/** The plan is drawn from src/data/plots.sample.json. Swap that file for the architect's layout. */
export function SitePlan() {
  const [selectedId, setSelectedId] = useState(7)
  const [filter, setFilter] = useState<Filter>('all')
  const selected = data.plots.find((plot) => plot.id === selectedId) ?? data.plots[0]

  return (
    <Section id="siteplan" theme="stone" labelledBy="siteplan-title">
      <div className="wrap">
        <SectionHeader
          id="siteplan-title"
          label={siteplan.label}
          title={siteplan.title}
          copy={siteplan.copy}
        />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 md:mt-16">
          <Filters value={filter} onChange={setFilter} />
          <p className="rounded-full border border-line px-3 py-1.5 label text-muted">
            {siteplan.badge}
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-start">
          {/* The map scrolls sideways inside its frame on phones */}
          <div
            data-lenis-prevent
            tabIndex={0}
            role="region"
            aria-label="Site plan map"
            className="overflow-x-auto rounded-card border border-line md:col-span-8"
          >
            <PlotMap
              data={data}
              selectedId={selected.id}
              filter={filter}
              onSelect={setSelectedId}
            />
          </div>

          <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)] md:col-span-4">
            <PlotCard plot={selected} />
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem]">
          {(Object.keys(siteplan.legend) as (keyof typeof siteplan.legend)[]).map((key) => (
            <li key={key} className="inline-flex items-center gap-2">
              <span aria-hidden className={`size-2.5 rounded-full ${legendDots[key]}`} />
              {siteplan.legend[key]}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
