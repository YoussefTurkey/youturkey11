"use client";
// Importing Next Components
import Image from "next/image";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Data
import { about } from "@/app/database/data";
// Importing React-Icons
import { MdArrowOutward } from "react-icons/md";
// Importing Components
import Btns from "../ui/Btns";

const About = () => {
  const { language } = useLanguage();

  return (
    <section id="me" className="container mx-auto my-20 lg:my-50 px-10">
      <div className="flex items-center">
        <p
          className={`uppercase text-xl text-[hsl(var(--third))] ${
            language === "en" ? "w-60 sm:w-40" : "w-30 sm:w-25"
          }`}
        >
          {language === "en" ? "About Me" : "نبذة عني"}
        </p>
        <div className="w-full h-px bg-[hsl(var(--third))]"></div>
      </div>

      <div className="py-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
        <div className="w-full lg:w-150 xl:w-200">
          <h2 className="uppercase text-4xl sm:text-6xl">
            {language === "en" ? about.titleEn : about.titleAr}
          </h2>
          <p className="py-3 text-[hsl(var(--third))] text-lg md:text-xl xl:text-2xl leading-8 sm:leading-10 lg:leading-14">
            {language === "en" ? about.infoEn : about.infoAr}
          </p>

          <Btns href="https://www.youturkey11.com" style="py-3 xl:px-10 my-5 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2">
            <span>{language === "en" ? "My Resume" : "سيرتي الذاتية"}</span>
            <MdArrowOutward size={30} />
          </Btns>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          <Image
            src={about.img}
            width={1000}
            height={1000}
            alt={about.heroEn}
            loading="lazy"
            className="w-full mx-auto lg:w-150 xl:w-200 h-150 object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
          />
          <div className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
            <p className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white">
              {language === "en" ? about.heroEn : about.heroAr}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
