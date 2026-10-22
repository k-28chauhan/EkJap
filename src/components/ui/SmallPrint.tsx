import { cn } from '@/lib/cn'

/** "Sample" notes and other small print. Shown for every figure not yet confirmed. */
export function SmallPrint({ children, className }: { children: string; className?: string }) {
  return <p className={cn('label text-muted', className)}>{children}</p>
}
