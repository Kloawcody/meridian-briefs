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
  const fullCopy = [
    kit.positioningStatement,
    "",
    ...kit.taglines,
    "",
    kit.brandVoice.summary,
    ...kit.brandVoice.doList.map((t) => `Do: ${t}`),
    ...kit.brandVoice.dontList.map((t) => `Don't: ${t}`),
    "",
    kit.homepageCopy.headline,
    kit.homepageCopy.subhead,
  ].join("\n");

  return (
    <div className="mx-auto max-w-3xl space-y-2">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--sea)]">Delivered automatically</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
            {businessName}
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Meridian {planId} kit · Order {orderId}
          </p>
        </div>
        <div className="no-print flex flex-wrap gap-2">
          <CopyButton text={fullCopy} label="Copy all" />
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-sm border border-[var(--line)] px-3 py-2 text-xs text-[var(--muted)] transition hover:border-[var(--sea)] hover:text-[var(--sea)]"
          >
            Print / PDF
          </button>
          <a
            href={`/api/kit/${orderId}/download`}
            className="rounded-sm bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--sand)]"
          >
            Download markdown
          </a>
        </div>
      </div>

      <Section title="Positioning" copyText={kit.positioningStatement}>
        <p className="text-lg leading-relaxed text-[var(--ink)]/90">{kit.positioningStatement}</p>
      </Section>

      <Section title="Taglines" copyText={kit.taglines.join("\n")}>
        <ul className="space-y-2 text-[var(--ink)]/90">
          {kit.taglines.map((t) => (
            <li key={t} className="flex items-start justify-between gap-3">
              <span>{t}</span>
              <CopyButton text={t} label="Copy" />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Brand voice" copyText={kit.brandVoice.summary}>
        <p className="text-[var(--ink)]/90">{kit.brandVoice.summary}</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--sea)]">Do</p>
            <ul className="mt-2 space-y-2 text-sm text-[var(--ink)]/85">
              {kit.brandVoice.doList.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--sea)]">Don&apos;t</p>
            <ul className="mt-2 space-y-2 text-sm text-[var(--ink)]/85">
              {kit.brandVoice.dontList.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Naming directions">
        <ul className="space-y-2 text-[var(--ink)]/90">
          {kit.namingDirections.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      <Section title="Color system">
        <div className="flex flex-wrap gap-3">
          {[
            ["Primary", kit.colorSystem.primary],
            ["Secondary", kit.colorSystem.secondary],
            ["Accent", kit.colorSystem.accent],
            ...kit.colorSystem.neutrals.map((c, i) => [`Neutral ${i + 1}`, c] as const),
          ].map(([label, c]) => (
            <div key={`${label}-${c}`} className="w-28">
              <div className="h-16 w-full rounded-sm border border-[var(--line)] shadow-sm" style={{ background: c }} />
              <p className="mt-2 text-xs text-[var(--muted)]">{label}</p>
              <p className="break-all text-xs text-[var(--ink)]/70">{c}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{kit.colorSystem.rationale}</p>
      </Section>

      <Section
        title="Homepage copy"
        copyText={`${kit.homepageCopy.headline}\n${kit.homepageCopy.subhead}\n${kit.homepageCopy.primaryCta}\n${kit.homepageCopy.secondaryCta}`}
      >
        <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">{kit.homepageCopy.headline}</p>
        <p className="mt-3 text-[var(--ink)]/85">{kit.homepageCopy.subhead}</p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          CTAs: {kit.homepageCopy.primaryCta} · {kit.homepageCopy.secondaryCta}
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">{kit.homepageCopy.proofLine}</p>
      </Section>

      <Section title="Social bios" copyText={`${kit.socialBios.short}\n\n${kit.socialBios.long}`}>
        <p className="text-[var(--ink)]/90">{kit.socialBios.short}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{kit.socialBios.long}</p>
      </Section>

      {kit.campaignAngles?.length ? (
        <Section title="Campaign angles" copyText={kit.campaignAngles.join("\n")}>
          <ul className="space-y-2 text-[var(--ink)]/90">
            {kit.campaignAngles.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {kit.objectionHandlers?.length ? (
        <Section title="Objection handlers" copyText={kit.objectionHandlers.join("\n")}>
          <ul className="space-y-2 text-[var(--ink)]/90">
            {kit.objectionHandlers.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      <p className="no-print border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
        Need a human tweak?{" "}
        <a className="text-[var(--sea)] underline" href={`/ask?orderId=${orderId}`}>
          Ask the owner
        </a>{" "}
        — design and edge cases only.
      </p>
    </div>
  );
}
