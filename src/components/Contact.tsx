"use client";

import { useState, FormEvent } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        employees: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
        "idle"
    );

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("sent");
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    employees: "",
                    message: "",
                });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <section className={`section ${styles.section}`} id="contact">
            <div className="container">
                <div className={styles.grid}>
                    {/* Left: copy + Calendly */}
                    <div className={styles.left}>
                        <p className="section-label">Get Started</p>
                        <h2 className="section-title">
                            Book your free AI Opportunity Assessment.
                        </h2>
                        <p className="section-subtitle">
                            30–45 minutes. No obligation. You&apos;ll get a one-page AI
                            Opportunity Summary with your top three automation opportunities
                            and estimated ROI — whether or not you work with us.
                        </p>

                        <div className={styles.calendly}>
                            <p className={styles.calendlyLabel}>
                                Prefer to book directly? Schedule a call:
                            </p>
                            {/* Replace YOUR_CALENDLY_URL with your actual Calendly link */}
                            <a
                                href="https://calendly.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--secondary"
                            >
                                Open Calendly →
                            </a>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.detail}>
                                <span className={styles.detailIcon}>@</span>
                                <span>hello@avant.ca</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.detailIcon}>•</span>
                                <span>Ontario, Canada</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: form */}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h3 className={styles.formTitle}>Or send us a message</h3>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className="label" htmlFor="name">
                                    Name *
                                </label>
                                <input
                                    className="input"
                                    id="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className={styles.field}>
                                <label className="label" htmlFor="email">
                                    Email *
                                </label>
                                <input
                                    className="input"
                                    id="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className="label" htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    className="input"
                                    id="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    placeholder="(416) 555-0123"
                                />
                            </div>
                            <div className={styles.field}>
                                <label className="label" htmlFor="company">
                                    Company
                                </label>
                                <input
                                    className="input"
                                    id="company"
                                    type="text"
                                    value={form.company}
                                    onChange={(e) =>
                                        setForm({ ...form, company: e.target.value })
                                    }
                                    placeholder="Your company name"
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className="label" htmlFor="employees">
                                Number of employees
                            </label>
                            <select
                                className="input"
                                id="employees"
                                value={form.employees}
                                onChange={(e) =>
                                    setForm({ ...form, employees: e.target.value })
                                }
                            >
                                <option value="">Select range</option>
                                <option value="1-10">1–10</option>
                                <option value="11-25">11–25</option>
                                <option value="26-50">26–50</option>
                                <option value="51-100">51–100</option>
                                <option value="100+">100+</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label className="label" htmlFor="message">
                                What&apos;s your biggest operational headache?
                            </label>
                            <textarea
                                className={`input ${styles.textarea}`}
                                id="message"
                                rows={4}
                                value={form.message}
                                onChange={(e) =>
                                    setForm({ ...form, message: e.target.value })
                                }
                                placeholder="Tell us about a workflow that wastes your team's time..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={status === "sending"}
                            style={{ width: "100%" }}
                        >
                            {status === "sending"
                                ? "Sending..."
                                : status === "sent"
                                    ? "Sent! We'll be in touch."
                                    : "Send Message"}
                        </button>

                        {status === "error" && (
                            <p className={styles.error}>
                                Something went wrong. Please try again or email us directly.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
