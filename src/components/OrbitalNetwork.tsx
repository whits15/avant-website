"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSceneReady } from "@/components/SceneReadyContext";
import styles from "./OrbitalNetwork.module.css";

function noise3D(x: number, y: number, z: number): number {
    return (
        Math.sin(x * 1.27 + y * 3.43 + z * 0.37) *
        Math.sin(y * 2.17 + z * 1.31 + x * 0.91) *
        Math.cos(z * 1.73 + x * 2.63 + y * 0.47)
    );
}

/**
 * Morphing icosahedron with orbiting satellite rings — a tech-forward
 * neural-network aesthetic. Central dodecahedron with noise-displaced
 * vertices, wireframe overlay, glow shell, and rings of orbiting dots
 * at different inclinations.
 */
export default function OrbitalNetwork() {
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
    const { markReady } = useSceneReady();
    const readyRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (
            navigator.hardwareConcurrency != null &&
            navigator.hardwareConcurrency < 2
        ) {
            markReady("orbital");
            return;
        }

        const width = container.clientWidth;
        const height = container.clientHeight;
        const isMobile = window.innerWidth < 768;

        /* ── Scene ── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            40,
            width / height,
            0.1,
            100
        );
        camera.position.set(-1.5, 0, 9.6);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: !isMobile,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(
            isMobile
                ? Math.min(window.devicePixelRatio, 1.5)
                : window.devicePixelRatio
        );
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        const detail = isMobile ? 3 : 4;

        /* ── Solid inner icosahedron ── */
        const solidGeo = new THREE.IcosahedronGeometry(1.8, detail);
        const solidOriginal = new Float32Array(
            solidGeo.attributes.position.array
        );
        const solidMat = new THREE.MeshBasicMaterial({
            color: 0x141420,
            transparent: true,
            opacity: 0.55,
            depthWrite: false,
        });
        const solidMesh = new THREE.Mesh(solidGeo, solidMat);
        group.add(solidMesh);

        /* ── Wireframe overlay ── */
        const wireGeo = new THREE.IcosahedronGeometry(1.8, detail);
        const wireOriginal = new Float32Array(
            wireGeo.attributes.position.array
        );
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x4a90d9,
            wireframe: true,
            transparent: true,
            opacity: 0.1,
            depthWrite: false,
        });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        group.add(wireMesh);

        /* ── Outer glow shell ── */
        const glowGeo = new THREE.IcosahedronGeometry(2.3, Math.max(1, detail - 2));
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x4a90d9,
            transparent: true,
            opacity: 0.02,
            side: THREE.BackSide,
            depthWrite: false,
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        group.add(glowMesh);

        /* ── Edge highlight wireframe ── */
        const edgeGeo = new THREE.IcosahedronGeometry(1.85, detail);
        const edgeOriginal = new Float32Array(
            edgeGeo.attributes.position.array
        );
        const edgeMat = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            wireframe: true,
            transparent: true,
            opacity: 0.04,
            depthWrite: false,
        });
        const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
        group.add(edgeMesh);

        /* ── Orbiting satellite rings ── */
        const RING_COUNT = isMobile ? 2 : 3;
        const DOTS_PER_RING = isMobile ? 20 : 36;
        const dotGeo = new THREE.SphereGeometry(1, 6, 6);
        const rings: {
            dots: THREE.Mesh[];
            radius: number;
            speed: number;
            axis: THREE.Vector3;
            offset: number;
        }[] = [];

        const ringConfigs = [
            { radius: 2.8, speed: 0.15, tiltX: 0.3, tiltZ: 0.1 },
            { radius: 3.3, speed: -0.1, tiltX: -0.5, tiltZ: 0.4 },
            { radius: 3.8, speed: 0.08, tiltX: 0.8, tiltZ: -0.3 },
        ];

        for (let r = 0; r < RING_COUNT; r++) {
            const cfg = ringConfigs[r];
            const dots: THREE.Mesh[] = [];
            const axis = new THREE.Vector3(
                Math.sin(cfg.tiltX),
                1,
                Math.sin(cfg.tiltZ)
            ).normalize();

            for (let d = 0; d < DOTS_PER_RING; d++) {
                const isAccent = Math.random() > 0.6;
                const mat = new THREE.MeshBasicMaterial({
                    color: isAccent ? 0x06b6d4 : 0x4a90d9,
                    transparent: true,
                    opacity: 0.15 + Math.random() * 0.3,
                });
                const mesh = new THREE.Mesh(dotGeo, mat);
                const size = 0.012 + Math.random() * 0.018;
                mesh.scale.setScalar(size);
                group.add(mesh);
                dots.push(mesh);
            }

            rings.push({
                dots,
                radius: cfg.radius,
                speed: cfg.speed,
                axis,
                offset: r * Math.PI * 0.6,
            });
        }

        /* ── Floating ambient particles ── */
        const PARTICLE_COUNT = isMobile ? 20 : 40;
        const particles: {
            mesh: THREE.Mesh;
            basePos: THREE.Vector3;
            phase: number;
            speed: number;
        }[] = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 3.5 + Math.random() * 2;
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            const isAccent = Math.random() > 0.7;
            const mat = new THREE.MeshBasicMaterial({
                color: isAccent ? 0x06b6d4 : 0x4a90d9,
                transparent: true,
                opacity: 0.1 + Math.random() * 0.25,
            });
            const mesh = new THREE.Mesh(dotGeo, mat);
            const size = 0.008 + Math.random() * 0.015;
            mesh.scale.setScalar(size);
            mesh.position.set(x, y, z);
            group.add(mesh);

            particles.push({
                mesh,
                basePos: new THREE.Vector3(x, y, z),
                phase: Math.random() * Math.PI * 2,
                speed: 0.3 + Math.random() * 0.5,
            });
        }

        /* ── Mouse tracking ── */
        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                mouseRef.current.tx =
                    ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouseRef.current.ty =
                    -((e.clientY - rect.top) / rect.height) * 2 + 1;
            }
        };
        window.addEventListener("mousemove", onMouseMove);

        /* ── Visibility ── */
        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(container);

        /* ── Animation ── */
        let time = 0;
        const CYCLE = Math.PI * 20;

        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);

            if (!readyRef.current) {
                readyRef.current = true;
                markReady("orbital");
            }

            if (!isVisible) return;

            time = (time + 0.002) % CYCLE;

            const m = mouseRef.current;
            m.x += (m.tx - m.x) * 0.015;
            m.y += (m.ty - m.y) * 0.015;

            const tSin = Math.sin(time);
            const tCos = Math.cos(time);
            const tSin2 = Math.sin(time * 0.6);
            const tCos2 = Math.cos(time * 0.4);

            // Morph vertices — organic noise displacement
            const solidPos = solidGeo.attributes.position
                .array as Float32Array;
            const wirePos = wireGeo.attributes.position
                .array as Float32Array;
            const edgePos = edgeGeo.attributes.position
                .array as Float32Array;

            for (let i = 0; i < solidPos.length; i += 3) {
                const ox = solidOriginal[i];
                const oy = solidOriginal[i + 1];
                const oz = solidOriginal[i + 2];

                const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
                if (len < 0.001) continue;
                const nx = ox / len;
                const ny = oy / len;
                const nz = oz / len;

                const n1 = noise3D(
                    ox * 0.5 + tSin * 2,
                    oy * 0.5 + tCos * 1.5,
                    oz * 0.5 + tSin2
                );
                const n2 = noise3D(
                    ox * 1.0 + tCos2 * 1.5,
                    oy * 1.0 + tSin * 0.8,
                    oz * 1.0 + tCos * 0.6
                );
                const displacement = len * (1 + n1 * 0.1 + n2 * 0.05);

                solidPos[i] = nx * displacement;
                solidPos[i + 1] = ny * displacement;
                solidPos[i + 2] = nz * displacement;

                // Wire slightly larger
                if (i < wirePos.length) {
                    const wox = wireOriginal[i];
                    const woy = wireOriginal[i + 1];
                    const woz = wireOriginal[i + 2];
                    const wlen = Math.sqrt(wox * wox + woy * woy + woz * woz);
                    if (wlen > 0.001) {
                        const wnx = wox / wlen;
                        const wny = woy / wlen;
                        const wnz = woz / wlen;
                        const wdisp = wlen * (1 + n1 * 0.1 + n2 * 0.05) * 1.004;
                        wirePos[i] = wnx * wdisp;
                        wirePos[i + 1] = wny * wdisp;
                        wirePos[i + 2] = wnz * wdisp;
                    }
                }

                // Edge layer
                if (i < edgePos.length) {
                    const eox = edgeOriginal[i];
                    const eoy = edgeOriginal[i + 1];
                    const eoz = edgeOriginal[i + 2];
                    const elen = Math.sqrt(eox * eox + eoy * eoy + eoz * eoz);
                    if (elen > 0.001) {
                        const enx = eox / elen;
                        const eny = eoy / elen;
                        const enz = eoz / elen;
                        const edisp = elen * (1 + n1 * 0.1 + n2 * 0.05) * 1.007;
                        edgePos[i] = enx * edisp;
                        edgePos[i + 1] = eny * edisp;
                        edgePos[i + 2] = enz * edisp;
                    }
                }
            }

            solidGeo.attributes.position.needsUpdate = true;
            wireGeo.attributes.position.needsUpdate = true;
            edgeGeo.attributes.position.needsUpdate = true;
            solidGeo.computeVertexNormals();

            // Smooth rotation + mouse influence
            const rotY = time * 0.15 + m.x * 0.25;
            const rotX = Math.sin(time * 0.25) * 0.15 + m.y * 0.15;
            const rotZ = time * 0.04;

            solidMesh.rotation.set(rotX, rotY, rotZ);
            wireMesh.rotation.set(rotX, rotY, rotZ);
            edgeMesh.rotation.set(rotX, rotY, rotZ);
            glowMesh.rotation.set(rotX * 0.5, time * 0.08, rotZ * 0.5);

            // Glow pulse
            glowMat.opacity = 0.02 + Math.sin(time * 1.5) * 0.01;

            // Wire opacity shimmer
            wireMat.opacity = 0.1 + Math.sin(time * 2.5) * 0.03;
            edgeMat.opacity = 0.04 + Math.sin(time * 1.8 + 1) * 0.02;

            // Animate orbiting rings
            for (const ring of rings) {
                for (let d = 0; d < ring.dots.length; d++) {
                    const angle =
                        (d / ring.dots.length) * Math.PI * 2 +
                        time * ring.speed +
                        ring.offset;

                    // Build position on a tilted circle
                    const x = Math.cos(angle) * ring.radius;
                    const y = Math.sin(angle) * ring.radius * 0.3; // squash vertically
                    const z = Math.sin(angle) * ring.radius;

                    // Apply tilt rotation around the axis
                    const dot = ring.dots[d];
                    dot.position.set(x, y, z);
                    dot.position.applyAxisAngle(ring.axis, ring.offset);

                    // Pulse opacity
                    const mat = dot.material as THREE.MeshBasicMaterial;
                    const baseSz = dot.userData.baseScale || dot.scale.x;
                    if (!dot.userData.baseScale) dot.userData.baseScale = baseSz;
                    dot.scale.setScalar(
                        baseSz * (0.8 + Math.sin(time * 2 + d * 0.5) * 0.3)
                    );
                    mat.opacity =
                        0.15 + Math.sin(time * 1.5 + d * 0.3) * 0.1;
                }
            }

            // Animate ambient particles — gentle drift
            for (const p of particles) {
                const drift = noise3D(
                    p.basePos.x * 0.3 + time * p.speed,
                    p.basePos.y * 0.3,
                    p.basePos.z * 0.3 + time * 0.2
                );
                p.mesh.position.x =
                    p.basePos.x + Math.sin(time * p.speed + p.phase) * 0.2;
                p.mesh.position.y =
                    p.basePos.y + Math.cos(time * p.speed * 0.7 + p.phase) * 0.2;
                p.mesh.position.z = p.basePos.z + drift * 0.15;

                const baseScale = p.mesh.userData.baseScale || p.mesh.scale.x;
                if (!p.mesh.userData.baseScale)
                    p.mesh.userData.baseScale = baseScale;
                p.mesh.scale.setScalar(
                    baseScale * (0.8 + Math.sin(time * 2 + p.phase) * 0.2)
                );
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
            solidGeo.dispose();
            wireGeo.dispose();
            glowGeo.dispose();
            edgeGeo.dispose();
            dotGeo.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [markReady]);

    return <div ref={containerRef} className={styles.container} />;
}
