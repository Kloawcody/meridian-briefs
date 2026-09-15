import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getStripe, isDemoMode, planFromMetadata } from "@/lib/stripe";
import { saveOrder, getOrderBySession } from "@/lib/store";
import type { PlanId } from "@/lib/types";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !secret || isDemoMode()) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Invalid signature" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const existing = await getOrderBySession(session.id);
    if (!existing) {
      const plan = planFromMetadata(session.metadata?.planId);
      await saveOrder({
        id: nanoid(12),
        planId: plan.id as PlanId,
        email: session.customer_details?.email || session.customer_email || "",
        status: "paid",
        createdAt: new Date().toISOString(),
        stripeSessionId: session.id,
      });
    }
  }

  return NextResponse.json({ received: true });
}
