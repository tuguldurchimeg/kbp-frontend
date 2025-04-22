import api from "@/services/api";
import { URI } from "@/constants/uri.constants";
import { DocumentCreateParams, DocumentItem } from "@/types/document";

export async function getDocuments(): Promise<DocumentItem[]> {
  const res = await api.get(URI.DOCUMENTS);
  return res.data;
}

export async function getDocument(id: string): Promise<DocumentItem> {
  const res = await api.get(`${URI.DOCUMENTS}/${id}`);
  return res.data;
}

export async function createDocument(
  params: DocumentCreateParams
): Promise<DocumentItem> {
  const res = await api.post(URI.DOCUMENTS, params);
  return res.data;
}

export async function updateDocument(
  id: string,
  params: DocumentCreateParams
): Promise<DocumentItem> {
  const res = await api.put(`${URI.DOCUMENTS}/${id}`, params);
  return res.data;
}

export async function deleteDocument(id: string): Promise<void> {
  await api.delete(`${URI.DOCUMENTS}/${id}`);
}
