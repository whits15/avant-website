import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudyHeader from "@/components/CaseStudyHeader";
import styles from "./case-study.module.css";

const CASE_STUDIES = [
    {
        slug: "law-firm-document-automation",
        industry: "Legal",
        headline: "10+ hours/week saved",
        description:
            "Automated document intake and contract review for a mid-size Ontario law firm.",
        situation:
            "A growing law firm was losing billable hours to manual document processing. Intake forms, contract reviews, and client correspondence consumed significant staff time each week.",
        built: "We deployed an AI-powered document processing pipeline that automatically extracts key terms from contracts, routes intake forms to the right team members, and drafts initial correspondence — all integrated with their existing practice management software.",
        outcome:
            "The firm reclaimed over 10 hours per week of billable time, reduced document processing errors by 85%, and improved client response times from days to hours.",
    },
    {
        slug: "professional-services-client-intake",
        industry: "Professional Services",
        headline: "3x faster client onboarding",
        description:
            "Streamlined client intake and qualification for a B2B consulting practice.",
        situation:
            "A professional services firm struggled with a manual client intake process that involved multiple email exchanges, spreadsheet tracking, and inconsistent qualification criteria across team members.",
        built: "We built an intelligent intake system that qualifies leads automatically, collects structured information through a conversational interface, and feeds qualified prospects directly into their CRM with full context — eliminating the back-and-forth.",
        outcome:
            "Client onboarding time dropped from 2 weeks to under 4 days. The team now spends their time on high-value conversations instead of administrative follow-ups.",
    },
    {
        slug: "internal-crm-workflow-automation",
        industry: "Internal",
        headline: "AI-powered operations",
        description:
            "How we built our own AI-driven CRM and workflow automation stack.",
        situation:
            "As a growing AI consultancy, we needed our own systems to reflect the standards we set for clients — automated workflows, intelligent CRM, and seamless data flow between tools.",
        built: "We architected a custom CRM integrated with AI-powered activity logging, automated email sync, calendar intelligence, and project tracking — all connected through a unified API layer that keeps every system in sync.",
        outcome:
            "Our internal operations run with minimal manual overhead. Every client interaction is automatically logged, follow-ups are surfaced proactively, and project status is always current — proving the same approach we deliver to clients.",
    },
];

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const cs = CASE_STUDIES.find((c) => c.slug === slug);

    if (!cs) return { title: "Case Study Not Found" };

    return {
        title: { absolute: `${cs.headline} — ${cs.industry} | Avant` },
        description: cs.description,
        alternates: { canonical: `https://www.avantai.ca/case-studies/${slug}` },
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const cs = CASE_STUDIES.find((c) => c.slug === slug);

    if (!cs) notFound();

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.avantai.ca" },
            { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://www.avantai.ca/case-studies" },
            { "@type": "ListItem", "position": 3, "name": cs.headline, "item": `https://www.avantai.ca/case-studies/${slug}` },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div style={{ height: "var(--nav-height)" }} />

            <CaseStudyHeader
                industry={cs.industry}
                headline={cs.headline}
                description={cs.description}
            />

            <article className={styles.article}>
                <div className={styles.narrow}>
                    <ScrollReveal delay={200}>
                        <div className={styles.section}>
                            <span className={styles.sectionLabel}>
                                The Situation
                            </span>
                            <p className={styles.sectionBody}>
                                {cs.situation}
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={400}>
                        <div className={styles.section}>
                            <span className={styles.sectionLabel}>
                                What We Built
                            </span>
                            <p className={styles.sectionBody}>{cs.built}</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={600}>
                        <div className={styles.section}>
                            <span className={styles.sectionLabel}>
                                The Outcome
                            </span>
                            <p className={styles.sectionBody}>{cs.outcome}</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={800}>
                        <footer className={styles.footer}>
                            <a
                                href="/case-studies"
                                className="btn btn--secondary"
                            >
                                ← All Case Studies
                            </a>
                            <a
                                href="/contact#booking"
                                className="btn btn--primary"
                            >
                                Book Free Assessment
                            </a>
                        </footer>
                    </ScrollReveal>
                </div>
            </article>
        </>
    );
}
