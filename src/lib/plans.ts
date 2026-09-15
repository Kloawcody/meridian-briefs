import type { PlanId } from "./types";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  priceLabel: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
};

export const PLANS: Record<PlanId, Plan> = {
  starter: {
    id: "starter",
    name: "Starter Brief",
    price: 2900,
    priceLabel: "$29",
    blurb: "Positioning, taglines, and voice rules — enough to ship a clearer homepage this week.",
    features: [
      "Positioning statement",
      "5 tagline options",
      "Brand voice do / don't",
      "Instant markdown download",
    ],
  },
  studio: {
    id: "studio",
    name: "Studio Kit",
    price: 7900,
    priceLabel: "$79",
    blurb: "The full automated launch pack founders use before a redesign or product launch.",
    features: [
      "Everything in Starter",
      "Homepage hero copy",
      "Color system with rationale",
      "Naming directions",
      "Social bios",
      "Email delivery when configured",
    ],
    highlighted: true,
  },
  agency: {
    id: "agency",
    name: "Agency Pack",
    price: 14900,
    priceLabel: "$149",
    blurb: "Studio kit plus campaign angles and objection handlers for paid traffic and sales pages.",
    features: [
      "Everything in Studio",
      "6 campaign angles",
      "Objection handlers",
      "Priority generation depth",
    ],
  },
};

export function getPlan(id: string | null | undefined): Plan {
  if (id && id in PLANS) return PLANS[id as PlanId];
  return PLANS.studio;
}
