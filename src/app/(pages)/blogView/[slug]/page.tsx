"use client";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Next Components
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// Importing React Hooks
import { use } from "react";
// Importing Data
import { contents, projects } from "@/app/database/data";
// Importing Components
import Titles from "@/app/components/ui/Titles";
// Importing React-Icons
import { FaBehanceSquare, FaGithubSquare } from "react-icons/fa";

interface BlogViewProps {
  params: Promise<{ slug: string }>;
}

export default function BlogViewPage({ params }: BlogViewProps) {
  const { slug } = use(params);
  const views = [...contents, ...projects].find((view) => view.slug === slug);

  if (!views) {
    return notFound();
  }

  const { language } = useLanguage();

  return (
    <main className="container mx-auto my-30 sm:my-20 p-5 border border-[hsl(var(--third)/20%)] rounded-lg">
      <div className="flex flex-col items-start gap-5">
        <Image
          src={views.image}
          width={1000}
          height={1000}
          alt={language === "en" ? views.titleEn : views.titleAr}
          loading="lazy"
          className="mx-auto w-full h-auto object-cover transition-transform duration-500 rounded-sm sm:rounded-lg"
        />

        <div className="flex flex-col gap-5">
          <Titles>{language === "en" ? views.titleEn : views.titleAr}</Titles>
          <p>{language === "en" ? views.shortDescEn : views.shortDescAr}</p>
        </div>
      </div>

      {views.descEn && views.descAr && (
        <div>
          <p className="text-xl">
            {(language === "en" ? views.descEn : views.descAr)
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
          </p>
        </div>
      )}
      <Link href={views.preview || ""} target="_blank" className="text-[hsl(var(--secondary))] hover:underline">
        {language === "en" ? "Preview here" : "اطلع من هنا"}
      </Link>
    </main>
  );
}
