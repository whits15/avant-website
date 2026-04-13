import styles from "./Services.module.css";

const STAGES = [
    {
        label: "Discover",
        title: "Discovery & Scoping",
        timeline: "1–2 weeks",
        description:
            "We learn your business inside and out — your workflows, pain points, data landscape, and goals. You get a detailed project scope and architecture proposal, so you know exactly what we're building and why.",
        cta: "Book a Discovery Call",
        ctaHref: "/contact#booking",
    },
    {
        label: "Design",
        title: "System Architecture & UX",
        timeline: "2–3 weeks",
        description:
            "We design your CRM or application from the ground up — data models, AI integration points, user flows, and security architecture. You review interactive prototypes before a single line of production code is written.",
        cta: "Learn More",
        ctaHref: "/contact#booking",
    },
    {
        label: "Build",
        title: "Development & AI Integration",
        timeline: "4–8 weeks",
        description:
            "We build your system with production-grade code, integrate AI where it creates real value — smart automation, intelligent search, predictive insights — and deploy on secure infrastructure you control.",
        cta: "Get a Proposal",
        ctaHref: "/contact#booking",
    },
    {
        label: "Launch",
        title: "Deployment & Training",
        timeline: "1–2 weeks",
        description:
            "We launch your system, train your team hands-on, and ensure everything runs smoothly in production. Post-launch support included to handle any adjustments as your team gets up to speed.",
        cta: "Start a Project",
        ctaHref: "/contact#booking",
    },
];

export default function Services() {
    return (
        <section className={`section ${styles.services}`} id="services">
            <div className="container">
                <p className="section-label">Services</p>
                <h2 className="section-title">
                    From concept to production.
                </h2>
                <p className="section-subtitle">
                    A structured process for building custom software — scoped, designed,
                    and delivered.
                </p>

                <div className={styles.ladder}>
                    {STAGES.map((stage, i) => (
                        <div key={stage.label} className={styles.stage}>
                            <div className={styles.stageIndicator}>
                                <span className={styles.stageNumber}>{i + 1}</span>
                                {i < STAGES.length - 1 && (
                                    <div className={styles.stageLine} />
                                )}
                            </div>

                            <div className={`card ${styles.stageCard}`}>
                                <div className={styles.stageHeader}>
                                    <span className={styles.stageLabel}>{stage.label}</span>
                                    <div>
                                        <h3 className={styles.stageTitle}>{stage.title}</h3>
                                        <div className={styles.stageMeta}>
                                            <span className={styles.stageTimeline}>
                                                {stage.timeline}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className={styles.stageDesc}>{stage.description}</p>

                                <a href={stage.ctaHref} className="btn btn--secondary">
                                    {stage.cta}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
