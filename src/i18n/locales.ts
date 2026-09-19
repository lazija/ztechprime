export const locales = ['en', 'bs', 'sr'] as const

export type Locale = (typeof locales)[number]

export const localeMeta: Record<
  Locale,
  { label: string; name: string; htmlLang: string; ogLocale: string }
> = {
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  bs: { label: 'BS', name: 'Bosanski', htmlLang: 'bs', ogLocale: 'bs_BA' },
  sr: { label: 'СР', name: 'Српски', htmlLang: 'sr-Cyrl', ogLocale: 'sr_RS' },
}

export const STORAGE_KEY = 'ztechprime-lang'

export function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'bs' || value === 'sr'
}

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (isLocale(saved)) return saved

  const language = window.navigator.language.toLowerCase()
  if (language.startsWith('sr')) return 'sr'
  if (language.startsWith('bs') || language.startsWith('hr')) return 'bs'
  return 'en'
}
