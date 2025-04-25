// hooks/useDocuments.ts

"use client";

import { useEffect, useState } from "react";
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocument,
} from "@/app/lib/actions/document.actions";
import { DocumentCreateParams, DocumentItem } from "@/types/document";

export default function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [doc, setDoc] = useState<DocumentItem>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocument = async (id: string): Promise<DocumentItem | null> => {
    setLoading(true);
    try {
      const data = await getDocument(id);
      setDoc(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch document", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addDocument = async (
    params: DocumentCreateParams
  ): Promise<DocumentItem> => {
    try {
      const created = await createDocument(params);
      setDocuments((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error("Failed to create document", err);
      throw err;
    }
  };

  const editDocument = async (
    id: string,
    params: DocumentCreateParams
  ): Promise<DocumentItem> => {
    try {
      const updated = await updateDocument(id, params);
      setDocuments((prev) =>
        prev.map((doc) => (doc.id === id ? updated : doc))
      );
      return updated;
    } catch (err) {
      console.error("Failed to update document", err);
      throw err;
    }
  };

  const removeDocument = async (id: string): Promise<void> => {
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error("Failed to delete document", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    doc,
    documents,
    loading,
    fetchDocuments,
    addDocument,
    editDocument,
    removeDocument,
    fetchDocument,
  };
}
