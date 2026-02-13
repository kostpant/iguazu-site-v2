'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { ArrowRight, Heart, Coffee, Star, Phone, MapPin, Clock, Instagram, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Animation Constants for 'Buttery Smooth' Luxury Feel
const LUXURY_EASE = [0.19, 1, 0.22, 1] as const; // Explicitly cast to const for Framer Motion
const LUXURY_DURATION = 1.2;

export default function ContentOverlay() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative z-10 w-full">
            {/* Themed Header / Action Bar */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: LUXURY_EASE, delay: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 md:px-16 pointer-events-none"
            >
                <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="text-xl md:text-2xl font-serif font-medium text-champagne tracking-[0.3em] uppercase drop-shadow-sm">
                        Iguazu Loutraki
                    </span>
                </div>

                <div className="flex items-center gap-6 pointer-events-auto relative">
                    <a
                        href="tel:+302744021012"
                        className="flex items-center gap-3 px-6 py-3 rounded-none bg-gold/10 backdrop-blur-md border border-gold/30 text-gold hover:bg-gold hover:text-charcoal transition-all duration-500 group"
                    >
                        <Phone className="w-4 h-4" />
                        <span className="hidden md:inline font-sans text-xs font-bold tracking-[0.2em] uppercase">Connect</span>
                    </a>

                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={clsx(
                                "flex items-center gap-3 px-6 py-3 rounded-none border transition-all duration-500 group",
                                isMenuOpen
                                    ? "bg-champagne text-charcoal border-champagne"
                                    : "bg-white/5 border-white/10 text-champagne hover:border-gold/50"
                            )}
                        >
                            {isMenuOpen ? <X className="w-4 h-4" /> : <Coffee className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-500" />}
                            <span className="hidden md:inline font-sans text-xs font-bold tracking-[0.2em] uppercase">Legacy</span>
                            <ChevronDown className={clsx("w-3 h-3 transition-transform duration-500", isMenuOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, ease: LUXURY_EASE }}
                                    className="absolute right-0 top-full mt-6 w-80 md:w-96 bg-charcoal/95 border border-gold/20 backdrop-blur-2xl p-8 shadow-2xl overflow-hidden text-left"
                                >
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-sm font-serif italic text-gold mb-2 tracking-widest">Est. 1992</h3>
                                            <h4 className="text-lg font-serif font-medium text-champagne tracking-wider uppercase">Iguazu Coffee Roasters</h4>
                                            <p className="text-champagne/40 text-xs font-light mt-2 tracking-wide uppercase">The art of the perfect extraction.</p>
                                        </div>

                                        <div className="space-y-5">
                                            <div className="flex items-start gap-4 group cursor-pointer">
                                                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                                <div>
                                                    <p className="text-champagne font-light text-sm tracking-wide">Eleftheriou Venizelou 36</p>
                                                    <p className="text-champagne/30 text-[10px] uppercase tracking-[0.2em] mt-1">Loutraki 203 00, Greece</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-champagne font-light text-sm tracking-wide">The Daily Ritual</p>
                                                    <p className="text-champagne/30 text-[10px] uppercase tracking-[0.2em] mt-1">06:00 AM – 10:00 PM</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 group cursor-pointer">
                                                <Instagram className="w-5 h-5 text-gold shrink-0 mt-0.5 group-hover:rotate-12 transition-transform" />
                                                <div>
                                                    <a href="https://www.instagram.com/iguazu_loutraki/" target="_blank" className="text-champagne font-light text-sm tracking-wide hover:text-gold transition-colors">
                                                        @iguazu_loutraki
                                                    </a>
                                                    <p className="text-champagne/30 text-[10px] uppercase tracking-[0.2em] mt-1">Follow the Journey</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-white/5 space-y-3">
                                            <a
                                                href="/gallery"
                                                className="flex items-center justify-center w-full py-4 bg-white/5 text-champagne font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-charcoal transition-all duration-500 border border-white/10"
                                            >
                                                The Gallery
                                            </a>
                                            <a
                                                href="https://www.google.com/maps/dir//IGUAZU+LOUTRAKI"
                                                target="_blank"
                                                className="flex items-center justify-center w-full py-4 bg-champagne text-charcoal font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-gold transition-all duration-500"
                                            >
                                                Navigate
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="h-screen flex items-center justify-center text-center px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: LUXURY_EASE }}
                    viewport={{ once: false }}
                    className="max-w-5xl w-full pt-20"
                >
                    <div className="inline-block mb-10 overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 1, ease: LUXURY_EASE, delay: 0.2 }}
                            className="block text-gold text-xs md:text-sm font-bold tracking-[0.5em] uppercase"
                        >
                            Exclusive Origin • Loutraki
                        </motion.span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-serif text-champagne mb-10 tracking-tight leading-[0.9]">
                        <span className="block opacity-90 font-light">The Ritual of</span>
                        <span className="block italic text-gold font-normal mt-2">Excellence.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-champagne/60 font-light max-w-2xl mx-auto leading-relaxed mb-12 tracking-wide">
                        Indulge in our limited-edition Valentine's roast. Meticulously crafted for those who find poetry in every extraction.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <a href="/menu" className="group relative px-12 py-5 bg-champagne text-charcoal font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-gold overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                Discover Menu <Coffee className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
                            </span>
                            <div className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
                        </a>
                        <a href="/gallery" className="group px-12 py-5 border border-champagne/20 text-champagne font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:border-gold hover:text-gold flex items-center gap-3">
                            <span>The Gallery</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Editorial Features Section */}
            <section className="min-h-screen py-32 flex items-center">
                <div className="max-w-7xl mx-auto w-full px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-white/5">
                        <FeatureCard
                            index="01"
                            title="Noble Origin"
                            description="Sourced from volcanic soils at peak altitude, our beans embody the terroir of their heritage."
                            icon={<Heart className="w-6 h-6 text-gold/50" />}
                            delay={0.2}
                        />
                        <FeatureCard
                            index="02"
                            title="Limited Harvest"
                            description="Only five hundred vessels prepared for the season of devotion. Rare, refined, fleeting."
                            icon={<Star className="w-6 h-6 text-gold" />}
                            featured={true}
                            delay={0.4}
                        />
                        <FeatureCard
                            index="03"
                            title="Artisanal Profile"
                            description="Notes of obsidian cocoa and wild berries, finished with a whisper of crystalline gold."
                            icon={<Coffee className="w-6 h-6 text-gold/50" />}
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Location / Editorial Map Section */}
            <section className="py-40 bg-charcoal/30">
                <div className="max-w-7xl mx-auto w-full px-8 flex flex-col md:flex-row gap-20 items-center">
                    <div className="w-full md:w-1/2 space-y-12 order-2 md:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: LUXURY_DURATION, ease: LUXURY_EASE }}
                            className="space-y-6"
                        >
                            <span className="text-gold text-xs font-bold tracking-[0.4em] uppercase">The Destination</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-champagne leading-tight">
                                A Sanctuary of <br /> <span className="italic text-gold italic">Refinement.</span>
                            </h2>
                            <p className="text-champagne/50 font-light text-lg leading-relaxed max-w-md">
                                Visit our flagship roastery in the heart of Loutraki, where traditional craftsmanship meets modern luxury.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Address</p>
                                <p className="text-champagne text-sm font-light leading-relaxed">
                                    Eleftheriou Venizelou & <br /> Pein 36, Loutraki 203 00
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Hours</p>
                                <p className="text-champagne text-sm font-light leading-relaxed">
                                    Mon — Sun <br /> 06:00 AM — 10:00 PM
                                </p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <a
                                href="https://www.google.com/maps/dir//IGUAZU+LOUTRAKI"
                                target="_blank"
                                className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase text-champagne hover:text-gold transition-colors group"
                            >
                                Get Directions <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                            </a>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: LUXURY_EASE }}
                        className="w-full md:w-1/2 h-[500px] grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 border border-white/5 order-1 md:order-2"
                    >
                        <iframe
                            src="https://maps.google.com/maps?q=%CE%95%CE%BB%CE%B5%CF%85%CE%B8%CE%B5%CF%81%CE%AF%CE%BF%CF%85%20%CE%92%CE%B5%CE%BD%CE%B9%CE%B6%CE%AD%CE%BB%CE%BF%CF%85%20%26%20%CE%A0%CE%AD%CE%B9%CE%BD%2036%2C%20%CE%9B%CE%BF%CF%85%CF%84%CF%81%CE%AC%CE%BA%CE%B9%20203%2000&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(95%) contrast(90%)' }}
                            allowFullScreen={true}
                            loading="lazy"
                        ></iframe>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="h-screen flex items-center justify-center px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />

                <div className="text-center relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: LUXURY_DURATION, ease: LUXURY_EASE }}
                        className="space-y-12"
                    >
                        <h2 className="text-6xl md:text-9xl font-serif text-champagne tracking-tighter leading-tight">
                            The Ritual <br /> <span className="italic text-gold">Awaits</span>
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                            <a
                                href="tel:+302744021012"
                                className="group relative px-16 py-6 border border-gold text-gold font-bold text-xs tracking-[0.4em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-700"
                            >
                                Phone Reservation
                            </a>
                            <a
                                href="https://www.google.com/maps/dir//IGUAZU+LOUTRAKI"
                                target="_blank"
                                className="text-champagne/40 hover:text-champagne transition-colors text-[10px] font-bold tracking-[0.5em] uppercase border-b border-transparent hover:border-champagne pb-2"
                            >
                                Experience in Person
                            </a>
                        </div>

                        <p className="text-champagne/30 text-xs font-light tracking-[0.2em] uppercase">
                            Available through February 14. Private bookings recommended.
                        </p>
                    </motion.div>
                </div>
            </section>

            <footer className="py-12 text-center">
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-champagne/20">
                    &copy; 2026 Iguazu Loutraki. Built for the Connoisseur.
                </p>
            </footer>
        </div>
    );
}

