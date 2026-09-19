import { BrandMark } from './BrandMark'
import { LanguageToggle } from './LanguageToggle'
import { PoweredBy } from './PoweredBy'
import { useLanguage } from '../i18n/LanguageProvider'

export function Nav() {
  const { copy } = useLanguage()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-navy/10 bg-paper/95 text-ink backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-10 md:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label={copy.aria.brand}>
          <BrandMark className="h-8 w-10 shrink-0 object-contain" />
          <span className="leading-tight">
            <span className="block text-[16px] font-semibold tracking-tight md:text-[17px]">
              ztech prime
            </span>
            <PoweredBy />
          </span>
        </a>

        <div className="flex items-center gap-3 md:gap-5">
          <nav aria-label={copy.aria.primary} className="hidden items-center gap-5 text-[13px] text-ink/75 md:flex">
            {copy.nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
          <a href="#contact" className="btn-primary shrink-0 !px-3.5 !py-2 text-[11px] md:!px-4 md:text-[12px]">
            {copy.headerCta}
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-navy/10 px-5 py-2 md:hidden">
        <nav
          aria-label={copy.aria.sections}
          className="flex min-w-0 gap-4 overflow-x-auto text-[12px] text-ink/70"
        >
          {copy.nav.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <LanguageToggle />
      </div>
    </header>
  )
}
