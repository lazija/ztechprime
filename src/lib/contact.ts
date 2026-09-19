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

export function contactEndpoint() {
  return import.meta.env.DEV ? '/api/contact' : '/contact.php'
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  if (!validateContact(payload)) return { ok: false, reason: 'invalid' }

  try {
    const response = await fetch(contactEndpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        company: payload.company.trim(),
        message: payload.message.trim(),
        website: payload.website,
      }),
    })

    if (!response.ok) return { ok: false, reason: 'rejected' }

    const data = (await response.json()) as { ok?: boolean }
    if (data.ok === true) return { ok: true }
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
