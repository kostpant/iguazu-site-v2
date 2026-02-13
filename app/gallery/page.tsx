"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import CoffeeCanvas from "@/components/CoffeeCanvas";

const GALLERY_IMAGES = [
    "/gallery/iguazu_loutraki_1748611819_3643942508173588090_74830897803.jpg",
    "/gallery/iguazu_loutraki_1748611819_3643942508467266461_74830897803.jpg",
    "/gallery/iguazu_loutraki_1754726841_3695239030173130279_74830897803.jpg",
    "/gallery/iguazu_loutraki_1756807013_3712688781393399015_74830897803.jpg",
    "/gallery/iguazu_loutraki_1756807013_3712688781393428156_74830897803.jpg",
    "/gallery/iguazu_loutraki_1756807013_3712688781401842402_74830897803.jpg",
    "/gallery/iguazu_loutraki_1757149802_3715564302557002709_74830897803.jpg",
    "/gallery/iguazu_loutraki_1758619935_3727896672052225054_74830897803.jpg",
    "/gallery/iguazu_loutraki_1770717492_3829377565207362876_74830897803.jpg",
];

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function GalleryPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <main ref={containerRef} className="bg-obsidian min-h-screen text-champagne selection:bg-rose selection:text-white overflow-x-hidden">
            <CoffeeCanvas />

            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: LUXURY_EASE }}
                className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-8 md:px-16 py-8 md:py-12"
            >
                <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-serif font-bold text-passion tracking-[0.3em] uppercase drop-shadow-md">
                        Iguazu Loutraki
                    </span>
                    <span className="text-[10px] md:text-xs text-rose tracking-[0.4em] uppercase font-light mt-1">
                        Φωτογραφιες
                    </span>
                </div>

                <div className="flex gap-4">
                    <Link
                        href="/"
                        className="hidden md:flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 hover:bg-passion hover:text-white transition-all duration-500 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase backdrop-blur-md"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Πισω</span>
                    </Link>
                </div>
            </motion.header>

            <div className="relative z-10 pt-40 md:pt-60 pb-20 px-4 md:px-16">
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: LUXURY_EASE }}
                    className="text-6xl md:text-[8rem] font-serif text-rose/90 leading-[0.85] tracking-tighter mb-20 text-center drop-shadow-[0_0_15px_rgba(230,57,70,0.5)]"
                >
                    Στιγμες
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {GALLERY_IMAGES.map((src, index) => (
                        <GalleryItem key={index} src={src} index={index} />
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="fixed bottom-0 left-0 right-0 p-6 flex justify-center items-center gap-4 z-50 pointer-events-none"
            >
                <div className="bg-black/80 backdrop-blur-xl p-2 rounded-full border border-white/10 flex gap-2 pointer-events-auto shadow-2xl">
                    <Link
                        href="/"
                        className="h-12 flex items-center px-10 border border-passion/30 text-rose font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-passion hover:text-white transition-all duration-700 rounded-full"
                    >
                        Πισω
                    </Link>
                    <a
                        href="https://www.e-food.gr/delivery/korinthos/iguazu-coffee-shop-8104866"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 flex items-center px-8 bg-passion text-white hover:bg-white hover:text-passion transition-all duration-500 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase shadow-lg shadow-passion/20"
                    >
                        Παραγγελία
                    </a>
                </div>
            </motion.div>
        </main>
    );
}

function GalleryItem({ src, index }: { src: string, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.05 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 hover:border-passion/40 transition-colors duration-700 bg-black/40"
        >
            <Image
                src={src}
                alt="Iguazu Moment"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
    );
}
