import { useEffect } from 'react'
import { nav } from '@/data/site'
import { AnchorLink } from '../ui/AnchorLink'
import { Button } from '../ui/Button'

/** Full-screen menu for touch widths. Native scroll is locked while it is open. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div
      id="mobile-menu"
      data-lenis-prevent
      hidden={!open}
      data-theme="night"
      className="fixed inset-x-0 top-(--nav-h) bottom-0 z-40 overflow-y-auto bg-pine-950 text-fg md:hidden"
    >
      <nav aria-label="Mobile" className="wrap flex min-h-full flex-col justify-between py-10">
        <ul className="flex flex-col">
          {nav.links.map((link) => (
            <li key={link.href} className="hairline-b">
              <AnchorLink
                href={link.href}
                onClick={onClose}
                className="block py-5 font-display text-4xl"
              >
                {link.label}
              </AnchorLink>
            </li>
          ))}
        </ul>
        <div className="pt-10" onClick={onClose}>
          <Button href={nav.cta.href} className="w-full" magnetic={false}>
            {nav.cta.label}
          </Button>
        </div>
      </nav>
    </div>
  )
}
