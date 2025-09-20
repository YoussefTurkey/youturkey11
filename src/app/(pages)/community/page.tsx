"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/lang/LanguageProvider";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import Btns from "@/app/components/ui/Btns";
import Loading from "@/app/components/ui/Loading";
import { about } from "@/app/database/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


type Blog = {
  id: string;
  titleEn: string;
  titleAr: string;
  filter: "web" | "graphic" | "post" | "video";
  state: "article" | "project";
  image: string;
  preview: string;
  slug: string;
  shortDescEn: string;
  shortDescAr: string;
};

const CommunityPage = () => {
  const { language } = useLanguage();

  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<"all" | "article" | "project">("all");

  useEffect(() => {
    const fetchData = async () => {
      // Get Projects Data
      const projectSnap = await getDocs(collection(db, "projects"));
      const projectData = projectSnap.docs.map(
        (doc) => ({ id: doc.id, state: "project", ...doc.data() } as Blog)
      );

      // Get Articles Data
      const articleSnap = await getDocs(collection(db, "articles"));
      const articleData = articleSnap.docs.map(
        (doc) => ({ id: doc.id, state: "article", ...doc.data() } as Blog)
      );

      // Combine
      const allData = [...projectData, ...articleData];

      setAllBlogs(allData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  // 🟢 فلترة حسب state
  const filteredBlogs =
    filter === "all"
      ? allBlogs
      : allBlogs.filter((blog) => blog.state === filter);

  // 🟢 component to render list
  const RenderBlogs = ({ blogs }: { blogs: Blog[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5 sm:my-10">
      {blogs.length === 0 ? (
        language === "en" ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-[hsl(var(--third))] mb-2">
              No data available
            </h3>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-[hsl(var(--third))] mb-2">
              لا يوجد بيانات متاحة
            </h3>
          </div>
        )
      ) : (
        blogs.map((blog) => (
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
        ))
      )}
    </div>
  );

  return (
    <main className="container mx-auto my-30 sm:my-20 px-5 xl:px-0">
      {/* Cover page */}
      <Link href={"https://www.linkedin.com/in/youturkey11/"}>
        <Image
          src={about.cover2}
          width={5000}
          height={5000}
          alt={about.heroEn}
          loading="lazy"
          className={`mx-auto w-full h-fit object-cover rounded-sm sm:rounded-lg`}
        />
      </Link>

      {/* 🔘 Filter Buttons */}
      <div className="my-10">
        {/* للشاشات الصغيرة: Swiper */}
        <div className="block sm:hidden">
          <Swiper spaceBetween={10} slidesPerView={3} freeMode={true}>
            <SwiperSlide className="w-auto">
              <Btns
                action={() => setFilter("all")}
                style={`py-1 px-4 text-md rounded-full! border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
                  filter === "all"
                    ? "bg-[hsl(var(--secondary))]! text-white"
                    : ""
                } hover:text-white`}
              >
                {language === "en" ? "All" : "الجميع"}
              </Btns>
            </SwiperSlide>

            <SwiperSlide className="w-auto">
              <Btns
                action={() => setFilter("article")}
                style={`py-1 px-4 text-md rounded-full! border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
                  filter === "article"
                    ? "bg-[hsl(var(--secondary))]! text-white"
                    : ""
                } hover:text-white`}
              >
                {language === "en" ? "Contents" : "محتوايا"}
              </Btns>
            </SwiperSlide>

            <SwiperSlide className="w-auto">
              <Btns
                action={() => setFilter("project")}
                style={`py-1 px-4 text-md rounded-full! border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
                  filter === "project"
                    ? "bg-[hsl(var(--secondary))]! text-white"
                    : ""
                } hover:text-white`}
              >
                {language === "en" ? "Projects" : "مشاريعي"}
              </Btns>
            </SwiperSlide>

            
          </Swiper>
        </div>

        {/* للشاشات الكبيرة: ثابت */}
        <div className="hidden sm:flex items-center justify-center gap-5">
          <Btns
            action={() => setFilter("all")}
            style={`py-1 sm:py-3 xl:px-10 text-md rounded-full! border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
              filter === "all" ? "bg-[hsl(var(--secondary))]! text-white" : ""
            } hover:text-white`}
          >
            {language === "en" ? "All" : "الجميع"}
          </Btns>

          <Btns
            action={() => setFilter("article")}
            style={`py-1 sm:py-3 xl:px-10 text-md rounded-full! border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
              filter === "article"
                ? "bg-[hsl(var(--secondary))]! text-white"
                : ""
            } hover:text-white`}
          >
            {language === "en" ? "Contents" : "محتوايا"}
          </Btns>

          <Btns
            action={() => setFilter("project")}
            style={`py-1 sm:py-3 xl:px-10 text-md rounded-full! border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
              filter === "project"
                ? "bg-[hsl(var(--secondary))]! text-white"
                : ""
            } hover:text-white`}
          >
            {language === "en" ? "Projects" : "مشاريعي"}
          </Btns>
        </div>
      </div>

      {/* 🔘 Render Section */}
      <RenderBlogs blogs={filteredBlogs} />
    </main>
  );
};

export default CommunityPage;
