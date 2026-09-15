# Meridian — go-live checklist

## 1. Product is already built

- Marketing site with checkout CTAs
- Demo checkout (no Stripe required)
- Stripe Checkout + webhook ready
- Intake → kit generation → delivery page
- Markdown download
- Customer question form
- Password-protected owner inbox

## 2. Connect money

1. Create a Stripe account
2. Add `STRIPE_SECRET_KEY`
3. Add webhook to `/api/webhook` for `checkout.session.completed`
4. Set `STRIPE_WEBHOOK_SECRET`
5. Set `NEXT_PUBLIC_APP_URL` to your production URL
6. Remove `DEMO_MODE=true` if you set it

## 3. Upgrade generation quality

1. Add `OPENAI_API_KEY` (or AI Gateway key)
2. Optional: `OPENAI_MODEL=gpt-4o-mini`

Without a key, Meridian still delivers useful kits via the built-in generator so the business can be demoed end-to-end.

## 4. Automate email delivery

1. Create a Resend account and verify a domain
2. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`
3. Set `OWNER_EMAIL` for question alerts

## 5. Protect your inbox

Set a strong `OWNER_PASSWORD` before sharing the site publicly.

## 6. Persistence note

Orders/questions are stored under `.data/` on disk. On serverless hosts the filesystem is ephemeral, so for serious volume add Vercel Postgres / Blob / Redis and swap `src/lib/store.ts`. Demo and low volume still work for proving the model.

## 7. Traffic

Point ads, social, or SEO at the landing page. The conversion path is already wired.
