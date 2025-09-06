"use client";
// Importing React Hooks
import React, { memo, useCallback, useState } from "react";
// Importing SVGs
import { ChevronDown, ChevronUp, Code, Palette, Badge } from "@/app/components/svg/logos";
// Importing Data
import { experience } from "@/app/database/data"; 
// Importing Language Provider
import { useLanguage } from "@/app/lang/LanguageProvider";

// --- TYPES ---
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
interface TimelineItemData {
  id: string;
  title: string;
  type: string;
  duration: string;
  icon: IconType;
  responsibilities: string[];
  skills: string[];
}
type ExpandMode = "multi" | "single";
interface ProfessionalTimelineProps {
  data: TimelineItemData[];
  defaultExpandedIds?: string[]; // defaults to all items expanded
  expandMode?: ExpandMode;       // "multi" | "single" (default: "multi")
}
// --- COMPONENTS ---
interface TimelineItemContentProps {
  item: TimelineItemData;
}

const TimelineItemContent = memo(function TimelineItemContent({ item }: TimelineItemContentProps) {
  return (
    <div className="mt-6 space-y-4">
      {/* Responsibilities */}
      <ul className="space-y-3">
        {item.responsibilities.map((responsibility, idx) => (
          <li
            key={`${item.id}-resp-${idx}`}
            className="flex items-start gap-3 text-sm"
          >
            <span className="w-1.5 h-1.5 bg-[hsl(var(--secondary))] rounded-full mt-2 flex-shrink-0" />
            <span className="leading-relaxed">{responsibility}</span>
          </li>
        ))}
      </ul>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {item.skills.map((skill, skillIdx) => (
          <Badge
            key={`${item.id}-skill-${skillIdx}`}
            className="bg-gray-800 text-slate-300 transition-colors px-3 py-1"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
});
TimelineItemContent.displayName = "TimelineItemContent";

interface TimelineItemProps {
  item: TimelineItemData;
  expanded: boolean;
  onToggle: (id: string) => void;
}

const TimelineItem = memo(function TimelineItem({
  item,
  expanded,
  onToggle,
}: TimelineItemProps) {
  const Icon = item.icon;
  const headerId = `timeline-header-${item.id}`;
  const contentId = `timeline-content-${item.id}`;

  return (
    <li className="relative">
      {/* Timeline marker with icon */}
      <div className="absolute left-1 top-5 w-6 h-6 bg-[hsl(var(--secondary))] rounded-full hidden sm:flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-[hsl(var(--foreground))]" />
      </div>

      {/* Card */}
      <div className="sm:ml-14 pb-8">
        <div className="rounded-lg p-4 border dark:border-[hsl(var(--third)_/_20%)] transition-all duration-200">
          <button
            id={headerId}
            className="w-full text-left group cursor-pointer"
            onClick={() => onToggle(item.id)}
            aria-expanded={expanded}
            aria-controls={contentId}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--secondary))] transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span>{item.type}</span>
                  <span aria-hidden>•</span>
                  <span>{item.duration}</span>
                </div>
              </div>

              <div className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>
          </button>

          {expanded && (
            <div id={contentId} role="region" aria-labelledby={headerId}>
              <TimelineItemContent item={item} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
});
TimelineItem.displayName = "TimelineItem";

// --- MAIN TIMELINE ---
export function ProfessionalTimeline({
  data,
  defaultExpandedIds,
  expandMode = "multi",
}: ProfessionalTimelineProps) {
  const initial = defaultExpandedIds ?? data.map((d) => d.id);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(initial));

  const onToggle = useCallback(
    (id: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (expandMode === "single") {
          return prev.has(id) ? new Set() : new Set([id]);
        }
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [expandMode]
  );

  return (
    <ol className="relative">
      {/* Vertical timeline line */}
      <div className="hidden sm:flex absolute left-4 top-0 bottom-0 w-px bg-slate-300 dark:bg-gray-800" aria-hidden />

      {data.map((item) => (
        <TimelineItem
          key={item.id}
          item={item}
          expanded={expanded.has(item.id)}
          onToggle={onToggle}
        />
      ))}
    </ol>
  );
}

// --- APP ENTRY POINT ---
export default function TimelinePage() {
  const { language } = useLanguage();

  // جهز الداتا للعرض بناءً على اللغة
  const localizedExperience = experience.map((exp) => ({
    ...exp,
    title: language === "en" ? exp.titleEn : exp.titleAr,
    responsibilities:
      language === "en" ? exp.responsibilitiesEn : exp.responsibilitiesAr,
  }));

  return (
    <div className="sm:p-8 transition-colors duration-300">
      <div>
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {language === "en" ? "Professional Experience" : "الخبرات المهنية"}
          </h1>
        </header>

        <ProfessionalTimeline data={localizedExperience} expandMode="multi" />
      </div>
    </div>
  );
}
