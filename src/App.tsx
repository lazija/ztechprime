import { useEffect } from 'react'
import Lenis from 'lenis'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Expertise } from './components/Expertise'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { SiteFooter } from './components/SiteFooter'
import { gsap, ScrollTrigger } from './lib/gsap'
import { prefersReducedMotion } from './lib/motion'

export default function App() {
  useEffect(() => {
    const reduced = prefersReducedMotion()
    const lenis = reduced
      ? null
      : new Lenis({
          duration: 1.05,
          wheelMultiplier: 0.9,
        })

    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis?.on('scroll', onScroll)

    const ticker = (time: number) => {
      lenis?.raf(time * 1000)
    }
    if (lenis) {
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)
    }

    const scrollToHash = (hash: string, immediate = false) => {
      const target = document.querySelector(hash)
      if (!(target instanceof HTMLElement)) return
      ScrollTrigger.refresh()
      if (lenis) {
        lenis.scrollTo(target, { offset: -20, immediate, duration: immediate ? 0 : 0.95 })
        return
      }
      target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' })
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]')
      if (!(link instanceof HTMLAnchorElement)) return
      if (link.target === '_blank') return
      const hash = link.getAttribute('href')
      if (!hash || !hash.startsWith('#') || hash === '#') return
      event.preventDefault()
      history.pushState(null, '', hash)
      scrollToHash(hash)
    }

    document.addEventListener('click', onClick)

    let hashTimer = 0
    if (window.location.hash) {
      void document.fonts.ready.then(() => {
        hashTimer = window.setTimeout(() => {
          ScrollTrigger.refresh()
          scrollToHash(window.location.hash, true)
        }, 240)
      })
    }

    return () => {
      if (lenis) {
        gsap.ticker.remove(ticker)
        lenis.off('scroll', onScroll)
        lenis.destroy()
      }
      window.clearTimeout(hashTimer)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div className="min-h-svh bg-paper">
      <Nav />
      <main>
        <Hero />
        <Expertise />
        <About />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
