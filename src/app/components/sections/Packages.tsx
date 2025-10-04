"use client";
// Importing Components
import Titles from "../ui/Titles";
// Importing Language Provider
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Firebase
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
// Importing React Hooks
import { useState, useEffect } from "react";
// Importing Components
import Loading from "../ui/Loading";
import Btns from "../ui/Btns";
// Importing Swipers
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// Importing React Icons
import { FaStarOfLife } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
// Importing Types
import { TPackages } from "@/types/globalTypes";

const Packages = () => {
  const { language } = useLanguage();
  const [allPackages, setAllPackages] = useState<TPackages[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPackage, setFilterPackage] = useState<
    "training" | "freelancing" | "hiring" | "sessions" | "coming-soon"
  >("training");

  // Fetching Collections
  useEffect(() => {
    const fetchData = async () => {
      const packagesSnap = await getDocs(collection(db, "packages"));
      const packagesData = packagesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllPackages(packagesData as TPackages[]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // دالة لحفظ الباقة في local storage والانتقال لصفحة الاتصال
  const handlePackageSelect = (packageName: string) => {
    // حفظ الباقة في local storage
    localStorage.setItem('selectedPackage', packageName);
    // الانتقال لصفحة الاتصال
    window.location.href = '/contact';
  };

  // set Loading
  if (loading) return <Loading />;

  // Filteration using Categories
  const filterCategory = allPackages.filter(
    (pack) => pack.category === filterPackage
  );

  // 🟢 component to render list
  const RenderPackages = ({ packages }: { packages: TPackages[] }) => (
    <div className="grid grid-col-1 md:grid-col-2 lg:grid-col-3 gap-5 my-5 sm:my-10">
      {packages.length === 0 ? (
        language === "en" ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-[hsl(var(--third))] mb-2">
              No data available
            </h3>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-[hsl(var(--third))] mb-2">
              لا يوجد بيانات متاحة
            </h3>
          </div>
        )
      ) : (
        packages.map((pack, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center my-5"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-5xl text-center font-bold mb-2 text-[hsl(var(--foreground))]">
              {pack.category === 'coming-soon' ? (
                <span>{language === "en" ? pack.titleEn : pack.titleAr} 🎉</span>
              ): language === "en" ? pack.titleEn : pack.titleAr}
            </h3>
            <p className="text-sm text-center text-[hsl(var(--third))] my-2">
              {language === "en" ? pack.descriptionEn : pack.descriptionAr}
            </p>

            {/* Training & Freelancing & Session */}
            {pack.category !== "coming-soon" && pack.category !== "hiring" && (
              <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {pack.plans?.map((plan, i) => (
                  <div
                    key={i}
                    className="relative group p-10 rounded-lg hover:scale-102 border border-[hsl(var(--third)/20%)] hover:border-[hsl(var(--foreground))] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 my-5">
                      <span className="p-3 border border-[hsl(var(--third)/20%)] group-hover:bg-[hsl(var(--third)/20%)] rounded-full transition-colors">
                        <FaStarOfLife size={15} />
                      </span>
                      <h4 className="group-hover:text-[hsl(var(--secondary))] text-2xl font-semibold">
                        {language === "en" ? plan.nameEn : plan.nameAr}
                      </h4>
                    </div>
                    <p className="text-xl text-[hsl(var(--foreground))] text-center my-4 p-2 border border-[hsl(var(--third)/20%)] group-hover:border-[hsl(var(--third))] transition-colors rounded-full">
                      {language === "en" ? plan.durationEn : plan.durationAr}
                    </p>
                    <ul className="text-xl my-4">
                      {language === "en"
                        ? plan.featuresEn?.map((ft, i) => (
                            <div key={i} className="flex items-center gap-x-2">
                              <span>
                                <IoCheckmarkDoneOutline size={20} />
                              </span>
                              <li key={i} className="py-1">
                                {ft}
                              </li>
                            </div>
                          ))
                        : plan.featuresAr?.map((ft, i) => (
                            <div key={i} className="flex items-center gap-x-2">
                              <span>
                                <IoCheckmarkDoneOutline size={20} />
                              </span>
                              <li key={i} className="py-1">
                                {ft}
                              </li>
                            </div>
                          ))}
                    </ul>
                    <p className="absolute -top-4 right-30 md:right-25 lg:right-20 xl:right-35 2xl:right-42.5 px-10 py-1 font-bold text-[hsl(var(--foreground))] border border-[hsl(var(--third)/20%)] group-hover:border-[hsl(var(--third))] bg-[hsl(var(--background))] rounded-full">
                      {language === "en"
                        ? `${plan.price} ${plan.currencyEn}`
                        : `${plan.price} ${plan.currencyAr}`}
                    </p>
                    <button
                      onClick={() => handlePackageSelect(
                        language === 'en' ? plan?.nameEn || plan?.type || '' : plan?.nameAr || plan?.type || ''
                      )}
                      className="w-full capitalize py-3 xl:px-10 text-md sm:text-lg lg:text-xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2 rounded-lg cursor-pointer transition-colors"
                    >
                      <span>
                        {language === "en"
                          ? "Get this package"
                          : "اختار هذه الباقة"}
                      </span>
                      <MdArrowOutward size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* hiring */}
            {pack.category === "hiring" && (
              <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {pack.plans?.map((plan, i) => (
                  <div
                    key={i}
                    className="relative group p-10 rounded-lg hover:scale-102 border border-[hsl(var(--third)/20%)] hover:border-[hsl(var(--foreground))] transition-all duration-300"
                  >
                    <div className={`flex items-center ${language === 'en' ? '' : 'flex-row-reverse'} gap-2 my-5`}>
                      <span className="p-3 border border-[hsl(var(--third)/20%)] group-hover:bg-[hsl(var(--third)/20%)] rounded-full transition-colors">
                        <FaStarOfLife size={15} />
                      </span>
                      <h4 className="group-hover:text-[hsl(var(--secondary))] text-2xl font-semibold">
                        {plan.type}
                      </h4>
                    </div>
                    <p className="text-xl text-[hsl(var(--foreground))] text-center my-4 p-2 border border-[hsl(var(--third)/20%)] group-hover:border-[hsl(var(--third))] transition-colors rounded-full">
                      {language === 'en' ? plan.availability ? "Available" : "Not Available" : plan.availability ? "متاح" : "غير متاح"}
                    </p>
                    <p className={`text-xl my-10 flex flex-col items-start gap-2`}>
                      <span className="font-bold">{language === 'en' ? 'Skills:' : 'مهاراتي:'}</span>
                      <span>{plan.skills?.join(", ")}</span>
                    </p>
                    <p className="absolute -top-4 right-25 md:right-15 lg:right-15 xl:right-30 2xl:right-32.5 px-10 py-1 font-bold text-[hsl(var(--foreground))] border border-[hsl(var(--third)/20%)] group-hover:border-[hsl(var(--third))] bg-[hsl(var(--background))] rounded-full">
                      {plan.net_salary}
                    </p>
                    <button
                      onClick={() => handlePackageSelect(plan.type || '')}
                      className="w-full capitalize py-3 xl:px-10 text-md sm:text-lg lg:text-xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2 rounded-lg cursor-pointer transition-colors"
                    >
                      <span>
                        {language === "en"
                          ? "Get this package"
                          : "اختار هذه الباقة"}
                      </span>
                      <MdArrowOutward size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* coming-soon */}
            {pack.category === "coming-soon" && (
              <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {pack.plans?.map((plan, i) => (
                  <div
                    key={i}
                    className="relative group p-10 rounded-lg hover:scale-102 border border-[hsl(var(--third)/20%)] hover:border-[hsl(var(--foreground))] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 my-5">
                      <span className="p-3 border border-[hsl(var(--third)/20%)] group-hover:bg-[hsl(var(--third)/20%)] rounded-full transition-colors">
                        <FaStarOfLife size={15} />
                      </span>
                      <h4 className="group-hover:text-[hsl(var(--secondary))] text-2xl font-semibold">
                        {language === "en" ? plan.nameEn : plan.nameAr}
                      </h4>
                    </div>
                    <p className={`absolute -top-4 ${language === 'en' ? 'right-30 md:right-25 lg:right-20 xl:right-30 2xl:right-37.5' : 'right-35 md:right-30 lg:right-22.5 xl:right-35 2xl:right-45'} capitalize px-10 py-1 font-bold text-orange-500 border border-[hsl(var(--third)/20%)] group-hover:border-[hsl(var(--third))] bg-[hsl(var(--background))] rounded-full`}>
                      {language === "en" ? plan.statusEn : plan.statusAr}
                    </p>
                    <p className="text-xl my-10 flex flex-col items-start gap-2">
                      <span className="font-bold">
                        {language === 'en' ? 'Topics:' : 'مواضيع:'}
                      </span>
                      <span>
                        {language === "en"
                          ? plan.topicsEn?.join(", ")
                          : plan.topicsAr?.join(", ")}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <main className="container mx-auto my-30 sm:my-20 px-5 xl:px-0" id="services">
      {/* Titles */}
      <div>
        <div className="flex items-center">
          <p
            className={`uppercase text-xl text-[hsl(var(--third))] ${
              language === "en" ? "w-50" : "w-25 md:w-50 lg:w-40"
            }`}
          >
            {language === "en" ? "My Services" : "خدماتي"}
          </p>
          <div className="w-full h-px bg-[hsl(var(--third))]"></div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between my-10">
          <Titles>
            {language === "en"
              ? "Choose the package that powers your innovation"
              : "اختر الباقاتة التي تدعم ابتكارك"}
          </Titles>
          <p className={`text-center text-md text-[hsl(var(--third))]`}>
            {language === "en"
              ? "Flexible and powerful packages designed to scale with your needs, from hobby projects to enterprise solutions."
              : "باقات مرنة وقوية مصممة لتتناسب مع احتياجاتك، بدءًا من مشاريع الهوايات وحتى حلول المؤسسات."}
          </p>
        </div>
      </div>

      {/* 🔘 Filter Buttons */}
      <div className="my-10">
        {/* للشاشات الصغيرة: Swiper */}
        <div className="flex sm:hidden">
          <Swiper
            className="w-full!"
            spaceBetween={10}
            slidesPerView='auto'
            freeMode={true}
            dir={language === "en" ? "ltr" : "rtl"}
          >
            <SwiperSlide className="w-fit!">
              <button
                onClick={() => setFilterPackage("training")}
                className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
                  filterPackage === "training"
                    ? "bg-[hsl(var(--secondary))]! text-white"
                    : ""
                } hover:text-white transition-colors`}
              >
                {language === "en"
                  ? "Training & Mentorship Packages"
                  : "باقات التدريب والتوجيه"}
              </button>
            </SwiperSlide>

            <SwiperSlide className="w-fit!">
              <button
                onClick={() => setFilterPackage("freelancing")}
                className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
                  filterPackage === "freelancing"
                    ? "bg-[hsl(var(--secondary))]! text-white"
                    : ""
                } hover:text-white transition-colors`}
              >
                {language === "en"
                  ? "Freelancing Projects Packages"
                  : "باقات مشاريع العمل الحر"}
              </button>
            </SwiperSlide>

            <SwiperSlide className="w-fit!">
              <button
                onClick={() => setFilterPackage("hiring")}
                className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
                  filterPackage === "hiring"
                    ? "bg-[hsl(var(--secondary))]! text-white"
                    : ""
                } hover:text-white transition-colors`}
              >
                {language === "en"
                  ? "Work Opportunities Packages"
                  : "باقات مشاريع العمل الحر"}
              </button>
            </SwiperSlide>

            <SwiperSlide className="w-fit!">
              <button
                onClick={() => setFilterPackage("sessions")}
                className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
                  filterPackage === "sessions"
                    ? "bg-[hsl(var(--secondary))]! text-white"
                    : ""
                } hover:text-white transition-colors`}
              >
                {language === "en"
                  ? "Workshops & Talks Packages"
                  : "باقات ورش العمل والمحادثات"}
              </button>
            </SwiperSlide>

            <SwiperSlide className="w-fit!">
              <button
                onClick={() => setFilterPackage("coming-soon")}
                className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
                  filterPackage === "coming-soon"
                    ? "bg-[hsl(var(--secondary))]! text-white"
                    : ""
                } hover:text-white transition-colors`}
              >
                {language === "en" ? "Coming Soon" : "سيُصدر قريبًا"}
              </button>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* للشاشات الكبيرة: ثابت */}
        <div className="hidden sm:flex items-center justify-start flex-wrap gap-5">
          <button
            onClick={() => setFilterPackage("training")}
            className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
              filterPackage === "training"
                ? "bg-[hsl(var(--secondary))]! text-white"
                : ""
            } hover:text-white transition-colors`}
          >
            {language === "en"
              ? "Training & Mentorship Packages"
              : "باقات التدريب والتوجيه"}
          </button>

          <button
            onClick={() => setFilterPackage("freelancing")}
            className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
              filterPackage === "freelancing"
                ? "bg-[hsl(var(--secondary))]! text-white"
                : ""
            } hover:text-white transition-colors`}
          >
            {language === "en"
              ? "Freelancing Projects Packages"
              : "باقات مشاريع العمل الحر"}
          </button>

          <button
            onClick={() => setFilterPackage("hiring")}
            className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
              filterPackage === "hiring"
                ? "bg-[hsl(var(--secondary))]! text-white"
                : ""
            } hover:text-white transition-colors`}
          >
            {language === "en"
              ? "Work Opportunities Packages"
              : "باقات مشاريع العمل الحر"}
          </button>

          <button
            onClick={() => setFilterPackage("sessions")}
            className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
              filterPackage === "sessions"
                ? "bg-[hsl(var(--secondary))]! text-white"
                : ""
            } hover:text-white transition-colors`}
          >
            {language === "en"
              ? "Workshops & Talks Packages"
              : "باقات ورش العمل والمحادثات"}
          </button>

          <button
            onClick={() => setFilterPackage("coming-soon")}
            className={`py-1 px-4 text-md rounded-full border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] ${
              filterPackage === "coming-soon"
                ? "bg-[hsl(var(--secondary))]! text-white"
                : ""
            } hover:text-white transition-colors`}
          >
            {language === "en" ? "Coming Soon" : "سيُصدر قريبًا"}
          </button>
        </div>
      </div>

      {/* 🔘 Render Section */}
      <RenderPackages packages={filterCategory} />
    </main>
  );
};

export default Packages;