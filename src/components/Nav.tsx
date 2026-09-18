import { BrandMark } from './BrandMark'

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 mix-blend-difference text-white">
      <div className="flex items-center justify-between px-5 py-5 md:px-10">
        <a
          href="#top"
          className="pointer-events-auto flex items-center gap-2.5"
          aria-label="Ztechprime home"
        >
          <BrandMark className="h-7 w-7" />
          <span className="text-[13px] font-medium tracking-[0.18em] uppercase">
            Ztechprime
          </span>
        </a>
        <a
          href="#conversation"
          className="pointer-events-auto text-[13px] tracking-wide text-white/80 transition-opacity hover:text-white"
        >
          Start a conversation
        </a>
      </div>
    </header>
  )
}
