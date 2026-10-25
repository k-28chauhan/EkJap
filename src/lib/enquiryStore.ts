import { useSyncExternalStore } from 'react'

/**
 * The "Ask about" buttons around the page set the topic of the WhatsApp message
 * (EKJAP_PLAN.md §9.4). They write here; the enquiry section reads it. `id` changes on every write, so asking
 * about the same cottage twice still re-applies.
 */
export interface EnquiryPrefill {
  id: number
  /** What the visitor asked about, e.g. "The Pine" */
  topic?: string
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
