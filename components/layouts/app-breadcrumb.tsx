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
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function AppBreadcrumb() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("MENUS");

  const labelMap: Record<string, string> = {
    workspaces: t("workspaces"),
    documents: t("documents"),
    templates: t("templates"),
    tools: t("tools"),
    tags: t("tags"),
    glossaries: t("glossary"),
    issues: t("issues"),
    files: t("files"),
    user_access: t("user_access"),
    profile: t("user_access"),
  };

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

  if (breadcrumbItems.length === 0) return null;

  return (
    <header className="bg-background/80 flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
      <div className="flex items-center gap-0.5 px-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="-ml-1" />
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start">
            Toggle
          </TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="mt-0.5">
          <BreadcrumbList>
            {breadcrumbItems.map((segment, index) => (
              <React.Fragment key={segment.href}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem style={{ fontSize: "13px" }}>
                  {index === breadcrumbItems.length - 1 ? (
                    <BreadcrumbPage>{segment.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={segment.href}
                      className="hidden md:block"
                    >
                      {segment.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
