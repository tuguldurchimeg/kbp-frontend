"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { getDocuments } from "@/src/app/lib/actions/document.actions";
import { DocumentItem, DocumentCreateParams } from "@/types/document";
import { toast } from "sonner";
import { createDocument } from "@/src/app/lib/actions/document.actions";
import { Loader2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAttach: (documentId: string) => void;
  workspaceId: string;
};

export default function DocumentAttachDialog({
  isOpen,
  onClose,
  onAttach,
  workspaceId,
}: Props) {
  const t = useTranslations("ISSUE");
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [creating, setCreating] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");

  const fetchDocuments = async () => {
    try {
      const res = await getDocuments({ workspace_id: workspaceId });
      setDocuments(res);
    } catch {
      toast.error("Failed to fetch documents");
    }
  };

  const handleAttach = () => {
    if (selectedId) {
      onAttach(selectedId);
      setSelectedId("");
      onClose();
    } else {
      toast.error("Please select a document");
    }
  };

  const handleCreateAndAttach = async () => {
    if (!newDocTitle.trim()) return toast.error("Please enter title");

    setCreating(true);
    try {
      const params: DocumentCreateParams = {
        title: newDocTitle,
        workspace_id: workspaceId,
      };
      const newDoc = await createDocument(params);
      toast.success("Document created");
      onAttach(newDoc.id);
      setNewDocTitle("");
      onClose();
    } catch {
      toast.error("Failed to create document");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchDocuments();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("connect_document")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">
              {t("select_document")}
            </label>
            <Select onValueChange={(val) => setSelectedId(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("select_document")} />
              </SelectTrigger>
              <SelectContent>
                {documents.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    {doc.attributes.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleAttach}
              className="mt-2 w-full"
              disabled={!selectedId}
            >
              {t("attach")}
            </Button>
          </div>

          <div className="border-t pt-4 space-y-2">
            <label className="text-sm font-medium block mb-1">
              {t("or_create_new")}
            </label>
            <Input
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              placeholder={t("enter_title")}
            />
            <Button
              onClick={handleCreateAndAttach}
              className="w-full"
              disabled={!newDocTitle || creating}
            >
              {creating ? (
                <Loader2 className="animate-spin" />
              ) : (
                t("create_and_attach")
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
