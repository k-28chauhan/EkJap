import { projects } from './site'
import type { ImageRef } from './types'

/**
 * The Goa project view (client brief, Oct 2026): shown only when "Goa" is chosen in
 * the nav. EkJap Paradise Palms is a completed project of 17 apartments; the client
 * has supplied one photograph so far (the entrance wall).
 */
export const goa = {
  metaTitle: `${projects.goa.name}, Goa`,
  status: 'Completed',
  eyebrow: `${projects.goa.facts.join(' · ')} · Goa`,
  title: projects.goa.name,
  /** The hero heading: the photograph already carries the project's name */
  heading: 'Our project in *Goa*',
  paragraph: `${projects.goa.name} is complete: ${projects.goa.facts[0]} in Goa, built by EkJap.`,
  image: {
    src: 'goa/goa-01-paradise-palms.jpg',
    alt: `The entrance wall of ${projects.goa.name} in Goa: brass lettering on dark stone, a stone Buddha statue, brass lamps and a banyan tree behind`,
  } satisfies ImageRef,
  location: {
    address: 'EkJap Paradise Palms, 64/16, Ambea Keni, Nerul, Goa 403114',
    map: {
      link: 'https://maps.app.goo.gl/bb7Gb91oaX2TBkei6?g_st=iw',
      embed:
        'https://maps.google.com/maps?q=Ekjap+Paradise+Palms,+EKJAP+PARADISE+PALMS,+64/16,+AMBEA+KENI,+Nerul,+Goa+403114&output=embed',
      label: 'Open in Google Maps',
      title: `Map showing the location of ${projects.goa.name} in Nerul, Goa`,
    },
  },
  gallery: {
    label: `${projects.goa.name} · Already built`,
    title: 'A look *around*',
    copy: `The building, the pool, the open spaces and the rooms of ${projects.goa.name}: ${projects.goa.facts[0]} in Goa.`,
    /** In order: the building, the pool, the open spaces, then the rooms and the rest */
    photos: [
      {
        src: 'goa/goa-02-facade-night.jpg',
        alt: `The front of ${projects.goa.name} at night: a five-storey building with lit balconies, red balustrades and a covered ground-floor lounge with orange chairs and statues`,
        caption: 'The building at night',
      },
      {
        src: 'goa/goa-03-pool.jpg',
        alt: 'A small swimming pool with a patterned tile edge and steel ladder, lit from above a wall carrying the words "Dream a home in the lap of Nature… Leave the rest to us"',
        caption: 'The pool',
      },
      {
        src: 'goa/goa-04-terrace-gazebo.jpg',
        alt: 'A rooftop terrace in sunshine with a timber gazebo, wicker dining sets, potted palms and a view over green treetops',
        caption: 'Terrace and gazebo',
      },
      {
        src: 'goa/goa-05-terrace-view.jpg',
        alt: 'A tiled open terrace with a rust-coloured steel railing, looking out over a canopy of green trees under a cloudy sky',
        caption: 'Open terrace, looking out',
      },
      {
        src: 'goa/goa-06-banyan-gazebo.jpg',
        alt: 'A timber gazebo with cane chairs under a large banyan tree wrapped in blue and white lights, at night',
        caption: 'Gazebo under the banyan tree',
      },
      {
        src: 'goa/goa-07-living-room.jpg',
        alt: 'A living area with a wall-mounted television, a cream recliner and round side tables, with the bedroom visible beyond',
        caption: 'Living room',
      },
      {
        src: 'goa/goa-08-living-dining.jpg',
        alt: 'An open living and dining room with a timber dining table, a grey sofa, red chairs and a carved timber door',
        caption: 'Living and dining',
      },
      {
        src: 'goa/goa-09-balcony.jpg',
        alt: 'A balcony at sunset with wicker armchairs and a hanging egg chair, looking over trees',
        caption: 'Balcony',
      },
      {
        src: 'goa/goa-10-bathroom.jpg',
        alt: 'A bathroom with marble-look tiles in a geometric pattern, a brass-framed mirror and a timber vanity with a basin',
        caption: 'Bathroom',
      },
      {
        src: 'goa/goa-11-lobby.jpg',
        alt: 'A glass-fronted lobby with two sofas, a coffee table, a lift and a Ganesha statue',
        caption: 'Lobby',
      },
      {
        src: 'goa/goa-12-games-room.jpg',
        alt: 'A games room with a table tennis table, a pool table and gym equipment behind glass',
        caption: 'Games room',
      },
    ] satisfies ImageRef[],
  },
  /** The enquiry section on the Goa page: its own heading and background photograph */
  enquire: {
    title: 'Come and see it *in Goa*',
    background: {
      src: 'goa/goa-13-sunset-coast.jpg',
      alt: 'Coconut palms leaning over a rocky shore at sunset, with the sea glowing gold below',
      position: 'center 45%',
    } satisfies ImageRef,
  },
  ask: `Ask about ${projects.goa.name}`,
  back: { label: 'Back to Kasauli', href: '#top' },
} as const
