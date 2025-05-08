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
      <CardContent className="flex gap-20">
        <div>
          <CardTitle>{t("summary_title")}</CardTitle>
          <CardDescription>{t("summary_desc")}</CardDescription>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {t("total_categories")}
          </p>
          <p className="text-2xl font-bold">{categories.length}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {t("total_documents")}
          </p>
          <p className="text-2xl font-bold">{totalDocs}</p>
        </div>
      </CardContent>
    </Card>
  );
}
