import type { CottageType, ImageRef } from './types'

/**
 * (Elevation drawings and placeholder floor plans are components in src/svg,
 * keyed by `id`.)
 * The three cottage types (EKJAP_PLAN.md §9.4). Counts, layouts and sizes are
 * sample numbers until the client confirms them. Exterior images are
 * representative: they always carry the "Representative image" caption.
 */

export interface Cottage {
  id: CottageType
  index: string // "01 / 03"
  name: string
  form: string // the building form, shown beside the name
  count: number
  layout: string
  builtUpSqFt: number
  price: string
  description: string
  image: ImageRef
  askLabel: string
  sample: true
}

export const cottagesSection = {
  label: 'The cottages',
  title: 'Three ways to *come home*',
  copy: 'Three designs, each set to the slope and turned to the valley.',
  specLabels: { layout: 'Layout', area: 'Built-up area', price: 'Price', unit: 'sq ft' },
  smallPrint: 'Sample figures. Floor plans are placeholders.',
  viewPlan: 'View plan',
  closeModal: 'Close',
  planModalTitle: 'Floor plan',
  planPlaceholder: 'Placeholder plan, to be replaced with the architect’s drawing.',
} as const

export const cottages: Cottage[] = [
  {
    id: 'pine',
    index: '01 / 03',
    name: 'The Pine',
    form: 'A-frame',
    count: 6,
    layout: '2 bed + loft',
    builtUpSqFt: 1150,
    price: 'On request',
    description:
      'An A-frame with a double-height glass gable facing the valley. A sleeping loft under the ridge beam, and a deck that fits six chairs and a fire bowl.',
    image: {
      src: 'cottages/cottage-01-pine-aframe.jpg',
      alt: 'A pair of A-frame cottages among pine trees',
      caption: 'Representative image',
    },
    askLabel: 'Ask about The Pine',
    sample: true,
  },
  {
    id: 'ridge',
    index: '02 / 03',
    name: 'The Ridge',
    form: 'Stone + timber, set into the slope',
    count: 5,
    layout: '3–4 bed',
    builtUpSqFt: 1850,
    price: 'On request',
    description:
      'A family home set into the slope, with a dry-laid stone base and a planted roof. Floor-to-ceiling glass on the south face.',
    image: {
      src: 'cottages/cottage-02-ridge-stone.jpg',
      alt: 'Stepped stone and timber homes on terraces',
      caption: 'Representative image',
    },
    askLabel: 'Ask about The Ridge',
    sample: true,
  },
  {
    id: 'deodar',
    index: '03 / 03',
    name: 'The Deodar',
    form: 'Cabin on posts',
    count: 3,
    layout: '1–2 bed',
    builtUpSqFt: 780,
    price: 'On request',
    description:
      'A compact cabin raised among the trees, with a wraparound deck nearly half its floor area. Built for two.',
    image: {
      src: 'cottages/cottage-03-deodar-cabin.jpg',
      alt: 'Small cabins with decks on a hillside',
      caption: 'Representative image',
    },
    askLabel: 'Ask about The Deodar',
    sample: true,
  },
]

export const cottageById = Object.fromEntries(cottages.map((c) => [c.id, c])) as Record<
  CottageType,
  Cottage
>
