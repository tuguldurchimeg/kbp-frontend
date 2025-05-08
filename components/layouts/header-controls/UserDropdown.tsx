"use client";

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
import { BadgeCheck, Bookmark, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CURRENT_USER } from "@/constants/kb-placeholder-data";

export default function UserDropdown() {
  const user = CURRENT_USER;
  const t = useTranslations("SYSCOMMON");

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
          <DropdownMenuItem>
            <BadgeCheck />
            {t("account")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Bookmark />
            {t("saved")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-700">
          <LogOut className="text-red-700" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
