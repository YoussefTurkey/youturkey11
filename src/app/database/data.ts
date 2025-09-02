type TAbout = {
  titleAr: string;
  titleEn: string;
  infoAr: string;
  infoEn: string;
  heroAr: string;
  heroEn: string;
  img: string;
};
export const about: TAbout = {
  titleAr: "مَن أنا",
  titleEn: "About Us",
  infoAr:
    "مطور واجهات أمامية مبدع ويدقق في التفاصيل، لديه أكثر من سنتين من الخبرة في بناء تطبيقات ويب حديثة ومتجاوبة. ماهر في JavaScript وNext.js وSCSS وWordPress (بما في ذلك Elementor وWooCommerce) ضمن مجموعة تقنيات متنوعة. شغوف بتجربة المستخدم وتصميم واجهات مخصصة تُعزز التفاعل وتحسن الأداء.",
  infoEn:
    "Creative and detail-oriented Frontend Developer with over 2 years of experience in building modern, responsive web applications. Proficient in JavaScript, Next.js, SCSS, and WordPress (Elementor, WooCommerce) as part of a versatile tech stack. Passionate about UI/UX and delivering tailored digital experiences that drive engagement and performance.",
  heroAr: "يوسف التركي",
  heroEn: "Youssef Turkey",
  img: "/images/turkey.webp",
};

type TProjects = {
  id: number
  image: string
  filter: string
  titleAr: string
  titleEn: string
  shortDescAr: string
  shortDescEn: string
  preview?: string
  behance?: string
  github?: string
}
export const projects: TProjects[] = [
  {
    id: 1,
    image: '/images/project-4.webp',
    filter: 'web',
    titleAr: 'السيرة الذاتية',
    titleEn: 'Resume',
    shortDescAr: 'السيرة الذاتية الديناميكية تشكمل كافية بيانات يوسف التركي',
    shortDescEn: 'Dynamic Resume that has all data about Youssef Turkey',
    preview: 'https://youturkey11.com/',
  },
  {
    id: 2,
    image: '/images/project-5.webp',
    filter: 'web',
    titleAr: 'سبوت75',
    titleEn: 'Spot75',
    shortDescAr: 'متجر إلكتروني لخدمات الأدوات الترفيهية',
    shortDescEn: 'E-Commerce for entertainment tools',
    preview: 'https://spot75.com/',
  },
  {
    id: 3,
    image: '/images/project-6.webp',
    filter: 'web',
    titleAr: 'قُرّاءً',
    titleEn: 'Qorra',
    shortDescAr: 'موقع تعريفي لمبادرة قُرّاءْ التي تهدف للاهتمام باللغة العربية',
    shortDescEn: 'Website for Qorra initiative that interesting of Arabic Langauage',
    preview: 'https://qorra.vercel.app/',
  },
  {
    id: 4,
    image: '/images/project-1.webp',
    filter: 'graphic',
    titleAr: 'سنفُرّة',
    titleEn: 'Senforra',
    shortDescAr: 'سنفُرّة للبن البرازيلي الفاخر',
    shortDescEn: 'Senforra For premium Brazilian coffee',
    preview: 'https://www.behance.net/gallery/217496887/Senforra-Every-Sip-a-Story',
  },
  {
    id: 5,
    image: '/images/project-2.webp',
    filter: 'graphic',
    titleAr: 'كل ما هو تركي جميل',
    titleEn: 'Every Turkey is Beautiful',
    shortDescAr: 'الهوية البصرية لشعار يوسف التركي الجديد',
    shortDescEn: 'Visual identity branding for Youssef Turkey',
    preview: 'https://www.behance.net/gallery/208797491/_',
  },
  {
    id: 6,
    image: '/images/project-3.webp',
    filter: 'graphic',
    titleAr: 'جميع أعمالي 2024',
    titleEn: 'All My Projects 2024',
    shortDescAr: 'جميع الهويات البصرية سنة 2024',
    shortDescEn: 'Logofolio for 2024',
    preview: 'https://www.behance.net/gallery/209786459/Logofolio-2024',
  },
]