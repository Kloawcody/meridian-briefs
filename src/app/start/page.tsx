import { IntakeForm } from "@/components/IntakeForm";
import { getPlan } from "@/lib/plans";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function StartPage({ searchParams }: Props) {
  const params = await searchParams;
  const plan = getPlan(typeof params.plan === "string" ? params.plan : "studio");
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;
  const orderId = typeof params.order_id === "string" ? params.order_id : undefined;
  const demo = params.demo === "1";
  const email = typeof params.email === "string" ? params.email : "";

  return (
    <main className="flex-1 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--sea)]">Intake · {plan.name}</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
          Tell Meridian what to sharpen.
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          One form. Automated strategy, voice, colors, and launch copy on the other side.
        </p>
      </div>
      <IntakeForm
        planId={plan.id}
        sessionId={sessionId}
        orderId={orderId}
        demo={demo}
        defaultEmail={email}
      />
    </main>
  );
}
