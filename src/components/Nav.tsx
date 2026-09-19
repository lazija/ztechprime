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

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 ${
        onClose ? 'text-ink' : 'text-paper'
      }`}
    >
      <div className="flex items-center justify-between px-5 py-5 md:px-10">
        <a
          href="#top"
          className="pointer-events-auto flex items-center gap-2.5"
          aria-label="Ztechprime, the face of Ztech Solutions"
        >
          <BrandMark className="h-7 w-7" tone={tone} />
          <span className="leading-tight">
            <span className="block text-[13px] font-medium tracking-[0.18em] uppercase">
              Ztechprime
            </span>
            <span className="block text-[10px] tracking-[0.14em] text-current/55">
              Ztech Solutions
            </span>
          </span>
        </a>
        <a
          href="#conversation"
          className={`pointer-events-auto text-[13px] tracking-wide transition-opacity hover:opacity-100 ${
            onClose ? 'text-ink/70 hover:text-ink' : 'text-paper/80 hover:text-paper'
          }`}
        >
          Start a conversation
        </a>
      </div>
    </header>
  )
}
