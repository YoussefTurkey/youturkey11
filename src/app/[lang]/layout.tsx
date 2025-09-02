"use client";
// Providers
import ClientThemeProvider from "@/app/themes/ClientThemeProvider";
import ClientLanguageProvider from "@/app/lang/ClientLanguageProvider";
// Components
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "en" | "ar" };
}) {
  const direction = params.lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={params.lang} dir={direction}>
      <body>
        <ClientThemeProvider>
          <ClientLanguageProvider defaultLanguage={params.lang}>
            <Header />
            {children}
            <Footer />
          </ClientLanguageProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
