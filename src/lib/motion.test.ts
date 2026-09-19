import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

test('html advertises a real favicon.ico and apple touch icon', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')
  assert.match(html, /rel="icon"[^>]+href="\/favicon\.ico"/)
  assert.match(html, /rel="apple-touch-icon"[^>]+href="\/apple-touch-icon\.png"/)
})
