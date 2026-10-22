/** Builder timeline (EKJAP_PLAN.md §9.10). Stages and dates are samples. */

export type StageState = 'done' | 'now' | 'next'

export interface TimelineStage {
  id: string
  index: number
  title: string
  status: string
  state: StageState
}

export const timeline: TimelineStage[] = [
  { id: 'land', index: 1, title: 'Land & approvals', status: 'Done', state: 'done' },
  { id: 'roads', index: 2, title: 'Roads, water, retaining walls', status: 'Now', state: 'now' },
  { id: 'first-six', index: 3, title: 'First six cottages', status: '2027', state: 'next' },
  { id: 'handover', index: 4, title: 'Handover, phase one', status: '2028', state: 'next' },
]

export const timelineSample = true
