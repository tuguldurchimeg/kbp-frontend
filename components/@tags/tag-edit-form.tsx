"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TagItem, TagUpdateParams } from "@/types/document";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { TAG_COLORS } from "@/constants/color.constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tag } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  color: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function TagEditForm({
  tagItem,
  open,
  setOpen,
  onUpdate,
}: {
  tagItem: TagItem;
  onUpdate: (item: TagUpdateParams) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const t = useTranslations("SYSCOMMON");
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: tagItem.attributes.name,
      description: tagItem.attributes.description || "",
      color: tagItem.attributes.color,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const submitHandler = async (values: FormValues) => {
    try {
      await onUpdate({
        id: tagItem.id,
        params: {
          ...values,
          workspace_id: tagItem.attributes.workspace_id || "",
        },
      });
      setOpen(false);
    } catch (err) {
      console.error("Failed to update tag:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <Tag className="size-4" />
            {t("edit")}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("description")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("color")}</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {TAG_COLORS.map((color) => (
                      <Button
                        type="button"
                        key={color}
                        onClick={() => field.onChange(color)}
                        className={`p-0 w-6 h-6 rounded-md transition-all ${
                          field.value === color
                            ? "ring-2 ring-offset-2 ring-black"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t("loading") : t("update")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
