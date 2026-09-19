import { locales, localeMeta } from '../i18n/locales'
import { useLanguage } from '../i18n/LanguageProvider'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale, copy } = useLanguage()

  return (
    <div
      className={`lang-toggle inline-flex ${className}`.trim()}
      role="group"
      aria-label={copy.aria.language}
    >
      {locales.map((id) => {
        const active = locale === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            aria-label={localeMeta[id].name}
            onClick={() => setLocale(id)}
          >
            {localeMeta[id].label}
          </button>
        )
      })}
    </div>
  )
}
