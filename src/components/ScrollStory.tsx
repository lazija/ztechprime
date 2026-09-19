import { useLayoutEffect, useRef } from 'react'
import { chapters } from '../content'

const practices = ['IT', 'Programming', 'SaaS consultation'] as const

function HeroOpening({ chapter }: { chapter: (typeof chapters)[number] }) {
  return (
    <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-1 text-center">
      <p className="hero-eyebrow text-[11px] tracking-[0.22em] uppercase text-prime md:text-[12px]">
        Work with us
      </p>
      <p className="hero-word mt-5 font-serif text-[clamp(3rem,9vw,7.2rem)] leading-[0.92] tracking-[-0.035em]">
        {chapter.kicker}
      </p>
      <h1 className="hero-line mt-8 max-w-[18em] font-serif text-[clamp(1.65rem,3.6vw,2.7rem)] leading-[1.22] tracking-[-0.015em]">
        {chapter.title}
      </h1>
      <p className="hero-line mt-6 max-w-[46ch] text-[16px] leading-[1.7] tracking-[0.01em] text-[color:var(--story-muted)] md:text-[17px]">
        {chapter.body}
      </p>
      <ul className="hero-practices mt-9 flex flex-wrap items-center justify-center gap-2.5">
        {practices.map((practice) => (
          <li
            key={practice}
            className="border border-current/20 px-3.5 py-1.5 text-[11px] tracking-[0.14em] uppercase text-[color:var(--story-fg,#f3efe6)]/80"
          >
            {practice}
          </li>
        ))}
      </ul>
      <a
        href="#conversation"
        className="hero-cta mt-10 bg-paper px-6 py-3 text-[13px] tracking-[0.14em] text-ink uppercase transition-opacity hover:opacity-80"
      >
        Start a conversation
      </a>
    </div>
  )
}
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
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-lg'}>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--story-muted)] md:text-[12px]">
        {kicker}
      </p>
      <h2 className="mt-5 max-w-[16em] font-serif text-[clamp(2.2rem,5vw,4.1rem)] leading-[1.12] tracking-[-0.02em]">
        {title}
      </h2>
      <p
        className={`mt-6 max-w-[46ch] text-[16px] leading-[1.65] tracking-[0.01em] text-[color:var(--story-muted)] md:text-[17px] ${
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
            <HeroOpening chapter={chapter} />
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
      itEdges.forEach((edge) => {
        const path = edge as SVGPathElement
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
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
        { scale: 1 },
        { scale: 0.98, duration: 1.2, ease: 'none' },
        0,
      )

      tl.to('.scene-arrive', { autoAlpha: 0, y: -36, duration: 0.7 }, 1.35)
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

        <section className="scene scene-arrive absolute inset-0 flex flex-col items-center justify-center px-5 pt-24 pb-16">
          <div className="hero-glow" />
          <HeroOpening chapter={arrive} />
          <p className="hero-hint absolute bottom-7 text-[11px] tracking-[0.28em] uppercase text-[color:var(--story-muted)]">
            Scroll
          </p>
        </section>

        <section className="scene scene-strain absolute inset-0 flex items-center justify-center px-5 pt-20 opacity-0">
          <SceneCopy {...strain} align="center" />
        </section>

        <section className="scene scene-it absolute inset-0 flex items-center px-5 pt-20 opacity-0 md:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
            <SceneCopy {...it} />
            <ItConstellation />
          </div>
        </section>

        <section className="scene scene-code absolute inset-0 flex items-center px-5 pt-20 opacity-0 md:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
            <SceneCopy {...code} />
            <CodeLayers />
          </div>
        </section>

        <section className="scene scene-saas absolute inset-0 flex items-center px-5 pt-20 opacity-0 md:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
            <SceneCopy {...saas} />
            <SaasFrame />
          </div>
        </section>
      </div>
    </div>
  )
}
