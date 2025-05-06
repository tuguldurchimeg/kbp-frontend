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
import { useRouter } from "next/navigation";
import { DocumentItem } from "@/types/document";

export default function NewDocumentDialog({
  open,
  onOpenChange,
  categoryId, // Added categoryId prop
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  categoryId: string; // Category ID for the document creation
}) {
  const [title, setTitle] = useState("");
  const [templates, setTemplates] = useState<DocumentItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (open) {
      getTemplateDocuments().then(setTemplates).catch(console.error);
    } else {
      // Reset form when dialog is closed
      setTitle("");
      setSelectedTemplate(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const doc = selectedTemplate
        ? await createDocumentFromTemplate(selectedTemplate, {
            title,
            category_id: categoryId,
          })
        : await createDocument({ title, category_id: categoryId });

      onOpenChange(false); // Close on success
      router.push(`/documents/${doc.id}`);
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
          <DialogTitle>Create New Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="template" className="mb-1">
              Start from Template
            </Label>
            <Select
              value={selectedTemplate || "blank"}
              onValueChange={(value) =>
                setSelectedTemplate(value === "blank" ? null : value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blank">Blank Document</SelectItem>{" "}
                {/* Using "blank" as the value */}
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
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
