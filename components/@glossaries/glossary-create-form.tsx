"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, BookOpen, Loader } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { GlossaryCreateParams } from "@/types/document";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  content: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;
interface Props {
  onSubmit: (data: GlossaryCreateParams) => void;
  loading: boolean;
}

export default function TagCreateForm({ onSubmit, loading }: Props) {
  const t = useTranslations("SYSCOMMON");
  const [open, setOpen] = useState(false);
  const params = useParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      content: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      await onSubmit({
        ...values,
        content: values.content || "",
        workspace_id: params.workspaceId as string,
      });
      form.reset();
      setOpen(false);
    } finally {
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-15 right-15 h-12 w-12 rounded-xl hover:bg-purple-700 shadow-lg">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {t("create")}
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("content")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("content")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : t("create")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
