import { useEffect, useRef, useState } from 'react'
import { brand, common, nav } from '@/data/site'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'
import { introGate } from '@/lib/introGate'
import { useMotion } from '@/lib/useMotion'
import { AnchorLink } from '../ui/AnchorLink'
import { Button } from '../ui/Button'
import { useView } from '@/lib/view'
import { MobileMenu } from './MobileMenu'

/** Transparent over the hero, solid pine once the page scrolls. Always light-on-dark. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const view = useView()
  const header = useRef<HTMLElement>(null)

  // Intro (EKJAP_PLAN.md §7.4): at 1.1s the bar slides down and its hairline draws left
  // to right; at 1.7s the amber button scales in and its glow breathes once.
  useMotion(header, ({ motion }) => {
    const el = header.current
    const bar = el?.querySelector<HTMLElement>('[data-nav="bar"]')
    const line = el?.querySelector<HTMLElement>('[data-nav="line"]')
    const cta = el?.querySelector<HTMLElement>('[data-nav="cta"]')
    const glow = el?.querySelector<HTMLElement>('[data-nav="glow"]')
    if (!el || !bar || !line || !cta || !glow || !motion) return

    gsap.set(bar, { opacity: 0, y: -20 })
    gsap.set(line, { scaleX: 0 })
    gsap.set(cta, { opacity: 0, scale: 0.9 })

    const timeline = gsap.timeline({ paused: true })
    timeline
      .to(bar, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.1)
      .to(line, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 1.1)
      .to(cta, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 1.7)
      .to(glow, { opacity: 1, duration: 0.7, ease: 'sine.inOut' }, 1.9)
      .to(glow, { opacity: 0, duration: 1.1, ease: 'sine.inOut' })
    introGate.then(() => timeline.play())
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        ref={header}
        data-theme="night"
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-(--nav-h) text-fg transition-colors duration-500',
          scrolled || open ? 'bg-pine-950/85 backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <span
          data-nav="line"
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
        />
        <div data-nav="bar" className="wrap flex h-full items-center justify-between">
          <AnchorLink
            href="#top"
            className="font-display text-[1.65rem] leading-none tracking-tight"
            aria-label={`${brand.name}, back to top`}
          >
            {brand.name}
          </AnchorLink>

          <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
            <ul className="flex items-center gap-9">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <AnchorLink
                    href={link.href}
                    aria-current={link.view === view ? 'page' : undefined}
                    className="text-[0.95rem] text-fg/85 transition-colors hover:text-fg aria-[current=page]:text-fg aria-[current=page]:underline aria-[current=page]:decoration-ember-400 aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                  >
                    {link.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
            <span data-nav="cta" className="relative inline-flex">
              <span
                data-nav="glow"
                aria-hidden
                className="pointer-events-none absolute -inset-2 rounded-full bg-ember-400/50 opacity-0 blur-xl"
              />
              <Button href={nav.cta.href}>{nav.cta.label}</Button>
            </span>
          </nav>

          <button
            type="button"
            className="-mr-2 flex size-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? common.closeMenu : common.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={cn(
                  'absolute left-0 h-px w-6 bg-current transition-transform',
                  open ? 'top-1/2 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-px w-6 bg-current transition-transform',
                  open ? 'top-1/2 -rotate-45' : 'bottom-0',
                )}
              />
            </span>
          </button>
        </div>
      </header>
      {/* Outside the header: its backdrop blur would otherwise contain this fixed panel */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
