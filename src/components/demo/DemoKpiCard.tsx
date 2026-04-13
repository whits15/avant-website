"use client";

import { useEffect, useRef, useState } from "react";
import type { DemoKpi } from "@/lib/demo/types";
import styles from "./DemoKpiCard.module.css";

interface Props {
  kpi: DemoKpi;
  delay?: number;
}

export default function DemoKpiCard({ kpi, delay = 0 }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const trendColor =
    kpi.trend === "up"
      ? "var(--ls-success)"
      : kpi.trend === "down"
        ? "var(--ls-error)"
        : "var(--ls-slate)";

  const trendArrow = kpi.trend === "up" ? "↑" : kpi.trend === "down" ? "↓" : "–";

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.label}>{kpi.label}</span>
      <span className={styles.value}>{kpi.value}</span>
      <span className={styles.change} style={{ color: trendColor }}>
        {trendArrow} {kpi.change}
      </span>
    </div>
  );
}
