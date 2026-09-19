export type ContactPayload = {
  name: string
  email: string
  company: string
  message: string
  website: string
}

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: 'invalid' | 'network' | 'rejected' }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(payload: ContactPayload) {
  if (payload.website.trim()) return false
  return Boolean(
    payload.name.trim() &&
      emailPattern.test(payload.email.trim()) &&
      payload.message.trim().length >= 8,
  )
}

const inbox = 'sasa@ztechprime.com'

export function resolveContactEndpoint(kind: 'dev' | 'prod') {
  return kind === 'dev' ? '/api/contact' : `https://formsubmit.co/ajax/${inbox}`
}

export function contactEndpoint() {
  return resolveContactEndpoint(import.meta.env.DEV ? 'dev' : 'prod')
}

export function acceptedContactResponse(data: unknown) {
  if (!data || typeof data !== 'object') return false
  const body = data as { ok?: unknown; success?: unknown }
  return body.ok === true || body.success === true || body.success === 'true'
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  if (!validateContact(payload)) return { ok: false, reason: 'invalid' }

  const name = payload.name.trim()
  const email = payload.email.trim()
  const company = payload.company.trim()
  const message = payload.message.trim()

  try {
    const response = await fetch(contactEndpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        website: payload.website,
        _honey: payload.website,
        _captcha: 'false',
        _subject: `Project inquiry — ${name}`,
      }),
    })

    if (!response.ok) return { ok: false, reason: 'rejected' }

    const data: unknown = await response.json()
    if (acceptedContactResponse(data)) return { ok: true }
    return { ok: false, reason: 'rejected' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}

export type MailtoCopy = {
  subject: string
  name: string
  email: string
  company: string
}

export function mailtoFallback(
  payload: ContactPayload,
  address: string,
  labels?: MailtoCopy,
) {
  const subjectLine = (labels?.subject ?? 'Project inquiry — {name}').replace(
    '{name}',
    payload.name.trim(),
  )
  const subject = encodeURIComponent(subjectLine)
  const body = encodeURIComponent(
    `${labels?.name ?? 'Name'}: ${payload.name.trim()}\n${labels?.email ?? 'Email'}: ${payload.email.trim()}\n${labels?.company ?? 'Company'}: ${payload.company.trim() || '—'}\n\n${payload.message.trim()}`,
  )
  window.location.href = `mailto:${address}?subject=${subject}&body=${body}`
}
