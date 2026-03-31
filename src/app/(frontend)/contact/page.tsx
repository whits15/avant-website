import type { Metadata } from "next";
import Contact from "@/components/Contact";
import BookingSection from "@/components/BookingSection";

export const metadata: Metadata = {
    title: "Book a Free AI Assessment",
    description:
        "Book a free AI assessment for your Ontario business. Contact Avant to discuss implementation sprints, AI readiness sessions, and AI strategy.",
    alternates: { canonical: '/contact' },
};

export default function ContactPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <BookingSection />
            <Contact />
        </>
    );
}
