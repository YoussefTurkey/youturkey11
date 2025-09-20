"use client";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Components
import CodeProfile from "../ui/CodeProfile";
import Btns from "../ui/Btns";
// Importing React-icons
import { MdArrowOutward } from "react-icons/md";

const HeroSection = () => {
  const { language } = useLanguage();

  return (
    <section className="container mx-auto my-30 sm:my-20 flex flex-col xl:flex-row items-center justify-between gap-5">
      <div className="flex flex-col items-center xl:items-start">
        <div
          className={`flex items-center gap-2 group ${
            language === "en" ? "mb-6 sm:mb-15" : ""
          }`}
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#83d65c] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#83d65c]"></span>
          </div>
          <p className="capitalize font-bold text-[hsl(var(--foreground))] lg:text-[#b2b2b2] group-hover:text-[hsl(var(--foreground))] transition-all">
            {language === "en" ? "available to work" : "مستعد للعمل"}
          </p>
        </div>

        <div className="flex items-center xl:items-start flex-col">
          <h1
            className={`text-[60px] ${
              language === "en" ? "md:text-[150px]" : "md:text-[100px]"
            } tracking-tight ${
              language === "en" ? "leading-5" : "leading-20"
            } font-black uppercase`}
          >
            {language === "en" ? "Youssef" : "يـــوسف"}
          </h1>
          <h2
            className={`text-[60px] ${
              language === "en" ? "md:text-[150px]" : "md:text-[100px]"
            } tracking-tight font-black uppercase bg-gradient-to-t from-[#b2b2b2] to-[hsl(var(--foreground))] bg-clip-text text-transparent`}
          >
            {language === "en" ? "Turkey" : "تـــــركي"}
          </h2>
        </div>

        <div>
          <p
            className={` tracking-widest font-normal uppercase text-[#b2b2b2] ${
              language === "en" ? "md:text-5xl md:-mt-5" : "md:text-4xl md:mt-5"
            }`}
          >
            {language === "en"
              ? "Frontend Engineer"
              : "مهندس تطوير واجهات المواقع"}
          </p>
          <p
            className={` tracking-widest font-normal uppercase text-[#b2b2b2] ${
              language === "en" ? "md:text-3xl md:mt-0" : "md:text-2xl md:mt-5"
            }`}
          >
            React.js / Next.js
          </p>
        </div>

        <Btns href="/contact" style="sm:w-full py-3 my-5 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2">
          <span>{language === "en" ? "Get in touch" : "تواصل معي الآن"}</span>{" "}
          <MdArrowOutward size={30} />
        </Btns>
      </div>

      <div>
        <CodeProfile />
      </div>
    </section>
  );
};

export default HeroSection;
