/* ──────────────────────────────────────────────
   Demo CRM – shared TypeScript types
   ────────────────────────────────────────────── */

// ── Brand extraction ────────────────────────

export interface BrandData {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string | null;
  companyName: string | null;
}

// ── Industry enum ───────────────────────────

export const DEMO_INDUSTRIES = [
  "real-estate",
  "retail",
  "construction",
] as const;

export type Industry = (typeof DEMO_INDUSTRIES)[number];

// ── Wizard / config ─────────────────────────

export interface DemoConfig {
  websiteUrl: string;
  companyName: string;
  industry: Industry;
  brand: BrandData;
}

// ── Pre-generated sample data ───────────────

export interface DemoKpi {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "flat";
}

export interface DemoDeal {
  id: string;
  company: string;
  contact: string;
  value: number;
  stage: string;
  daysInStage: number;
}

export interface DemoContact {
  name: string;
  company: string;
  title: string;
  email: string;
  status: string;
  lastContacted: string;
}

export interface DemoActivity {
  type: "call" | "email" | "meeting" | "note";
  description: string;
  contact: string;
  time: string;
}

export interface DemoData {
  kpis: DemoKpi[];
  deals: DemoDeal[];
  contacts: DemoContact[];
  activities: DemoActivity[];
  pipelineStages: string[];
  industryLabel: string;
}

// ── Lead persistence ────────────────────────

export interface DemoLeadPayload {
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  websiteUrl: string;
  industry: Industry;
  companySize: string;
  role: string;
  painPoints: string[];
  additionalNotes?: string;
  brandPrimaryColor?: string;
  brandLogoUrl?: string | null;
}

// ── Tour ────────────────────────────────────

export interface TourStep {
  target: string;        // data-tour attribute value
  title: string;
  description: string;
  view?: "dashboard" | "pipeline" | "contacts";
}

// ── Demo state (useReducer) ─────────────────

export interface DemoState {
  step: "input" | "questions" | "demo";
  brand: BrandData | null;
  brandLoading: boolean;
  brandError: boolean;
  websiteUrl: string;
  companyName: string;
  industry: Industry | null;
  companySize: string;
  role: string;
  painPoints: string[];
  additionalNotes: string;
  leadId: string | null;
  activeView: "dashboard" | "pipeline" | "contacts";
  tourStep: number;
  tourActive: boolean;
  showCta: boolean;
  deals: DemoDeal[];
}

export type DemoAction =
  | { type: "SET_STEP"; step: DemoState["step"] }
  | { type: "SET_URL"; url: string }
  | { type: "SET_INDUSTRY"; industry: Industry }
  | { type: "SET_BRAND_LOADING"; loading: boolean }
  | { type: "SET_BRAND"; brand: BrandData }
  | { type: "SET_BRAND_ERROR" }
  | { type: "SET_PROFILE"; companyName: string; companySize: string; role: string }
  | { type: "SET_PAIN_POINTS"; painPoints: string[]; notes: string }
  | { type: "SET_LEAD_ID"; leadId: string }
  | { type: "SET_ACTIVE_VIEW"; view: DemoState["activeView"] }
  | { type: "SET_DEALS"; deals: DemoDeal[] }
  | { type: "TOUR_START" }
  | { type: "TOUR_NEXT" }
  | { type: "TOUR_PREV" }
  | { type: "TOUR_END" }
  | { type: "SHOW_CTA" }
  | { type: "HIDE_CTA" };
