import type { EnquiryValues } from './enquirySchema'

/**
 * The one place enquiries leave the page (EKJAP_PLAN.md §9.12). The backend is not
 * chosen yet (Formspree, Web3Forms or a Google Apps Script all take a JSON POST):
 * set VITE_ENQUIRY_ENDPOINT to its URL. In development, with no endpoint, it
 * pretends to succeed so the form can be worked on. In a production build with no
 * endpoint it throws, so the form shows its failure message and the WhatsApp
 * fallback, rather than silently losing a lead.
 */
export async function submitEnquiry(values: EnquiryValues): Promise<void> {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined

  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.info('[enquiry] VITE_ENQUIRY_ENDPOINT is not set, so this was not sent:', values)
      await new Promise((resolve) => setTimeout(resolve, 700))
      return
    }
    throw new Error('Enquiry endpoint is not configured')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  })
  if (!response.ok) throw new Error(`Enquiry failed: ${response.status}`)
}
