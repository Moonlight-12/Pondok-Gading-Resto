'use client';

import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function GalleryBackground() {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => {
        setOffsetY(window.pageYOffset);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return (
        <>
              <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
                <Image
                  src="/gallery-background.jpg"
                  alt="Background Image"
                  fill
                  priority
                  className="object-cover brightness-75"
                />
              </div>
              <div
                className="z-20 absolute text-6xl font-bold left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center"
                style={{ transform: `translateY(${offsetY * 0.4}px)` }}
              >
                Gallery
              </div>
            </>
    );
}
