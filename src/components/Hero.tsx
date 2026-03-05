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
          We help established Ontario businesses deploy reliable, secure, and profitable Artificial Intelligence systems.
          Real ROI. No hype.
        </p>

        <div className={styles.actionsBlock}>
          <Link href="/contact#booking" className={styles.btnPrimary}>
            Book Free Assessment
          </Link>
          <Link href="/services" className={styles.btnSecondary}>
            View Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
