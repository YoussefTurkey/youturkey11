"use client";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Components
import Info from "../ui/Info";

const About = () => {
  const { language } = useLanguage();
 
  return (
    <section id="me" className="container mx-auto px-10">
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

      <Info />
    </section>
  );
};

export default About;
