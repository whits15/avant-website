import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.avantai.ca'),
    title: {
        default:
            "Avant | AI Implementation & Strategy for Ontario Businesses",
        template: "%s | Avant",
    },
    description:
        "Avant helps Ontario small and medium businesses move from AI curiosity to measurable operational results.",
    robots: { index: true, follow: true },
    alternates: { canonical: '/' },
    openGraph: {
        siteName: 'Avant',
        type: 'website',
        locale: 'en_CA',
        images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Avant — AI Implementation for Ontario Businesses' }],
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
