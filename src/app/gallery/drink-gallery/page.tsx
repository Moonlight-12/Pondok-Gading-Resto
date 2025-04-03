import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default async function DrinkGallery() {
  const drinkFolder = path.join(process.cwd(), "public", "drink");
  const imageFiles = fs
    .readdirSync(drinkFolder)
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
  return (
    <main>
      <Header />
      <div className="p-8">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {imageFiles.map((image, index) => (
            <div key={index} className="break-inside-avoid">
              <Image
                src={`/drink/${image}`}
                alt={`Drink ${index + 1}`}
                width={800}
                height={600}
                className="rounded-lg w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
