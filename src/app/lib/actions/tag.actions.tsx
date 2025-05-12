import api from "../../../../utils/api";
import { URI } from "@/constants/uri.constants";
import {
  ListParams,
  TagCreateParams,
  TagItem,
  TagUpdateParams,
} from "@/types/document";

export const getTags = async (params: ListParams): Promise<TagItem[]> => {
  const res = await api.get(URI.TAGS, { params: params });
  return res.data.data;
};

export const createTag = async (params: TagCreateParams): Promise<TagItem> => {
  const res = await api.post(URI.TAGS, params);
  return res.data.data;
};

export const updateTag = async (arg: TagUpdateParams): Promise<TagItem> => {
  const res = await api.put(`${URI.TAGS}/${arg.id}`, arg.params);
  return res.data.data;
};

export const deleteTag = async (id: string): Promise<void> => {
  await api.delete(`${URI.TAGS}/${id}`);
};
