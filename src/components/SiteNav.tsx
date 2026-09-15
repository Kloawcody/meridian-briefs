"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const ink = onHome ? "text-[var(--sand)]" : "text-[var(--ink)]";
  const muted = onHome ? "text-[var(--sand)]/80" : "text-[var(--muted)]";
  const cta = onHome
    ? "bg-[var(--foam)] text-[var(--ink)] hover:bg-white"
    : "bg-[var(--ink)] text-[var(--sand)] hover:bg-[var(--ink-soft)]";

  return (
    <header className={`no-print z-30 ${onHome ? "absolute inset-x-0 top-0" : "relative border-b border-[var(--line)] bg-[var(--background)]"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className={`font-[family-name:var(--font-display)] text-xl tracking-tight md:text-2xl ${ink}`}>
          Meridian
        </Link>
        <nav className={`hidden items-center gap-8 text-sm md:flex ${muted}`}>
          <a href={onHome ? "#how" : "/#how"} className={`transition ${onHome ? "hover:text-[var(--sand)]" : "hover:text-[var(--ink)]"}`}>
            How it works
          </a>
          <a href={onHome ? "#sample" : "/#sample"} className={`transition ${onHome ? "hover:text-[var(--sand)]" : "hover:text-[var(--ink)]"}`}>
            Sample
          </a>
          <a href={onHome ? "#pricing" : "/#pricing"} className={`transition ${onHome ? "hover:text-[var(--sand)]" : "hover:text-[var(--ink)]"}`}>
            Pricing
          </a>
          <Link href="/ask" className={`transition ${onHome ? "hover:text-[var(--sand)]" : "hover:text-[var(--ink)]"}`}>
            Ask
          </Link>
          <a href={onHome ? "#pricing" : "/#pricing"} className={`rounded-sm px-4 py-2 font-medium transition ${cta}`}>
            Buy a kit
          </a>
        </nav>
        <button type="button" className={`text-sm md:hidden ${ink}`} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <div className={`mx-5 mb-4 space-y-3 rounded-sm p-4 backdrop-blur md:hidden ${onHome ? "bg-[var(--ink)]/80 text-[var(--sand)]" : "border border-[var(--line)] bg-white text-[var(--ink)]"}`}>
          <a href={onHome ? "#how" : "/#how"} onClick={() => setOpen(false)} className="block">
            How it works
          </a>
          <a href={onHome ? "#sample" : "/#sample"} onClick={() => setOpen(false)} className="block">
            Sample
          </a>
          <a href={onHome ? "#pricing" : "/#pricing"} onClick={() => setOpen(false)} className="block">
            Pricing
          </a>
          <Link href="/ask" onClick={() => setOpen(false)} className="block">
            Ask
          </Link>
        </div>
      ) : null}
    </header>
  );
}
