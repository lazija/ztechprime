import { useState, type FormEvent } from 'react'
import { INQUIRY_EMAIL } from '../content'

export function Close() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [opened, setOpened] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedNote = note.trim()

    if (!trimmedName || !trimmedNote) {
      setError('Add your name and a short note about what is straining.')
      setOpened(false)
      return
    }

    const subject = encodeURIComponent(
      `Conversation with Ztechprime, Ztech Solutions — ${trimmedName}`,
    )
    const body = encodeURIComponent(
      `Name: ${trimmedName}\nCompany: ${company.trim() || '—'}\n\n${trimmedNote}`,
    )
    window.location.href = `mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${body}`
    setError('')
    setOpened(true)
  }

  return (
    <section
      id="conversation"
      className="min-h-svh scroll-mt-0 bg-paper px-5 pb-24 pt-28 text-ink md:px-10 md:pt-36"
    >
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div>
          <p className="text-[12px] tracking-[0.22em] uppercase text-ink/45">
            Ztechprime · Ztech Solutions
          </p>
          <h2 className="mt-5 max-w-[14ch] font-serif text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] tracking-[-0.03em]">
            Tell us where the system is straining.
          </h2>
          <p className="mt-8 max-w-[42ch] text-[17px] leading-relaxed text-ink/70">
            A short note is enough. Ztechprime is how you reach Ztech Solutions.
            We read for the sequence — infrastructure, product, and the SaaS
            shape — and reply with a clear next hour, not a deck.
          </p>
          <p className="mt-8 text-[13px] tracking-[0.04em] text-ink/45">
            Powered by Ztech Solution
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-ink/45">
              Name
            </span>
            <input
              className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-[16px] outline-none transition-colors focus:border-ink"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              name="name"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-ink/45">
              Company
            </span>
            <input
              className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-[16px] outline-none transition-colors focus:border-ink"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              autoComplete="organization"
              name="company"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-ink/45">
              What is straining
            </span>
            <textarea
              className="mt-2 min-h-28 w-full resize-y border-b border-ink/20 bg-transparent py-3 text-[16px] outline-none transition-colors focus:border-ink"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              name="note"
            />
          </label>

          {error ? (
            <p className="text-[14px] text-[#8a3a2a]" role="alert">
              {error}
            </p>
          ) : null}

          {opened ? (
            <p className="text-[14px] text-ink/65">
              Your mail client should open. If it does not, write{' '}
              <a className="underline underline-offset-4" href={`mailto:${INQUIRY_EMAIL}`}>
                {INQUIRY_EMAIL}
              </a>
              .
            </p>
          ) : (
            <p className="text-[14px] text-ink/45">
              Opens your mail client. Nothing is stored here.
            </p>
          )}

          <button
            type="submit"
            className="mt-2 self-start bg-ink px-6 py-3 text-[13px] tracking-[0.16em] text-paper uppercase transition-opacity hover:opacity-80"
          >
            Start a conversation
          </button>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="flex flex-col gap-3 border-t border-ink/10 bg-paper px-5 py-8 text-[12px] tracking-wide text-ink/45 md:flex-row md:items-center md:justify-between md:px-10">
      <p>Ztechprime — IT, programming, SaaS consultation</p>
      <p>Powered by Ztech Solution</p>
    </footer>
  )
}
