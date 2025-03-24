"use client";

import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function AboutUsButton() {
  const [showButton, setShowbutton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowbutton(true);
    }, 20);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        handleScroll();
      }}
      className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20  transition-all ease-in-out duration-1000 animate-pulse ${
        showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <FaChevronDown size={30}/>
    </div>
  );
}
