"use client";

import { useState, type FormEvent } from "react";
import { useDemoContext } from "./DemoContext";
import { INDUSTRY_CONFIG } from "@/lib/demo/industryConfig";
import type { Industry } from "@/lib/demo/types";
import styles from "./WizardStepInput.module.css";

const INDUSTRIES = Object.entries(INDUSTRY_CONFIG) as [Industry, typeof INDUSTRY_CONFIG[Industry]][];

const INDUSTRY_ICONS: Record<Industry, string> = {
  "real-estate": "M3 21V9l9-6 9 6v12H3Zm2-2h5v-5h4v5h5V10l-7-4.5L5 10v9Z",
  retail: "M4 7V5h16v2H4Zm0 12V11h1V9h2v2h10V9h2v2h1v8H4Zm2-2h12v-4H6v4Zm0 0v-4 4Z",
  construction: "M2 21v-2h2V7.85L7 4l3 3.85V19h4V3h8v16h2v2H2Zm6-2h2v-2H8v2Zm0-4h2v-2H8v2Zm0-4h2V9H8v2Zm10 8h2v-2h-2v2Zm0-4h2v-2h-2v2Zm0-4h2V9h-2v2Zm0-4h2V5h-2v2Z",
};

export default function WizardStepInput() {
  const { state, dispatch } = useDemoContext();
  const [url, setUrl] = useState(state.websiteUrl);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(state.industry);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter your website URL.");
      return;
    }
    if (!selectedIndustry) {
      setError("Please select your industry.");
      return;
    }

    // Set state & advance
    dispatch({ type: "SET_URL", url: url.trim() });
    dispatch({ type: "SET_INDUSTRY", industry: selectedIndustry });
    dispatch({ type: "SET_STEP", step: "questions" });

    // Fire brand extraction in background (non-blocking)
    dispatch({ type: "SET_BRAND_LOADING", loading: true });
    fetch("/api/demo/extract-brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim() }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          dispatch({ type: "SET_BRAND", brand: json.data });
          // Pre-fill company name if extracted
          if (json.data.companyName) {
            dispatch({
              type: "SET_PROFILE",
              companyName: json.data.companyName,
              companySize: state.companySize,
              role: state.role,
            });
          }
        } else {
          dispatch({ type: "SET_BRAND_ERROR" });
        }
      })
      .catch(() => {
        dispatch({ type: "SET_BRAND_ERROR" });
      });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.label}>Interactive Demo</p>
          <h1 className={styles.title}>See Your Custom CRM</h1>
          <p className={styles.subtitle}>
            Enter your website and pick your industry. We&apos;ll build a personalized CRM demo in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className="label" htmlFor="demo-url">
              Your Website URL
            </label>
            <input
              className="input"
              id="demo-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="www.yourcompany.ca"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className="label">Your Industry</label>
            <div className={styles.industryGrid}>
              {INDUSTRIES.map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  className={`${styles.industryCard} ${selectedIndustry === key ? styles.industryCardActive : ""}`}
                  onClick={() => setSelectedIndustry(key)}
                  style={
                    selectedIndustry === key
                      ? { borderColor: config.defaultColors.primary, "--card-accent": config.defaultColors.primary } as React.CSSProperties
                      : undefined
                  }
                >
                  <svg className={styles.industryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={INDUSTRY_ICONS[key]} />
                  </svg>
                  <span className={styles.industryLabel}>{config.label}</span>
                  <span className={styles.industryDesc}>{config.description}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={`btn btn--primary ${styles.submit}`}>
            Build My CRM
          </button>
        </form>

        <p className={styles.fine}>
          Takes about 30 seconds. No credit card required.
        </p>
      </div>
    </div>
  );
}
