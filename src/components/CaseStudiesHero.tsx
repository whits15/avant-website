"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "@/app/(frontend)/case-studies/case-studies.module.css";

const DataStream = dynamic(() => import("@/components/DataStream"), {
    ssr: false,
    loading: () => <div className={styles.streamFallback} />,
});

const CASE_STUDIES = [
    {
        slug: "law-firm-document-automation",
        industry: "Legal",
        headline: "10+ hours/week saved",
        description:
            "Automated document intake and contract review for a mid-size Ontario law firm.",
    },
    {
        slug: "professional-services-client-intake",
        industry: "Professional Services",
        headline: "3x faster client onboarding",
        description:
            "Streamlined client intake and qualification for a B2B consulting practice.",
    },
    {
        slug: "internal-crm-workflow-automation",
        industry: "Internal",
        headline: "AI-powered operations",
        description:
            "How we built our own AI-driven CRM and workflow automation stack.",
    },
];

export default function CaseStudiesHero() {
    return (
        <section className={`section ${styles.hero}`}>
            <div className={styles.stream}>
                <DataStream />
            </div>

            <div className={`container ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label" style={{ margin: "0 auto" }}>Our Work</p>
                    <h1 className="section-title">Case Studies</h1>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        Real results from real engagements. Here&apos;s what
                        happens when AI meets operations.
                    </p>
                </ScrollReveal>

                <div className={styles.grid}>
                    {CASE_STUDIES.map((cs, i) => (
                        <ScrollReveal key={cs.slug} delay={200 + i * 150}>
                            <Link
                                href={`/case-studies/${cs.slug}`}
                                className={styles.card}
                            >
                                <span className={styles.industry}>
                                    {cs.industry}
                                </span>
                                <h2 className={styles.headline}>
                                    {cs.headline}
                                </h2>
                                <p className={styles.description}>
                                    {cs.description}
                                </p>
                                <span className={styles.arrow}>
                                    Read more →
                                </span>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
