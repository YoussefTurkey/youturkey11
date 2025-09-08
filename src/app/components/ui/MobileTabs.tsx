"use client";
// Importing React Hooks
import React, { useState, useRef, useEffect } from "react";
// Importing Framer Motion
import { AnimatePresence, motion } from "framer-motion";
// Importing SVGs
import { HomeIcon, UserIcon, WorksIcon, BlogIcon } from "../svg/logos";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";

interface Tab {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  targetId: string; // 👈 هنضيف id لكل تاب
  type?: never;
}

type TabItem = Tab;

interface ExpandedTabsProps {
  tabs: TabItem[];
  className?: string;
  onChange?: (index: number | null) => void;
}

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: {
    width: "auto",
    opacity: 1,
    transition: { delay: 0.05, duration: 0.2, ease: "easeOut" as const },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.1, ease: "easeIn" as const },
  },
};

function ExpandedTabs({ tabs, onChange }: ExpandedTabsProps) {
  const [selected, setSelected] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelected(null);
        if (onChange) onChange(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onChange]);

  const handleSelect = (index: number, targetId: string) => {
    setSelected(index);
    if (onChange) onChange(index);

    if (targetId === "top") {
      // 👇 يعمل Scroll لفوق خالص
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const SeparatorComponent = () => (
    <div
      className="h-7 w-px"
      aria-hidden="true"
    />
  );

  return (
    <div
      ref={containerRef}
      className={`z-1 fixed bottom-10 left-[50%] translate-x-[-50%] sm:hidden flex items-center gap-1 rounded-full py-1 px-1 shadow-md backdrop-blur-sm bg-[hsl(var(--background))] border border-[hsl(var(--secondary)_/_50%)]`}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <SeparatorComponent key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isSelected = selected === index;

        return (
          <button
            key={tab.title}
            onClick={() => handleSelect(index, tab.targetId)} // 👈 تمرير id
            className={`relative z-10 flex items-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none 
              ${
                isSelected
                  ? "text-[hsl(var(--secondary))]"
                  : "text-[hsl(var(--foreground))]"
              }
            `}
          >
            {isSelected && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 z-0 rounded-full backdrop-blur-sm border border-[hsl(var(--secondary)_/_30%)] shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              <Icon className="h-5 w-5 flex-shrink-0" />
              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function MobileTabs() {
  const { language } = useLanguage();

  const TABS: TabItem[] = [
    { title: language === 'en' ? "Home" : 'الرئيسية', icon: HomeIcon, targetId: "top" },
    { title: language === 'en' ? "Who's Me" : 'من أنا', icon: UserIcon, targetId: "me" },
    { title: language === 'en' ? "Projects" : 'مشاريعي', icon: WorksIcon, targetId: "projects" },
    { title: language === 'en' ? "Contents" : 'محتوايا', icon: BlogIcon, targetId: "blog" },
  ];

  return <ExpandedTabs tabs={TABS} />;
}
