"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--sand)] md:text-2xl">
          Meridian
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[var(--sand)]/80 md:flex">
          <a href="#how" className="transition hover:text-[var(--sand)]">
            How it works
          </a>
          <a href="#pricing" className="transition hover:text-[var(--sand)]">
            Pricing
          </a>
          <Link href="/ask" className="transition hover:text-[var(--sand)]">
            Ask
          </Link>
          <a
            href="#pricing"
            className="rounded-sm bg-[var(--foam)] px-4 py-2 font-medium text-[var(--ink)] transition hover:bg-white"
          >
            Start selling
          </a>
        </nav>
        <button
          type="button"
          className="text-sm text-[var(--sand)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <div className="mx-5 mb-4 space-y-3 rounded-sm bg-[var(--ink)]/80 p-4 text-[var(--sand)] backdrop-blur md:hidden">
          <a href="#how" onClick={() => setOpen(false)} className="block">
            How it works
          </a>
          <a href="#pricing" onClick={() => setOpen(false)} className="block">
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
