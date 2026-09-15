import Link from "next/link";
import { getPlan } from "@/lib/plans";
import { getStripe, isDemoMode } from "@/lib/stripe";
import { getOrderBySession, saveOrder } from "@/lib/store";
import { nanoid } from "nanoid";
import type { PlanId } from "@/lib/types";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;
  const demo = params.demo === "1" || isDemoMode();
  const planId = typeof params.plan === "string" ? params.plan : "studio";
  const email = typeof params.email === "string" ? params.email : "";

  let orderId: string | undefined;

  if (sessionId) {
    let order = await getOrderBySession(sessionId);
    if (!order) {
      const stripe = getStripe();
      if (stripe) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const plan = getPlan(session.metadata?.planId || planId);
        order = await saveOrder({
          id: nanoid(12),
          planId: plan.id as PlanId,
          email: session.customer_details?.email || session.customer_email || email,
          status: "paid",
          createdAt: new Date().toISOString(),
          stripeSessionId: session.id,
        });
      }
    }
    orderId = order?.id;
  } else if (demo) {
    const plan = getPlan(planId);
    const order = await saveOrder({
      id: nanoid(12),
      planId: plan.id as PlanId,
      email,
      status: "demo",
      createdAt: new Date().toISOString(),
    });
    orderId = order.id;
  }

  const qs = new URLSearchParams();
  qs.set("plan", getPlan(planId).id);
  if (sessionId) qs.set("session_id", sessionId);
  if (orderId) qs.set("order_id", orderId);
  if (demo && !sessionId) qs.set("demo", "1");
  if (email) qs.set("email", email);

  return (
    <main className="flex-1 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--sea)]">
          {demo && !sessionId ? "Demo checkout complete" : "Payment received"}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
          Next: a 2-minute brief.
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Meridian will generate the kit automatically after intake. No back-and-forth required.
        </p>
        <Link
          href={`/start?${qs.toString()}`}
          className="mt-8 inline-block rounded-sm bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--sand)]"
        >
          Continue to intake
        </Link>
      </div>
    </main>
  );
}
