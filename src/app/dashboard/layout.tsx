"use client";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../components/ui/Loading";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // ❌ لو مش لوج إن → يرجع عالـ login
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}
