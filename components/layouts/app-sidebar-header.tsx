import { ArrowBigLeftDash, Building, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SearchDialog } from "../search/search-dialog";
import Link from "next/link";
import { ROUTE } from "@/constants/route.constants";
import { useTranslations } from "next-intl";
import { WorkspaceItem } from "@/types/workspace";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function NavHeader({ workspace }: { workspace: WorkspaceItem }) {
  const { isMobile } = useSidebar();
  const t = useTranslations();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          onClick={() => router.push(ROUTE.WORKSPACES.WORKSPACE(workspace.id))}
        >
          {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-primary-foreground">
            <Building className="size-4" />
          </div> */}
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-primary-foreground">
            <Image
              src={
                workspace.attributes.image_url || "/workspace_placeholder.jpg"
              }
              alt={workspace.attributes.name}
              width={80}
              height={80}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {workspace.attributes.name}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ChevronsUpDown className="ml-auto" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-60 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {t("SYSCOMMON.menu")}
              </DropdownMenuLabel>
              <Link
                href={ROUTE.WORKSPACES.WORKSPACE(workspace.id)}
                className="flex gap-2 items-center"
              >
                <DropdownMenuItem className="gap-2 p-2 w-full">
                  <Building className="size-4 shrink-0" />
                  {t("Main.overview")}
                </DropdownMenuItem>
              </Link>
              <Link href={ROUTE.ROOT} className="flex gap-2 items-center">
                <DropdownMenuItem className="gap-2 p-2 w-full">
                  <ArrowBigLeftDash className="size-4 shrink-0" />
                  {t("SYSCOMMON.backToWorkspaces")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SearchDialog />
    </SidebarMenu>
  );
}
