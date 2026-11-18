import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FadeUp } from '@/components/motion/FadeUp'
import { Button } from '@/components/ui/Button'
import { Img } from '@/components/ui/Img'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { contact, enquire } from '@/data/site'
import type { ImageRef } from '@/data/types'
import { cn } from '@/lib/cn'
import { useEnquiryPrefill } from '@/lib/enquiryStore'
import { enquirySchema, type EnquiryValues } from '@/lib/enquirySchema'
import { enquiryMailtoUrl, enquiryMessage, enquiryWhatsappUrl, whatsappUrl } from '@/lib/whatsapp'
import { zodResolver } from '@/lib/zodResolver'
import { EnquiryForm } from './EnquiryForm'
import { SuccessCard } from './SuccessCard'

const defaults: EnquiryValues = {
  name: '',
  mobile: '',
  visit: 'this-weekend',
  date: '',
  brochure: true,
}

/** What the visitor sees after sending: the WhatsApp chat (and email) with their details typed in */
interface Sent {
  whatsappHref: string
  emailHref: string | null
}

export interface EnquireLocation {
  address: string
  /** An extra line under the address, e.g. when site visits happen */
  note?: string
  map: { link: string; embed: string; label: string; title: string }
}

/** A map with its link underneath. */
function LocationMap({ map, className }: { map: EnquireLocation['map']; className?: string }) {
  return (
    <div className={cn('w-full', className)}>
      <iframe
        key={map.embed}
        src={map.embed}
        title={map.title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[16/10] w-full rounded-card border border-cream/20 bg-pine-950/40"
      />
      <a
        href={map.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block label text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream"
      >
        {map.label} ↗
      </a>
    </div>
  )
}

/** The heading and photograph behind the section; the Kasauli ones are the default */
export interface EnquireLook {
  title: string
  background: ImageRef
}

/** Each page passes its own project's address, map and look: Kasauli's on the Kasauli page, Goa's on the Goa page. */
export function Enquire({
  project,
  location,
  extraLocation,
  look = enquire,
}: {
  /** The project of the page, named in the message the form sends */
  project: string
  location: EnquireLocation
  /** A second place, set under the form so its map sits beside the first */
  extraLocation?: EnquireLocation
  look?: EnquireLook
}) {
  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: 'onTouched',
    defaultValues: defaults,
  })
  const prefill = useEnquiryPrefill()
  // The outcome belongs to the pre-fill it was made under, so a new "Ask about" click shows a fresh form
  const [outcome, setOutcome] = useState<{ sent: Sent | null; prefillId: number }>({
    sent: null,
    prefillId: 0,
  })
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle')

  const sent = outcome.prefillId === prefill.id ? outcome.sent : null

  // There is no server: the details go to the site's WhatsApp number as a message. The chat is
  // opened straight away; the success card keeps a button in case the browser blocked it.
  const onSubmit = form.handleSubmit((values) => {
    const message = enquiryMessage(values, project, prefill.topic)
    const whatsappHref = enquiryWhatsappUrl(message)
    window.open(whatsappHref, '_blank', 'noopener,noreferrer')
    form.reset(defaults)
    setOutcome({
      sent: { whatsappHref, emailHref: enquiryMailtoUrl(message) },
      prefillId: prefill.id,
    })
  })

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(contact.phone.value)
      setCopied('done')
    } catch {
      setCopied('failed')
    }
    setTimeout(() => setCopied('idle'), 2200)
  }

  return (
    <Section id="enquire" theme="dusk" local labelledBy="enquire-title" className="overflow-hidden">
      <Img
        image={look.background}
        sizes="100vw"
        position={look.background.position ?? 'center 100%'}
        className="absolute inset-0 h-full"
      />
      {/* Top and bottom melt into the neighbouring sections; the left scrim keeps the copy legible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-dusk-800 via-dusk-800/20 to-dusk-800"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-dusk-800/85 via-dusk-800/40 to-dusk-800/10"
      />

      <div className="relative wrap grid gap-14 md:grid-cols-12 md:items-stretch md:gap-x-12">
        <div className="flex flex-col gap-10 md:col-span-6">
          <SectionHeader id="enquire-title" label={enquire.label} title={look.title} />

          <div className="flex flex-col items-start gap-6 md:flex-1">
            <Button
              href={whatsappUrl(
                prefill.topic ? enquire.whatsapp.topic.replace('{what}', prefill.topic) : undefined,
              )}
              external
              className="bg-[#25D366] text-pine-950 hover:bg-[#1fb957]"
            >
              {enquire.whatsapp.label}
            </Button>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href={`tel:${contact.phone.value.replace(/\s/g, '')}`} className="text-cream">
                {contact.phone.value}
              </a>
              <button
                type="button"
                onClick={copyNumber}
                className="rounded-full border border-cream/30 px-3 py-1.5 label text-muted transition-colors hover:border-cream/60 hover:text-cream"
              >
                {copied === 'done'
                  ? enquire.whatsapp.copied
                  : copied === 'failed'
                    ? enquire.whatsapp.copyFailed
                    : enquire.whatsapp.copyLabel}
              </button>
              <span className="sr-only" role="status">
                {copied === 'done' ? enquire.whatsapp.copied : ''}
              </span>
            </div>

            <ul className="space-y-1.5 text-muted">
              <li>{location.address}</li>
              {location.note && <li>{location.note}</li>}
            </ul>

            <LocationMap map={location.map} className="md:mt-auto" />
          </div>
        </div>

        <div className="flex flex-col gap-10 md:col-span-6">
          <FadeUp>
            {sent ? (
              <SuccessCard whatsappHref={sent.whatsappHref} emailHref={sent.emailHref} />
            ) : (
              <EnquiryForm form={form} onSubmit={onSubmit} />
            )}
          </FadeUp>

          {extraLocation && (
            <div className="flex flex-col items-start gap-6">
              <p className="text-muted">{extraLocation.address}</p>
              <LocationMap map={extraLocation.map} />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
