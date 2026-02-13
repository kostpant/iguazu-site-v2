'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { clsx } from 'clsx';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Star, Phone, Coffee, Wine, Pizza, CakeSlice, Heart, ExternalLink, MapPin, ShoppingBag, Camera } from 'lucide-react';

// Animation Constants
const LUXURY_EASE = [0.19, 1, 0.22, 1] as const;
const LUXURY_DURATION = 1.2;

// --- Menu Data (Scraped from efood) ---
const CATEGORIES = [
    {
        id: 'popular',
        title: 'Δημοφιλή',
        icon: Star,
        items: [
            { name: "Freddo Espresso", price: "2,40 €" },
            { name: "Cappuccino", price: "2,50 €" },
            { name: "Freddo Cappuccino", price: "2,50 €" },
            { name: "Φλογέρα Philadelphia", price: "2,50 €" }
        ]
    },
    {
        id: 'coffees',
        title: 'Καφές',
        icon: Coffee,
        items: [
            { name: "Espresso", price: "2,00 €" },
            { name: "Freddo Espresso", price: "2,40 €" },
            { name: "Cappuccino", price: "2,50 €" },
            { name: "Freddo Cappuccino", price: "2,50 €" },
            { name: "Flat White", price: "2,70 €" },
            { name: "Nes", price: "2,40 €" },
            { name: "Frappe", price: "2,40 €" },
            { name: "Filter Coffee", price: "2,50 €" }
        ]
    },
    {
        id: 'chocolates',
        title: 'Σοκολάτες',
        icon: Heart,
        items: [
            { name: "Σοκολάτα", price: "2,70 €" },
            { name: "Σοκολάτα Bueno", price: "3,00 €" },
            { name: "Σοκολάτα Lila & Strawberry", price: "2,80 €" },
            { name: "Mochaccino", price: "4,00 €" }
        ]
    },
    {
        id: 'snacks',
        title: 'Σνακ',
        icon: Pizza,
        items: [
            { name: "Φλογέρα Philadelphia", price: "2,50 €" },
            { name: "Τοστ Γαλοπούλα", price: "2,50 €" }
        ]
    },
    {
        id: 'cocktails',
        title: 'Κοκτέιλ',
        icon: Wine,
        items: [
            { name: "Mojito", price: "7,00 €", desc: "Ρούμι, λάιμ, μέντα & σόδα" },
            { name: "Porn Star", price: "7,00 €", desc: "Βανίλια, φρούτα του πάθους, λάιμ & βότκα" },
            { name: "Mai Tai", price: "7,00 €", desc: "Ρούμι, λάιμ, πικραμύγδαλο & πορτοκάλι" },
            { name: "Daiquiri Strawberry", price: "7,00 €", desc: "Ρούμι, λάιμ & φράουλα" }
        ]
    },
    {
        id: 'refreshments',
        title: 'Αναψυκτικά',
        icon: Wine,
        items: [
            { name: "Coca-Cola", price: "2,00 €" },
            { name: "Fanta", price: "2,00 €" },
            { name: "Sprite", price: "2,00 €" },
            { name: "Σπιτική Λεμονάδα", price: "3,50 €" }
        ]
    }
];

const REVIEWS = [
    { author: "Κατερίνα Βαγγέλη", text: "Πολύ καθαρό και όμορφο μαγαζί, το προσωπικό ήταν εξαιρετικά ευγενικό και εξυπηρετικό!! Μας πρότεινε και τον μονοποικιλιακό του καφέ (βανίλια) και ήταν εξαιρετικός!! Μπράβο σας!!" },
    { author: "Αλεξία Παραβάλου", text: "Πολύ καλό καφέ και πολύ δροσερό περιβάλλον με υδρονέφωση!" },
    { author: "Πέτρος Γιόχανσον", text: "ΠΡΩΤΗ ΦΟΡΑ παραγγελία. Ωραίος καφές και σφολιάτες. Θα ξανά προτιμηθεί" },
    { author: "Παναγιώτης Κ.", text: "Εξαιρετικό μέρος για καφέ και ποτό. Πολύ καλή εξυπηρέτηση και ωραία ατμόσφαιρα." },
    { author: "Μαρία Δ.", text: "Ο καλύτερος καφές στο Λουτράκι! Το προσωπικό είναι πάντα χαμογελαστό." }
];

