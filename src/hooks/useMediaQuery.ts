import { useSyncExternalStore } from 'react'

/**
 * Subscribes to a media query. `serverValue` is what the pre-rendered HTML
 * (and the first client render) assume, so hydration never mismatches.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}
