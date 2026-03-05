"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ScrollReveal.module.css";

interface Props {
    children: ReactNode;
    delay?: number; // ms
}

/**
 * Wraps content to fade-in + slide-up when scrolled into view.
 * Pure CSS animation triggered by IntersectionObserver.
 */
export default function ScrollReveal({ children, delay = 0 }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => el.classList.add(styles.visible), delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={styles.hidden}>
            {children}
        </div>
    );
}
