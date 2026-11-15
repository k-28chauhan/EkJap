import { goa } from '@/data/goa'
import { builder, contact, footer, nav } from '@/data/site'
import { useView } from '@/lib/view'
import { AnchorLink } from '../ui/AnchorLink'
import { whatsappUrl } from '@/lib/whatsapp'

/** The address and its map link follow the project being viewed, Kasauli or Goa. */
export function Footer() {
  const view = useView()
  const place =
    view === 'goa'
      ? { address: goa.location.address, map: goa.location.map }
      : { address: contact.address.value, map: contact.map }

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
            </ul>
          </div>
          <div>
            <h2 className="mb-5 label text-muted">{footer.columns.address}</h2>
            <address className="max-w-[32ch] measure not-italic">{place.address}</address>
            <a
              href={place.map.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block underline decoration-current/40 underline-offset-4 hover:decoration-current"
            >
              {place.map.label} ↗
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

        <div className="mt-14 mb-10 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between md:gap-12">
          <p
            aria-hidden
            className="mb-[0.04em] pt-[0.22em] font-display text-[clamp(3rem,11vw,11rem)] leading-[0.8] tracking-[-0.04em] text-cream select-none"
          >
            {footer.wordmark}
          </p>
          {/* The logo's navy lettering needs a light ground, so it sits on a cream card */}
          <div className="shrink-0 self-start rounded-card bg-cream p-4 md:self-auto md:p-5">
            <img
              src={builder.logo.src}
              alt={builder.logo.alt}
              width={builder.logo.width}
              height={builder.logo.height}
              loading="lazy"
              className="h-auto w-40 md:w-48"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-sm text-muted hairline-t md:flex-row md:justify-between md:gap-12">
          <p className="max-w-[70ch]">{footer.disclaimer}</p>
          <p className="shrink-0">{footer.copyright(new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  )
}
