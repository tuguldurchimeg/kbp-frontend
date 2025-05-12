"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WorkspaceItem } from "@/types/workspace";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Pencil } from "lucide-react";
import {
  getPresignedUploadUrl,
  uploadFileToS3,
} from "@/src/app/lib/actions/file.actions";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(1, "Workspace name is required"),
  description: z.string().optional(),
  image_url: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;
interface Props {
  workspace: WorkspaceItem;
  onSubmit: (values: FormValues) => void;
}

export default function WorkspaceEditForm({ workspace, onSubmit }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: workspace.attributes.name || "",
      description: workspace.attributes.description || "",
      image_url: workspace.attributes.image_url || "",
    },
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("SYSCOMMON");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    workspace.attributes.image_url || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const { url, file_url } = await getPresignedUploadUrl({
        file_name: file.name,
        mime_type: file.type,
        content_type: "workspace",
        workspace_id: workspace.id,
      });

      await uploadFileToS3(file, url);
      form.setValue("image_url", file_url);
      setPreview(URL.createObjectURL(file));
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await onSubmit(values);
      setOpen(false);
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          className="ml-5"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Pencil className="size-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="size-5 text-primary " />
            {t("editWorkspace")}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            <FormItem>
              <FormControl>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 p-0 relative border border-dashed border-gray-300"
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {t("upload_click")}
                    </span>
                  )}
                </Button>
              </FormControl>

              <FormMessage />

              {uploading && (
                <p className="text-sm text-muted-foreground mt-1">
                  {t("loading")}
                </p>
              )}

              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </FormItem>

            {/* <input type="hidden" {...form.register("image_url")} /> */}
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
                    <Textarea
                      placeholder={t("description")}
                      className="w-full resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit" loading={loading}>
                {t("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
