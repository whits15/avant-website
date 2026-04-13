"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./WhoWeAre.module.css";

const OrbitalNetwork = dynamic(() => import("@/components/OrbitalNetwork"), {
    ssr: false,
    loading: () => <div className={styles.orbitalFallback} />,
});

const OFFERINGS = [
    {
        tag: "CRM Design",
        title: "Custom CRM Systems",
        description:
            "CRMs designed from scratch with AI baked in — smart lead scoring, automated follow-ups, intelligent reporting. Built around how your team actually works, not the other way around.",
    },
    {
        tag: "Software",
        title: "Secure AI Software",
        description:
            "Custom-built applications with local or private AI integrations. Your data stays on your infrastructure — no third-party exposure. Purpose-built for your specific workflows and security requirements.",
    },
];

export default function WhoWeAre() {
    return (
        <section className={styles.section}>
            <div className={styles.orbital}>
                <OrbitalNetwork />
            </div>

            <div className={`container ${styles.content}`}>
                <div className={styles.left}>
                    <ScrollReveal>
                        <p className="section-label">Who We Are</p>
                        <h2 className={styles.title}>
                            We build software that thinks.
                        </h2>
                        <p className={styles.subtitle}>
                            Custom CRMs. Purpose-built software. AI that runs on
                            your terms — secure, local, and tailored to your
                            workflows.
                        </p>
                    </ScrollReveal>

                    <div className={styles.offerings}>
                        {OFFERINGS.map((o, i) => (
                            <ScrollReveal key={o.tag} delay={200 + i * 200}>
                                <div className={styles.offering}>
                                    <span className={styles.offeringTag}>
                                        {o.tag}
                                    </span>
                                    <h3 className={styles.offeringTitle}>
                                        {o.title}
                                    </h3>
                                    <p className={styles.offeringDesc}>
                                        {o.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={700}>
                        <a
                            href="/case-studies"
                            className="btn btn--secondary"
                        >
                            View Case Studies →
                        </a>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
