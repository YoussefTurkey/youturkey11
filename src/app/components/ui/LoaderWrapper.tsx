"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      const onPageLoad = () => setLoading(false);
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
          <Image
            src="/logo.svg" 
            alt="Loading..."
            width={100}
            height={100}
          />
          <p className="text-sm text-white py-5 animate-pulse">{language === 'en' ? 'Loading...' : 'تحميل...'}</p>
        </div>
      )}
      {children}
    </>
  );
}
