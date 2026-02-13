import CoffeeCanvas from "@/components/CoffeeCanvas";
import ContentOverlay from "@/components/ContentOverlay";

export default function Home() {
  return (
    <main className="relative w-full min-h-[100dvh] bg-obsidian text-white overflow-x-hidden">
      <CoffeeCanvas />
      <ContentOverlay />
    </main>
  );
}
