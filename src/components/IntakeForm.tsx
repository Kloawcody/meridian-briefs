"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  planId: string;
  sessionId?: string;
  orderId?: string;
  demo?: boolean;
  defaultEmail?: string;
};

const fields = [
  { name: "businessName", label: "Business name", placeholder: "Harbor Supply Co." },
  { name: "website", label: "Website (optional)", placeholder: "https://…", required: false },
  { name: "industry", label: "Industry", placeholder: "Outdoor gear retail" },
  { name: "audience", label: "Audience", placeholder: "Weekend hikers buying their first kit" },
  { name: "offer", label: "Core offer", placeholder: "Curated trail kits shipped in 48 hours" },
  { name: "differentiator", label: "Differentiator", placeholder: "Field-tested bundles, not endless SKUs" },
  { name: "tone", label: "Desired tone", placeholder: "Calm, competent, outdoors-modern" },
  { name: "goals", label: "Near-term goal", placeholder: "Launch a clearer homepage before spring" },
  { name: "constraints", label: "Constraints (optional)", placeholder: "Avoid neon colors", required: false },
  { name: "email", label: "Delivery email", placeholder: "you@company.com", type: "email" },
] as const;

export function IntakeForm({ planId, sessionId, orderId, demo, defaultEmail }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

    // Persist locally so kit pages work across serverless instances.
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
      // ignore quota errors
    }

    router.push(data.kitUrl);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto grid max-w-3xl gap-5">
      {fields.map((field) => (
        <label key={field.name} className="grid gap-2 text-sm text-[var(--muted)]">
          {field.label}
          <input
            name={field.name}
            required={"required" in field ? field.required !== false : true}
            type={"type" in field ? field.type : "text"}
            defaultValue={field.name === "email" ? defaultEmail : undefined}
            placeholder={field.placeholder}
            className="rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none ring-[var(--sea)] focus:ring-2"
          />
        </label>
      ))}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-sm bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--sand)] transition hover:bg-[var(--ink-soft)] disabled:opacity-60"
      >
        {loading ? "Generating your kit…" : "Generate my Meridian kit"}
      </button>
    </form>
  );
}
