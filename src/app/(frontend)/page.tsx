import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceTimeline from "@/components/ServiceTimeline";
import StatCard from "@/components/StatCard";
import TiltCard from "@/components/TiltCard";
import styles from "./home.module.css";

const PREVIEW_STATS = [
    {
        value: "78%",
        label: "Blind Spot",
        description: "of SMBs say AI isn't relevant — while competitors adopt it",
        icon: "alert",
        ring: 78,
    },
    {
        value: "10h",
        label: "Wasted Weekly",
        description: "per employee on tasks that AI handles in minutes",
        icon: "clock",
        ring: 62,
    },
    {
        value: "$0",
        label: "Zero ROI",
        description: "from basic ChatGPT prompts most teams rely on",
        icon: "trending-down",
        ring: 5,
    },
];

const PREVIEW_INDUSTRIES = [
    { icon: "LF", name: "Law Firms", desc: "Automate document collection, follow-ups, and conflict checks." },
    { icon: "HC", name: "Healthcare Clinics", desc: "Handle appointment inquiries and FAQs around the clock." },
    { icon: "MF", name: "Manufacturing", desc: "Streamline hiring paperwork, safety training, and onboarding." },
];

export default function Home() {
    return (
        <>
            <Hero />

            {/* Problem Preview */}
            <section className={`section ${styles.preview}`}>
                <div className="container">
                    <ScrollReveal>
                        <h2 className="section-title">
                            Your team is paying for AI they&apos;re not using.
                        </h2>
                    </ScrollReveal>
                    <div className={styles.stats}>
                        {PREVIEW_STATS.map((s, i) => (
                            <StatCard
                                key={s.label}
                                value={s.value}
                                label={s.label}
                                description={s.description}
                                icon={s.icon}
                                ring={s.ring}
                                delay={i * 200}
                            />
                        ))}
                    </div>
                    <ScrollReveal delay={600}>
                        <a href="/about" className="btn btn--secondary" style={{ marginTop: "var(--space-lg)" }}>
                            Learn Why →
                        </a>
                    </ScrollReveal>
                </div>
            </section>

            {/* Services Preview */}
            <section className={`section ${styles.preview}`}>
                <div className="container">
                    <ScrollReveal>
                        <p className="section-label">Services</p>
                        <h2 className="section-title">
                            A clear path from curiosity to results.
                        </h2>
                        <p className="section-subtitle">
                            From a free assessment to hands-on workshops to full implementation
                            sprints — choose the right starting point for your team.
                        </p>
                    </ScrollReveal>
                    <ServiceTimeline />
                </div>
            </section>

            {/* Industries Preview */}
            <section className={`section ${styles.preview}`}>
                <div className="container">
                    <ScrollReveal>
                        <p className="section-label">Who We Help</p>
                        <h2 className="section-title">
                            Built for the businesses that power Ontario.
                        </h2>
                    </ScrollReveal>
                    <div className={styles.industryGrid}>
                        {PREVIEW_INDUSTRIES.map((ind, i) => (
                            <ScrollReveal key={ind.name} delay={i * 150}>
                                <TiltCard className={`card ${styles.industryCard}`}>
                                    <span className={styles.industryIcon}>{ind.icon}</span>
                                    <h3 className={styles.industryName}>{ind.name}</h3>
                                    <p className={styles.industryDesc}>{ind.desc}</p>
                                </TiltCard>
                            </ScrollReveal>
                        ))}
                    </div>
                    <ScrollReveal delay={500}>
                        <a href="/industries" className="btn btn--secondary" style={{ marginTop: "var(--space-lg)" }}>
                            See All Industries →
                        </a>
                    </ScrollReveal>
                </div>
            </section>

            {/* Final CTA */}
            <section className={`section ${styles.ctaSection}`}>
                <div className="container" style={{ textAlign: "center" }}>
                    <ScrollReveal>
                        <h2 className="section-title" style={{ maxWidth: "none" }}>
                            Ready to put AI to work?
                        </h2>
                        <p className="section-subtitle" style={{ margin: "0 auto var(--space-lg)" }}>
                            Start with a free, no-obligation assessment. We&apos;ll map your
                            biggest opportunities and show you exactly where AI fits.
                        </p>
                        <a href="/contact#booking" className="btn btn--primary">
                            Book Free Assessment
                        </a>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
