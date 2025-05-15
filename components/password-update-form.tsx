"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePassword } from "@/src/app/lib/actions/user.actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, MailWarning } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { UserItem } from "@/types/user";
import { toast } from "sonner";
import { ROUTE } from "@/constants/route.constants";
import { useRouter } from "next/navigation";

// Optional: Your password update API call
// import { updatePassword } from "@/lib/actions/user.actions";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordUpdateFormProps {
  currentUser: UserItem;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PasswordUpdateForm({ currentUser }: PasswordUpdateFormProps) {
  const t = useTranslations("Account");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      await updatePassword({
        current_password: data.currentPassword,
        new_password: data.newPassword,
        confirm_new_password: data.confirmPassword,
      });
      toast.success(t("security.updateSuccess"));
      form.reset();
    } catch (error) {
      console.error("Failed to update password", error);
      toast.error(t("security.updateError"));
    }
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>{t("security.title")}</CardTitle>
          <CardDescription>{t("security.description")}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.currentPassword")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showCurrent ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-0"
                      onClick={() => setShowCurrent((prev) => !prev)}
                    >
                      {showCurrent ? (
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.newPassword")}</FormLabel>
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.confirmPassword")}</FormLabel>
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
        </CardContent>

        <CardFooter className="justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push(ROUTE.RESET_PASS)}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MailWarning className="h-4 w-4" />
            {t("security.forgot")}
          </Button>
          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              t("actions.updatePassword")
            )}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
