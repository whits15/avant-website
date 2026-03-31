import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Differentiators from "@/components/Differentiators";
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
            <AboutHero />
            <Problem />
            <HowItWorks />
            <Differentiators />
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
        </>
    );
}
