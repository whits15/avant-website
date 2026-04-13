"use client";

import type { DemoData } from "@/lib/demo/types";
import DemoKpiCard from "./DemoKpiCard";
import DemoFunnel from "./DemoFunnel";
import DemoHotDeals from "./DemoHotDeals";
import DemoActivityFeed from "./DemoActivityFeed";
import styles from "./DemoDashboard.module.css";

interface Props {
  data: DemoData;
  companyName: string;
}

export default function DemoDashboard({ data, companyName }: Props) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>
          {greeting}, {companyName}
        </h1>
        <p className={styles.date}>
          {new Date().toLocaleDateString("en-CA", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className={styles.kpiGrid} data-tour="kpis">
        {data.kpis.map((kpi, i) => (
          <DemoKpiCard key={kpi.label} kpi={kpi} delay={i * 100} />
        ))}
      </div>

      <div className={styles.middleRow}>
        <div className={styles.funnelWrapper} data-tour="funnel">
          <DemoFunnel data={data} />
        </div>
        <div className={styles.hotDealsWrapper}>
          <DemoHotDeals data={data} />
        </div>
      </div>

      <div data-tour="activity">
        <DemoActivityFeed data={data} />
      </div>
    </div>
  );
}
