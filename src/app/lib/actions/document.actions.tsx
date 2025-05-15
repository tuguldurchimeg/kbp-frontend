import api from "../../../../utils/api";
import { URI } from "@/constants/uri.constants";
import {
  DocumentCreateParams,
  DocumentFileSetParams,
  DocumentItem,
  DocumentTagSetParams,
  ListParams,
} from "@/types/document";

export async function getDocuments(
  params: ListParams
): Promise<DocumentItem[]> {
  const res = await api.get(URI.DOCUMENTS, { params });
  return res.data.data;
}

export async function getDocument(id: string): Promise<DocumentItem> {
  const res = await api.get(`${URI.DOCUMENTS}/${id}`);
  return res.data.data;
}

export const createDocument = async (
  params: DocumentCreateParams
): Promise<DocumentItem> => {
  const res = await api.post(URI.DOCUMENTS, params);
  return res.data.data;
};

export const updateDocument = async (
  id: string,
  params: Partial<DocumentCreateParams>
): Promise<DocumentItem> => {
  const res = await api.put(`${URI.DOCUMENTS}/${id}`, params);
  return res.data;
};

export async function deleteDocument(id: string): Promise<void> {
  await api.delete(`${URI.DOCUMENTS}/${id}`);
}

export const getQuickAccessDocuments = async (): Promise<DocumentItem[]> => {
  const res = await api.get(`${URI.DOCUMENTS}/quick_access`);
  return res.data?.data;
};

export const getTemplateDocuments = async (
  params: ListParams
): Promise<DocumentItem[]> => {
  const res = await api.get(`${URI.DOCUMENTS}?is_template=true`, {
    params,
  });
  return res.data.data;
};

export const setDocumentTag = async (
  params: DocumentTagSetParams
): Promise<DocumentItem> => {
  const res = await api.post(`${URI.DOCUMENTS}/set_document_tag`, params);
  return res.data.data;
};

export const delDocumentTag = async (
  params: DocumentTagSetParams
): Promise<DocumentItem> => {
  const res = await api.delete(`${URI.DOCUMENTS}/del_document_tag`, {
    params,
  });
  return res.data.data;
};

export const setDocumentFile = async (
  params: DocumentFileSetParams
): Promise<DocumentItem> => {
  const res = await api.post(`${URI.DOCUMENTS}/set_document_file`, params);
  return res.data.data;
};

export const delDocumentFile = async (
  params: DocumentFileSetParams
): Promise<DocumentItem> => {
  const res = await api.delete(`${URI.DOCUMENTS}/del_document_file`, {
    params,
  });
  return res.data.data;
};
