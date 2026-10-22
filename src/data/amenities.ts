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
      alt: 'Lounge with a fireplace and live-edge timber wall',
      caption: 'Interior from a completed EkJap home',
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
  {
    id: 'caretaker',
    title: '24×7 caretaker & security',
    text: 'Someone is always on site, so the house is looked after when you are not.',
    image: {
      src: 'inside/inside-03-guest-room.jpg',
      alt: 'Guest bedroom with a glazed door to the garden',
      caption: 'Interior from a completed EkJap home',
    },
  },
  {
    id: 'backup',
    title: 'Power and water backup',
    text: 'Backup for the evenings the hills lose the grid.',
    image: {
      src: 'inside/inside-04-kitchen-dining.jpg',
      alt: 'Kitchen with a long dining table for eight',
      caption: 'Interior from a completed EkJap home',
    },
  },
  {
    id: 'rental',
    title: 'Rental management',
    text: 'Optional management, so the cottage earns while you are in the city.',
    image: {
      src: 'inside/inside-05-main-bedroom.jpg',
      alt: 'Main bedroom with a timber-panelled wall',
      caption: 'Interior from a completed EkJap home',
    },
  },
]

export const amenitiesSmallPrint = 'Amenities are indicative and to be confirmed.'
