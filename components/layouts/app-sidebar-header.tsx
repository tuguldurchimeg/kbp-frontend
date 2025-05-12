import {
  ArrowBigLeftDash,
  Building,
  ChevronsUpDown,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { SearchDialog } from "../SearchDialog";
import Link from "next/link";
import { ROUTE } from "@/constants/route.constants";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export function NavHeader() {
  const { isMobile } = useSidebar();
  const t = useTranslations();
  const params = useParams();
  const workspaceId = params.workspaceId as string;

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
                <span className="truncate font-semibold">
                  {t("SYSCOMMON.workspace")}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
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
              href={ROUTE.WORKSPACES.WORKSPACE(workspaceId)}
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
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <Pencil className="size-3 mr-1" />
              {t("SYSCOMMON.editWorkspace")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SearchDialog />
    </SidebarMenu>
  );
}
