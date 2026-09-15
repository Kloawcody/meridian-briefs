"use client";

import { CopyButton } from "@/components/CopyButton";
import type { BrandKit } from "@/lib/types";

function Section({
  title,
  children,
  copyText,
}: {
  title: string;
  children: React.ReactNode;
  copyText?: string;
}) {
  return (
    <section className="border-t border-[var(--line)] pt-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">{title}</h2>
        {copyText ? <CopyButton text={copyText} /> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function KitView({
  businessName,
  planId,
  kit,
  orderId,
}: {
  businessName: string;
  planId: string;
  kit: BrandKit;
  orderId: string;
}) {
  const voiceBlock = [
    kit.brandVoice.summary,
    "",
    "Do:",
    ...kit.brandVoice.doList.map((d) => `- ${d}`),
    "",
    "Don't:",
    ...kit.brandVoice.dontList.map((d) => `- ${d}`),
  ].join("\n");

  return (
    <div className="mx-auto max-w-3xl">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--sea)]">Meridian kit · {planId}</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
            {businessName}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-sm border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
          >
            Print
          </button>
          <a
            href={`/api/kit/${orderId}/download`}
            className="rounded-sm bg-[var(--ink)] px-3 py-2 text-sm font-medium text-[var(--sand)]"
          >
            Download markdown
          </a>
        </div>
      </div>

      <Section title="Positioning" copyText={kit.positioningStatement}>
        <p className="text-[var(--ink)]/90 leading-relaxed">{kit.positioningStatement}</p>
      </Section>

      <Section title="Taglines" copyText={kit.taglines.join("\n")}>
        <ul className="space-y-2">
          {kit.taglines.map((t) => (
            <li key={t} className="text-[var(--ink)]">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Brand voice" copyText={voiceBlock}>
        <p className="text-[var(--ink)]/90">{kit.brandVoice.summary}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--sea)]">Do</p>
            <ul className="mt-2 space-y-1 text-sm text-[var(--ink)]">
              {kit.brandVoice.doList.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--sea)]">Don&apos;t</p>
            <ul className="mt-2 space-y-1 text-sm text-[var(--ink)]">
              {kit.brandVoice.dontList.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Color system" copyText={[kit.colorSystem.primary, kit.colorSystem.secondary, kit.colorSystem.accent, ...kit.colorSystem.neutrals].join("\n")}>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {[kit.colorSystem.primary, kit.colorSystem.secondary, kit.colorSystem.accent, ...kit.colorSystem.neutrals].map((c) => (
            <div key={c}>
              <div className="h-14 rounded-sm border border-[var(--line)]" style={{ background: c }} />
              <p className="mt-1 text-xs text-[var(--muted)]">{c}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{kit.colorSystem.rationale}</p>
      </Section>

      <Section title="Homepage copy" copyText={[kit.homepageCopy.headline, kit.homepageCopy.subhead, kit.homepageCopy.primaryCta, kit.homepageCopy.secondaryCta, kit.homepageCopy.proofLine].join("\n")}>
        <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">{kit.homepageCopy.headline}</p>
        <p className="mt-2 text-[var(--muted)]">{kit.homepageCopy.subhead}</p>
        <p className="mt-4 text-sm text-[var(--ink)]">Primary CTA: {kit.homepageCopy.primaryCta}</p>
        <p className="text-sm text-[var(--ink)]">Secondary CTA: {kit.homepageCopy.secondaryCta}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{kit.homepageCopy.proofLine}</p>
      </Section>

      <Section title="Social bios" copyText={`${kit.socialBios.short}\n\n${kit.socialBios.long}`}>
        <p className="text-sm text-[var(--ink)]"><span className="text-[var(--muted)]">Short:</span> {kit.socialBios.short}</p>
        <p className="mt-2 text-sm text-[var(--ink)]"><span className="text-[var(--muted)]">Long:</span> {kit.socialBios.long}</p>
      </Section>

      {kit.namingDirections?.length ? (
        <Section title="Naming directions" copyText={kit.namingDirections.join("\n")}>
          <ul className="space-y-2 text-[var(--ink)]">
            {kit.namingDirections.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {kit.campaignAngles?.length ? (
        <Section title="Campaign angles" copyText={kit.campaignAngles.join("\n")}>
          <ul className="space-y-2 text-[var(--ink)]">
            {kit.campaignAngles.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {kit.objectionHandlers?.length ? (
        <Section title="Objection handlers" copyText={kit.objectionHandlers.join("\n")}>
          <ul className="space-y-2 text-[var(--ink)]">
            {kit.objectionHandlers.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Section>
      ) : null}
    </div>
  );
}
