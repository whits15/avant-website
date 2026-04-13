"use client";

import { useState } from "react";
import { useDemoContext } from "./DemoContext";
import styles from "./DemoCta.module.css";

const BOOKING_URL = process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL;

export default function DemoCta() {
  const { state, dispatch } = useDemoContext();
  const [dismissed, setDismissed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  function handleExplore() {
    setShowOverlay(false);
  }

  function handleCtaClick(e: React.MouseEvent) {
    e.preventDefault();
    // Track CTA click
    if (state.leadId) {
      fetch("/api/demo/save-lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: state.leadId, ctaClicked: true, tourCompleted: true }),
      }).catch(() => {});
    }
    setShowOverlay(false);
    setShowBooking(true);
  }

  function handleDismissBar() {
    setDismissed(true);
    dispatch({ type: "HIDE_CTA" });
  }

  function handleFloatingCtaClick(e: React.MouseEvent) {
    e.preventDefault();
    if (state.leadId) {
      fetch("/api/demo/save-lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: state.leadId, ctaClicked: true }),
      }).catch(() => {});
    }
    setShowBooking(true);
  }

  return (
    <>
      {/* Full-screen overlay CTA */}
      {showOverlay && (
        <div className={styles.overlay}>
          <div className={styles.card}>
            <div className={styles.divider} />
            <h2 className={styles.headline}>
              Impressed? This took us a few seconds.
            </h2>
            <p className={styles.subheadline}>
              Imagine what we can build after actually understanding your business.
              A 30-minute discovery call is all it takes.
            </p>
            <div className={styles.actions}>
              <button
                className={styles.btnPrimary}
                onClick={handleCtaClick}
              >
                Book a Discovery Call
              </button>
              <button
                className={styles.btnSecondary}
                onClick={handleExplore}
              >
                Keep Exploring
              </button>
            </div>
            <p className={styles.fine}>
              Free. No obligation. You&apos;ll walk away with actionable AI insights either way.
            </p>
          </div>
        </div>
      )}

      {/* Booking modal */}
      {showBooking && (
        <div className={styles.overlay} onClick={() => setShowBooking(false)}>
          <div className={styles.bookingCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.bookingHeader}>
              <h3 className={styles.bookingTitle}>Book a Discovery Call</h3>
              <button
                className={styles.bookingClose}
                onClick={() => setShowBooking(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            {BOOKING_URL ? (
              <iframe
                src={BOOKING_URL}
                className={styles.bookingIframe}
                title="Book an appointment"
                loading="lazy"
              />
            ) : (
              <div className={styles.bookingFallback}>
                <p>Booking calendar is not available right now.</p>
                <a href="/contact" className={styles.btnPrimary}>
                  Contact Us Instead
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Persistent floating bar */}
      {!showOverlay && !showBooking && !dismissed && (
        <div className={styles.floatingBar}>
          <span className={styles.floatingText}>
            Ready to see the real thing?
          </span>
          <button
            className={styles.floatingBtn}
            onClick={handleFloatingCtaClick}
          >
            Book a Discovery Call →
          </button>
          <button
            className={styles.floatingClose}
            onClick={handleDismissBar}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