export default function ContentOverlay() {
    const { scrollYProgress } = useScroll();

    // Buttery smooth scroll transitions
    const springConfig = { stiffness: 80, damping: 25, mass: 1 };
    const smoothProgress = useSpring(scrollYProgress, springConfig);

    // Smooth opacity for hero
    const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const heroTranslateY = useTransform(smoothProgress, [0, 0.15], [0, -50]);

    // Background visibility toggle
    const contentBgOpacity = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);

    return (
        <div className="relative z-10 w-full min-h-[300vh]">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: LUXURY_EASE }}
                className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-3 md:px-8 lg:px-16 py-3.5 md:py-6 bg-zinc-950 transition-colors duration-500"
            >
                <div className="flex flex-col">
                    <span className="text-[14px] xs:text-base md:text-xl lg:text-2xl font-serif font-bold text-passion tracking-[0.05em] xs:tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-md whitespace-nowrap">
                        Iguazu Loutraki
                    </span>
                    <span className="text-[7px] xs:text-[8px] md:text-[10px] lg:text-xs text-rose tracking-[0.1em] xs:tracking-[0.3em] md:tracking-[0.4em] uppercase font-light mt-0.5 md:mt-1 whitespace-nowrap">
                        Valentine's Edition
                    </span>
                </div>

                <div className="flex gap-1.5 xs:gap-2 md:gap-3 lg:gap-4">
                    <a
                        href="https://www.e-food.gr/delivery/korinthos/iguazu-coffee-shop-8104866"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target flex items-center gap-1.5 xs:gap-2 md:gap-3 px-3 xs:px-4 md:px-8 py-2 md:py-4 bg-passion text-white hover:bg-rose hover:text-charcoal transition-all duration-500 rounded-full font-bold text-[8px] xs:text-[9px] md:text-sm tracking-[0.1em] xs:tracking-[0.15em] md:tracking-[0.2em] uppercase shadow-2xl shadow-passion/20"
                    >
                        <ShoppingBag className="w-2.5 h-2.5 xs:w-3 xs:h-3 md:w-5 md:h-5 fill-current" />
                        <span className="hidden sm:inline">Παραγγελία</span>
                        <span className="sm:hidden">Efood</span>
                    </a>
                    <a
                        href="tel:+302744021012"
                        className="touch-target flex items-center gap-1.5 xs:gap-2 md:gap-3 px-3 xs:px-4 md:px-8 py-2 md:py-4 bg-zinc-900 border border-zinc-700 text-white hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-500 rounded-full font-bold text-[8px] xs:text-[9px] md:text-sm tracking-[0.1em] xs:tracking-[0.15em] md:tracking-[0.2em] uppercase shadow-2xl shadow-black"
                    >
                        <Phone className="w-2.5 h-2.5 xs:w-3 xs:h-3 md:w-5 md:h-5 fill-current" />
                        <span className="hidden sm:inline">Καλέστε μας</span>
                    </a>
                </div>
            </motion.header>

            {/* Hero Section - Centered */}
            <section className="min-h-[100dvh] sticky top-0 flex flex-col items-center justify-center text-center px-4 xs:px-8 z-10 pt-14 md:pt-32">
                <motion.div
                    style={{
                        opacity: heroOpacity,
                        y: heroTranslateY,
                        scale: useTransform(heroOpacity, [0, 1], [0.98, 1]) // Subtle parallax scale
                    }}
                    transition={{ ease: "easeOut" }}
                    className="pointer-events-none py-4"
                >
                    <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9.5rem] font-serif text-rose leading-[1.1] tracking-tighter mb-6 md:mb-10 drop-shadow-[0_0_15px_rgba(230,57,70,0.5)]">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: LUXURY_EASE, delay: 0.2 }}
                            className="block drop-shadow-2xl"
                        >
                            Αγάπη &
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: LUXURY_EASE, delay: 0.4 }}
                            className="block italic text-passion mt-2 drop-shadow-2xl"
                        >
                            Καφές
                        </motion.span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="text-gold font-serif italic text-sm xs:text-base md:text-2xl tracking-[0.2em] xs:tracking-[0.4em] md:tracking-[0.6em] uppercase drop-shadow-lg mb-8"
                    >
                        Γιορτάστε τον Άγιο Βαλεντίνο στο Iguazu
                    </motion.p>
                </motion.div>

                {/* Hero CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 md:gap-6 justify-center items-center pointer-events-auto w-full max-w-[280px] sm:max-w-none px-4 xs:px-0 mt-4">
                    <motion.a
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: LUXURY_EASE, delay: 1.0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://www.e-food.gr/delivery/korinthos/iguazu-coffee-shop-8104866"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-6 xs:px-8 md:px-12 py-3.5 xs:py-4 md:py-4.5 overflow-hidden rounded-full bg-passion text-white shadow-[0_0_30px_rgba(230,57,70,0.4)] hover:shadow-[0_0_50px_rgba(230,57,70,0.6)] transition-all duration-500 w-full sm:w-auto text-center"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <div className="relative flex items-center justify-center gap-2 xs:gap-3 font-bold text-[10px] xs:text-xs md:text-sm tracking-[0.1em] xs:tracking-[0.2em] uppercase whitespace-nowrap">
                            <ShoppingBag className="w-3.5 h-3.5 md:w-5 md:h-5" />
                            <span>Παραγγελία</span>
                        </div>
                    </motion.a>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: LUXURY_EASE, delay: 1.2 }}
                        className="w-full sm:w-auto"
                    >
                        <Link
                            href="/menu"
                            className="group relative px-6 xs:px-8 md:px-12 py-3.5 xs:py-4 md:py-4.5 overflow-hidden rounded-full bg-gold text-charcoal shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-500 block w-full text-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative flex items-center justify-center gap-2 xs:gap-3 font-bold text-[10px] xs:text-xs md:text-sm tracking-[0.1em] xs:tracking-[0.2em] uppercase whitespace-nowrap"
                            >
                                <Coffee className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                <span>Ο Κατάλογος μας</span>
                            </motion.div>
                        </Link>
                    </motion.div>

                    <motion.a
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: LUXURY_EASE, delay: 1.4 }}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(230,57,70,1)', color: '#fff' }}
                        whileTap={{ scale: 0.98 }}
                        href="/gallery"
                        className="group relative px-6 xs:px-8 md:px-12 py-3.5 xs:py-4 md:py-4.5 overflow-hidden rounded-full border-2 border-rose text-rose transition-all duration-500 w-full sm:w-auto text-center"
                    >
                        <div className="relative flex items-center justify-center gap-2 xs:gap-3 font-bold text-[10px] xs:text-xs md:text-sm tracking-[0.1em] xs:tracking-[0.2em] uppercase whitespace-nowrap">
                            <Camera className="w-3.5 h-3.5 md:w-5 md:h-5" />
                            <span>Gallery</span>
                        </div>
                    </motion.a>
                </div>
            </section>

            {/* Content Container */}
            <div className="foreground-content w-full">
                {/* Visual Menu Sections - REMOVED Price List from landing per user request */}

                {/* Features Row */}
                <div className="max-w-7xl mx-auto px-3 xs:px-4 md:px-8 lg:px-16 mt-20 md:mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                        <FeatureBox
                            title="Ρομαντική Ατμόσφαιρα"
                            desc="Το τέλειο σκηνικό για εσάς και το αγαπημένο σας πρόσωπο."
                            icon={<Heart className="w-5 h-5" />}
                            delay={0.1}
                        />
                        <FeatureBox
                            title="Premium Κοκτέιλ"
                            desc="Εκλεκτά signature κοκτέιλ για να γιορτάσετε τη βραδιά."
                            icon={<Wine className="w-5 h-5" />}
                            delay={0.2}
                        />
                        <FeatureBox
                            title="Γλυκές Απολαύσεις"
                            desc="Αφεθείτε στις απολαυστικές σοκολάτες και τα γλυκά μας."
                            icon={<CakeSlice className="w-5 h-5" />}
                            delay={0.3}
                        />
                    </div>
                </div>

                {/* Google Reviews Section */}
                <div className="mt-20 md:mt-32">
                    <div className="text-center mb-12 md:mb-20 px-4 md:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-rose text-[10px] xs:text-xs font-bold tracking-[0.5em] xs:tracking-[0.8em] uppercase mb-4 block">Κριτικές</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 md:mb-8 italic drop-shadow-lg leading-tight">Love Notes</h2>
                            <div className="flex flex-col xs:flex-row items-center justify-center gap-4 xs:gap-6">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 xs:w-5 xs:h-5 text-passion fill-passion" />)}
                                </div>
                                <div className="hidden xs:block w-[1px] h-8 bg-white/10" />
                                <div className="flex flex-row xs:flex-col items-center xs:items-start gap-2 xs:gap-0 translate-y-0 xs:translate-y-1">
                                    <span className="text-sm font-bold text-white tracking-widest leading-none">4.8 / 5.0</span>
                                    <span className="text-[9px] xs:text-[10px] text-rose uppercase tracking-[0.2em] xs:tracking-[0.4em] xs:mt-1 font-bold">Google Score</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <ReviewsMarquee />

                    <div className="flex justify-center mt-12 md:mt-20 px-4">
                        <a
                            href="https://www.google.com/search?sca_esv=33887d7ce87e6d2b&sxsrf=ANbL-n6fBDE3nWNaWN5EJa4IAEylkxsx8A:1771013033800&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOToxzwX5KE4Rr0KD9vPz5vrY-08jSrdYDfh0Nkt6Pu9SxwpNoaiN9OYGOE9bh645E-T-VvY9w3g-3v5HTjUGzDicVQZO&q=IGUAZU+LOUTRAKI+Reviews&sa=X&ved=2ahUKEwj1t5bWodeSAxXCOHoKHQipEfkQ0bkNegQIPRAF&biw=2133&bih=1032&dpr=0.9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-6 xs:px-8 py-2.5 xs:py-3 overflow-hidden transition-all duration-700 w-auto text-center rounded-full"
                        >
                            <div className="absolute inset-0 border border-rose/30 group-hover:border-passion transition-colors duration-700 rounded-full" />
                            <div className="absolute inset-0 bg-passion translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                            <div className="relative flex items-center justify-center gap-3 text-rose group-hover:text-white font-bold text-[9px] xs:text-[10px] tracking-[0.2em] xs:tracking-[0.3em] uppercase transition-colors duration-700">
                                <span>Μοιραστείτε την αγάπη</span>
                                <ExternalLink className="w-3 xs:w-3.5 h-3 xs:w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                        </a>
                    </div>
                </div>

                {/* Location & Hours Section */}
                <LocationSection />
            </div>
        </div>
    );
}

