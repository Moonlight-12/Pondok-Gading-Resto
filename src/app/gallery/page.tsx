import { GalleryBackground } from "@/components/gallery-home/gallery-background";
import GalleryButton from "@/components/gallery-home/gallery-button";
import { GalleryOptions } from "@/components/gallery-home/gallery-options";
import Header from "@/components/header";

export default function GalleryPage() {
  return (
    <main>
      <section className="relative min-h-screen">
        <Header />
        <GalleryBackground />
        <GalleryButton />
      </section>

      <section id="GalleryOptions" className="w-full bg-black py-8 relative">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
          <GalleryOptions />
        </div>
      </section>
    </main>
  );
}
