"use client";
// Importing React Hooks
import { useEffect, useState } from "react";
// Importing React-Icons
import { TiArrowUpThick } from "react-icons/ti";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Improting Next components
import { usePathname } from "next/navigation";

const ScrollUp = () => {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {pathname === "/" ? (
        <button
          onClick={scrollToTop}
          className={`hidden sm:block fixed bottom-15 md:bottom-6 z-1000 ${
            language === "en" ? "right-4 sm:right-10" : "left-7 sm:left-10"
          } bg-[hsl(var(--secondary))] text-[hsl(var(--background))] p-3 rounded-full shadow-lg transition-opacity duration-300 cursor-pointer ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <TiArrowUpThick size={15} />
        </button>
      ) : 
        <button
          onClick={scrollToTop}
          className={`block fixed bottom-15 md:bottom-6 z-1000 ${
            language === "en" ? "right-4 sm:right-10" : "left-7 sm:left-10"
          } bg-[hsl(var(--secondary))] text-[hsl(var(--background))] p-3 rounded-full shadow-lg transition-opacity duration-300 cursor-pointer ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <TiArrowUpThick size={15} />
        </button>
      }
    </>
  );
};

export default ScrollUp;
