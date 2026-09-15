import { isDemoMode } from "@/lib/stripe";

export function StatusChip() {
  const demo = isDemoMode();
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs tracking-[0.04em] ${
        demo
          ? "bg-[var(--foam)] text-[var(--sea)]"
          : "bg-[color-mix(in_oklab,var(--sea)_18%,white)] text-[var(--ink)]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${demo ? "bg-[var(--gold)]" : "bg-[var(--sea)]"}`} />
      {demo ? "Demo mode · ready to preview" : "Live payments enabled"}
    </div>
  );
}
