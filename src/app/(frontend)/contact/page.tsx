import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Book a free AI assessment for your Ontario business. Contact Avant to discuss workshops, implementation sprints, and AI strategy.",
};

export default function ContactPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <Contact />
        </>
    );
}
