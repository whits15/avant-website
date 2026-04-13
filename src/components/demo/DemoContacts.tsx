"use client";

import type { DemoData } from "@/lib/demo/types";
import styles from "./DemoContacts.module.css";

interface Props {
  data: DemoData;
  contactLabel: string;
}

const STATUS_STYLES: Record<string, string> = {
  Active: "badgeActive",
  New: "badgeNew",
  "Follow Up": "badgeFollowUp",
  Closed: "badgeClosed",
};

export default function DemoContacts({ data, contactLabel }: Props) {
  return (
    <div className={styles.contacts} data-tour="contacts">
      <header className={styles.header}>
        <h2 className={styles.title}>{contactLabel}</h2>
        <span className={styles.count}>{data.contacts.length} total</span>
      </header>

      {/* Desktop table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Company</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Last Contacted</th>
            </tr>
          </thead>
          <tbody>
            {data.contacts.map((contact, i) => (
              <tr
                key={contact.email}
                className={styles.row}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <td className={styles.td}>
                  <div className={styles.nameCell}>
                    <span className={styles.avatar}>
                      {contact.name.charAt(0)}
                    </span>
                    <div>
                      <span className={styles.name}>{contact.name}</span>
                      <span className={styles.title2}>{contact.title}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>{contact.company}</td>
                <td className={styles.td}>
                  <span
                    className={`${styles.badge} ${styles[STATUS_STYLES[contact.status] || "badgeActive"]}`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className={`${styles.td} ${styles.email}`}>{contact.email}</td>
                <td className={`${styles.td} ${styles.muted}`}>
                  {contact.lastContacted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className={styles.mobileCards}>
        {data.contacts.map((contact) => (
          <div key={contact.email} className={styles.mobileCard}>
            <div className={styles.mobileCardHeader}>
              <span className={styles.avatar}>{contact.name.charAt(0)}</span>
              <div>
                <span className={styles.name}>{contact.name}</span>
                <span className={styles.title2}>{contact.title} at {contact.company}</span>
              </div>
              <span
                className={`${styles.badge} ${styles[STATUS_STYLES[contact.status] || "badgeActive"]}`}
              >
                {contact.status}
              </span>
            </div>
            <div className={styles.mobileCardBody}>
              <span>{contact.email}</span>
              <span className={styles.muted}>{contact.lastContacted}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
