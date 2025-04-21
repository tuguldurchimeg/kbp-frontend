"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Info, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export type BreadCrumb = {
  title: string;
  to?: string;
};

interface Props {
  breadcrumbs?: BreadCrumb[];
  title?: string;
  total?: number;
  actions?: React.ReactNode;
  helpTitle?: string;
  helpContent?: React.ReactNode;
  error?: { message?: string };
  success?: boolean;
  sideContent?: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function DetailPageLayout({
  breadcrumbs,
  title,
  total,
  actions,
  helpTitle,
  helpContent,
  error,
  success,
  sideContent,
  onClose,
  children,
}: Props) {
  const [showHelp, setShowHelp] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  return (
    <div className="relative w-full py-10 pr-10">
      {/* Top area with breadcrumbs and title */}
      <div className="bg-muted py-4 px-6 border-b">
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div>
            {/* Breadcrumbs */}
            {breadcrumbs && (
              <div className="text-sm mb-1 text-muted-foreground flex flex-wrap items-center gap-1">
                {breadcrumbs.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    {item.to ? (
                      <Link href={item.to} className="hover:underline">
                        {item.title}
                      </Link>
                    ) : (
                      <span>{item.title}</span>
                    )}
                    {idx < breadcrumbs.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Title + Total */}
            <h1 className="text-2xl font-semibold">
              {title}
              {total !== undefined && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({total})
                </span>
              )}
            </h1>
          </div>

          {/* Actions & Help */}
          <div className="flex gap-2 items-center">
            {helpContent && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHelp(true)}
              >
                <Info className="w-5 h-5" />
              </Button>
            )}
            {actions}
          </div>
        </div>

        {/* Error / Success Messages */}
        {showError && error?.message && (
          <Alert variant="destructive" className="mt-4">
            <X className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Action completed successfully.</AlertDescription>
          </Alert>
        )}

        {/* Help Drawer Inline */}
        {showHelp && helpContent && (
          <div className="bg-background border mt-4 p-4 rounded relative">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold flex items-center gap-2">
                <Info className="w-4 h-4" />
                {helpTitle || title}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHelp(false)}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="mb-3" />
            {helpContent}
          </div>
        )}
      </div>

      {/* Page Body */}
      <div className="p-6">{children}</div>

      {/* Side Panel */}
      {sideContent && (
        <div className="fixed right-0 top-0 w-80 h-full bg-white dark:bg-zinc-900 shadow-lg border-l p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">{helpTitle}</h2>
            <Button variant="ghost" size="icon" onClick={() => onClose?.()}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          <div className="mt-4 overflow-y-auto">{sideContent}</div>
        </div>
      )}
    </div>
  );
}
