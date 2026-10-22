import { createContext, useContext } from 'react'

/**
 * True inside a region whose reveals are driven by a parent timeline (the pinned
 * cottage panels, where "in view" depends on a horizontal slide, not vertical
 * scroll). The motion primitives step aside there and leave their content in its
 * final state for the parent to animate.
 */
export const MotionInertContext = createContext(false)
export const useMotionInert = () => useContext(MotionInertContext)
