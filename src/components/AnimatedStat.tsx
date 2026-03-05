"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
    value: string;         // e.g. "78%", "5–10h", "$0"
    className?: string;
}

/**
 * Animates a stat value when scrolled into view.
 * Extracts the numeric part, counts up, then restores the original string.
 */
export default function AnimatedStat({ value, className }: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState(value);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    animate();
                    observer.unobserve(el);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    function animate() {
        // Extract prefix, number, suffix (e.g. "$" + "0" or "" + "78" + "%")
        const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
        if (!match) {
            // Non-numeric values (like "5–10h") just fade in
            setDisplay(value);
            return;
        }

        const prefix = match[1];
        const target = parseInt(match[2], 10);
        const suffix = match[3];
        const duration = 1200; // ms
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setDisplay(`${prefix}${current}${suffix}`);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };
        requestAnimationFrame(tick);
    }

    return <span ref={ref} className={className}>{display}</span>;
}
