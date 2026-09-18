import { useLayoutEffect, useRef } from 'react'
import { chapters } from '../content'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import { CodeLayers, ItConstellation, SaasFrame } from './SceneVisuals'

function SceneCopy({
  kicker,
  title,
  body,
  align = 'left',
}: {
  kicker: string
  title: string
  body: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-[22ch] text-center' : 'max-w-[18ch] md:max-w-[16ch]'}>
      <p className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--story-muted)] md:text-[12px]">
        {kicker}
      </p>
      <h2 className="mt-4 font-serif text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[0.96] tracking-[-0.03em]">
        {title}
      </h2>
      <p
        className={`mt-6 max-w-[44ch] text-[15px] leading-relaxed text-[color:var(--story-muted)] md:text-[17px] ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {body}
      </p>
    </div>
  )
}

function StaticChapters() {
  return (
    <div className="bg-ink text-paper">
      {chapters.map((chapter) => (
        <section
          key={chapter.id}
          className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center gap-10 px-5 py-24 md:flex-row md:items-center md:justify-between md:px-10"
        >
          {chapter.id === 'arrive' ? (
            <div className="mx-auto text-center">
              <p className="font-serif text-[clamp(3.4rem,12vw,8rem)] leading-none tracking-[-0.045em]">
                {chapter.kicker}
              </p>
              <div className="mx-auto mt-8 h-px w-24 bg-paper/20" />
              <p className="mx-auto mt-8 max-w-[22ch] font-serif text-[clamp(1.5rem,3.4vw,2.35rem)] leading-[1.15]">
                {chapter.title}
              </p>
              <p className="mx-auto mt-5 max-w-[40ch] text-[15px] leading-relaxed text-mute">
                {chapter.body}
              </p>
            </div>
          ) : (
            <SceneCopy
              {...chapter}
              align={chapter.id === 'strain' ? 'center' : 'left'}
            />
          )}
          {chapter.id === 'it' ? <ItConstellation /> : null}
          {chapter.id === 'code' ? <CodeLayers /> : null}
          {chapter.id === 'saas' ? <SaasFrame /> : null}
        </section>
      ))}
    </div>
  )
}

export function ScrollStory() {
  const rootRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const root = rootRef.current
    const pin = pinRef.current
    if (!root || !pin) return

    const ctx = gsap.context(() => {
      const progress = root.querySelector<HTMLElement>('.story-progress')
      const itNodes = root.querySelectorAll('.it-node')
      const itEdges = root.querySelectorAll('.it-edge')
      const codeLayers = root.querySelectorAll('.code-layer')
      const saasRows = root.querySelectorAll('.saas-row')

      gsap.set('.scene-strain, .scene-it, .scene-code, .scene-saas', {
        autoAlpha: 0,
      })
      gsap.set(itNodes, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(codeLayers, { autoAlpha: 0, x: 28 })
      gsap.set(saasRows, { autoAlpha: 0, y: 16 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: '+=620%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      if (progress) {
        tl.fromTo(
          progress,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', duration: 8.4 },
          0,
        )
      }

      tl.fromTo(
        '.hero-word',
        { autoAlpha: 0, y: 28, scale: 1.035 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.05, ease: 'power3.out' },
        0,
      )
      tl.fromTo(
        '.hero-rule',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power2.out' },
        0.25,
      )
      tl.fromTo(
        '.hero-line',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        0.4,
      )
      tl.fromTo(
        '.hero-hint',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        0.7,
      )

      tl.to('.scene-arrive', { autoAlpha: 0, y: -36, duration: 0.7 }, 1.45)
      tl.fromTo(
        '.scene-strain',
        { autoAlpha: 0, y: 42 },
        { autoAlpha: 1, y: 0, duration: 0.75 },
        1.58,
      )

      tl.to('.scene-strain', { autoAlpha: 0, y: -36, duration: 0.7 }, 2.85)
      tl.fromTo(
        '.scene-it',
        { autoAlpha: 0, y: 42 },
        { autoAlpha: 1, y: 0, duration: 0.75 },
        2.98,
      )
      tl.to(pin, { '--story-bg': '#11161c', duration: 0.85 }, 2.85)
      tl.to(itNodes, { scale: 1, duration: 0.45, stagger: 0.07, ease: 'back.out(1.6)' }, 3.15)
      tl.to(itEdges, { strokeDashoffset: 0, duration: 0.95, stagger: 0.1 }, 3.25)

      tl.to('.scene-it', { autoAlpha: 0, y: -36, duration: 0.7 }, 4.55)
      tl.fromTo(
        '.scene-code',
        { autoAlpha: 0, y: 42 },
        { autoAlpha: 1, y: 0, duration: 0.75 },
        4.68,
      )
      tl.to(pin, { '--story-bg': '#14110e', duration: 0.85 }, 4.55)
      tl.to(codeLayers, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.11 }, 4.85)

      tl.to('.scene-code', { autoAlpha: 0, y: -36, duration: 0.7 }, 6.15)
      tl.fromTo(
        '.scene-saas',
        { autoAlpha: 0, y: 42 },
        { autoAlpha: 1, y: 0, duration: 0.75 },
        6.28,
      )
      tl.to(pin, { '--story-bg': '#1a1814', duration: 0.85 }, 6.15)
      tl.to(saasRows, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.12 }, 6.45)
    }, root)

    const refresh = () => {
      void document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }
    refresh()

    return () => ctx.revert()
  }, [])

  if (typeof window !== 'undefined' && prefersReducedMotion()) {
    return <StaticChapters />
  }

  const arrive = chapters[0]
  const strain = chapters[1]
  const it = chapters[2]
  const code = chapters[3]
  const saas = chapters[4]

  return (
    <div ref={rootRef} id="top">
      <div
        ref={pinRef}
        className="story-pin relative h-svh overflow-hidden"
      >
        <div className="story-progress pointer-events-none absolute inset-x-0 top-0 z-20 h-px origin-left bg-prime" />

        <section className="scene scene-arrive absolute inset-0 flex flex-col items-center justify-center px-5">
          <p className="hero-word font-serif text-[clamp(3.4rem,12vw,9.2rem)] leading-none tracking-[-0.045em]">
            {arrive.kicker}
          </p>
          <div className="hero-rule hairline mt-8 h-px w-24 origin-center" />
          <p className="hero-line mt-8 max-w-[22ch] text-center font-serif text-[clamp(1.5rem,3.4vw,2.35rem)] leading-[1.15] tracking-[-0.02em]">
            {arrive.title}
          </p>
          <p className="hero-line mt-5 max-w-[40ch] text-center text-[14px] leading-relaxed text-[color:var(--story-muted)] md:text-[16px]">
            {arrive.body}
          </p>
          <p className="hero-hint absolute bottom-8 text-[11px] tracking-[0.28em] uppercase text-[color:var(--story-muted)]">
            Scroll
          </p>
        </section>

        <section className="scene scene-strain absolute inset-0 flex items-center justify-center px-5 opacity-0">
          <SceneCopy {...strain} align="center" />
        </section>

        <section className="scene scene-it absolute inset-0 flex items-center px-5 opacity-0 md:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
            <SceneCopy {...it} />
            <ItConstellation />
          </div>
        </section>

        <section className="scene scene-code absolute inset-0 flex items-center px-5 opacity-0 md:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
            <SceneCopy {...code} />
            <CodeLayers />
          </div>
        </section>

        <section className="scene scene-saas absolute inset-0 flex items-center px-5 opacity-0 md:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
            <SceneCopy {...saas} />
            <SaasFrame />
          </div>
        </section>
      </div>
    </div>
  )
}
