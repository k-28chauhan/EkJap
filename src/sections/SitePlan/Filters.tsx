import { siteplan } from '@/data/site'
import { cn } from '@/lib/cn'
import type { Filter } from './types'

export function Filters({ value, onChange }: { value: Filter; onChange: (value: Filter) => void }) {
  return (
    <div role="group" aria-label="Filter plots by cottage" className="flex flex-wrap gap-2">
      {siteplan.filters.map((filter) => {
        const active = value === filter.id
        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(filter.id as Filter)}
            className={cn(
              'rounded-full border px-4 py-2 text-[0.9rem] transition-colors',
              active ? 'border-fg bg-fg text-bg' : 'border-line hover:border-fg/50',
            )}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
