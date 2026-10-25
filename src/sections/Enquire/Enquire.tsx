import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FadeUp } from '@/components/motion/FadeUp'
import { Button } from '@/components/ui/Button'
import { Img } from '@/components/ui/Img'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { contact, enquire } from '@/data/site'
import { useEnquiryPrefill } from '@/lib/enquiryStore'
import { enquirySchema, type EnquiryValues } from '@/lib/enquirySchema'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { whatsappUrl } from '@/lib/whatsapp'
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

type Status = 'idle' | 'success' | 'error'

export function Enquire() {
  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: 'onTouched',
    defaultValues: defaults,
  })
  const prefill = useEnquiryPrefill()
  // The outcome belongs to the pre-fill it was made under, so a new "Ask about" click shows a fresh form
  const [outcome, setOutcome] = useState<{ status: Status; prefillId: number }>({
    status: 'idle',
    prefillId: 0,
  })
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle')

  const status: Status = outcome.prefillId === prefill.id ? outcome.status : 'idle'

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await submitEnquiry(values)
      form.reset(defaults)
      setOutcome({ status: 'success', prefillId: prefill.id })
    } catch {
      setOutcome({ status: 'error', prefillId: prefill.id })
    }
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
        image={enquire.background}
        sizes="100vw"
        position="center 100%"
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

      <div className="relative wrap grid gap-14 md:grid-cols-12 md:items-start md:gap-x-12">
        <div className="flex flex-col gap-10 md:col-span-6">
          <SectionHeader id="enquire-title" label={enquire.label} title={enquire.title} />

          <div className="flex flex-col items-start gap-6">
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
              <li>{contact.address.value}</li>
              <li>{contact.siteVisits.value}</li>
            </ul>

            <div className="w-full">
              <iframe
                src={contact.map.embed}
                title={contact.map.title}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/10] w-full rounded-card border border-cream/20 bg-pine-950/40"
              />
              <a
                href={contact.map.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block label text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream"
              >
                {contact.map.label} ↗
              </a>
            </div>
          </div>
        </div>

        <FadeUp className="md:col-span-6">
          {status === 'success' ? (
            <SuccessCard />
          ) : (
            <EnquiryForm form={form} onSubmit={onSubmit} failed={status === 'error'} />
          )}
        </FadeUp>
      </div>
    </Section>
  )
}
