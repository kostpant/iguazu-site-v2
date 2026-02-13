'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

const FRAME_COUNT = 192;

export default function CoffeeCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll();

    // Refined Spring for 'Buttery Smooth' high-end cinematic feel
    // Higher damping and mass for that 'heavy' luxury momentum
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,  // Lower stiffness for slower response
        damping: 30,    // High damping for no oscillation
        mass: 1.5,      // Higher mass for natural momentum
        restDelta: 0.0001
    });

    const currentFrame = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, '0');
                    img.src = `/sequence/frame_${paddedIndex}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        resolve();
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
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const frameIndex = Math.round(currentFrame.get());
            const image = images[frameIndex];

            if (image) {
                const hRatio = canvas.width / image.width;
                const vRatio = canvas.height / image.height;

                // Optimized scaling for responsive luxury feel
                // On mobile portrait, we avoid pure 'object-cover' which crops too much horizontal detail
                // Instead, we use a hybrid ratio that favors width visibility for background decorations
                let ratio = Math.max(hRatio, vRatio);
                if (canvas.height > canvas.width) {
                    ratio = Math.max(hRatio, vRatio * 0.72); // Zooms out slightly on mobile to show decorative text
                }

                const centerShift_x = (canvas.width - image.width * ratio) / 2;
                const centerShift_y = (canvas.height - image.height * ratio) / 2;

                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="background-animation-container bg-obsidian pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover opacity-100 transition-opacity duration-1000"
            />

            {/* Cinematic Gradients for Quiet Luxury */}
            {/* Cinematic Gradients - Removed to prevent visibility issues */}
            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_60%)]" /> */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" /> */}

            {/* Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />

            {/* Detail Embers */}
            <Particles />

            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center font-serif italic text-rose/30 tracking-[0.4em] uppercase text-[10px]">
                    Cultivating the Ritual...
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

    const particles = Array.from({ length: 20 });

    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-passion/30 blur-[2px]"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0,
                    }}
                    animate={{
                        y: [null, Math.random() * -150],
                        opacity: [0, 0.6, 0],
                        scale: [0, Math.random() * 2 + 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 8 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: Math.random() * 3 + 1 + 'px',
                        height: Math.random() * 3 + 1 + 'px',
                    }}
                />
            ))}
        </div>
    );
}
