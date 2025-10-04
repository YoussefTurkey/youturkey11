"use client";
// using Translation
import { useLanguage } from "@/app/lang/LanguageProvider";
// importing Validation Form libs
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, TContact } from "@/app/validation/contactSchema";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// Importing Data
import { about } from "@/app/database/data";
// Importing React-Icons
import { SlEnvolope } from "react-icons/sl";
import { ImWhatsapp } from "react-icons/im";
import { IoCall } from "react-icons/io5";
// Importing Components
import Input from "@/app/components/ui/Input";
import InputError from "@/app/components/ui/InputError";
// Importing Toast
import toast from "react-hot-toast";
// Importing EmailJS
import emailjs from "emailjs-com";
import { useEffect } from "react";

const Contact = () => {
  const { language } = useLanguage();
  const searchParams = useSearchParams()
  const packageName = searchParams.get('package')

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TContact>({
    mode: "onChange",
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<TContact> = async (data) => {
    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Template ID
        {
          from_fname: data.fname,
          from_lname: data.lname,
          from_email: data.email,
          subject: data.subject,
          message: data.msg,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! // Public Key
      );

      if (result.status === 200) {
        toast.success(
          language === "en"
            ? "Your message has been sent successfully 🎉"
            : "تم إرسال رسالتك بنجاح 🎉"
        );
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        language === "en"
          ? "Something went wrong, please try again 😢"
          : "حدث خطأ ما، حاول مرة أخرى 😢"
      );
    }
  };

  // Get Package
  useEffect(()=>{
    setValue('msg', language === 'en' ? `I want this package: ${packageName}` : `أنا أريد الباقة: ${packageName}`)
  }, [setValue, packageName, language])

  //   Data
  const inputData = [
    {
      type: "text",
      placeholder: language === "en" ? "First Name" : "الاسم الأول",
      register: register("fname"),
      error: errors.fname,
    },
    {
      type: "text",
      placeholder: language === "en" ? "Last Name" : "الاسم الأخير",
      register: register("lname"),
      error: errors.lname,
    },
    {
      type: "email",
      placeholder: "example@mail.com",
      register: register("email"),
      error: errors.email,
    },
    {
      type: "text",
      placeholder: language === "en" ? "Subject" : "الموضوع",
      register: register("subject"),
      error: errors.subject,
    },
    {
      type: "textarea",
      placeholder: language === "en" ? "Leave a message" : "اترك رسالة",
      register: register("msg"),
      error: errors.msg,
    },
  ];

  return (
    <main className="container mx-auto mb-10 mt-30 md:my-20 px-5 md:px-10 xl:px-0">
      <section className="flex flex-col lg:flex-row items-start gap-5 md:gap-10">
        <div className="rounded-lg p-5 md:p-10 border border-[hsl(var(--third)_/_20%)] w-full">
          <p className="text-xl sm:text-2xl lg:text-4xl capitalize text-[hsl(var(--secondary))]">
            {language === "en" ? "Get in touch" : "تواصل معي"}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold capitalize py-3 bg-gradient-to-t from-[#b2b2b2] to-[hsl(var(--foreground))] bg-clip-text text-transparent relative after:absolute after:-bottom-5 after:left-0 after:w-full after:h-px after:bg-[hsl(var(--foreground)_/_20%)]">
            {language === "en"
              ? "Let's Chat, Reach Out to Us"
              : "دعنا نتحدث، تواصل معي"}
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-15"
          >
            {inputData.map((input, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Input
                  type={input.type as "text" | "textarea" | "select" | "file" | "email" | "password"}
                  placeholder={input.placeholder}
                  register={input.register}
                />
                {/* <InputError error={input.error} /> */}
              </div>
            ))}

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3 my-5 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-colors"
            >
              {language === "en" ? "Send" : "إرسال"}
            </button>
          </form>
        </div>

        {/* الجزء بتاع البيانات الجانبية */}
        <div className="flex flex-col gap-5 w-full">
          <div className="hidden lg:flex rounded-lg border border-[hsl(var(--third)_/_20%)] h-fit">
            <Image
              src={about.img}
              width={1000}
              height={1000}
              alt={about.titleEn}
              loading="lazy"
              className="object-cover w-full h-110 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="group hover:bg-[hsl(var(--secondary))] transition-colors rounded-lg border border-[hsl(var(--third)_/_20%)]">
              <Link
                href={"mailto:you.turkey11@gmail.com"}
                target="_blank"
                className="cursor-pointer flex items-center gap-2 md:gap-5 p-5"
              >
                <span className="group-hover:bg-[hsl(var(--background))] bg-[hsl(var(--secondary))] rounded-full p-2 md:p-3 group-hover:text-[hsl(var(--secondary))] text-[hsl(var(--background))] md:text-2xl">
                  <SlEnvolope />
                </span>
                <span className="md:text-2xl group-hover:text-white">you.turkey11@gmail.com</span>
              </Link>
            </div>

            <div className="group hover:bg-[hsl(var(--secondary))] transition-colors rounded-lg border border-[hsl(var(--third)_/_20%)]">
              <Link
                href={"https://wa.me/201273451052"}
                target="_blank"
                className="cursor-pointer flex items-center gap-2 md:gap-5 p-5"
              >
                <span className="group-hover:bg-[hsl(var(--background))] bg-[hsl(var(--secondary))] rounded-full p-2 md:p-3 group-hover:text-[hsl(var(--secondary))] text-[hsl(var(--background))] md:text-2xl">
                  <ImWhatsapp />
                </span>
                <span className="md:text-2xl group-hover:text-white">
                  {language === "en"
                    ? "(+20) 127 345 1052"
                    : "1052 345 127 (20+)"}
                </span>
              </Link>
            </div>

            <div className="group hover:bg-[hsl(var(--secondary))] transition-colors rounded-lg border border-[hsl(var(--third)_/_20%)]">
              <Link
                href={"tel:+201154102459"}
                target="_blank"
                className="cursor-pointer flex items-center gap-2 md:gap-5 p-5"
              >
                <span className="group-hover:bg-[hsl(var(--background))] bg-[hsl(var(--secondary))] rounded-full p-2 md:p-3 group-hover:text-[hsl(var(--secondary))] text-[hsl(var(--background))] md:text-2xl">
                  <IoCall />
                </span>
                <span className="md:text-2xl group-hover:text-white">
                  {language === "en"
                    ? "(+20) 115 410 2459"
                    : "2459 410 115 (20+)"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
