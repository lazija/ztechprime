import { useLayoutEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageProvider'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { ScrollLogo, type ScrollLogoHandle } from './ScrollLogo'

export function Hero() {
  const { copy } = useLanguage()
  const { hero } = copy
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<ScrollLogoHandle>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const pin = pinRef.current
    if (!root || !pin) return

    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const state = { value: 0 }
      gsap.fromTo(
        '.hero-mark-stage',
        { y: -36, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' },
      )
      gsap.from('.hero-copy > *', {
        y: 18,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.15,
        ease: 'power2.out',
      })

      gsap.to(state, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: '+=95%',
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => logoRef.current?.setProgress(self.progress),
        },
      })
    }, root)

    void document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="top" className="bg-paper">
      <div ref={pinRef} className="relative flex min-h-svh flex-col justify-start px-5 pt-36 pb-12 md:justify-center md:px-10 md:pt-28 md:pb-16">
        <div className="hero-glow" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="hero-mark-stage shrink-0">
            <div className="hero-mark-glow" aria-hidden="true" />
            <ScrollLogo ref={logoRef} />
          </div>

          <div className="hero-copy max-w-xl text-center lg:text-left">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-prime uppercase md:tracking-[0.2em]">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.65rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-navy">
              {hero.title}
            </h1>
            <p className="mt-5 text-[16px] leading-[1.7] text-mute md:text-[17px]">{hero.body}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-center">
              <a href={hero.primary.href} className="btn-primary">
                {hero.primary.label}
              </a>
              <a href={hero.secondary.href} className="btn-secondary">
                {hero.secondary.label}
              </a>
            </div>
            <p className="mt-6 text-[13px] tracking-[0.04em] text-silver">{hero.trust}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
