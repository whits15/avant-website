"use client";

import dynamic from "next/dynamic";
import styles from "./AboutHero.module.css";

const OrbitalNetwork = dynamic(() => import("@/components/OrbitalNetwork"), {
    ssr: false,
    loading: () => <div className={styles.orbitalFallback} />,
});

export default function AboutHero() {
    return (
        <section className={styles.hero}>
            <div className={styles.orbital}>
                <OrbitalNetwork />
            </div>

            <div className={`container ${styles.content}`}>
                <p className={styles.label}>About Avant</p>
                <h1 className={styles.headline}>
                    We build AI systems<br />
                    that <em className={styles.accent}>actually</em> work.
                </h1>
                <p className={styles.sub}>
                    No decks. No six-month timelines. Just working AI integrated
                    into your business — built for Ontario companies that move fast.
                </p>
            </div>
        </section>
    );
}
