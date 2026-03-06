"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ServiceTimeline.module.css";

/* ── Step data ── */
const STEPS = [
    {
        number: "01",
        title: "Free Assessment",
        description:
            "We audit your current workflows, identify AI-ready processes, and map your biggest time and cost savings — at no cost.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
        cta: { label: "Book Assessment", href: "/contact#booking" },
    },
    {
        number: "02",
        title: "Hands-On Workshops",
        description:
            "Your team learns to use AI tools effectively in live sessions tailored to your industry, with real data and real workflows.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        cta: { label: "View Workshops", href: "/services" },
    },
    {
        number: "03",
        title: "Implementation Sprint",
        description:
            "We build, integrate, and deploy custom AI solutions into your existing systems — then train your team to run them independently.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        cta: { label: "Start Building", href: "/contact#booking" },
    },
];

export default function ServiceTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        /* Step visibility with IntersectionObserver */
        const stepEls = section.querySelectorAll(`.${styles.step}`);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number((entry.target as HTMLElement).dataset.idx);
                        setVisibleSteps((prev) => {
                            const next = [...prev];
                            next[idx] = true;
                            return next;
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        stepEls.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={sectionRef} className={styles.timeline}>
            <div className={styles.steps}>
                {STEPS.map((step, i) => (
                    <div
                        key={step.number}
                        className={`${styles.step} ${visibleSteps[i] ? styles.stepVisible : ""}`}
                        data-idx={i}
                        style={{ transitionDelay: `${i * 200}ms` }}
                    >
                        <div className={styles.card}>
                            <div className={styles.header}>
                                <div className={styles.iconWrap}>{step.icon}</div>
                                <span className={styles.number}>Step {step.number}</span>
                            </div>
                            <h3 className={styles.title}>{step.title}</h3>
                            <p className={styles.description}>{step.description}</p>
                            <a href={step.cta.href} className={styles.link}>
                                {step.cta.label} →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