function TestimonialsSection() {
    const reviews = [
        { quote: "The finest roast in the Peloponnese. The Valentine's edition is a masterpiece of balance.", author: "Maria K.", rating: 5 },
        { quote: "An atmosphere of sheer elegance. My daily ritual has finally found its home.", author: "Dimitris P.", rating: 5 },
        { quote: "Exceptional bean quality. Meticulously roasted. This is what coffee was meant to be.", author: "Elena G.", rating: 5 },
    ];

    const [index, setIndex] = useState(0);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center py-40 bg-charcoal/20">
            <div className="w-full max-w-5xl mx-auto px-8">
                <div className="flex flex-col md:flex-row gap-20 items-center">
                    <div className="w-full md:w-1/3">
                        <span className="text-gold text-xs font-bold tracking-[0.5em] uppercase block mb-6">Acclaim</span>
                        <h2 className="text-5xl font-serif text-champagne leading-tight mb-8">
                            Voice of the <br /> <span className="italic text-gold">Connoisseur.</span>
                        </h2>
                        <div className="flex gap-4">
                            <button onClick={() => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)} className="p-4 border border-white/5 hover:border-gold/50 transition-colors text-champagne">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button onClick={() => setIndex((prev) => (prev + 1) % reviews.length)} className="p-4 border border-white/5 hover:border-gold/50 transition-colors text-champagne">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 relative h-[300px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.8, ease: LUXURY_EASE }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                <p className="text-3xl md:text-4xl font-serif italic text-champagne/90 leading-relaxed mb-10">
                                    "{reviews[index].quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-[1px] w-12 bg-gold" />
                                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-gold">{reviews[index].author}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ index, title, description, icon, featured, delay }: { index: string, title: string, description: string, icon: any, featured?: boolean, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: LUXURY_DURATION, ease: LUXURY_EASE }}
            viewport={{ once: true }}
            className={clsx(
                "p-12 border-x border-white/5 flex flex-col justify-between group transition-all duration-700",
                featured ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
            )}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-gold/30 group-hover:text-gold transition-colors duration-700">{index}</span>
                    <div className="group-hover:scale-110 transition-transform duration-700">{icon}</div>
                </div>
                <h3 className="text-2xl font-serif text-champagne tracking-wide">{title}</h3>
                <p className="text-champagne/40 font-light text-sm leading-relaxed tracking-wide">{description}</p>
            </div>
            <div className="mt-12 h-[1px] w-0 bg-gold group-hover:w-full transition-all duration-1000" />
        </motion.div>
    );
}
