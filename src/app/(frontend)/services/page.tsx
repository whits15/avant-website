import type { Metadata } from "next";
import Services from "@/components/Services";

export const metadata: Metadata = {
    title: "AI Implementation Services for Ontario Businesses",
    description:
        "AI readiness sessions, implementation sprints, and monthly retainers for Ontario businesses. From free assessment to full AI strategy.",
    alternates: { canonical: '/services' },
};

export default function ServicesPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <h1 className="sr-only">AI Implementation Services for Ontario Businesses</h1>
            <Services />
            <section className="section" style={{ textAlign: "center" }}>
                <div className="container">
                    <h2 className="section-title" style={{ maxWidth: "none" }}>
                        Not sure where to start?
                    </h2>
                    <p
                        className="section-subtitle"
                        style={{ margin: "0 auto var(--space-lg)" }}
                    >
                        Book a free assessment and we&apos;ll recommend the right
                        starting point for your business.
                    </p>
                    <a href="/contact#booking" className="btn btn--primary">
                        Book Free Assessment
                    </a>
                </div>
            </section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.avantai.ca" },
                        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.avantai.ca/services" }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "item": {
                                "@type": "Service",
                                "name": "AI Opportunity Assessment",
                                "description": "A diagnostic call to identify your top three automation opportunities with estimated ROI.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" },
                                "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" },
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CAD", "description": "Free" }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "item": {
                                "@type": "Service",
                                "name": "AI Readiness Session",
                                "description": "Half-day hands-on session where your team leaves with working AI tools and a personalized AI Action Plan.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" },
                                "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" },
                                "offers": { "@type": "Offer", "price": "500", "priceCurrency": "CAD", "description": "$500/person" }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "item": {
                                "@type": "Service",
                                "name": "AI Implementation Sprints",
                                "description": "2-4 week focused engagements that solve one specific workflow problem with a 30-day ROI scorecard.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" },
                                "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" },
                                "offers": { "@type": "Offer", "price": "2500", "priceCurrency": "CAD", "description": "$2,500–$3,500" }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "item": {
                                "@type": "Service",
                                "name": "Monthly AI Retainer",
                                "description": "Fractional Chief AI Officer support with monthly roadmap reviews, performance monitoring, and team training.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" },
                                "areaServed": { "@type": "AdministrativeArea", "name": "Ontario, Canada" },
                                "offers": { "@type": "Offer", "price": "3000", "priceCurrency": "CAD", "description": "$3,000–$5,000/month" }
                            }
                        }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Do we need technical staff to work with Avant?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "No. Avant handles all technical implementation. Your team participates in discovery and training, but no technical expertise is required."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "How quickly will we see ROI from AI implementation?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "ROI is typically visible within the first week of an implementation sprint, with measurable 30-day returns tracked via our ROI scorecard."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "How is Avant different from large consulting firms?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Avant uses flat-fee engagements with working systems delivered in weeks, not months. No open-ended retainers or strategy decks — just deployed AI tools integrated into your workflows."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Can AI integrate with our existing software?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes. Avant integrates with platforms like HubSpot, Salesforce, Pipedrive, QuickBooks, Google Workspace, and more."
                            }
                        }
                    ]
                }) }}
            />
        </>
    );
}
