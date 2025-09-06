"use client";
import { useEffect, useState } from "react";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Components
import Titles from "../ui/Titles";
import Btns from "../ui/Btns";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// Importing Data
import { projects } from "@/app/database/data";
// Importing React-Icons
import { MdArrowOutward } from "react-icons/md";

// دالة Shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Projects = () => {
  const { language } = useLanguage();

  const [randomProjects, setRandomProjects] = useState<typeof projects>([]);

  useEffect(() => {
    // فلترة الأول بحيث يكون filter = web أو graphic فقط
    const filteredProjects = projects.filter(
      (project) => project.filter === "web" || project.filter === "graphic"
    );
    // shuffle once only on client
    setRandomProjects(shuffleArray(filteredProjects).slice(0, 4));
  }, []);

  return (
    <section id="projects" className="container mx-auto my-20 px-10">
      <div className="flex items-center">
        <p
          className={`uppercase text-xl text-[hsl(var(--third))] ${
            language === "en" ? "w-60 sm:w-40" : "w-30 sm:w-25"
          }`}
        >
          {language === "en" ? "Showcases" : "العروض"}
        </p>
        <div className="w-full h-px bg-[hsl(var(--third))]"></div>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between py-10">
        <Titles
          style={`w-full lg:w-100 xl:w-200 2xl:w-100 ${
            language === "en" ? "text-left" : "text-right"
          }`}
        >
          {language === "en" ? "Selected Works" : "الأعمال المختارة"}
        </Titles>
        <p className="w-full md:w-90 lg:w-100 xl:w-200 lg:text-xl text-[hsl(var(--third))]">
          {language === "en"
            ? "A mix of my technical projects, artistic work. All crafted with structure, clarity, and intention."
            : "مزيج من مشاريعي التقنية، وأعمالي الفنية. كلها مصممة بهيكل واضح، ووضوح، وقصدية."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {randomProjects.map((proj) => (
          <Link
            href={proj.preview || ""}
            rel="noopener noreferrer"
            className="group block"
            key={proj.id}
          >
            <Image
              src={proj.image}
              width={1000}
              height={1000}
              alt={proj.titleEn}
              loading="lazy"
              className="w-full mx-auto object-cover group-hover:scale-101 transition-transform duration-500 rounded-lg"
            />
            <div className="flex items-start justify-between pt-5">
              <div>
                <h4 className="font-bold capitalize text-2xl">
                  {language === "en" ? proj.titleEn : proj.titleAr}
                </h4>
                <p className="text-[hsl(var(--third))] py-1 group-hover:text-[hsl(var(--foreground))] transition-all">
                  {language === "en" ? proj.shortDescEn : proj.shortDescAr}
                </p>
              </div>
              <p className="text-[hsl(var(--third))] group-hover:text-[hsl(var(--foreground))] transition-all">
                {proj.filter}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Btns href="/community" style="py-3 xl:px-10 my-10 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2">
        <span>{language === "en" ? "Our Community" : "مجتمعنا"}</span>
        <MdArrowOutward size={30} />
      </Btns>
    </section>
  );
};

export default Projects;
