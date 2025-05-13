"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CURRENT_USER } from "@/constants/kb-placeholder-data";
import { logoutService } from "@/src/app/lib/actions/auth.actions";
import { ROUTE } from "@/constants/route.constants";
import Link from "next/link";

export default function UserDropdown() {
  const t = useTranslations("SYSCOMMON");
  const router = useRouter();
  const user = CURRENT_USER;

  const handleLogout = async () => {
    try {
      await logoutService();
      router.push(ROUTE.LOGIN);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="ghost" className="p-0">
          <Avatar className="h-9 w-9 rounded-full">
            <AvatarImage
              src={user.attributes.avatar}
              alt={user.attributes.firstname}
            />
            <AvatarFallback className="rounded-full">
              {`${user.attributes?.firstname?.[0] ?? ""}${
                user.attributes?.lastname?.[0] ?? ""
              }`.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <Link href={ROUTE.PROFILE}>
            <DropdownMenuItem>
              <BadgeCheck className="mr-2 h-4 w-4" />
              {t("account")}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleLogout}
          className="text-red-700 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4 text-red-700" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
