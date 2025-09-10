"use client";
import { use } from "react";
import { useLanguage } from "@/app/lang/LanguageProvider";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Titles from "@/app/components/ui/Titles";
import Loading from "@/app/components/ui/Loading";

type Project = {
  id?: string;
  titleEn: string;
  titleAr: string;
  filter: "web" | "graphic" | "post" | "video";
  image: string;
  preview: string;
  slug: string;
  shortDescEn: string;
  shortDescAr: string;
  descEn?: string;
  descAr?: string;
};

interface BlogViewProps {
  params: Promise<{ slug: string }>;
}

export default function BlogViewPage({ params }: BlogViewProps) {
  // ✅ نفك البارامز
  const { slug } = use(params);

  const { language } = useLanguage();
  const [view, setView] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const allProjects = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Project)
      );
      const matched = allProjects.find((item) => item.slug === slug);
      setView(matched || null);
      setLoading(false);
    };

    fetchProjects();
  }, [slug]);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (!view) {
    return notFound();
  }

  return (
    <main className="container mx-auto my-30 sm:my-20 p-5 xl:border xl:border-[hsl(var(--third)/20%)] rounded-lg">
      <div className="flex flex-col items-start gap-5">
        {view.image && (
          <Image
            src={view.image}
            width={1000}
            height={1000}
            alt={language === "en" ? view.titleEn : view.titleAr}
            loading="lazy"
            className="mx-auto w-full h-auto object-cover transition-transform duration-500 rounded-sm sm:rounded-lg"
          />
        )}

        <div className="flex flex-col gap-5">
          <Titles>{language === "en" ? view.titleEn : view.titleAr}</Titles>
        </div>
      </div>

      {view.descEn && view.descAr && (
        <div>
          <p className="text-xl p-5 bg-[hsl(var(--third)/5%)] rounded-lg">
            {(language === "en" ? view.descEn : view.descAr)
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

      {view.preview && (
        <Link
          href={view.preview}
          target="_blank"
          className={`text-[hsl(var(--secondary))] hover:underline mt-5 block text-center ${language === 'en' ? 'sm:text-left' : 'sm:text-right'}`}
        >
          {language === "en" ? "Preview here" : "اطلع من هنا"}
        </Link>
      )}
    </main>
  );
}
