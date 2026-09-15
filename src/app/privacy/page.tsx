import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main className="surface-wash flex-1 px-5 py-16 md:px-8">
        <article className="mx-auto max-w-2xl space-y-4 text-[var(--muted)]">
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">Privacy</h1>
          <p>
            Meridian Briefs collects the information you submit during checkout, intake, and support questions so we can
            deliver your kit and respond when needed.
          </p>
          <p>
            Payment data is processed by Stripe. We do not store card numbers. If email delivery is enabled, Resend sends
            transactional messages on our behalf.
          </p>
          <p>Contact the owner via /ask for data requests.</p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
