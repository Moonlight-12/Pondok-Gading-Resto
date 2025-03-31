"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="flex flex-col z-40 items-center justify-center p-6 w-full relative bg-transparent">
        <div className="text-4xl font-bold text-[#FFD700]">
          Pondok Gading Resto
        </div>
      </header>

      <nav
        className={`hidden md:flex justify-center items-center gap-8 py-4 relative z-40 ${
          showStickyNav ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      >
        <a href="/#Home" className="py-2 hover:text-gray-600">
          Home
        </a>
        <a href="/#About" className="py-2 hover:text-gray-600">
          About
        </a>
        <a href="/#Menu" className="py-2 hover:text-gray-600">
          Menu
        </a>
        <a href="/#Contact" className="py-2 hover:text-gray-600">
          Contact
        </a>
        <a href="/#Reserve" className="py-2 hover:text-gray-600">
          Reserve
        </a>
        <a href="/gallery" className="py-2 hover:text-gray-600">
          Gallery
        </a>
      </nav>

      <nav
        className={`hidden md:flex gap-8 justify-center py-3 px-4 transition-all duration-300 fixed top-0 w-full z-50
          ${
            showStickyNav
              ? "opacity-100 pointer-events-auto bg-neutral-400/50 bg-opacity-90 shadow-lg"
              : "opacity-0 pointer-events-none"
          }`}
      >
        <a href="/#Home" className="py-2 hover:text-gray-600">
          Home
        </a>
        <a href="/#About" className="py-2 hover:text-gray-600">
          About
        </a>
        <a href="/#Menu" className="py-2 hover:text-gray-600">
          Menu
        </a>
        <a href="/#Contact" className="py-2 hover:text-gray-600">
          Contact
        </a>
        <a href="/#Reserve" className="py-2 hover:text-gray-600">
          Reserve
        </a>
        <a href="/gallery" className="py-2 hover:text-gray-600">
          Gallery
        </a>
      </nav>
    </>
  );
}
