'use client'
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Components
import Masonry from "../ui/Masonry";

const Blogs = () => {
  const { language } = useLanguage();

  return (
    <section id="blog" className="container mx-auto mt-20 lg:mt-50 px-10">
        <div className="flex items-center">
        <p
          className={`uppercase text-xl text-[hsl(var(--third))] ${
            language === "en" ? "w-100 sm:w-50" : "w-85 md:w-50 lg:w-40"
          }`}
        >
          {language === "en" ? "Blog Contents" : "محتوى مقالاتي"}
        </p>
        <div className="w-full h-px bg-[hsl(var(--third))]"></div>
      </div>

      <Masonry />
    </section>
  )
}

export default Blogs