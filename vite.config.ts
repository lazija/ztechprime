import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const inbox = '/tmp/ztechprime-inquiries.jsonl'

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

async function handleContact(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json')
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end(JSON.stringify({ ok: false }))
    return
  }

  let data: Record<string, unknown>
  try {
    data = JSON.parse(await readBody(req)) as Record<string, unknown>
  } catch {
    res.statusCode = 400
    res.end(JSON.stringify({ ok: false }))
    return
  }

  if (typeof data.website === 'string' && data.website.trim()) {
    res.statusCode = 200
    res.end(JSON.stringify({ ok: true }))
    return
  }

  const name = String(data.name ?? '').trim()
  const email = String(data.email ?? '').trim()
  const message = String(data.message ?? '').trim()
  const company = String(data.company ?? '').trim()
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.statusCode = 422
    res.end(JSON.stringify({ ok: false }))
    return
  }

  mkdirSync(dirname(inbox), { recursive: true })
  appendFileSync(
    inbox,
    `${JSON.stringify({ at: new Date().toISOString(), name, email, company, message })}\n`,
  )
  res.statusCode = 200
  res.end(JSON.stringify({ ok: true }))
}

function contactApi(): Plugin {
  return {
    name: 'ztech-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        void handleContact(req, res)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        void handleContact(req, res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contactApi()],
  server: {
    host: '127.0.0.1',
    port: 47291,
    strictPort: true,
  },
})
