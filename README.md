# Meridian Briefs

Automated brand-brief micro-business. Customers pay → short intake → kit delivered. You only handle design taste and rare questions.

## See it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What’s automated

1. Checkout (Stripe live, or demo mode with no keys)
2. Intake
3. Brand kit generation (AI if keyed, high-quality offline generator otherwise)
4. Kit page + markdown download
5. Optional email delivery (Resend)
6. Customer questions → `/owner` inbox

## Go live

Follow **[GO_LIVE.md](./GO_LIVE.md)** — env vars, Stripe webhook, Vercel settings, smoke test.

Health check: `/api/health`

## Your job

- Design refinements on the landing page
- Answer `/owner` when something needs a human
- Send traffic to the site

## Repo

https://github.com/Kloawcody/meridian-briefs
