import { contact, enquire } from '@/data/site'
import type { EnquiryValues } from './enquirySchema'

/** Deep link to WhatsApp with the chosen cottage or project in the message (EKJAP_PLAN.md §9.12). */
export function whatsappUrl(topic?: string) {
  const text = enquire.whatsapp.message.replace('{topic}', topic ?? enquire.whatsapp.generalTopic)
  return `https://wa.me/${contact.whatsapp.value}?text=${encodeURIComponent(text)}`
}

const { request, fields } = enquire

/** The enquiry form's answers as a short message, one detail per line. */
export function enquiryMessage(values: EnquiryValues, project: string, interest?: string) {
  const visit =
    values.visit === 'date'
      ? request.visitOn.replace(
          '{date}',
          new Date(`${values.date}T00:00:00`).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
        )
      : (fields.visit.options.find((option) => option.value === values.visit)?.label ?? '')

  return [
    request.intro.replace('{project}', project),
    '',
    `${request.name}: ${values.name.trim()}`,
    `${request.mobile}: ${fields.mobile.prefix} ${values.mobile}`,
    `${request.visit}: ${visit}`,
    interest ? `${request.interest}: ${interest}` : null,
    values.brochure ? request.brochure : null,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

/** WhatsApp chat with the enquiry already typed in, to the site's number. */
export function enquiryWhatsappUrl(message: string) {
  return `https://wa.me/${contact.whatsapp.value}?text=${encodeURIComponent(message)}`
}

/** An email with the same message, or null while the site has no confirmed email address. */
export function enquiryMailtoUrl(message: string) {
  if (contact.email.sample) return null
  const subject = encodeURIComponent(request.emailSubject)
  return `mailto:${contact.email.value}?subject=${subject}&body=${encodeURIComponent(message)}`
}
