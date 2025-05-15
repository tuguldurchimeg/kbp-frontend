import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryResults } from "./category-results";
import { FileResults } from "./file-results";
import { DocumentResults } from "./document-results";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { WorkspaceSearchResponse } from "@/types/workspace";

type Props = {
  data: WorkspaceSearchResponse;
};

export function SearchResults({ data }: Props) {
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
              <CategoryResults data={data.categories.data} />
            </div>
            <div className="border-t" />

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                {t("sections.documents")}
              </h4>
              <DocumentResults data={data.documents.data} />
            </div>
            <div className="border-t" />

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                {t("sections.files")}
              </h4>

              <FileResults data={data.files.data} />
            </div>
          </div>
        </ScrollArea>
      </TabsContent>

      {/* DOCUMENTS */}
      <TabsContent value="documents">
        <ScrollArea className="h-[400px] mt-4 pr-2">
          <DocumentResults data={data.documents.data} />
        </ScrollArea>
      </TabsContent>

      {/* CATEGORIES */}
      <TabsContent value="categories">
        <ScrollArea className="h-[400px] mt-4 pr-2">
          <CategoryResults data={data.categories.data} />
        </ScrollArea>
      </TabsContent>
      {/* FILES */}
      <TabsContent value="files">
        <ScrollArea className="h-[400px] mt-4 pr-2">
          <FileResults data={data.files.data} />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
