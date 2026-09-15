# Project status — Meridian Briefs

Updated: 2026-09-15

## Batch 1 — Foundation
- Created public GitHub repo `Kloawcody/meridian-briefs`
- Scaffolded Next.js 16 + TypeScript + Tailwind app
- Defined product: automated brand-brief studio ($29 / $79 / $149)

## Batch 2 — Automation core
- Stripe checkout + webhook routes (with demo fallback)
- Intake → generate API → kit delivery + markdown download
- Offline demo kit generator + optional OpenAI structured generation
- Resend email hooks for kit delivery and owner question alerts
- `/ask` customer form + `/owner` password inbox

## Batch 3 — Design surface
- Brand-first Meridian landing hero (Fraunces + Manrope, coastal ink palette)
- Pricing, how-it-works, motion accents
- Docs: README, SETUP, this status file

## Batch 4 — Ship
- E2E verified locally (checkout → generate → kit download → questions → owner inbox)
- Pushed to GitHub: https://github.com/Kloawcody/meridian-briefs
- Feature branch: `cursor/automated-meridian-briefs-ecdb`
- Temporary public Vercel deploy verified (claim link in README if still active)
- Team project `meridian-briefs-live` created; may need auth disabled in Vercel dashboard

## Current state
- Business software is complete in demo mode
- To take real money: add Stripe + OpenAI + Resend env vars (see SETUP.md)
- Stripe/Resend MCP auth requires Cursor desktop

## Owner role
- Design refinements only
- Answer questions in `/owner`
