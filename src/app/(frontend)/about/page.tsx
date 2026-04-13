import type { Metadata } from "next";
import Team from "@/components/Team";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
    title: "About Avant — Ontario AI Implementation Agency",
    description:
        "Why Ontario businesses choose Avant for AI implementation. Our approach, process, and what makes us different from big consulting firms.",
    alternates: { canonical: '/about' },
};

export default function AboutPage() {
    return (
        <>
            <Team />
            <CtaSection />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.avantai.ca" },
                        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.avantai.ca/about" }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Patrick Alpaugh",
                        "jobTitle": "Co-Founder",
                        "worksFor": { "@type": "Organization", "@id": "https://www.avantai.ca/#organization" },
                        "url": "https://www.avantai.ca/about",
                        "sameAs": ["https://www.linkedin.com/in/patrick-alpaugh/"]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Keegan Whitney",
                        "jobTitle": "Co-Founder",
                        "worksFor": { "@type": "Organization", "@id": "https://www.avantai.ca/#organization" },
                        "url": "https://www.avantai.ca/about",
                        "sameAs": ["https://www.linkedin.com/in/keegan-whitney-mba-8b8644217"]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "James Parker",
                        "jobTitle": "Co-Founder",
                        "worksFor": { "@type": "Organization", "@id": "https://www.avantai.ca/#organization" },
                        "url": "https://www.avantai.ca/about",
                        "sameAs": ["https://www.linkedin.com/in/james-parker-mba/"]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Gavan Hanspal",
                        "jobTitle": "Co-Founder",
                        "worksFor": { "@type": "Organization", "@id": "https://www.avantai.ca/#organization" },
                        "url": "https://www.avantai.ca/about",
                        "sameAs": ["https://www.linkedin.com/in/gavan-hanspal/"]
                    }
                ]) }}
            />
        </>
    );
}
