"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./FAQ.module.css";

const FAQS = [
    {
        q: "What is an AI implementation consultant for Canadian private equity?",
        a: "An AI implementation consultant designs and ships working AI workflows inside a fund's real process — deal sourcing, diligence, IC prep, LP reporting, portfolio monitoring — instead of selling a strategy deck or a SaaS subscription. Avant is built specifically for Canadian PE, VC, and family offices, with engagements that ship in 2–4 weeks.",
    },
    {
        q: "Why hire Avant if we can just use Claude or ChatGPT ourselves?",
        a: "You can — and you should. The gap isn't access to the model, it's knowing where to point it inside your process. We compress your learning curve from months to weeks and guarantee successful application of AI in your Firm.",
    },
    {
        q: "How do you keep our data secure with AI?",
        a: "We prioritize local and private AI deployments — your data stays on your infrastructure, not on third-party servers. When cloud AI is the right fit, we implement strict access controls, encryption/local redaction, and data isolation so nothing leaks.",
    },
    {
        q: "How long does AI implementation take for a Canadian VC or PE firm?",
        a: "Most engagements produce working output in 2–4 weeks. We scope tight, ship fast, and iterate against actual usage — not a six-month roadmap that stalls in committee. A Rapid AI Assessment runs 1–2 weeks and ends with three to five ranked use cases scoped for build.",
    },
    {
        q: "What kind of work do you actually do?",
        a: "Deal sourcing and screening, IC memo drafting, diligence acceleration, LP reporting, portfolio monitoring, internal research workflows — anywhere Claude or Chat GPT can compress hours of analyst time into minutes. We also take on select work in custom CRMs, law firm AI, and ESG reporting where there's clear fit.",
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
