import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { placeholderData } from "@/constants/search-data";
import { CategoryResults } from "./search-result-tabs/category-results";
import { FileResults } from "./search-result-tabs/file-results";
import { DocumentResults } from "./search-result-tabs/document-results";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function SearchResults() {
  const t = useTranslations("Search");
  const [tab, setTab] = useState("all");

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mt-2">
        <TabsTrigger value="all">{t("tabs.all")}</TabsTrigger>
        <TabsTrigger value="documents">{t("tabs.documents")}</TabsTrigger>
        <TabsTrigger value="categories">{t("tabs.categories")}</TabsTrigger>
        <TabsTrigger value="files">{t("tabs.files")}</TabsTrigger>
      </TabsList>

      {/* ALL RESULTS */}
      <TabsContent value="all">
        <ScrollArea className="h-[400px] mt-4 pr-2">
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
  );
}
