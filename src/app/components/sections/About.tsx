"use client";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// using Theme
import { useTheme } from "@/app/themes/ThemeProvider";
// Importing Data
import { about } from "@/app/database/data";
// Importing React-Icons
import { FaLinkedin } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const About = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className="container mx-auto my-20 lg:my-50 px-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
      <div className="w-full lg:w-150 xl:w-200">
        <h2 className="uppercase text-4xl sm:text-6xl">
          {language === "en" ? about.titleEn : about.titleAr}
        </h2>
        <p className="py-3 text-[hsl(var(--third))] text-xl md:text-2xl xl:text-3xl leading-8 sm:leading-10 lg:leading-14">
          {language === "en" ? about.infoEn : about.infoAr}
        </p>

        <div className="flex items-center gap-5">
          <Link
            href={"https://www.linkedin.com/in/youturkey11/"}
            target="_blank"
          >
            <FaLinkedin size={40} color="#b2b2b2" />
          </Link>
          <Link href={"https://wa.me/201273451052"} target="_blank">
            <FaSquareWhatsapp size={40} color="#b2b2b2" />
          </Link>
          <Link href={"https://github.com/YoussefTurkey"} target="_blank">
            <FaGithubSquare size={40} color="#b2b2b2" />
          </Link>
          <Link
            href={"https://www.youtube.com/@youssefturkey11"}
            target="_blank"
          >
            <FaYoutube size={40} color="#b2b2b2" />
          </Link>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-lg group">
        <Image
          src={about.img}
          width={1000}
          height={1000}
          alt={about.heroEn}
          loading="lazy"
          className="w-full mx-auto lg:w-150 xl:w-200 h-150 object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
        />
        <div className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
          <p className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white">
            {language === "en" ? about.heroEn : about.heroAr}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
