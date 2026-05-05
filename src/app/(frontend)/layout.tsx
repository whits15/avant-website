import { Outfit, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const dmSans = DM_Sans({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${outfit.variable} ${dmSans.variable}`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "@id": "https://www.avantai.ca/#organization",
                        "name": "Avant",
                        "alternateName": "Avant AI",
                        "url": "https://www.avantai.ca",
                        "logo": "https://www.avantai.ca/images/og-default.png",
                        "image": "https://www.avantai.ca/images/og-default.png",
                        "description": "Avant is an AI implementation consultancy for Canadian private equity, venture capital, and family offices. We design Claude-powered workflows that compress diligence, IC prep, LP reporting, and portfolio monitoring — shipped in 2–4 weeks.",
                        "foundingDate": "2026",
                        "founder": {
                            "@type": "Person",
                            "@id": "https://www.avantai.ca/about#patrick",
                            "name": "Patrick Alpaugh"
                        },
                        "areaServed": [
                            { "@type": "Country", "name": "Canada" },
                            { "@type": "AdministrativeArea", "name": "Ontario" }
                        ],
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
                            "Deal sourcing automation",
                            "Due diligence acceleration",
                            "IC memo drafting",
                            "LP reporting automation",
                            "Portfolio monitoring",
                            "AI workflow design",
                            "Contract analytics"
                        ],
                        "serviceType": [
                            "Rapid AI Assessment",
                            "AI Implementation Sprint",
                            "Custom CRM Development",
                            "Monthly AI Retainer"
                        ],
                        "sameAs": [
                            "https://www.linkedin.com/in/patrick-alpaugh/",
                            "https://www.linkedin.com/company/avantai/"
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "@id": "https://www.avantai.ca/#website",
                        "name": "Avant",
                        "url": "https://www.avantai.ca",
                        "inLanguage": "en-CA",
                        "publisher": { "@id": "https://www.avantai.ca/#organization" }
                    }
                ]) }}
            />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
