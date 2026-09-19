import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

export type InquiryInput = {
  name: string
  email: string
  company?: string
  message: string
  website?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function inboxPath() {
  return process.env.ZTECHPRIME_INBOX ?? join(process.cwd(), '.data/inquiries.jsonl')
}

export function recordInquiry(inbox: string, data: InquiryInput) {
  const website = (data.website ?? '').trim()
  const name = data.name.trim()
  const email = data.email.trim()
  const company = (data.company ?? '').trim()
  const message = data.message.trim()

  if (website) return { ok: false as const }
  if (!name || !message || !emailPattern.test(email)) return { ok: false as const }

  mkdirSync(dirname(inbox), { recursive: true })
  appendFileSync(
    inbox,
    `${JSON.stringify({ at: new Date().toISOString(), name, email, company, message })}\n`,
  )
  return { ok: true as const }
}
