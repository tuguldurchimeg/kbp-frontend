"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutService } from "@/src/app/lib/actions/auth.actions";
import { fetchProfile } from "@/src/app/lib/actions/user.actions";
import { ROUTE } from "@/constants/route.constants";
import { UserItem } from "@/types/user";
import Link from "next/link";
import LanguageSwitcher from "./language-switcher";
import { ThemeToggle } from "@/components/layouts/header-controls/theme-toggle";
import { useTheme } from "next-themes";

export default function UserDropdown() {
  const t = useTranslations("SYSCOMMON");
  const router = useRouter();
  const [user, setUser] = useState<UserItem | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const profile = await fetchProfile();
        setUser(profile);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutService();
      router.push(ROUTE.HOME);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const initials = user
    ? `${user.attributes.firstname?.[0] ?? ""}${
        user.attributes.lastname?.[0] ?? ""
      }`.toUpperCase()
    : "";
  const { resolvedTheme } = useTheme();
  const nextMode = resolvedTheme === "dark" ? "light" : "dark";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="ghost" className="p-0">
          <Avatar className="h-9 w-9 rounded-full">
            <AvatarImage
              src={user?.attributes.avatar || ""}
              alt={user?.attributes.firstname || "User"}
            />
            <AvatarFallback className="rounded-full">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage
                src={user?.attributes.avatar}
                alt={user?.attributes.firstname}
              />
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user?.attributes.firstname}
              </span>
              <span className="truncate text-xs">{user?.attributes.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={ROUTE.PROFILE}>
            <DropdownMenuItem>
              <BadgeCheck className="mr-2 h-4 w-4" />
              {t("account")}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="block md:hidden">
          <DropdownMenuItem>
            <LanguageSwitcher />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ThemeToggle />
            {t("theme_toggle", { mode: t(`theme_${nextMode}`) })}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        <DropdownMenuItem onSelect={handleLogout} className="text-red-700">
          <LogOut className="mr-2 h-4 w-4 text-red-700" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
