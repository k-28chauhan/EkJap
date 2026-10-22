import { cn } from '@/lib/cn'
import { FadeUp } from '../motion/FadeUp'
import { SplitHeading } from '../motion/SplitHeading'
import { RichTitle } from './RichTitle'

interface SectionHeaderProps {
  id: string
  label: string
  title: string
  copy?: string
  className?: string
  titleClassName?: string
}

/** Every section opens the same way: small label, large title, one short paragraph (§9). */
export function SectionHeader({
  id,
  label,
  title,
  copy,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-5', className)}>
      <FadeUp as="p" className="label text-muted">
        {label}
      </FadeUp>
      <SplitHeading id={id} className={cn('font-display text-h2 text-balance', titleClassName)}>
        <RichTitle text={title} />
      </SplitHeading>
      {copy && (
        <FadeUp as="p" delay={0.15} className="measure text-muted">
          {copy}
        </FadeUp>
      )}
    </header>
  )
}
