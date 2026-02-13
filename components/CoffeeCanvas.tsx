'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const FRAME_COUNT = 192;

export default function CoffeeCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll();

    // Smooth the scroll progress for a "heavy" feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 40,
        restDelta: 0.001
    });

    // Map progress (0-1) to frame index (0-191)
    const currentFrame = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    // Pad with zeros: frame_001.jpg, etc.
                    const paddedIndex = i.toString().padStart(3, '0');
                    img.src = `/sequence/frame_${paddedIndex}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve(); // Resolve anyway to avoid blocking
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        // Render loop
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Check if we have a valid context and image
            const frameIndex = Math.round(currentFrame.get());
            const image = images[frameIndex];

            if (image) {
                // Clear screen (black background is expected)
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate scaling - USE 'CONTAIN' logic (Math.min) instead of 'COVER' (Math.max)
                // This ensures the entire image (text + cup) is visible
                // We divide by dpr because the canvas dimensions are scaled up by dpr
                // but we want to calculate scaling relative to the logical CSS pixels? 
                // Actually, canvas.width is now physical pixels. image.width is natural pixels.

                const hRatio = canvas.width / image.width;
                const vRatio = canvas.height / image.height;

                // Use MAX ratio to ensure image fills screen (Cover)
                // This removes black bars but may crop edges depending on aspect ratio
                const ratio = Math.max(hRatio, vRatio);

                const centerShift_x = (canvas.width - image.width * ratio) / 2;
                const centerShift_y = (canvas.height - image.height * ratio) / 2;

                // Draw with high quality smoothing
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                ctx.drawImage(
                    image,
                    0,
                    0,
                    image.width,
                    image.height,
                    centerShift_x,
                    centerShift_y,
                    image.width * ratio,
                    image.height * ratio
                );
            }

            requestAnimationFrame(render);
        };

        if (isLoaded) {
            const animationId = requestAnimationFrame(render);
            return () => cancelAnimationFrame(animationId);
        }
    }, [isLoaded, currentFrame, images]);

    // Handle Resize with DPI awareness
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                // Set physical size
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // Reset scale? No, just drawImage with correct coords works easier for simple blits.
                // But scaling the context helps if we used logical coords. 
                // Here we calculated ratio based on canvas.width (physical), so no ctx.scale needed 
                // IF we treat drawing coords as physical. 
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-obsidian pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover opacity-80" // Slight opacity to blend with black bg
            />

            {/* 1. Cinematic Vignette (Darkens edges heavily to hide artifacts) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_90%)]" />

            {/* 2. Film Grain Overlay (Adds texture to mask blockiness) */}
            <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />

            {/* 3. Velvet Color Grade (Red wash) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-passion/10 mix-blend-color-dodge" />

            {/* 4. Floating Embers / Particles (Distraction) */}
            <Particles />

            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    Loading Aroma...
                </div>
            )}
        </div>
    );
}

function Particles() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Simple random particles
    const particles = Array.from({ length: 20 });

    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-amber-200/40 blur-[1px]"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0,
                        scale: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -100], // Move up
                        opacity: [0, 0.8, 0], // Fade in/out
                        scale: [0, Math.random() * 3 + 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: Math.random() * 4 + 1 + 'px',
                        height: Math.random() * 4 + 1 + 'px',
                    }}
                />
            ))}
        </div>
    );
}
