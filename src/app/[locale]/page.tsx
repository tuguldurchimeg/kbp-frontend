"use client";

import { useTranslations } from "next-intl";
import CreateWorkspaceForm from "@/components/@workspace/workspace-create-form";
import WorkspaceCardList from "@/components/@workspace/workspace-card-list";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PrivateRoute from "@/components/PrivateRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Rocket, Search, Zap } from "lucide-react";
import SiteLayout from "@/components/layouts/SiteLayout";
import QuickAccessDocumentList from "@/components/@workspace/quick-access-document-list";
import { SearchResults } from "@/components/SearchResult";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import clsx from "clsx";

export default function Home() {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const hasQuery = query.trim().length > 0;
  const [open, setOpen] = useState(false);

  return (
    <PrivateRoute>
      <SiteLayout>
        <section className="bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] rounded-b-xl px-6 py-10 text-center space-y-6 shadow-sm border">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold">
              {t("Home.title")}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              {t("Home.subtitle")}
            </p>
          </div>
          <Popover
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (!isOpen) setQuery("");
            }}
          >
            <PopoverTrigger asChild>
              <div
                className={clsx(
                  "relative mt-4 mx-auto w-full",
                  hasQuery ? "max-w-4xl z-30" : "max-w-md"
                )}
              >
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search className="w-4 h-4" />
                </span>
                <Input
                  placeholder={t("Home.search_placeholder")}
                  className="pl-10 pr-20 py-6 text-sm bg-background text-foreground placeholder:text-muted-foreground rounded-xl"
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuery(value);
                    setOpen(value.trim().length > 0);
                  }}
                  value={query}
                />
              </div>
            </PopoverTrigger>
            {hasQuery && (
              <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/10" />
            )}

            <PopoverContent
              align="center"
              className="w-550 max-w-4xl mt-2 p-2 rounded-xl backdrop-blur-sm  border bg-background shadow-lg max-h-100 overflow-auto"
            >
              <SearchResults />
            </PopoverContent>
          </Popover>
        </section>
        <main className="flex flex-col gap-10 p-6 max-w-7xl mx-auto">
          {/* Workspaces */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                {t("SYSCOMMON.workspaces")}
              </h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> {t("SYSCOMMON.create")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {t("SYSCOMMON.create")} {t("SYSCOMMON.documents")}
                    </DialogTitle>
                  </DialogHeader>
                  <CreateWorkspaceForm />
                </DialogContent>
              </Dialog>
            </div>

            <WorkspaceCardList />
          </section>

          {/* Popular Topics */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {t("SYSCOMMON.quick_access")}
            </h2>
            <QuickAccessDocumentList />
          </section>
        </main>
      </SiteLayout>
    </PrivateRoute>
  );
}
