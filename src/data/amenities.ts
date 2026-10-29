import type { ImageRef } from './types'

/**
 * Life here (EKJAP_PLAN.md §9.8). Confirm the list with the client. Until real
 * amenity photos exist these use interiors and town photos, captioned accordingly.
 */

export interface Amenity {
  id: string
  title: string
  text: string
  image: ImageRef
}

export const amenities: Amenity[] = [
  {
    id: 'lounge',
    title: 'Fireplace lounge & clubhouse',
    text: 'A shared lounge with a hearth for cold evenings and long conversations.',
    image: {
      src: 'inside/inside-01-lounge-fireplace.jpg',
      alt: 'A lounge with timber-slab walls, leather armchairs and a fireplace',
      caption: 'Interior at Himalayan Dreams',
    },
  },
  {
    id: 'deck',
    title: 'Viewing deck at the ridge',
    text: 'A deck at the top of the road, built for the hour the valley turns gold.',
    image: {
      src: 'town/town-03-sunset-point.jpg',
      alt: 'A lamp post and signboard against an orange sunset, with a sea of cloud below the hills',
      caption: 'Sunset Point, Kasauli',
    },
  },
  {
    id: 'trails',
    title: 'Forest trails',
    text: 'Walks that start at your gate and run through the pines.',
    image: {
      src: 'town/town-04-forest-trail.jpg',
      alt: 'A winding road between tall deodar trees at dusk',
      caption: 'Gilbert Trail, Kasauli',
    },
  },
]
