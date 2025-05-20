"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MyTextEditor } from "@/components/tiptap-editor/text-editor";
import { DocumentItem } from "@/types/document";
import { getDocument } from "@/src/app/lib/actions/document.actions";

export default function DocumentPage() {
  const params = useParams();
  const id = params?.docId as string;

  const [document, setDocument] = useState<DocumentItem | null>(null);
  const fetchDocument = useCallback(async () => {
    try {
      const doc = await getDocument(id);
      setDocument(doc);
    } catch (error) {
      console.error("Failed to fetch document:", error);
    }
  }, [id]);
  useEffect(() => {
    if (id) fetchDocument();
  }, [fetchDocument, id]);

  return (
    <div className="w-full max-w-3xl">
      {document && (
        <MyTextEditor document={document} fetchDoc={fetchDocument} />
      )}
    </div>
  );
}
