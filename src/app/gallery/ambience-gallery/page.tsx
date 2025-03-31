import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";
import Header from "@/components/header";

export default async function AmbienceGallery() {
  const ambienceFolder = path.join(process.cwd(), "public", "ambience");
  const imageFiles = fs
    .readdirSync(ambienceFolder)
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

  return (
    <main>
      <Header />

      <div className="relative w-full h-full mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-[#FFD700]">Gazebo</h1>
            <Image
              src="/ambience/ambience1.jpg"
              alt="Ambience 1"
              width={800}
              height={600}
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-[#FFD700]">Meeting Room</h1>
            <Image
              src="/ambience/WhatsApp Image 2025-03-28 at 22.42.42 (1).jpeg"
              alt="Ambience 1"
              width={800}
              height={600}
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-[#FFD700]">VIP Room</h1>
            <Image
              src="/ambience/WhatsApp Image 2025-03-28 at 22.42.42.jpeg"
              alt="Ambience 1"
              width={800}
              height={600}
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </div>

        <div className="flex justify-center items-center text-5xl font-bold mb-12 text-[#FFD700] p-4">
            Ambience Gallery
        </div>
      
      

      <div className="p-8">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {imageFiles.map((image, index) => (
            <div key={index} className="break-inside-avoid">
              <Image
                src={`/ambience/${image}`}
                alt={`Ambience ${index + 1}`}
                width={800}
                height={600}
                className="rounded-lg w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
