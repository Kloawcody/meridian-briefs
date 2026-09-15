export function SamplePreview() {
  return (
    <section id="sample" className="px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--sea)]">What customers receive</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
            A kit they can use the same day.
          </h2>
          <p className="mt-4 max-w-md text-[var(--muted)]">
            Not a vague moodboard. Usable positioning, voice rules, color system, homepage copy, and bios — delivered as a clean page plus markdown download.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-[var(--ink)]/85">
            {[
              "Positioning statement tuned to their audience",
              "5 tagline options ready for ads or homepage",
              "Voice do / don't list for consistent writing",
              "Color system with rationale",
              "Homepage hero copy + social bios",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sea)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="kit-preview-shell rounded-sm p-6 text-[var(--sand)] md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--sand)]/55">Sample · Studio kit</p>
          <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
            Harbor Supply Co
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sand)]/80">
            Harbor Supply Co helps weekend hikers get curated trail kits — without endless SKU overwhelm — by leaning on field-tested bundles.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Primary", color: "#1f3d36" },
              { label: "Secondary", color: "#5f7a72" },
              { label: "Accent", color: "#c4a574" },
            ].map((swatch) => (
              <div key={swatch.label}>
                <div className="h-14 rounded-sm border border-white/10" style={{ background: swatch.color }} />
                <p className="mt-2 text-xs text-[var(--sand)]/60">{swatch.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="font-[family-name:var(--font-display)] text-xl">Curated trail kits for weekend hikers</p>
            <p className="mt-2 text-sm text-[var(--sand)]/70">
              Clear path from first visit to paid action — without the usual outdoor-retail noise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
