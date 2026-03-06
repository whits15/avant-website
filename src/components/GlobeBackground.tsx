"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./GlobeBackground.module.css";

/* ── Config ── */
const LAYER_COUNT = 3;
const PARTICLES_PER_LAYER = [80, 60, 40]; // front → back
const LAYER_DEPTHS = [-0.5, -2, -4];       // Z positions
const LAYER_SIZES = [0.035, 0.022, 0.012]; // dot radius
const LAYER_OPACITY = [0.7, 0.45, 0.2];    // brightness
const CONNECTION_DIST = [1.6, 1.4, 1.0];   // connection range per layer
const PARALLAX_STRENGTH = [0.08, 0.04, 0.015]; // mouse parallax intensity

/* ── Simplex-like noise (fast 3D) ── */
function noise3D(x: number, y: number, z: number): number {
    // Cheap pseudo-noise using sin combinations
    const n = Math.sin(x * 1.27 + y * 3.43 + z * 0.37) *
        Math.sin(y * 2.17 + z * 1.31 + x * 0.91) *
        Math.cos(z * 1.73 + x * 2.63 + y * 0.47);
    return n;
}

/* ── Gradient color based on position ── */
function getColor(x: number, y: number, spread: number): THREE.Color {
    // Normalize position to 0-1
    const nx = (x / spread + 1) * 0.5;
    const ny = (y / (spread * 0.6) + 1) * 0.5;
    const t = nx * 0.6 + ny * 0.4; // blend factor

    // Deep blue → Teal → Soft purple
    const c1 = new THREE.Color(0x2563eb); // blue
    const c2 = new THREE.Color(0x06b6d4); // teal/cyan
    const c3 = new THREE.Color(0x7c3aed); // purple

    if (t < 0.5) {
        return c1.clone().lerp(c2, t * 2);
    }
    return c2.clone().lerp(c3, (t - 0.5) * 2);
}

