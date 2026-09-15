import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/stripe";

export async function GET() {
  const stripe = Boolean(process.env.STRIPE_SECRET_KEY);
  const ai = Boolean(process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY);
  const email = Boolean(process.env.RESEND_API_KEY);
  const demo = isDemoMode();

  return NextResponse.json({
    ok: true,
    product: "meridian-briefs",
    mode: demo ? "demo" : "live",
    ready: {
      checkout: demo || stripe,
      generation: true,
      aiUpgrade: ai,
      emailDelivery: email,
      ownerInbox: true,
    },
    nextSteps: [
      !stripe || demo ? "Add STRIPE_SECRET_KEY and set DEMO_MODE=false for live charges" : null,
      !ai ? "Add OPENAI_API_KEY for higher-quality AI kits (demo generator works without it)" : null,
      !email ? "Add RESEND_API_KEY + RESEND_FROM_EMAIL for automatic kit emails" : null,
      !process.env.OWNER_EMAIL ? "Add OWNER_EMAIL for question alerts" : null,
      !process.env.NEXT_PUBLIC_APP_URL ? "Set NEXT_PUBLIC_APP_URL to your production domain" : null,
    ].filter(Boolean),
  });
}
