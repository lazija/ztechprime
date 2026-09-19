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

The form posts JSON to `/api/contact` in development (accepted into `/tmp/ztechprime-inquiries.jsonl`) and to FormSubmit in production so Caddy can stay a static file server. Success is shown only after the endpoint accepts the message. If sending fails, the visitor can fall back to `sasa@ztechprime.com`.

The first production submission sends an activation email to `sasa@ztechprime.com`. Confirm that once, or later messages will not arrive.

## What you should see

The hero keeps the circuit Z mark. On scroll, its separate parts move apart and assemble again, then the page continues into Expertise, Why ztech prime, How we work, and Contact. Reduced-motion preferences skip the pin and scrub.
