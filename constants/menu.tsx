import { ROUTE } from "./route.constants";
import {
  User,
  FilePlus2,
  Tag,
  SearchCode,
  BookOpen,
  Dot,
  Folder,
  FileQuestion,
  LucideIcon,
} from "lucide-react";
import { KB_CATEGORIES } from "./kb-placeholder-data";
import { CategoryItem } from "@/types/document";

export type MenuItemChildren = {
  label: string;
  uri?: string;
  icon: LucideIcon;
  children?: MenuItemChildren[];
  collapsible?: boolean;
  isCollapsed?: boolean;
};

export type MenuSection = {
  label: string;
  children: MenuItemChildren[];
};

const buildCategoryTree = (
  categories: CategoryItem[],
  workspaceId: string
): MenuItemChildren[] => {
  return categories.map((category) => {
    const subcategories = category.subcategories
      ? buildCategoryTree(category.subcategories, workspaceId)
      : [];

    const documents =
      category.documents?.map((doc) => ({
        label: doc.title,
        uri: ROUTE.BASE.DOCUMENT.DETAIL(workspaceId, doc.id),
        icon: Dot,
      })) || [];

    return {
      label: category.name,
      collapsible: true,
      isCollapsed: false,
      icon: Folder,
      children: [...subcategories, ...documents],
    };
  });
};

export const generateMenus = (workspaceId: string): MenuSection[] => {
  const knowledgeBaseChildren = buildCategoryTree(KB_CATEGORIES, workspaceId);

  return [
    {
      label: "Knowledge base",
      children: [
        {
          label: "Issues",
          uri: ROUTE.BASE.ISSUES.ROOT(workspaceId),
          icon: FileQuestion,
        },
        {
          label: "Documents",
          collapsible: true,
          isCollapsed: true,
          icon: Folder,
          children: knowledgeBaseChildren,
        },
      ],
    },
    {
      label: "Tools",
      children: [
        {
          label: "User access",
          uri: ROUTE.TOOLS.USER_ACCESS.ROOT(workspaceId),
          icon: User,
        },
        {
          label: "Templates",
          uri: ROUTE.TOOLS.TEMPLATES.ROOT(workspaceId),
          icon: FilePlus2,
        },
        {
          label: "Tags",
          uri: ROUTE.TOOLS.TAGS.ROOT(workspaceId),
          icon: Tag,
        },
        {
          label: "Glossary",
          uri: ROUTE.TOOLS.GLOSSARY.ROOT(workspaceId),
          icon: BookOpen,
        },
        {
          label: "SEO",
          uri: ROUTE.TOOLS.SEO.ROOT(workspaceId),
          icon: SearchCode,
        },
      ],
    },
  ];
};
