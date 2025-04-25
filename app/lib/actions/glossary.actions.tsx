import api from "@/app/lib/api";
import { URI } from "@/constants/uri.constants";
import { GlossaryCreateParams, GlossaryItem } from "@/types/document";

export const getGlossaries = async (): Promise<GlossaryItem[]> => {
  const res = await api.get(URI.GLOSSARIES);
  return res.data;
};

export const createGlossary = async (
  params: GlossaryCreateParams
): Promise<GlossaryItem> => {
  const res = await api.post(URI.GLOSSARIES, params);
  return res.data;
};

export const updateGlossary = async (
  id: string,
  params: Partial<GlossaryCreateParams>
): Promise<GlossaryItem> => {
  const res = await api.put(`${URI.GLOSSARIES}/${id}`, params);
  return res.data;
};

export const deleteGlossary = async (id: string): Promise<void> => {
  await api.delete(`${URI.GLOSSARIES}/${id}`);
};
