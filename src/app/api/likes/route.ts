import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

type LikePayload = {
  slug: string;
};

export async function POST(req: Request) {
  try {
    const { slug } = (await req.json()) as LikePayload;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "No slug provided" },
        { status: 400 }
      );
    }

    // جلب IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (ip === "unknown") {
      return NextResponse.json(
        { success: false, error: "No IP found" },
        { status: 400 }
      );
    }

    const likeDocRef = doc(db, "likes", `${slug}_${ip}`);
    const likeSnap = await getDoc(likeDocRef);

    let liked = false;

    if (!likeSnap.exists()) {
      // أول مرة يعمل لايك
      await setDoc(likeDocRef, {
        slug,
        ip,
        liked: true,
        createdAt: Date.now(),
      });

      // زود counter للبوست
      const projectRef = doc(db, "projects", slug);
      const projectSnap = await getDoc(projectRef);

      if (projectSnap.exists()) {
        await updateDoc(projectRef, { likes: increment(1) });
      } else {
        await setDoc(projectRef, { likes: 1 });
      }

      liked = true;
    } else {
      // لو موجود يبقى هو عامل لايك قبل كدا
      liked = true;
    }

    // رجع عدد اللايكات
    const projectRef = doc(db, "projects", slug);
    const projectSnap = await getDoc(projectRef);
    const count = projectSnap.exists() ? projectSnap.data().likes || 0 : 0;

    return NextResponse.json({ success: true, liked, count });
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json(
      { success: false, error: "Failed to handle like" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "No slug provided" },
        { status: 400 }
      );
    }

    // جلب IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const projectRef = doc(db, "projects", slug);
    const projectSnap = await getDoc(projectRef);
    const count = projectSnap.exists() ? projectSnap.data().likes || 0 : 0;

    let liked = false;
    if (ip !== "unknown") {
      const likeRef = doc(db, "likes", `${slug}_${ip}`);
      const likeSnap = await getDoc(likeRef);
      liked = likeSnap.exists() && likeSnap.data().liked === true;
    }

    return NextResponse.json({ success: true, count, liked });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get likes" },
      { status: 500 }
    );
  }
}
