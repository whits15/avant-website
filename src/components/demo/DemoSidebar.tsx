"use client";

import { useDemoContext } from "./DemoContext";
import styles from "./DemoSidebar.module.css";

interface DemoSidebarProps {
  companyName: string;
  logoUrl: string | null;
  industryLabel: string;
}

const NAV_ITEMS = [
  { key: "dashboard" as const, label: "Dashboard", icon: "M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1Zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1Zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1Zm-1-18v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1Z" },
  { key: "pipeline" as const,  label: "Pipeline",  icon: "M3 3h4v18H3V3Zm7 0h4v18h-4V3Zm7 0h4v18h-4V3Z" },
  { key: "contacts" as const,  label: "Contacts",  icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" },
];

export default function DemoSidebar({ companyName, logoUrl }: DemoSidebarProps) {
  const { state, dispatch } = useDemoContext();

  const initial = companyName.charAt(0).toUpperCase();

  return (
    <aside className={styles.sidebar} data-tour="sidebar">
      <div className={styles.brand}>
        {logoUrl ? (
          <img src={logoUrl} alt={companyName} className={styles.logo} />
        ) : (
          <div className={styles.logoFallback}>{initial}</div>
        )}
        <span className={styles.companyName}>{companyName}</span>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ key, label, icon }) => (
          <button
            key={key}
            className={`${styles.navItem} ${state.activeView === key ? styles.navItemActive : ""}`}
            onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", view: key })}
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d={icon} />
            </svg>
            <span className={styles.navLabel}>{label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.footer}>
        <span className={styles.footerText}>Powered by</span>
        <span className={styles.footerBrand}>Avant</span>
      </div>
    </aside>
  );
}
