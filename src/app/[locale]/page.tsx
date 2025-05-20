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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Rocket, Search, Users, Zap } from "lucide-react";
import SiteLayout from "@/components/layouts/SiteLayout";
import QuickAccessDocumentList from "@/components/@workspace/quick-access-document-list";
import { SearchResults } from "@/components/search/search-result";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import clsx from "clsx";
import PrivateRoute from "@/components/providers/PrivateRoute";
import { WorkspaceSearchResponse } from "@/types/workspace";
import { searchWorkspace } from "../lib/actions/workspace.actions";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DataTable from "@/components/@employees/data-table";

export default function Home() {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<WorkspaceSearchResponse | null>(null);

  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!hasQuery) {
        setOpen(false);
        return;
      }

      try {
        const res = await searchWorkspace({ keyword: query });
        setResult(res);
        setOpen(true);
      } catch (err) {
        console.error("Search error", err);
        setResult(null);
        setOpen(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [hasQuery, query]);

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
              if (!hasQuery) {
                setOpen(isOpen);
              }
            }}
          >
            <PopoverTrigger asChild>
              <div
                className={clsx(
                  "relative mt-4 mx-auto w-full transition-all duration-300 ease-in-out",
                  hasQuery ? "max-w-4xl z-30" : "max-w-md"
                )}
              >
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search className="w-4 h-4" />
                </span>
                <Input
                  placeholder={t("Home.search_placeholder")}
                  className={clsx(
                    "pl-10 pr-20 py-6 text-sm transition-all duration-500 ease-in-out",
                    "bg-background text-foreground placeholder:text-muted-foreground rounded-xl"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuery(value);
                  }}
                  value={query}
                />
              </div>
            </PopoverTrigger>
            {hasQuery && (
              <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/10" />
            )}

            {hasQuery && result && (
              <PopoverContent
                align="center"
                className={clsx(
                  "w-full max-w-xs md:max-w-4xl mt-2 p-2 rounded-xl border bg-background shadow-lg max-h-100 overflow-auto",
                  "transition-all duration-300 ease-in-out transform opacity-0 scale-95",
                  open && hasQuery ? "opacity-100 scale-100" : ""
                )}
              >
                <SearchResults data={result} />
              </PopoverContent>
            )}
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
                    <DialogTitle>{t("SYSCOMMON.create")}</DialogTitle>
                  </DialogHeader>
                  <CreateWorkspaceForm />
                </DialogContent>
              </Dialog>
            </div>

            <WorkspaceCardList />
          </section>

          <Tabs defaultValue="quick" className="space-y-6">
            <TabsList className="gap-2">
              <TabsTrigger value="quick">
                <Zap className="w-4 h-4" />
                {t("SYSCOMMON.quick_access")}
              </TabsTrigger>
              <TabsTrigger value="employees">
                <Users className="w-4 h-4" />
                {t("SYSCOMMON.employees")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quick">
              <QuickAccessDocumentList />
            </TabsContent>

            <TabsContent value="employees">
              <DataTable />
            </TabsContent>
          </Tabs>
        </main>
      </SiteLayout>
    </PrivateRoute>
  );
}
