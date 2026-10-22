import { useSyncExternalStore } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

let cached: boolean | undefined

/** WebGL available, and a machine with more than 4 cores (EKJAP_PLAN.md §7.3). Checked once. */
function webglCapable() {
  if (cached !== undefined) return cached
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true })
    cached = !!gl && (navigator.hardwareConcurrency ?? 8) > 4
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    cached = false
  }
  return cached
}

/**
 * Whether the hero should run the shader. False for reduced motion, no WebGL or a
 * weak device, and on the server, so pre-rendered HTML carries the CSS fog.
 */
export function useMistCapable() {
  const reduced = useReducedMotion()
  const capable = useSyncExternalStore(
    () => () => {},
    webglCapable,
    () => false,
  )
  return capable && !reduced
}
