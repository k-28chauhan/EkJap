import { confirmed, sample, type ImageRef, type Theme } from './types'

/**
 * ALL site-wide copy, figures and contacts live here and in the sibling data
 * files (EKJAP_PLAN.md §11). Anything wrapped in sample() is a placeholder until
 * the client confirms it: swap it for confirmed() and the "sample" small print goes.
 */

export const brand = {
  name: 'EkJap',
  legalName: sample('EkJap Builders (legal name to be confirmed)'),
  tagline: 'Built above the mist',
  location: 'Kasauli, Himachal Pradesh',
  /** Exact site / village to be confirmed with the client */
  siteLocation: sample('Kasauli, Himachal Pradesh'),
} as const

/**
 * The two Kasauli-side projects (client brief, Oct 2026): Himalayan Dreams is built and
 * its photographs show the finished interiors; EkJap Samruddhi is the new project this
 * site sells, and it is under construction.
 */
export const projects = {
  current: {
    name: 'EkJap Samruddhi',
    display: 'EkJap *Samruddhi*',
    place: 'Kasauli, Himachal Pradesh',
  },
  /** `display` sets the name in the display face, the starred word in italics */
  built: {
    name: 'Himalayan Dreams',
    display: 'Himalayan *Dreams*',
    /** Shown under the name in the Inside banner */
    facts: ['48 apartments', '2 cottages'],
  },
  /** The Goa project, shown when "Goa" is chosen in the nav */
  goa: { name: 'Paradise Farms', facts: ['17 apartments'] },
} as const

export const meta = {
  title: `${projects.current.name} — Kasauli, Himachal Pradesh`,
  description: `${projects.current.name}: a new address in the Kasauli hills, at the height where the clouds come to rest. Under construction and open to your own design. Book a site visit.`,
  /** Canonical URL is set at deploy time */
  canonical: '',
  ogImage: 'og/og-image.jpg',
} as const

export const contact = {
  /** wa.me format: country code + number, digits only */
  whatsapp: confirmed('917696002999'),
  phone: confirmed('+91 76960 02999'),
  email: sample('hello@ekjap.example'),
  address: confirmed(
    'EkJap Samruddhi, Subathu Road, Dharampur, Anji, Kasauli, Himachal Pradesh 173209',
  ),
  siteVisits: sample('Site visits every weekend, pickup from the highway turn-off'),
  /** The project's Google Maps pin: `link` is the share link, `embed` the same place for the page's map */
  map: {
    link: 'https://maps.app.goo.gl/hUJCNJfKJYCCPjrFA?g_st=iw',
    embed:
      'https://maps.google.com/maps?q=EkJap+Samruddhi,+Subathu+Road,+Dharampur,+Anji,+Kasauli,+Himachal+Pradesh+173209&output=embed',
    label: 'Open in Google Maps',
    title: 'Map showing the location of EkJap Samruddhi near Kasauli',
  },
} as const

/** Sections in page order. Drives anchors, nav highlighting, theme switching and the altitude gauge. */
export const sections = [
  { id: 'top', label: 'Top', theme: 'night' },
  { id: 'intro', label: 'Intro', theme: 'mist' },
  { id: 'inside', label: 'Inside', theme: 'linen' },
  { id: 'custom', label: 'Under construction', theme: 'linen' },
  { id: 'glance', label: 'At a glance', theme: 'mist' },
  { id: 'kasauli', label: 'Kasauli', theme: 'day' },
  { id: 'cottages', label: 'Designs', theme: 'day' },
  { id: 'why', label: 'Why here', theme: 'ember' },
  { id: 'life', label: 'Life here', theme: 'ember' },
  { id: 'builder', label: 'Builder', theme: 'stone' },
  { id: 'enquire', label: 'Enquire', theme: 'dusk' },
] as const satisfies readonly { id: string; label: string; theme: Theme }[]

