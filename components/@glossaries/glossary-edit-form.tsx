"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GlossaryItem, GlossaryUpdateParams } from "@/types/document";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  content: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function GlossaryEditForm({
  glossaryItem,
  open,
  setOpen,
  t,
  onEdit,
}: {
  glossaryItem: GlossaryItem;
  open: boolean;
  setOpen: (value: boolean) => void;
  t: ReturnType<typeof useTranslations>;
  onEdit: (item: GlossaryUpdateParams) => void | Promise<void>;
}) {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: glossaryItem.attributes.name,
      content: glossaryItem.attributes.content,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await onEdit({
        id: glossaryItem.id,
        params: {
          ...values,
          content: values.content || "",
          workspace_id: params.workspaceId as string,
        },
      });
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <BookOpen className="size-4" />
            {t("SYSCOMMON.edit")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("SYSCOMMON.name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("SYSCOMMON.name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("SYSCOMMON.content")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("SYSCOMMON.content")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? t("SYSCOMMON.loading") : t("SYSCOMMON.update")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
