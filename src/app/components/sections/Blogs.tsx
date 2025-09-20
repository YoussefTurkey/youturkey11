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
import Loading from "../ui/Loading";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 🟢 هجيب من الـ blogs collection
        const snap = await getDocs(collection(db, "articles"));
        const blogs = snap.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Blog)
        );

        // 🟢 فلترة بحيث filter = post | video فقط
        const filteredBlogs = blogs.filter(
          (blog) => blog.filter === "post" || blog.filter === "video"
        );

        if (filteredBlogs.length === 0) {
          setError("no_data");
        } else {
          // 🟢 Shuffle once + خذ 4 بس
          setRandomBlogs(shuffleArray(filteredBlogs).slice(0, 4));
        }
      } catch (err) {
        setError("fetch_error");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
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

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loading />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-[hsl(var(--third))] mb-2">
            {error === "no_data" 
              ? (language === "en" ? "No blog content available" : "لا يوجد محتوى مقالات متاح")
              : (language === "en" ? "Failed to load content" : "فشل في تحميل المحتوى")
            }
          </h3>
          <p className="text-[hsl(var(--third))] opacity-70">
            {error === "no_data"
              ? (language === "en" 
                  ? "Check back later for new blog posts and videos." 
                  : "تحقق لاحقاً للحصول على مقالات وفيديوهات جديدة.")
              : (language === "en" 
                  ? "Please try refreshing the page or contact support if the problem persists." 
                  : "يرجى محاولة تحديث الصفحة أو الاتصال بالدعم إذا استمرت المشكلة.")
            }
          </p>
        </div>
      ) : (
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
            
            <div className="relative rounded-b-lg p-3 border-t border-[hsl(var(--third)/20%)]">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-lg capitalize font-bold w-40 sm:w-64 truncate text-[hsl(var(--third))] group-hover:text-[hsl(var(--foreground))] transition-colors">
                {language === "en" ? blog.titleEn : blog.titleAr}
              </h2>
              <p className="text-sm border border-[hsl(var(--third)/20%)] py-1 px-5 rounded-2xl">
                {blog.filter}
              </p>
            </div>

            {blog.shortDescEn && blog.shortDescAr && (
              <div
                className="
                  max-h-15 overflow-hidden opacity-70
                  group-hover:max-h-40 group-hover:opacity-100
                  transition-all duration-500 ease-in-out
                "
              >
                <p className="text-lg text-[hsl(var(--third))] pt-2">
                  {language === "en" ? blog.shortDescEn : blog.shortDescAr}
                </p>
              </div>
            )}
          </div>
          </Link>
        ))}
        </div>
      )}

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