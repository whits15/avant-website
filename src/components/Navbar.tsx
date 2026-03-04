"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Blog", href: "/blog" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    AVANT
                </Link>

                {/* Desktop links */}
                <ul className={styles.links}>
                    {NAV_LINKS.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                className={`${styles.link} ${pathname === l.href || pathname.startsWith(l.href + "/") ? styles.linkActive : ""}`}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link href="/contact" className={`btn btn--primary ${styles.cta}`}>
                    Book Free Assessment
                </Link>

                {/* Mobile hamburger */}
                <button
                    className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className={styles.mobileMenu}>
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={styles.mobileLink}
                            onClick={() => setMenuOpen(false)}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="btn btn--primary"
                        onClick={() => setMenuOpen(false)}
                        style={{ marginTop: "1rem", width: "100%" }}
                    >
                        Book Free Assessment
                    </Link>
                </div>
            )}
        </nav>
    );
}
