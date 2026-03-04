import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroWrapper} aria-label="Introduction">
      <div className={styles.heroGlow}></div>
      <div className={styles.heroContent}>
        <div className={styles.label}>AI Strategy & Execution</div>
        <h1 className={styles.headline}>
          Go Forward.
        </h1>
        <p className={styles.subheadline}>
          We help established Ontario businesses deploy reliable, secure, and profitable Artificial Intelligence systems.
          Real ROI. No hype.
        </p>

        <div className={styles.actionsBlock}>
          <Link href="/contact" className={styles.btnPrimary}>
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
