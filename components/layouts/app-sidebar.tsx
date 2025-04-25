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

import { Plus, FolderPlus, FileText, Building2 } from "lucide-react";

import Link from "next/link";
import CategoryDocuments from "./category-documents-tree";
import { Separator } from "@/components/ui/separator";
import { NavHeader } from "./app-sidebar-header";
import { useParams, usePathname } from "next/navigation";
import { staticMenus, MenuItemChildren, dynamicMenu } from "@/constants/menu";
import clsx from "clsx";
import { ROUTE } from "@/constants/route.constants";
import NewDocumentDialog from "@/components/@documents/new-document-dialog";
import { createCategory } from "@/app/lib/actions/category.actions";
import { toast } from "sonner"; // or your toast lib
import { useEffect, useState } from "react";
import { generateDocumentMenus } from "@/constants/menu"; // Assuming this function is in a separate file

export function AppSidebar() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const pathname = usePathname();
  const [newDocDialogOpen, setNewDocDialogOpen] = useState(false);
  const [documentMenus, setDocumentMenus] = useState<MenuItemChildren[]>([]); // Dynamic document menus state

  const fetchDocumentMenus = async () => {
    try {
      const fetchedDocumentMenus = await generateDocumentMenus(workspaceId);
      setDocumentMenus(fetchedDocumentMenus);
    } catch (error) {
      console.error("Failed to generate document menus", error);
    }
  };
  useEffect(() => {
    fetchDocumentMenus();
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
      <Separator />
      <SidebarContent>
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
                      className={clsx({
                        "bg-sky-100 text-blue-600": pathname.startsWith(
                          item.uri || ""
                        ),
                      })}
                    >
                      <Link href={item.uri || "#"}>
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Dynamic Document Menus */}
        {dynamicMenu && (
          <SidebarGroup key="Documents">
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
                              className="peer"
                              tooltip={item.label}
                            >
                              <div>
                                {item.icon && <item.icon />}
                                <span>{item.label}</span>
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
                                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                      const newCategory = await createCategory({
                                        name: "Untitled Category",
                                        workspace_id: workspaceId,
                                      });
                                      toast.success("Category created");
                                      fetchDocumentMenus();
                                    } catch (err) {
                                      console.error(
                                        "Failed to create category",
                                        err
                                      );
                                      toast.error("Failed to create category");
                                    }
                                  }}
                                >
                                  <FolderPlus className="w-4 h-4 mr-2 text-blue-600" />{" "}
                                  New Category
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setNewDocDialogOpen(true)}
                                >
                                  <FileText className="w-4 h-4 mr-2 text-indigo-600" />{" "}
                                  New Document
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
                      <SidebarMenuButton asChild tooltip={item.label}>
                        <Link href={item.uri || "#"}>
                          {item.icon && <item.icon />}
                          <span>{item.label}</span>
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
        <Link href={ROUTE.WORKSPACES.ROOT}>
          <SidebarMenuButton className="w-full justify-start gap-2">
            <Building2 className="h-4 w-4" />
            Back to Workspaces
          </SidebarMenuButton>
        </Link>
      </SidebarFooter>
      <NewDocumentDialog
        open={newDocDialogOpen}
        onOpenChange={setNewDocDialogOpen}
        categoryId={""}
      />
    </Sidebar>
  );
}
