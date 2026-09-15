import { kitToMarkdown } from "./demo-kit";
import type { BrandKit, PlanId } from "./types";

export async function sendKitEmail(opts: {
  to: string;
  businessName: string;
  planId: PlanId;
  kit: BrandKit;
  kitUrl: string;
}) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "Meridian Briefs <onboarding@resend.dev>";
  if (!key) {
    return { sent: false as const, reason: "RESEND_API_KEY not set" };
  }

  const markdown = kitToMarkdown(opts.businessName, opts.planId, opts.kit);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [opts.to],
      subject: `Your Meridian ${opts.planId} brief is ready`,
      text: `Your brand brief for ${opts.businessName} is ready.\n\nOpen it here: ${opts.kitUrl}\n\n---\n\n${markdown}`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return { sent: false as const, reason: body };
  }

  return { sent: true as const };
}

export async function notifyOwnerQuestion(opts: {
  name: string;
  email: string;
  topic: string;
  message: string;
  orderId?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  const owner = process.env.OWNER_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Meridian Briefs <onboarding@resend.dev>";
  if (!key || !owner) {
    return { sent: false as const, reason: "RESEND_API_KEY or OWNER_EMAIL not set" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [owner],
      reply_to: opts.email,
      subject: `Meridian question: ${opts.topic}`,
      text: `From: ${opts.name} <${opts.email}>\nOrder: ${opts.orderId || "n/a"}\n\n${opts.message}`,
    }),
  });

  if (!res.ok) {
    return { sent: false as const, reason: await res.text() };
  }
  return { sent: true as const };
}
