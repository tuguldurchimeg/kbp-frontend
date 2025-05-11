import api from "../../../../utils/api";
import { URI } from "@/constants/uri.constants";
import {
  DocumentCreateParams,
  DocumentItem,
  PresignedUrlRequest,
  PresignedUrlResponse,
} from "@/types/document";

export async function getDocuments(): Promise<DocumentItem[]> {
  const res = await api.get(URI.DOCUMENTS);
  return res.data;
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

export const getTemplateDocuments = async (): Promise<DocumentItem[]> => {
  const res = await api.get(`${URI.DOCUMENTS}?is_template=true`);
  return res.data.data;
};

export const createDocumentFromTemplate = async (
  templateId: string,
  overrides?: Partial<DocumentCreateParams>
): Promise<DocumentItem> => {
  const template = await getDocument(templateId);

  const payload: DocumentCreateParams = {
    title: overrides?.title || `${template.attributes.title} (Copy)`,
    content: template.attributes.content,
    workspace_id: template.attributes.workspace_id,
    ...overrides,
  };

  const res = await api.post(URI.DOCUMENTS, payload);
  return res.data.data;
};

/**
 * Gets a presigned S3 upload URL from the backend.
 */
export async function getPresignedUploadUrl(
  params: PresignedUrlRequest
): Promise<PresignedUrlResponse> {
  const res = await api.post(URI.S3_PRESIGNED_URL, params);
  return res.data;
}

/**
 * Uploads a file to S3 using the provided presigned URL.
 */
export async function uploadFileToS3(
  file: File,
  uploadUrl: string
): Promise<void> {
  console.log("heretest ", uploadUrl);
  await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
}
