"use client";

import { Lock, KeyRound, CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ROUTE } from "@/constants/route.constants";
import EmailStep from "@/components/reset-password/email-step";
import OtpStep from "@/components/reset-password/otp-step";
import PasswordStep from "@/components/reset-password/password-step";
import SuccessStep from "@/components/reset-password/success-step";
import React from "react";
import {
  confirmCode,
  forgotPassword,
  resetPassword,
} from "../../lib/actions/user.actions";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function ResetPasswordPage() {
  const t = useTranslations("ResetPassword");
  const { user, isAuthenticated } = useAuth();
  const currentUserEmail = user?.email || "";
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState(currentUserEmail);
  const [isSubmitted, setSubmitted] = useState(false);

  const steps = [KeyRound, ShieldCheck, Lock, CheckCircle2];
  const titles = [
    t("steps.1.title"),
    t("steps.2.title"),
    t("steps.3.title"),
    t("steps.4.title"),
  ];
  const descriptions = [
    t("steps.1.desc"),
    t("steps.2.desc"),
    t("steps.3.desc"),
    t("steps.4.desc"),
  ];

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));

  const handleForgot = async (email: string): Promise<void> => {
    try {
      await forgotPassword(email);
      toast.success(t("codeSent"));
      setEmail(email);
      goNext();
    } catch {
      toast.error(t("notRegistered"));
    }
  };

  const handleConfirmCode = async (code: string): Promise<void> => {
    try {
      await confirmCode({ email, confirm_code: code });
      toast.success(t("codeVerified"));
      goNext();
    } catch {
      toast.error(t("invalidCode"));
    }
  };

  const handleReset = async (
    newPassword: string,
    confirmPassword: string
  ): Promise<void> => {
    try {
      await resetPassword({
        email,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      toast.success(t("passwordReset"));
      setSubmitted(true);
      goNext();
    } catch {
      toast.error(t("resetFailed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {React.createElement(steps[step], { className: "size-5" })}
          </div>
          <CardTitle>{titles[step]}</CardTitle>
          <CardDescription>{descriptions[step]}</CardDescription>
          <div className="flex justify-center gap-4 my-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-primary w-12" : "bg-muted w-12"
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 0 && (
            <EmailStep onNext={handleForgot} initialEmail={email} />
          )}
          {step === 1 && <OtpStep onNext={handleConfirmCode} />}
          {step === 2 && <PasswordStep onNext={handleReset} />}
          {step === 3 && isSubmitted && <SuccessStep />}
        </CardContent>

        {step !== 3 && !isAuthenticated && (
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <span>
              {t("signin.label")}{" "}
              <Link
                href={ROUTE.LOGIN}
                className="text-primary font-medium underline"
              >
                {t("signin.link")}
              </Link>
            </span>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
