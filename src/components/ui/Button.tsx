import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Magnetic } from '../motion/Magnetic'
import { AnchorLink } from './AnchorLink'

type Variant = 'primary' | 'outline'

interface ButtonProps {
  href: string
  variant?: Variant
  children: ReactNode
  className?: string
  external?: boolean
  /** Pulls toward the cursor on desktop. On by default for the primary (amber) button. */
  magnetic?: boolean
  /** Runs before an in-page link scrolls (used to pre-fill the enquiry form) */
  onClick?: () => void
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-300'

const variants: Record<Variant, string> = {
  // Amber is reserved for the main action (EKJAP_PLAN.md §4.1)
  primary: 'bg-ember-400 text-pine-950 shadow-ember hover:bg-ember-600',
  // 1px outline in the current text colour, so it works on dark and light themes
  outline: 'border border-current/60 hover:border-current hover:bg-current/10',
}

export function Button({
  href,
  variant = 'primary',
  children,
  className,
  external,
  magnetic = variant === 'primary',
  onClick,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className)
  const button = external ? (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <AnchorLink href={href} className={classes} onClick={onClick}>
      {children}
    </AnchorLink>
  )
  return magnetic ? <Magnetic>{button}</Magnetic> : button
}
