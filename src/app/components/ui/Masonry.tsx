"use client";
// Importing React Hooks
import React, { useState, useEffect } from "react";
// Importing Framer Motion
import { motion, AnimatePresence } from "framer-motion";
// Importing Data
import { contents } from "@/app/database/data";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Components
import Btns from "./Btns";
// Importing React-Icons
import { MdArrowOutward } from "react-icons/md";

// --- TypeScript Interfaces ---
interface MasonryItem {
  id: number;
  imageUrl: string;
  title: string;
}
interface GridItemProps {
  item: MasonryItem;
}
interface MasonryGridProps {
  items: MasonryItem[];
}

// --- GridItem Component ---
const GridItem: React.FC<GridItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="mb-4 break-inside-avoid relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-auto rounded-xl shadow-lg"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/400x300/fecaca/333333?text=Image+Not+Found`;
        }}
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"
          >
            <div className="p-4 h-full flex flex-col justify-end">
              <p className="text-white font-bold text-base truncate">
                {item.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- MasonryGrid Component ---
const MasonryGrid: React.FC<MasonryGridProps> = ({ items }) => {
  return (
    <div
      className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
      style={{ columnWidth: "280px" }}
    >
      {items.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
};

// --- Main App Component ---
export default function Masonry() {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // دالة لتحديد إذا الشاشة موبايل أو لأ
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    handleResize(); // أول تحميل
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // تحويل الداتا من contents → MasonryItem[]
  let mappedItems: MasonryItem[] = contents.map((content) => ({
    id: content.id,
    imageUrl: content.image,
    title: language === "en" ? content.titleEn : content.titleAr,
  }));

  // لو شاشة موبايل (<= 425px) نعرض 4 بس
  if (isMobile) {
    mappedItems = mappedItems.slice(0, 4);
  }

  return (
    <div className="font-sans transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main>
          <MasonryGrid items={mappedItems} />
          <Btns href="/community" style="py-3 my-10 text-xl sm:hidden border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2">
            <span>{language === "en" ? "Our Community" : "مجتمعنا"}</span>
            <MdArrowOutward size={30} />
          </Btns>
        </main>
      </div>
    </div>
  );
}
