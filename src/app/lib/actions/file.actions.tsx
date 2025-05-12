import api from "../../../../utils/api";
import { URI } from "@/constants/uri.constants";
import {
  FileCreateParams,
  FileItem,
  ListParams,
  PresignedUrlRequest,
  PresignedUrlResponse,
} from "@/types/document";

export async function getFiles(params: ListParams): Promise<FileItem[]> {
  const res = await api.get(URI.FILES, { params });
  return res.data.data;
}

export const createFile = async (
  params: FileCreateParams
): Promise<FileItem> => {
  const res = await api.post(URI.FILES, params);
  return res.data.data;
};

export async function deleteFile(id: string): Promise<void> {
  await api.delete(`${URI.FILES}/${id}`);
}

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
