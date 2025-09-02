"use client";
// importing React-Icons
import { GrLanguage } from "react-icons/gr";
import { useLanguage } from "@/app/lang/LanguageProvider";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] hover:text-white rounded-full w-10 h-10 flex justify-center items-center cursor-pointer transition-all"
    >
      <GrLanguage />
    </button>
  );
}
