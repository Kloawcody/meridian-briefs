import type { BrandKit } from "@/lib/types";

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
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--sea)]">Delivered automatically</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
            {businessName}
          </h1>
          <p className="mt-2 text-[var(--muted)]">Meridian {planId} kit · Order {orderId}</p>
        </div>
        <a
          href={`/api/kit/${orderId}/download`}
          className="rounded-sm bg-[var(--ink)] px-4 py-3 text-sm font-medium text-[var(--sand)]"
        >
          Download markdown
        </a>
      </div>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">Positioning</h2>
        <p className="mt-3 text-lg leading-relaxed text-[var(--ink)]/90">{kit.positioningStatement}</p>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">Taglines</h2>
        <ul className="mt-3 space-y-2 text-[var(--ink)]/90">
          {kit.taglines.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">Brand voice</h2>
        <p className="mt-3 text-[var(--ink)]/90">{kit.brandVoice.summary}</p>
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
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">Color system</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {[kit.colorSystem.primary, kit.colorSystem.secondary, kit.colorSystem.accent, ...kit.colorSystem.neutrals].map(
            (c) => (
              <div key={c} className="w-24">
                <div className="h-16 w-full rounded-sm border border-[var(--line)]" style={{ background: c }} />
                <p className="mt-2 break-all text-xs text-[var(--muted)]">{c}</p>
              </div>
            ),
          )}
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{kit.colorSystem.rationale}</p>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">Homepage copy</h2>
        <p className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">{kit.homepageCopy.headline}</p>
        <p className="mt-3 text-[var(--ink)]/85">{kit.homepageCopy.subhead}</p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          CTAs: {kit.homepageCopy.primaryCta} · {kit.homepageCopy.secondaryCta}
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">{kit.homepageCopy.proofLine}</p>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">Social bios</h2>
        <p className="mt-3 text-[var(--ink)]/90">{kit.socialBios.short}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{kit.socialBios.long}</p>
      </section>

      {kit.campaignAngles?.length ? (
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">Campaign angles</h2>
          <ul className="mt-3 space-y-2 text-[var(--ink)]/90">
            {kit.campaignAngles.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {kit.objectionHandlers?.length ? (
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">Objection handlers</h2>
          <ul className="mt-3 space-y-2 text-[var(--ink)]/90">
            {kit.objectionHandlers.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
        Need a human tweak? <a className="text-[var(--sea)] underline" href={`/ask?orderId=${orderId}`}>Ask the owner</a> — design and edge cases only.
      </p>
    </div>
  );
}
