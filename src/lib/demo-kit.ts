import type { BrandKit, Intake, PlanId } from "./types";

function hashHue(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h % 360;
}

function hsl(h: number, s: number, l: number) {
  return `hsl(${h} ${s}% ${l}%)`;
}

export function buildDemoKit(intake: Intake, planId: PlanId): BrandKit {
  const hue = hashHue(`${intake.businessName}:${intake.industry}`);
  const primary = hsl(hue, 42, 28);
  const secondary = hsl((hue + 28) % 360, 24, 42);
  const accent = hsl((hue + 160) % 360, 48, 46);

  const kit: BrandKit = {
    positioningStatement: `${intake.businessName} helps ${intake.audience} get ${intake.offer} — without the usual ${intake.industry} friction — by leaning on ${intake.differentiator}.`,
    taglines: [
      `${intake.businessName}: clearer from first glance.`,
      `Built for ${intake.audience} who want ${intake.offer}.`,
      `Less noise. More ${intake.industry} signal.`,
      `The ${intake.tone.toLowerCase()} way to ${intake.offer}.`,
      `${intake.businessName} — where ${intake.differentiator.toLowerCase()} becomes the product.`,
    ],
    brandVoice: {
      summary: `Speak like a confident ${intake.tone.toLowerCase()} guide: specific, calm, and commercially sharp.`,
      doList: [
        "Lead with outcomes, not feature dumps",
        "Use concrete nouns from the customer's world",
        "Keep sentences short enough to scan on mobile",
        `Name the audience (${intake.audience}) early`,
      ],
      dontList: [
        "Don't use vague hype ('revolutionary', 'disruptive')",
        "Don't bury the offer under brand poetry",
        "Don't sound generic enough to fit any competitor",
      ],
    },
    namingDirections: [
      `Keep "${intake.businessName}" as the commercial name; use a product line modifier for launches.`,
      `Explore a short verb-led secondary name tied to ${intake.offer}.`,
      `Reserve a more premium sub-brand for the highest-ticket offer.`,
    ],
    colorSystem: {
      primary,
      secondary,
      accent,
      neutrals: ["#0f1412", "#6b736f", "#e8ebe6"],
      rationale: `A grounded ${intake.industry} palette: deep primary for trust, secondary for structure, accent for CTAs and active states.`,
    },
    homepageCopy: {
      headline: `${intake.offer} for ${intake.audience}`,
      subhead: `${intake.businessName} turns ${intake.differentiator.toLowerCase()} into a clear path from first visit to paid action.`,
      primaryCta: "Start your brief",
      secondaryCta: "See how it works",
      proofLine: `Designed for ${intake.industry} teams who are done guessing at messaging.`,
    },
    socialBios: {
      short: `${intake.businessName} — ${intake.offer} for ${intake.audience}.`,
      long: `${intake.businessName} helps ${intake.audience} ${intake.offer}. Differentiator: ${intake.differentiator}. Voice: ${intake.tone}.`,
    },
  };

  if (planId === "agency" || planId === "studio") {
    // studio already has full fields above
  }

  if (planId === "agency") {
    kit.campaignAngles = [
      `Outcome-first: "${intake.offer}" as the only promise on the page.`,
      `Contrast ad: competitor complexity vs ${intake.businessName} clarity.`,
      `Audience mirror: speak ${intake.audience} language in the first 3 seconds.`,
      `Proof stack: case fragments + process transparency.`,
      `Founder note: why ${intake.differentiator} matters now.`,
      `Objection flip: turn the biggest buying fear into a guarantee frame.`,
    ];
    kit.objectionHandlers = [
      `"Too expensive" → Show cost of unclear messaging vs ${kit.homepageCopy.primaryCta.toLowerCase()}.`,
      `"We already have a brand" → Position as a launch/messaging system, not a logo redo.`,
      `"Will this sound like us?" → Voice rules + revision loop with your design notes.`,
      `"How fast?" → Automated delivery in minutes; human questions only when needed.`,
    ];
  }

  if (planId === "starter") {
    return {
      positioningStatement: kit.positioningStatement,
      taglines: kit.taglines,
      brandVoice: kit.brandVoice,
      namingDirections: kit.namingDirections.slice(0, 1),
      colorSystem: kit.colorSystem,
      homepageCopy: {
        headline: kit.homepageCopy.headline,
        subhead: kit.homepageCopy.subhead,
        primaryCta: kit.homepageCopy.primaryCta,
        secondaryCta: kit.homepageCopy.secondaryCta,
        proofLine: kit.homepageCopy.proofLine,
      },
      socialBios: kit.socialBios,
    };
  }

  return kit;
}

export function kitToMarkdown(businessName: string, planId: PlanId, kit: BrandKit) {
  const lines = [
    `# Meridian Brand Brief — ${businessName}`,
    ``,
    `Plan: ${planId}`,
    ``,
    `## Positioning`,
    kit.positioningStatement,
    ``,
    `## Taglines`,
    ...kit.taglines.map((t) => `- ${t}`),
    ``,
    `## Brand voice`,
    kit.brandVoice.summary,
    ``,
    `### Do`,
    ...kit.brandVoice.doList.map((t) => `- ${t}`),
    ``,
    `### Don't`,
    ...kit.brandVoice.dontList.map((t) => `- ${t}`),
    ``,
    `## Naming directions`,
    ...kit.namingDirections.map((t) => `- ${t}`),
    ``,
    `## Color system`,
    `- Primary: ${kit.colorSystem.primary}`,
    `- Secondary: ${kit.colorSystem.secondary}`,
    `- Accent: ${kit.colorSystem.accent}`,
    `- Neutrals: ${kit.colorSystem.neutrals.join(", ")}`,
    ``,
    kit.colorSystem.rationale,
    ``,
    `## Homepage copy`,
    `**Headline:** ${kit.homepageCopy.headline}`,
    `**Subhead:** ${kit.homepageCopy.subhead}`,
    `**Primary CTA:** ${kit.homepageCopy.primaryCta}`,
    `**Secondary CTA:** ${kit.homepageCopy.secondaryCta}`,
    `**Proof:** ${kit.homepageCopy.proofLine}`,
    ``,
    `## Social bios`,
    `**Short:** ${kit.socialBios.short}`,
    `**Long:** ${kit.socialBios.long}`,
  ];

  if (kit.campaignAngles?.length) {
    lines.push("", "## Campaign angles", ...kit.campaignAngles.map((t) => `- ${t}`));
  }
  if (kit.objectionHandlers?.length) {
    lines.push("", "## Objection handlers", ...kit.objectionHandlers.map((t) => `- ${t}`));
  }

  return lines.join("\n");
}
