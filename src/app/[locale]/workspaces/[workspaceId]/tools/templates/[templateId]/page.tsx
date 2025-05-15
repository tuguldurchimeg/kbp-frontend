"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MyTextEditor } from "@/components/tiptap-editor/simple/text-editor";
import { DocumentItem } from "@/types/document";
import { getDocument } from "@/src/app/lib/actions/document.actions";

export default function Page() {
  const params = useParams();
  const id = params?.templateId as string;

  const [document, setDocument] = useState<DocumentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchDocument = async () => {
    try {
      if (!id) return;
      const doc = await getDocument(id);
      setDocument(doc);
    } catch (err) {
      console.error("Failed to fetch document:", err);
      setDocument(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDocument();
  }, [id]);

  if (loading) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  if (!document) {
    return <div className="text-destructive">Document not found.</div>;
  }

  return (
    <div className="w-full max-w-3xl">
      <MyTextEditor document={document} fetchDoc={fetchDocument} />
    </div>
  );
}
