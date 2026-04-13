import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudiesHero from "@/components/CaseStudiesHero";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
    title: "AI Implementation Case Studies — Ontario Business Results",
    description:
        "Real results from real AI engagements. See how Avant helps Ontario businesses save time, reduce errors, and streamline operations.",
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
