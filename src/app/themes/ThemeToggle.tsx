"use client";
// importing React-Icons
import { AiOutlineSun } from "react-icons/ai";
import { FiMoon } from "react-icons/fi";
import { useTheme } from "@/app/themes/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] hover:text-white rounded-full w-10 h-10 flex justify-center items-center cursor-pointer transition-all"
    >
      {theme === "light" ? <AiOutlineSun /> : <FiMoon />}
    </button>
  );
}
