"use client";

import { useEffect, useState } from "react";
import { PLANS, type Plan } from "@/lib/plans";

async function startCheckout(plan: Plan, email?: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: plan.id, email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Checkout failed");
  if (data.url) window.location.href = data.url;
}

export function PricingSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section id="pricing" className="relative px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--sea)]">Pricing</p>
        <h2
          className={`max-w-xl font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] transition duration-700 md:text-5xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          One payment. Instant delivery. No retainers.
        </h2>
        <p className="mt-4 max-w-xl text-[var(--muted)]">
          Pick a kit, check out, answer a short brief, and Meridian delivers. You stay free for design taste and exceptions.
        </p>

        <label className="mt-8 flex max-w-md flex-col gap-2 text-sm text-[var(--muted)]">
          Optional email for checkout
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@company.com"
            className="rounded-sm border border-[var(--line)] bg-white px-3 py-2.5 text-[var(--ink)] outline-none ring-[var(--sea)] focus:ring-2"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {Object.values(PLANS).map((plan, i) => (
            <div
              key={plan.id}
              className={`relative border-t border-[var(--line)] pt-6 transition duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${plan.highlighted ? "md:-translate-y-2" : ""}`}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              {plan.highlighted ? (
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[var(--sea)]">Best for launches</p>
              ) : null}
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">{plan.name}</h3>
              <p className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">{plan.priceLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{plan.blurb}</p>
              <ul className="mt-6 space-y-2 text-sm text-[var(--ink)]/80">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sea)]" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={loading === plan.id}
                onClick={async () => {
                  setLoading(plan.id);
                  setError(null);
                  try {
                    await startCheckout(plan, email || undefined);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Checkout failed");
                  } finally {
                    setLoading(null);
                  }
                }}
                className={`mt-8 w-full rounded-sm px-4 py-3 text-sm font-medium transition ${
                  plan.highlighted
                    ? "bg-[var(--ink)] text-[var(--sand)] hover:bg-[var(--ink-soft)]"
                    : "border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--sand)]"
                }`}
              >
                {loading === plan.id ? "Opening checkout…" : "Buy & automate"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