export default function GlobeBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Allow rendering on mobile, but gracefully degrade on extremely low-end devices
        if (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency < 2) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        /* ── Scene setup ── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);

        // Cap pixel ratio on mobile to maintain performance
        const isMobile = window.innerWidth < 768;
        renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const SPREAD = 7;

        /* ── Build particle layers ── */
        interface Layer {
            group: THREE.Group;
            positions: Float32Array;
            velocities: Float32Array;
            particles: THREE.Mesh[];
            lineGeo: THREE.BufferGeometry;
            linePositions: Float32Array;
            count: number;
            depth: number;
            connectionDist: number;
            parallaxStrength: number;
        }

        const layers: Layer[] = [];
        const dotGeo = new THREE.SphereGeometry(1, 12, 12);

        for (let li = 0; li < LAYER_COUNT; li++) {
            const count = PARTICLES_PER_LAYER[li];
            const group = new THREE.Group();
            group.position.z = LAYER_DEPTHS[li];
            scene.add(group);

            const positions = new Float32Array(count * 3);
            const velocities = new Float32Array(count * 3);
            const particles: THREE.Mesh[] = [];

            for (let i = 0; i < count; i++) {
                const x = (Math.random() - 0.5) * SPREAD * 2;
                const y = (Math.random() - 0.5) * SPREAD * 1.2;
                const z = (Math.random() - 0.5) * 1.5;

                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;

                velocities[i * 3] = 0;
                velocities[i * 3 + 1] = 0;
                velocities[i * 3 + 2] = 0;

                const color = getColor(x, y, SPREAD);
                const mat = new THREE.MeshBasicMaterial({
                    color,
                    transparent: true,
                    opacity: LAYER_OPACITY[li],
                });
                const mesh = new THREE.Mesh(dotGeo, mat);
                mesh.position.set(x, y, z);
                mesh.scale.setScalar(LAYER_SIZES[li]);
                group.add(mesh);
                particles.push(mesh);
            }

            // Connection lines
            const maxLines = count * count;
            const linePositions = new Float32Array(maxLines * 6);
            const lineGeo = new THREE.BufferGeometry();
            lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
            lineGeo.setDrawRange(0, 0);

            const lineMat = new THREE.LineBasicMaterial({
                color: li === 0 ? 0x4a90d9 : li === 1 ? 0x06b6d4 : 0x7c3aed,
                transparent: true,
                opacity: LAYER_OPACITY[li] * 0.2,
            });
            group.add(new THREE.LineSegments(lineGeo, lineMat));

            layers.push({
                group,
                positions,
                velocities,
                particles,
                lineGeo,
                linePositions,
                count,
                depth: LAYER_DEPTHS[li],
                connectionDist: CONNECTION_DIST[li],
                parallaxStrength: PARALLAX_STRENGTH[li],
            });
        }

        /* ── Mouse tracking ── */
        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            // Only track when cursor is inside the hero section
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                mouseRef.current.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouseRef.current.ty = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                mouseRef.current.active = true;
            } else {
                mouseRef.current.active = false;
            }
        };
        window.addEventListener("mousemove", onMouseMove);

        /* ── Visibility ── */
        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(container);

        /* ── Animation loop ── */
        let time = 0;

        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);
            if (!isVisible) return;

            time += 0.002;

            // Smooth mouse interpolation
            const m = mouseRef.current;
            m.x += (m.tx - m.x) * 0.03;
            m.y += (m.ty - m.y) * 0.03;

            for (const layer of layers) {
                // Parallax offset for the entire layer
                layer.group.position.x = m.x * layer.parallaxStrength * 10;
                layer.group.position.y = m.y * layer.parallaxStrength * 10;

                for (let i = 0; i < layer.count; i++) {
                    const ix = i * 3;

                    const px = layer.positions[ix];
                    const py = layer.positions[ix + 1];

                    // Very subtle noise drift — just enough to feel alive
                    const noiseX = noise3D(px * 0.15, py * 0.15, time);
                    const noiseY = noise3D(px * 0.15 + 100, py * 0.15 + 100, time);
                    layer.velocities[ix] += noiseX * 0.0004;
                    layer.velocities[ix + 1] += noiseY * 0.0004;

                    // Strong separation — keeps particles well-spaced
                    for (let j = 0; j < layer.count; j++) {
                        if (j === i) continue;
                        const sx = px - layer.positions[j * 3];
                        const sy = py - layer.positions[j * 3 + 1];
                        const sd = Math.sqrt(sx * sx + sy * sy);
                        if (sd < 1.2 && sd > 0.01) {
                            const sep = (1.2 - sd) * 0.003;
                            layer.velocities[ix] += (sx / sd) * sep;
                            layer.velocities[ix + 1] += (sy / sd) * sep;
                        }
                    }

                    // Mouse gravity — pull particles toward cursor
                    if (m.active) {
                        const mxWorld = m.x * 5;
                        const myWorld = m.y * 3;
                        const dx = mxWorld - px;
                        const dy = myWorld - py;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 3.0 && dist > 0.3) {
                            const gravity = (3.0 - dist) * 0.0006;
                            layer.velocities[ix] += (dx / dist) * gravity;
                            layer.velocities[ix + 1] += (dy / dist) * gravity;
                        }
                    }

                    // Heavy damping — slow, graceful movement
                    layer.velocities[ix] *= 0.90;
                    layer.velocities[ix + 1] *= 0.90;

                    // Apply velocity
                    layer.positions[ix] += layer.velocities[ix];
                    layer.positions[ix + 1] += layer.velocities[ix + 1];

                    // Soft boundary — push particles back toward center when near edges
                    const edgeX = SPREAD * 0.85;
                    const edgeY = SPREAD * 0.5;
                    const pushStrength = 0.002;

                    if (layer.positions[ix] > edgeX) {
                        layer.velocities[ix] -= (layer.positions[ix] - edgeX) * pushStrength;
                    } else if (layer.positions[ix] < -edgeX) {
                        layer.velocities[ix] -= (layer.positions[ix] + edgeX) * pushStrength;
                    }
                    if (layer.positions[ix + 1] > edgeY) {
                        layer.velocities[ix + 1] -= (layer.positions[ix + 1] - edgeY) * pushStrength;
                    } else if (layer.positions[ix + 1] < -edgeY) {
                        layer.velocities[ix + 1] -= (layer.positions[ix + 1] + edgeY) * pushStrength;
                    }

                    // Update mesh
                    const p = layer.particles[i];
                    p.position.set(layer.positions[ix], layer.positions[ix + 1], layer.positions[ix + 2]);

                    // Update color based on new position
                    const newColor = getColor(layer.positions[ix], layer.positions[ix + 1], SPREAD);
                    (p.material as THREE.MeshBasicMaterial).color.lerp(newColor, 0.02);
                }

                // Update connection lines
                let lineIdx = 0;
                const posAttr = layer.lineGeo.getAttribute("position") as THREE.BufferAttribute;

                for (let i = 0; i < layer.count; i++) {
                    for (let j = i + 1; j < layer.count; j++) {
                        const dx = layer.positions[i * 3] - layer.positions[j * 3];
                        const dy = layer.positions[i * 3 + 1] - layer.positions[j * 3 + 1];
                        const dz = layer.positions[i * 3 + 2] - layer.positions[j * 3 + 2];
                        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                        if (dist < layer.connectionDist) {
                            const base = lineIdx * 6;
                            layer.linePositions[base] = layer.positions[i * 3];
                            layer.linePositions[base + 1] = layer.positions[i * 3 + 1];
                            layer.linePositions[base + 2] = layer.positions[i * 3 + 2];
                            layer.linePositions[base + 3] = layer.positions[j * 3];
                            layer.linePositions[base + 4] = layer.positions[j * 3 + 1];
                            layer.linePositions[base + 5] = layer.positions[j * 3 + 2];
                            lineIdx++;
                        }
                    }
                }

                posAttr.needsUpdate = true;
                layer.lineGeo.setDrawRange(0, lineIdx * 2);
            }

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
            window.removeEventListener("mousemove", onMouseMove);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} className={styles.container} />;
}
