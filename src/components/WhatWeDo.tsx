"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./WhatWeDo.module.css";

const DataStream = dynamic(() => import("@/components/DataStream"), {
    ssr: false,
    loading: () => <div className={styles.streamFallback} />,
});

const STEPS = [
    {
        title: "Discover",
        description:
            "We dig into your operations, pain points, and data flows to understand exactly where custom software and AI can create the most impact.",
    },
    {
        title: "Design",
        description:
            "We architect your CRM or application from the ground up — AI-native, secure by default, and shaped around how your team actually works.",
    },
    {
        title: "Deliver",
        description:
            "We build, test, and launch your system with hands-on training. You get production-ready software, not a prototype.",
    },
];

export default function WhatWeDo() {
    return (
        <section className={styles.section}>
            <div className={styles.stream}>
                <DataStream />
            </div>

            <div className={`container ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label">What We Do</p>
                    <h2 className={styles.title}>
                        Discover. Design. Deliver.
                    </h2>
                    <p className={styles.subtitle}>
                        From first conversation to production-ready software —
                        custom-built for how your business actually runs.
                    </p>
                </ScrollReveal>

                <div className={styles.steps}>
                    {STEPS.map((step, i) => (
                        <ScrollReveal key={step.title} delay={200 + i * 200}>
                            <div className={styles.step}>
                                <h3 className={styles.stepTitle}>
                                    {step.title}
                                </h3>
                                <p className={styles.stepDesc}>
                                    {step.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
