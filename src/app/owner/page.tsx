import { OwnerInbox } from "@/components/OwnerInbox";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function OwnerPage() {
  return (
    <>
      <SiteNav />
      <main className="surface-wash flex-1 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--sea)]">Owner console</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
            Questions inbox
          </h1>
          <p className="mt-4 text-[var(--muted)]">
            This is your only required ops surface. Sales, generation, and delivery run without you.
          </p>
        </div>
        <OwnerInbox />
      </main>
      <SiteFooter />
    </>
  );
}
