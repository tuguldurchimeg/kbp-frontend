"use client";

import { getCategories } from "@/src/app/lib/actions/category.actions";
import { ROUTE } from "./route.constants";
import {
  User,
  FilePlus2,
  Tag,
  BookOpen,
  Dot,
  Folder,
  FileQuestion,
  LucideIcon,
} from "lucide-react";
import { CategoryItem } from "@/types/document";
import { useTranslations } from "next-intl";

export type MenuItemChildren = {
  id?: string;
  label: string;
  uri?: string;
  icon?: LucideIcon;
  iconClass?: string;
  children?: MenuItemChildren[];
  collapsible?: boolean;
  isCollapsed?: boolean;
};

export type MenuSection = {
  label: string;
  children: MenuItemChildren[];
};

// // Map label keys to icon colors
// const iconColorMap: Record<string, string> = {
//   user_access: "text-blue-600",
//   templates: "text-purple-600",
//   tags: "text-yellow-600",
//   glossary: "text-green-600",
//   issues: "text-red-600",
//   documents: "text-indigo-600",
// };

// This function is now dynamic so should be called inside a React component
export function useSidebarMenus(workspaceId: string) {
  const t = useTranslations("MENUS");

  const staticMenus: MenuSection[] = [
    {
      label: t("tools"),
      children: [
        {
          label: t("user_access"),
          uri: ROUTE.TOOLS.USER_ACCESS.ROOT(workspaceId),
          icon: User,
        },
        {
          label: t("templates"),
          uri: ROUTE.TOOLS.TEMPLATES.ROOT(workspaceId),
          icon: FilePlus2,
        },
        {
          label: t("tags"),
          uri: ROUTE.TOOLS.TAGS.ROOT(workspaceId),
          icon: Tag,
        },
        {
          label: t("glossary"),
          uri: ROUTE.TOOLS.GLOSSARY.ROOT(workspaceId),
          icon: BookOpen,
        },
      ],
    },
  ];

  const dynamicMenu: MenuSection = {
    label: t("knowledge_base"),
    children: [
      {
        label: t("issues"),
        uri: ROUTE.BASE.ISSUES.ROOT(workspaceId),
        icon: FileQuestion,
      },
      {
        label: t("documents"),
        icon: Folder,
        collapsible: true,
        isCollapsed: true,
      },
    ],
  };

  return { staticMenus, dynamicMenu };
}

// Recursive category → menu transformation
const buildCategoryTree = (
  categories: CategoryItem[],
  workspaceId: string,
  depth = 0,
  maxDepth = 2
): MenuItemChildren[] => {
  if (depth > maxDepth) return [];

  return categories.map((category) => {
    const subcategories =
      category.attributes?.subcategories?.data && depth < maxDepth
        ? buildCategoryTree(
            category.attributes.subcategories.data,
            workspaceId,
            depth + 1,
            maxDepth
          )
        : [];

    const documents =
      category.attributes?.documents?.data.map((doc) => ({
        label: doc.attributes.title,
        uri: ROUTE.BASE.DOCUMENT.DETAIL(workspaceId, doc.id),
        icon: Dot,
      })) || [];

    return {
      id: category.id,
      label: category.attributes?.name,
      collapsible: true,
      isCollapsed: false,
      children: [...subcategories, ...documents],
    };
  });
};

// Fetch and build document-related menu items (used by AppSidebar)
export const generateDocumentMenus = async (
  workspaceId: string
): Promise<MenuItemChildren[]> => {
  const categories = await getCategories(workspaceId);
  return buildCategoryTree(categories, workspaceId);
};
