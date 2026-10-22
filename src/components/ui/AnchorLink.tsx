import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { scrollToTarget } from '@/lib/scrollTo'

/** In-page links scroll through Lenis / GSAP (EKJAP_PLAN.md §6.1). Other links behave normally. */
export function AnchorLink({
  href,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || !href.startsWith('#') || href.length < 2) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    if (!document.querySelector(href)) return
    event.preventDefault()
    scrollToTarget(href)
    history.replaceState(null, '', href)
  }
  return <a href={href} onClick={handle} {...props} />
}
