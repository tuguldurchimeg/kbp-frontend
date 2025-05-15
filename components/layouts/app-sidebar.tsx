"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Plus, FolderPlus, FileText, ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";
import CategoryDocuments from "./category-documents-tree";
import { NavHeader } from "./app-sidebar-header";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  useSidebarMenus,
  generateDocumentMenus,
  MenuItemChildren,
} from "@/constants/menu";
import clsx from "clsx";
import { ROUTE } from "@/constants/route.constants";
import NewDocumentDialog from "@/components/@documents/new-document-dialog";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/src/app/lib/actions/category.actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getWorkspace } from "@/src/app/lib/actions/workspace.actions";
import { WorkspaceItem } from "@/types/workspace";
import { createDocument } from "@/src/app/lib/actions/document.actions";
import { JSONContent } from "@tiptap/react";

export function AppSidebar() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const pathname = usePathname();
  const router = useRouter();
  const [workspace, setWorkspace] = useState<WorkspaceItem>();
  const [newDocDialogOpen, setNewDocDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [documentMenus, setDocumentMenus] = useState<MenuItemChildren[]>([]);
  const t = useTranslations("SYSCOMMON");
  const { staticMenus, dynamicMenu } = useSidebarMenus(workspaceId);

  const fetchWorkspace = async () => {
    try {
      const ws = await getWorkspace(workspaceId);
      setWorkspace(ws);
      if (ws) {
        const fetched = await generateDocumentMenus(ws);
        setDocumentMenus(fetched);
      }
    } catch {
      toast.error("Failed to load documents");
    }
  };
  const cleanPath = pathname.replace(/^\/(en|mn)/, "");

  useEffect(() => {
    fetchWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  const handleCategoryRename = async (id: string, name: string) => {
    try {
      await updateCategory({
        id,
        params: { name, workspace_id: workspaceId },
      });
      toast.success(t("updated_successfully"));
      fetchWorkspace();
    } catch {
      toast.success(t("update_failed"));
    }
  };

  const handleCreateDocument = async (
    title: string,
    category_id: string,
    content?: JSONContent
  ) => {
    try {
      const res = await createDocument({
        title,
        category_id,
        content,
        workspace_id: workspaceId,
      });
      toast.success(t("created_successfully"));
      router.push(ROUTE.BASE.DOCUMENT.DETAIL(workspaceId, res.id));
      fetchWorkspace();
    } catch (err) {
      console.error("Failed to create document", err);
      toast.success(t("create_failed"));
    }
  };

  const handleCreateCategory = async (category_id?: string) => {
    try {
      await createCategory({
        name: "Untitled Category",
        workspace_id: workspaceId,
        parent_id: category_id,
      });
      toast.success(t("created_successfully"));
      fetchWorkspace();
    } catch (err) {
      console.error("Error creating category", err);
      toast.success(t("create_failed"));
    }
  };

  const handleCategoryDelete = async (cat_id: string) => {
    try {
      await deleteCategory(cat_id);
      toast.success(t("deleted_successfully"));
      fetchWorkspace();
    } catch {
      toast.error(t("delete_failed"));
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="group/sidebar h-screen w-inherit"
    >
      <SidebarHeader>
        {workspace && <NavHeader workspace={workspace} />}
      </SidebarHeader>
      <SidebarContent>
        {/* Static Menus */}
        {staticMenus.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-muted-foreground">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.children.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      className={clsx(
                        "flex gap-2 px-3 py-2 rounded-lg transition-colors",
                        cleanPath.startsWith(item.uri || "")
                          ? "bg-primary-light text-primary font-extrabold pointer-events-none"
                          : "text-foreground-2 hover:bg-muted"
                      )}
                    >
                      <Link href={item.uri || "#"}>
                        {item.icon && (
                          <item.icon className={`stroke-[3] w-5 h-5`} />
                        )}
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Dynamic Menu (e.g. Documents & Categories) */}
        {dynamicMenu && (
          <SidebarGroup key="dynamic">
            <SidebarGroupLabel className="text-muted-foreground">
              {dynamicMenu.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {dynamicMenu.children.map((item) =>
                  item.collapsible ? (
                    <Collapsible
                      key={item.label}
                      open={item.isCollapsed}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <div>
                            <SidebarMenuButton
                              asChild
                              className="peer text-foreground-2"
                              tooltip={item.label}
                            >
                              <div>
                                {item.icon && (
                                  <item.icon
                                    className={`${item.iconClass} stroke-[3] w-5 h-5`}
                                  />
                                )}
                                <span className="text-sm font-medium">
                                  {item.label}
                                </span>
                              </div>
                            </SidebarMenuButton>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <SidebarMenuAction>
                                  <Plus className="w-4 h-4" />
                                </SidebarMenuAction>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleCreateCategory()}
                                >
                                  <FolderPlus className="w-4 h-4 mr-2 text-blue-600" />
                                  {t("new_category")}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setNewDocDialogOpen(true)}
                                >
                                  <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                                  {t("new_document")}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="ml-1.5 px-0 mr-0">
                            {documentMenus.map((child) => (
                              <SidebarMenuSubItem key={child.id}>
                                <CategoryDocuments
                                  item={child}
                                  setNewDocDialogOpen={setNewDocDialogOpen}
                                  onCategoryCreate={handleCreateCategory}
                                  onCategoryRename={handleCategoryRename}
                                  onDocumentCreate={handleCreateDocument}
                                  setSelectedCategoryId={setSelectedCategoryId}
                                  onCategoryDelete={handleCategoryDelete}
                                />
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.label}
                        className={clsx(
                          "text-foreground-2 hover:bg-muted",
                          cleanPath.startsWith(item.uri || "") &&
                            "bg-primary-light text-primary font-extrabold pointer-events-none"
                        )}
                      >
                        <Link href={item.uri || "#"}>
                          {item.icon && (
                            <item.icon
                              className={`${item.iconClass} stroke-[3] w-5 h-5`}
                            />
                          )}
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="gap-0.5">
        <Link href={ROUTE.ROOT}>
          <SidebarMenuButton className="w-full justify-start gap-2">
            <ArrowBigLeftDash className="h-4 w-4" />
            {t("backToWorkspaces")}
          </SidebarMenuButton>
        </Link>
      </SidebarFooter>

      <NewDocumentDialog
        open={newDocDialogOpen}
        onOpenChange={(isOpen) => {
          setNewDocDialogOpen(isOpen);
          if (!isOpen) setSelectedCategoryId("");
        }}
        categoryId={selectedCategoryId}
        onDocumentCreate={handleCreateDocument}
      />
    </Sidebar>
  );
}
