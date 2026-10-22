import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'

const POINTER_FINE =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

/**
 * The child pulls a few pixels toward the cursor (§6.2). Desktop pointers only.
 * The wrapper has a little padding so the pull starts just before the cursor
 * reaches the control.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(POINTER_FINE, () => {
        const wrapper = ref.current
        const target = wrapper?.firstElementChild
        if (!wrapper || !target) return

        const x = gsap.quickTo(target, 'x', { duration: 0.4, ease: 'power3.out' })
        const y = gsap.quickTo(target, 'y', { duration: 0.4, ease: 'power3.out' })
        const limit = 10

        const move = (event: PointerEvent) => {
          const box = wrapper.getBoundingClientRect()
          x(
            gsap.utils.clamp(
              -limit,
              limit,
              (event.clientX - (box.left + box.width / 2)) * strength,
            ),
          )
          y(
            gsap.utils.clamp(
              -limit,
              limit,
              (event.clientY - (box.top + box.height / 2)) * strength,
            ),
          )
        }
        const leave = () => {
          x(0)
          y(0)
        }

        wrapper.addEventListener('pointermove', move)
        wrapper.addEventListener('pointerleave', leave)
        return () => {
          wrapper.removeEventListener('pointermove', move)
          wrapper.removeEventListener('pointerleave', leave)
          gsap.set(target, { x: 0, y: 0 })
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={cn('-m-3 inline-flex p-3', className)}>
      {children}
    </span>
  )
}
