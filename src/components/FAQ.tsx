"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./FAQ.module.css";

const FAQS = [
    {
        q: "Why build a custom CRM instead of using Salesforce or HubSpot?",
        a: "Off-the-shelf CRMs force you to work around their limitations. A custom CRM is built around your actual sales process, with AI that automates the specific tasks your team wastes time on — not generic features you'll never use.",
    },
    {
        q: "How do you keep our data secure with AI?",
        a: "We prioritize local and private AI deployments — your data stays on your infrastructure, not on third-party servers. When cloud AI is the right fit, we implement strict access controls, encryption/local redaction, and data isolation so nothing leaks.",
    },
    {
        q: "How long does a custom build take?",
        a: "Most projects go from discovery to a working product in 2–6 weeks. We scope aggressively to get a real system in your hands fast, then iterate based on real usage.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <>
        <section className={`section ${styles.section}`} id="faq">
            <div className={`container container--narrow ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label">FAQ</p>
                    <h2 className="section-title">Common questions.</h2>
                </ScrollReveal>

                <div className={styles.list}>
                    {FAQS.map((faq, i) => (
                        <ScrollReveal key={i} delay={i * 60}>
                            <button
                                className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}
                                onClick={() => setOpen(open === i ? null : i)}
                                aria-expanded={open === i}
                            >
                                <div className={styles.question}>
                                    <span>{faq.q}</span>
                                    <span className={styles.icon} aria-hidden="true">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        >
                                            <line x1="9" y1="3" x2="9" y2="15" className={styles.iconVert} />
                                            <line x1="3" y1="9" x2="15" y2="9" />
                                        </svg>
                                    </span>
                                </div>
                                <div className={styles.answerWrap} aria-hidden={open !== i}>
                                    <p className={styles.answer}>{faq.a}</p>
                                </div>
                            </button>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": FAQS.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
                }))
            }) }}
        />
        </>
    );
}
