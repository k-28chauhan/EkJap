import type { ReactNode, Ref } from 'react'
import type { Theme } from '@/data/types'
import { cn } from '@/lib/cn'

interface SectionProps {
  id: string
  theme: Theme
  children: ReactNode
  className?: string
  /** Skip the default vertical padding (full-bleed sections) */
  flush?: boolean
  labelledBy?: string
  /**
   * Keep this section's own palette and background even while the page theme
   * cross-fades. For full-bleed photo sections that paint their own dark ground.
   */
  local?: boolean
  /**
   * ScrollTrigger start for this section's theme change (default 'top 50%'). The Intro
   * uses 'top 100%' so the page is already pale as the hero's fog hands over to it.
   */
  themeStart?: string
  ref?: Ref<HTMLElement>
}

/**
 * One page section. `data-theme` selects the colour variables (index.css);
 * Phase 3 tweens those variables on <html> as each section crosses mid-screen.
 */
export function Section({
  id,
  theme,
  children,
  className,
  flush,
  labelledBy,
  local,
  themeStart,
  ref,
}: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      data-theme-local={local ? '' : undefined}
      data-theme-start={themeStart}
      ref={ref}
      aria-labelledby={labelledBy}
      className={cn('relative bg-bg text-fg', !flush && 'section-pad', className)}
    >
      {children}
    </section>
  )
}
