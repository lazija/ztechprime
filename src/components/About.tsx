import { useLanguage } from '../i18n/LanguageProvider'
import { SectionHeading } from './SectionHeading'

export function About() {
  const { about } = useLanguage().copy

  return (
    <section id={about.id} className="scroll-mt-28 bg-[#eef3fa] px-5 py-20 md:scroll-mt-24 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <SectionHeading label={about.label} title={about.title} />
          <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.7] text-mute">{about.body}</p>
          <p className="mt-8 max-w-[46ch] border-l-2 border-prime pl-4 text-[15px] leading-[1.65] text-navy">
            {about.credibility}
          </p>
        </div>
        <ul className="space-y-4">
          {about.benefits.map((item) => (
            <li
              key={item}
              className="flex gap-3 border-b border-navy/10 pb-4 text-[16px] leading-[1.5] text-ink"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prime" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
