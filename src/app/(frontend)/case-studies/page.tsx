import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
    title: "Case Studies",
    description:
        "Real results from real AI engagements. See how Avant helps Ontario businesses save time, reduce errors, and streamline operations.",
    alternates: { canonical: '/case-studies' },
};

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

export default function CaseStudiesPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />

            <section className={`section ${styles.hero}`}>
                <div className="container">
                    <ScrollReveal>
                        <p className="section-label">Our Work</p>
                        <h1 className="section-title">Case Studies</h1>
                        <p className="section-subtitle">
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

            <section className={`section ${styles.cta}`}>
                <div className="container">
                    <ScrollReveal>
                        <h2 className={styles.ctaTitle}>
                            Ready to see results like these?
                        </h2>
                        <p className={styles.ctaText}>
                            Book a free assessment and we&apos;ll show you
                            exactly where AI can make an impact in your
                            business.
                        </p>
                        <a
                            href="/contact#booking"
                            className="btn btn--primary"
                        >
                            Book Free Assessment
                        </a>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
