# Ztechprime

A local marketing site for Ztechprime, the product face of ztech Solutions — Smart IT Solutions. One scroll-driven story: each scene pins, scrubs, and hands the next one in.

No accounts, no database, no remote services. The Node process is the Vite dev server.

## Requirements

- Node 26 (latest). This repo pins it in `.nvmrc`.

```bash
nvm use
```

If `nvm` is not already on 26:

```bash
nvm install 26
nvm use 26
```

## Run locally

```bash
cd ~/Projects/ztechprime
npm install
npm run dev
```

The app listens on [http://127.0.0.1:47291](http://127.0.0.1:47291).

`npm run build` type-checks and writes a production bundle to `dist/`. `npm run preview` serves that bundle.

## What you should see

Scroll the page. The opening wordmark gives way to the sequence problem, then IT, programming, and SaaS consultation — one pinned scene at a time. After the last scene, the page rests on a conversation form. The form opens your mail client; nothing is stored.

If the system prefers reduced motion, the same chapters appear as a stacked page with no pin or scrub.
