"use client";

import type { DemoData } from "@/lib/demo/types";
import styles from "./DemoActivityFeed.module.css";

interface Props {
  data: DemoData;
}

const TYPE_ICONS: Record<string, string> = {
  call: "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2Z",
  email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z",
  meeting: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V8h14v11Z",
  note: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6Zm2 16H8v-2h8v2Zm0-4H8v-2h8v2Zm-3-5V3.5L18.5 9H13Z",
};

export default function DemoActivityFeed({ data }: Props) {
  return (
    <div className={styles.feed}>
      <h3 className={styles.title}>Recent Activity</h3>
      <div className={styles.list}>
        {data.activities.slice(0, 6).map((activity, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.iconWrap}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                <path d={TYPE_ICONS[activity.type] || TYPE_ICONS.note} />
              </svg>
            </div>
            <div className={styles.content}>
              <p className={styles.description}>{activity.description}</p>
              <span className={styles.meta}>
                {activity.contact} &middot; {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
