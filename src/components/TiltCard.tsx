"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import styles from "./TiltCard.module.css";

interface Props {
    children: ReactNode;
    className?: string;
}

/**
 * Card with subtle 3D tilt on mouse hover.
 * Tilts toward the cursor, lifts slightly, and adds a shine effect.
 */
export default function TiltCard({ children, className = "" }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;   // 0–1
        const y = (e.clientY - rect.top) / rect.height;    // 0–1
        const rotX = (y - 0.5) * -8;   // ±4 degrees
        const rotY = (x - 0.5) * 8;    // ±4 degrees
        el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
    };

    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateY(0)";
    };

    return (
        <div
            ref={ref}
            className={`${styles.tilt} ${className}`}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
        >
            {children}
        </div>
    );
}
