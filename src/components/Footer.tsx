import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <span className={styles.logo}>AVANT</span>
                    <p className={styles.tagline}>Go Forward.</p>
                </div>

                <div className={styles.links}>
                    <Link href="/about">About</Link>
                    <Link href="/case-studies">Case Studies</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        © {new Date().getFullYear()} Avant. All rights reserved.
                    </p>
                    <p className={styles.location}>Ontario, Canada</p>
                </div>
            </div>
        </footer>
    );
}
