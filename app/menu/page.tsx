'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Star, Coffee, Wine, Pizza, Heart, ShoppingBag, CakeSlice } from 'lucide-react';

// Animation Constants
const LUXURY_EASE = [0.19, 1, 0.22, 1] as const;
const LUXURY_DURATION = 1.2;

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

export default function MenuPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-6 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
                <Link href="/" className="group flex items-center gap-2 text-rose hover:text-passion transition-colors duration-300">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-serif uppercase tracking-widest text-sm font-bold">Επιστροφή</span>
                </Link>
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-serif font-bold text-passion tracking-widest uppercase mb-1">Ο ΚΑΤΑΛΟΓΟΣ ΜΑΣ</h1>
                    <div className="w-12 h-0.5 bg-gold mx-auto rounded-full" />
                </div>
                <div className="w-24 hidden md:block" /> {/* Spacer */}
            </header>

            <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {CATEGORIES.map((category, idx) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: LUXURY_DURATION, ease: LUXURY_EASE, delay: idx * 0.1 }}
                            className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl hover:border-passion/40 transition-all duration-500 group"
                        >
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-800">
                                <div className="p-2 bg-passion/10 rounded-lg">
                                    <category.icon className="w-5 h-5 text-passion" />
                                </div>
                                <h3 className="font-serif text-lg text-rose uppercase tracking-widest font-bold">{category.title}</h3>
                            </div>

                            <ul className="space-y-4">
                                {category.items.map((item, i) => (
                                    <li key={i} className="flex flex-col border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0 group/item">
                                        <div className="flex justify-between items-baseline gap-4 mb-1">
                                            <span className="text-white font-serif text-lg group-hover/item:text-rose transition-colors duration-300">{item.name}</span>
                                            <div className="flex-grow border-b border-dotted border-zinc-700/50 mx-1 mb-1" />
                                            <span className="text-passion font-bold tracking-widest text-sm shrink-0">{item.price}</span>
                                        </div>
                                        {"desc" in item && item.desc && (
                                            <p className="text-xs text-zinc-500 italic font-light tracking-wide leading-relaxed">
                                                {item.desc}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
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
