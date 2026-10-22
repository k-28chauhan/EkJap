import { z } from 'zod'
import { enquire } from '@/data/site'

const { fields } = enquire

/** The enquiry form's rules (EKJAP_PLAN.md §9.12). Messages come from the data file. */
export const enquirySchema = z
  .object({
    name: z.string().trim().min(2, fields.name.error),
    mobile: z.string().regex(/^\d{10}$/, fields.mobile.error),
    interest: z.enum(['unsure', 'pine', 'ridge', 'deodar']),
    visit: z.enum(['this-weekend', 'next-weekend', 'later', 'date']),
    date: z.string(),
    plot: z.string().trim(),
    brochure: z.boolean(),
  })
  .refine((values) => values.visit !== 'date' || values.date !== '', {
    path: ['date'],
    message: fields.visit.dateError,
  })

export type EnquiryValues = z.infer<typeof enquirySchema>
