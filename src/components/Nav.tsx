import { POWERED_BY } from '../assets/brand'
import { BrandMark } from './BrandMark'

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 text-ink">
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <a
          href="#top"
          className="pointer-events-auto flex items-center gap-2.5"
          aria-label="ztech prime"
        >
          <BrandMark className="h-8 w-10 object-contain" />
          <span className="leading-tight">
            <span className="block text-[17px] font-semibold tracking-tight">
              ztech prime
            </span>
            <span className="block text-[11px] tracking-[0.02em] text-mute">
              {POWERED_BY}
            </span>
          </span>
        </a>
        <a
          href="#conversation"
          className="pointer-events-auto text-[13px] tracking-wide text-ink/70 transition-opacity hover:text-ink"
        >
          Start a conversation
        </a>
      </div>
    </header>
  )
}
