"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./GlobeBackground.module.css";

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 1.8;
const MOUSE_INFLUENCE = 2.5;
const ACCENT = new THREE.Color(0x4a90d9);

export default function GlobeBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Skip on mobile / low-power
        if (window.innerWidth < 768) return;
        if (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency < 4) return;

        /* ── Scene ── */
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        /* ── Particles ── */
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);

        const SPREAD = 6;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * SPREAD * 2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 1.2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 3;

            velocities[i * 3] = (Math.random() - 0.5) * 0.003;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

            sizes[i] = Math.random() * 0.04 + 0.01;
        }

        // Particle dots
        const dotGeo = new THREE.SphereGeometry(1, 6, 6);
        const dotMat = new THREE.MeshBasicMaterial({
            color: ACCENT,
            transparent: true,
            opacity: 0.6,
        });

        const particles: THREE.Mesh[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const mesh = new THREE.Mesh(dotGeo, dotMat.clone());
            mesh.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            mesh.scale.setScalar(sizes[i]);
            scene.add(mesh);
            particles.push(mesh);
        }

        /* ── Connection lines (dynamic) ── */
        const lineMaxCount = PARTICLE_COUNT * PARTICLE_COUNT;
        const linePositions = new Float32Array(lineMaxCount * 6); // 2 points per line, 3 coords each
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
        lineGeo.setDrawRange(0, 0);

        const lineMat = new THREE.LineBasicMaterial({
            color: ACCENT,
            transparent: true,
            opacity: 0.12,
        });
        const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(linesMesh);

        /* ── Mouse tracking ── */
        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        container.addEventListener("mousemove", onMouseMove);

        /* ── Animation ── */
        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(container);

        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);
            if (!isVisible) return;

            const mx = mouseRef.current.x * MOUSE_INFLUENCE;
            const my = mouseRef.current.y * MOUSE_INFLUENCE;

            // Update particle positions
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const ix = i * 3;

                // Apply velocity
                positions[ix] += velocities[ix];
                positions[ix + 1] += velocities[ix + 1];
                positions[ix + 2] += velocities[ix + 2];

                // Boundary wrapping
                if (positions[ix] > SPREAD) positions[ix] = -SPREAD;
                if (positions[ix] < -SPREAD) positions[ix] = SPREAD;
                if (positions[ix + 1] > SPREAD * 0.6) positions[ix + 1] = -SPREAD * 0.6;
                if (positions[ix + 1] < -SPREAD * 0.6) positions[ix + 1] = SPREAD * 0.6;

                // Mouse repulsion (subtle push away from cursor)
                const dx = positions[ix] - mx;
                const dy = positions[ix + 1] - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 1.5) {
                    const force = (1.5 - dist) * 0.002;
                    positions[ix] += (dx / dist) * force;
                    positions[ix + 1] += (dy / dist) * force;
                }

                particles[i].position.set(positions[ix], positions[ix + 1], positions[ix + 2]);
            }

            // Update connections
            let lineIdx = 0;
            const posAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < CONNECTION_DISTANCE) {
                        const base = lineIdx * 6;
                        linePositions[base] = positions[i * 3];
                        linePositions[base + 1] = positions[i * 3 + 1];
                        linePositions[base + 2] = positions[i * 3 + 2];
                        linePositions[base + 3] = positions[j * 3];
                        linePositions[base + 4] = positions[j * 3 + 1];
                        linePositions[base + 5] = positions[j * 3 + 2];
                        lineIdx++;
                    }
                }
            }

            posAttr.needsUpdate = true;
            lineGeo.setDrawRange(0, lineIdx * 2);

            renderer.render(scene, camera);
        };
        animate();

        /* ── Resize ── */
        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        /* ── Cleanup ── */
        return () => {
            cancelAnimationFrame(frameRef.current);
            observer.disconnect();
            window.removeEventListener("resize", onResize);
            container.removeEventListener("mousemove", onMouseMove);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} className={styles.container} />;
}
