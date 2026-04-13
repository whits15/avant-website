"use client";

import { useEffect } from "react";
import { useDemoContext, getDemoData, getIndustryConfig } from "./DemoContext";
import { INDUSTRY_CONFIG } from "@/lib/demo/industryConfig";
import DemoSidebar from "./DemoSidebar";
import DemoDashboard from "./DemoDashboard";
import DemoPipeline from "./DemoPipeline";
import DemoContacts from "./DemoContacts";
import TourOverlay from "./TourOverlay";
import DemoCta from "./DemoCta";
import styles from "./DemoShell.module.css";

export default function DemoShell() {
  const { state, dispatch } = useDemoContext();

  // Resolve brand colors (extracted or industry defaults)
  const industry = state.industry || "real-estate";
  const config = getIndustryConfig(industry) || INDUSTRY_CONFIG["real-estate"];
  const brand = state.brand;

  const accent = brand?.primaryColor || config.defaultColors.primary;
  const accentBright = brand?.secondaryColor || config.defaultColors.secondary;
  const accentDim = brand?.accentColor || config.defaultColors.accent;

  const data = getDemoData(industry);

  // Inject prospect's company name into 1-2 deals for personalization
  const companyName = state.companyName || brand?.companyName || "Your Company";

  // Auto-start tour after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "TOUR_START" });
    }, 1500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div
      className={styles.shell}
      style={{
        "--demo-accent": accent,
        "--demo-accent-bright": accentBright,
        "--demo-accent-dim": accentDim,
      } as React.CSSProperties}
    >
      <DemoSidebar
        companyName={companyName}
        logoUrl={brand?.logoUrl || null}
        industryLabel={config.label}
      />

      <main className={styles.main} data-demo-main>
        {state.activeView === "dashboard" && (
          <DemoDashboard data={data} companyName={companyName} />
        )}
        {state.activeView === "pipeline" && (
          <DemoPipeline data={data} industryLabel={data.industryLabel} />
        )}
        {state.activeView === "contacts" && (
          <DemoContacts data={data} contactLabel={config.contactLabel} />
        )}
      </main>

      {state.tourActive && <TourOverlay />}
      {state.showCta && <DemoCta />}
    </div>
  );
}
