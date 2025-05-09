"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CategoryItem } from "@/types/document";
import { useTranslations } from "next-intl";

export default function WorkspaceSummary({
  categories,
}: {
  categories: CategoryItem[];
}) {
  const t = useTranslations("Workspace");

  const totalDocs = categories.reduce(
    (sum, cat) => sum + (cat.attributes.documents?.data.length || 0),
    0
  );

  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-10 p-4 sm:p-6">
        {/* Text Section */}
        <div className="flex-1">
          <CardTitle className="text-xl sm:text-2xl">
            {t("summary_title")}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {t("summary_desc")}
          </CardDescription>
        </div>

        <div className="flex justify-around">
          {/* Categories Count */}
          <div className="flex flex-col items-start sm:items-center">
            <p className="text-sm text-muted-foreground">
              {t("total_categories")}
            </p>
            <p className="text-2xl font-bold">{categories.length}</p>
          </div>

          {/* Documents Count */}
          <div className="flex flex-col items-start sm:items-center">
            <p className="text-sm text-muted-foreground">
              {t("total_documents")}
            </p>
            <p className="text-2xl font-bold">{totalDocs}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
