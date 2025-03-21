"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header className="flex flex-col z-50 items-center relative justify-center p-6 w-full">
        <div className="text-4xl font-bold text-red-400">
          pondok Gading Resto
        </div>
      </header>

      <nav className="flex justify-center items-center gap-8 relative z-10 top-0 py-4">
        <a className="py-2 hover:text-gray-600">Home</a>
        <a className="py-2 hover:text-gray-600">Gallery</a>
        <a className="py-2 hover:text-gray-600">Contact</a>
        <a className="py-2 hover:text-gray-600">Menu</a>
        <a className="py-2 hover:text-gray-600">Reserve</a>
      </nav>

      
      <nav
        className={`flex gap-4 sticky top-0 z-50 justify-center py-3 px-4 transition-all duration-300 text-amber-600 bg-white shadow-md ${
          showStickyNav
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <a className="hover:text-gray-600 ">Home</a>
        <a className="hover:text-gray-600 transition-colors">Gallery</a>
        <a className="hover:text-gray-600 transition-colors">Contact</a>
        <a className="hover:text-gray-600 transition-colors">Menu</a>
        <a className="hover:text-gray-600 transition-colors">Reserve</a>
      </nav>
    </>
  );
}
