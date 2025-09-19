"use client";
// importing Next Components
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <div className="w-full relative">
      <div className="absolute inset-0 -z-10 [background-image:radial-gradient(circle,hsl(var(--foreground)/20%)_1.5px,transparent_1.5px)] [background-size:30px_30px] [background-position:0_0]" />

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
          <Btns
            href="/contact"
            style="w-full sm:w-[50%] md:sm:w-[50%] lg:w-[30%] py-5 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2"
          >
            <span>{language === "en" ? "Get in touch" : "تواصل معي الآن"}</span>{" "}
            <MdArrowOutward size={30} />
          </Btns>
        </div>

        <div className="flex items-end justify-between">
          <Link href={"/"}>
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

      {pathname !== "/dashboard" && pathname !== "/login" && (
        <section className="w-full p-3 sm:p-2 flex items-center justify-center flex-col sm:flex-row gap-5 sm:gap-20 bg-[linear-gradient(40deg,#a44ce0,#9153de,#7e5bdb,#6b62d9,#5869d7,#4470d4,#3178d2,#1e7fcf,#0b86cd)]">
          <p className="text-md text-white">
            {language === "en"
              ? "🎉 Support Youssef Turkey by subscribing to my YouTube channel for more coding and development content!"
              : "🎉 ادعم يوسف التركي واشترك في قناتي على يوتيوب لتتعلم المزيد عن البرمجة والتطوير!"}
          </p>
          <Btns
            href="https://www.youtube.com/channel/UCvLviX2Q0ujSHap3mn4q8-A"
            style="bg-white text-[hsl(var(--secondary))] font-bold shadow-xl/30 text-center"
          >
            {language === "en" ? "Subscribe" : "اشترك"}
          </Btns>
        </section>
      )}
    </div>
  );
};

export default Footer;
