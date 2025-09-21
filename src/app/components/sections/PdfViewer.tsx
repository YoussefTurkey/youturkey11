"use client";
import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
import Link from "next/link";
import { IoDownloadOutline } from "react-icons/io5";
import { useLanguage } from "@/app/lang/LanguageProvider";

// ربط الـ worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfViewer({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1); // التكبير الأساسي
  const [numPages, setNumPages] = useState(0);
  const { language } = useLanguage();

  // تحميل الـ PDF
  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjsLib.getDocument(url).promise;
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
    };
    loadPdf();
  }, [url]);

  // عرض الصفحة
  useEffect(() => {
    if (!pdfDoc) return;

    const renderPage = async (num: number) => {
      const page = await pdfDoc.getPage(num);

      // نخلي الـscale حسب عرض الشاشة
      const containerWidth =
        canvasRef.current?.parentElement?.clientWidth || 600;
      const viewport = page.getViewport({ scale });
      const responsiveScale = (containerWidth / viewport.width) * scale;

      const finalViewport = page.getViewport({ scale: responsiveScale });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.height = finalViewport.height;
      canvas.width = finalViewport.width;

      await page.render({
        canvasContext: context,
        viewport: finalViewport,
      }).promise;
    };

    renderPage(pageNum);
  }, [pdfDoc, pageNum, scale]);

  // تحكم في الصفحات
  const nextPage = () => {
    if (pdfDoc && pageNum < numPages) setPageNum(pageNum + 1);
  };

  const prevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full" dir="ltr">
      {/* صفحة PDF */}
      <div className="lg:w-200 relative">
        <canvas
          ref={canvasRef}
          className="mx-auto rounded-lg border shadow-md w-full h-auto"
        />

        <Link
          href={url}
          download
          className="absolute bottom-5 right-5 cursor-pointer rounded-full bg-[hsl(var(--secondary))] text-white p-2 sm:p-3"
        >
          <IoDownloadOutline size={20} />
        </Link>
      </div>

      {/* رقم الصفحة */}
      <div>
        {language === 'en' ? `Page ${pageNum} / ${numPages}` : `صفحة ${pageNum} / ${numPages}` }
        
      </div>

      {/* أزرار التحكم */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={prevPage}
          disabled={pageNum <= 1}
          className="cursor-pointer px-5 sm:px-7 py-1 text-lg rounded-lg border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2"
        >
          
          {language === 'en' ? 'Prev' : 'رجوع'}
        </button>
        <button
          onClick={nextPage}
          disabled={pageNum >= numPages}
          className="cursor-pointer px-5 sm:px-7 py-1 text-lg rounded-lg border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2"
        >
          {language === 'en' ? 'Next' : 'التالي'}
        </button>
      </div>
    </div>
  );
}
