"use client";

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
  Paperclip,
} from "lucide-react";
import { CategoryItem } from "@/types/document";
import { useTranslations } from "next-intl";
import { WorkspaceItem } from "@/types/workspace";
import { useWorkspaceStore } from "@/src/stores/workspace.store";

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

export function useSidebarMenus(workspaceId: string) {
  const t = useTranslations("MENUS");
  const { role } = useWorkspaceStore();

  const staticMenus: MenuSection[] = [
    {
      label: t("tools"),
      children: [
        ...(role === "admin"
          ? [
              {
                label: t("user_access"),
                uri: ROUTE.TOOLS.USER_ACCESS.ROOT(workspaceId),
                icon: User,
              },
            ]
          : []),
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
        label: t("files"),
        uri: ROUTE.BASE.FILES(workspaceId),
        icon: Paperclip,
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

const buildCategoryTree = (
  categories: CategoryItem[],
  workspaceId: string
): MenuItemChildren[] => {
  return categories?.map((category) => {
    const subcategories = category.attributes?.subcategories?.data
      ? buildCategoryTree(category.attributes.subcategories?.data, workspaceId)
      : [];

    const documents =
      category.attributes?.documents?.data.map((doc) => ({
        label: doc.attributes.title,
        uri: ROUTE.BASE.DOCUMENT.DETAIL(workspaceId, doc.id),
        icon: Dot,
        id: doc.id,
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

export const generateDocumentMenus = async (
  workspace: WorkspaceItem
): Promise<MenuItemChildren[]> => {
  const uncategorizedDocuments =
    workspace.attributes?.documents?.data?.map((doc) => ({
      label: doc.attributes.title,
      uri: ROUTE.BASE.DOCUMENT.DETAIL(workspace.id, doc.id),
      icon: Dot,
      id: doc.id,
    })) || [];

  // Categorized documents
  const categorizedTree = buildCategoryTree(
    workspace.attributes.categories?.data || [],
    workspace.id
  );

  return [...categorizedTree, ...uncategorizedDocuments];
};
