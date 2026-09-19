# ztech prime

Marketing site for ztech prime — IT consulting, custom software, integrations, and SaaS product development. Powered by ztech solutions.

## Requirements

- Node 26 (pinned in `.nvmrc`)

```bash
nvm use
```

## Run locally

```bash
cd ~/Projects/ztechprime
npm install
npm run dev
```

The app listens on [http://127.0.0.1:47291](http://127.0.0.1:47291).

`npm run build` type-checks and writes a production bundle to `dist/`. `npm run preview` serves that bundle.

## Contact form

The form posts JSON to `/api/contact` in development. Vite accepts the message into `.data/inquiries.jsonl` (gitignored) and only then shows success. Production posts to FormSubmit so Caddy can stay a static file server. `/contact.php` is not used: Caddy does not execute PHP, and a POST there returns 405.

If sending fails, the visitor can fall back to `sasa@ztechprime.com`.

The first production FormSubmit delivery sends an activation email to `sasa@ztechprime.com`. Confirm that once, or later messages will not arrive.

### Test a local send

1. `nvm use` (Node 26) and `npm run dev` — `scripts/run-vite.mjs` will pick an nvm Node 22+ if this shell is older.
2. Open [http://127.0.0.1:47291/#contact](http://127.0.0.1:47291/#contact).
3. Fill name, work email, and a message of at least 8 characters. Click **Send project details**.
4. The form should show “Received. We’ll reply with a clear next step.”
5. Confirm the same payload was appended to `.data/inquiries.jsonl`.

`curl` check:

```bash
curl -sS -X POST http://127.0.0.1:47291/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Sasa","email":"sasa@ztechprime.com","company":"ztech","message":"Need a SaaS MVP built this quarter.","website":""}'
# {"ok":true}
```

## What you should see

The hero keeps the circuit Z mark. On scroll, its separate parts move apart and assemble again while the page keeps moving into the copy and Expertise. Reduced-motion preferences skip the scrub.
