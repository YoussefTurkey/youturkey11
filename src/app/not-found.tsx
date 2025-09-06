"use client";
// Importing Components
import Btns from "./components/ui/Btns";
// Importing React-Icons
import { MdArrowOutward } from "react-icons/md";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
      
      <div className="bg-[hsl(var(--secondary))] text-white px-2 text-sm rounded rotate-12 absolute">
        {language === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
      </div>

      <Btns
        href="/"
        style="w-70! py-3 xl:px-10 my-5 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2"
      >
        <span>{language === "en" ? "Get Back" : "ارجع مكانك"}</span>
        <MdArrowOutward size={30} />
      </Btns>
    </section>
  );
}
