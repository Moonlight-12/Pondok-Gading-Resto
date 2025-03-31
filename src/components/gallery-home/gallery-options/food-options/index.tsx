"use client";

import { useEffect, useState, useRef } from "react";

export function FoodOptions() {
  const [animationStage, setAnimationStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkPosition = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.8;

      if (rect.top <= triggerPoint) {
        setAnimationStage(1);
        window.removeEventListener("scroll", checkPosition);
      }
    };

    checkPosition();

    window.addEventListener("scroll", checkPosition);

    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
  }, []);

  const handleWhiteAnimationEnd = () => {
    setAnimationStage(2);
  };

  return (
    <div ref={containerRef} className="relative w-full h-82 overflow-hidden">
      <div
        className={`absolute z-20 top-0 left-0 w-full h-full bg-white transition-transform duration-500 ease-in-out 
          ${animationStage >= 1 ? "translate-x-full" : "translate-x-0"}`}
        onTransitionEnd={handleWhiteAnimationEnd}
      />

      <div
        className={`absolute z-10 top-0 left-0 w-full h-full bg-black transition-transform duration-500 ease-in-out 
          ${animationStage >= 2 ? "translate-x-full" : "translate-x-0"}`}
      />

      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="/food-background.jpg"
          alt="Gallery"
          className="object-cover w-full h-full brightness-75"
        />
      </div>

      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-[#FFD700]">Food</h1>
      </div>
    </div>
  );
}
