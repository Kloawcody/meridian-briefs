import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function TermsPage() {
  return (
    <>
      <SiteNav />
      <main className="surface-wash flex-1 px-5 py-16 md:px-8">
        <article className="mx-auto max-w-2xl space-y-4 text-[var(--muted)]">
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">Terms</h1>
          <p>
            Meridian Briefs delivers digital brand kits after purchase. Kits are provided as-is for business use by the
            purchasing customer.
          </p>
          <p>
            Demo mode is for evaluation and does not create a paid entitlement. Refunds for live purchases are handled
            case-by-case via /ask within 7 days if a kit was not generated due to a platform failure.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
