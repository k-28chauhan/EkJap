import { projects } from './site'
import type { ImageRef } from './types'

/**
 * The Goa project view (client brief, Oct 2026): shown only when "Goa" is chosen in
 * the nav. The client has not supplied any Goa material yet, so everything here is a
 * labelled placeholder: nothing about the Goa site is claimed. Replace this file's
 * copy and the three photo slots (assets/images/goa/) when the material arrives.
 */
export const goa = {
  metaTitle: `EkJap — ${projects.goa.name}, Goa`,
  eyebrow: `${projects.goa.facts.join(' · ')} · Goa`,
  title: projects.goa.name,
  tagline: 'Our Goa project',
  paragraph: `Photographs, plans and details of ${projects.goa.name}, our Goa project of ${projects.goa.facts[0]}, will appear here. Until then, tell us you are interested and we will share everything as soon as it is ready.`,
  ask: `Ask about ${projects.goa.name}`,
  back: { label: 'Back to Kasauli', href: '#top' },
  details: {
    label: `${projects.goa.name} · Goa`,
    title: 'Coming *soon*',
    copy: `We are preparing the page for ${projects.goa.name}: the site, the apartments, the plans and the photographs.`,
    photos: [
      { src: 'goa/goa-01.jpg', alt: 'The Goa project site', caption: 'Goa site photograph' },
      { src: 'goa/goa-02.jpg', alt: 'An apartment at the Goa project', caption: 'Goa apartment' },
      {
        src: 'goa/goa-03.jpg',
        alt: 'The surroundings of the Goa project',
        caption: 'Goa surroundings',
      },
    ] satisfies ImageRef[],
    smallPrint: 'Placeholders until the Goa project details are confirmed.',
  },
} as const
