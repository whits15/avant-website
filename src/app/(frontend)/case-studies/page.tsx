import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudiesHero from "@/components/CaseStudiesHero";
import { BOOKING_URL } from "@/lib/booking";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
    title: "AI Implementation Case Studies — Canadian PE, VC & Family Offices",
    description:
        "Real results from real AI engagements at Canadian private equity, venture capital, and family offices: NDA review automation, deal-team meeting prep, and AI-powered internal operations.",
    alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />

            <CaseStudiesHero />

            <section className={`section ${styles.cta}`}>
                <div className="container">
                    <ScrollReveal>
                        <h2 className={styles.ctaTitle}>
                            Ready to see results like these?
                        </h2>
                        <p className={styles.ctaText}>
                            Book an intro call and we&apos;ll show you
                            exactly where AI can make an impact in your
                            firm.
                        </p>
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary"
                        >
                            Book Intro Call
                        </a>
                    </ScrollReveal>
                </div>
            </section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.avantai.ca" },
                        { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://www.avantai.ca/case-studies" }
                    ]
                }) }}
            />
        </>
    );
}
