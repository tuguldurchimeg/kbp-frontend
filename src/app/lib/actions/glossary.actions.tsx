import api from "../../../../utils/api";
import { URI } from "@/constants/uri.constants";
import {
  GlossaryCreateParams,
  GlossaryItem,
  GlossaryUpdateParams,
  ListParams,
} from "@/types/document";

export const getGlossaries = async (
  params: ListParams
): Promise<GlossaryItem[]> => {
  const res = await api.get(URI.GLOSSARIES, { params });
  return res.data.data;
};

export const createGlossary = async (
  params: GlossaryCreateParams
): Promise<GlossaryItem> => {
  const res = await api.post(URI.GLOSSARIES, params);
  return res.data.data;
};

export const updateGlossary = async (
  arg: Partial<GlossaryUpdateParams>
): Promise<GlossaryItem> => {
  const res = await api.put(`${URI.GLOSSARIES}/${arg.id}`, arg.params);
  return res.data.data;
};

export const deleteGlossary = async (id: string): Promise<void> => {
  await api.delete(`${URI.GLOSSARIES}/${id}`);
};
