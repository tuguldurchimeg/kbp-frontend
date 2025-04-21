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

import { Plus, FolderPlus, FileText } from "lucide-react";

import Link from "next/link";
import CategoryDocuments from "./category-documents-tree";
import { Separator } from "@/components/ui/separator";
import { NavUser } from "./app-sidebar-user";
import { NavHeader } from "./app-sidebar-header";
import { useParams } from "next/navigation";
import { generateMenus } from "@/constants/menu";

const data = {
  user: {
    name: "Tuguldurchimeg",
    email: "tgldrchmg@gmail.com",
    avatar: "/avatar.jpg",
  },
};

export function AppSidebar() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const menus = generateMenus(workspaceId);

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
        {menus.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-muted-foreground">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.children.map((item) =>
                  item.children ? (
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
                                <item.icon />
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
                                  onClick={() => console.log("New Category")}
                                >
                                  <FolderPlus className="w-4 h-4 mr-2 text-blue-600" />{" "}
                                  New Category
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => console.log("New Document")}
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
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.label}>
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
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="gap-0.5">
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
