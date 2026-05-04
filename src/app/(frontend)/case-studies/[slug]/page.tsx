import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudyHeader from "@/components/CaseStudyHeader";
import { BOOKING_URL } from "@/lib/booking";
import styles from "./case-study.module.css";

const CASE_STUDIES = [
    {
        slug: "pe-nda-review-automation",
        industry: "Private Equity",
        headline: "Partner time back, every NDA",
        description:
            "Contract analytics for a Canadian private equity firm — clause-by-clause first-pass NDA mark-ups in the partner's voice, deployed in two weeks.",
        situation:
            "A Canadian private equity firm was bottlenecked on partner availability for NDA review. Every incoming teaser stalled until the partner could redline the NDA personally — the firm's most strategic resource consumed by a scaled, pattern-based task at the front of the diligence cycle. The deal pipeline paid the price.",
        built: "We deployed an NDA Review Agent inside the firm's secure Claude environment, trained on its NDA reference corpus and the partner's negotiated positions. The agent runs clause-by-clause contract analytics against the firm's standard positions and outputs a tracked-changes Word mark-up in house style — ready for partner review in minutes. Associates invoke the skill on incoming NDAs without touching code or prompts. A 30-day calibration loop folds the partner's edits back into the reference set after every live deal, converging the agent's output on the partner's voice over time.",
        outcome:
            "First-pass mark-ups now match the partner's preferred positions on the majority of material clauses, and the partner's per-NDA review compresses from a full read-and-redline to a quick approval pass — targeting 50% partner time saved on every NDA. The agent stands as the firm's entry point into a broader AI-enabled diligence stack: CIM triage, IC memo drafting, and portfolio reporting on the roadmap.",
    },
    {
        slug: "vc-meeting-prep",
        industry: "Venture Capital",
        headline: "2 hours saved every morning",
        description:
            "Automated daily meeting prep for a venture capital General Partner.",
        situation:
            "A General Partner at a venture firm was spending 15–30 minutes manually preparing for each of his 3–8 daily meetings — reading prior email threads, checking LinkedIn, searching company news, and recalling what was promised. The process was inconsistent, time-consuming, and depended entirely on him remembering to do it before each call.",
        built: "We built an automated briefing system that runs every weekday at 6 AM, reads his calendar, researches each external attendee and their company across the public web, and delivers a single cited email summarizing who he's meeting, what their company is doing, and any recent news or signals — all before he opens his laptop.",
        outcome:
            "Daily prep time dropped from up to two hours to zero. The GP now walks into every meeting with current, sourced context, and his team has adopted the same system to standardize how the firm prepares for founder conversations.",
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
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--primary"
                            >
                                Book Intro Call
                            </a>
                        </footer>
                    </ScrollReveal>
                </div>
            </article>
        </>
    );
}
