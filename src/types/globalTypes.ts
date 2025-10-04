export type TPackages = {
  id: string;
  category: "training" | "freelancing" | "hiring" | "sessions" | "coming-soon";
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  plans: {
    nameEn?: string;
    nameAr?: string;
    durationEn?: string;
    durationAr?: string;
    featuresEn?: string[];
    featuresAr?: string[];
    price?: number;
    currencyEn?: string;
    currencyAr?: string;
    type?: string;
    availability?: string;
    skills?: string[];
    net_salary?: string;
    statusEn?: string;
    statusAr?: string;
    topicsEn?: string[];
    topicsAr?: string[];
  }[];
};