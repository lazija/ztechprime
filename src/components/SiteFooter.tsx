import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_NAME,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from '../assets/brand'
import { useLanguage } from '../i18n/LanguageProvider'
import { BrandMark } from './BrandMark'
import { PoweredBy } from './PoweredBy'

export function SiteFooter() {
  const { copy } = useLanguage()

  return (
    <footer className="border-t border-navy/10 bg-paper px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <a href="#top" className="flex items-center gap-2.5 text-ink" aria-label="ztech prime">
          <BrandMark className="h-8 w-10 object-contain" />
          <span className="leading-tight">
            <span className="block text-[17px] font-semibold tracking-tight">ztech prime</span>
            <PoweredBy />
          </span>
        </a>
        <nav aria-label={copy.aria.footer} className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-mute">
          {copy.nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-[12px] tracking-wide text-mute">
          {CONTACT_NAME}
          {' · '}
          <a className="text-prime" href={CONTACT_PHONE_HREF}>
            {CONTACT_PHONE}
          </a>
          {' · '}
          <a className="text-prime" href={CONTACT_EMAIL_HREF}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </footer>
  )
}
