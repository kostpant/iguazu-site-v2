'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { ArrowRight, Heart, Coffee, Star, Phone, MapPin, Clock, Instagram, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ContentOverlay() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative z-10 w-full">
            {/* Themed Header / Action Bar */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none"
            >
                <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="text-xl md:text-2xl font-serif font-bold text-white tracking-widest uppercase shadow-black drop-shadow-lg">
                        Iguazu Loutraki
                    </span>
                </div>

                <div className="flex items-center gap-4 pointer-events-auto relative">
                    <a
                        href="tel:+302744021012"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-passion/90 backdrop-blur-md border border-white/20 text-white hover:bg-gold transition-all duration-300 group shadow-lg shadow-passion/20"
                    >
                        <Phone className="w-4 h-4 text-white" />
                        <span className="hidden md:inline font-sans text-sm font-bold tracking-wide">Κλήση</span>
                    </a>

                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={clsx(
                                "flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 group",
                                isMenuOpen
                                    ? "bg-white text-black border-white"
                                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                            )}
                        >
                            {isMenuOpen ? <X className="w-4 h-4" /> : <Coffee className="w-4 h-4 text-gold group-hover:text-white transition-colors" />}
                            <span className="hidden md:inline font-sans text-sm font-medium tracking-wide">Πληροφορίες</span>
                            <ChevronDown className={clsx("w-3 h-3 transition-transform duration-300", isMenuOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-4 w-80 md:w-96 bg-obsidian/95 border border-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl overflow-hidden text-left"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-passion to-gold" />

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-serif font-bold text-white mb-1">Iguazu Coffee Roasters</h3>
                                            <p className="text-white/60 text-sm">Ζήστε την εμπειρία στο Λουτράκι.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <MapPin className="w-5 h-5 text-passion shrink-0 mt-1" />
                                                <div>
                                                    <p className="text-white font-medium text-sm">Ελευθερίου Βενιζέλου 36</p>
                                                    <p className="text-white/40 text-xs">Λουτράκι 203 00, Ελλάδα</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <Clock className="w-5 h-5 text-passion shrink-0 mt-1" />
                                                <div>
                                                    <p className="text-white font-medium text-sm">Ωράριο Λειτουργίας</p>
                                                    <p className="text-white/60 text-sm">06:00 ΠΜ – 10:00 ΜΜ</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <Instagram className="w-5 h-5 text-gold shrink-0 mt-1" />
                                                <div>
                                                    <a href="https://www.instagram.com/iguazu_loutraki/" target="_blank" className="text-white font-medium text-sm hover:text-gold transition-colors">
                                                        @iguazu_loutraki
                                                    </a>
                                                    <p className="text-white/40 text-xs">Ακολουθήστε μας</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10 space-y-3">
                                            <a
                                                href="/gallery"
                                                className="flex items-center justify-center w-full py-3 rounded-lg bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors border border-white/10"
                                            >
                                                Φωτογραφίες
                                            </a>
                                            <a
                                                href="https://www.google.com/maps/dir//IGUAZU+LOUTRAKI"
                                                target="_blank"
                                                className="flex items-center justify-center w-full py-3 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors"
                                            >
                                                Λήψη Οδηγιών
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.header>

            {/* 1) Hero Beat (0-15%) */}
            <section className="h-screen flex items-end justify-center text-center pb-32 md:pb-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="max-w-4xl w-full bg-black/40 backdrop-blur-lg border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-amber-200/30 bg-amber-900/20 backdrop-blur-sm mb-6">
                        <span className="text-amber-200 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                            Μόνο στο Iguazu Loutraki
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
                        <span className="block text-white/90">Ο Καφές που θα</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 italic">
                            Ερωτευτείτε.
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-amber-100/80 font-light max-w-2xl mx-auto leading-relaxed mb-8">
                        Σας προσκαλούμε να δοκιμάσετε το αποκλειστικό χαρμάνι του Αγίου Βαλεντίνου. <br className="hidden md:block" />
                        Φτιαγμένο με αγάπη και μεράκι, για να κάνει την κάθε σας στιγμή ξεχωριστή.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a href="/menu" className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-white/10">
                                <span>ΜΕΝΟΥ</span> <Coffee className="w-4 h-4" />
                            </a>
                            <a href="/gallery" className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white font-medium transition-all hover:scale-105 flex items-center gap-2 group">
                                <span>ΦΩΤΟΓΡΑΦΙΕΣ</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 2) Core Features (20-55%) */}
            <section className="min-h-[120vh] flex flex-col justify-center py-20 bg-gradient-to-b from-transparent to-black/80">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto w-full px-6">
                    <FeatureCard
                        title="Προέλευση Premium"
                        description="Κόκκοι ηθικής προέλευσης από τα καλύτερα ηφαιστειακά εδάφη, καβουρδισμένοι στην εντέλεια εδώ."
                        icon={<Heart className="w-8 h-8 text-passion" />}
                        delay={0.2}
                    />
                    <FeatureCard
                        title="ΠΕΡΙΟΡΙΣΜΕΝΗ ΕΚΔΟΣΗ"
                        description="Διαθέσιμο αποκλειστικά για την εβδομάδα του Αγίου Βαλεντίνου. Μόνο 500 φλιτζάνια."
                        icon={<Coffee className="w-8 h-8 text-gold" />}
                        featured={true}
                        delay={0.4}
                    />
                    <FeatureCard
                        title="Βελούδινη Επίγευση"
                        description="Μια αισθητηριακή εμπειρία με νότες μαύρου κακάο, κόκκινων μούρων και μια πινελιά χρυσού."
                        icon={<Star className="w-8 h-8 text-passion" />}
                        delay={0.6}
                    />
                </div>
            </section>

            {/* 3) Testimonials Carousel (60-80%) */}
            <TestimonialsSection />

            {/* 3.5) Location / Map Section */}
            <section className="min-h-[60vh] flex flex-col items-center justify-center py-20 relative">
                <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-full md:w-1/2 h-[400px] rounded-2xl overflow-hidden border border-white/10 z-10 shadow-2xl"
                    >
                        {/* Google Maps Embed - Dark Mode via CSS Filter */}
                        <iframe
                            src="https://maps.google.com/maps?q=%CE%95%CE%BB%CE%B5%CF%85%CE%B8%CE%B5%CF%81%CE%AF%CE%BF%CF%85%20%CE%92%CE%B5%CE%BD%CE%B9%CE%B6%CE%AD%CE%BB%CE%BF%CF%85%20%26%20%CE%A0%CE%AD%CE%B9%CE%BD%2036%2C%20%CE%9B%CE%BF%CF%85%CF%84%CF%81%CE%AC%CE%BA%CE%B9%20203%2000&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>

                    <div className="w-full md:w-1/2 space-y-6">
                        {/* Reordered: Hours -> Title -> Address */}

                        <div className="flex items-center gap-3 text-gold">
                            <Clock className="w-5 h-5" />
                            <span className="font-bold tracking-widest uppercase text-sm">Ανοιχτά Καθημερινά 06:00 ΠΜ – 10:00 ΜΜ</span>
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-serif text-white leading-tight"
                        >
                            Βρείτε το Δρόμο <br /> προς την <span className="text-gold">Πολυτέλεια</span>
                        </motion.h2>

                        <div className="pt-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-black/20 border border-white/10 backdrop-blur-sm">
                                    <MapPin className="w-6 h-6 text-passion" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-white mb-1">IGUAZU LOUTRAKI</p>
                                    <p className="text-white/90">Ελευθερίου Βενιζέλου & Πέιν 36</p>
                                    <p className="text-white/60">Λουτράκι 203 00</p>
                                    <a
                                        href="https://www.google.com/maps?num=10&sca_esv=6b4fab2358e63335&hl=el-GR&sxsrf=ANbL-n6Dw6cmVJ7c1oFdrEGNdCmgr95a6g:1770933451287&biw=1920&bih=991&dpr=1&um=1&ie=UTF-8&fb=1&gl=gr&sa=X&geocode=KS3dwOvJFaAUMaN8PrmXaX2s&daddr=%CE%95%CE%BB%CE%B5%CF%85%CE%B8%CE%B5%CF%81%CE%AF%CE%BF%CF%85+%CE%92%CE%B5%CE%BD%CE%B9%CE%B6%CE%AD%CE%BB%CE%BF%CF%85+%26,+%CE%A0%CE%AD%CE%B9%CE%BD+36,+%CE%9B%CE%BF%CF%85%CF%84%CF%81%CE%AC%CE%BA%CE%B9+203+00"
                                        target="_blank"
                                        className="inline-block mt-2 text-sm text-gold hover:underline"
                                    >
                                        Λήψη Οδηγιών
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4) CTA (85-100%) */}
            <section className="h-[80vh] flex items-end justify-center pb-24 px-6 relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-passion/20 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-center relative z-10"
                >
                    <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tighter">
                        Δωρίστε την Τελετουργία
                    </h2>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                        <a
                            href="tel:+302744021012"
                            className="relative overflow-hidden group bg-passion hover:bg-gold text-white text-lg font-bold py-5 px-12 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(211,47,47,0.5)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                ΤΗΛΕΦΩΝΙΚΗ ΠΑΡΑΓΓΕΛΙΑ <Phone className="w-5 h-5" />
                            </span>
                        </a>
                        <a
                            href="https://www.google.com/maps/dir//IGUAZU+LOUTRAKI"
                            target="_blank"
                            className="px-12 py-5 rounded-full border border-white/20 hover:bg-white/10 text-white font-medium transition-all"
                        >
                            Επισκεφθείτε Μας
                        </a>
                    </div>

                    <p className="text-white/60 mt-6 text-sm font-mono">
                        Διαθέσιμο έως 14 Φεβρουαρίου. Καλέστε για κράτηση.
                    </p>
                </motion.div>
            </section>

            <div className="h-[20vh]" /> {/* Extra scroll space */}
        </div>
    );
}

