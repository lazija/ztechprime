import { useEffect, useState } from 'react'
import { BrandMark } from './BrandMark'

export function Nav() {
  const [tone, setTone] = useState<'paper' | 'ink'>('paper')

  useEffect(() => {
    const close = document.getElementById('conversation')
    if (!close) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const onClose = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.28)
        setTone(onClose ? 'ink' : 'paper')
      },
      { threshold: [0.2, 0.28, 0.45] },
    )

    observer.observe(close)
    return () => observer.disconnect()
  }, [])

  const onClose = tone === 'ink'
  const creditClass = onClose ? 'text-ink/50' : 'text-paper/55'

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 ${
        onClose ? 'text-ink' : 'text-paper'
      }`}
    >
      <div className="relative flex items-center justify-between px-5 py-5 md:px-10">
        <a
          href="#top"
          className="pointer-events-auto flex items-center gap-2.5"
          aria-label="Ztechprime, the face of Ztech Solutions"
        >
          <BrandMark className="h-7 w-7" tone={tone} />
          <span className="text-[13px] font-medium tracking-[0.18em] uppercase">
            Ztechprime
          </span>
        </a>
        <p
          className={`pointer-events-none hidden text-[12px] tracking-[0.04em] md:block md:absolute md:left-1/2 md:-translate-x-1/2 ${creditClass}`}
        >
          Powered by Ztech Solution
        </p>
        <a
          href="#conversation"
          className={`pointer-events-auto text-[13px] tracking-wide transition-opacity hover:opacity-100 ${
            onClose ? 'text-ink/70 hover:text-ink' : 'text-paper/80 hover:text-paper'
          }`}
        >
          Start a conversation
        </a>
      </div>
      <p className={`px-5 pb-3 text-[11px] tracking-[0.04em] md:hidden ${creditClass}`}>
        Powered by Ztech Solution
      </p>
    </header>
  )
}
