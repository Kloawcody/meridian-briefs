import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PricingSection } from "@/components/PricingSection";
import { StatusChip } from "@/components/StatusChip";
import { SamplePreview } from "@/components/SamplePreview";

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="relative min-h-[100svh] overflow-hidden text-[var(--sand)]">
        <div className="hero-atmosphere absolute inset-0" />
        <div className="meridian-grid absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.12),rgba(0,0,0,0.5))]" />
        <SiteNav />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <div className="rise">
            <StatusChip />
          </div>
          <h1 className="rise rise-delay-1 mt-5 max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-[0.92] md:text-7xl lg:text-8xl">
            Meridian
          </h1>
          <div className="draw-line mt-6 h-px w-44 bg-[var(--sand)]/55" />
          <p className="rise rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-[var(--sand)]/88 md:text-lg">
            A brand studio that sells and delivers without you. Customers pay, fill a short brief, and receive positioning, voice, color, and launch copy in minutes.
          </p>
          <div className="rise rise-delay-3 mt-8 flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="rounded-sm bg-[var(--foam)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-white"
            >
              Start selling now
            </a>
            <a
              href="#sample"
              className="rounded-sm border border-[var(--sand)]/35 px-5 py-3 text-sm text-[var(--sand)] transition hover:border-[var(--sand)]"
            >
              Preview a kit
            </a>
          </div>
        </div>
      </section>

      <section id="how" className="surface-wash px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--sea)]">How it runs</p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
            Built for revenue with almost no operator time.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Customer buys",
                body: "Stripe Checkout takes payment for Starter, Studio, or Agency. Demo mode works instantly with no keys.",
              },
              {
                step: "02",
                title: "Customer briefs",
                body: "A 2-minute intake captures audience, offer, tone, and goals. No calls. No back-and-forth.",
              },
              {
                step: "03",
                title: "Meridian delivers",
                body: "The kit generates automatically, unlocks download, and emails when Resend is connected.",
              },
            ].map((item) => (
              <li key={item.step} className="border-t border-[var(--line)] pt-5">
                <p className="text-xs tracking-[0.18em] text-[var(--sea)]">{item.step}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-2xl text-[var(--muted)]">
            Your remaining jobs: refine design when you want, and answer rare questions in{" "}
            <Link href="/owner" className="text-[var(--sea)] underline">
              /owner
            </Link>
            .
          </p>
        </div>
      </section>

      <SamplePreview />
      <PricingSection />

      <section className="border-t border-[var(--line)] px-5 py-20 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] md:text-4xl">
              Ready for live revenue?
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              Preview everything in demo mode now. When you&apos;re ready, add Stripe, OpenAI, and Resend — then share your link.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/ask" className="text-[var(--sea)] underline">
              Customer questions
            </Link>
            <Link href="/owner" className="text-[var(--sea)] underline">
              Owner inbox
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
