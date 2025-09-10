"use client";
import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Titles from "../components/ui/Titles";
import { useLanguage } from "../lang/LanguageProvider";
import Input from "../components/ui/Input";
import Btns from "../components/ui/Btns";
import InputError from "../components/ui/InputError";

export default function LoginPage() {
  const {language} = useLanguage()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard"); // ✅ يدخل عالداشبورد بعد نجاح الدخول
    } catch (err: any) {
      setError("❌ Wrong credentials");
    }
  };

  return (
    <main className="container my-30 sm:my-10 mx-auto flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full p-5 sm:p-0 sm:w-100 flex flex-col gap-5"
      >
        <h1 className="text-xl font-bold"></h1>
        <Titles>{language === 'en' ? 'Admin Login' : 'تسجيل الأدمن'}</Titles>
        <InputError error={error} />

        <Input
          type="email"
          placeholder={language === "en" ? "Enter your E-Mail" : "ادخل البريد الإلكتروني"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder={language === "en" ? "Enter your Password" : "ادخل الرقم السري"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Btns type="submit" style="py-3 xl:px-10 text-xl sm:text-2xl lg:text-3xl border border-[hsl(var(--secondary))] bg-transparent hover:bg-[hsl(var(--secondary))] hover:text-white flex items-center justify-center w-full mx-auto gap-2">
          {language === 'en' ? 'Login' : 'تسجيل الدخول'}
        </Btns>
      </form>
    </main>
  );
}
