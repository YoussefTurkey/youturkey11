'use client'
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";

const Flag = () => {
  const { language } = useLanguage();

  return (
    <div className="relative">
      <div className={`bg-black w-12 h-2 ${language === 'en' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}></div>
      <div className={`bg-white w-12 h-2`}></div>
      <div className={`bg-green-500 w-12 h-2 ${language === 'en' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}></div>
      <div className={`w-0 h-0 border-t-[10px] border-b-[10px] ${language === 'en' ? 'border-l-[15px] left-0' : 'border-r-[15px] right-0'} border-t-transparent border-b-transparent border-red-500 absolute bottom-0.25`}></div>
    </div>
  );
};

export default Flag;
