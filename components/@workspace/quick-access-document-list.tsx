"use client";

import { useEffect, useState } from "react";
import DocumentCard from "@/components/@documents/document-card";
import { getQuickAccessDocuments } from "@/src/app/lib/actions/document.actions";
import { DocumentItem } from "@/types/document";
import { useTranslations } from "next-intl";

export default function QuickAccessDocumentList() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await getQuickAccessDocuments();
        setDocuments(data.slice(0, 8));
      } catch (err) {
        console.error("Failed to fetch quick access documents", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  if (loading) return <p>{t("SYSCOMMON.loading")}</p>;

  if (documents.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">{t("SYSCOMMON.empty")}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
}
