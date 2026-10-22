import { MistBand } from '@/components/motion/MistBand'
import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { Preloader } from '@/components/layout/Preloader'
import { common } from '@/data/site'
import { useSectionTheme } from '@/hooks/useSectionTheme'
import { SmoothScroll } from '@/lib/SmoothScroll'
import { Builder } from '@/sections/Builder'
import { Cottages } from '@/sections/Cottages'
import { Enquire } from '@/sections/Enquire/Enquire'
import { Faq } from '@/sections/Faq'
import { Glance } from '@/sections/Glance'
import { Hero } from '@/sections/Hero/Hero'
import { Inside } from '@/sections/Inside'
import { Intro } from '@/sections/Intro'
import { Kasauli } from '@/sections/Kasauli/Kasauli'
import { LifeHere } from '@/sections/LifeHere'
import { Materials } from '@/sections/Materials'
import { SitePlan } from '@/sections/SitePlan/SitePlan'
import { WhyHere } from '@/sections/WhyHere'

function Page() {
  useSectionTheme()

  return (
    <>
      <a
        href="#content"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-ember-400 px-5 py-2.5 font-medium text-pine-950 focus:translate-y-0"
      >
        {common.skipLink}
      </a>
      <Preloader />
      <Nav />
      <main id="content">
        <Hero />
        <Intro />
        <Glance />
        <Kasauli />
        <Cottages />
        <Inside />
        <Materials />
        {/* Mist sits on the joins where the theme changes most */}
        <MistBand />
        <WhyHere />
        <LifeHere />
        <MistBand />
        <SitePlan />
        <Builder />
        <Faq />
        <MistBand />
        <Enquire />
        <MistBand />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <SmoothScroll>
      <Page />
    </SmoothScroll>
  )
}
