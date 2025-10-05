"use client";
import { useEffect } from "react";

export default function ChatbaseWidget() {
  useEffect(() => {
    // لو السكريبت متضاف قبل كده، ما تضيفوش تاني
    if (document.getElementById("chatbase-script")) return;

    (function () {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        // تعريف الـ queue لو مش متعرف
        // @ts-ignore
        window.chatbase = (...args: any[]) => {
          // @ts-ignore
          if (!window.chatbase.q) window.chatbase.q = [];
          // @ts-ignore
          window.chatbase.q.push(args);
        };
        // Proxy عشان نحافظ على السلوك الأصلي
        // @ts-ignore
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args: any[]) => target(prop, ...args);
          },
        });
      }

      // نفس فكرة onLoad اللي في السكريبت الأصلي
      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "chatbase-script"; // ✅ استبدل ID هنا لو عايز
        script.setAttribute("chatbotId", "xtJ6x7i1xBQTL51xEDhf-"); // 👈 الـ ID بتاع البوت
        script.setAttribute("domain", "www.chatbase.co");
        document.body.appendChild(script);
      };

      // تنفيذ onLoad بعد تحميل الصفحة
      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad);
    })();
  }, []);

  return null; // مفيش UI ظاهر
}
