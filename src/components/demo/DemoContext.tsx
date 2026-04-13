"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import type { DemoState, DemoAction, DemoData } from "@/lib/demo/types";
import { INDUSTRY_CONFIG } from "@/lib/demo/industryConfig";
import { realEstateData } from "@/lib/demo/data/realEstate";
import { retailData } from "@/lib/demo/data/retail";
import { constructionData } from "@/lib/demo/data/construction";

// ── Data lookup ─────────────────────────────

const DATA_MAP: Record<string, DemoData> = {
  "real-estate": realEstateData,
  retail: retailData,
  construction: constructionData,
};

export function getDemoData(industry: string): DemoData {
  return DATA_MAP[industry] ?? realEstateData;
}

export function getIndustryConfig(industry: string) {
  return INDUSTRY_CONFIG[industry as keyof typeof INDUSTRY_CONFIG];
}

// ── Reducer ─────────────────────────────────

const TOUR_STEP_COUNT = 6;

export const initialState: DemoState = {
  step: "input",
  brand: null,
  brandLoading: false,
  brandError: false,
  websiteUrl: "",
  companyName: "",
  industry: null,
  companySize: "",
  role: "",
  painPoints: [],
  additionalNotes: "",
  leadId: null,
  activeView: "dashboard",
  tourStep: 0,
  tourActive: false,
  showCta: false,
  deals: [],
};

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_URL":
      return { ...state, websiteUrl: action.url };
    case "SET_INDUSTRY":
      return {
        ...state,
        industry: action.industry,
        deals: getDemoData(action.industry).deals,
      };
    case "SET_BRAND_LOADING":
      return { ...state, brandLoading: action.loading };
    case "SET_BRAND":
      return { ...state, brand: action.brand, brandLoading: false, brandError: false };
    case "SET_BRAND_ERROR":
      return { ...state, brandLoading: false, brandError: true };
    case "SET_PROFILE":
      return {
        ...state,
        companyName: action.companyName,
        companySize: action.companySize,
        role: action.role,
      };
    case "SET_PAIN_POINTS":
      return { ...state, painPoints: action.painPoints, additionalNotes: action.notes };
    case "SET_LEAD_ID":
      return { ...state, leadId: action.leadId };
    case "SET_ACTIVE_VIEW":
      return { ...state, activeView: action.view };
    case "SET_DEALS":
      return { ...state, deals: action.deals };
    case "TOUR_START":
      return { ...state, tourActive: true, tourStep: 1 };
    case "TOUR_NEXT":
      if (state.tourStep >= TOUR_STEP_COUNT) {
        return { ...state, tourActive: false, tourStep: 0, showCta: true };
      }
      return { ...state, tourStep: state.tourStep + 1 };
    case "TOUR_PREV":
      return { ...state, tourStep: Math.max(1, state.tourStep - 1) };
    case "TOUR_END":
      return { ...state, tourActive: false, tourStep: 0, showCta: true };
    case "SHOW_CTA":
      return { ...state, showCta: true };
    case "HIDE_CTA":
      return { ...state, showCta: false };
    default:
      return state;
  }
}

// ── Context ─────────────────────────────────

interface DemoContextValue {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, initialState);
  return (
    <DemoContext.Provider value={{ state, dispatch }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoContext must be used within DemoProvider");
  return ctx;
}
