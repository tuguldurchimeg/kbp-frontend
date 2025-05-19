"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTE } from "@/constants/route.constants";
import { useTranslations } from "next-intl";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push(ROUTE.ROOT);
    }
  }, [loading, isAuthenticated, router]);

  if (loading || isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {t("SYSCOMMON.loading")}
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default PublicRoute;
