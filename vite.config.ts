import type { IncomingMessage, ServerResponse } from 'node:http'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { inboxPath, recordInquiry } from './scripts/contact-inbox.ts'

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

  const inbox = inboxPath()
  const saved = recordInquiry(inbox, {
    name: String(data.name ?? ''),
    email: String(data.email ?? ''),
    company: String(data.company ?? ''),
    message: String(data.message ?? ''),
    website: String(data.website ?? ''),
  })
  if (!saved.ok) {
    res.statusCode = 422
    res.end(JSON.stringify({ ok: false }))
    return
  }

  console.info(`[contact] accepted ${String(data.email ?? '')} → ${inbox}`)
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
