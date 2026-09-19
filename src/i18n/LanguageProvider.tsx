import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { copies, type Copy } from '../content'
import {
  detectLocale,
  localeMeta,
  STORAGE_KEY,
  type Locale,
} from './locales'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  copy: Copy
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function applyDocumentLanguage(locale: Locale, copy: Copy) {
  const meta = localeMeta[locale]
  document.documentElement.lang = meta.htmlLang
  document.title = copy.seo.title

  const description = document.querySelector('meta[name="description"]')
  description?.setAttribute('content', copy.seo.description)

  document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.seo.title)
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute('content', copy.seo.description)
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', meta.ogLocale)
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', copy.seo.title)
  document
    .querySelector('meta[name="twitter:description"]')
    ?.setAttribute('content', copy.seo.description)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  useEffect(() => {
    applyDocumentLanguage(locale, copies[locale])
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: (next) => {
        window.localStorage.setItem(STORAGE_KEY, next)
        setLocaleState(next)
      },
      copy: copies[locale],
    }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
