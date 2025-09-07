"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contents, certificates } from "@/app/database/data";
import { useLanguage } from "@/app/lang/LanguageProvider";
import Btns from "./Btns";
import Titles from "./Titles";
import { MdArrowOutward } from "react-icons/md";
import Modal from "./Modal"; // ✅ استدعاء المودال
import Image from "next/image";

// --- TypeScript Interfaces ---
interface MasonryItem {
  id: number;
  imageUrl: string;
  title: string;
}
interface GridItemProps {
  item: MasonryItem;
  onClick: () => void;
}
interface MasonryGridProps {
  items: MasonryItem[];
  onImageClick: (img: string) => void;
}

// --- GridItem Component ---
const GridItem: React.FC<GridItemProps> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="mb-4 break-inside-avoid relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick} // ✅ فتح المودال عند الضغط على الصورة
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-auto rounded-xl shadow-lg"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src =
            "https://placehold.co/400x300/fecaca/333333?text=Image+Not+Found";
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
const MasonryGrid: React.FC<MasonryGridProps> = ({ items, onImageClick }) => {
  return (
    <div
      className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
      style={{ columnWidth: "280px" }}
    >
      {items.map((item) => (
        <GridItem
          key={item.id}
          item={item}
          onClick={() => onImageClick(item.imageUrl)}
        />
      ))}
    </div>
  );
};

// --- Main App Component ---
export default function Masonry() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // ✅ الصورة اللي اتفتحت

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let mappedItems: MasonryItem[] = [];

  if (pathname === "/") {
    mappedItems = contents.map((content) => ({
      id: content.id,
      imageUrl: content.image,
      title: language === "en" ? content.titleEn : content.titleAr,
    }));

    if (isMobile) mappedItems = mappedItems.slice(0, 4);
  }

  if (pathname === "/about") {
    mappedItems = certificates.map((certif) => ({
      id: certif.id,
      imageUrl: certif.img,
      title: certif.title,
    }));
  }

  return (
    <div className="font-sans transition-colors">
      <div className="container mx-auto sm:px-6 lg:px-8 py-8">
        <main>
          {pathname === "/about" && (
            <Titles
              style={`w-full lg:w-100 xl:w-200 2xl:w-100 ${
                language === "en" ? "text-left" : "text-right"
              }`}
            >
              {language === "en"
                ? "Licenses & certifications"
                : "التراخيص والشهادات"}
            </Titles>
          )}

          <MasonryGrid items={mappedItems} onImageClick={setSelectedImage} />

          {pathname === "/" && (
            <Btns
              href="/community"
              style="py-3 xl:px-10 my-10 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2"
            >
              <span>{language === "en" ? "Our Community" : "مجتمعنا"}</span>
              <MdArrowOutward size={30} />
            </Btns>
          )}

          {pathname === "/about" && (
            <Modal
              isOpen={!!selectedImage}
              onClose={() => setSelectedImage(null)}
            >
              {selectedImage && (
                <div>
                  <Image
                    src={selectedImage}
                    width={2000}
                    height={2000}
                    loading="lazy"
                    alt="Certificate"
                    className="rounded-lg w-125 h-auto mx-auto"
                  />
                  <h2 className="text-center mt-4 text-lg font-semibold text-white">
                    {
                      mappedItems.find(
                        (item) => item.imageUrl === selectedImage
                      )?.title
                    }
                  </h2>
                </div>
              )}
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}
