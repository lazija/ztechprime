import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { canPinHero } from './motion.ts'

test('hero pin only when the stacked logo and copy fit the viewport', () => {
  assert.equal(canPinHero({ width: 1440, height: 900, contentHeight: 880 }), true)
  assert.equal(canPinHero({ width: 1440, height: 900, contentHeight: 1211 }), false)
  assert.equal(canPinHero({ width: 598, height: 459, contentHeight: 1211 }), false)
  assert.equal(canPinHero({ width: 390, height: 844, contentHeight: 980 }), false)
})

test('html advertises a real favicon.ico and apple touch icon', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')
  assert.match(html, /rel="icon"[^>]+href="\/favicon\.ico"/)
  assert.match(html, /rel="apple-touch-icon"[^>]+href="\/apple-touch-icon\.png"/)
})
