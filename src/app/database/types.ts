// ================= FILTER ENUM =================
export enum WorkFilter {
  Web = "web",
  Graphic = "graphic",
  Post = "post",
  Video = "video",
}

// ================= ABOUT =================
export type TAbout = {
  titleAr: string;
  titleEn: string;
  infoAr: string;
  infoEn: string;
  heroAr: string;
  heroEn: string;
  img: string;
  cover: string;
  descAr: string;
  descEn: string;
};

// ================= WORKS (Projects, Contents) =================
export type TWorks = {
  id: number;
  image: string;
  filter: WorkFilter
  titleAr: string;
  titleEn: string;
  shortDescAr?: string;
  shortDescEn?: string;
  descAr?: string;
  descEn?: string;
  preview?: string;
  behance?: boolean;
  github?: boolean;
  slug?: string;
};

// ================= Experience =================
export type TExperience = {
  id: string;
  img: string;
  titleAr: string;
  titleEn: string;
  type: string;
  duration: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  responsibilitiesAr: string[];
  responsibilitiesEn: string[];
  skills: string[];
};

// ================= Certificates =================
export type TCertificates = {
  id: number;
  img: string;
  title: string;
};
