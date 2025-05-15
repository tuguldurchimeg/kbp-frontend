"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { getTemplateDocuments } from "@/src/app/lib/actions/document.actions";
import { useParams } from "next/navigation";
import { DocumentItem } from "@/types/document";
import { JSONContent } from "@tiptap/react";
import { Loader2 } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  templateId: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function NewDocumentDialog({
  open,
  onOpenChange,
  categoryId,
  onDocumentCreate,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  categoryId: string;
  onDocumentCreate: (
    title: string,
    category_id: string,
    content?: JSONContent
  ) => void;
}) {
  const t = useTranslations("NewDocumentDialog");
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const [templates, setTemplates] = useState<DocumentItem[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      templateId: undefined,
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (open) {
      getTemplateDocuments({ workspace_id: workspaceId })
        .then(setTemplates)
        .catch(console.error);
    } else {
      reset();
    }
  }, [open]);

  const onSubmit = async (values: FormValues) => {
    try {
      const selectedTemplate = templates.find(
        (t) => t.id === values.templateId
      );
      onDocumentCreate(
        values.title,
        categoryId,
        selectedTemplate?.attributes.content
      );
    } catch (err) {
      console.error("Failed to create document", err);
    } finally {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("field_title")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("field_title_placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("field_template")}</FormLabel>
                  <Select
                    value={field.value ?? "blank"}
                    onValueChange={(value) =>
                      field.onChange(value === "blank" ? null : value)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("template_placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="blank">{t("blank_option")}</SelectItem>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.attributes.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                  onOpenChange(false);
                }}
                disabled={form.formState.isLoading}
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isLoading || !form.formState.isDirty}
              >
                {form.formState.isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("create")
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
