'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';

const images = [
    '/gallery/iguazu_loutraki_1748611819_3643942508173588090_74830897803.jpg',
    '/gallery/iguazu_loutraki_1748611819_3643942508467266461_74830897803.jpg',
    '/gallery/iguazu_loutraki_1754726841_3695239030173130279_74830897803.jpg',
    '/gallery/iguazu_loutraki_1756807013_3712688781393399015_74830897803.jpg',
    '/gallery/iguazu_loutraki_1756807013_3712688781393428156_74830897803.jpg',
    '/gallery/iguazu_loutraki_1756807013_3712688781401842402_74830897803.jpg',
    '/gallery/iguazu_loutraki_1757149802_3715564302557002709_74830897803.jpg',
    '/gallery/iguazu_loutraki_1758619935_3727896672052225054_74830897803.jpg',
    '/gallery/iguazu_loutraki_1770717492_3829377565207362876_74830897803.jpg',
];

export default function GalleryPage() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const nextImage = useCallback(() => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % images.length);
    }, []);

    const prevImage = useCallback(() => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') window.location.href = '/';
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextImage, prevImage]);

    // Premium Transition Variants
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)"
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)"
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)"
        })
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-obsidian text-white overflow-hidden relative font-sans selection:bg-passion/30">
            {/* 1. Static Background with Texture */}
            <div className="absolute inset-0 bg-obsidian z-0" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(211,47,47,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

            {/* 2. Top Bar: Branding (Left) & Actions (Right) */}
            <header className="absolute top-0 left-0 right-0 p-6 md:p-8 z-50 flex items-start justify-between">
                {/* Branding */}
                <div className="flex flex-col">
                    <span className="text-xl md:text-3xl font-serif font-bold text-white tracking-widest uppercase shadow-black drop-shadow-lg">
                        Iguazu Loutraki
                    </span>
                    <span className="text-xs md:text-sm text-gold tracking-[0.2em] font-light uppercase opacity-80">
                        Gallery Collection
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <a
                        href="tel:+302744021012"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-passion hover:bg-gold text-white font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(211,47,47,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group"
                    >
                        <Phone className="w-4 h-4 fill-current" />
                        <span className="hidden md:inline">ΚΑΛΕΣΤΕ ΜΑΣ</span>
                    </a>

                    <Link
                        href="/"
                        className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-md group"
                    >
                        <X className="w-6 h-6 text-white/80 group-hover:text-white" />
                    </Link>
                </div>
            </header>

            {/* 3. Main Carousel Area */}
            <div className="relative w-full h-[75vh] flex items-center justify-center z-10 px-4 mt-10">

                {/* Image Container */}
                <div className="relative w-full max-w-6xl h-full flex items-center justify-center perspective-[1000px]">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 200, damping: 25 },
                                opacity: { duration: 0.3 },
                                scale: { duration: 0.3 }
                            }}
                            className="absolute w-full h-full flex items-center justify-center"
                        >
                            <div className="relative w-auto h-full max-h-[70vh] aspect-[4/5] md:aspect-auto md:w-full md:max-w-4xl rounded-sm overflow-hidden shadow-2xl border-[8px] border-white/5 bg-black/50 backdrop-blur-sm group">
                                <Image
                                    src={images[index]}
                                    alt={`Iguazu Gallery Image ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 1200px"
                                    priority
                                    quality={100}
                                />
                                {/* Subtle Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Arrows (Floating) */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-4 rounded-full border border-white/10 bg-black/20 hover:bg-passion text-white/70 hover:text-white transition-all backdrop-blur-md z-30 group"
                >
                    <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                </button>

                <button
                    onClick={nextImage}
                    className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-4 rounded-full border border-white/10 bg-black/20 hover:bg-passion text-white/70 hover:text-white transition-all backdrop-blur-md z-30 group"
                >
                    <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* 4. Footer: Counter & Thumbnails */}
            <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center justify-end pb-8 z-20">
                {/* Counter */}
                <div className="mb-4 flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-white/20" />
                    <span className="text-gold font-mono text-sm tracking-widest">
                        {String(index + 1).padStart(2, '0')} <span className="text-white/30">/</span> {String(images.length).padStart(2, '0')}
                    </span>
                    <div className="h-[1px] w-12 bg-white/20" />
                </div>

                {/* Thumbnails */}
                <div className="w-full max-w-4xl px-6 overflow-x-auto no-scrollbar flex items-center justify-center gap-3">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > index ? 1 : -1);
                                setIndex(i);
                            }}
                            className={clsx(
                                "relative w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden border transition-all duration-300 shrink-0",
                                i === index ? "border-gold scale-110 opacity-100 ring-2 ring-gold/20" : "border-transparent opacity-40 hover:opacity-80 scale-95"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${i + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
