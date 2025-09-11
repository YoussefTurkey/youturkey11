"use client";
// importing Next Components
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
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
import { AiFillDashboard } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
// Importing Components
import Btns from "../ui/Btns";
import TrackVisit from "../ui/TrackVisit";
// Auth
import { useAuth, logout } from "@/lib/auth";

const Header = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [menu, setMenu] = useState(false);  
  const { user } = useAuth(); // ✅ هل الأدمن عامل لوجين
  const pathname = usePathname();

  return (
    <header className="container mx-auto px-10 xl:px-0 py-5 flex lg:flex-row lg:gap-0 md:flex-col md:gap-5 items-center justify-between border-b border-[hsl(var(--third))] sm:static fixed top-0 z-10 backdrop-blur-sm bg-[hsl(var(--background)_/_50%)]">
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
          <TrackVisit />
          <Btns
            href="/community"
            style="border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white"
          >
            {language === "en" ? "Community" : "المجتمع"}
          </Btns>
          <Btns
            href="/contact"
            style="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)_/_90%)] text-white"
          >
            {language === "en" ? "Get in touch" : "تواصل معي"}
          </Btns>
          {/* ✅ لو الأدمن عامل Login */}
          {user && (
            <>
              {pathname !== "/dashboard" && (
                <Btns
                  href="/dashboard"
                  style="bg-[hsl(var(--secondary))] text-white flex items-center gap-1"
                >
                  <AiFillDashboard size={25} />
                </Btns>
              )}
              {pathname === "/dashboard" && (
                <Btns
                  action={logout}
                  style="flex items-center gap-1 border border-[hsl(var(--secondary))]"
                >
                  <TbLogout size={25} />
                </Btns>
              )}
            </>
          )}
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
              bg-[hsl(var(--background)_/_85%)] rounded-lg
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
          <Btns
            action={() => setMenu(!menu)}
            href="/community"
            style="border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white"
          >
            {language === "en" ? "Community" : "المجتمع"}
          </Btns>
          <Btns
            action={() => setMenu(!menu)}
            href="/contact"
            style="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)_/_90%)] text-white"
          >
            {language === "en" ? "Get in touch" : "تواصل معي"}
          </Btns>

          {/* ✅ Mobile Admin Btns */}
          {user && (
            <>
              <Btns
                action={() => setMenu(!menu)}
                href="/dashboard"
                style="bg-[hsl(var(--secondary))] text-white flex items-center gap-1"
              >
                <AiFillDashboard />
                {language === "en" ? "Dashboard" : "لوحة التحكم"}
              </Btns>
              <Btns
                action={logout}
                style="flex items-center gap-1 border border-[hsl(var(--secondary))]"
              >
                <TbLogout />
                {language === "en" ? "Logout" : "تسجيل الخروج"}
              </Btns>
            </>
          )}

          <TrackVisit />

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
