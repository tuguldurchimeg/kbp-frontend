"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Loader2, User } from "lucide-react";
import { EmployeeCreateParams } from "@/types/user";

const schema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  email: z.string().email("Invalid email"),
});

type FormValues = z.infer<typeof schema>;

export default function EmployeeAddForm({
  open,
  setOpen,
  onCreate,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  onCreate: (params: EmployeeCreateParams) => Promise<void>;
}) {
  const t = useTranslations();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const submitHandler = async (values: FormValues) => {
    try {
      await onCreate(values);
      reset();
      setOpen(false);
    } catch (err) {
      console.error("Failed to create employee:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <User className="size-4" />
            {t("SYSCOMMON.add")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t("SYSCOMMON.default_password_note")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Main.table.firstname")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("Main.table.firstname")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Main.table.lastname")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("Main.table.lastname")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Main.table.email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("Main.table.email")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("SYSCOMMON.add")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
