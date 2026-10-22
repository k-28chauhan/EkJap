/**
 * FAQ (EKJAP_PLAN.md §9.11). The plan lists the questions but says the answers
 * come from the client. The answers below are neutral drafts, all sample: true,
 * and make no claim the client has not confirmed. Feeds the FAQPage JSON-LD too.
 */

export interface FaqItem {
  id: string
  question: string
  answer: string
  sample: true
}

export const faqs: FaqItem[] = [
  {
    id: 'rera',
    question: 'Is the project RERA registered?',
    answer:
      'The registration number is shown in the builder section and the footer once it is issued and confirmed.',
    sample: true,
  },
  {
    id: 'possession',
    question: 'When is possession?',
    answer:
      'The timeline above shows the current stage and the planned handover dates. Dates are indicative until confirmed.',
    sample: true,
  },
  {
    id: 'rental',
    question: 'Can I rent my cottage out when I’m not there?',
    answer: 'Optional rental management is planned. Terms will be shared during your site visit.',
    sample: true,
  },
  {
    id: 'services',
    question: 'Water, power backup and road access in winter?',
    answer:
      'Details of water supply, power backup and winter road access will be confirmed with the builder.',
    sample: true,
  },
  {
    id: 'snow',
    question: 'Does it snow at the site?',
    answer:
      'To be confirmed from local records for the exact site. We will not describe conditions we have not verified.',
    sample: true,
  },
  {
    id: 'distance',
    question: 'How far from Chandigarh and from Kasauli Mall Road?',
    answer:
      'About one hour forty-five minutes from Chandigarh and a short drive from Mall Road. Exact distances to be confirmed.',
    sample: true,
  },
  {
    id: 'payment',
    question: 'Payment plans and home loans?',
    answer: 'Payment plans and loan options will be shared on request.',
    sample: true,
  },
  {
    id: 'customise',
    question: 'Can I customise the interiors?',
    answer: 'The extent of customisation will be confirmed by the builder.',
    sample: true,
  },
]
