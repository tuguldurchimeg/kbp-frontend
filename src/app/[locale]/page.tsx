"use client";

import { useTranslations } from "next-intl";
import CreateWorkspaceForm from "@/components/@workspace/WorkspaceCreateForm";
import WorkspaceCardList from "@/components/@workspace/WorkspaceCardList";
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
import { Rocket, Search, Zap } from "lucide-react";
import SiteLayout from "@/components/layouts/SiteLayout";
import QuickAccessDocumentList from "@/components/@workspace/QuickAccessDocumentList";

export default function Home() {
  const t = useTranslations();
  return (
    <PrivateRoute>
      <SiteLayout>
        <section className="bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] rounded-xl px-6 py-10 text-center space-y-6 shadow-sm border">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold">
              {t("Home.title")}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              {t("Home.subtitle")}
            </p>
          </div>
          <div className="relative mt-4 mx-auto w-full max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="w-4 h-4" />
            </span>
            <Input
              placeholder={t("Home.search_placeholder")}
              className="pl-10 pr-20 py-6 text-sm bg-background text-foreground placeholder:text-muted-foreground rounded-xl"
            />
          </div>
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
                  <Button>+ {t("SYSCOMMON.create")}</Button>
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
