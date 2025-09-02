"use client";
// importing Next Components
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
// Importing React Hooks
import { useState } from "react";
// Importing Components
const LanguageToggle = dynamic(() => import("@/app/lang/LanguageToggle"));
const ThemeToggle = dynamic(() => import("@/app/themes/ThemeToggle"));
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// using Theme
import { useTheme } from "@/app/themes/ThemeProvider";
// Importing React-Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
// Importing Components
import Btns from "../ui/Btns";

const Header = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [menu, setMenu] = useState(false);

  return (
    <header className="container mx-auto px-10 xl:px-0 py-5 flex items-center justify-between border-b border-[hsl(var(--third))]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src={
            theme === "dark"
              ? "/images/logo-dark.webp"
              : "/images/logo-light.webp"
          }
          width={30}
          height={30}
          alt="youturkey11"
          loading="lazy"
        />
        {language === "en" ? (
          <span className="uppercase text-xl sm:text-3xl font-extrabold transition-colors">
            YouTurkey<sup className="text-[hsl(var(--secondary))]">11</sup>
          </span>
        ) : (
          <span className="uppercase text-xl sm:text-3xl font-extrabold transition-colors">
            يوتركي<sup className="text-[hsl(var(--secondary))]">11</sup>
          </span>
        )}
      </Link>

      {/* Desktop & Tablet Btns */}
      <section className="hidden sm:flex items-center gap-3">
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <Btns style="border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white">
            {language === "en" ? "Community" : "المجتمع"}
          </Btns>
          <Btns style="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)_/_90%)] text-white">
            {language === "en" ? "Get in touch" : "تواصل معي"}
          </Btns>
        </div>
      </section>

      {/* Mobile Btns */}
      <section className="flex sm:hidden">
        <div className="flex text-end sm:hidden" onClick={() => setMenu(!menu)}>
          <GiHamburgerMenu size={25} />
        </div>
        <div
          onClick={() => setMenu(false)}
          className={`fixed inset-0 transition-opacity duration-500
            ${menu ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        />
        <div
          className={`
              fixed top-0 h-[100vh] w-full md:w-100 z-2000
              flex flex-col px-10 py-30 gap-5 lg:hidden
              backdrop-blur-sm rounded-lg
              transition-transform duration-500 ease-in-out
              ${
                language === "en"
                  ? menu
                    ? "translate-x-0 right-0"
                    : "translate-x-full right-0"
                  : menu
                  ? "translate-x-0 left-0"
                  : "-translate-x-full left-0"
              }
            `}
        >
          <button
            className={`absolute top-5 ${
              language === "en" ? "left-5" : "right-5"
            }`}
            onClick={() => setMenu(!menu)}
          >
            <IoClose size={40} />
          </button>
          <Btns style="border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white">
            {language === "en" ? "Community" : "المجتمع"}
          </Btns>
          <Btns style="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)_/_90%)] text-white">
            {language === "en" ? "Get in touch" : "تواصل معي"}
          </Btns>
          <div className="flex items-center justify-start gap-5">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
