"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "@/app/(frontend)/case-studies/[slug]/case-study.module.css";

const OrbitalNetwork = dynamic(() => import("@/components/OrbitalNetwork"), {
    ssr: false,
    loading: () => <div className={styles.orbitalFallback} />,
});

interface CaseStudyHeaderProps {
    industry: string;
    headline: string;
    description: string;
}

export default function CaseStudyHeader({
    industry,
    headline,
    description,
}: CaseStudyHeaderProps) {
    return (
        <section className={styles.header}>
            <div className={styles.orbital}>
                <OrbitalNetwork />
            </div>
            <div className={styles.headerContent}>
                <ScrollReveal>
                    <a href="/case-studies" className={styles.back}>
                        ← Back to Case Studies
                    </a>
                    <span className={styles.industry}>{industry}</span>
                    <h1 className={styles.title}>{headline}</h1>
                    <p className={styles.description}>{description}</p>
                </ScrollReveal>
            </div>
        </section>
    );
}
