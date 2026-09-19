import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import {
  acceptedContactResponse,
  resolveContactEndpoint,
  validateContact,
} from './contact.ts'

const valid = {
  name: 'Sasa',
  email: 'sasa@ztechprime.com',
  company: 'ztech',
  message: 'Need a SaaS MVP built this quarter.',
  website: '',
}

test('production contact endpoint is a live mail API, not a static PHP file', () => {
  const endpoint = resolveContactEndpoint('prod')
  assert.notEqual(endpoint, '/contact.php')
  assert.match(endpoint, /^https:\/\//)
})

test('dev contact endpoint stays on the local inbox', () => {
  assert.equal(resolveContactEndpoint('dev'), '/api/contact')
})

test('acceptedContactResponse treats ok and FormSubmit success as delivered', () => {
  assert.equal(acceptedContactResponse({ ok: true }), true)
  assert.equal(acceptedContactResponse({ success: true }), true)
  assert.equal(acceptedContactResponse({ success: 'true' }), true)
  assert.equal(acceptedContactResponse({ ok: false }), false)
  assert.equal(acceptedContactResponse({}), false)
})

test('validateContact still rejects empty or honeypot submissions', () => {
  assert.equal(validateContact(valid), true)
  assert.equal(validateContact({ ...valid, website: 'https://spam.example' }), false)
  assert.equal(validateContact({ ...valid, message: 'short' }), false)
})

test('contact honeypot is not a website autofill field', () => {
  const src = readFileSync(new URL('../components/Contact.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(src, /name="website"/)
  assert.match(src, /name="hp_url"/)
})
