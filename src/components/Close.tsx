import { useState, type FormEvent } from 'react'
import { brandImages, CONTACT_NAME, CONTACT_PHONE, CONTACT_PHONE_HREF } from '../assets/brand'
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
      `Conversation with Ztechprime, ztech Solutions — ${trimmedName}`,
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
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.05fr_0.95fr] md:items-end">
        <div>
          <img
            src={brandImages.lockup}
            alt="ztech Solutions — Smart IT Solutions"
            className="mb-8 h-auto w-[min(240px,70vw)]"
          />
          <p className="text-[12px] tracking-[0.18em] uppercase text-prime">
            Ztechprime · ztech Solutions
          </p>
          <h2 className="mt-4 max-w-[20rem] text-[clamp(2.2rem,5.4vw,4rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-navy">
            Tell us where the system is straining.
          </h2>
          <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-mute">
            A short note is enough. Ztechprime is how you reach ztech Solutions.
            We read for the sequence — infrastructure, product, and the SaaS
            shape — and reply with a clear next hour, not a deck.
          </p>
          <p className="mt-6 text-[15px] text-ink">
            {CONTACT_NAME}
            <span className="text-mute"> · </span>
            <a className="text-prime hover:opacity-80" href={CONTACT_PHONE_HREF}>
              {CONTACT_PHONE}
            </a>
          </p>
          <p className="mt-6 text-[13px] tracking-[0.04em] text-mute">
            Powered by Ztech Solution
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-mute">
              Name
            </span>
            <input
              className="mt-2 w-full border-b border-navy/15 bg-transparent py-3 text-[16px] outline-none transition-colors focus:border-prime"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              name="name"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-mute">
              Company
            </span>
            <input
              className="mt-2 w-full border-b border-navy/15 bg-transparent py-3 text-[16px] outline-none transition-colors focus:border-prime"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              autoComplete="organization"
              name="company"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-mute">
              What is straining
            </span>
            <textarea
              className="mt-2 min-h-28 w-full resize-y border-b border-navy/15 bg-transparent py-3 text-[16px] outline-none transition-colors focus:border-prime"
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
            <p className="text-[14px] text-mute">
              Your mail client should open. If it does not, write{' '}
              <a className="text-prime underline underline-offset-4" href={`mailto:${INQUIRY_EMAIL}`}>
                {INQUIRY_EMAIL}
              </a>
              .
            </p>
          ) : (
            <p className="text-[14px] text-mute">
              Opens your mail client. Nothing is stored here.
            </p>
          )}

          <button
            type="submit"
            className="mt-2 self-start bg-prime px-6 py-3 text-[13px] tracking-[0.16em] text-white uppercase transition-opacity hover:opacity-80"
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
    <footer className="flex flex-col gap-5 border-t border-navy/10 bg-paper px-5 py-8 text-[12px] tracking-wide text-mute md:flex-row md:items-center md:justify-between md:px-10">
      <div className="flex items-center gap-4">
        <img
          src={brandImages.lockup}
          alt="ztech Solutions"
          className="h-14 w-auto"
        />
        <p>
          {CONTACT_NAME}
          <br />
          <a className="text-prime" href={CONTACT_PHONE_HREF}>
            {CONTACT_PHONE}
          </a>
        </p>
      </div>
      <p>Ztechprime · Smart IT Solutions</p>
      <p>Powered by Ztech Solution</p>
    </footer>
  )
}
