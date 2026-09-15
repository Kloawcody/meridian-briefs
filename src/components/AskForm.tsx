"use client";

import { FormEvent, useState } from "react";

export function AskForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        topic: fd.get("topic"),
        message: fd.get("message"),
        orderId: fd.get("orderId") || undefined,
      }),
    });
    setLoading(false);
    setStatus(res.ok ? "sent" : "error");
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto grid max-w-2xl gap-4">
      <label className="grid gap-2 text-sm text-[var(--muted)]">
        Name
        <input name="name" required className="rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none ring-[var(--sea)] focus:ring-2" />
      </label>
      <label className="grid gap-2 text-sm text-[var(--muted)]">
        Email
        <input name="email" type="email" required className="rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none ring-[var(--sea)] focus:ring-2" />
      </label>
      <label className="grid gap-2 text-sm text-[var(--muted)]">
        Topic
        <input name="topic" required placeholder="Color palette tweak, tone question…" className="rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none ring-[var(--sea)] focus:ring-2" />
      </label>
      <label className="grid gap-2 text-sm text-[var(--muted)]">
        Order ID (optional)
        <input name="orderId" className="rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none ring-[var(--sea)] focus:ring-2" />
      </label>
      <label className="grid gap-2 text-sm text-[var(--muted)]">
        Question
        <textarea name="message" required rows={5} className="rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none ring-[var(--sea)] focus:ring-2" />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="rounded-sm bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--sand)] transition hover:bg-[var(--ink-soft)] disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send to owner"}
      </button>
      {status === "sent" ? <p className="text-sm text-[var(--sea)]">Sent. The owner will answer when needed — everything else stays automated.</p> : null}
      {status === "error" ? <p className="text-sm text-red-700">Could not send. Try again.</p> : null}
    </form>
  );
}
