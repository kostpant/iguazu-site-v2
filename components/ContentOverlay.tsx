'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { clsx } from 'clsx';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Star, Phone, Coffee, Wine, Pizza, CakeSlice, Heart, ExternalLink, MapPin, ShoppingBag } from 'lucide-react';

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

    // Smooth opacity for hero
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroTranslateY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    // Background visibility toggle
    const contentBgOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

    return (
        <div className="relative z-10 w-full min-h-[300vh]">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: LUXURY_EASE }}
                className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-8 md:px-16 py-8 md:py-12 bg-zinc-950 transition-colors duration-500"
            >
                <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-serif font-bold text-passion tracking-[0.3em] uppercase drop-shadow-md">
                        Iguazu Loutraki
                    </span>
                    <span className="text-[10px] md:text-xs text-rose tracking-[0.4em] uppercase font-light mt-1">
                        Valentine's Edition
                    </span>
                </div>

                <div className="flex gap-4">
                    <a
                        href="https://www.e-food.gr/delivery/korinthos/iguazu-coffee-shop-8104866"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-3 px-8 py-3 bg-passion text-white hover:bg-rose hover:text-charcoal transition-all duration-500 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase shadow-2xl shadow-passion/20"
                    >
                        <ShoppingBag className="w-3.5 h-3.5 fill-current" />
                        <span>Παραγγελία</span>
                    </a>
                    <a
                        href="tel:+302744021012"
                        className="flex items-center gap-3 px-8 py-3 bg-zinc-900 border border-zinc-700 text-white hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-500 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase shadow-2xl shadow-black"
                    >
                        <Phone className="w-3.5 h-3.5 fill-current" />
                        <span>Καλέστε μας</span>
                    </a>
                </div>
            </motion.header>

            {/* Hero Section - Centered */}
            <section className="h-screen sticky top-0 flex flex-col items-center justify-center text-center px-8 z-10 pointer-events-none">
                <motion.div
                    style={{ opacity: heroOpacity, y: heroTranslateY }}
                    transition={{ ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-[9.5rem] font-serif text-rose leading-[0.85] tracking-tighter mb-10 drop-shadow-[0_0_15px_rgba(230,57,70,0.5)]">
                        <span className="block drop-shadow-2xl">Αγάπη &</span>
                        <span className="block italic text-passion mt-2 drop-shadow-2xl">Καφές</span>
                    </h1>
                    <p className="text-gold font-serif italic text-lg md:text-2xl tracking-[0.6em] uppercase drop-shadow-lg">
                        Γιορτάστε τον Άγιο Βαλεντίνο στο Iguazu
                    </p>
                </motion.div>
            </section>

            {/* Content Container */}
            <div className="foreground-content w-full">
                {/* Visual Menu Sections */}
                <div className="pt-32 pb-10">
                    <div className="max-w-[1600px] mx-auto px-8 md:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                            {CATEGORIES.map((category, idx) => (
                                <CategoryCard key={category.id} category={category} delay={idx * 0.15} />
                            ))}
                        </div>
                        <div className="flex justify-center mt-12">
                            <a
                                href="https://www.e-food.gr/delivery/korinthos/iguazu-coffee-shop-8104866"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-10 py-4 overflow-hidden rounded-full bg-passion text-white shadow-[0_0_30px_rgba(230,57,70,0.4)] hover:shadow-[0_0_50px_rgba(230,57,70,0.6)] transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <div className="relative flex items-center gap-3 font-bold text-xs tracking-[0.2em] uppercase">
                                    <span>Δείτε το μενού στο efood</span>
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Features Row */}
                    <div className="max-w-7xl mx-auto px-8 md:px-16 mt-32">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <div className="mt-32">
                        <div className="text-center mb-20 px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-rose text-xs font-bold tracking-[0.8em] uppercase mb-4 block">Κριτικές</span>
                                <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 italic drop-shadow-lg">Love Notes</h2>
                                <div className="flex items-center justify-center gap-6">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 text-passion fill-passion" />)}
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/10" />
                                    <div className="flex flex-col items-start translate-y-1">
                                        <span className="text-sm font-bold text-white tracking-widest leading-none">4.8 / 5.0</span>
                                        <span className="text-[10px] text-rose uppercase tracking-[0.4em] mt-1 font-bold">Google Score</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <ReviewsMarquee />

                        <div className="flex justify-center mt-20">
                            <a
                                href="https://www.google.com/search?q=IGUAZU+LOUTRAKI+Reviews#lkt=LocalPoiReviews&rldimm=12429206646981295267"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-14 py-5 overflow-hidden transition-all duration-700"
                            >
                                <div className="absolute inset-0 border border-rose/30 group-hover:border-passion transition-colors duration-700" />
                                <div className="absolute inset-0 bg-passion translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                                <div className="relative flex items-center gap-4 text-rose group-hover:text-white font-bold text-xs tracking-[0.5em] uppercase transition-colors duration-700">
                                    <span>Μοιραστείτε την αγάπη</span>
                                    <ExternalLink className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Location & Hours Section */}
                    <LocationSection />
                </div>
            </div>

            {/* Navigation Bar */}
            <ActionBar />
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
            className="location-section mt-40 max-w-7xl mx-auto px-8 md:px-16 pb-48 relative z-30"
        >
            {/* Background Container - White Theme - Solid */}
            <div className="absolute inset-x-0 -top-20 -bottom-20 bg-white rounded-[3rem] border border-passion/10 -z-10 shadow-[0_0_100px_rgba(230,57,70,0.1)] !opacity-100" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                {/* Text Content - White box */}
                <div className="content-section-solid-white p-10 bg-white border border-zinc-200 rounded-3xl shadow-xl relative z-20">
                    <span className="text-rose text-sm font-bold tracking-[0.8em] uppercase mb-6 block text-center lg:text-left !opacity-100">Βρείτε μας</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-zinc-900 mb-12 italic text-center lg:text-left drop-shadow-none !opacity-100">Iguazu Λουτράκι</h2>

                    <div className="space-y-12 !opacity-100">
                        <div className="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start group">
                            <div className="w-10 h-10 flex items-center justify-center bg-passion text-white border border-passion/20 rounded-full group-hover:bg-passion/90 transition-colors shrink-0 !opacity-100 shadow-lg shadow-passion/20">
                                <MapPin className="w-4 h-4 !opacity-100" />
                            </div>
                            <div>
                                <h4 className="text-[12px] text-zinc-500 uppercase tracking-[0.4em] mb-2 font-bold !opacity-100">Διεύθυνση</h4>
                                <p className="text-zinc-900 text-base tracking-wide leading-relaxed font-medium !opacity-100">
                                    Ελευθερίου Βενιζέλου & Π.Ε.Ι.Ν. 36,<br />
                                    Λουτράκι 203 00
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start group">
                            <div className="w-10 h-10 flex items-center justify-center bg-passion text-white border border-passion/20 rounded-full group-hover:bg-passion/90 transition-colors shrink-0 !opacity-100 shadow-lg shadow-passion/20">
                                <Phone className="w-4 h-4 !opacity-100" />
                            </div>
                            <div>
                                <h4 className="text-[12px] text-zinc-500 uppercase tracking-[0.4em] mb-2 font-bold !opacity-100">Τηλέφωνο</h4>
                                <a href="tel:+302744021012" className="text-zinc-900 hover:text-passion transition-colors text-xl tracking-widest font-serif italic !opacity-100">
                                    2744 021012
                                </a>
                            </div>
                        </div>

                        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 border-t border-zinc-100 !opacity-100">
                            {hours.map((h, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-100 last:border-0 !opacity-100">
                                    <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-400 !opacity-100">{h.day}</span>
                                    <span className="text-[12px] font-bold text-zinc-900 tracking-widest leading-none !opacity-100">{h.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map Container - Ensuring 100% opacity */}
                <div className="content-section-solid-white relative aspect-square md:aspect-video lg:aspect-square w-full brightness-100 transition-all duration-1000 overflow-hidden rounded-[2rem] border-2 border-zinc-200 shadow-2xl z-20 bg-zinc-100">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.665798934563!2d22.973410776785863!3d37.97321590111166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a046c8273752e5%3A0xac7ef1c070f4cf4f!2sIguazu%20Loutraki!5e0!3m2!1sen!2sgr!4v1707838000000!5m2!1sen!2sgr"
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
            className="content-section-solid p-10 bg-zinc-950 border border-zinc-800 hover:border-passion/40 transition-all duration-700 group flex flex-col h-full overflow-hidden relative rounded-2xl shadow-2xl"
        >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000">
                <category.icon className="w-20 h-20 text-passion" />
            </div>

            <div className="flex items-center gap-4 mb-12 relative z-10">
                <div className="w-10 h-10 flex items-center justify-center bg-passion/10 border border-passion/20 rounded-md">
                    <category.icon className="w-4 h-4 text-passion" />
                </div>
                <h3 className="text-[11px] font-serif text-rose uppercase tracking-[0.3em] font-medium">{category.title}</h3>
            </div>

            <ul className="space-y-6 mt-auto relative z-10">
                {category.items.map((item: any, i: number) => (
                    <li key={i} className="flex flex-col group/item border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-white font-serif text-[1rem] group-hover/item:text-rose transition-colors duration-500">{item.name}</span>
                            <span className="text-passion font-bold text-xs tracking-widest">{item.price}</span>
                        </div>
                        {item.desc && (
                            <p className="text-[10px] text-zinc-400 italic font-light tracking-wide leading-relaxed group-hover/item:text-white transition-colors">
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
            className="content-section-solid p-12 border border-zinc-800 bg-zinc-950 hover:border-passion/30 transition-all duration-700 flex flex-col items-center text-center group rounded-2xl shadow-2xl"
        >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-passion/5 border border-passion/10 mb-8 group-hover:scale-110 group-hover:bg-passion/10 transition-all duration-700 text-passion">
                {icon}
            </div>
            <h4 className="text-xs font-serif text-rose uppercase tracking-[0.5em] mb-6">{title}</h4>
            <p className="text-[11px] leading-relaxed text-champagne uppercase tracking-[0.25em] max-w-[280px]">
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
            className="flex gap-8 overflow-hidden whitespace-nowrap py-10"
        >
            {doubledReviews.map((review, i) => (
                <div
                    key={i}
                    className="content-section-solid flex-shrink-0 w-[450px] p-12 bg-zinc-950 border border-zinc-800 flex flex-col justify-between group hover:border-passion/30 transition-all duration-700 rounded-2xl shadow-2xl"
                >
                    <div className="mb-8">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-passion fill-passion" />)}
                        </div>
                        <p className="text-lg md:text-xl font-serif italic text-white leading-relaxed whitespace-normal line-clamp-4 group-hover:text-rose transition-colors">
                            &quot;{review.text}&quot;
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-[1px] bg-passion opacity-50" />
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-passion group-hover:text-white transition-colors">{review.author}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ActionBar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
        >
            <div className="bg-zinc-950 p-2 rounded-full border border-zinc-800 flex gap-2 pointer-events-auto shadow-2xl">
                <a href="tel:+302744021012" className="h-12 flex items-center px-10 border border-passion/30 text-rose font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-passion hover:text-white transition-all duration-700 rounded-full">
                    Καλέστε μας
                </a>
                <Link
                    href="/gallery"
                    className="h-12 flex items-center px-8 border border-passion/30 text-white font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-passion hover:text-white transition-all duration-500 rounded-full"
                >
                    Φωτογραφίες
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
    );
}
