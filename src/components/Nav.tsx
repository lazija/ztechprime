import { BrandMark } from './BrandMark'

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 text-ink">
      <div className="relative flex items-center justify-between px-5 py-4 md:px-10">
        <a
          href="#top"
          className="pointer-events-auto flex items-center gap-2.5"
          aria-label="Ztechprime, ztech Solutions"
        >
          <BrandMark className="h-8 w-10 object-contain" />
          <span className="leading-tight">
            <span className="block text-[17px] font-semibold tracking-tight">ztech</span>
            <span className="block text-[11px] tracking-[0.08em] text-mute">Ztechprime</span>
          </span>
        </a>
        <p className="pointer-events-none hidden text-[12px] tracking-[0.04em] text-mute md:block md:absolute md:left-1/2 md:-translate-x-1/2">
          Powered by Ztech Solution
        </p>
        <a
          href="#conversation"
          className="pointer-events-auto text-[13px] tracking-wide text-ink/70 transition-opacity hover:text-ink"
        >
          Start a conversation
        </a>
      </div>
      <p className="px-5 pb-3 text-[11px] tracking-[0.04em] text-mute md:hidden">
        Powered by Ztech Solution
      </p>
    </header>
  )
}
