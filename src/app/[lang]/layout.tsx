export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const direction = params.lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={params.lang} dir={direction}>
      <body>
        {children}
      </body>
    </html>
  );
}
