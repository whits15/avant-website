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
        </>
    );
}
