"use client";

import type { DemoData } from "@/lib/demo/types";
import styles from "./DemoHotDeals.module.css";

interface Props {
  data: DemoData;
}

export default function DemoHotDeals({ data }: Props) {
  const topDeals = [...data.deals]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const maxValue = topDeals[0]?.value || 1;

  return (
    <div className={styles.hotDeals}>
      <h3 className={styles.title}>Hot Deals</h3>
      <div className={styles.list}>
        {topDeals.map((deal, i) => (
          <div key={deal.id} className={styles.row}>
            <div className={styles.info}>
              <span className={styles.company}>{deal.company}</span>
              <span className={styles.contact}>{deal.contact}</span>
            </div>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{
                  width: `${(deal.value / maxValue) * 100}%`,
                  animationDelay: `${i * 80}ms`,
                }}
              />
            </div>
            <span className={styles.value}>
              ${deal.value >= 1000000
                ? `${(deal.value / 1000000).toFixed(1)}M`
                : deal.value >= 1000
                  ? `${(deal.value / 1000).toFixed(0)}K`
                  : deal.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
