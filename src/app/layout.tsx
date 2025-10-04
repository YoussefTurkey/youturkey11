// Metadata
import type { Metadata } from "next";
// Styles
import "./globals.css";
// Fonts
import { Inter, Cairo } from "next/font/google";
// Providers
import ClientThemeProvider from "@/app/themes/ClientThemeProvider";
import ClientLanguageProvider from "@/app/lang/ClientLanguageProvider";
// Components
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import ScrollUp from "./components/ui/ScrollUp";
import LoaderWrapper from "./components/ui/LoaderWrapper";
import { Toaster } from "react-hot-toast";
// Vercel Analytics
import { Analytics } from "@vercel/analytics/next";
// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  style: ["normal"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YouTurkey11",
  description: "Youssef Turkey is a frontend engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.variable} ${cairo.variable}`}>
        <LoaderWrapper>
          <ClientThemeProvider>
            <ClientLanguageProvider defaultLanguage="en">
                <Header />
                {children}
                <Toaster position="top-right" reverseOrder={false} />
                <ScrollUp />
                <Footer />
                <Analytics />
            </ClientLanguageProvider>
          </ClientThemeProvider>
        </LoaderWrapper>
      </body>
    </html>
  );
}
