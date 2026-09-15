import Stripe from "stripe";
import { getPlan, type Plan } from "./plans";

export function isDemoMode() {
  return !process.env.STRIPE_SECRET_KEY || process.env.DEMO_MODE === "true";
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function absoluteUrl(path = "/") {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function createCheckoutSession(planId: string, email?: string) {
  const plan = getPlan(planId);
  const stripe = getStripe();

  if (!stripe || isDemoMode()) {
    return {
      demo: true as const,
      url: absoluteUrl(`/success?demo=1&plan=${plan.id}${email ? `&email=${encodeURIComponent(email)}` : ""}`),
      plan,
    };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email || undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: plan.price,
          product_data: {
            name: `Meridian ${plan.name}`,
            description: plan.blurb,
          },
        },
      },
    ],
    success_url: absoluteUrl(`/success?session_id={CHECKOUT_SESSION_ID}`),
    cancel_url: absoluteUrl(`/?canceled=1`),
    metadata: {
      planId: plan.id,
      product: "meridian-briefs",
    },
  });

  return { demo: false as const, url: session.url!, plan, sessionId: session.id };
}

export type CheckoutResult = Awaited<ReturnType<typeof createCheckoutSession>>;

export function planFromMetadata(planId: string | null | undefined): Plan {
  return getPlan(planId);
}
