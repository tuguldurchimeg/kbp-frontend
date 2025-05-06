"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations, useLocale } from "next-intl";
import React from "react";

export function AppBreadcrumb() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("MENUS");

  // Translations for known segments
  const labelMap: Record<string, string> = {
    workspaces: t("workspaces"),
    documents: t("documents"),
    templates: t("templates"),
    settings: t("tools"),
    tags: t("tags"),
    glossary: t("glossary"),
    issues: t("issues"),
    account: t("user_access"),
    profile: t("user_access"),
  };

  // Parse path, remove locale, skip numeric segments (IDs)
  const rawSegments = pathname.split("/").filter(Boolean);
  const segments =
    rawSegments[0] === locale ? rawSegments.slice(1) : rawSegments;

  const breadcrumbItems = segments
    .filter((segment) => !/^\d+$/.test(segment)) // skip IDs
    .map((segment, index) => {
      const href = "/" + [locale, ...segments.slice(0, index + 1)].join("/");
      const name = labelMap[segment] || segment.replace(/-/g, " ");
      return { href, name };
    });

  // If no breadcrumb items (e.g. homepage), render nothing
  if (breadcrumbItems.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((segment, index) => (
          <React.Fragment key={segment.href}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage>{segment.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={segment.href}>
                  {segment.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
