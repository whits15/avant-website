import type { Industry } from "./types";

export interface IndustryConfig {
  label: string;
  description: string;
  defaultColors: { primary: string; secondary: string; accent: string };
  dealLabel: string;
  contactLabel: string;
  painPoints: string[];
  pipelineStages: string[];
}

export const INDUSTRY_CONFIG: Record<Industry, IndustryConfig> = {
  "real-estate": {
    label: "Real Estate",
    description: "Listings, showings, and closings",
    defaultColors: {
      primary: "#FFFFFF",
      secondary: "#D4D4D8",
      accent: "#A1A1AA",
    },
    dealLabel: "Properties",
    contactLabel: "Clients",
    painPoints: [
      "Lead follow-up & nurturing",
      "Showing scheduling",
      "Document management",
      "Commission tracking",
      "Market analysis & comps",
      "Client communication",
    ],
    pipelineStages: [
      "New Lead",
      "Showing Scheduled",
      "Offer Submitted",
      "Under Contract",
      "Closed",
    ],
  },
  retail: {
    label: "Retail",
    description: "Orders, inventory, and customers",
    defaultColors: {
      primary: "#FFFFFF",
      secondary: "#D4D4D8",
      accent: "#A1A1AA",
    },
    dealLabel: "Orders",
    contactLabel: "Customers",
    painPoints: [
      "Inventory tracking",
      "Supplier communication",
      "Order fulfillment",
      "Customer retention",
      "Returns & exchanges",
      "Sales forecasting",
    ],
    pipelineStages: [
      "Inquiry",
      "Quote Sent",
      "Order Placed",
      "Fulfillment",
      "Delivered",
    ],
  },
  construction: {
    label: "Construction",
    description: "Bids, projects, and subcontractors",
    defaultColors: {
      primary: "#FFFFFF",
      secondary: "#D4D4D8",
      accent: "#A1A1AA",
    },
    dealLabel: "Projects",
    contactLabel: "Contractors",
    painPoints: [
      "Bid management",
      "Subcontractor scheduling",
      "Change order tracking",
      "Safety compliance docs",
      "Progress reporting",
      "Invoice reconciliation",
    ],
    pipelineStages: [
      "Bid Submitted",
      "Awarded",
      "In Progress",
      "Punch List",
      "Completed",
    ],
  },
};
