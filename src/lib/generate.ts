import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { buildDemoKit } from "./demo-kit";
import type { BrandKit, Intake, PlanId } from "./types";

const brandKitSchema = z.object({
  positioningStatement: z.string(),
  taglines: z.array(z.string()).min(3).max(7),
  brandVoice: z.object({
    summary: z.string(),
    doList: z.array(z.string()).min(3).max(6),
    dontList: z.array(z.string()).min(3).max(6),
  }),
  namingDirections: z.array(z.string()).min(1).max(5),
  colorSystem: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    neutrals: z.array(z.string()).min(2).max(4),
    rationale: z.string(),
  }),
  homepageCopy: z.object({
    headline: z.string(),
    subhead: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
    proofLine: z.string(),
  }),
  socialBios: z.object({
    short: z.string(),
    long: z.string(),
  }),
  campaignAngles: z.array(z.string()).optional(),
  objectionHandlers: z.array(z.string()).optional(),
});

function hasAiKey() {
  return Boolean(process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY);
}

export async function generateBrandKit(intake: Intake, planId: PlanId): Promise<BrandKit> {
  if (!hasAiKey()) {
    return buildDemoKit(intake, planId);
  }

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || process.env.AI_GATEWAY_URL,
  });

  const depth =
    planId === "agency"
      ? "Include 6 campaignAngles and 4 objectionHandlers."
      : planId === "studio"
        ? "Include full homepage, color system, naming, and social bios. Omit campaignAngles and objectionHandlers."
        : "Focus on positioning, taglines, and voice. Keep namingDirections to 1 item. Still fill all schema fields with strong content.";

  try {
    const { object } = await generateObject({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
      schema: brandKitSchema,
      prompt: `You are Meridian, an automated brand strategist. Create a commercially sharp brand brief.

Business name: ${intake.businessName}
Website: ${intake.website || "n/a"}
Industry: ${intake.industry}
Audience: ${intake.audience}
Offer: ${intake.offer}
Differentiator: ${intake.differentiator}
Tone: ${intake.tone}
Goals: ${intake.goals}
Constraints: ${intake.constraints || "none"}
Plan: ${planId}
${depth}

Rules:
- No generic startup clichés
- Specific to this business
- Color values as hex or hsl
- Homepage copy must be usable as-is`,
    });

    return object as BrandKit;
  } catch {
    return buildDemoKit(intake, planId);
  }
}
