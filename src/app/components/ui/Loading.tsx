"use client";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// Importing SVGs Components
import { LoadingIcon } from '../svg/logos'

const Loading = () => {
  const { language } = useLanguage();

  return (
    <div className='flex flex-col items-center justify-center gap-5 my-30 sm:my-5'>
        <LoadingIcon />
        <span className='capitalize text-2xl'>
          {language === 'en' ? 'Loading...' : 'جاري التحميل'}
        </span>
    </div>
  )
}

export default Loading