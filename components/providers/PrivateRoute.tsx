"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTE } from "@/constants/route.constants";
import { useTranslations } from "next-intl";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push(ROUTE.HOME);
    } else if (user.password_change_required) {
      router.push(ROUTE.CHANGE_PASS);
    }
  }, [loading, user, router]);

  if (
    loading ||
    (!user && typeof window !== "undefined") ||
    user?.password_change_required
  ) {
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

export default PrivateRoute;
