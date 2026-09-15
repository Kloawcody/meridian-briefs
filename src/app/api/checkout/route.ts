import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { getPlan } from "@/lib/plans";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    planId?: string;
    email?: string;
  };

  const plan = getPlan(body.planId);
  const result = await createCheckoutSession(plan.id, body.email);

  return NextResponse.json(result);
}
