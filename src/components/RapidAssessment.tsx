import styles from "./RapidAssessment.module.css";
import { BOOKING_URL } from "@/lib/booking";

export default function RapidAssessment() {
    return (
        <section className={`section ${styles.section}`} id="rapid-assessment">
            <div className="container">
                <p className="section-label">Start Here</p>
                <h2 className="section-title">
                    Rapid AI Assessment.
                </h2>
                <p className="section-subtitle">
                    The fastest way to know exactly where AI will pay back inside your fund.
                </p>

                <div className={`card ${styles.card}`}>
                    <div className={styles.header}>
                        <span className={styles.label}>Start Here</span>
                        <div>
                            <h3 className={styles.title}>Rapid AI Assessment</h3>
                            <span className={styles.timeline}>1–2 weeks</span>
                        </div>
                    </div>

                    <p className={styles.desc}>
                        A site visit, structured interviews with your key team members, and a written report with three to five ranked AI use cases — each with a scoped build estimate and projected ROI.
                    </p>

                    <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                    >
                        Book Intro Call
                    </a>
                </div>
            </div>
        </section>
    );
}
