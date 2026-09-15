export type PlanId = "starter" | "studio" | "agency";

export type Intake = {
  businessName: string;
  website?: string;
  industry: string;
  audience: string;
  offer: string;
  differentiator: string;
  tone: string;
  goals: string;
  constraints?: string;
  email: string;
};

export type BrandKit = {
  positioningStatement: string;
  taglines: string[];
  brandVoice: {
    summary: string;
    doList: string[];
    dontList: string[];
  };
  namingDirections: string[];
  colorSystem: {
    primary: string;
    secondary: string;
    accent: string;
    neutrals: string[];
    rationale: string;
  };
  homepageCopy: {
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    proofLine: string;
  };
  socialBios: {
    short: string;
    long: string;
  };
  campaignAngles?: string[];
  objectionHandlers?: string[];
};

export type OrderRecord = {
  id: string;
  planId: PlanId;
  email: string;
  status: "paid" | "generated" | "demo";
  createdAt: string;
  intake?: Intake;
  kit?: BrandKit;
  stripeSessionId?: string;
};

export type QuestionRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  orderId?: string;
  status: "new" | "answered";
};
