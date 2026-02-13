import CoffeeCanvas from "@/components/CoffeeCanvas";
import ContentOverlay from "@/components/ContentOverlay";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-obsidian text-white overflow-x-hidden">
      <CoffeeCanvas />
      <ContentOverlay />
    </main>
  );
}
