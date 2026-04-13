"use client";

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const GlobeBackground = dynamic(() => import('./GlobeBackground'), {
  ssr: false,
  loading: () => <div className={styles.heroGlow} />,
});

export default function Hero() {
  return (
    <section className={styles.heroWrapper} aria-label="Introduction">
      <GlobeBackground />
      <div className={styles.heroContent}>
        <h1 className={styles.headline}>
          Go Forward.
        </h1>
        <p className={styles.subheadline}>
          We design custom CRMs and build software with secure, intelligent AI — tailored to how your business actually works.
          Real systems. No hype.
        </p>

        <div className={styles.actionsBlock}>
          <Link href="/contact#booking" className={styles.btnPrimary}>
            Book Free Assessment
          </Link>
          <Link href="/case-studies" className={styles.btnSecondary}>
            View Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
