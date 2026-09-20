import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { prefersReducedMotion } from './motion'

type RevealOptions = {
  selector: string
  y?: number
  duration?: number
  stagger?: number
  start?: string
}

export function useGsapReveal(
  rootRef: RefObject<HTMLElement | null>,
  { selector, y = 22, duration = 0.7, stagger = 0.08, start = 'top 82%' }: RevealOptions,
) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll(selector)
      if (!items.length) return

      gsap.from(items, {
        y,
        autoAlpha: 0,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root,
          start,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [rootRef, selector, y, duration, stagger, start])
}