function TestimonialsSection() {
    const reviews = [
        { quote: "Ο καλύτερος καφές στο Λουτράκι! Η σπεσιαλιτέ του Αγίου Βαλεντίνου είναι απίθανη.", author: "Μαρία Κ.", rating: 5 },
        { quote: "Φανταστική ατμόσφαιρα και το προσωπικό είναι τόσο φιλικό. Η καθημερινή μου ιεροτελεστία.", author: "Δημήτρης Π.", rating: 5 },
        { quote: "Ποιότητα κόκκων και τέλειο καβούρδισμα. Επιτέλους καφές της προκοπής.", author: "Έλενα Γ.", rating: 5 },
        { quote: "Ένα κρυμμένο διαμάντι. Το γευστικό προφίλ είναι ασυναγώνιστο.", author: "Νίκος Α.", rating: 5 },
        { quote: "Λατρεύω τη νέα limited edition. Έχει πραγματικά γεύση πολυτέλειας.", author: "Σοφία Μ.", rating: 5 },
        { quote: "Το καλύτερο ξεκίνημα για το πρωί μου. Σταθερή ποιότητα κάθε φορά.", author: "Γιώργος Λ.", rating: 5 },
    ];

    const [index, setIndex] = useState(0);

    const nextReview = () => setIndex((prev) => (prev + 1) % reviews.length);
    const prevReview = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center py-20 relative">
            <div className="w-full max-w-4xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif text-white mb-16"
                >
                    Το Λουτράκι Αγαπά το <span className="text-gold">Iguazu</span>
                </motion.h2>

                <div className="relative h-[300px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <TestimonialCard
                                quote={reviews[index].quote}
                                author={reviews[index].author}
                                rating={reviews[index].rating}
                                delay={0}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex items-center justify-center gap-6 mt-8">
                    <button
                        onClick={prevReview}
                        className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white"
                        aria-label="Previous Review"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex gap-2">
                        {reviews.map((_, i) => (
                            <div
                                key={i}
                                className={clsx(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    i === index ? "bg-gold w-6" : "bg-white/20"
                                )}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextReview}
                        className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white"
                        aria-label="Next Review"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="mt-12">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="flex text-gold">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                        </div>
                        <span className="text-white font-bold text-lg">4.8/5</span>
                    </div>
                    <p className="text-white/40 text-sm">Βασισμένο σε 4.718 Κριτικές Google</p>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ title, description, icon, featured, delay }: { title: string, description: string, icon: any, featured?: boolean, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className={clsx(
                "p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-105",
                featured
                    ? "bg-gradient-to-br from-gray-900/80 to-black/90 border-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    : "bg-black/40 border-white/10 hover:border-white/20"
            )}
        >
            <div className="mb-6">{icon}</div>
            <h3 className={clsx("text-2xl font-bold mb-3", featured ? "text-gold" : "text-white")}>{title}</h3>
            <p className="text-gray-400 leading-relaxed font-light">{description}</p>
        </motion.div>
    );
}

function TestimonialCard({ quote, author, rating, delay }: { quote: string, author: string, rating: number, delay: number }) {
    return (
        <motion.div
            className="min-w-[300px] md:min-w-[400px] snap-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between h-full"
        >
            <div className="flex gap-1 text-gold mb-4">
                {[...Array(rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-white/90 italic mb-6 font-light text-lg">"{quote}"</p>
            <div>
                <p className="text-white font-bold text-sm">{author}</p>
                <p className="text-white/30 text-xs">Local Guide</p>
            </div>
        </motion.div>
    )
}
