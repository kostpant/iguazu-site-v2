import CoffeeCanvas from "@/components/CoffeeCanvas";
import ContentOverlay from "@/components/ContentOverlay";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-obsidian text-white overflow-x-hidden">
      <CoffeeCanvas />
      <ContentOverlay />

      {/* Footer / Copyright */}
      <footer className="relative z-10 py-8 text-center text-white/20 text-sm">
        <p>&copy; 2026 Iguazu Loutraki. Valentine&apos;s Edition.</p>
      </footer>
    </main>
  );
}
