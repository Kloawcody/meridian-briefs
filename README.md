# Meridian Briefs

Fully automated brand-brief micro-business.

Customers pay → fill a short intake → Meridian generates a positioning/voice/color/copy kit → download + optional email. You only help with **design** and **questions**.

## Money loop

1. Landing page sells Starter ($29) / Studio ($79) / Agency ($149)
2. Stripe Checkout collects payment (demo mode works without Stripe)
3. Intake form captures the brief
4. AI (or high-quality offline generator) creates the kit
5. Delivery page + markdown download (+ Resend email when configured)
6. `/ask` routes exceptions to you; `/owner` is your inbox

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), buy a plan in demo mode, complete intake, get a kit.

## Go live (real money)

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `STRIPE_SECRET_KEY` | Live/test Stripe payments |
| `STRIPE_WEBHOOK_SECRET` | Confirm paid sessions |
| `NEXT_PUBLIC_APP_URL` | Public site URL |
| `OPENAI_API_KEY` | Real AI kits (optional; demo generator works without it) |
| `RESEND_API_KEY` + `RESEND_FROM_EMAIL` | Auto-email delivery |
| `OWNER_EMAIL` | Where questions are forwarded |
| `OWNER_PASSWORD` | Protect `/owner` |

Webhook endpoint: `POST /api/webhook`

## Deploy

1. Claim or import the GitHub repo on Vercel: https://github.com/Kloawcody/meridian-briefs
2. Add env vars from `.env.example`
3. Turn off Vercel Authentication if you want a public storefront
4. Point a custom domain when ready

Live demo (temporary; claim to keep):
https://temporary-fast-ruby-pgr5goj.vercel.app
Claim: https://vercel.com/claim-deployment?code=0591db9f-b63d-4379-83bf-1aeb0f6bb4f3

## Your job

- Design: tweak landing typography, hero atmosphere, pricing copy
- Questions: answer `/owner` inbox items
- Everything else is automated

## Repo

https://github.com/Kloawcody/meridian-briefs
