import type { Metadata } from "next";
import Team from "@/components/Team";

export const metadata: Metadata = {
    title: "About Avant — AI Implementation for Canadian PE, VC & Family Offices",
    description:
        "Meet Patrick Alpaugh, Founder & CEO of Avant — an AI implementation consultant for Canadian private equity, venture capital, and family offices. Our approach, process, and what makes us different from big consulting firms.",
    alternates: { canonical: '/about' },
};

export default function AboutPage() {
    return (
        <>
            <Team />
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
                        "@id": "https://www.avantai.ca/about#patrick",
                        "name": "Patrick Alpaugh",
                        "givenName": "Patrick",
                        "familyName": "Alpaugh",
                        "honorificSuffix": "MBA",
                        "jobTitle": "Founder & CEO",
                        "description": "Founder and CEO of Avant, an AI implementation consultancy for Canadian private equity, venture capital, and family offices. Background as an analyst in Canadian PE and VC, and as the operator who introduced an AI-powered inventory counting solution to the largest restaurant groups in Canada.",
                        "image": "https://www.avantai.ca/images/team/patrick_headshot.jpeg",
                        "worksFor": { "@type": "Organization", "@id": "https://www.avantai.ca/#organization" },
                        "url": "https://www.avantai.ca/about",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "London",
                            "addressRegion": "ON",
                            "addressCountry": "CA"
                        },
                        "knowsAbout": [
                            "AI implementation",
                            "Claude enablement",
                            "Private equity",
                            "Venture capital",
                            "Family offices",
                            "Deal-team operations",
                            "AI workflow design"
                        ],
                        "knowsLanguage": "en",
                        "nationality": { "@type": "Country", "name": "Canada" },
                        "sameAs": ["https://www.linkedin.com/in/patrick-alpaugh/"]
                    }
                ]) }}
            />
        </>
    );
}