function LocationSection() {
    const hours = [
        { day: "Δευτέρα", time: "6 ΠΜ – 10 MM" },
        { day: "Τρίτη", time: "6 ΠΜ – 10 MM" },
        { day: "Τετάρτη", time: "6 ΠΜ – 10 MM" },
        { day: "Πέμπτη", time: "6 ΠΜ – 1 MM" },
        { day: "Παρασκευή", time: "6 ΠΜ – 10 MM" },
        { day: "Σάββατο", time: "6 ΠΜ – 10 MM" },
        { day: "Κυριακή", time: "6 ΠΜ – 10 MM" },
    ];

    return (
        <section
            id="location"
            className="location-section-dark mt-24 md:mt-40 max-w-7xl mx-auto px-3 xs:px-4 md:px-8 lg:px-16 pb-24 md:pb-48 relative z-30"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-center relative z-10">
                {/* Text Content - Dark theme */}
                <div className="text-content p-5 xs:p-8 md:p-10 bg-zinc-950/80 border border-champagne/20 rounded-3xl shadow-2xl shadow-black/50 relative z-20 backdrop-blur-sm">
                    <span className="text-rose text-[10px] xs:text-sm font-bold tracking-[0.5em] xs:tracking-[0.8em] uppercase mb-4 xs:mb-6 block text-center lg:text-left">Βρείτε μας</span>
                    <h2 className="text-3xl xs:text-4xl md:text-5xl lg:text-7xl font-serif text-champagne mb-6 md:mb-12 italic text-center lg:text-left drop-shadow-sm leading-tight">Iguazu Λουτράκι</h2>

                    <div className="space-y-6 xs:space-y-8 md:space-y-12">
                        <div className="flex flex-col gap-3 xs:gap-4 text-center lg:text-left items-center lg:items-start group">
                            <div className="w-8 h-8 xs:w-10 xs:h-10 flex items-center justify-center bg-passion text-white border border-passion/20 rounded-full group-hover:bg-passion/90 transition-colors shrink-0 shadow-lg shadow-passion/20">
                                <MapPin className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                            </div>
                            <div>
                                <h4 className="text-[10px] xs:text-[12px] text-rose uppercase tracking-[0.3em] xs:tracking-[0.4em] mb-1 xs:mb-2 font-bold">Διεύθυνση</h4>
                                <p className="text-champagne text-sm xs:text-base tracking-wide leading-relaxed font-medium">
                                    Ελευθερίου Βενιζέλου & Π.Ε.Ι.Ν. 36,<br />
                                    Λουτράκι 203 00
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 xs:gap-4 text-center lg:text-left items-center lg:items-start group">
                            <div className="w-8 h-8 xs:w-10 xs:h-10 flex items-center justify-center bg-passion text-white border border-passion/20 rounded-full group-hover:bg-passion/90 transition-colors shrink-0 shadow-lg shadow-passion/20">
                                <Phone className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                            </div>
                            <div>
                                <h4 className="text-[10px] xs:text-[12px] text-rose uppercase tracking-[0.3em] xs:tracking-[0.4em] mb-1 xs:mb-2 font-bold">Τηλέφωνο</h4>
                                <a href="tel:+302744021012" className="text-champagne hover:text-passion transition-colors text-lg xs:text-xl tracking-widest font-serif italic">
                                    2744 021012
                                </a>
                            </div>
                        </div>

                        {/* Opening Hours - Improved Design */}
                        <div className="pt-6 md:pt-8 border-t border-champagne/20">
                            <h4 className="text-[10px] xs:text-[12px] text-rose uppercase tracking-[0.3em] xs:tracking-[0.4em] mb-4 font-bold text-center lg:text-left">Ωράριο Λειτουργίας</h4>
                            <div className="space-y-1.5 xs:space-y-2">
                                {hours.map((h, i) => (
                                    <div key={i} className="flex justify-between items-center py-1.5 xs:py-2 px-2 xs:px-3 rounded-lg hover:bg-champagne/5 transition-colors">
                                        <span className="text-[11px] xs:text-[12px] md:text-[13px] tracking-wide font-medium text-champagne/80">{h.day}</span>
                                        <span className="text-[11px] xs:text-[12px] md:text-[13px] font-bold text-champagne tracking-wide">{h.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Container - Dark theme with pin */}
                <div className="map-container relative aspect-square md:aspect-video lg:aspect-square w-full transition-all duration-1000 overflow-hidden rounded-[1.5rem] xs:rounded-[2rem] border-2 border-champagne/20 shadow-2xl shadow-black/50 z-20 bg-zinc-950/60 backdrop-blur-sm">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.1305955111466!2d22.974961375892928!3d37.97408147193599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a015c9ebc0dd2d%3A0xac7d6997b93e7ca3!2sIGUAZU%20LOUTRAKI!5e0!3m2!1sel!2sgr!4v1771010575901!5m2!1sel!2sgr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale-0"
                    />
                </div>
            </div>
        </section>
    );
}

function CategoryCard({ category, delay }: { category: any, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: LUXURY_DURATION, ease: LUXURY_EASE, delay }}
            className="content-section-solid p-4 xs:p-5 md:p-6 lg:p-7 bg-zinc-950 border border-zinc-800 hover:border-passion/40 hover:scale-[1.02] transition-all duration-700 group flex flex-col h-full overflow-hidden relative rounded-2xl shadow-2xl cursor-pointer"
        >
            <div className="absolute top-0 right-0 p-3 xs:p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000">
                <category.icon className="w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 text-passion" />
            </div>

            <div className="flex items-center gap-2 xs:gap-3 mb-4 xs:mb-5 md:mb-6 relative z-10 border-b border-zinc-800 pb-3 xs:pb-4">
                <div className="w-7 h-7 xs:w-8 xs:h-8 flex items-center justify-center bg-passion/10 border border-passion/20 rounded-md">
                    <category.icon className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-passion" />
                </div>
                <h3 className="text-[9px] xs:text-[10px] md:text-[11px] font-serif text-rose uppercase tracking-[0.2em] xs:tracking-[0.3em] font-medium whitespace-nowrap">{category.title}</h3>
            </div>

            <ul className="space-y-1.5 xs:space-y-2 relative z-10">
                {category.items.map((item: any, i: number) => (
                    <li key={i} className="flex flex-col group/item border-b border-zinc-800/50 pb-1.5 xs:pb-2 last:border-0 last:pb-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <span className="text-white font-serif text-[0.9rem] xs:text-[0.95rem] group-hover/item:text-rose transition-colors duration-500 leading-tight">{item.name}</span>
                            <span className="text-passion font-bold text-[9px] xs:text-[10px] md:text-xs tracking-widest ml-4">{item.price}</span>
                        </div>
                        {item.desc && (
                            <p className="text-[8px] xs:text-[9px] md:text-[10px] text-zinc-400 italic font-light tracking-wide leading-relaxed group-hover/item:text-white transition-colors">
                                {item.desc}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

function FeatureBox({ title, desc, icon, delay }: { title: string, desc: string, icon: any, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay }}
            className="content-section-solid p-5 xs:p-8 md:p-10 lg:p-12 border border-zinc-800 bg-zinc-950 hover:border-passion/30 transition-all duration-700 flex flex-col items-center text-center group rounded-2xl shadow-2xl cursor-pointer"
        >
            <div className="w-12 h-12 xs:w-16 xs:h-16 flex items-center justify-center rounded-full bg-passion/5 border border-passion/10 mb-5 xs:mb-8 group-hover:scale-110 group-hover:bg-passion/10 transition-all duration-700 text-passion">
                {icon}
            </div>
            <h4 className="text-[10px] xs:text-xs font-serif text-rose uppercase tracking-[0.3em] xs:tracking-[0.5em] mb-4 xs:mb-6 leading-tight">{title}</h4>
            <p className="text-[9px] xs:text-[11px] leading-relaxed text-champagne uppercase tracking-[0.1em] xs:tracking-[0.25em] max-w-[280px]">
                {desc}
            </p>
        </motion.div>
    );
}

function ReviewsMarquee() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId: number;
        let scrollAmount = 0;
        const scrollSpeed = 0.6;

        const scroll = () => {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                scrollAmount = 0;
            }
            scrollContainer.scrollLeft = scrollAmount;
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const doubledReviews = [...REVIEWS, ...REVIEWS];

    return (
        <div
            ref={scrollRef}
            className="flex gap-4 xs:gap-8 overflow-hidden whitespace-nowrap py-6 xs:py-10"
        >
            {doubledReviews.map((review, i) => (
                <div
                    key={i}
                    className="content-section-solid flex-shrink-0 w-[85vw] xs:w-[320px] md:w-[450px] p-6 xs:p-10 md:p-12 bg-zinc-950 border border-zinc-800 flex flex-col justify-between group hover:border-passion/30 transition-all duration-700 rounded-2xl shadow-2xl"
                >
                    <div className="mb-6 xs:mb-8">
                        <div className="flex gap-1 mb-4 xs:mb-6">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-passion fill-passion" />)}
                        </div>
                        <p className="text-base xs:text-lg md:text-xl font-serif italic text-white leading-relaxed whitespace-normal line-clamp-4 group-hover:text-rose transition-colors">
                            &quot;{review.text}&quot;
                        </p>
                    </div>
                    <div className="flex items-center gap-3 xs:gap-4">
                        <div className="w-4 xs:w-6 h-[1px] bg-passion opacity-50" />
                        <span className="text-[8px] xs:text-[9px] font-bold tracking-[0.3em] xs:tracking-[0.4em] uppercase text-passion group-hover:text-white transition-colors">{review.author}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

