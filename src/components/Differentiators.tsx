"use client";

import ScrollReveal from "@/components/ScrollReveal";
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
    return (
        <section className={`section ${styles.section}`}>
            <div className={`container ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label">Why Avant</p>
                    <h2 className="section-title">
                        Built for businesses that build Ontario.
                    </h2>
                    <p className="section-subtitle">
                        We don&apos;t theorize from the sidelines — we build the
                        craft and steer it with you.
                    </p>
                </ScrollReveal>

                <div className={styles.grid}>
                    {ATTRIBUTES.map((attr, i) => (
                        <ScrollReveal key={attr.label} delay={100 + i * 100}>
                            <div className={styles.card}>
                                <span className={styles.cardTag}>{attr.label}</span>
                                <h3 className={styles.cardValue}>{attr.us}</h3>
                                <p className={styles.cardThem}>
                                    <span className={styles.themX} aria-hidden="true">×</span>
                                    {attr.them}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
