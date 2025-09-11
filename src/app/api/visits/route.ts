import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

const VISIT_COOLDOWN = 24 * 60 * 60 * 1000; // 24 ساعة بالمللي ثانية

// GET method لجلب عدد الزوار
export async function GET() {
  try {
    const siteRef = doc(db, "analytics", "site_visits");
    const siteSnap = await getDoc(siteRef);

    if (siteSnap.exists()) {
      const count = siteSnap.data().count as number;
      return NextResponse.json({ success: true, count });
    } else {
      return NextResponse.json({ success: true, count: 0 });
    }
  } catch (error) {
    console.error("Error getting visit count:", error);
    return NextResponse.json({ success: false, error: "Failed to get visit count" }, { status: 500 });
  }
}

// POST method لزيادة عدد الزوار
export async function POST(req: Request) {
  try {
    // جلب IP الزائر
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (ip === "unknown") {
      return NextResponse.json({ success: false, error: "No IP found" }, { status: 400 });
    }

    const visitorRef = doc(db, "visitors", ip);
    const visitorSnap = await getDoc(visitorRef);
    const now = Date.now();
    let counted = false;

    if (visitorSnap.exists()) {
      const lastVisit = visitorSnap.data().lastVisit as number;
      if (now - lastVisit > VISIT_COOLDOWN) {
        counted = true;
        await updateDoc(visitorRef, { lastVisit: now });
      }
    } else {
      counted = true;
      await setDoc(visitorRef, { lastVisit: now });
    }

    if (counted) {
      const siteRef = doc(db, "analytics", "site_visits");
      const siteSnap = await getDoc(siteRef);

      if (siteSnap.exists()) {
        await updateDoc(siteRef, { count: increment(1) });
      } else {
        await setDoc(siteRef, { count: 1 });
      }
    }

    // نرجع العدد الجديد مع الاستجابة
    const siteRef = doc(db, "analytics", "site_visits");
    const finalSnap = await getDoc(siteRef);
    const finalCount = finalSnap.exists() ? finalSnap.data().count : 0;

    return NextResponse.json({ success: true, counted, count: finalCount });
  } catch (error) {
    console.error("Error incrementing visit:", error);
    return NextResponse.json({ success: false, error: "Failed to increment visit" }, { status: 500 });
  }
}