import api from "@/app/lib/api";
import { URI } from "@/constants/uri.constants";
import { TagCreateParams, TagItem } from "@/types/document";

export const getTags = async (): Promise<TagItem[]> => {
  const res = await api.get(URI.TAGS);
  return res.data;
};

export const createTag = async (params: TagCreateParams): Promise<TagItem> => {
  const res = await api.post(URI.TAGS, params);
  return res.data;
};

export const updateTag = async (
  id: string,
  params: Partial<TagCreateParams>
): Promise<TagItem> => {
  const res = await api.put(`${URI.TAGS}/${id}`, params);
  return res.data;
};

export const deleteTag = async (id: string): Promise<void> => {
  await api.delete(`${URI.TAGS}/${id}`);
};
