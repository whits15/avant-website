"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "@/app/(frontend)/home.module.css";

const MorphBlob = dynamic(() => import("@/components/MorphBlob"), {
    ssr: false,
    loading: () => <div className={styles.ctaBlobFallback} />,
});

export default function CtaSection() {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaBlob}>
                <MorphBlob />
            </div>
            <div className={`container ${styles.ctaContent}`}>
                <ScrollReveal>
                    <h2 className={styles.ctaTitle}>
                        Ready for software<br />that actually fits?
                    </h2>
                    <p className={styles.ctaSub}>
                        Custom CRMs and AI-powered tools — built around
                        your workflow, not the other way around.
                        Let&apos;s talk about what you need.
                    </p>
                    <div className={styles.ctaButtons}>
                        <a
                            href="/contact#booking"
                            className={styles.ctaPrimary}
                        >
                            Start a Conversation
                        </a>
                        <a
                            href="/case-studies"
                            className={styles.ctaPrimary}
                        >
                            View Case Studies →
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
