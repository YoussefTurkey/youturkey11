"use client";
// Importing React Hooks
import { useState } from "react";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Data
import { contents, projects } from "@/app/database/data";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// Importing Components
import Btns from "@/app/components/ui/Btns";

const page = () => {
  const { language } = useLanguage();
  
  const [all, openAll] = useState(true);
  const [project, openProject] = useState(false);
  const [content, openContent] = useState(false);

  return (
    <main className="container mx-auto my-30 sm:my-20 px-5 xl:px-0">
      <div className="flex items-center justify-center gap-1 sm:gap-5">
        <Btns
          action={() => {
            openAll(true)
            openContent(false);
            openProject(false);
          }}
          style={`py-1 sm:py-3 xl:px-10 text-md sm:text-lg lg:text-xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${all ? 'bg-[hsl(var(--secondary))]! text-white' : ''} hover:text-white`}
        >
          {language === "en" ? "All" : "الجميع"}
        </Btns>

        <Btns
          action={() => {
            openAll(false)
            openContent(true);
            openProject(false);
          }}
          style={`py-1 sm:py-3 xl:px-10 text-md sm:text-lg lg:text-xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${content ? 'bg-[hsl(var(--secondary))]! text-white' : ''} hover:text-white`}
        >
          {language === "en" ? "Contents" : "محتوايا"}
        </Btns>

        <Btns
          action={() => {
            openAll(false)
            openContent(false);
            openProject(true);
          }}
          style={`py-1 sm:py-3 xl:px-10 text-md sm:text-lg lg:text-xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${project ? 'bg-[hsl(var(--secondary))]! text-white!' : ''} hover:text-white`}
        >
          {language === "en" ? "Projects" : "مشاريعي"}
        </Btns>
      </div>

      {all && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5 sm:my-10">
          {[...contents, ...projects].map((blog) => (
            <Link
              href={`/blogView/${blog.slug}`}
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
      )}

      {project && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5 sm:my-10">
          {projects.map((blog) => (
            <Link
              href={`/blogView/${blog.slug}` || ""}
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
      )}

      {content && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5 sm:my-10">
          {contents.map((blog) => (
            <Link
              href={`/blogView/${blog.slug}` || ""}
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
      )}
    </main>
  );
};

export default page;
