import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageProvider'
import { useGsapReveal } from '../lib/useGsapReveal'
import { SectionHeading } from './SectionHeading'

export function Expertise() {
  const { expertise } = useLanguage().copy
  const rootRef = useRef<HTMLElement>(null)
  useGsapReveal(rootRef, { selector: '[data-reveal]' })

  return (
    <section ref={rootRef} id={expertise.id} className="scroll-mt-28 bg-paper px-5 py-20 md:scroll-mt-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={expertise.label}
          title={expertise.title}
          intro={expertise.intro}
        />
        <div className="mt-12 grid gap-px bg-navy/10 sm:grid-cols-2">
          {expertise.services.map((service) => (
            <article key={service.title} data-reveal className="bg-paper px-6 py-8 md:px-8 md:py-10">
              <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-navy">
                {service.title}
              </h3>
              <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.7] text-mute">{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
