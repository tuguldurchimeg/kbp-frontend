"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTE } from "@/constants/route.constants";
import { useTranslations } from "next-intl";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (!loading && user) {
      router.push(ROUTE.ROOT);
    }
  }, [loading, user, router]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {t("SYSCOMMON.loading")}
        </p>
      </div>
    );

  return !user ? <>{children}</> : null;
};

export default PublicRoute;
