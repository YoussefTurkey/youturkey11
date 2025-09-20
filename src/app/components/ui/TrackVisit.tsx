"use client";
import { useEffect, useState } from "react";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";

export default function TrackVisit() {
  const { language } = useLanguage();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackAndGetVisits = async () => {
      try {
        // أولاً نزود العداد
        const postResponse = await fetch("/api/visits", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (postResponse.ok) {
          const postData = await postResponse.json();
          // إذا رجع العدد مع الـ POST response
          if (postData.count !== undefined) {
            setCount(postData.count);
            setLoading(false);
            return;
          }
        }

        // إذا مارجعش العدد، نجيبه من GET
        const getResponse = await fetch("/api/visits");
        if (getResponse.ok) {
          const getData = await getResponse.json();
          setCount(getData.count || 0);
        } else {
          console.error("Failed to fetch visit count");
          setCount(0);
        }
      } catch (error) {
        console.error("Error tracking visit:", error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    trackAndGetVisits();
  }, []);

  if (loading) {
    return (
      <div className="border border-[hsl(var(--third))] px-5 py-2 rounded-lg text-sm">
        {language === 'en' ? "Loading visits..." : "تحميل عدد الزوار..."}
      </div>
    );
  }

  return (
    <div className="sm:border sm:border-[hsl(var(--secondary))] sm:rounded-lg py-2 px-6">
      {count !== null ? 
        language === 'en' ? `Visitors Count: ${count}` : `عدد الزوار: ${count}`
      : 
        language === 'en' ? "Visits unavailable" : "عدد الزوار غير متاح"
      }
    </div>
  );
}