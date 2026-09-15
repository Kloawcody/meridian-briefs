import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { generateBrandKit } from "@/lib/generate";
import { sendKitEmail } from "@/lib/email";
import { absoluteUrl, getStripe, isDemoMode } from "@/lib/stripe";
import { getOrder, getOrderBySession, saveOrder } from "@/lib/store";
import { getPlan } from "@/lib/plans";
import type { PlanId } from "@/lib/types";

const intakeSchema = z.object({
  businessName: z.string().min(2),
  website: z.string().optional(),
  industry: z.string().min(2),
  audience: z.string().min(2),
  offer: z.string().min(2),
  differentiator: z.string().min(2),
  tone: z.string().min(2),
  goals: z.string().min(2),
  constraints: z.string().optional(),
  email: z.string().email(),
  planId: z.enum(["starter", "studio", "agency"]).optional(),
  sessionId: z.string().optional(),
  orderId: z.string().optional(),
  demo: z.boolean().optional(),
});

export async function POST(req: Request) {
  const parsed = intakeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid intake", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  let order = data.orderId ? await getOrder(data.orderId) : null;

  if (!order && data.sessionId) {
    order = await getOrderBySession(data.sessionId);
    if (!order && !isDemoMode()) {
      const stripe = getStripe();
      if (stripe) {
        const session = await stripe.checkout.sessions.retrieve(data.sessionId);
        if (session.payment_status === "paid" || session.status === "complete") {
          const plan = getPlan(session.metadata?.planId || data.planId);
          order = await saveOrder({
            id: nanoid(12),
            planId: plan.id as PlanId,
            email: session.customer_details?.email || session.customer_email || data.email,
            status: "paid",
            createdAt: new Date().toISOString(),
            stripeSessionId: session.id,
          });
        }
      }
    }
  }

  if (!order && (data.demo || isDemoMode() || !process.env.STRIPE_SECRET_KEY)) {
    const plan = getPlan(data.planId);
    order = await saveOrder({
      id: nanoid(12),
      planId: plan.id as PlanId,
      email: data.email,
      status: "demo",
      createdAt: new Date().toISOString(),
    });
  }

  if (!order) {
    return NextResponse.json({ error: "Payment not found. Complete checkout first." }, { status: 402 });
  }

  const intake = {
    businessName: data.businessName,
    website: data.website,
    industry: data.industry,
    audience: data.audience,
    offer: data.offer,
    differentiator: data.differentiator,
    tone: data.tone,
    goals: data.goals,
    constraints: data.constraints,
    email: data.email,
  };

  const kit = await generateBrandKit(intake, order.planId);
  const updated = await saveOrder({
    ...order,
    email: data.email,
    intake,
    kit,
    status: order.status === "demo" ? "demo" : "generated",
  });

  const kitUrl = absoluteUrl(`/kit/${updated.id}`);
  const emailResult = await sendKitEmail({
    to: data.email,
    businessName: intake.businessName,
    planId: updated.planId,
    kit,
    kitUrl,
  });

  return NextResponse.json({
    orderId: updated.id,
    kitUrl,
    email: emailResult,
  });
}
