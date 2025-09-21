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
import { FaHeart, FaRegHeart, FaLinkedin, FaLink  } from "react-icons/fa";


type Blog = {
  id?: string;
  titleEn: string;
  titleAr: string;
  filter: "web" | "graphic" | "post" | "video" | "quiz";
  image: string;
  preview: string;
  slug: string;
  shortDescEn: string;
  shortDescAr: string;
  descEn?: string;
  descAr?: string;
  likes?: number;
  state?: "article" | "project" | "Q&A-Hub"; // 🟢 إضافة state
  answerAr?: string;
  answerEn?: string;
};

interface BlogViewProps {
  params: Promise<{ slug: string }>;
}

export default function BlogViewPage({ params }: BlogViewProps) {
  // ✅ نفك البارامز
  const { slug } = use(params);

  const { language } = useLanguage();
  const [view, setView] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [answer, setAnswer] = useState(false);

  // 🟢 جلب البيانات من الكولكشنين
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get projects
        const projectsSnap = await getDocs(collection(db, "projects"));
        const projectsData = projectsSnap.docs.map(
          (doc) => ({ id: doc.id, state: "project", ...doc.data() } as Blog)
        );

        // Get articles
        const articlesSnap = await getDocs(collection(db, "articles"));
        const articlesData = articlesSnap.docs.map(
          (doc) => ({ id: doc.id, state: "article", ...doc.data() } as Blog)
        );

        // Get Q&A-Hub
        const qaSnap = await getDocs(collection(db, "Q&A-Hub"));
        const qaData = qaSnap.docs.map(
          (doc) => ({ id: doc.id, state: "Q&A-Hub", ...doc.data() } as Blog)
        );

        // Combine all
        const allData = [...projectsData, ...articlesData, ...qaData];

        // Match by slug
        const matched = allData.find((item) => item.slug === slug);

        setView(matched || null);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // 🟦 عند تحميل الصفحة: نجيب اللايكات
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/likes?slug=${slug}`);
        const data = await res.json();
        if (data.success) {
          setView((prev) => (prev ? { ...prev, likes: data.count } : prev));
          setLiked(data.liked);
        }
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };

    fetchLikes();
  }, [slug]);

  if (loading) return <Loading />;
  if (!view) return notFound();

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

        <div className="flex items-center justify-between gap-3 w-full">
          <Titles>{language === "en" ? view.titleEn : view.titleAr}</Titles>

          <button
            onClick={async () => {
              try {
                const res = await fetch("/api/likes", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ slug }),
                });
                const data = await res.json();
                if (data.success) {
                  setView((prev) =>
                    prev ? { ...prev, likes: data.count } : prev
                  );
                  setLiked(true);
                }
              } catch (err) {
                console.error("Error liking:", err);
              }
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            {liked ? (
              <FaHeart className="w-7 h-7 text-[hsl(var(--secondary))] transition-transform duration-300 group-active:scale-125" />
            ) : (
              <FaRegHeart className="w-7 h-7 text-[hsl(var(--secondary))] transition-transform duration-300 group-hover:scale-110" />
            )}
            <span className="text-lg">{view.likes || 0}</span>
          </button>
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

      {view.state === "article" || view.state === "project" ? (
        view.preview && (
          <Link
            href={view.preview}
            target="_blank"
            className={`flex items-center gap-2 text-[hsl(var(--secondary))] hover:underline mt-5 text-center ${
              language === "en" ? "sm:text-left" : "sm:text-right"
            }`}
          >
            {view.state === 'article' && (
              <>
                <span><FaLinkedin size={20} /></span>
                <span>{language === "en" ? "Preview post" : "شاهد المنشور"}</span>
              </>
            )}
            {view.state === 'project' && (
              <>
                <span><FaLink size={20} /></span>
                <span>{language === "en" ? "Preview project" : "شاهد المشروع"}</span>
              </>
            )}
          </Link>
        )
      ) : (
        <>
          <button
            className="text-[hsl(var(--secondary))] cursor-pointer my-5"
            onClick={() => setAnswer(!answer)}
          >
            {answer
              ? language === "en"
                ? "hide solution ✅"
                : "اخف الحل ✅"
              : language === "en"
              ? "show solution 👇"
              : "اكتشف الحل 👇"}
          </button>
          {answer && (
            <div>
              <p className="text-xl p-5 bg-[hsl(var(--third)/5%)] rounded-lg">
                {language === "en"
                  ? view.answerEn?.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))
                  : view.answerAr?.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
