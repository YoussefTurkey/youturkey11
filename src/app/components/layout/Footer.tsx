"use client";
// importing Next Components
import Link from "next/link";
import Image from "next/image";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// using Theme
import { useTheme } from "@/app/themes/ThemeProvider";
// Importing Components
import Btns from "../ui/Btns";
// Importing React-icons
import { MdArrowOutward } from "react-icons/md";
import { TbBrandLinkedin } from "react-icons/tb";
import { FiYoutube } from "react-icons/fi";
import { PiFacebookLogoBold } from "react-icons/pi";

const Footer = () => {
  const { language } = useLanguage();
  const { theme } = useTheme()

  return (
    <footer className="container mx-auto px-10 xl:px-0 py-5">
      <div className="flex items-center">
        <p className="uppercase text-xl text-[hsl(var(--third))] w-45 sm:w-30">
          {language === "en" ? "say hello" : "قل مرحبًا"}
        </p>
        <div className="w-full h-px bg-[hsl(var(--third))]"></div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-5 my-10 sm:my-20">
        <h2 className="w-full sm:w-[50%] lg:w-[70%] text-2xl sm:text-3xl lg:text-5xl xl:text-7xl font-black uppercase bg-gradient-to-t from-[#b2b2b2] to-[hsl(var(--foreground))] bg-clip-text text-transparent">
          {language === "en"
            ? "I'm open for freelance projects & full-time roles."
            : "متاح لمشاريع العمل الحر والوظائف بدوام كامل."}
        </h2>
        <Btns href="/contact" style="w-full sm:w-[50%] md:sm:w-[50%] lg:w-[30%] py-5 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2">
          <span>{language === "en" ? "Get in touch" : "تواصل معي الآن"}</span>{" "}
          <MdArrowOutward size={30} />
        </Btns>
      </div>

      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={theme === 'dark' ? "/images/logo-dark.webp" : "/images/logo-light.webp"}
            width={30}
            height={30}
            alt="youturkey11"
            loading="lazy"
          />
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href={"https://www.linkedin.com/in/youturkey11/"}
            target="_blank"
          >
            <TbBrandLinkedin size={18} color="#b2b2b2" />
          </Link>
          <Link
            href={"https://www.youtube.com/@youssefturkey11"}
            target="_blank"
          >
            <FiYoutube size={18} color="#b2b2b2" />
          </Link>
          <Link
            href={"https://web.facebook.com/ywsf.altrky.179788"}
            target="_blank"
          >
            <PiFacebookLogoBold size={18} color="#b2b2b2" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
