import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.avantai.ca'),
    title: {
        default:
            "Avant | AI Implementation for Canadian PE, VC & Family Offices",
        template: "%s | Avant",
    },
    description:
        "Avant is an AI implementation consultant for Canadian private equity, venture capital, and family offices. We design Claude-powered workflows that compress diligence, IC prep, LP reporting, and portfolio monitoring — shipped in 2–4 weeks.",
    robots: { index: true, follow: true },
    alternates: { canonical: '/' },
    verification: {
        google: 'nTscFUwZvMvOuLbbz4s3ShmHVt_Gh-xNQpZlRENs3n8',
    },
    openGraph: {
        siteName: 'Avant',
        type: 'website',
        locale: 'en_CA',
        images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Avant — AI Implementation for Canadian PE, VC & Family Offices' }],
    },
    twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-CA">
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
