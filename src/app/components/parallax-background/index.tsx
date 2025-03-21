import React, { JSX, ReactNode } from "react";
import Image from "next/image";

interface ParallaxBackgroundProps {
  imageUrl: string;
}

export default function ParallaxBackground({
  imageUrl,
}: {
  imageUrl: string;
}): JSX.Element {
  return (
    <div className="relative h-screen">
      {/* Fixed background image */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
        <Image
          src={imageUrl}
          alt="Background Image"
          fill
          priority
          className="object-cover brightness-75"
        />
      </div>

      {/* Hero section that appears on top of the background */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <div className="text-white text-center">
          {/* Hero content can go here */}
        </div>
      </div>

      {/* Content that scrolls over the fixed image - REMOVED bg-white */}
      {/* <div className="relative z-10 min-h-screen">{children}</div> */}
    </div>
  );
}
