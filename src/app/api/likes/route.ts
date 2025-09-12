import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

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
      liked = true;
    } else {
      // لو موجود يبقى هو عامل لايك قبل كدا
      liked = likeSnap.data().liked === true;
    }

    // احسب عدد اللايكات من collection likes
    const q = query(collection(db, "likes"), where("slug", "==", slug), where("liked", "==", true));
    const snapshot = await getDocs(q);
    const count = snapshot.size;

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

    // احسب عدد اللايكات
    const q = query(collection(db, "likes"), where("slug", "==", slug), where("liked", "==", true));
    const snapshot = await getDocs(q);
    const count = snapshot.size;

    // شوف هل المستخدم عامل لايك
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
