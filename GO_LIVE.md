# Go live checklist — Meridian Briefs

Meridian can take money and deliver kits with almost no operator work. Follow this list once.

## 1. Claim / deploy

1. Import https://github.com/Kloawcody/meridian-briefs into Vercel (or claim the latest temporary deploy).
2. Set Production branch to `main`.
3. Turn **off** Vercel Deployment Protection / SSO for the public storefront.
4. Add a custom domain when ready.

## 2. Environment variables

| Variable | Required for | Notes |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Live links + Stripe redirects | `https://yourdomain.com` |
| `DEMO_MODE` | Must be `false` for real charges | Default demo works without Stripe |
| `STRIPE_SECRET_KEY` | Real payments | From Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | Payment confirmation | Endpoint: `/api/webhook` event `checkout.session.completed` |
| `OPENAI_API_KEY` | Higher-quality kits | Optional; offline generator still works |
| `RESEND_API_KEY` | Email delivery | Optional |
| `RESEND_FROM_EMAIL` | Email from-address | Verified domain recommended |
| `OWNER_EMAIL` | Question alerts | Your inbox |
| `OWNER_PASSWORD` | Protect `/owner` | Change from default |

## 3. Smoke test

1. Open `/api/health` — confirm `mode` and `nextSteps`.
2. Buy **Studio** in demo (or live test mode).
3. Complete intake → confirm kit page + markdown download.
4. Submit `/ask` → confirm it appears in `/owner`.

## 4. Your ongoing role

- Design tweaks on the landing page when you want
- Answer `/owner` questions
- Share the link / run ads / post socially

Everything else is automated.
