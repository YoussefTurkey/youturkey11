"use client";
// Importing React Hooks
import { useEffect } from "react";
// using Translation
import { useTheme } from "@/app/themes/ThemeProvider";
// Importing Language Provider
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing SVGs
import {
  ReactLogo,
  NextLogo,
  VueLogo,
  JSLogo,
  TSLogo,
  TailwindLogo,
  CSSLogo,
  SassLogo,
  AxiosLogo,
  FigmaLogo,
  GithubLogo,
  HTMLLogo,
  WordPressLogo,
  NodeLogo,
  ExpressLogo,
  SQLLogo,
  StrapiLogo,
  GitLogo,
  NPMLogo,
  YarnLogo,
  FirebaseLogo,
  CloudnaryLogo
} from "../svg/logos";
import Titles from "./Titles";

type ILogos = {
  id: number;
  component: React.ReactNode;
};

function Logomarquee() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const logos1: ILogos[] = [
    {
      id: 1,
      component: <ReactLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 2,
      component: <NextLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 3,
      component: <VueLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 4,
      component: <JSLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 5,
      component: <TSLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 6,
      component: <TailwindLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 7,
      component: <CSSLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 8,
      component: <SassLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 9,
      component: <AxiosLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 10,
      component: <FigmaLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 11,
      component: <GithubLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 12,
      component: <HTMLLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 13,
      component: <WordPressLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 14,
      component: <NodeLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 15,
      component: <ExpressLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 16,
      component: <SQLLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 17,
      component: <StrapiLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 18,
      component: <GitLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 19,
      component: <NPMLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 20,
      component: <YarnLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 21,
      component: <FirebaseLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
    {
      id: 22,
      component: <CloudnaryLogo fill={theme === "dark" ? "#b2b2b2" : "#000"} />,
    },
  ];
  // We need to inject the keyframes animation into the document's head
  // because Tailwind CSS doesn't directly support the 'cqw' unit.
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes marquee-move-ltr {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(calc(-100cqw - var(--item-gap)));
        }
        }
        @keyframes marquee-move-rtl {
        from {
            transform: translateX(calc(100cqw - var(--item-gap)));
        }
        to {
            transform: translateX(0);
        }
        }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const Marquee = ({
    logos,
    direction = "forwards",
  }: {
    logos: ILogos[];
    direction?: string;
  }) => {
    const numItems = logos.length;
    const speed = "25s";
    const itemWidth = "80px";
    const itemGap = "10px";

    return (
      <div
        className="max-w-full overflow-hidden"
        style={
          {
            "--speed": speed,
            "--numItems": numItems,
            "--item-width": itemWidth,
            "--item-gap": itemGap,
            "--direction": direction,
            maskImage:
              "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)",
          } as React.CSSProperties
        }
      >
        <div
          className="w-max flex"
          style={
            {
              "--track-width": `calc(var(--item-width) * ${numItems})`,
              "--track-gap": `calc(var(--item-gap) * ${numItems})`,
            } as React.CSSProperties
          }
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex justify-center items-center"
              style={
                {
                  width: "var(--item-width)",
                  aspectRatio: "1 / 1.2",
                  marginRight: "var(--item-gap)",
                  animation: `${
                    language === "ar" ? "marquee-move-rtl" : "marquee-move-ltr"
                  } var(--speed) linear infinite`,
                } as React.CSSProperties
              }
            >
              <div className="w-3/5 h-auto">{logo.component}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="items-center overflow-hidden mb-10">
      <Titles>{language === 'en' ? 'Tools that I have' : 'حقيبة أدواتي'}</Titles>
      <div className="w-70 md:w-150 lg:w-200 xl:w-full xl:max-w-7xl mx-auto flex flex-col gap-y-6">
        <Marquee
          logos={logos1}
          direction={language === "ar" ? "reverse" : "forwards"}
        />
      </div>
    </div>
  );
}

export default Logomarquee;
