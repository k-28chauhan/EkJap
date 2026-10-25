import { contact, footer, nav } from '@/data/site'
import { AnchorLink } from '../ui/AnchorLink'
import { whatsappUrl } from '@/lib/whatsapp'

export function Footer() {
  return (
    <footer
      data-theme="night"
      className="relative overflow-hidden bg-bg pt-24 pb-8 text-fg md:pt-36"
    >
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <h2 className="mb-5 label text-muted">{footer.columns.contact}</h2>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${contact.phone.value.replace(/\s/g, '')}`}>{contact.phone.value}</a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-5 label text-muted">{footer.columns.address}</h2>
            <address className="max-w-[32ch] measure not-italic">{contact.address.value}</address>
            <a
              href={contact.map.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block underline decoration-current/40 underline-offset-4 hover:decoration-current"
            >
              {contact.map.label} ↗
            </a>
          </div>
          <div>
            <h2 className="mb-5 label text-muted">{footer.columns.links}</h2>
            <ul className="space-y-2">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <AnchorLink href={link.href}>{link.label}</AnchorLink>
                </li>
              ))}
              <li>
                <a href={footer.privacy.href}>{footer.privacy.label}</a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-10 mb-[0.04em] pt-[0.22em] font-display text-[clamp(4.5rem,20vw,20rem)] leading-[0.8] tracking-[-0.04em] text-cream select-none"
        >
          {footer.wordmark}
        </p>

        <div className="flex flex-col gap-4 pt-6 text-sm text-muted hairline-t md:flex-row md:justify-between md:gap-12">
          <p className="max-w-[70ch]">{footer.disclaimer}</p>
          <p className="shrink-0">{footer.copyright(new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  )
}
