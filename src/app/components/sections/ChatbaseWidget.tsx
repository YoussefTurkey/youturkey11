"use client";
import { useEffect } from "react";

export default function ChatbaseWidget() {
  useEffect(() => {
    if (document.getElementById("chatbase-script")) return;

    (function () {
      // Use type assertion
      const chatbaseWindow = window as any;
      
      if (!chatbaseWindow.chatbase || chatbaseWindow.chatbase("getState") !== "initialized") {
        chatbaseWindow.chatbase = (...args: any[]) => {
          if (!chatbaseWindow.chatbase.q) chatbaseWindow.chatbase.q = [];
          chatbaseWindow.chatbase.q.push(args);
        };
        
        chatbaseWindow.chatbase = new Proxy(chatbaseWindow.chatbase, {
          get(target: any, prop) {
            if (prop === "q") return target.q;
            return (...args: any[]) => target(prop, ...args);
          },
        });
      }

      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "chatbase-script";
        script.setAttribute("chatbotId", "xtJ6x7i1xBQTL51xEDhf-");
        script.setAttribute("domain", "www.chatbase.co");
        document.body.appendChild(script);
      };

      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad);
    })();
  }, []);

  return null;
}