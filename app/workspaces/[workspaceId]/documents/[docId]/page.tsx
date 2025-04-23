"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SimpleEditor } from "@/components/tiptap-editor/simple/simple-editor";
import { DocumentItem } from "@/types/document";
import content from "@/components/tiptap-editor/simple/data/content.json";
import { CURRENT_USER } from "@/constants/kb-placeholder-data";

export default function DocumentPage() {
  const params = useParams();
  const id = params?.docId as string;

  const [document, setDocument] = useState<DocumentItem | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      // Replace this with real API call later
      const mockDatabase: DocumentItem[] = [
        {
          id: "1",
          title: "Sample Doc",
          content: content,
          tags: [
            { id: "1", name: "intro", description: "" },
            { id: "2", name: "tip", description: "" },
          ],
          created_at: "2025-01-01T08:00:00Z",
          updated_at: "2025-02-21T10:00:00Z",
          user: CURRENT_USER,
        },
      ];

      const found = mockDatabase.find((doc) => doc.id === id);
      setDocument(found || null);
    };

    if (id) fetchDocument();
  }, [id]);

  return (
    <div className="w-full max-w-3xl">
      {document && <SimpleEditor document={document} />}
    </div>
  );
}
