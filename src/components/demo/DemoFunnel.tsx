"use client";

import type { DemoData } from "@/lib/demo/types";
import styles from "./DemoFunnel.module.css";

interface Props {
  data: DemoData;
}

export default function DemoFunnel({ data }: Props) {
  // Count deals per stage
  const stageCounts = data.pipelineStages.map((stage) => {
    const deals = data.deals.filter((d) => d.stage === stage);
    const total = deals.reduce((sum, d) => sum + d.value, 0);
    return { stage, count: deals.length, total };
  });

  const maxCount = Math.max(...stageCounts.map((s) => s.count), 1);

  return (
    <div className={styles.funnel}>
      <h3 className={styles.title}>Pipeline Overview</h3>
      <div className={styles.bars}>
        {stageCounts.map((s, i) => (
          <div key={s.stage} className={styles.row}>
            <span className={styles.stage}>{s.stage}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{
                  width: `${(s.count / maxCount) * 100}%`,
                  opacity: 1 - i * 0.15,
                  animationDelay: `${i * 100}ms`,
                }}
              />
            </div>
            <span className={styles.count}>{s.count}</span>
            <span className={styles.total}>
              ${s.total >= 1000000
                ? `${(s.total / 1000000).toFixed(1)}M`
                : s.total >= 1000
                  ? `${(s.total / 1000).toFixed(0)}K`
                  : s.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
