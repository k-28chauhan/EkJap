import { sample, type ImageRef, type Sampled, type Theme } from './types'

/**
 * ALL site-wide copy, figures and contacts live here and in the sibling data
 * files (EKJAP_PLAN.md §11). Anything wrapped in sample() is a placeholder until
 * the client confirms it: swap it for confirmed() and the "sample" small print goes.
 */

export const brand = {
  name: 'EkJap',
  legalName: sample('EkJap Builders (legal name to be confirmed)'),
  tagline: 'Cottages above the mist',
  location: 'Kasauli, Himachal Pradesh',
  /** Exact site / village to be confirmed with the client */
  siteLocation: sample('Kasauli, Himachal Pradesh'),
} as const

export const meta = {
  title: 'EkJap — Cottages in Kasauli, Himachal Pradesh',
  description:
    'Fourteen cottages on a pine ridge in Kasauli, at the height where the clouds come to rest. Book a site visit.',
  /** Canonical URL is set at deploy time */
  canonical: '',
  ogImage: 'og/og-image.jpg',
} as const

export const contact = {
  /** wa.me format: country code + number, digits only */
  whatsapp: sample('91XXXXXXXXXX'),
  phone: sample('+91 XXXXX XXXXX'),
  email: sample('hello@ekjap.example'),
  address: sample('Sales office, Kasauli, Himachal Pradesh (address to be confirmed)'),
  siteVisits: sample('Site visits every weekend, pickup from the highway turn-off'),
} as const

export const rera: Sampled<string | null> = sample(null)

/** Sections in page order. Drives anchors, nav highlighting, theme switching and the altitude gauge. */
export const sections = [
  { id: 'top', label: 'Top', theme: 'night' },
  { id: 'intro', label: 'Intro', theme: 'mist' },
  { id: 'glance', label: 'At a glance', theme: 'mist' },
  { id: 'kasauli', label: 'Kasauli', theme: 'day' },
  { id: 'cottages', label: 'Cottages', theme: 'day' },
  { id: 'inside', label: 'Inside', theme: 'linen' },
  { id: 'materials', label: 'Materials', theme: 'linen' },
  { id: 'why', label: 'Why here', theme: 'ember' },
  { id: 'life', label: 'Life here', theme: 'ember' },
  { id: 'siteplan', label: 'Site plan', theme: 'stone' },
  { id: 'builder', label: 'Builder', theme: 'stone' },
  { id: 'faq', label: 'FAQ', theme: 'stone' },
  { id: 'enquire', label: 'Enquire', theme: 'dusk' },
] as const satisfies readonly { id: string; label: string; theme: Theme }[]

export const nav = {
  links: [
    { label: 'Cottages', href: '#cottages' },
    { label: 'Kasauli', href: '#kasauli' },
    { label: 'Site plan', href: '#siteplan' },
    { label: 'Builder', href: '#builder' },
  ],
  cta: { label: 'Book a site visit', href: '#enquire' },
  mobileBar: { label: 'Book a visit', whatsappLabel: 'WhatsApp us' },
} as const

export const altitude = {
  /** Gate and ridge heights drive the preloader counter and the altitude gauge */
  gate: sample(1790),
  ridge: sample(1850),
} as const

export const hero = {
  eyebrow: 'Cottages · Kasauli, Himachal Pradesh',
  title: 'EkJap',
  tagline: 'Cottages above the mist',
  paragraph:
    'Fourteen cottages on a pine ridge, at the height where the clouds come to rest. Under two hours from Chandigarh.',
  paragraphSample: true, // drive time to be confirmed
  primaryCta: 'Book a site visit',
  secondaryCta: { label: 'See the cottages', href: '#cottages' },
  image: {
    src: 'hero/hero-00-bg-night.webp',
    alt: 'Cloud rolling over pine-covered hills at night, with one lit cottage on the ridge',
  } satisfies ImageRef,
  /**
   * The single night photograph stands in for the layered plates until they are
   * produced (see the hand-off notes). `ratio` is its pixel aspect; `anchor` is
   * the point kept in view when the frame crops it; `window` is the lit cottage
   * window, as a percentage of the photo, where the glow is placed.
   */
  plate: {
    ratio: 2000 / 1116,
    anchor: { x: 70, y: 60 },
    window: { x: 74.35, y: 76.35 },
  },
  scroll: 'Scroll',
  altitudeLabel: 'above sea level',
} as const

export const preloader = {
  unit: 'm',
  from: 0,
  to: altitude.ridge.value,
} as const

