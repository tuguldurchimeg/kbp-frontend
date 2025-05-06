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
import { Rocket, Zap } from "lucide-react";
import SiteLayout from "@/components/layouts/SiteLayout";
import QuickAccessDocumentList from "@/components/@workspace/QuickAccessDocumentList";

export default function Home() {
  const t = useTranslations("SYSCOMMON");
  return (
    <PrivateRoute>
      <SiteLayout>
        <main className="flex flex-col gap-10 p-6 max-w-7xl mx-auto">
          {/* Workspaces */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                {t("workspaces")}
              </h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    + {t("create")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {t("create")} {t("documents")}
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
              {t("quick_access")}
            </h2>
            <QuickAccessDocumentList />
          </section>
        </main>
      </SiteLayout>
    </PrivateRoute>
  );
}
