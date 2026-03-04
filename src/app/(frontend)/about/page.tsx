import type { Metadata } from "next";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Differentiators from "@/components/Differentiators";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
    title: "About",
    description:
        "Why Ontario businesses choose Avant for AI implementation. Our approach, process, and what makes us different from big consulting firms.",
};

export default function AboutPage() {
    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <Problem />
            <HowItWorks />
            <Differentiators />
            <FAQ />
            <section className="section" style={{ textAlign: "center" }}>
                <div className="container">
                    <h2 className="section-title" style={{ maxWidth: "none" }}>
                        Ready to get started?
                    </h2>
                    <p
                        className="section-subtitle"
                        style={{ margin: "0 auto var(--space-lg)" }}
                    >
                        Book a free assessment — no strings attached.
                    </p>
                    <a href="/contact" className="btn btn--primary">
                        Book Free Assessment
                    </a>
                </div>
            </section>
        </>
    );
}
