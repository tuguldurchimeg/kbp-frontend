"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2, MoveRight } from "lucide-react";
import { useState } from "react";
import { signupService } from "@/src/app/lib/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/route.constants";

const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[\x21-\x7E]{8,}$/;
const signUpSchema = z
  .object({
    firstname: z.string().min(1, { message: "Firstname is required" }),
    lastname: z.string().min(1, { message: "Lastname is required" }),
    email: z.string().email({ message: "Invalid email" }),
    company: z.string().min(1, { message: "Company is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message: "Password must include at least one letter and one number",
      }),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ["password_confirm"],
    message: "Passwords do not match",
  });
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const t = useTranslations("SignUp");
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      company: "",
      password: "",
      password_confirm: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await signupService(values);
      toast.success(t("signup_success"));
      form.reset();
    } catch {
      toast.error(t("signup_failed"));
    }
  };
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[600px] py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("fields.firstname")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("placeholders.name")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("fields.lastname")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("placeholders.lastname")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("fields.email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("placeholders.email")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("fields.company")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("placeholders.company")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("newPassword")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNew ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-0"
                          onClick={() => setShowNew((prev) => !prev)}
                        >
                          {showNew ? (
                            <Eye className="size-4" />
                          ) : (
                            <EyeOff className="size-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("confirmPassword")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-0"
                          onClick={() => setShowConfirm((prev) => !prev)}
                        >
                          {showConfirm ? (
                            <Eye className="size-4" />
                          ) : (
                            <EyeOff className="size-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!form.formState.isValid || form.formState.isLoading}
                >
                  {form.formState.isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    t("title")
                  )}
                </Button>
              </div>
            </form>
            {form.formState.isSubmitSuccessful && (
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(ROUTE.LOGIN)}
                className="w-full mt-2"
              >
                {t("goToLogin")}
                <MoveRight />
              </Button>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
