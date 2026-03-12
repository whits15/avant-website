"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./HowItWorks.module.css";

const DataStream = dynamic(() => import("@/components/DataStream"), {
    ssr: false,
    loading: () => <div className={styles.streamFallback} />,
});

const STEPS = [
    {
        number: "01",
        title: "Assessment",
        description:
            "Free 30–45 minute call. We map your tools, workflows, and biggest time sinks. You get a one-page AI Opportunity Summary — no strings attached.",
        outcome: "Know exactly where AI fits in your business",
    },
    {
        number: "02",
        title: "Workshop",
        description:
            "Half-day, hands-on session. Your team leaves with working automations built on your real systems — not slides about what AI could do someday.",
        outcome: "Working tools from day one",
    },
    {
        number: "03",
        title: "Sprint & Scale",
        description:
            "Focused 2–4 week sprints targeting your highest-ROI workflow. Then ongoing retainer support to expand, optimize, and stay ahead.",
        outcome: "Measurable ROI within weeks",
    },
];

export default function HowItWorks() {
    return (
        <section className={styles.section} id="how-it-works">
            <div className={styles.stream}>
                <DataStream />
            </div>

            <div className={`container ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label">How It Works</p>
                    <h2 className={styles.title}>Three steps. Real results.</h2>
                    <p className={styles.subtitle}>
                        Every engagement starts with understanding your business. We never
                        sell a solution without diagnosing the problem first.
                    </p>
                </ScrollReveal>

                <div className={styles.timeline}>
                    {STEPS.map((step, i) => (
                        <ScrollReveal key={step.number} delay={200 + i * 250}>
                            <div className={styles.step}>
                                <div className={styles.stepLeft}>
                                    <span className={styles.stepNumber}>{step.number}</span>
                                </div>
                                <div className={styles.stepLine}>
                                    <span className={styles.stepDot} />
                                    {i < STEPS.length - 1 && (
                                        <span className={styles.stepConnector} />
                                    )}
                                </div>
                                <div className={styles.stepRight}>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDesc}>{step.description}</p>
                                    <div className={styles.outcome}>
                                        <span className={styles.outcomeIcon}>→</span>
                                        <span className={styles.outcomeText}>{step.outcome}</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
