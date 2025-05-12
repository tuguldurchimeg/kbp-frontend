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
import { useParams, usePathname } from "next/navigation";
import {
  useSidebarMenus,
  generateDocumentMenus,
  MenuItemChildren,
} from "@/constants/menu";
import clsx from "clsx";
import { ROUTE } from "@/constants/route.constants";
import NewDocumentDialog from "@/components/@documents/new-document-dialog";
import { createCategory } from "@/src/app/lib/actions/category.actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function AppSidebar() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const pathname = usePathname();
  const [newDocDialogOpen, setNewDocDialogOpen] = useState(false);
  const [documentMenus, setDocumentMenus] = useState<MenuItemChildren[]>([]);
  const t = useTranslations("SYSCOMMON");
  const { staticMenus, dynamicMenu } = useSidebarMenus(workspaceId);

  const fetchDocumentMenus = async () => {
    try {
      const fetched = await generateDocumentMenus(workspaceId);
      setDocumentMenus(fetched);
    } catch {
      toast.error("Failed to load documents");
    }
  };
  const cleanPath = pathname.replace(/^\/(en|mn)/, "");

  useEffect(() => {
    fetchDocumentMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="group/sidebar h-screen w-inherit"
    >
      <SidebarHeader>
        <NavHeader />
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
                      asChild
                      defaultOpen={item.isCollapsed}
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
                                  onClick={async () => {
                                    try {
                                      await createCategory({
                                        name: "Untitled Category",
                                        workspace_id: workspaceId,
                                      });
                                      toast.success("Category created");
                                      fetchDocumentMenus();
                                    } catch {
                                      toast.error("Failed to create category");
                                    }
                                  }}
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
                                <CategoryDocuments item={child} />
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
        onOpenChange={setNewDocDialogOpen}
        categoryId=""
      />
    </Sidebar>
  );
}
