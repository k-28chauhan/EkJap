import { useSyncExternalStore } from 'react'
import type { CottageType } from '@/data/types'

/**
 * The cottage and plot buttons around the page pre-fill the enquiry form
 * (EKJAP_PLAN.md §9.4, §9.9). They write here; the form reads it. `id` changes on
 * every write, so asking about the same plot twice still re-applies.
 */
export interface EnquiryPrefill {
  id: number
  interest?: CottageType
  plot?: string
}

let state: EnquiryPrefill = { id: 0 }
const listeners = new Set<() => void>()

export function prefillEnquiry(next: Omit<EnquiryPrefill, 'id'>) {
  state = { ...next, id: state.id + 1 }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const useEnquiryPrefill = () =>
  useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  )
