"use client";

import { useReveal } from "@/hooks/useReveal";
import styles from "./Differentiators.module.css";

const ATTRIBUTES = [
    { label: "Time to ROI", us: "Weeks", them: "Months" },
    { label: "Implementation", us: "Working tools, day one", them: "Strategy decks" },
    { label: "Investment", us: "Starts free", them: "$50K+" },
    { label: "Focus", us: "Your actual workflows", them: "Generic frameworks" },
    { label: "Commitment", us: "Pay per sprint", them: "6-month contracts" },
    { label: "Location", us: "Ontario-focused", them: "Global, generic" },
];

export default function Differentiators() {
    const { ref, revealed } = useReveal();

    return (
        <section className={`section ${styles.section}`}>
            <div className={`container reveal ${revealed ? "revealed" : ""}`} ref={ref}>
                <p className="section-label">Why Avant</p>
                <h2 className="section-title">
                    Built for businesses that build Ontario.
                </h2>
                <p className="section-subtitle">
                    Avant — Go Forward. We don&apos;t
                    theorize from the sidelines; we build the craft and steer it
                    with you.
                </p>

                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <span />
                        <span className={styles.headerUs}>Avant</span>
                        <span className={styles.headerThem}>Big Firms</span>
                    </div>
                    {ATTRIBUTES.map((attr) => (
                        <div key={attr.label} className={styles.tableRow}>
                            <span className={styles.rowLabel}>{attr.label}</span>
                            <span className={styles.rowUs}>{attr.us}</span>
                            <span className={styles.rowThem}>{attr.them}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
