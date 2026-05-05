import type { Metadata } from "next";
import Services from "@/components/Services";
import RapidAssessment from "@/components/RapidAssessment";
import { BOOKING_URL } from "@/lib/booking";

export const metadata: Metadata = {
    title: "AI Implementation Services for Canadian PE, VC & Family Offices",
    description:
        "AI implementation services for Canadian private equity, venture capital, and family offices: rapid AI assessments, 2–4 week implementation sprints, and AI workflow design for deal-team operations.",
    alternates: { canonical: '/services' },
};

export default function ServicesPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <h1 className="sr-only">AI Implementation Services for Canadian PE, VC &amp; Family Offices</h1>
            <RapidAssessment />
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
                        Book an intro call and we&apos;ll recommend the right
                        starting point for your firm.
                    </p>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                        Book Intro Call
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
                                "name": "Rapid AI Assessment",
                                "description": "A 1-2 week engagement: site visit, structured interviews with key team members, and a written report with three to five ranked AI use cases — each with a scoped build estimate and projected ROI.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" },
                                "areaServed": { "@type": "AdministrativeArea", "name": "Canada" }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "item": {
                                "@type": "Service",
                                "name": "AI Opportunity Assessment",
                                "description": "A diagnostic call to identify your top three automation opportunities with estimated ROI.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" },
                                "areaServed": { "@type": "AdministrativeArea", "name": "Canada" }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "item": {
                                "@type": "Service",
                                "name": "AI Readiness Session",
                                "description": "Half-day hands-on session where your team leaves with working AI tools and a personalized AI Action Plan.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" },
                                "areaServed": { "@type": "AdministrativeArea", "name": "Canada" }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "item": {
                                "@type": "Service",
                                "name": "AI Implementation Sprints",
                                "description": "2-4 week focused engagements that solve one specific workflow problem with a 30-day ROI scorecard.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" },
                                "areaServed": { "@type": "AdministrativeArea", "name": "Canada" }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 5,
                            "item": {
                                "@type": "Service",
                                "name": "Monthly AI Retainer",
                                "description": "Fractional Chief AI Officer support with monthly roadmap reviews, performance monitoring, and team training.",
                                "provider": { "@id": "https://www.avantai.ca/#organization" },
                                "areaServed": { "@type": "AdministrativeArea", "name": "Canada" }
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
