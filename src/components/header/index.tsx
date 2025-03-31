"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`flex flex-col z-40 items-center justify-center p-6 w-full relative bg-transparent ${
          showStickyNav ? "md:opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      >
        <div className="flex items-center justify-between w-full md:justify-center md:relative">
          <div className="text-4xl font-bold text-[#FFD700] md:text-center">
            Pondok Gading Resto
          </div>
          <div className={`${showStickyNav ? "opacity-0" : "md:hidden"}`}>
            <button
              className="text-gray-600 focus:outline-none"
              onClick={() => setShowMobileMenu((prev) => !prev)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:block absolute right-0">
            <div className="w-6 h-6 opacity-0"></div>
          </div>
        </div>

        {showMobileMenu && !showStickyNav && (
          <div className="md:hidden absolute top-full left-0 right-0 w-full z-50 flex flex-col items-center gap-4 mt-0 bg-neutral-400/80 backdrop-blur-sm shadow-lg p-4">
            <a
              href="/#Home"
              className="py-2 hover:text-gray-600 w-full text-center"
            >
              Home
            </a>
            <a
              href="/#About"
              className="py-2 hover:text-gray-600 w-full text-center"
            >
              About
            </a>
            <a
              href="/#Menu"
              className="py-2 hover:text-gray-600 w-full text-center"
            >
              Menu
            </a>
            <a
              href="/#Contact"
              className="py-2 hover:text-gray-600 w-full text-center"
            >
              Contact
            </a>
            <a
              href="/#Reserve"
              className="py-2 hover:text-gray-600 w-full text-center"
            >
              Reserve
            </a>
            <a
              href="/gallery"
              className="py-2 hover:text-gray-600 w-full text-center"
            >
              Gallery
            </a>
          </div>
        )}
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
        className={`flex flex-col md:flex-row gap-4 md:gap-8 md:justify-center py-3 px-4 transition-all duration-300 fixed top-0 w-full z-50
          ${
            showStickyNav
              ? "opacity-100 pointer-events-auto bg-neutral-400/80 backdrop-blur-sm shadow-lg"
              : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="absolute top-3 right-4 md:hidden">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div className="text-2xl font-bold text-[#FFD700] text-center md:hidden">
          Pondok Gading Resto
        </div>

        <div
          className={`${
            showMobileMenu && showStickyNav ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-8 w-full`}
        >
          <a
            href="/#Home"
            className="py-2 hover:text-gray-600 w-full text-center md:w-auto"
          >
            Home
          </a>
          <a
            href="/#About"
            className="py-2 hover:text-gray-600 w-full text-center md:w-auto"
          >
            About
          </a>
          <a
            href="/#Menu"
            className="py-2 hover:text-gray-600 w-full text-center md:w-auto"
          >
            Menu
          </a>
          <a
            href="/#Contact"
            className="py-2 hover:text-gray-600 w-full text-center md:w-auto"
          >
            Contact
          </a>
          <a
            href="/#Reserve"
            className="py-2 hover:text-gray-600 w-full text-center md:w-auto"
          >
            Reserve
          </a>
          <a
            href="/gallery"
            className="py-2 hover:text-gray-600 w-full text-center md:w-auto"
          >
            Gallery
          </a>
        </div>
      </nav>
    </>
  );
}