export const intro = {
  label: 'The ridge',
  // Words wrapped in *asterisks* are set in the italic display face
  title: 'A window *above* the clouds',
  /** The heading broken as it is set on desktop, where the lines overlap the photo */
  titleLines: ['A window', '*above*', 'the clouds'],
  copy: 'Morning comes in slowly here. Mist fills the valley, the pines drip, and by ten the whole range is out. EkJap is built for that slow morning, and for the fire you light at six.',
  image: {
    src: 'intro/intro-01-window-dusk.jpg',
    alt: 'A window at dusk looking over pine trees and layered hills, with an armchair on either side',
  } satisfies ImageRef,
} as const

export const glance = {
  label: 'At a glance',
  title: 'The ridge, in *numbers*',
  smallPrint: 'Sample figures, to be replaced with surveyed numbers.',
  stats: [
    {
      id: 'altitude',
      value: 1850,
      display: '1,850',
      format: 'number',
      unit: 'm',
      label: 'above sea level',
      sample: true,
    },
    {
      id: 'drive',
      value: 105,
      display: '1 h 45 m',
      format: 'duration',
      unit: '',
      label: 'from Chandigarh',
      sample: true,
    },
    {
      id: 'cottages',
      value: 14,
      display: '14',
      format: 'number',
      unit: '',
      label: 'cottages in 3 designs',
      sample: true,
    },
    {
      id: 'forest',
      value: 62,
      display: '62',
      format: 'number',
      unit: '%',
      label: 'of the land left as forest',
      sample: true,
    },
    {
      id: 'temp',
      value: 22,
      display: '22',
      format: 'number',
      unit: '°',
      label: 'average June afternoon',
      sample: true,
    },
  ],
} as const

export const inside = {
  label: 'Inside',
  title: 'Inside, it’s *warm*',
  copy: 'These rooms are from homes EkJap has finished in the hills: timber walls, pine ceilings, painted cabinets worn back by hand. The cottages will be fitted in the same spirit.',
  /** Confirm with the client that these are their own finished homes */
  copySample: true,
  quote: 'A house in the hills should feel like it was always there.',
  quoteSample: true,
  seeAll: 'See all photos',
  smallPrint: 'Interiors are from the builder’s completed homes (to be confirmed).',
  photos: [
    {
      src: 'inside/inside-01-lounge-fireplace.jpg',
      alt: 'Living room with a fireplace and a live-edge timber wall',
      caption: 'Lounge · live-edge timber',
    },
    {
      src: 'inside/inside-02-reading-corner.jpg',
      alt: 'Armchair by a window beside a distressed painted cabinet',
      caption: 'Reading corner · hand-worn paint',
    },
    {
      src: 'inside/inside-03-guest-room.jpg',
      alt: 'Bedroom with a glazed door opening to the garden',
      caption: 'Guest room · garden door',
    },
    {
      src: 'inside/inside-04-kitchen-dining.jpg',
      alt: 'Long dining table for eight beside an open kitchen',
      caption: 'Kitchen · seats eight',
    },
    {
      src: 'inside/inside-05-main-bedroom.jpg',
      alt: 'Bedroom with a timber-panelled wall',
      caption: 'Main bedroom · timber panelling',
    },
    {
      src: 'inside/inside-06-attic-studio.jpg',
      alt: 'Attic room under a vaulted pine ceiling',
      caption: 'Attic studio · pine ceiling',
    },
  ] satisfies ImageRef[],
} as const

export const materials = {
  label: 'Materials',
  title: 'Made from what the hill *gives*',
  items: [
    {
      id: 'timber',
      name: 'Live-edge timber',
      line: 'Bark line left on',
      image: {
        src: 'textures/texture-timber.jpg',
        alt: 'Close crop of live-edge timber with the bark line left on',
      },
    },
    {
      id: 'pine',
      name: 'Pine boarding',
      line: 'Tongue-and-groove ceilings',
      image: {
        src: 'textures/texture-pine.jpg',
        alt: 'Close crop of tongue-and-groove pine boarding',
      },
    },
    {
      id: 'paint',
      name: 'Worn paint',
      line: 'Painted, then rubbed back by hand',
      image: {
        src: 'textures/texture-paint.jpg',
        alt: 'Close crop of painted wood rubbed back by hand',
      },
    },
    {
      id: 'stone',
      name: 'Dry-laid stone',
      line: 'Local stone for plinths and terraces',
      image: { src: 'textures/texture-stone.jpg', alt: 'Close crop of dry-laid local stone' },
    },
  ],
} as const

export const why = {
  label: 'Why here',
  title: 'An evening *by the fire*',
  background: {
    src: 'inside/inside-01-lounge-fireplace.jpg',
    alt: 'Living room with a lit fireplace and a live-edge timber wall',
  } satisfies ImageRef,
  cards: [
    {
      id: 'privacy',
      title: 'Privacy by design',
      text: 'No two windows face each other.',
    },
    {
      id: 'hill',
      title: 'Built from the hill',
      text: 'Local stone, timber and slate.',
    },
    {
      id: 'care',
      title: 'Looked after while you’re away',
      text: 'Optional management and rentals.',
    },
    {
      id: 'view',
      title: 'A view from every plan',
      text: 'Each plot is oriented to the valley.',
    },
  ],
  /** Card copy is a draft; confirm each claim with the client */
  sample: true,
  smallPrint: 'Draft copy, to be confirmed with the builder.',
} as const

