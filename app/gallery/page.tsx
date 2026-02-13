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

const LUXURY_EASE = [0.19, 1, 0.22, 1] as const;
const LUXURY_DURATION = 1.2;

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-6 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
                <Link href="/" className="group flex items-center gap-2 text-rose hover:text-passion transition-colors duration-300">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-serif uppercase tracking-widest text-sm font-bold">Επιστροφή</span>
                </Link>
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-serif font-bold text-passion tracking-widest uppercase mb-1">ΦΩΤΟΓΡΑΦΙΕΣ</h1>
                    <div className="w-12 h-0.5 bg-gold mx-auto rounded-full" />
                </div>
                <div className="w-24 hidden md:block" /> {/* Spacer */}
            </header>

            <div className="relative z-10 pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {GALLERY_IMAGES.map((src, index) => (
                        <GalleryItem key={index} src={src} index={index} />
                    ))}
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-20 text-center"
                >
                    <a
                        href="https://www.e-food.gr/delivery/korinthos/iguazu-coffee-shop-8104866"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-passion text-white rounded-full font-bold uppercase tracking-widest hover:bg-rose transition-all duration-500 shadow-2xl shadow-passion/20 group"
                    >
                        <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Παραγγελία Online</span>
                    </a>
                </motion.div>
            </div>
        </main>
    );
}

function GalleryItem({ src, index }: { src: string, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: LUXURY_DURATION, ease: LUXURY_EASE, delay: index * 0.05 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-passion/40 transition-all duration-500 shadow-lg"
        >
            <Image
                src={src}
                alt="Iguazu Moment"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
    );
}
