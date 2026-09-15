import { AskForm } from "@/components/AskForm";

export default function AskPage() {
  return (
    <main className="flex-1 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--sea)]">Human exceptions only</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
          Ask about design or edge cases.
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Everything else is automated. Use this when a customer needs your taste or judgment.
        </p>
      </div>
      <AskForm />
    </main>
  );
}
