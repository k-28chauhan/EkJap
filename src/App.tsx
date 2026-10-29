import { useEffect } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { Preloader } from '@/components/layout/Preloader'
import { MistBand } from '@/components/motion/MistBand'
import { goa } from '@/data/goa'
import { common, contact, meta } from '@/data/site'
import { useSectionTheme } from '@/hooks/useSectionTheme'
import { ScrollTrigger } from '@/lib/gsap'
import { SmoothScroll } from '@/lib/SmoothScroll'
import { scrollToTarget } from '@/lib/scrollTo'
import { useView } from '@/lib/view'
import { Builder } from '@/sections/Builder'
import { Construction } from '@/sections/Construction'
import { Cottages } from '@/sections/Cottages'
import { Enquire } from '@/sections/Enquire/Enquire'
import { Glance } from '@/sections/Glance'
import { GoaGallery, GoaHero } from '@/sections/Goa/Goa'
import { Hero } from '@/sections/Hero/Hero'
import { Inside } from '@/sections/Inside'
import { Intro } from '@/sections/Intro'
import { Kasauli } from '@/sections/Kasauli/Kasauli'
import { LifeHere } from '@/sections/LifeHere'
import { WhyHere } from '@/sections/WhyHere'

const kasauliLocation = {
  address: contact.address.value,
  note: contact.siteVisits.value,
  map: contact.map,
}

/** The main page: the Kasauli project. */
function KasauliPage() {
  useSectionTheme()
  return (
    <>
      <Hero />
      <Intro />
      <Inside />
      <Construction />
      <Glance />
      <Kasauli />
      <Cottages />
      {/* Mist sits on the joins where the theme changes most */}
      <MistBand />
      <WhyHere />
      <LifeHere />
      <MistBand />
      <Builder />
      <MistBand />
      <Enquire location={kasauliLocation} />
      <MistBand />
    </>
  )
}

/** The Goa project, shown only when "Goa" is chosen. */
function GoaPage() {
  useSectionTheme()
  return (
    <>
      <GoaHero />
      <GoaGallery />
      <MistBand />
      <Builder />
      <MistBand />
      <Enquire location={goa.location} look={goa.enquire} />
      <MistBand />
    </>
  )
}

export default function App() {
  const view = useView()

  // Switching view lands at the top, or on the anchor that was asked for (e.g. #kasauli).
  // The pinned sections change the page height as they set up, so land once early and
  // again after the layout has settled (unless the visitor has already scrolled on).
  useEffect(() => {
    document.title = view === 'goa' ? goa.metaTitle : meta.title

    const land = () => {
      ScrollTrigger.refresh()
      const hash = window.location.hash
      const target = hash.length > 1 ? document.querySelector(hash) : null
      if (target instanceof HTMLElement) scrollToTarget(target, { instant: true })
      else window.scrollTo(0, 0)
      return window.scrollY
    }

    let landedAt = 0
    const early = window.setTimeout(() => (landedAt = land()), 80)
    const settled = window.setTimeout(() => {
      if (Math.abs(window.scrollY - landedAt) < 4) land()
    }, 700)
    return () => {
      window.clearTimeout(early)
      window.clearTimeout(settled)
    }
  }, [view])

  return (
    <SmoothScroll>
      <a
        href="#content"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-ember-400 px-5 py-2.5 font-medium text-pine-950 focus:translate-y-0"
      >
        {common.skipLink}
      </a>
      <Preloader />
      <Nav />
      <main id="content">
        {view === 'goa' ? <GoaPage key="goa" /> : <KasauliPage key="kasauli" />}
      </main>
      <Footer />
    </SmoothScroll>
  )
}
