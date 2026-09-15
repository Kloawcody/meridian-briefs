"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  planId: string;
  sessionId?: string;
  orderId?: string;
  demo?: boolean;
  defaultEmail?: string;
};

const fields = [
  { name: "businessName", label: "Business name", placeholder: "Harbor Supply Co.", group: "basics" },
  { name: "website", label: "Website (optional)", placeholder: "https://…", required: false, group: "basics" },
  { name: "industry", label: "Industry", placeholder: "Outdoor gear retail", group: "basics" },
  { name: "audience", label: "Audience", placeholder: "Weekend hikers buying their first kit", group: "strategy" },
  { name: "offer", label: "Core offer", placeholder: "Curated trail kits shipped in 48 hours", group: "strategy" },
  { name: "differentiator", label: "Differentiator", placeholder: "Field-tested bundles, not endless SKUs", group: "strategy" },
  { name: "tone", label: "Desired tone", placeholder: "Calm, competent, outdoors-modern", group: "voice" },
  { name: "goals", label: "Near-term goal", placeholder: "Launch a clearer homepage before spring", group: "voice" },
  { name: "constraints", label: "Constraints (optional)", placeholder: "Avoid neon colors", required: false, group: "voice" },
  { name: "email", label: "Delivery email", placeholder: "you@company.com", type: "email", group: "voice" },
] as const;

const groups = [
  { id: "basics", title: "Basics", blurb: "Who you are" },
  { id: "strategy", title: "Strategy", blurb: "Who you serve" },
  { id: "voice", title: "Voice & delivery", blurb: "How it should sound" },
] as const;

export function IntakeForm({ planId, sessionId, orderId, demo, defaultEmail }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const current = groups[step];
  const visibleFields = useMemo(() => fields.filter((f) => f.group === current.id), [current.id]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < groups.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string | boolean | undefined> = {
      planId,
      sessionId,
      orderId,
      demo,
    };
    for (const field of fields) {
      payload[field.name] = String(fd.get(field.name) || "");
    }

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Generation failed");
      return;
    }

    try {
      sessionStorage.setItem(
        `meridian-kit:${data.orderId}`,
        JSON.stringify({
          orderId: data.orderId,
          planId: data.planId,
          businessName: payload.businessName,
          kit: data.kit,
        }),
      );
    } catch {
      // ignore
    }

    router.push(data.kitUrl);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto grid max-w-3xl gap-5">
      <div className="mb-2 flex gap-2">
        {groups.map((g, i) => (
          <div key={g.id} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-[var(--sea)]" : "bg-[var(--line)]"}`} />
        ))}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--sea)]">
          Step {step + 1} of {groups.length}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">{current.title}</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">{current.blurb}</p>
      </div>

      {visibleFields.map((field) => (
        <label key={field.name} className="grid gap-2 text-sm">
          <span className="text-[var(--ink)]">{field.label}</span>
          <input
            name={field.name}
            type={getattr := getattr if False else ("email" if field.name == "email" else "text")) or "text"}
            required={"required" not in field or field.required is not False}
            defaultValue={field.name == "email" ? defaultEmail || "" : ""}
            placeholder={field.placeholder}
            className="rounded-sm border border-[var(--line)] bg-white px-3 py-2.5 outline-none ring-[var(--sea)] focus:ring-2"
          />
        </label>
      ))}

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <div className="flex gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-sm border border-[var(--line)] px-4 py-2.5 text-sm">
            Back
          </button>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded-sm bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--sand)] disabled:opacity-60"
        >
          {loading ? "Generating…" : step < groups.length - 1 ? "Continue" : "Generate kit"}
        </button>
      </div>
    </form>
  );
}