export const nav = {
  /**
   * `view` marks the two project views: the page is Kasauli by default and shows the
   * Goa project only when "Goa" is chosen (see src/lib/view.ts).
   */
  links: [
    { label: 'Kasauli', href: '#kasauli', view: 'kasauli' },
    { label: 'Goa', href: '#goa', view: 'goa' },
    { label: 'Builder', href: '#builder', view: null },
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
  eyebrow: `${projects.current.name} · ${projects.current.place}`,
  title: 'EkJap',
  tagline: 'Built above the mist',
  paragraph:
    'A new address in the Kasauli hills, at the height where the clouds come to rest. Under two hours from Chandigarh.',
  paragraphSample: true, // drive time to be confirmed
  primaryCta: 'Book a site visit',
  secondaryCta: { label: 'See the designs', href: '#cottages' },
  image: {
    src: 'hero/hero-00-bg-mist.webp',
    alt: 'Cloud drifting through pine-covered ridges, with a single cottage among the trees on the hillside',
  } satisfies ImageRef,
  /**
   * The single photograph stands in for the layered plates until they are produced
   * (see the hand-off notes). `ratio` is its pixel aspect; `anchor` is the point kept
   * in view when the frame crops it; `window` is the cottage's window, as a percentage
   * of the photo, where the warm glow is placed (delete `window` to drop the glow).
   */
  plate: {
    ratio: 2000 / 1116,
    anchor: { x: 62, y: 70 },
    window: { x: 56.75, y: 78.1 },
  },
  /** The status line under the hero copy: the project is being built and is open to the buyer's own design */
  badge: 'Under construction · Customise it your way',
  /** A link under the button: social proof from the finished project */
  builtLine: `From the builder of ${projects.built.name}`,
  builtHref: '#inside',
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
      value: 3,
      display: '3',
      format: 'number',
      unit: '',
      label: 'sample designs to start from',
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

/**
 * The "under construction, customisable to the buyer's taste" message (client brief,
 * Oct 2026). The copy is a draft in the builder's voice; the current stage is read
 * from the timeline so the two never disagree.
 */
export const construction = {
  label: `${projects.current.name} · Under construction`,
  title: 'Being built now, *built your way*',
  copy: `${projects.current.name} is under construction, so nothing here is set in stone. Tell us what you want built, a home, an apartment or anything else, and we will build it that way.`,
  copySample: true,
  kicker: 'Our new project',
  statusTitle: 'Under construction',
  line: 'Being built now in Kasauli. Tell us what you need, and make it yours.',
  typesLabel: 'What it can be',
  types: ['Homes', 'Apartments', 'Anything else'],
  customiseLabel: 'Customise',
  customiseTitle: 'Yours to shape',
  customiseItems: [
    { title: 'The layout', text: 'Open plan or separate rooms, one level or more.' },
    { title: 'The rooms', text: 'How many, how big, and what each one is for.' },
    { title: 'The materials', text: 'Timber, stone, slate, or whatever you prefer.' },
    { title: 'The finishes', text: 'Colours, fittings and fixtures, down to the handles.' },
  ],
  cta: 'Tell us how you’d like yours',
  smallPrint: 'Draft copy, to be confirmed with the builder.',
} as const

export const inside = {
  label: `${projects.built.name} · Already built`,
  title: 'Inside, it’s *warm*',
  copy: `These rooms are from ${projects.built.name}, our last project: timber walls, warm light, and wood in every room. Your home can be fitted in the same spirit, or in whatever spirit you choose.`,
  /** Confirm with the client that these are their own finished homes */
  copySample: true,
  quote: 'A house in the hills should feel like it was always there.',
  quoteSample: true,
  /** The banner that opens the section: Himalayan Dreams, the finished project, set apart */
  project: {
    kicker: 'Our last project',
    status: 'Completed',
    line: 'Already built, and the best way to see how we build. Step inside.',
    cta: { label: 'Build yours the same way', href: '#enquire' },
  },
  seeAll: 'See all photos',
  smallPrint: `Interiors are from ${projects.built.name}, the builder’s completed project (to be confirmed).`,
  photos: [
    {
      src: 'inside/inside-01-lounge-fireplace.jpg',
      alt: 'A living room with timber-slab walls, leather armchairs, a fireplace and a deer-head sculpture',
      caption: 'Lounge · timber-slab walls',
    },
    {
      src: 'inside/inside-02-bathroom-tiles.jpg',
      alt: 'A bathroom with patterned tiles, a framed mirror and a dark stone basin',
      caption: 'Bathroom · patterned tiles',
    },
    {
      src: 'inside/inside-06-verandah.jpg',
      alt: 'A verandah with timber-framed mesh doors, a cane chair and a hanging swing seat',
      caption: 'Verandah · timber-framed doors',
      position: '70% 50%',
    },
    {
      src: 'inside/inside-04-kitchen-dining.jpg',
      alt: 'A kitchen with wood-grain cabinets and an oval glass-topped dining table under a chandelier',
      caption: 'Kitchen and dining',
    },
    {
      src: 'inside/inside-05-main-bedroom.jpg',
      alt: 'A bedroom with a dark timber-panelled wall, a painted elephant panel and floral bedding',
      caption: 'Main bedroom · timber panelling',
      position: '55% 50%',
    },
    {
      src: 'inside/inside-03-guest-room.jpg',
      alt: 'A bedroom with a timber feature wall, patterned curtains at a tall window and a ceiling fan',
      caption: 'Guest room · timber feature wall',
    },
    {
      src: 'inside/inside-08-bar.jpg',
      alt: 'A home bar with a studded wooden counter, a plank-clad wall with crossed rifles and pendant lamps, and barrel-style stools',
      caption: 'Home bar · plank wall',
    },
    {
      src: 'inside/inside-07-bedroom.jpg',
      alt: 'A bedroom with a panelled wardrobe, a timber feature wall, and checked bedding',
      caption: 'Bedroom · warm wood tones',
    },
  ] satisfies ImageRef[],
} as const

export const why = {
  label: 'Why here',
  title: 'An evening *by the fire*',
  background: {
    src: 'inside/inside-01-lounge-fireplace.jpg',
    alt: 'A living room with timber-slab walls, leather armchairs and a fireplace',
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

export const builder = {
  label: 'The builder',
  title: 'Open for *construction* contracts',
  copy: `EkJap takes contracts to build anything: apartments, cottages, villas and more, from first drawings to handover. ${projects.built.name} (48 apartments and 2 cottages) is complete, ${projects.goa.name} in Goa has 17 apartments, and ${projects.current.name} is the next.`,
  copySample: true,
  image: {
    src: 'builder/builder-01-past-project.jpg',
    alt: `The dining area and lounge at ${projects.built.name}, with a chandelier, a long glass-topped table and timber-slab walls`,
    caption: `${projects.built.name} · our last project`,
  } satisfies ImageRef,
  numbers: [
    { id: 'years', value: confirmed('30+'), label: 'years building' },
    /** The apartments at Himalayan Dreams; confirm the total delivered with the client */
    { id: 'apartments', value: sample('60+'), label: 'apartments delivered' },
    { id: 'locations', value: confirmed('3'), label: 'locations' },
  ],
  smallPrint: 'Figures are samples until confirmed.',
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
    /** {topic} is replaced with the chosen cottage or project */
    message: `Hello EkJap, I’d like to visit ${projects.current.name}. {topic}`,
    generalTopic: 'Please share the details.',
    /** {what} is the chosen cottage or project */
    topic: 'I’m interested in {what}.',
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
  disclaimer: `${projects.current.name} is under construction and can be customised. Exterior images are representative and will be replaced with renders of the final design. Interiors are from ${projects.built.name}, the builder’s completed project. Specifications and figures are indicative.`,
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
