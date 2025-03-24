"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import the component with no SSR
const HTMLFlipBook = dynamic(
  () => import("react-pageflip").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div>Loading flipbook...</div>,
  }
);

const Flipbook = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bookRef = useRef(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  
  const images = [
    "/menu/menu-cover_page-0001.jpg", // Cover (will be shown alone)
    "/menu/0b_page-0001.jpg", // Back cover
    "/menu/page1.jpg",
    "/menu/page2.jpg",
    "/menu/page3.jpg",
    "/menu/page4.jpg",
    "/menu/page6.jpg",
    "/menu/page7.jpg",
    "/menu/page8.jpg",
    "/menu/page9.jpg",
    "/menu/page10.jpg",
    "/menu/page11.jpg",
    "/menu/page12.jpg",
    "/menu/page13.jpg", 
  ];

  // Check if device is mobile
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const preventDefault = (e: Event) => {
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="w-full flex justify-center items-center bg-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="w-full flex justify-center items-center bg-neutral-500 py-4 overflow-hidden">
      <div 
        ref={containerRef}
        className="w-full max-w-4xl mx-auto px-4 flex justify-center"
        style={{ touchAction: 'none' }}
      >
        <HTMLFlipBook
          ref={bookRef}
          width={isMobile ? 250 : 450}
          height={isMobile ? 350 : 630}
          size="stretch"
          minWidth={isMobile ? 150 : 300}
          maxWidth={isMobile ? 280 : 800}
          minHeight={isMobile ? 210 : 400}
          maxHeight={isMobile ? 400 : 1200}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="mx-auto"
          usePortrait={isMobile}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          startZIndex={0}
          autoSize={true}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={20}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={() => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect && (rect.top < 0 || rect.bottom > window.innerHeight)) {
              window.scrollTo({
                top: window.scrollY + rect.top,
                behavior: 'smooth'
              });
            }
          }}
        >
          {/* Cover page (single) */}
          <div className="page cover">
            <img
              src={images[0]}
              alt="Cover"
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>

          {/* Inside pages */}
          {images.slice(2).map((src, idx) => (
            <div key={idx} className="page">
              <img
                src={src}
                alt={`Page ${idx + 1}`}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
          ))}

          {/* Back cover */}
          <div className="page cover">
            <img
              src={images[1]}
              alt="Back Cover"
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        </HTMLFlipBook>
      </div>
    </main>
  );
};

export default Flipbook;