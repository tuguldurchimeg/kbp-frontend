"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SimpleEditor } from "@/components/tiptap-editor/simple/text-editor";
import { DocumentItem } from "@/types/document";
// import content from "@/components/tiptap-editor/simple/data/content.json";
// import { CURRENT_USER } from "@/constants/kb-placeholder-data";
import { getDocument } from "@/src/app/lib/actions/document.actions";

export default function DocumentPage() {
  const params = useParams();
  const id = params?.docId as string;

  const [document, setDocument] = useState<DocumentItem | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const doc = await getDocument(id);
        setDocument(doc);
      } catch (error) {
        console.error("Failed to fetch document:", error);
      }
    };

    if (id) fetchDocument();
  }, [id]);

  return (
    <div className="w-full max-w-3xl">
      {document && <SimpleEditor document={document} />}
    </div>
  );
}
