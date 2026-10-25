import type { ImageRef } from './types'

/**
 * Kasauli, the town (EKJAP_PLAN.md §9.3). Photos here must be of Kasauli.
 * Distances and drive times are placeholders until verified locally.
 */

export const townIntro = {
  label: 'The town',
  title: 'A town that kept its *old pace*',
  copy: 'Colonial lanes, stone churches and pine forest, a short drive from the plains. Close enough for weekends, quiet enough to stay longer.',
  image: {
    src: 'town/town-06-mist-valley.jpg',
    alt: 'Cloud filling a pine-covered valley near Kasauli, with a few houses on the hillside',
  } satisfies ImageRef,
} as const

export interface Postcard {
  id: string
  name: string
  /** Distance label in label style, e.g. "8 MIN FROM EKJAP" */
  distance: string
  line: string
  image: ImageRef
}

/**
 * Six postcards, in walking order. Distances are placeholders until verified.
 * Still wanted: a heritage-lane photo (EKJAP_PLAN.md §9.3).
 */
export const postcards: Postcard[] = [
  {
    id: 'mall-road',
    name: 'Mall Road',
    distance: '8 min from EkJap',
    line: 'The old market, still lit after dark',
    image: {
      src: 'town/town-01-mall-road.jpg',
      alt: 'An older man in a checked jacket and cap walks along the lamplit market lane at night, past stalls of woollens',
    },
  },
  {
    id: 'christ-church',
    name: 'Christ Church',
    distance: '10 min from EkJap',
    line: 'A stone church from 1853',
    image: {
      src: 'town/town-02-christ-church.jpg',
      alt: 'The stone clock tower and blue metal roof of Christ Church, Kasauli, against a clear sky',
    },
  },
  {
    id: 'church-tower',
    name: 'The clock tower',
    distance: '10 min from EkJap',
    line: 'Stone and slate, seen from below',
    image: {
      src: 'town/town-07-church-tower.jpg',
      alt: 'Looking up at the stone tower of Christ Church, Kasauli, with pointed arched windows',
    },
  },
  {
    id: 'gilbert-trail',
    name: 'Gilbert Trail',
    distance: '12 min from EkJap',
    line: 'A quiet road through the deodars',
    image: {
      src: 'town/town-04-forest-trail.jpg',
      alt: 'A winding road between tall deodar trees under a purple dusk sky, with town lights far ahead',
    },
  },
  {
    id: 'sunset-point',
    name: 'Sunset Point',
    distance: '15 min from EkJap',
    line: 'Where the town gathers at six',
    image: {
      src: 'town/town-03-sunset-point.jpg',
      alt: 'A lamp post and signboard against an orange sunset, with a sea of cloud below the hills',
    },
  },
  {
    id: 'hillside-sunset',
    name: 'The hill at dusk',
    distance: '10 min from EkJap',
    line: 'Rooftops through the pines as the sky turns',
    image: {
      src: 'town/town-05-hillside-sunset.jpg',
      alt: 'An orange sunset sky seen through pine branches, with buildings on the hillside below',
    },
  },
]

export const postcardsLabel = 'Places around Kasauli'

export const townSmallPrint = 'Distances are approximate and will be verified before launch.'

export const route = {
  label: 'The drive',
  title: 'Up from the *plains*',
  smallPrint: 'Drive times are approximate.',
  /** In order, from the plains to the ridge. `minutes` is cumulative from Chandigarh. */
  stops: [
    { id: 'chandigarh', name: 'Chandigarh', minutes: 0 },
    { id: 'panchkula', name: 'Panchkula', minutes: 30 },
    { id: 'parwanoo', name: 'Parwanoo', minutes: 50 },
    { id: 'dharampur', name: 'Dharampur', minutes: 80 },
    { id: 'kasauli', name: 'Kasauli', minutes: 95 },
    { id: 'ekjap', name: 'EkJap', minutes: 105 },
  ],
  sample: true,
} as const
