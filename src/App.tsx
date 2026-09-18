import { useEffect } from 'react'
import Lenis from 'lenis'
import { Close, Footer } from './components/Close'
import { Nav } from './components/Nav'
import { ScrollStory } from './components/ScrollStory'
import { gsap, ScrollTrigger } from './lib/gsap'
import { prefersReducedMotion } from './lib/motion'

export default function App() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.15,
      wheelMultiplier: 0.9,
    })

    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-svh bg-ink">
      <Nav />
      <main>
        <ScrollStory />
        <Close />
      </main>
      <Footer />
    </div>
  )
}
