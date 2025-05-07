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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import clsx from "clsx";
import { SidebarMenuButton } from "./ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { placeholderData } from "@/constants/search-data";
import { CategoryResults } from "./search-result-tabs/category-results";
import { FileResults } from "./search-result-tabs/file-results";
import { DocumentResults } from "./search-result-tabs/document-results";
import { useTranslations } from "next-intl";

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");

  const hasQuery = query.trim().length > 0;
  const t = useTranslations("Search");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton className="w-full justify-start text-muted-foreground">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          Search documents...
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

          {hasQuery && (
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mt-2">
                <TabsTrigger value="all">{t("tabs.all")}</TabsTrigger>
                <TabsTrigger value="documents">
                  {t("tabs.documents")}
                </TabsTrigger>
                <TabsTrigger value="categories">
                  {t("tabs.categories")}
                </TabsTrigger>
                <TabsTrigger value="files">{t("tabs.files")}</TabsTrigger>
              </TabsList>

              {/* ALL RESULTS */}
              <TabsContent value="all">
                <ScrollArea className="h-[400px] mt-4 pr-2">
                  <SearchResults />
                </ScrollArea>
              </TabsContent>

              {/* DOCUMENTS */}
              <TabsContent value="documents">
                <ScrollArea className="h-[400px] mt-4 pr-2">
                  <DocumentResults data={placeholderData.documents} />
                </ScrollArea>
              </TabsContent>

              {/* CATEGORIES */}
              <TabsContent value="categories">
                <ScrollArea className="h-[400px] mt-4 pr-2">
                  <CategoryResults data={placeholderData.categories} />
                </ScrollArea>
              </TabsContent>
              {/* FILES */}
              <TabsContent value="files">
                <ScrollArea className="h-[400px] mt-4 pr-2">
                  <FileResults data={placeholderData.files} />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchResults() {
  const t = useTranslations("Search");

  return (
    <div className="space-y-6 px-2 mb-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3">
          {t("sections.categories")}
        </h4>
        <CategoryResults data={placeholderData.categories} />
      </div>
      <div className="border-t" />

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3">
          {t("sections.documents")}
        </h4>
        <DocumentResults data={placeholderData.documents} />
      </div>
      <div className="border-t" />

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3">
          {t("sections.files")}
        </h4>

        <FileResults data={placeholderData.files} />
      </div>
    </div>
  );
}
