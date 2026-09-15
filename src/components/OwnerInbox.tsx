"use client";

import { useEffect, useState } from "react";
import type { QuestionRecord } from "@/lib/types";

export function OwnerInbox() {
  const [password, setPassword] = useState("");
  const [questions, setQuestions] = useState<QuestionRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState(false);

  async function load(pw = password) {
    setError(null);
    const res = await fetch("/api/owner/questions", {
      headers: { "x-owner-password": pw },
    });
    if (!res.ok) {
      setError("Wrong password");
      setAuthed(false);
      return;
    }
    const data = await res.json();
    setQuestions(data.questions);
    setAuthed(true);
  }

  async function markAnswered(id: string) {
    await fetch("/api/owner/questions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-owner-password": password,
      },
      body: JSON.stringify({ id, status: "answered" }),
    });
    await load();
  }

  useEffect(() => {
    // no auto-auth
  }, []);

  if (!authed) {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <label className="grid gap-2 text-sm text-[var(--muted)]">
          Owner password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-sm border border-[var(--line)] bg-white px-3 py-3 text-[var(--ink)] outline-none ring-[var(--sea)] focus:ring-2"
          />
        </label>
        <button
          type="button"
          onClick={() => load()}
          className="rounded-sm bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--sand)]"
        >
          Open inbox
        </button>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <p className="text-xs text-[var(--muted)]">Default local password: meridian-owner (set OWNER_PASSWORD in production).</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button type="button" onClick={() => load()} className="text-sm text-[var(--sea)] underline">
        Refresh
      </button>
      {questions.length === 0 ? (
        <p className="text-[var(--muted)]">No questions yet. The business is running on its own.</p>
      ) : (
        questions.map((q) => (
          <article key={q.id} className="border-t border-[var(--line)] pt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">{q.topic}</h3>
              <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{q.status}</span>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {q.name} · {q.email}
              {q.orderId ? ` · order ${q.orderId}` : ""}
            </p>
            <p className="mt-4 whitespace-pre-wrap text-[var(--ink)]/90">{q.message}</p>
            {q.status === "new" ? (
              <button
                type="button"
                onClick={() => markAnswered(q.id)}
                className="mt-4 text-sm text-[var(--sea)] underline"
              >
                Mark answered
              </button>
            ) : null}
          </article>
        ))
      )}
    </div>
  );
}
