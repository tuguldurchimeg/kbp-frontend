"use client";

import {
  Building,
  Building2,
  ChevronsUpDown,
  Plus,
  Search,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  //   DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavHeader() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Building className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">WORKSPACE</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Menu
            </DropdownMenuLabel>
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Building2 className="size-4 shrink-0" />
              </div>
              Back to workspaces
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        {/* <Input
          type="search"
          placeholder="Search documents..."
          className="pl-10 h-8 text-sm"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
          <Search className="w-4 h-4" />
        </span> */}
        <SidebarMenuButton
          variant="outline"
          className="w-full justify-start shadow-sm text-xs text-muted-foreground text-zinc-400 font-normal"
          onClick={() => console.log("Open search modal")}
        >
          <Search className=" w-4 h-4 text-muted-foreground" />
          Search documents...
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
