"use client";

import { useEffect, useState } from "react";
import { KitView } from "@/components/KitView";
import type { BrandKit } from "@/lib/types";

type KitPayload = {
  orderId: string;
  planId: string;
  businessName: string;
  kit: BrandKit;
};

export function KitClient({ id, initial }: { id: string; initial: KitPayload | null }) {
  const [payload, setPayload] = useState<KitPayload | null>(initial);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (payload) return;
    try {
      const raw = sessionStorage.getItem(`meridian-kit:${id}`);
      if (raw) {
        setPayload(JSON.parse(raw) as KitPayload);
        return;
      }
    } catch {
      // continue to API
    }

    fetch(`/api/kit/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Kit not found");
        const data = await res.json();
        setPayload({
          orderId: data.id,
          planId: data.planId,
          businessName: data.businessName,
          kit: data.kit,
        });
      })
      .catch(() => setError("This kit is no longer in server memory. Re-run intake to regenerate."));
  }, [id, payload]);

  if (error) {
    return (
      <div className="mx-auto max-w-xl py-24 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">Kit unavailable</h1>
        <p className="mt-3 text-[var(--muted)]">{error}</p>
        <a href="/#pricing" className="mt-6 inline-block text-[var(--sea)] underline">
          Start again
        </a>
      </div>
    );
  }

  if (!payload) {
    return <p className="mx-auto max-w-xl py-24 text-center text-[var(--muted)]">Loading kit…</p>;
  }

  return (
    <KitView
      businessName={payload.businessName}
      planId={payload.planId}
      kit={payload.kit}
      orderId={payload.orderId}
    />
  );
}
