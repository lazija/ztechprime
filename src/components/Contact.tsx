import { useState, type FormEvent } from 'react'
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_NAME,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from '../assets/brand'
import { useLanguage } from '../i18n/LanguageProvider'
import { mailtoFallback, submitContact } from '../lib/contact'
import { PoweredBy } from './PoweredBy'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'invalid'

export function Contact() {
  const { contact } = useLanguage().copy
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const payload = { name, email, company, message, website }
    setStatus('sending')
    const result = await submitContact(payload)

    if (result.ok) {
      setStatus('success')
      setName('')
      setEmail('')
      setCompany('')
      setMessage('')
      return
    }

    if (result.reason === 'invalid') {
      setStatus('invalid')
      return
    }

    setStatus('error')
  }

  function onMailto() {
    mailtoFallback(
      { name, email, company, message, website },
      CONTACT_EMAIL,
      {
        subject: contact.form.mailtoSubject,
        name: contact.form.name,
        email: contact.form.email,
        company: contact.form.company,
      },
    )
  }

  return (
    <section id={contact.id} className="scroll-mt-28 bg-[#eef3fa] px-5 py-20 md:scroll-mt-24 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <h2 className="max-w-[16em] text-[clamp(2rem,4.4vw,3.3rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-navy">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-[42ch] text-[17px] leading-[1.7] text-mute">{contact.body}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <a href="#project-form" className="btn-primary">
              {contact.primary.label}
            </a>
            <a className="text-[15px] text-navy underline-offset-4 hover:underline" href={CONTACT_PHONE_HREF}>
              {contact.call}
            </a>
            <a className="text-[15px] text-navy underline-offset-4 hover:underline" href={CONTACT_EMAIL_HREF}>
              {contact.email}
            </a>
          </div>
          <p className="mt-8 text-[15px] text-ink">
            {CONTACT_NAME}
            <span className="text-mute"> · </span>
            <a className="text-prime hover:opacity-80" href={CONTACT_PHONE_HREF}>
              {CONTACT_PHONE}
            </a>
            <span className="text-mute"> · </span>
            <a className="text-prime hover:opacity-80" href={CONTACT_EMAIL_HREF}>
              {CONTACT_EMAIL}
            </a>
          </p>
          <div className="mt-8">
            <PoweredBy size="md" />
          </div>
        </div>

        <form
          id="project-form"
          className="flex flex-col gap-5"
          onSubmit={onSubmit}
          noValidate
        >
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-mute">
              {contact.form.name}
            </span>
            <input
              className="field"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              name="name"
              required
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-mute">
              {contact.form.email}
            </span>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              name="email"
              required
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-mute">
              {contact.form.company}
            </span>
            <input
              className="field"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              autoComplete="organization"
              name="company"
            />
          </label>
          <label className="honeypot" aria-hidden="true">
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              name="website"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] uppercase text-mute">
              {contact.form.message}
            </span>
            <textarea
              className="field min-h-32 resize-y"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              name="message"
              placeholder={contact.form.placeholder}
              required
            />
          </label>

          {status === 'invalid' ? (
            <p className="text-[14px] text-[#8a3a2a]" role="alert">
              {contact.form.invalid}
            </p>
          ) : null}

          {status === 'error' ? (
            <p className="text-[14px] text-[#8a3a2a]" role="alert">
              {contact.form.error}{' '}
              <button
                type="button"
                className="text-prime underline underline-offset-4"
                onClick={onMailto}
              >
                {contact.form.fallback}
              </button>
            </p>
          ) : null}

          {status === 'success' ? (
            <p className="text-[14px] text-navy" role="status">
              {contact.form.success}
            </p>
          ) : (
            <p className="text-[14px] text-mute">{contact.form.support}</p>
          )}

          <button type="submit" className="btn-primary mt-1 self-start" disabled={status === 'sending'}>
            {status === 'sending' ? contact.form.sending : contact.form.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
