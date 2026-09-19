import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { recordInquiry } from './contact-inbox.ts'

test('recordInquiry appends a real accepted message to the inbox file', () => {
  const inbox = join(mkdtempSync(join(tmpdir(), 'ztech-inbox-')), 'inquiries.jsonl')
  const saved = recordInquiry(inbox, {
    name: 'Sasa Lazic',
    email: 'sasa@ztechprime.com',
    company: 'ztech',
    message: 'Need a SaaS MVP built this quarter.',
  })

  assert.equal(saved.ok, true)
  const line = readFileSync(inbox, 'utf8').trim()
  const row = JSON.parse(line) as {
    name: string
    email: string
    company: string
    message: string
  }
  assert.equal(row.name, 'Sasa Lazic')
  assert.equal(row.email, 'sasa@ztechprime.com')
  assert.equal(row.company, 'ztech')
  assert.equal(row.message, 'Need a SaaS MVP built this quarter.')
})

test('recordInquiry refuses empty or honeypot payloads instead of faking success', () => {
  const inbox = join(mkdtempSync(join(tmpdir(), 'ztech-inbox-')), 'inquiries.jsonl')
  assert.equal(
    recordInquiry(inbox, {
      name: '',
      email: 'sasa@ztechprime.com',
      company: '',
      message: 'Need a SaaS MVP built this quarter.',
    }).ok,
    false,
  )
  assert.equal(
    recordInquiry(inbox, {
      name: 'Bot',
      email: 'bot@example.com',
      company: '',
      message: 'Need a SaaS MVP built this quarter.',
      website: 'https://spam.example',
    }).ok,
    false,
  )
})
