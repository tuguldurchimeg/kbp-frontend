"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getTemplateDocuments,
  createDocumentFromTemplate,
  createDocument,
} from "@/src/app/lib/actions/document.actions";
import { useParams, useRouter } from "next/navigation";
import { DocumentItem } from "@/types/document";
import { ROUTE } from "@/constants/route.constants";
import { useTranslations } from "next-intl";

export default function NewDocumentDialog({
  open,
  onOpenChange,
  categoryId,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  categoryId: string;
}) {
  const t = useTranslations("NewDocumentDialog");

  const [title, setTitle] = useState("");
  const [templates, setTemplates] = useState<DocumentItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;

  useEffect(() => {
    if (open) {
      getTemplateDocuments({ workspace_id: workspaceId })
        .then(setTemplates)
        .catch(console.error);
    } else {
      setTitle("");
      setSelectedTemplate(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = selectedTemplate
        ? await createDocumentFromTemplate(selectedTemplate, {
            title,
            category_id: categoryId,
            workspace_id: workspaceId,
          })
        : await createDocument({
            title,
            category_id: categoryId,
            workspace_id: workspaceId,
          });

      onOpenChange(false);
      router.push(ROUTE.BASE.DOCUMENT.DETAIL(workspaceId, res.id));
    } catch (err) {
      console.error("Failed to create document", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">{t("field_title")}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("field_title_placeholder")}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="template" className="mb-1">
              {t("field_template")}
            </Label>
            <Select
              value={selectedTemplate || "blank"}
              onValueChange={(value) =>
                setSelectedTemplate(value === "blank" ? null : value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("template_placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blank">{t("blank_option")}</SelectItem>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.attributes.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t("creating") : t("create")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
