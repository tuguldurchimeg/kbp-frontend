"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PasswordStep from "@/components/reset-password/password-step";
import { resetPassword } from "@/src/app/lib/actions/user.actions";
import { toast } from "sonner";
import { ROUTE } from "@/constants/route.constants";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ForcePasswordResetPage() {
  const { user, logout, refresh } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (!user?.password_change_required) {
      router.replace(ROUTE.ROOT);
    }
  }, [user, router]);

  const handleReset = async (newPassword: string, confirmPassword: string) => {
    try {
      await resetPassword({
        email: user!.email,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      await refresh();
      toast.success(t("ResetPassword.passwordReset"));
      router.push(ROUTE.ROOT);
    } catch {
      toast.error(t("ResetPassword.resetFailed"));
    }
  };

  return (
    <div className="bg-gradient-to-br from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Card className="overflow-hidden px-4 py-8">
        <CardContent className="space-y-4">
          <div>
            <CardTitle className="text-xl font-bold">
              {t("LOGIN.reset_password_title")}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              {t("LOGIN.password_change_required")}
            </CardDescription>
          </div>
          <PasswordStep onNext={handleReset} />
          <Button
            onClick={logout}
            variant={"ghost"}
            className="text-sm text-center text-muted-foreground w-full hover:underline"
          >
            {t("SYSCOMMON.logout")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
