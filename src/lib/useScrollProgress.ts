import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'
import { prefersReducedMotion } from './motion'

type ProgressOptions = {
  start?: string
  end?: string
}

export function useScrollProgress(
  triggerRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  { start = 'top top', end = 'bottom top' }: ProgressOptions = {},
) {
  useLayoutEffect(() => {
    const trigger = triggerRef.current
    if (!trigger || prefersReducedMotion()) return

    const state = { value: 0 }
    const tween = gsap.to(state, {
      value: 1,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => onProgress(self.progress),
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [triggerRef, onProgress, start, end])
}
