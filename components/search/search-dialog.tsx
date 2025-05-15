"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";
import { SidebarMenuButton } from "../ui/sidebar";
import { useTranslations } from "next-intl";
import { SearchResults } from "./search-result";

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const hasQuery = query.trim().length > 0;
  const t = useTranslations("Search");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton className="w-full justify-start text-muted-foreground shadow-sm border">
          <Search className="size-4 text-muted-foreground mr-2" />
          {t("title")}
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className={clsx("w-full max-w-10xl p-0 transition-all")}>
        <div className="space-y-4 p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {t("title")}
            </DialogTitle>
          </DialogHeader>

          <Input
            autoFocus
            placeholder={t("inputPlaceholder")}
            className="h-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {hasQuery && <SearchResults />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
