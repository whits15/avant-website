"use client";

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './Hero.module.css';
import { BOOKING_URL } from '@/lib/booking';

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
          AI implementation consulting for Canadian private equity, venture capital, and family offices.
          Simple workflows. Claude enablement. Working systems shipped in 2–4 weeks.
        </p>

        <div className={styles.actionsBlock}>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
            Book Intro Call
          </a>
          <Link href="/case-studies" className={styles.btnSecondary}>
            View Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
