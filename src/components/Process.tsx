import { useLanguage } from '../i18n/LanguageProvider'
import { SectionHeading } from './SectionHeading'

export function Process() {
  const { process } = useLanguage().copy

  return (
    <section id={process.id} className="scroll-mt-28 bg-paper px-5 py-20 md:scroll-mt-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={process.label} title={process.title} />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {process.steps.map((step) => (
            <li key={step.n}>
              <p className="text-[13px] font-semibold tracking-[0.18em] text-prime">{step.n}</p>
              <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.02em] text-navy">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.7] text-mute">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-[46ch] text-[15px] leading-[1.65] text-ink">{process.note}</p>
      </div>
    </section>
  )
}
