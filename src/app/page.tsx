import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { PricingSection } from "@/components/PricingSection";

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="relative min-h-[100svh] overflow-hidden text-[var(--sand)]">
        <div className="hero-atmosphere absolute inset-0" />
        <div className="meridian-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.45))]" />
        <SiteNav />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <p className="rise text-xs uppercase tracking-[0.28em] text-[var(--sand)]/70">Automated brand studio</p>
          <h1 className="rise rise-delay-1 mt-4 max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
            Meridian
          </h1>
          <div className="draw-line mt-6 h-px w-40 bg-[var(--sand)]/50" />
          <p className="rise rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-[var(--sand)]/85 md:text-lg">
            Customers pay once. Meridian writes their positioning, voice, colors, and launch copy automatically. You stay in the loop for design taste and the rare question.
          </p>
          <div className="rise rise-delay-3 mt-8 flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="rounded-sm bg-[var(--foam)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-white"
            >
              Launch the business
            </a>
            <a
              href="#how"
              className="rounded-sm border border-[var(--sand)]/35 px-5 py-3 text-sm text-[var(--sand)] transition hover:border-[var(--sand)]"
            >
              See the machine
            </a>
          </div>
        </div>
      </section>

      <section id="how" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--sea)]">How money flows</p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
            A business loop with almost no operator work.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "They buy",
                body: "Stripe Checkout (or demo mode) takes payment for Starter, Studio, or Agency.",
              },
              {
                step: "02",
                title: "They brief",
                body: "A short intake captures audience, offer, tone, and goals. No meetings.",
              },
              {
                step: "03",
                title: "Meridian delivers",
                body: "AI generates the kit, stores the order, offers download, and emails when Resend is connected.",
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
            Your only recurring jobs: refine the landing design when you want, and answer questions in{" "}
            <Link href="/owner" className="text-[var(--sea)] underline">
              /owner
            </Link>
            .
          </p>
        </div>
      </section>

      <PricingSection />

      <section className="border-t border-[var(--line)] px-5 py-20 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] md:text-4xl">
              Ready to connect real payments?
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              Demo mode works now with no keys. Add Stripe, OpenAI, and Resend when you want live revenue and AI upgrades.
            </p>
          </div>
          <Link href="/ask" className="text-sm text-[var(--sea)] underline">
            Customer question form
          </Link>
        </div>
      </section>
    </main>
  );
}
