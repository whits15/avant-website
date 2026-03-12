"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Problem.module.css";

const STATS = [
    { value: "78%", label: "of SMBs say AI isn't relevant to them" },
    { value: "5–10h", label: "wasted per employee per week on tasks AI can handle" },
    { value: "$0", label: "ROI from the basic ChatGPT prompts most teams use" },
];

/* ── Animated stat value ── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [display, setDisplay] = useState(value);
    const animated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated.current) {
                    animated.current = true;
                    animate();
                    observer.unobserve(el);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    function animate() {
        const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
        if (!match) return;

        const prefix = match[1];
        const target = parseInt(match[2], 10);
        const suffix = match[3];
        const duration = 1400;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(target * eased);
            setDisplay(`${prefix}${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    return (
        <div className={styles.stat} ref={ref}>
            <span className={styles.statValue}>{display}</span>
            <span className={styles.statLabel}>{label}</span>
        </div>
    );
}

export default function Problem() {
    return (
        <section className={`section ${styles.problem}`} id="problem">
            <div className={`container ${styles.content}`}>
                <ScrollReveal>
                    <p className="section-label">The Gap</p>
                    <h2 className="section-title">
                        Your team is paying for AI they&apos;re not using.
                    </h2>
                    <p className="section-subtitle">
                        Most Ontario businesses are stuck asking ChatGPT basic questions while
                        paying for AI features in their CRM, email, and office tools that sit
                        untouched. The low-hanging fruit of AI isn&apos;t even on their radar.
                    </p>
                </ScrollReveal>

                <div className={styles.stats}>
                    {STATS.map((s, i) => (
                        <ScrollReveal key={s.label} delay={i * 150}>
                            <AnimatedStat value={s.value} label={s.label} />
                        </ScrollReveal>
                    ))}
                </div>

                <div className={styles.contrast}>
                    <ScrollReveal delay={100}>
                        <div className={styles.contrastCard}>
                            <h3 className={styles.contrastTitle}>What they offer</h3>
                            <ul className={styles.contrastList}>
                                <li>6-month strategy decks</li>
                                <li>$50K+ consulting fees</li>
                                <li>Generic AI recommendations</li>
                                <li>Teams of juniors</li>
                            </ul>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={250}>
                        <div className={`${styles.contrastCard} ${styles.contrastCardGold}`}>
                            <h3 className={styles.contrastTitle}>What you actually need</h3>
                            <ul className={styles.contrastList}>
                                <li>Working tools in 4 hours</li>
                                <li>ROI within weeks</li>
                                <li>AI tailored to your workflows</li>
                                <li>Training your team can actually use</li>
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
