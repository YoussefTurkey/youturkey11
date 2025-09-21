"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoDownloadOutline } from "react-icons/io5";
import { useLanguage } from "@/app/lang/LanguageProvider";
import Loading from "../ui/Loading";

export default function PdfViewer({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  // تحميل الـ PDF with dynamic import
  useEffect(() => {
    const loadPdf = async () => {
      try {
        // Only run on client side
        if (typeof window === 'undefined') return;
        
        // Dynamic import of pdfjs-dist
        const pdfjsLib = await import("pdfjs-dist");
        
        // Set worker source - using local worker file
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
        
        const pdf = await pdfjsLib.getDocument(url).promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setError("Failed to load PDF");
        setIsLoading(false);
      }
    };
    
    loadPdf();
  }, [url]);

  // عرض الصفحة
  useEffect(() => {
    if (!pdfDoc) return;

    const renderPage = async (num: number) => {
      // Cancel any ongoing render task
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }

      try {
        setIsRendering(true);
        const page = await pdfDoc.getPage(num);

        // نخلي الـscale حسب عرض الشاشة
        const containerWidth =
          canvasRef.current?.parentElement?.clientWidth || 600;
        const viewport = page.getViewport({ scale });
        const responsiveScale = (containerWidth / viewport.width) * scale;

        const finalViewport = page.getViewport({ scale: responsiveScale });

        const canvas = canvasRef.current;
        if (!canvas) {
          setIsRendering(false);
          return;
        }

        const context = canvas.getContext("2d");
        if (!context) {
          setIsRendering(false);
          return;
        }

        canvas.height = finalViewport.height;
        canvas.width = finalViewport.width;

        // Clear canvas before rendering
        context.clearRect(0, 0, canvas.width, canvas.height);

        const renderTask = page.render({
          canvasContext: context,
          viewport: finalViewport,
        });

        renderTaskRef.current = renderTask;

        await renderTask.promise;
        renderTaskRef.current = null;
        setIsRendering(false);
      } catch (error: any) {
        if (error.name !== 'RenderingCancelledException') {
          console.error("Error rendering page:", error);
        }
        setIsRendering(false);
      }
    };

    renderPage(pageNum);

    // Cleanup function
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfDoc, pageNum, scale]);

  // تحكم في الصفحات
  const nextPage = () => {
    if (pdfDoc && pageNum < numPages && !isRendering) {
      setPageNum(pageNum + 1);
    }
  };

  const prevPage = () => {
    if (pageNum > 1 && !isRendering) {
      setPageNum(pageNum - 1);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-500 text-lg">
          {language === 'en' ? 'Error loading PDF' : 'خطأ في تحميل الملف'}
        </div>
      </div>
    );
  }

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
        {isRendering && (
          <span className="ml-2 text-sm text-gray-500">
            {language === 'en' ? '(Rendering...)' : '(جاري العرض...)'}
          </span>
        )}
      </div>

      {/* أزرار التحكم */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={prevPage}
          disabled={pageNum <= 1 || isRendering}
          className="cursor-pointer px-5 sm:px-7 py-1 text-lg rounded-lg border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {language === 'en' ? 'Prev' : 'رجوع'}
        </button>
        <button
          onClick={nextPage}
          disabled={pageNum >= numPages || isRendering}
          className="cursor-pointer px-5 sm:px-7 py-1 text-lg rounded-lg border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center mx-auto gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {language === 'en' ? 'Next' : 'التالي'}
        </button>
      </div>
    </div>
  );
}