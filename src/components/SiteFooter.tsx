import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-[var(--line)] bg-[var(--ink)] px-5 py-14 text-[var(--sand)] md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl">Meridian</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--sand)]/70">
            Automated brand briefs for founders who want clarity without a six-week agency timeline.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm text-[var(--sand)]/75 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--sand)]/45">Product</p>
            <a href="/#pricing" className="block hover:text-[var(--sand)]">
              Pricing
            </a>
            <a href="/#sample" className="block hover:text-[var(--sand)]">
              Sample kit
            </a>
            <a href="/#how" className="block hover:text-[var(--sand)]">
              How it works
            </a>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--sand)]/45">Support</p>
            <Link href="/ask" className="block hover:text-[var(--sand)]">
              Ask a question
            </Link>
            <Link href="/owner" className="block hover:text-[var(--sand)]">
              Owner inbox
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--sand)]/45">Legal</p>
            <Link href="/privacy" className="block hover:text-[var(--sand)]">
              Privacy
            </Link>
            <Link href="/terms" className="block hover:text-[var(--sand)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-[var(--sand)]/15 pt-6 text-xs text-[var(--sand)]/45">
        © {new Date().getFullYear()} Meridian Briefs. Built to run with minimal operator time.
      </div>
    </footer>
  );
}
