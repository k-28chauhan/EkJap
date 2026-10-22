import type { CottageType } from '@/data/types'

export type PlotStatus = 'available' | 'hold' | 'sold'

export interface Plot {
  id: number
  type: CottageType
  beds: number
  area: number
  elevation: number
  facing: string
  view: string
  status: PlotStatus
  x: number
  y: number
}

export interface PlotData {
  sample: boolean
  note: string
  viewBox: { width: number; height: number }
  road: string
  gate: { label: string; x: number; y: number; elevation: number }
  deck: { label: string; x: number; y: number; elevation: number }
  plots: Plot[]
}

export type Filter = 'all' | CottageType

export const plotLabel = (id: number) => String(id).padStart(2, '0')
