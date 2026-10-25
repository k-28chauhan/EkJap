import { contact, enquire } from '@/data/site'

/** Deep link to WhatsApp with the chosen cottage or project in the message (EKJAP_PLAN.md §9.12). */
export function whatsappUrl(topic?: string) {
  const text = enquire.whatsapp.message.replace('{topic}', topic ?? enquire.whatsapp.generalTopic)
  return `https://wa.me/${contact.whatsapp.value}?text=${encodeURIComponent(text)}`
}
