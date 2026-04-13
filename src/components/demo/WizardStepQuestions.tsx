"use client";

import { useState, type FormEvent } from "react";
import { useDemoContext, getIndustryConfig } from "./DemoContext";
import { INDUSTRY_CONFIG } from "@/lib/demo/industryConfig";
import { generateColorSet } from "@/lib/demo/brandUtils";
import styles from "./WizardStepQuestions.module.css";

export default function WizardStepQuestions() {
  const { state, dispatch } = useDemoContext();
  const industryConfig = state.industry ? getIndustryConfig(state.industry) : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState(state.companyName || "");
  const [companySize, setCompanySize] = useState("");
  const [role, setRole] = useState("");
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  // Pre-fill company name from brand extraction when it arrives
  const brandName = state.brand?.companyName;
  if (brandName && !companyName) {
    setCompanyName(brandName);
  }

  function togglePainPoint(point: string) {
    setPainPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point],
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError("Please enter a valid email."); return; }

    setStatus("saving");

    // If brand data hasn't arrived yet, use industry defaults
    let brand = state.brand;
    if (!brand || !brand.primaryColor) {
      const defaults = state.industry
        ? INDUSTRY_CONFIG[state.industry].defaultColors
        : INDUSTRY_CONFIG["real-estate"].defaultColors;
      brand = {
        ...generateColorSet(defaults.primary),
        logoUrl: null,
        companyName: companyName || null,
      };
      dispatch({ type: "SET_BRAND", brand });
    }

    // Update profile in state
    dispatch({ type: "SET_PROFILE", companyName: companyName.trim(), companySize, role });
    dispatch({ type: "SET_PAIN_POINTS", painPoints, notes });

    // Save lead
    try {
      const res = await fetch("/api/demo/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          companyName: companyName.trim(),
          websiteUrl: state.websiteUrl,
          industry: state.industry,
          companySize,
          role,
          painPoints,
          additionalNotes: notes,
          brandPrimaryColor: brand?.primaryColor || null,
          brandLogoUrl: brand?.logoUrl || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        dispatch({ type: "SET_LEAD_ID", leadId: json.leadId });
      }
    } catch {
      // Non-blocking — demo still works if lead save fails
      console.error("Failed to save demo lead");
    }

    // Transition to demo
    dispatch({ type: "SET_STEP", step: "demo" });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.steps}>
            <span className={styles.stepDot} />
            <span className={`${styles.stepDot} ${styles.stepDotActive}`} />
          </div>
          <h2 className={styles.title}>Tell us about your business</h2>
          <p className={styles.subtitle}>
            We&apos;ll use this to customize your CRM demo experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Contact Info */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Your Contact Info</legend>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className="label" htmlFor="demo-name">Full Name *</label>
                <input className="input" id="demo-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" />
              </div>
              <div className={styles.field}>
                <label className="label" htmlFor="demo-email">Email *</label>
                <input className="input" id="demo-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.ca" />
              </div>
            </div>
            <div className={styles.field}>
              <label className="label" htmlFor="demo-phone">Phone <span className={styles.optional}>(optional)</span></label>
              <input className="input" id="demo-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(416) 555-0123" />
            </div>
          </fieldset>

          {/* Company Details */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Company Details</legend>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className="label" htmlFor="demo-company">Company Name</label>
                <input className="input" id="demo-company" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your company" />
              </div>
              <div className={styles.field}>
                <label className="label" htmlFor="demo-size">Company Size</label>
                <select className="input" id="demo-size" value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
                  <option value="">Select range</option>
                  <option value="1-10">1–10</option>
                  <option value="11-25">11–25</option>
                  <option value="26-50">26–50</option>
                  <option value="51-100">51–100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label className="label" htmlFor="demo-role">Your Role</label>
              <select className="input" id="demo-role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select role</option>
                <option value="Owner/Founder">Owner / Founder</option>
                <option value="VP/Director">VP / Director</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
                <option value="IT/Technology">IT / Technology</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </fieldset>

          {/* Pain Points */}
          {industryConfig && (
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>What takes too much of your team&apos;s time?</legend>
              <div className={styles.checkboxGrid}>
                {industryConfig.painPoints.map((point) => (
                  <label key={point} className={`${styles.checkbox} ${painPoints.includes(point) ? styles.checkboxActive : ""}`}>
                    <input
                      type="checkbox"
                      checked={painPoints.includes(point)}
                      onChange={() => togglePainPoint(point)}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxLabel}>{point}</span>
                  </label>
                ))}
              </div>
              <div className={styles.field}>
                <label className="label" htmlFor="demo-notes">
                  Anything else? <span className={styles.optional}>(optional)</span>
                </label>
                <input className="input" id="demo-notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us more..." />
              </div>
            </fieldset>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" className="btn btn--secondary" onClick={() => dispatch({ type: "SET_STEP", step: "input" })}>
              Back
            </button>
            <button type="submit" className="btn btn--primary" disabled={status === "saving"}>
              {status === "saving" ? "Building your CRM..." : "Show Me My CRM"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
