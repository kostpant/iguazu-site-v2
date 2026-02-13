import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Iguazu Λουτράκι | Η Τέχνη του Καφέ",
  description: "Ζήστε την κορυφαία εμπειρία καφέ. Μια κληρονομιά γεύσης, εκλεπτυσμένη για τον σύγχρονο γνώστη.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased bg-obsidian text-champagne" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
