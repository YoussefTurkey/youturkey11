"use client";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing Data
import { about } from "@/app/database/data";
// Importing React-Icons
import { MdArrowOutward } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaBehanceSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
// Importing Components
import Btns from "../ui/Btns";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Info = () => {
  const { language } = useLanguage();
  const pathname = usePathname();

  return (
    <div
      className={`py-10 flex ${
        pathname === "/about" ? "flex-col-reverse" : "flex-col lg:flex-row"
      } items-center lg:items-start justify-between gap-10`}
    >
      <div
        className={`w-full ${pathname === "/about" ? "" : "lg:w-150 xl:w-200"}`}
      >
        {pathname === "/about" ? (
          <div className="flex justify-between items-center">
            <h2 className="uppercase text-4xl sm:text-6xl">
              {language === "en" ? about.titleEn : about.titleAr}
            </h2>

            <Btns
              href="/resume"
              style="py-3 xl:px-10 my-5 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2"
            >
              {language === "en" ? "View Resume" : "السيرة الذاتية"}
            </Btns>
          </div>
        ) : (
          <h2 className="uppercase text-4xl sm:text-6xl">
            {language === "en" ? about.titleEn : about.titleAr}
          </h2>
        )}
        <p className="py-3 text-[hsl(var(--third))] text-lg md:text-xl xl:text-2xl leading-8 sm:leading-10 lg:leading-14">
          {language === "en" ? about.infoEn : about.infoAr}
        </p>
        {pathname === "/about" && (
          <p className="py-3 text-[hsl(var(--third))] text-lg md:text-xl xl:text-2xl leading-8 sm:leading-10 lg:leading-14">
            {language === "en" ? about.descEn : about.descAr}
          </p>
        )}

        {pathname === "/" && (
          <Btns
            href="/about"
            style="py-3 xl:px-10 my-5 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2"
          >
            <span>
              {language === "en" ? "View Full Bio" : "عرض السيرة الكاملة"}
            </span>
            <MdArrowOutward size={30} />
          </Btns>
        )}
        {pathname === "/about" && (
          <section className="flex flex-col sm:flex-row items-center gap-5">
            <div className="hidden sm:block w-full h-px bg-[hsl(var(--third))]"></div>

            <div className="flex items-center gap-3">
              <Link
                href={"https://www.linkedin.com/in/youturkey11/"}
                target="_blank"
                className="hover:scale-110 transition-all"
              >
                <FaLinkedin size={30} color="#b2b2b2" />
              </Link>
              <Link
                href={"https://web.facebook.com/ywsf.altrky.179788"}
                target="_blank"
                className="hover:scale-110 transition-all"
              >
                <FaFacebookSquare size={30} color="#b2b2b2" />
              </Link>
              <Link
                href={
                  "https://www.youtube.com/channel/UCvLviX2Q0ujSHap3mn4q8-A"
                }
                target="_blank"
                className="hover:scale-110 transition-all"
              >
                <IoLogoYoutube size={30} color="#b2b2b2" />
              </Link>
              <Link
                href={"https://www.behance.net/YouTurkey11"}
                target="_blank"
                className="hover:scale-110 transition-all"
              >
                <FaBehanceSquare size={30} color="#b2b2b2" />
              </Link>
              <Link
                href={"https://github.com/YoussefTurkey"}
                target="_blank"
                className="hover:scale-110 transition-all"
              >
                <FaGithubSquare size={30} color="#b2b2b2" />
              </Link>
              <Link
                href={"https://www.tiktok.com/@youturkey11"}
                target="_blank"
                className="hover:scale-110 transition-all"
              >
                <AiFillTikTok size={30} color="#b2b2b2" />
              </Link>
              <Link
                href={"https://www.instagram.com/youturkey11/"}
                target="_blank"
                className="hover:scale-110 transition-all"
              >
                <FaSquareInstagram size={30} color="#b2b2b2" />
              </Link>
            </div>
          </section>
        )}
      </div>

      {pathname === "/" && (
        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          <Image
            src={about.img}
            width={1000}
            height={1000}
            alt={about.heroEn}
            loading="lazy"
            className="w-full mx-auto lg:w-150 xl:w-200 h-150 object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
          />

          <div className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
            <p className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white">
              {language === "en" ? about.heroEn : about.heroAr}
            </p>
          </div>
        </div>
      )}
      {pathname === "/about" && (
        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          <Image
            src={pathname === "/about" ? about.cover : about.img}
            width={1000}
            height={1000}
            alt={about.heroEn}
            loading="lazy"
            className={`mx-auto ${
              pathname === "/about"
                ? "w-400 h-20 sm:h-100"
                : "w-full lg:w-150 xl:w-200 h-150"
            } object-cover group-hover:scale-105 transition-transform duration-500 rounded-sm sm:rounded-lg`}
          />

          <div className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
            <p className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white">
              {language === "en" ? about.heroEn : about.heroAr}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
