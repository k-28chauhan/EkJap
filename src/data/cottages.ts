import type { CottageType, ImageRef } from './types'

/**
 * (Elevation drawings and placeholder floor plans are components in src/svg,
 * keyed by `id`.)
 * The three designs (EKJAP_PLAN.md §9.4). Counts, layouts and sizes are
 * sample numbers until the client confirms them. Exterior images are
 * representative: they always carry the "Representative image" caption.
 */

export interface Cottage {
  id: CottageType
  index: string // "01 / 03"
  name: string
  /** How the WhatsApp message names it, e.g. "the cottage" */
  topic: string
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
  label: 'Design ideas',
  title: 'Three ways to *come home*',
  copy: 'Three designs to start from: a cottage, an apartment and a farmhouse. Nothing at EkJap Samruddhi is fixed yet, so each can be changed, or replaced with a design of your own.',
  specLabels: { layout: 'Layout', area: 'Built-up area', price: 'Price', unit: 'sq ft' },
  viewPlan: 'View plan',
  closeModal: 'Close',
  planModalTitle: 'Floor plan',
} as const

export const cottages: Cottage[] = [
  {
    id: 'cottage',
    index: '01 / 03',
    name: 'Cottage',
    topic: 'the cottage',
    form: 'Pitched roof, timber and stone',
    count: 6,
    layout: '2 bed',
    builtUpSqFt: 1150,
    price: 'On request',
    description:
      'A pitched-roof cottage with a covered porch and a hearth for cold evenings, set among the trees. A snug home for a small family, or a weekend retreat.',
    image: {
      src: 'cottages/cottage-01-pine-aframe.jpg',
      alt: 'A pair of A-frame cottages among pine trees',
      caption: 'Representative image',
    },
    askLabel: 'Ask about the cottage',
    sample: true,
  },
  {
    id: 'apartment',
    index: '02 / 03',
    name: 'Apartment',
    topic: 'the apartment',
    form: 'Low-rise block with balconies',
    count: 5,
    layout: '2–3 bed',
    builtUpSqFt: 1250,
    price: 'On request',
    description:
      'A low-rise apartment with a balcony on the valley side and the same warm finishes as our other homes. Easy to look after when you are away.',
    image: {
      src: 'cottages/cottage-02-apartment.jpg',
      alt: 'A five-storey apartment building at night, with lit balconies, red balustrades and a covered ground-floor lounge',
      position: '58% center',
      caption: 'Representative image',
    },
    askLabel: 'Ask about the apartment',
    sample: true,
  },
  {
    id: 'farmhouse',
    index: '03 / 03',
    name: 'Farmhouse',
    topic: 'the farmhouse',
    form: 'Long, low house with a veranda',
    count: 3,
    layout: '3–4 bed',
    builtUpSqFt: 2400,
    price: 'On request',
    description:
      'A long, low farmhouse with a wide veranda along the front and room for a garden. Made for family gatherings and slow weekends.',
    image: {
      src: 'cottages/cottage-03-farmhouse.jpg',
      alt: 'A single-storey house with a tiled roof, stone-clad walls, a covered porch and a front garden with flowers',
      caption: 'Representative image',
    },
    askLabel: 'Ask about the farmhouse',
    sample: true,
  },
]

export const cottageById = Object.fromEntries(cottages.map((c) => [c.id, c])) as Record<
  CottageType,
  Cottage
>
