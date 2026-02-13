'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, Search, Coffee, Wine, Pizza, CakeSlice } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';

// --- Menu Data ---
type MenuItem = {
    name: string;
    price: string;
    description?: string;
};

type MenuCategory = {
    id: string;
    title: string;
    icon?: any;
    items: MenuItem[];
};

const menuData: MenuCategory[] = [
    {
        id: 'cocktails',
        title: 'Cocktails',
        icon: Wine,
        items: [
            { name: "Mojito", price: "7,00 €", description: "Rum, lime, mint & soda" },
            { name: "Porn Star", price: "7,00 €", description: "Vanilla, passion fruit, lime & vodka" },
            { name: "Mai Tai", price: "7,00 €", description: "Rum, lime, orgeat & orange" },
            { name: "Daquiri Strawberry", price: "7,00 €", description: "Rum, lime & strawberry" },
        ]
    },
    {
        id: 'coffees',
        title: 'Καφέδες & Ροφήματα',
        icon: Coffee,
        items: [
            { name: "Espresso", price: "2,00 €", description: "Ο σταρ των καφέδων!" },
            { name: "Freddo Espresso", price: "2,40 €", description: "Δροσερός και αναζωογονητικός." },
            { name: "Cappuccino", price: "2,50 €", description: "Απόλυτη ισορροπία σε καφέ και γάλα." },
            { name: "Freddo Cappuccino", price: "2,50 €", description: "Παγωμένος espresso με κρύο αφρόγαλα." },
            { name: "Nes", price: "2,40 €", description: "Στιγμιαίος καφές που σε ζεσταίνει." },
            { name: "Φίλτρου", price: "2,50 €", description: "Για απόλαυση χωρίς φίλτρο!" },
            { name: "Flat White", price: "2,70 €" },
            { name: "Cappuccino Latte", price: "2,70 €" },
            { name: "Cappuccino Vegan", price: "2,70 €", description: "Με γάλα αμυγδάλου." },
            { name: "Frappe", price: "2,40 €", description: "Ελληνικής καταγωγής, παγκόσμιας αναγνώρισης!" },
            { name: "Mochaccino", price: "4,00 €", description: "Καφές και σοκολάτα γίνονται ένα." },
            { name: "Ελληνικός", price: "2,00 €" }, // Added generic as it's standard, though not in list explicitly, "Nes" was there.
            { name: "Τσάι", price: "2,00 €", description: "Relax και αναζωογόνηση." },
            { name: "Χαμομήλι", price: "2,00 €" },
            { name: "Σπιτική Λεμονάδα", price: "3,50 €" },
            { name: "Σπιτική Λεμονάδα Με Φράουλα", price: "3,50 €" },
            { name: "Φυσικός Χυμός Πορτοκάλι", price: "3,00 €" },
        ]
    },
    {
        id: 'chocolates',
        title: 'Σοκολάτες',
        icon: Coffee, // Reuse icon or find better
        items: [
            { name: "Σοκολάτα", price: "2,70 €" },
            { name: "Σοκολάτα Viennois", price: "2,50 €" },
            { name: "Σοκολάτα Φυστικοβούτυρο", price: "3,00 €", description: "Με αλατισμένη καραμέλα." },
            { name: "Σοκολάτα Lila", price: "2,80 €", description: "Με Φράουλα & Βανίλια." },
            { name: "Σοκολάτα Γάλακτος Καραμέλα & Αλάτι", price: "2,80 €" },
            { name: "Σοκολάτα Cappuccino Nocciola", price: "2,80 €" },
            { name: "Σοκολάτα Oreo", price: "3,00 €" },
            { name: "Σοκολάτα Μπισκότο", price: "2,80 €" },
            { name: "Σοκολάτα Bueno", price: "3,00 €" },
        ]
    },
    {
        id: 'snacks',
        title: 'Snacks & Πίτες',
        icon: Pizza,
        items: [
            { name: "Τυρόπιτα", price: "1,80 €" },
            { name: "Τυρόπιτα Κουρού", price: "1,80 €" },
            { name: "Φλογέρα Philadelphia", price: "2,50 €" },
            { name: "Μπιφτεκόπιτα", price: "2,50 €" },
            { name: "Ζαμπονοτυρόπιτα", price: "2,50 €" },
            { name: "Πίτσα", price: "3,00 €" },
            { name: "Πεϊνιρλί", price: "2,90 €", description: "Με mix τυριών & αλλαντικών." },
            { name: "Λουκανικόπιτα", price: "2,20 €" },
            { name: "Μπουγάτσα Με Κρέμα", price: "2,50 €" },
            { name: "Κουλούρι Θεσ/κης Γαλοπούλα/Phila", price: "2,00 €" },
            { name: "Κουλούρι Θεσσαλονίκης", price: "0,70 €" },
        ]
    },
    {
        id: 'sandwiches',
        title: 'Sandwiches',
        icon: Pizza, // Need a sandwich icon ideally, Pizza works as "Food"
        items: [
            { name: "Μπαγκέτα Λευκή Κοτομπουκιές", price: "3,50 €" },
            { name: "Τορτίγια Caesar's", price: "3,50 €" },
            { name: "Αραβική Πίτα Κοτόπουλο", price: "2,90 €" },
            { name: "Sandwich Σολομός", price: "4,00 €" },
            { name: "Sandwich Κοτόπουλο & Μπέικον", price: "4,00 €" },
            { name: "Μπαγκέτα Λευκή Κοτόπουλο", price: "3,50 €" },
            { name: "Sandwich Προσούτο", price: "4,00 €" },
            { name: "4 Mam Μπαγκέτα Κοτόπουλο", price: "2,90 €" },
            { name: "Αραβική Πίτα Γαλοπούλα", price: "2,90 €" },
            { name: "Μπαγκέτα Λευκή Γαλοπούλα", price: "3,20 €" },
            { name: "Τοστ Γαλοπούλα", price: "2,50 €" },
        ]
    },
    {
        id: 'sweets',
        title: 'Γλυκά & Donuts',
        icon: CakeSlice,
        items: [
            { name: "Donut Oreo", price: "2,30 €" },
            { name: "Donut Κανέλας", price: "2,30 €" },
            { name: "Donut Σοκολάτα", price: "2,30 €" },
            { name: "Donut Bueno", price: "2,30 €" },
            { name: "Donut Ferrero", price: "2,30 €" },
            { name: "Donut Σοκολάτα & Μπισκότο", price: "2,30 €" },
            { name: "Soft Cookie Σοκολάτα", price: "2,20 €" },
            { name: "Soft Cookie Βανίλια & Σοκολάτα", price: "2,00 €" },
            { name: "Cinnamon Roll", price: "2,80 €" },
            { name: "Κρουασάν Βουτύρου (Praline/Oreo)", price: "3,00 €" },
            { name: "Κρουασάν Μαργαρίτα Bueno", price: "3,00 €" },
            { name: "Κρουασάν Cheesecake Φράουλα", price: "3,00 €" },
            { name: "Κρουασάν Φυστίκι", price: "3,00 €" },
        ]
    },
    {
        id: 'drinks',
        title: 'Αναψυκτικά & Μπύρες',
        icon: Wine,
        items: [
            { name: "Coca-Cola / Zero", price: "2,00 €" },
            { name: "Fanta / Sprite", price: "2,00 €" },
            { name: "Nestea (Lemon/Peach/Green)", price: "2,70 €" },
            { name: "Perrier", price: "2,00 €" },
            { name: "Hell Energy", price: "2,00 €" },
            { name: "Νερό 500ml", price: "0,50 €" },
            { name: "Amstel / Radler", price: "2,00 € / 2,50 €" },
            { name: "Heineken / Alfa", price: "2,00 €" },
            { name: "Kaiser / Fischer / Fix Dark", price: "2,50 €" },
            { name: "Corona", price: "4,00 €" },
        ]
    }
];

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-obsidian text-white font-sans selection:bg-passion/30 relative overflow-x-hidden">
            {/* Backgrounds */}
            <div className="fixed inset-0 bg-obsidian z-0" />
            <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(211,47,47,0.08)_0%,transparent_50%)] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none z-0" />

            {/* Header */}
            <header className="sticky top-0 left-0 right-0 p-6 md:p-8 z-50 flex items-start justify-between bg-obsidian/80 backdrop-blur-md border-b border-white/5">
                <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-serif font-bold text-white tracking-widest uppercase shadow-black drop-shadow-lg">
                        Iguazu Loutraki
                    </span>
                    <span className="text-xs md:text-sm text-gold tracking-[0.2em] font-light uppercase opacity-80">
                        Menu & Tastes
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="tel:+302744021012"
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-passion hover:bg-gold text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-passion/20 group"
                    >
                        <Phone className="w-4 h-4 fill-current" />
                        <span>DELIVERY</span>
                    </a>
                    <Link href="/" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors backdrop-blur-md group">
                        <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </Link>
                </div>
            </header>

            {/* Content using Grid masonry-ish layout */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-16 text-center tracking-tight"
                >
                    Ο Κατάλογος
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {menuData.map((category, idx) => (
                        <MenuSection key={category.id} category={category} index={idx} />
                    ))}
                </div>
            </main>

            <footer className="relative z-10 text-center py-10 text-white/20 text-xs border-t border-white/5">
                <p>Οι τιμές συμπεριλαμβάνουν ΦΠΑ. Το κατάστημα διατηρεί το δικαίωμα αλλαγής τιμών.</p>
            </footer>
        </div>
    );
}

function MenuSection({ category, index }: { category: MenuCategory; index: number }) {
    const Icon = category.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex flex-col gap-6"
        >
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-colors duration-300 h-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-passion/20 to-passion/5 border border-passion/20 text-passion">
                        <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-white tracking-wide">{category.title}</h2>
                </div>

                <ul className="space-y-6">
                    {category.items.map((item, i) => (
                        <li key={i} className="group">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-white font-medium text-lg leading-snug group-hover:text-gold transition-colors">{item.name}</h3>
                                <div className="flex-grow mx-4 border-b border-white/10 border-dashed h-px opacity-30" />
                                <span className="text-gold font-bold font-mono text-lg whitespace-nowrap">{item.price}</span>
                            </div>
                            {item.description && (
                                <p className="text-white/40 text-sm font-light leading-relaxed">{item.description}</p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
