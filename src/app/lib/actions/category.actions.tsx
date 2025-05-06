import api from "../../../../utils/api";
import { URI } from "@/constants/uri.constants";
import { CategoryItem, CategoryCreateParams } from "@/types/document";

export const getCategories = async (
  workspaceId: string
): Promise<CategoryItem[]> => {
  const res = await api.get(URI.CATEGORIES, {
    params: { workspace_id: workspaceId },
  });
  return res.data.data;
};

export const createCategory = async (
  params: CategoryCreateParams
): Promise<CategoryItem> => {
  const res = await api.post(URI.CATEGORIES, params);
  return res.data;
};

export const updateCategory = async (
  id: string,
  params: Partial<CategoryCreateParams>
): Promise<CategoryItem> => {
  const res = await api.put(`${URI.CATEGORIES}/${id}`, params);
  return res.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`${URI.CATEGORIES}/${id}`);
};
