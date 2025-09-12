"use client";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Firebase
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// Importing React Hooks
import { useState, useEffect } from "react";
// Importing Components
import Btns from "../ui/Btns";
// Importing React-Icons
import { MdArrowOutward } from "react-icons/md";

// نوع البيانات
type Blog = {
  id: string;
  titleEn: string;
  titleAr: string;
  filter: "web" | "graphic" | "post" | "video";
  state: "content" | "project";
  image: string;
  preview?: string;
  slug: string;
  shortDescEn?: string;
  shortDescAr?: string;
};

// دالة Shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Blogs = () => {
  const { language } = useLanguage();
  const [randomBlogs, setRandomBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      // 🟢 هجيب من الـ blogs collection
      const snap = await getDocs(collection(db, "projects"));
      const blogs = snap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Blog)
      );

      // 🟢 فلترة بحيث filter = post | video فقط
      const filteredBlogs = blogs.filter(
        (blog) => blog.filter === "post" || blog.filter === "video"
      );

      // 🟢 Shuffle once + خذ 4 بس
      setRandomBlogs(shuffleArray(filteredBlogs).slice(0, 4));
    };

    fetchBlogs();
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
            href={`/blogView/${blog.slug}`}
            rel="noopener noreferrer"
            key={blog.id}
            className="group rounded-lg border border-[hsl(var(--third)/20%)] hover:border-[hsl(var(--secondary))] hover:scale-102 transition-transform duration-500"
          >
            {blog.image && blog.image.trim() !== "" ? (
              <Image
                src={blog.image}
                width={1000}
                height={1000}
                alt={language === "en" ? blog.titleEn : blog.titleAr}
                loading="lazy"
                className="rounded-t-lg"
              />
            ) : (
              <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded-t-lg">
                <span className="text-gray-500 text-sm">No image</span>
              </div>
            )}
            <div className="rounded-b-lg p-3 border-t border-[hsl(var(--third)/20%)]">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-lg capitalize font-bold w-40 sm:w-64 truncate">
                  {language === "en" ? blog.titleEn : blog.titleAr}
                </h2>
                <p className="text-sm text-[hsl(var(--third))]">
                  {blog.filter}
                </p>
              </div>
              {blog.shortDescEn && blog.shortDescAr && (
                <p className="text-md text-[hsl(var(--third))] line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
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
