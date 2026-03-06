import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default:
            "Avant | AI Workshops & Implementation for Ontario Businesses",
        template: "%s | Avant",
    },
    description:
        "Avant helps Ontario small and medium businesses move from AI curiosity to measurable operational results.",
    robots: { index: true, follow: true },
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
