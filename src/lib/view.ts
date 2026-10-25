import { useSyncExternalStore } from 'react'

/**
 * The page is the Kasauli project by default. The Goa project is shown only when
 * "Goa" is chosen: that sets the URL hash to #goa, which this reads. Any other
 * hash (an in-page anchor such as #kasauli) means the Kasauli view. Using the
 * hash keeps the browser's back button, deep links (…/#goa) and the shared nav
 * links working with no router.
 */
export type View = 'kasauli' | 'goa'

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const read = (): View => (window.location.hash === '#goa' ? 'goa' : 'kasauli')

export const useView = () => useSyncExternalStore(subscribe, read, () => 'kasauli' as View)
