"use client";

import { useReveal } from "@/hooks/useReveal";
import styles from "./Industries.module.css";

const INDUSTRIES = [
    {
        icon: "LF",
        name: "Law Firms",
        sprint: "Client Intake Accelerator",
        desc: "Automate document collection, follow-ups, and conflict checks. Cut intake time by 70%.",
    },
    {
        icon: "AF",
        name: "Accounting Firms",
        sprint: "AI Knowledge Base",
        desc: "Instant access to tax codes, procedures, and client histories. New hires productive in days, not weeks.",
    },
    {
        icon: "HC",
        name: "Healthcare Clinics",
        sprint: "24/7 Support Agent",
        desc: "Handle appointment inquiries, FAQs, and triage around the clock without adding staff.",
    },
    {
        icon: "MF",
        name: "Manufacturing",
        sprint: "HR & Onboarding Automation",
        desc: "Streamline hiring paperwork, safety training, and equipment requests. Onboard in 2 days, not 2 weeks.",
    },
    {
        icon: "FA",
        name: "Financial Advisory",
        sprint: "CRM Intelligence Upgrade",
        desc: "AI lead scoring, automated follow-ups, and deal predictions. 25–30% conversion improvement.",
    },
    {
        icon: "EC",
        name: "Engineering & Consulting",
        sprint: "AI Quick-Win Workshop",
        desc: "Get your billable team using AI for proposals, reports, and project scoping in one session.",
    },
];

export default function Industries() {
    return (
        <section className={`section ${styles.section}`} id="industries">
            <div className="container">
                <p className="section-label">Who We Help</p>
                <h2 className="section-title">
                    Built for the businesses that power Ontario.
                </h2>
                <p className="section-subtitle">
                    We focus on professional services, healthcare, and manufacturing —
                    industries where back-office AI delivers the fastest ROI.
                </p>

                <div className={styles.grid}>
                    {INDUSTRIES.map((ind) => (
                        <div key={ind.name} className={styles.card}>
                            <span className={styles.icon}>{ind.icon}</span>
                            <h3 className={styles.name}>{ind.name}</h3>
                            <p className={styles.desc}>{ind.desc}</p>
                            <span className={styles.sprint}>Best fit: {ind.sprint}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