export const life = {
  label: 'Life here',
  title: 'Slow days, *warm* evenings',
  /** Amenities live in amenities.ts */
} as const

export const siteplan = {
  label: 'Site plan',
  title: 'Find your *plot*',
  copy: 'Tap a plot to see its cottage, elevation and outlook. Filter by design to see where each one sits on the ridge.',
  badge: 'Sample availability',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'pine', label: 'The Pine' },
    { id: 'ridge', label: 'The Ridge' },
    { id: 'deodar', label: 'The Deodar' },
  ],
  legend: { available: 'Available', hold: 'On hold', sold: 'Sold' },
  ask: 'Ask about plot',
  card: {
    plot: 'Plot',
    layout: 'Layout',
    area: 'Built-up area',
    elevation: 'Elevation',
    facing: 'Facing',
    view: 'Main view',
    bed: 'bed',
    unit: 'sq ft',
  },
} as const

export const builder = {
  label: 'The builder',
  title: 'Built by people who *live* in the hills',
  copy: 'EkJap builds in timber and stone, and stays to see the work finished. Details of the company and its earlier projects are below.',
  copySample: true,
  image: {
    src: 'builder/builder-01-past-project.jpg',
    alt: 'A completed EkJap project in the hills',
    caption: 'An earlier project',
  } satisfies ImageRef,
  numbers: [
    { id: 'years', value: sample(0), label: 'years building' },
    { id: 'homes', value: sample(0), label: 'homes delivered' },
    { id: 'towns', value: sample(0), label: 'hill towns' },
  ],
  reraLabel: 'RERA registration',
  reraMissing: 'Registration number to be provided',
  smallPrint: 'Stages, dates and figures are samples until confirmed.',
} as const

export const faqSection = {
  label: 'FAQ',
  title: 'Questions, *answered*',
  smallPrint: 'Answers are drafts until confirmed by the builder.',
} as const

export const enquire = {
  label: 'Enquire',
  title: 'Come up and see the *ridge*',
  background: {
    src: 'town/town-08-dusk-view.jpg',
    alt: 'Dusk over the plains from the hills near Kasauli, seen through pine branches, with a house whose windows are lit',
  } satisfies ImageRef,
  fields: {
    name: { label: 'Name', error: 'Please tell us your name.' },
    mobile: {
      label: 'Mobile',
      prefix: '+91',
      error: 'Enter a 10-digit mobile number.',
    },
    interest: {
      label: 'Interested in',
      options: [
        { value: 'unsure', label: 'Not sure' },
        { value: 'pine', label: 'The Pine' },
        { value: 'ridge', label: 'The Ridge' },
        { value: 'deodar', label: 'The Deodar' },
      ],
    },
    visit: {
      label: 'When could you visit?',
      options: [
        { value: 'this-weekend', label: 'This weekend' },
        { value: 'next-weekend', label: 'Next weekend' },
        { value: 'later', label: 'Later' },
        { value: 'date', label: 'Pick a date' },
      ],
      dateLabel: 'Visit date',
      dateError: 'Choose a date for your visit.',
    },
    plot: { label: 'Plot (optional)' },
    brochure: { label: 'Send me the brochure and price list on WhatsApp' },
  },
  submit: 'Request a site visit',
  sending: 'Sending…',
  success: {
    title: 'Someone’s home.',
    text: 'Thank you. We’ll message you on WhatsApp to fix a time for your visit.',
  },
  failure: 'Something went wrong. Please try again, or message us on WhatsApp.',
  whatsapp: {
    label: 'Chat on WhatsApp',
    /** {topic} is replaced with the chosen cottage / plot */
    message: 'Hello EkJap, I’d like to visit the ridge. {topic}',
    generalTopic: 'Please share the details.',
    /** {what} is the chosen cottage and plot */
    topic: 'I’m interested in {what}.',
    plotWord: 'plot',
    copyLabel: 'Copy number',
    copyFailed: 'Copy failed',
    copied: 'Copied',
  },
} as const

export const footer = {
  wordmark: 'EkJap',
  columns: {
    contact: 'Contact',
    address: 'Address',
    links: 'Links',
  },
  disclaimer:
    'Exterior images are representative and will be replaced with renders of the final design. Interiors are from the builder’s completed homes. Specifications and figures are indicative.',
  privacy: { label: 'Privacy policy', href: '#' },
  copyright: (year: number) => `© ${year} EkJap`,
} as const

export const common = {
  sampleNote: 'sample',
  representative: 'Representative image',
  skipLink: 'Skip to content',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
} as const
