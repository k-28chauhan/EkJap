import { useMediaQuery } from './useMediaQuery'

/** True on mouse/trackpad devices. Smooth scroll, cursor and mouse parallax are desktop-only. */
export function usePointerFine() {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
