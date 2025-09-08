"use client";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Data
import { contents } from "@/app/database/data";
// Importing Next Components
import Image from "next/image";
// Importing React Hooks
import { useState, useEffect } from "react";
// Importing Components
import Btns from "../ui/Btns";
import Link from "next/link";
// Importing React-Icons
import { MdArrowOutward } from "react-icons/md";

// دالة Shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Blogs = () => {
  const { language } = useLanguage();
  const [randomBlogs, setRandomBlogs] = useState<typeof contents>([]);

  useEffect(() => {
    // فلترة الأول بحيث يكون filter = web أو graphic فقط
    const filteredBlogs = contents.filter(
      (blog) => blog.filter === "post" || blog.filter === "video"
    );
    // shuffle once only on client
    setRandomBlogs(shuffleArray(filteredBlogs).slice(0, 4));
  }, []);

  return (
    <section id="blog" className="container mx-auto mt-20 px-10">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5 sm:my-10">
        {randomBlogs.map((blog) => (
          <Link
            href={blog.slug || ""}
            rel="noopener noreferrer"
            key={blog.id}
            className="rounded-lg border border-[hsl(var(--third)/20%)] hover:border-[hsl(var(--secondary))] hover:scale-102 transition-transform duration-500"
          >
            <Image
              src={blog.image}
              width={1000}
              height={1000}
              alt={language === "en" ? blog.titleEn : blog.titleAr}
              loading="lazy"
              className="rounded-t-lg"
            />
            <div className="rounded-b-lg p-3 border-t border-[hsl(var(--third)/20%)]">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-lg capitalize font-bold w-40 sm:w-64 truncate">
                  {language === "en" ? blog.titleEn : blog.titleAr}
                </h2>
                <p className="text-sm text-[hsl(var(--third))] pt-1">
                  {blog.filter}
                </p>
              </div>
              {blog.shortDescEn && blog.shortDescAr && (
                <p className="text-lg text-[hsl(var(--third))] pt-1">
                  {language === "en" ? blog.shortDescEn : blog.shortDescAr}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <Btns
        href="/community"
        style="py-3 xl:px-10 my-10 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2"
      >
        <span>{language === "en" ? "Our Community" : "مجتمعنا"}</span>
        <MdArrowOutward size={30} />
      </Btns>
    </section>
  );
};

export default Blogs;
