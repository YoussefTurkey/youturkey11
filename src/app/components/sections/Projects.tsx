"use client";
// Import Next Components
import Image from "next/image";
import Link from "next/link";
// Importing React Hooks
import { useState } from "react";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Components
import Titles from "../ui/Titles";
import Btns from "../ui/Btns";
// Importing Data
import { projects } from "@/app/database/data";

const Projects = () => {
  const { language } = useLanguage();
  const [allproj, setAllProj] = useState(true);
  const [webproj, setWebProj] = useState(false);
  const [graphicproj, setGraphicProj] = useState(false);

  const handleAll = () => {
    setAllProj(true);
    setWebProj(false);
    setGraphicProj(false);
  };
  const handleWeb = () => {
    setAllProj(false);
    setWebProj(true);
    setGraphicProj(false);
  };
  const handleGraphic = () => {
    setAllProj(false);
    setWebProj(false);
    setGraphicProj(true);
  };

  // 🔎 هنا بيتم الفلترة
  const filteredProjects = projects.filter((proj) => {
    if (allproj) return true;
    if (webproj) return proj.filter === "web";
    if (graphicproj) return proj.filter === "graphic";
    return true;
  });

  return (
    <section className="container mx-auto my-20 lg:my-50 px-10">
      <Titles>{language === "en" ? "Latest Projects" : "أخر ابداعاتي"}</Titles>

      {/* Filter Buttons */}
      <div className="flex items-center justify-center gap-5">
        <Btns
          action={handleAll}
          style={`py-3 my-5 text-md sm:text-lg lg:text-xl border border-[hsl(var(--secondary))] ${
            allproj ? "bg-[hsl(var(--secondary))] text-white" : "bg-transparent"
          } hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2`}
        >
          <span>{language === "en" ? "All Projects" : "جميع المشاريع"}</span>
        </Btns>
        <Btns
          action={handleWeb}
          style={`py-3 my-5 text-md sm:text-lg lg:text-xl border border-[hsl(var(--secondary))] ${
            webproj ? "bg-[hsl(var(--secondary))] text-white" : "bg-transparent"
          } hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2`}
        >
          <span>{language === "en" ? "Web Projects" : "المشاريع التقنية"}</span>
        </Btns>
        <Btns
          action={handleGraphic}
          style={`py-3 my-5 text-md sm:text-lg lg:text-xl border border-[hsl(var(--secondary))] ${
            graphicproj ? "bg-[hsl(var(--secondary))] text-white" : "bg-transparent"
          } hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2`}
        >
          <span>
            {language === "en" ? "Graphic Projects" : "المشاريع الفنية"}
          </span>
        </Btns>
      </div>

      {/* Projects Grid */}
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredProjects.map((proj) => (
          <Link
            href={proj.preview || ""}
            key={proj.id}
            className="relative rounded-2xl overflow-hidden shadow-lg group"
          >
            <Image
              src={proj.image}
              width={1000}
              height={1000}
              alt={proj.titleEn}
              loading="lazy"
              className="w-full mx-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
            />
            <div className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
              <p className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white">
                {language === "en" ? proj.titleEn : proj.titleAr}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects;
